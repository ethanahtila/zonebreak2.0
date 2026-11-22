'use strict';
window.ArenaArt=(()=>{
const Z=window.Zone,TAU=Math.PI*2,cache=new Map(),teamColor=team=>(relTeam===null?team===0:team===relTeam)?'#65c8e1':'#f49c77';
function round(c,x,y,w,h,r,fill,stroke,width=1){c.beginPath();c.roundRect(x,y,w,h,r);if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=width;c.stroke();}}
function ellipse(c,x,y,rx,ry,fill){c.beginPath();c.ellipse(x,y,rx,ry,0,0,TAU);c.fillStyle=fill;c.fill();}
function line(c,x,y,xx,yy,color,width=1){c.beginPath();c.moveTo(x,y);c.lineTo(xx,yy);c.strokeStyle=color;c.lineWidth=width;c.lineCap='round';c.stroke();}
function glow(c,x,y,r,color){const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,color);g.addColorStop(1,'transparent');c.fillStyle=g;c.fillRect(x-r,y-r,r*2,r*2);}
function polygon(c,points,fill,stroke){c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fillStyle=fill;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=2;c.stroke();}}
function fh(t){let n=2166136261;for(const ch of String(t))n=Math.imul(n^ch.charCodeAt(0),16777619);return n>>>0;}
function terrain(s,destroyed,bushesGone){if(typeof s==='string')s={mapId:Z.rotation(s).mapId,mode:s};const m=Z.getMap(s.mapId),dw=destroyed||s.destroyedWalls||[],db=bushesGone||s.destroyedBushes||[],key=m.id+':'+dw.join(',')+':'+db.join(',');if(cache.has(key))return cache.get(key);const W=m.w,H=m.h,cv=document.createElement('canvas');cv.width=W;cv.height=H;const c=cv.getContext('2d'),mint=m.palette==='mint',dusk=m.palette==='dusk',floor=dusk?'#253b4a':mint?'#34584e':'#6b6250',tile=dusk?'#2d4654':mint?'#3a6055':'#746b58';c.fillStyle=dusk?'#152a38':'#1b3839';c.fillRect(0,0,W,H);round(c,40,40,W-80,H-80,35,floor,'#172e33',8);c.save();c.beginPath();c.roundRect(46,46,W-92,H-92,30);c.clip();for(let y=45;y<H;y+=60)for(let x=45;x<W;x+=60){if((x+y)%120)round(c,x+2,y+2,56,56,5,tile);c.fillStyle='#ffffff04';c.fillRect(x+4,y+4,52,1);}for(let i=0;i<Math.round(W*H/12000);i++){const x=70+(i*191%(W-140)),y=75+(i*271%(H-150));line(c,x,y,x+4,y-2,'#e9ead014',1.5);}c.restore();
 if(!['showdown','training','soccer'].includes(m.kind))for(const team of [0,1]){const x=team?W-155:155,cy=H/2;round(c,x-55,cy-130,110,260,28,'#142d3344',teamColor(team)+'55',2);for(let j=0;j<3;j++){const y=cy-100+j*100;ellipse(c,x,y,29,13,'#132f3833');c.strokeStyle=teamColor(team)+'44';c.lineWidth=2;c.beginPath();c.ellipse(x,y,25,12,0,0,TAU);c.stroke();}}
 for(const g of m.goals||[]){round(c,g.x,g.y,g.w,g.h,10,teamColor(g.team)+'30',teamColor(g.team),4);c.save();c.beginPath();c.rect(g.x,g.y,g.w,g.h);c.clip();for(let x=g.x;x<g.x+g.w;x+=12)line(c,x,g.y,x,g.y+g.h,'#ffffff22',1);for(let y=g.y;y<g.y+g.h;y+=12)line(c,g.x,y,g.x+g.w,y,'#ffffff22',1);c.restore();}
 if(m.kind==='soccer'){c.strokeStyle='#ffffff30';c.lineWidth=4;line(c,W/2,60,W/2,H-60,'#ffffff30',4);c.beginPath();c.arc(W/2,H/2,120,0,TAU);c.stroke();}
 for(const w of m.water){round(c,w.x-4,w.y-4,w.w+8,w.h+8,22,'#16334055');const g=c.createLinearGradient(w.x,w.y,w.x+w.w,w.y+w.h);g.addColorStop(0,'#2f7fa5');g.addColorStop(1,'#1f5f86');round(c,w.x,w.y,w.w,w.h,20,g,'#8fd4ee88',3);for(let y=w.y+16;y<w.y+w.h-8;y+=22)for(let x=w.x+14;x<w.x+w.w-20;x+=46){c.strokeStyle='#bfe9f855';c.lineWidth=2;c.beginPath();c.moveTo(x,y);c.quadraticCurveTo(x+8,y-5,x+16,y);c.quadraticCurveTo(x+24,y+5,x+32,y);c.stroke();}}
 for(const [bi,b]of m.bushes.entries()){if(db.includes(bi)){for(let n=0;n<6;n++)ellipse(c,b.x+b.w*((n*37)%100)/100,b.y+b.h*((n*61)%100)/100,5,3,'#5a6f4a66');continue;}round(c,b.x-5,b.y+7,b.w+10,b.h+7,20,'#142c3260');round(c,b.x,b.y,b.w,b.h,19,'#2b5144');for(let y=b.y+12;y<b.y+b.h;y+=21)for(let x=b.x+12;x<b.x+b.w;x+=22){const n=(x*7+y*13)%17;ellipse(c,x+Math.sin(y)*3,y,13+n*.12,13,'#467456');ellipse(c,x-3,y-4,7,8,'#5c8e5a');line(c,x,y+4,x-3,y-7,'#8ca96b55',1.3);}}
 for(const [index,w]of m.walls.entries()){if(dw.includes(index)){for(let n=0;n<9;n++)round(c,w.x+w.w*(n%4)/4+((n*13)%9),w.y+w.h*Math.floor(n/4)/3,10,7,2,'#65776b60');continue;}round(c,w.x-2,w.y+14,w.w+5,w.h+7,13,'#102c3955');round(c,w.x,w.y+8,w.w,w.h,10,dusk?'#5d6979':'#707d77','#17313a',3);const g=c.createLinearGradient(w.x,w.y,w.x,w.y+w.h);g.addColorStop(0,dusk?'#97a0aa':mint?'#b6bda3':'#cab58e');g.addColorStop(1,dusk?'#7b8897':mint?'#8fa38a':'#ad9c7d');round(c,w.x,w.y,w.w,w.h-3,10,g,'#213b40',3);round(c,w.x+6,w.y+5,w.w-12,5,3,'#edf0d73a');for(const [x,y]of [[w.x+10,w.y+11],[w.x+w.w-10,w.y+11],[w.x+10,w.y+w.h-13],[w.x+w.w-10,w.y+w.h-13]])ellipse(c,x,y,2.3,2.3,'#4e696266');}
 round(c,43,43,W-86,H-86,34,null,'#b5cab429',2);if(cache.size>=10)cache.delete(cache.keys().next().value);cache.set(key,cv);return cv;}
