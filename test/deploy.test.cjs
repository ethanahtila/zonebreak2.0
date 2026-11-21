'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {once}=require('node:events');
const {spawn}=require('node:child_process');
const net=require('node:net');
const fs=require('node:fs');
const path=require('node:path');
const WS=require('../vendor/ws');
const Z=require('../core');
const root=path.join(__dirname,'..');
test('Render package has matching versions, original deployment settings and a vendored WebSocket server',()=>{
 const p=require('../package.json'),lock=require('../package-lock.json');
 assert.equal(p.version,Z.VERSION);assert.equal(lock.version,p.version);
 assert.equal(lock.packages[''].version,p.version);assert.equal(p.name,'zonebreak');
 assert.equal(p.scripts.start,'node server.cjs');assert.equal(typeof WS.WebSocketServer,'function');
 const yaml=fs.readFileSync(path.join(root,'render.yaml'),'utf8');
 for(const setting of ['type: web','runtime: node','buildCommand: npm ci --omit=dev','startCommand: npm start','healthCheckPath: /health'])assert(yaml.includes(setting));
});
test('production start command serves health, all browser assets and a live multiplayer room',async t=>{
 const probe=net.createServer();probe.listen(0,'127.0.0.1');await once(probe,'listening');
 const port=probe.address().port;await new Promise(r=>probe.close(r));
 const child=spawn(process.execPath,['server.cjs'],{cwd:root,env:{...process.env,NODE_ENV:'production',PORT:String(port)},stdio:['ignore','pipe','pipe']});
 let output='';child.stdout.on('data',b=>output+=b);child.stderr.on('data',b=>output+=b);
 const clients=[];
 t.after(async()=>{for(const ws of clients)ws.terminate();if(child.exitCode===null){const done=once(child,'exit');child.kill();await done;}});
 const base='http://127.0.0.1:'+port,until=async fn=>{const end=Date.now()+5000;while(!await fn()){if(Date.now()>end)throw Error('Startup/WS timeout: '+output);await new Promise(r=>setTimeout(r,15));}};
 await until(async()=>{try{return (await fetch(base+'/health')).ok;}catch{return false;}});
 const health=await(await fetch(base+'/health')).json();assert.equal(health.ok,true);assert.equal(health.version,Z.VERSION);
 for(const asset of ['/','/index.html','/core.js','/economy.js','/expansion.js','/roster.js','/render.js','/app.js','/style.css','/PLAY.html'])assert.equal((await fetch(base+asset)).status,200,asset);
 const html=await(await fetch(base+'/PLAY.html')).text();assert(!/<script src=/.test(html));assert(!/<link rel="stylesheet"/.test(html));
 assert.equal((await fetch(base+'/server.cjs')).status,404);
 async function connect(name){const ws=new WS(base.replace('http:','ws:')+'/play',{origin:base}),messages=[];clients.push(ws);ws.on('message',b=>messages.push(JSON.parse(b)));await once(ws,'open');await until(()=>messages.some(m=>m.type==='welcome'));ws.send(JSON.stringify({type:'hello',version:Z.VERSION,name,fighter:'jolt',level:1}));return {ws,messages,send:m=>ws.send(JSON.stringify(m))};}
 const a=await connect('Host'),b=await connect('Friend');a.send({type:'create',code:'RENDERTEST',mode:'zone',fighter:'jolt'});await until(()=>a.messages.some(m=>m.type==='room'));b.send({type:'join',code:'RENDERTEST',fighter:'rook'});await until(()=>a.messages.some(m=>m.type==='room'&&m.room.players.length===2));a.send({type:'start'});await until(()=>[a,b].every(c=>c.messages.some(m=>m.type==='matched')));
 const s=a.messages.find(m=>m.type==='matched').state;assert.equal(s.players.length,6);assert.equal(s.players.filter(p=>!p.bot).length,2);assert.equal(s.version,Z.VERSION);
});
