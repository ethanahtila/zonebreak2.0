'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),{once}=require('node:events');
const {createServer}=require('../server.cjs'),WS=require('../vendor/ws'),Z=require('../core');
test('multiplayer retains a quick super release and its target until the next simulation tick',async t=>{
 const app=createServer();app.server.listen(0,'127.0.0.1');await once(app.server,'listening');t.after(()=>app.close());
 const url='http://127.0.0.1:'+app.server.address().port,ws=new WS(url.replace('http:','ws:')+'/play',{origin:url}),messages=[];ws.on('message',b=>messages.push(JSON.parse(b)));await once(ws,'open');
 const until=async fn=>{const end=Date.now()+4000;while(!fn()){if(Date.now()>end)throw Error('Timed out');await new Promise(r=>setTimeout(r,5));}};
 await until(()=>messages.some(m=>m.type==='welcome'));const send=m=>ws.send(JSON.stringify(m));send({type:'hello',version:Z.VERSION,name:'Release test',fighter:'jolt'});send({type:'create',code:'AIMTEST',mode:'duel',fighter:'jolt',level:20,ownedHyper:true});await until(()=>app.rooms.has('AIMTEST'));send({type:'start'});await until(()=>app.matches.size===1);
 const match=[...app.matches.values()][0],s=match.state,p=s.players.find(p=>!p.bot);s.phase='playing';Object.assign(p,{x:500,y:150,charge:100,invuln:999});s.destroyedWalls=Z.mapOf(s).walls.map((_,i)=>i);for(const q of s.players)if(q!==p){q.bot=false;q.invuln=999;}
 send({type:'input',seq:0,input:{aimX:p.x,aimY:p.y+600,aimingSuper:true}});await until(()=>p.aimingSuper===true);await until(()=>messages.some(m=>m.type==='state'&&m.state.players.some(q=>q.id===p.id&&q.aimingSuper)));assert.equal(p.charge,100);
 // Both packets arrive together: the release target points down, the next
 // ordinary aim points right. The release must survive the newer movement.
 ws._socket.cork();send({type:'input',seq:1,input:{aimX:p.x,aimY:p.y+600,super:true}});send({type:'input',seq:2,input:{aimX:p.x+500,aimY:p.y,super:false}});ws._socket.uncork();
 await until(()=>s.events.some(e=>e.type==='super'&&e.source===p.id));const shot=s.shots.find(q=>q.owner===p.id);assert(shot);assert(Math.abs(shot.dx)<1e-6);assert(shot.dy>.99);assert(shot.range<=Z.superRange(p.fighter));assert(p.charge<5);
 await new Promise(r=>setTimeout(r,80));assert.equal(s.events.filter(e=>e.type==='super'&&e.source===p.id).length,1);
 send({type:'leave'});await until(()=>messages.some(m=>m.type==='error'&&m.message.includes('Finish the match')));assert.equal(app.peers.get(p.id).match,match.id);
 p.hyperCharge=100;p.charge=100;ws._socket.cork();send({type:'input',seq:3,input:{aimX:p.x+500,aimY:p.y,hyper:true}});send({type:'input',seq:4,input:{aimX:p.x+500,aimY:p.y,hyper:false}});ws._socket.uncork();await until(()=>p.hyperTime>0);assert.equal(p.hyperCharge,0);await until(()=>messages.some(m=>m.type==='state'&&m.state.players.some(q=>q.id===p.id&&q.hyperTime>0)));
 s.ended=true;s.phase='ended';s.winner=p.team;send({type:'leave'});await until(()=>messages.some(m=>m.type==='left'));assert.equal(app.peers.get(p.id).match,null);
});