function accessory(c,ch,r,bob){const h=fh(ch.id),acc=h%6,tone=(h>>4)%2?ch.color:ch.dark;
 if(acc===0){line(c,-r*.2,-r*.2-bob,-r-10,-r*.55-bob,'#20384a',2.5);ellipse(c,-r-11,-r*.55-bob,4,4,tone);}
 else if(acc===1){for(const y of [-1,1])polygon(c,[[-2,y*(r-4)-bob],[-14,y*(r+7)-bob],[-10,y*(r-8)-bob]],tone,'#17313b');}
 else if(acc===2){for(const y of [-1,1])round(c,-r*.4,y*r-3-bob+(y<0?-3:0),r*.8,6,3,tone,'#17313b',1.5);}
 else if(acc===3)round(c,r*.1,-r*.75-bob,4,r*1.5,2,tone);
 else if(acc===4){for(let k=0;k<3;k++)polygon(c,[[-r+2+k*7,-3-bob],[-r-6+k*7,0-bob],[-r+2+k*7,3-bob]],tone);}
 else{ellipse(c,-r*.25,-bob,r*.45,r*.45,'#ffffff18');c.strokeStyle=tone;c.lineWidth=2;c.beginPath();c.arc(-r*.25,-bob,r*.45,0,TAU);c.stroke();}
 if((h>>7)%3===1)for(const x of [-r*.55,-r*.2])line(c,x,-r*.8-bob,x,r*.8-bob,'#ffffff22',2);}

function armorDetails(c,ch,r,bob){const ap=ch.appearance||{profile:0,trim:0,visor:0},dark='#213039',light='#e9eff0';
 for(let k=0;k<=ap.trim;k++){const y=-r*.65+k*r*.3;round(c,-r*.78,y-bob,7+ap.profile,3,1,k%2?light:ch.dark);}
 if(ap.trim===1){c.strokeStyle=light;c.lineWidth=1.5;c.beginPath();c.arc(-5,-bob,r*.7,-2,2);c.stroke();}
 if(ap.trim===2)for(const y of [-r*.7,r*.7]){ellipse(c,-r*.25,y-bob,3,3,light);line(c,-r*.25,y-bob,r*.15,y-bob,light,1.5);}
 if(ap.trim===3){polygon(c,[[-r*.7,-r*.2-bob],[-r*.4,-r*.55-bob],[-r*.1,-r*.2-bob],[-r*.4,r*.25-bob]],ch.dark,light);}
 if(ap.trim===4){for(let k=0;k<3;k++)line(c,-r*.7+k*6,-r*.75-bob,-r*.5+k*6,-r*.3-bob,light,2);}
 const y=-bob;if(ap.visor===1){round(c,r*.12,y-3,r*.65,6,2,light);}else if(ap.visor===2){ellipse(c,r*.4,y,5,7,light);ellipse(c,r*.45,y,2,3,dark);}else if(ap.visor===3){for(const yy of [-7,0,7])ellipse(c,r*.4,y+yy,2,2,light);}else if(ap.visor===4){polygon(c,[[r*.13,y-7],[r*.67,y],[r*.13,y+7]],light);}
}
function tankWeapon(c,ch,r,recoil,time){const style=ch.pattern.tankStyle,x=20-recoil,col=ch.color,metal=ch.dark,edge='#e5edf0';
 if(['bash','reversal','gravity'].includes(style)){round(c,x,-23,15,46,7,metal,edge,2);for(let k=-1;k<=1;k++)line(c,x+4,k*10,x+11,k*10,col,3);}
 else if(['surround','quake','cross','stamp'].includes(style)){line(c,10,-10,42,-10,metal,7);round(c,32,-26,23,32,4,col,edge,2);if(style==='cross'){line(c,15,12,38,23,metal,6);round(c,32,12,20,25,4,col,edge,2);}}
 else if(style==='hook'){line(c,12,0,40,0,metal,9);c.strokeStyle=edge;c.lineWidth=5;c.beginPath();c.arc(41,0,12,-Math.PI*.6,Math.PI*.7);c.stroke();}
 else if(['barrel','cask','scatter','boulder'].includes(style)){round(c,x-5,-17,34,34,9,metal,edge,2);for(const xx of [x+1,x+20])line(c,xx,-15,xx,15,col,3);if(style==='boulder')polygon(c,[[x+8,-14],[x+28,-9],[x+33,8],[x+12,16],[x,4]],col,edge);}
 else if(style==='lance'){line(c,10,0,50,0,metal,7);polygon(c,[[43,-8],[64,0],[43,8]],col,edge);}
 else if(['disc','orbit','crescent','nova','thorns'].includes(style)){for(const y of [-17,17]){c.save();c.translate(29-recoil,y);c.rotate(time*(style==='orbit'?4:1));polygon(c,[[14,0],[5,5],[0,14],[-5,5],[-14,0],[-5,-5],[0,-14],[5,-5]],col,edge);c.restore();}}
 else if(style==='flame'){round(c,10,-14,36,28,6,metal,edge,2);for(let k=-1;k<=1;k++)ellipse(c,43,k*7,4,3,col);}
 else{const alternating=style==='jab'?Math.sin(time*5)*2:0;for(const side of [-1,1]){round(c,10-recoil+side*alternating,side*19-8,25,16,6,metal,edge,2);round(c,28-recoil+side*alternating,side*19-6,9,12,3,col);}}
}
function strikePath(c,v){const a=v.angle||0,R=v.r;
 if(v.shape==='circle'||v.shape==='ring'){c.arc(v.x,v.y,R,0,TAU);if(v.inner){c.moveTo(v.x+v.inner,v.y);c.arc(v.x,v.y,v.inner,0,TAU,true);}}
 else if(v.shape==='line'){const x=Math.cos(a)*R,y=Math.sin(a)*R,nx=-Math.sin(a)*v.width,ny=Math.cos(a)*v.width;c.moveTo(v.x+nx,v.y+ny);c.lineTo(v.x+x+nx,v.y+y+ny);c.lineTo(v.x+x-nx,v.y+y-ny);c.lineTo(v.x-nx,v.y-ny);c.closePath();}
 else if(v.shape==='cross'){for(const off of [0,Math.PI/2]){const aa=a+off,x=Math.cos(aa)*R,y=Math.sin(aa)*R,nx=-Math.sin(aa)*v.width,ny=Math.cos(aa)*v.width;c.moveTo(v.x-x+nx,v.y-y+ny);c.lineTo(v.x+x+nx,v.y+y+ny);c.lineTo(v.x+x-nx,v.y+y-ny);c.lineTo(v.x-x-nx,v.y-y-ny);c.closePath();}}
 else{c.moveTo(v.x,v.y);c.arc(v.x,v.y,R,a-(v.arc||.7),a+(v.arc||.7));c.closePath();}
}
function tankPreview(c,p,ch,a,mouse){const st=ch.pattern.tankStyle,R=ch.range,v={x:p.x,y:p.y,angle:a,r:R,shape:'cone',arc:.65,width:22};c.shadowBlur=0;
 if(['thorns','ring','gravity'].includes(st)){v.shape='ring';v.inner=st==='thorns'?42:st==='ring'?70:75;}
 if(st==='orbit'){for(const off of [-Math.PI/2,Math.PI/2])curvedPreview(c,p,{...ch,pattern:{count:1,r:13,speed:390,curve:2.4}},a+off);return;}if(st==='crescent'){for(let k=0;k<3;k++){c.beginPath();strikePath(c,{...v,angle:a+(k-1)*.55,arc:.4});c.fill();c.stroke();}return;}if(st==='scatter'){v.arc=.32;}if(st==='surround'||st==='gravity')v.shape='circle';if(st==='cross'){v.shape='cross';v.angle+=Math.PI/4;v.width=20;}if(st==='reverse'){v.angle+=Math.PI;v.arc=1.2;}if(st==='bash')v.arc=1.12;
 if(st==='stamp'){const d=Math.min(R,Math.hypot(mouse.x-p.x,mouse.y-p.y));v.shape='circle';v.x+=Math.cos(a)*d;v.y+=Math.sin(a)*d;v.r=90;}
 if(st==='clap'){v.shape='circle';v.x+=Math.cos(a)*85;v.y+=Math.sin(a)*85;v.r=90;}
 if(st==='jab'){v.shape='line';v.width=40;}
 if(st==='quake'){for(let k=1;k<=3;k++){c.beginPath();strikePath(c,{...v,shape:'circle',r:45,x:p.x+Math.cos(a)*k*60,y:p.y+Math.sin(a)*k*60});c.fill('evenodd');c.stroke();}return;}
 if(st==='fans'){for(const off of [-.65,.65]){c.beginPath();strikePath(c,{...v,angle:a+off,arc:.38});c.fill();c.stroke();}return;}
 if(st==='nova'){c.beginPath();c.arc(p.x,p.y,R,0,TAU);c.stroke();for(let k=0;k<6;k++){c.beginPath();strikePath(c,{...v,shape:'line',angle:a+k*TAU/6,width:12});c.fill();c.stroke();}return;}
 if(['hook','disc','lance','barrel','orbit','cask','reversal'].includes(st)){v.shape='line';v.width=['barrel','cask','reversal'].includes(st)?19:st==='scatter'?R*.28:14;if(st==='reversal'){c.beginPath();strikePath(c,{...v,angle:a+Math.PI});c.fill();c.stroke();}}
 c.beginPath();strikePath(c,v);c.fill('evenodd');c.stroke();
}
function curvedPreview(c,p,ch,a){const pat=ch.pattern,n=pat.count||1,spread=pat.spread||0,R=ch.range,step=R/32,width=(pat.r||7)+4;c.shadowBlur=0;
 for(let k=0;k<n;k++){const base=a+(n===1?0:(k/(n-1)*2-1)*spread),curve=pat.curve?(k%2?-pat.curve:pat.curve):0,speed=pat.speed||710,points=[{x:p.x,y:p.y}];let x=p.x,y=p.y,ang=base;
  for(let j=1;j<=32;j++){const t=j*step/speed;if(pat.wave)ang=base+Math.sin(t*(pat.waveFreq||9)+(k%2?Math.PI:0))*pat.wave;else ang+=curve*step/speed;x+=Math.cos(ang)*step;y+=Math.sin(ang)*step;points.push({x,y,a:ang});}
  c.beginPath();for(let j=0;j<points.length;j++){const q=points[j],ang=q.a||base,x=q.x-Math.sin(ang)*width,y=q.y+Math.cos(ang)*width;j?c.lineTo(x,y):c.moveTo(x,y);}for(let j=points.length-1;j>=0;j--){const q=points[j],ang=q.a||base;c.lineTo(q.x+Math.sin(ang)*width,q.y-Math.cos(ang)*width);}c.closePath();c.fill();c.stroke();
 }
}
function shotGlyph(c,shape,r,col,time){

 if(['spark','lightning','helix'].includes(shape)){polygon(c,[[r*1.8,0],[r*.2,-r*.45],[r*.5,-r*1.4],[-r*1.7,0],[-r*.2,r*.4],[-r*.5,r*1.3]],col,'#ffffff');return;}
 if(['star','sun','shuriken','razor','crest'].includes(shape)){const count=shape==='shuriken'?4:shape==='razor'?8:5,points=[];for(let k=0;k<count*2;k++){const a=k*Math.PI/count+time*(shape==='sun'?2:5),rad=k%2?r*.45:r*1.4;points.push([Math.cos(a)*rad,Math.sin(a)*rad]);}polygon(c,points,col,'#fff');return;}
 if(['arrow','dart','spear','dagger','feather','quill','rivet'].includes(shape)){line(c,-r*2.7,0,r,0,col,shape==='rivet'?r:3);polygon(c,[[r*2,0],[-r*.4,-r],[-r*.1,0],[-r*.4,r]],col,'#fff');if(shape==='feather')for(let k=0;k<3;k++)line(c,-r*(k*.6+.4),0,-r*(k*.6+.9),-r,col,2);return;}
 if(['crescent','sickle','scythe','karambit','boomerang','horseshoe','magnet'].includes(shape)){c.lineWidth=shape==='magnet'?r*.8:4;c.strokeStyle=col;c.beginPath();if(shape==='boomerang'){c.moveTo(-r,r);c.lineTo(r,0);c.lineTo(-r,-r);}else c.arc(0,0,r*1.3,-2.1,2.1);c.stroke();if(shape==='scythe'||shape==='sickle')line(c,0,0,-r*2,0,col,3);return;}
 if(['seed','petal','spore','droplet','heart','flower'].includes(shape)){if(shape==='flower'){for(let k=0;k<5;k++){const a=k*TAU/5;ellipse(c,Math.cos(a)*r*.65,Math.sin(a)*r*.65,r*.65,r*.65,col);}ellipse(c,0,0,r*.4,r*.4,'#fff');}else if(shape==='heart'){c.beginPath();c.moveTo(r*1.5,0);c.bezierCurveTo(-r*2,-r*2,-r*2,0,-r*.5,0);c.bezierCurveTo(-r*2,0,-r*2,r*2,r*1.5,0);c.fillStyle=col;c.fill();}else{ellipse(c,0,0,r*1.5,r*.8,col);line(c,-r,0,r,0,'#fff',1.5);if(shape==='spore')for(let k=0;k<4;k++)ellipse(c,Math.cos(k*TAU/4)*r*1.5,Math.sin(k*TAU/4)*r*1.5,2,2,col);}return;}
 if(['wave','sound','halo','planet'].includes(shape)){c.strokeStyle=col;c.lineWidth=shape==='sound'?3:4;for(let k=0;k<(shape==='sound'?3:1);k++){c.beginPath();if(shape==='halo'||shape==='planet')c.ellipse(0,0,r*(1.4+k*.3),r*.7,.2,0,TAU);else c.arc(-k*r*.7,0,r*1.3,-1.2,1.2);c.stroke();}if(shape==='planet')ellipse(c,0,0,r*.6,r*.6,col);return;}
 if(['thread','rope','mesh','shuttle'].includes(shape)){c.strokeStyle=col;c.lineWidth=shape==='rope'?5:2;c.beginPath();c.moveTo(-r*2,0);c.bezierCurveTo(-r,-r*2,r,r*2,r*2,0);c.stroke();if(shape==='mesh'){line(c,-r,-r,r,r,col,2);line(c,-r,r,r,-r,col,2);}if(shape==='shuttle')polygon(c,[[r*2,0],[0,r],[-r*2,0],[0,-r]],col,'#fff');return;}
 if(['note','bell','chime','cup','lantern','pot','flask','pin'].includes(shape)){if(shape==='note'){ellipse(c,-r*.5,r*.6,r*.7,r*.4,col);line(c,0,r*.4,0,-r*1.3,col,3);line(c,0,-r*1.3,r,-r*.6,col,3);}else{round(c,-r*.75,-r,r*1.5,r*1.8,shape==='flask'?5:2,col,'#fff',1);line(c,-r,-r,r,-r,col,3);if(shape==='bell'){ellipse(c,0,r,3,3,col);line(c,-r,r*.7,r,r*.7,col,3);}if(shape==='lantern')for(const x of [-r*.4,r*.4])line(c,x,-r*.7,x,r*.6,'#fff',1);}return;}
 if(['rocket','comet','slug','capsule','screw'].includes(shape)){round(c,-r*1.8,-r*.65,r*2.8,r*1.3,r*.6,col,'#fff',1);polygon(c,[[r, -r*.65],[r*1.8,0],[r,r*.65]],'#fff');if(shape==='rocket'||shape==='comet')polygon(c,[[-r*1.5,-r*.5],[-r*3,0],[-r*1.5,r*.5]],col);if(shape==='screw')for(let k=0;k<3;k++)line(c,-r*(k*.6),-r*.5,-r*(k*.6+.5),r*.5,'#fff',1);return;}
 if(['crystal','icicle','scrap','claw','scissor'].includes(shape)){polygon(c,[[r*2,0],[0,-r],[-r*1.3,-r*.4],[-r*.7,r],[r*.6,r*.5]],col,'#fff');if(shape==='claw'||shape==='scissor')line(c,-r,-r,r,r,'#fff',2);return;}
 if(['plate','parcel','ticket','node','tile','die','crate','trap','bar','key','sign','mask','bomb','stone','moon','anvil','saw','cloud'].includes(shape)){const w=['bar','plate','ticket'].includes(shape)?r*2:r;round(c,-w,-r,w*2,r*2,shape==='bomb'||shape==='stone'||shape==='moon'||shape==='cloud'?r:2,col,'#fff',1.4);if(shape==='die'){for(const k of [-1,1])ellipse(c,k*r*.5,k*r*.5,2,2,'#fff');}else if(shape==='trap'||shape==='crate'){line(c,-r,-r,r,r,'#fff',2);line(c,-r,r,r,-r,'#fff',2);}else if(shape==='key'){ellipse(c,-r,0,r*.5,r*.5,'#fff');line(c,0,0,r*2,0,col,4);}else line(c,-w*.5,0,w*.5,0,'#fff',2);return;}
 if(shape==='bottle'||shape==='kettle'){round(c,-r*.7,-r*.6,r*1.4,r*1.6,4,col,'#fff',1);round(c,-r*.3,-r*1.2,r*.6,r*.7,2,col);if(shape==='kettle'){line(c,r*.5,-r*.2,r*1.4,-r*.7,col,4);c.strokeStyle=col;c.lineWidth=3;c.beginPath();c.arc(-r*.8,r*.1,r*.6,1,5);c.stroke();}return;}
 if(shape==='ink'){c.beginPath();c.moveTo(r*1.5,0);c.bezierCurveTo(-r,-r*1.8,-r*1.5,-r,-r,0);c.bezierCurveTo(-r*1.5,r,r,r*1.6,r*1.5,0);c.fillStyle=col;c.fill();return;}
 if(shape==='kernel'){for(const [x,y]of [[0,-r*.5],[-r*.6,r*.3],[r*.6,r*.3]])ellipse(c,x,y,r*.65,r*.7,col);return;}
 if(shape==='boulder'){polygon(c,[[-r,-r*.5],[-r*.2,-r],[r,-r*.6],[r*.8,r*.7],[0,r],[-r*.9,r*.4]],col,'#fff');return;}
 if(shape==='diamond'){polygon(c,[[r*1.6,0],[0,r],[-r*1.3,0],[0,-r]],col,'#fff');return;}
 if(shape==='fist'){round(c,-r,-r,r*2,r*2,4,col,'#fff',1.5);for(let k=-1;k<=1;k++)line(c,0,k*r*.45,r,k*r*.45,'#fff',1);return;}
 if(shape==='ribbon'){c.strokeStyle=col;c.lineWidth=r;c.beginPath();c.moveTo(-r*2,0);c.bezierCurveTo(-r,-r*2,r,r*2,r*2,0);c.stroke();return;}
 if(shape==='spool'){round(c,-r,-r*.7,r*2,r*1.4,2,col);for(const x of [-r,r])ellipse(c,x,0,r*.4,r,col);return;}

 if(['disc','cog','marble','orb','shell'].includes(shape)){ellipse(c,0,0,r*1.2,r*1.2,col);c.strokeStyle='#f2f4ef';c.lineWidth=2;c.beginPath();c.arc(0,0,r*.65,0,TAU);c.stroke();if(shape==='cog'){for(let k=0;k<6;k++){const a=k*TAU/6+time*3;line(c,Math.cos(a)*r,Math.sin(a)*r,Math.cos(a)*r*1.5,Math.sin(a)*r*1.5,col,3);}}}
 else if(['needle','quill','spool','ribbon'].includes(shape)){line(c,-r*3,0,r*2,0,col,Math.max(3,r*.65));polygon(c,[[r*2,0],[r,-r*.7],[r,r*.7]],'#f2f4ef');}
 else if(shape==='barrel'){round(c,-r,-r*.8,r*2,r*1.6,4,col,'#f2f4ef',1.5);for(const x of [-r*.5,r*.5])line(c,x,-r*.7,x,r*.7,'#fff',2);}
 else if(shape==='hook'){c.strokeStyle=col;c.lineWidth=4;c.beginPath();c.arc(0,0,r,-2.7,1.5);c.stroke();line(c,-r*2,-r*.4,-r*.3,-r*.4,col,3);}
 else if(shape==='medical'){round(c,-r,-r*.3,r*2,r*.6,2,col);round(c,-r*.3,-r,r*.6,r*2,2,col);}
 else if(shape==='umbrella'){c.beginPath();c.arc(0,0,r*1.4,Math.PI,0);c.closePath();c.fillStyle=col;c.fill();line(c,0,-r,0,r,col,2);}
 else if(shape==='pixel'){for(const [x,y]of [[0,0],[-r,-r],[r,r]])round(c,x-r*.5,y-r*.5,r,r,1,col,'#fff',1);}
 else if(shape==='card')round(c,-r,-r*1.4,r*2,r*2.8,2,col,'#fff',1.5);
 else if(shape==='crown')polygon(c,[[-r,-r],[0,-r*.3],[r,-r],[r*.6,r],[-r*.6,r]],col,'#fff');
 else polygon(c,[[r*1.6,0],[-r,r],[-r*.4,0],[-r,-r]],col,'#ffffffaa');
}

function fighter(c,p,time=0,options={}){if(p.hidden||!p.alive&&!options.portrait)return;const sk=Z.skinOf(p.skin,p.fighter),ch=sk?{...Z.fighter(p.fighter),color:sk.color,dark:sk.dark}:Z.fighter(p.fighter),role=ch.archetype,r=ch.r,angle=p.angle||0,stride=Math.sin((p.run||0)*TAU)*Math.min(1,Math.hypot(p.vx||0,p.vy||0)/150),team=teamColor(p.team),bob=Math.abs(stride)*1.1;
 c.save();c.translate(p.x||0,p.y||0);if(p.cloak>0)c.globalAlpha*=.48;if(Z.hasHyper(p)&&p.hyperTime>0&&!options.portrait){for(let k=0;k<10;k++){const a=k*TAU/10+time*.8,R=r+9,tip=R+10+Math.sin(time*13+k)*6;c.beginPath();c.moveTo(Math.cos(a-.18)*R,Math.sin(a-.18)*R);c.quadraticCurveTo(Math.cos(a-.12)*(tip-3),Math.sin(a-.12)*(tip-3),Math.cos(a+.1)*tip,Math.sin(a+.1)*tip);c.quadraticCurveTo(Math.cos(a+.04)*(R+3),Math.sin(a+.04)*(R+3),Math.cos(a+.18)*R,Math.sin(a+.18)*R);c.closePath();c.fillStyle=k%2?'#c77dffbb':'#a34ffaaa';c.fill();}}ellipse(c,0,15,r*.94,r*.38,'#10293666');if(p.invuln>0){c.strokeStyle=team+'77';c.lineWidth=2;c.beginPath();c.arc(0,-1,r+9+Math.sin(time*8),0,TAU);c.stroke();}
 if(!options.portrait){const ring=superRingColor(p);if(ring){c.save();c.strokeStyle=ring;c.lineWidth=3.5;c.beginPath();c.arc(0,0,r+13,0,TAU);c.stroke();if(Z.hasHyper(p)&&(p.hyperCharge>=100||p.hyperTime>0))for(let k=0;k<4;k++){const a=k*TAU/4,R=r+13;c.beginPath();c.moveTo(Math.cos(a-.16)*R,Math.sin(a-.16)*R);c.lineTo(Math.cos(a)*(R+10),Math.sin(a)*(R+10));c.lineTo(Math.cos(a+.16)*R,Math.sin(a+.16)*R);c.stroke();}c.restore();}c.strokeStyle=team;c.lineWidth=3;c.beginPath();c.ellipse(0,10,r+6,(r+6)*.64,0,0,TAU);c.stroke();if(options.you){polygon(c,[[-4,-r-35],[4,-r-35],[0,-r-29]],'#eaf4db');}}
 c.save();if(sk?.id==='grey')c.filter='grayscale(1)';c.rotate(angle);round(c,-10,-r*.64-3+stride*3,19,13,6,'#203a47','#142d38',2);round(c,-10,r*.64-9-stride*3,19,13,6,'#203a47','#142d38',2);
 // Rear equipment gives every role a different silhouette.
 if(role==='rook'){round(c,-r-7,-18,17,36,7,'#5e6d72','#17333d',2);for(const y of [-11,0,11])round(c,-r-3,y-2,9,4,2,'#d5b273');}
 if(role==='sprig'){round(c,-r-6,-14,13,28,5,'#e2e4c8','#17333d',2);line(c,-r,-6,-r,6,'#629f84',4);line(c,-r-5,0,-r+5,0,'#629f84',4);}
 if(role==='fuse'){for(const y of [-11,0,11])ellipse(c,-r-2,y,8,7,'#a076a6');for(const y of [-11,0,11])ellipse(c,-r-4,y-2,3,3,'#ebbbdb');}
 if(role==='relay'){ellipse(c,-r-2,0,10,16,'#527b83');line(c,-r-5,-18,-r-5,18,ch.color,3);ellipse(c,-r-5,-20,4,4,'#d3ebcc');}
 if(role==='wisp')polygon(c,[[-r+3,-13],[-r-20,0],[-r+3,13],[-r-5,0]],ch.dark,'#233448');
 const variant=ch.appearance?.profile||0;if(variant===1){for(const y of [-r,r])polygon(c,[[-8,y],[-2,y+(y<0?-9:9)],[6,y]],ch.color,'#18323d');}else if(variant===2){for(const y of [-r,r]){line(c,-7,y,-13,y+(y<0?-6:6),ch.color,4);ellipse(c,-13,y+(y<0?-7:7),4,4,ch.color);}}else if(variant===3){round(c,-r-4,-r+5,9,r*2-10,3,'#edf0d07a');}else if(variant===4){for(const y of [-r,r])round(c,-12,y-3,21,6,3,ch.dark,'#bbd4d344');}
 const g=c.createLinearGradient(-r,-r,r,r);g.addColorStop(0,ch.color);g.addColorStop(.55,ch.color);g.addColorStop(1,ch.dark);round(c,-r,-r-bob,r*2,r*2,(role==='rook'?9:role==='wisp'?12:15)+(ch.appearance?.profile||0),g,'#17313b',3);round(c,-r+5,-r+4-bob,r*2-11,4,3,'#ffffff38');
 // Face plate and expressive eyes are kept readable at gameplay size.
 round(c,2,-r*.6-bob,r*.85,r*1.2,8,'#163947','#102e38',2);for(const yy of [-5,5])round(c,r*.32,yy-1.8-bob,4,3,1.5,'#dcf7db');
 if(role==='sprig'&&variant===0){round(c,-9,-5-bob,13,4,1,'#e9f6dd');round(c,-4.5,-9.5-bob,4,13,1,'#e9f6dd');}
 if(role==='jolt'&&variant===0)polygon(c,[[-11,-8],[-3,-8],[-7,-1],[-1,-1],[-12,11],[-8,2],[-14,2]],'#eaf3da');
 if(role==='fuse'&&variant===0){round(c,-12,-7-bob,10,14,4,'#263e4d');ellipse(c,-7,-1-bob,3,4,'#edcca0');}
 if(role==='rook'&&variant===0){round(c,-12,-11-bob,8,22,3,'#e7d5a1');line(c,-8,-6,-8,5,'#a67f4b',2);}
 if(role==='wisp'&&variant===0)polygon(c,[[-12,-9],[-2,0],[-12,9],[-6,0]],'#e7e0ff');
 // Attached hands and weapons. Recoil is small and entirely visual.
 if(variant>0){c.fillStyle='#ecf1d9';c.font='bold 10px sans-serif';c.textAlign='center';c.fillText(ch.crest,-7,4-bob);}
 accessory(c,ch,r,bob);armorDetails(c,ch,r,bob);
 const recoil=p.attackCD>0?Math.sin(Math.min(1,p.attackCD/Z.fighter(p.fighter).rate)*Math.PI)*3:0;
 if(ch.pattern.tankStyle){tankWeapon(c,ch,r,recoil,time);}
 else if(role==='rook'){for(const y of [-19,19]){round(c,10-recoil,y-9,25,18,6,'#455f6c','#17313b',2);round(c,25-recoil,y-7,9,14,3,'#e2b35e');}}
 else if(role==='fuse'){round(c,11-recoil,-12,33,24,7,'#43546c','#17313b',2);ellipse(c,40-recoil,0,8,11,'#1b3444');ellipse(c,40-recoil,0,5,7,'#dbc5d9');round(c,16-recoil,-8,16,3,1,'#bc9abf');}
 else if(role==='sprig'){round(c,12-recoil,-8,32,16,6,'#d9e5c5','#254f50',2);ellipse(c,40-recoil,0,6,6,'#85ccac');glow(c,40-recoil,0,13,'#b5f2bd33');}
 else if(role==='wisp'){for(const y of [-12,12]){round(c,10,y-4,13,8,4,'#6b628e','#203447',1.5);polygon(c,[[21,y-4],[40,y],[21,y+4]],'#d6dff2','#4c537c');}}
 else if(role==='relay'){round(c,10-recoil,-10,30,20,6,'#547d86','#17313b',2);c.strokeStyle=ch.color;c.lineWidth=3;c.beginPath();c.ellipse(39-recoil,0,8,13,0,0,TAU);c.stroke();ellipse(c,39-recoil,0,4,7,'#d7efc9');}
 else if(ch.classId==='marksman'){round(c,8-recoil,-6,51,12,4,ch.dark,'#17313b',2);round(c,22-recoil,-5,23,3,1,ch.color);round(c,55-recoil,-4,10,8,2,'#d9e5dc');round(c,18-recoil,-12,20,7,3,'#264655','#bad6ce',1);ellipse(c,34-recoil,-8,3,3,ch.color);round(c,4-recoil,4,13,8,3,ch.dark);}
 else{round(c,12-recoil,-8,35,16,5,'#305b7d','#193646',2);round(c,21-recoil,-6,17,4,2,'#9edcfd');round(c,44-recoil,-6,6,12,2,'#d8e5d9');}
 if(ch.classId!=='tank'&&ch.pattern.arsenal&&ch.pattern.shape){c.save();c.translate(ch.classId==='marksman'?58:43,0);c.scale(.65,.65);shotGlyph(c,ch.pattern.shape,8,ch.color,time);c.restore();}
 if(p.hitFlash>0){c.globalAlpha*=Math.min(.65,p.hitFlash*4);round(c,-r,-r,r*2,r*2,14,'#ffffff');}
 c.restore();if(!options.portrait){const width=ch.r*2+22;round(c,-width/2,-r-21,width,6,3,'#142d38');round(c,-width/2+1,-r-20,Math.max(0,(width-2)*p.hp/p.maxHP),4,2,team);if(p.shield>0){c.strokeStyle='#f6d78f88';c.lineWidth=3;c.beginPath();c.arc(0,0,r+5,0,TAU);c.stroke();}c.textAlign='center';c.font='600 11px system-ui';c.fillStyle='#e6eee1';c.shadowColor='#102431';c.shadowBlur=4;c.fillText(p.name+(p.level>=Z.MAX_LEVEL?' ★':''),-1,-r-27);c.shadowBlur=0;}
 c.restore();}
function superRingColor(p){const h=Z.hasHyper(p);return p.alive&&!p.hidden&&(p.charge>=100||h&&(p.hyperCharge>=100||p.hyperTime>0))?(h&&p.hyperTime>0?'#c77dff':p.aimingSuper?'#ffdb4d':'#ffffff'):null;}
function portrait(canvas,id,skin=null){const c=canvas.getContext('2d'),ch=Z.fighter(id);c.clearRect(0,0,canvas.width,canvas.height);const g=c.createLinearGradient(0,0,canvas.width,canvas.height);g.addColorStop(0,ch.dark);g.addColorStop(1,'#263f47');round(c,0,0,canvas.width,canvas.height,14,g);c.save();c.translate(canvas.width*(ch.classId==='marksman'?.43:.49),canvas.height*.5);const scale=canvas.height/75*(ch.classId==='marksman'?.88:ch.classId==='tank'?.82:1);c.scale(scale,scale);fighter(c,{fighter:id,skin,x:0,y:0,angle:-.4,team:0,alive:true,run:0,invuln:0,cloak:0,attackCD:0},0,{portrait:true});c.restore();}
function arsenalPreview(c,p,ch,a,mouse){const pat=ch.pattern;c.shadowBlur=0;
 if(pat.strike){const strikes=Z.basicStrikes(p,ch,{aimX:mouse.x,aimY:mouse.y},1);for(const v of strikes){c.beginPath();strikePath(c,v);c.fill('evenodd');c.stroke();if(v.delay){c.setLineDash([3,8]);c.beginPath();strikePath(c,{...v,r:v.r*.8});c.stroke();c.setLineDash([]);}}return;}
 for(const lane of Z.basicPaths(p,ch,a)){const pts=lane.points,w=lane.width+2;c.beginPath();for(let k=0;k<pts.length;k++){const q=pts[k],x=q.x-Math.sin(q.angle)*w,y=q.y+Math.cos(q.angle)*w;k?c.lineTo(x,y):c.moveTo(x,y);}for(let k=pts.length-1;k>=0;k--){const q=pts[k];c.lineTo(q.x+Math.sin(q.angle)*w,q.y-Math.cos(q.angle)*w);}c.closePath();c.fill();c.stroke();const first=pts[0],last=pts.at(-1);
 if(pat.returning){c.setLineDash([7,6]);line(c,last.x,last.y,p.x-Math.sin(a)*(lane.side||0),p.y+Math.cos(a)*(lane.side||0),'#ffffffaa',1.3);c.setLineDash([]);}
 if(pat.split||pat.splash||pat.wake){c.setLineDash([3,7]);c.beginPath();c.arc(last.x,last.y,pat.splash||pat.wake&&62||130,0,TAU);c.stroke();c.setLineDash([]);}
 if(lane.delay){c.beginPath();c.arc(first.x,first.y,5+lane.delay*8,0,TAU);c.stroke();}}
}
function aimPreview(c,own,mouse,state){if(mouse.superAim){superPreview(c,own,mouse);return;}const ch=Z.fighter(own.fighter),pat=ch.pattern||{},a=Math.atan2(mouse.y-own.y,mouse.x-own.x),R=ch.range,role=ch.archetype;c.save();c.lineWidth=2.5;c.strokeStyle='#ffffff';c.fillStyle='#ffffff1f';c.shadowColor='#ffffff';c.shadowBlur=0;c.lineJoin='round';
 if(role==='fuse'||pat.lob){const d=Math.min(R,Math.hypot(mouse.x-own.x,mouse.y-own.y)),tx=own.x+Math.cos(a)*d,ty=own.y+Math.sin(a)*d,mx=(own.x+tx)/2,my=(own.y+ty)/2-Math.max(55,d*.4);c.setLineDash([9,8]);c.beginPath();c.moveTo(own.x,own.y);c.quadraticCurveTo(mx,my,tx,ty);c.stroke();c.setLineDash([]);const r=(pat.r||94)*(1+(own.pass?.wideblast||0))*(own.oddTime>0?(ch.id==='kettle'?1.3:ch.id==='doodle'?1.35:1):1),points=Z.basicBombTargets(state||{W:Z.W,H:Z.H},own,ch,{aimX:mouse.x,aimY:mouse.y});for(const point of points){c.beginPath();strikePath(c,Z.bombFootprint({...pat,endX:point.x,endY:point.y,r,angle:a}));c.fill('evenodd');c.stroke();}c.shadowBlur=0;c.strokeStyle='#ffffff55';c.lineWidth=1.3;c.setLineDash([4,10]);c.beginPath();c.arc(own.x,own.y,R,0,TAU);c.stroke();c.setLineDash([]);}
 else if(pat.tankStyle){tankPreview(c,own,ch,a,mouse);}
 else if(pat.arsenal){arsenalPreview(c,own,ch,a,mouse);}
 else if(pat.curve||pat.wave){curvedPreview(c,own,ch,a);}
 else if(role==='rook'){const arc=pat.arc||.85;c.beginPath();c.moveTo(own.x,own.y);c.arc(own.x,own.y,R+ch.r,a-arc,a+arc);c.closePath();c.fill();c.stroke();}
 else{const count=pat.count||(role==='jolt'||role==='wisp'?3:1),spread=pat.spread??(role==='jolt'?.055:role==='wisp'?.17:0),w=(pat.r||(role==='jolt'?5:role==='wisp'?7:9))+3;c.translate(own.x,own.y);c.rotate(a);if(count>1&&spread>0){c.beginPath();c.moveTo(0,-w);c.lineTo(Math.cos(-spread)*R,Math.sin(-spread)*R-w);c.arc(0,0,R,-spread,spread);c.lineTo(Math.cos(spread)*R,Math.sin(spread)*R+w);c.lineTo(0,w);c.closePath();c.fill();c.stroke();}else{c.beginPath();c.roundRect(0,-w,R,w*2,w);c.fill();c.stroke();}}
 c.restore();}
function superPreview(c,p,mouse){const ch=Z.fighter(p.fighter),R=Z.superRange(p.fighter),a=Math.atan2(mouse.y-p.y,mouse.x-p.x),d=Math.min(R,Math.hypot(mouse.x-p.x,mouse.y-p.y)),x=p.x+Math.cos(a)*d,y=p.y+Math.sin(a)*d,s=ch.superSpec,area=ch.classId==='artillery'||s?.turrets||s?.fields||s?.heal||['halo','rescue','thorns','rally','heartwave'].includes(ch.superKind)||ch.archetype==='sprig';
 c.save();const hc=Z.hasHyper(p)&&p.hyperTime>0;c.strokeStyle=hc?'#c77dff':'#fff';c.fillStyle=hc?'#c77dff24':'#ffffff24';c.lineWidth=3;c.shadowColor='#fff';c.shadowBlur=0;c.setLineDash([8,9]);c.beginPath();c.arc(p.x,p.y,R,0,TAU);c.stroke();c.setLineDash([]);
 if(area){c.beginPath();c.moveTo(p.x,p.y);if(ch.classId==='artillery')c.quadraticCurveTo((p.x+x)/2,(p.y+y)/2-Math.max(55,d*.35),x,y);else c.lineTo(x,y);c.stroke();const r=s?.aoe?.r||s?.bombs?.[0]?.r||s?.fields?.[0]?.r||85;c.beginPath();c.arc(x,y,r,0,TAU);c.fill();c.stroke();}else{const width=s?.shots?.r||12;c.translate(p.x,p.y);c.rotate(a);c.beginPath();c.roundRect(0,-width,R,width*2,width);c.fill();c.stroke();}
 c.restore();}
function drawShot(c,q,time){const col=q.color||(q.heal?'#b9efbe':teamColor(q.team)),r=q.r,kind=q.kind==='rail'?'rail':q.kind==='turret'?'turret':q.cls;c.save();c.translate(q.x,q.y);c.rotate(Math.atan2(q.dy,q.dx));glow(c,0,0,r*3.4,col+'55');
 if(q.shape){shotGlyph(c,q.shape,r,col,time);c.restore();return;}
 switch(kind){
  case 'rail':case 'marksman':line(c,-r*(kind==='rail'?5:9),0,0,0,col,Math.max(3,r*.9));line(c,-r*3,0,r*.6,0,'#ffffff',Math.max(1.5,r*.4));break;
  case 'damage':round(c,-r*3.4,-r*.75,r*4.4,r*1.5,r*.75,col,'#ffffffaa',1.2);break;
  case 'healer':ellipse(c,0,0,r*1.35,r*1.35,col);line(c,-r*.7,0,r*.7,0,'#ffffff',2);line(c,0,-r*.7,0,r*.7,'#ffffff',2);break;
  case 'assassin':c.rotate(time*18);for(let k=0;k<3;k++){c.rotate(TAU/3);polygon(c,[[0,0],[r*1.9,-r*.55],[r*1.25,r*.45]],col,'#ffffffaa');}break;
  case 'controller':c.rotate(time*6);polygon(c,[[r*1.5,0],[0,r*1.5],[-r*1.5,0],[0,-r*1.5]],col,'#ffffffcc');break;
  case 'tank':c.strokeStyle=col;c.lineWidth=Math.max(4,r*.9);c.lineCap='round';c.beginPath();c.arc(-r,0,r*1.7,-1.1,1.1);c.stroke();break;
  case 'artillery':ellipse(c,0,0,r*1.25,r*1.25,col);ellipse(c,-r*.3,-r*.3,r*.45,r*.45,'#ffffffaa');break;
  default:line(c,-17,0,0,0,col,r*1.4);ellipse(c,0,0,r*.55,r*.55,'#f1f6d9');}
 c.restore();}
function star(c,x,y,r,fill){const pts=[];for(let k=0;k<10;k++){const a=-Math.PI/2+k*Math.PI/5,rr=k%2?r*.45:r;pts.push([x+Math.cos(a)*rr,y+Math.sin(a)*rr]);}polygon(c,pts,fill,'#17313b');}
function gem(c,x,y,r){polygon(c,[[x,y-r],[x+r*.8,y-r*.2],[x,y+r],[x-r*.8,y-r*.2]],'#c48cff','#f3e3ff');}
function cube(c,x,y,r,time){glow(c,x,y,r*2.4,'#7cf08a44');round(c,x-r,y-r+Math.sin(time*4+x)*2,r*2,r*2,3,'#5fd86d','#e6ffe6',2);}
function overhead(c,p,time){if(p.poison){ellipse(c,p.x+25,p.y-30,4,6,'#93ee73');ellipse(c,p.x+33,p.y-20,3,4,'#93ee7399');}const r=Z.fighter(p.fighter).r,y=p.y-r-44;if(p.gems>0){gem(c,p.x-10,y,7);c.fillStyle='#f3e3ff';c.font='700 12px system-ui';c.textAlign='left';c.fillText(p.gems,p.x-1,y+5);}if(p.stars){const n=p.stars,w=n*12;for(let k=0;k<n;k++)star(c,p.x-w/2+6+k*12,y,6,p.blue&&k===n-1?'#6fc3ff':'#f5d36b');}if(p.cubes>0){cube(c,p.x-10,y,5,time);c.fillStyle='#e6ffe6';c.font='700 12px system-ui';c.textAlign='left';c.fillText(p.cubes,p.x-1,y+5);}}
let relTeam=null;
function scene(c,s,time,localId,mouse,dt=1/60){const own=s.players.find(p=>p.id===localId),md=Z.mode(s.mode);relTeam=md.showdown&&own?own.team:null;const cx=s.W/2,cy=s.H/2;
 c.drawImage(terrain(s),0,0);
 if(s.mode==='zone'){const color=s.zoneState===0?'#7ad6ec':s.zoneState===1?'#f2ae86':s.zoneState===2?'#f5d18e':'#c7d7bd';c.fillStyle=color+'15';c.beginPath();c.arc(cx,cy,130,0,TAU);c.fill();c.setLineDash([12,8]);c.strokeStyle=color+'b0';c.lineWidth=3;c.stroke();c.setLineDash([]);c.save();c.translate(cx,cy);c.rotate(time*.08);for(let i=0;i<4;i++){c.rotate(TAU/4);polygon(c,[[112,-6],[122,0],[112,6]],color+'88');}c.restore();c.textAlign='center';c.font='700 10px system-ui';c.fillStyle=color+'99';c.fillText(s.zoneState===2?'CONTESTED':'CAPTURE ZONE',cx,cy+4);}
 if(s.mode==='gems'){round(c,cx-34,cy-34,68,68,16,'#2a2140','#c48cff',3);glow(c,cx,cy,60,'#c48cff33');gem(c,cx,cy,14+Math.sin(time*3)*2);}
 for(const f of s.fields){c.globalAlpha=f.delay>0?.35:1;c.fillStyle=f.hyper?'#c77dff24':f.heal?'#9ce3b624':'#eeb27824';c.strokeStyle=f.hyper?'#c77dffbb':f.heal?'#b6eac47a':'#edac7a77';c.lineWidth=2;c.beginPath();c.arc(f.x,f.y,f.r,0,TAU);c.fill();c.stroke();for(let n=0;n<6;n++){const a=n*TAU/6+time*.7,x=f.x+Math.cos(a)*f.r*.7,y=f.y+Math.sin(a)*f.r*.7;ellipse(c,x,y,3,3,f.heal?'#bde9b699':'#f2b88a99');}}
 c.globalAlpha=1;
 for(const g of s.gems||[])gem(c,g.x,g.y+Math.sin(time*4+g.id)*2,9);
 for(const k of s.cubes||[])cube(c,k.x,k.y,8,time);
 if(s.star){glow(c,s.star.x,s.star.y,40,'#6fc3ff55');star(c,s.star.x,s.star.y,16+Math.sin(time*4)*2,'#6fc3ff');}
 if(own?.alive&&mouse&&s.phase==='playing')aimPreview(c,own,mouse,s);
 for(const v of s.strikes||[]){c.save();c.strokeStyle='#ffffffaa';c.fillStyle='#ffffff14';c.lineWidth=2;c.setLineDash([6,6]);c.beginPath();strikePath(c,v);c.fill('evenodd');c.stroke();c.restore();}
 for(const b of s.bombs){if(b.age<0)continue;const t=Z.clamp(b.age/b.duration,0,1),color=b.color||teamColor(b.team);c.strokeStyle=b.owner===localId?'#ffffffcc':teamColor(b.team)+'aa';c.lineWidth=2;c.beginPath();strikePath(c,Z.bombFootprint(b));c.stroke();c.fillStyle=color+'22';c.fill('evenodd');ellipse(c,b.x,b.y,10,5,'#11293c44');const lift=Math.sin(t*Math.PI)*95;glow(c,b.x,b.y-lift,17,color+'55');if(b.shape){c.save();c.translate(b.x,b.y-lift);c.rotate(time*2);shotGlyph(c,b.shape,10,color,time);c.restore();}else ellipse(c,b.x,b.y-lift,10,10,color);ellipse(c,b.x-2,b.y-lift-3,4,4,'#ffffffcc');line(c,b.x,b.y-lift-10,b.x+4,b.y-lift-15,'#f1d6a7',2);}
 for(const t of s.turrets||[]){if(!t.alive)continue;if(t.box){c.save();c.translate(t.x,t.y);ellipse(c,0,18,30,10,'#10293766');round(c,-28,-28,56,56,8,'#8a6a45','#3c2b1c',3);line(c,-24,-24,24,24,'#5d452c',4);line(c,24,-24,-24,24,'#5d452c',4);round(c,-10,-10,20,20,4,'#5fd86d','#e6ffe6',2);if(t.hitFlash>0){c.globalAlpha=.5;round(c,-28,-28,56,56,8,'#ffffff');}c.restore();if(t.hp<t.maxHP){round(c,t.x-26,t.y-40,52,5,2,'#18323e');round(c,t.x-25,t.y-39,50*t.hp/t.maxHP,3,1,'#5fd86d');}continue;}const color=t.hyper?'#c77dff':teamColor(t.team);c.save();c.translate(t.x,t.y);ellipse(c,0,10,24,10,'#10293766');for(const a of [0,TAU/3,TAU*2/3])line(c,0,0,Math.cos(a)*22,Math.sin(a)*22,'#50737b',6);ellipse(c,0,0,20,20,'#294653');c.strokeStyle=color;c.lineWidth=2;c.beginPath();c.arc(0,0,21,0,TAU);c.stroke();c.rotate(t.angle||0);round(c,-5,-10,t.lob?32:37,20,5,'#7da2a4','#18343d',2);ellipse(c,t.lob?25:29,0,4,7,color);c.restore();round(c,t.x-23,t.y-32,46,5,2,'#18323e');round(c,t.x-22,t.y-31,44*t.hp/t.maxHP,3,1,color);}
 for(const k of s.clones||[]){const mine=own&&k.owner===own.id;c.save();if(mine)c.globalAlpha=.55;fighter(c,{...k,alive:true,hp:k.hp,maxHP:k.maxHP,level:1,vx:60,vy:0,invuln:0,cloak:0,attackCD:0,shield:0,hitFlash:0},time,{});c.restore();}
 const ordered=s.players.filter(p=>!p.hidden&&p.alive).sort((a,b)=>a.y-b.y);for(const p of ordered){fighter(c,p,time,{you:p.id===localId});overhead(c,p,time);}
 if(s.ball){const b=s.ball;ellipse(c,b.x,b.y+10,12,5,'#10293766');glow(c,b.x,b.y,26,'#ffffff33');ellipse(c,b.x,b.y,12,12,'#f4f4ef');polygon(c,[0,1,2,3,4].map(k=>[b.x+Math.cos(k*TAU/5+time*2)*5,b.y+Math.sin(k*TAU/5+time*2)*5]),'#24323a');}
 for(const q of s.shots)drawShot(c,q,time);
 for(const e of s.effects){const t=1-e.life/e.max,col=e.type==='heal'?'#b8f0bd':e.color||teamColor(e.team||0);c.save();c.globalAlpha=1-t;
  if(e.type==='swing'){c.translate(e.x,e.y);c.rotate(e.angle);c.strokeStyle='#f3ca8a';c.lineWidth=10*(1-t);c.beginPath();c.arc(0,0,e.r*(.55+t*.45),-.85,.85);c.stroke();}
  else if(e.type==='heal'){for(const y of [-7,7])line(c,e.x-5,e.y-y-t*24,e.x+5,e.y-y-t*24,col,3);line(c,e.x,e.y-10-t*24,e.x,e.y+10-t*24,col,3);}
  else if(e.type==='tankHit'){c.fillStyle=col+'55';c.strokeStyle=col;c.lineWidth=5*(1-t)+1;c.beginPath();strikePath(c,e);c.fill('evenodd');c.stroke();}
  else if(e.type==='super'){const r=e.r*(.3+t*.9);glow(c,e.x,e.y,r*1.3,col+'66');c.strokeStyle='#ffffff';c.lineWidth=7*(1-t)+1;c.beginPath();c.arc(e.x,e.y,r,0,TAU);c.stroke();c.strokeStyle=col;c.lineWidth=5*(1-t)+1;c.beginPath();c.arc(e.x,e.y,r*.7,0,TAU);c.stroke();for(let i=0;i<12;i++){const a=i*TAU/12+t;line(c,e.x+Math.cos(a)*r*.75,e.y+Math.sin(a)*r*.75,e.x+Math.cos(a)*r*1.15,e.y+Math.sin(a)*r*1.15,'#ffffff',3);}if(e.name){c.globalAlpha=Math.min(1,(1-t)*1.6);c.textAlign='center';c.font='900 22px system-ui';c.lineWidth=5;c.strokeStyle='#10202a';c.strokeText(e.name.toUpperCase()+'!',e.x,e.y-70-t*30);c.fillStyle=col;c.fillText(e.name.toUpperCase()+'!',e.x,e.y-70-t*30);}}
  else if(e.type==='rubble'){const n=14;for(let i=0;i<n;i++){const a=i*TAU/n+(i%3)*.4,d=(e.r||40)*(.3+t*1.5)*(.6+(i%4)*.18),x=e.x+Math.cos(a)*d,y=e.y+Math.sin(a)*d-Math.sin(t*Math.PI)*40+t*t*30;c.save();c.translate(x,y);c.rotate(t*8+i);round(c,-6,-4,12,8,2,e.grass?'#5c8e5a':'#b9a888','#3a3a2e',1);c.restore();}glow(c,e.x,e.y,(e.r||40)*1.2,'#f5e2b055');}
  else if(e.type==='quake'){c.strokeStyle='#ffffff';c.lineWidth=6*(1-t);c.beginPath();c.arc(e.x,e.y,e.r*(.3+t),0,TAU);c.stroke();c.strokeStyle='#f5d18e';c.lineWidth=3*(1-t);c.beginPath();c.arc(e.x,e.y,e.r*(.15+t*.8),0,TAU);c.stroke();}
  else if(e.type==='swap'){for(let i=0;i<10;i++){const a=i*TAU/10+t*4,d=e.r*(.2+t);ellipse(c,e.x+Math.cos(a)*d,e.y+Math.sin(a)*d,3,3,'#d9c8ff');}}
  else if(e.type==='cube'){polygon(c,[[e.x,e.y-40-t*30],[e.x+9,e.y-28-t*30],[e.x-9,e.y-28-t*30]],'#5fd86d','#e6ffe6');}
  else{const radius=(e.r||60)*(e.type==='ko'?.2+t:.4+t*.6);c.strokeStyle=col;c.lineWidth=3*(1-t);c.beginPath();c.arc(e.x,e.y,radius,0,TAU);c.stroke();glow(c,e.x,e.y,radius,col+'33');for(let i=0;i<8;i++){const a=i*TAU/8,x=e.x+Math.cos(a)*radius,y=e.y+Math.sin(a)*radius;round(c,x-2,y-2,4,4,1,col);}}
  c.restore();}
 if(s.gasR>0){const r=s.gasR;c.save();c.fillStyle='#4fd16a33';c.beginPath();c.rect(0,0,s.W,s.H);c.arc(cx,cy,r,0,TAU,true);c.fill('evenodd');c.strokeStyle='#8af59acc';c.lineWidth=4;c.beginPath();c.arc(cx,cy,r,0,TAU);c.stroke();for(let i=0;i<36;i++){const a=i*TAU/36+time*.15,x=cx+Math.cos(a)*(r+30+(i%3)*25),y=cy+Math.sin(a)*(r+30+(i%3)*25);ellipse(c,x,y,6+(i%4),6+(i%4),'#6fe38755');}c.restore();}
 relTeam=null;}
return {superRingColor,scene,portrait,fighter,terrain,round,ellipse,line,glow,teamColor};
})();
