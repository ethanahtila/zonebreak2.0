'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),path=require('node:path');
// This exercises the real browser application and renderer against a small DOM
// fixture. Network behavior is tested separately with real WebSocket clients.
function browser(saved=new Map(),protocol='file:'){
 let now=0,raf=null;const listeners={},ids=new Map();
 class Element{
  constructor(tag='div'){this.tagName=tag.toUpperCase();this.children=[];this.dataset={};this.style={setProperty(k,v){this[k]=v;}};this.hidden=false;this.value='';this.textContent='';this.className='';this.width=1280;this.height=860;this.events={};this.classList={toggle:(k,on)=>{const s=new Set(this.className.split(' ').filter(Boolean));if(on??!s.has(k))s.add(k);else s.delete(k);this.className=[...s].join(' ');},add:k=>this.classList.toggle(k,true),remove:k=>this.classList.toggle(k,false)};}
  append(...items){this.children.push(...items);}replaceChildren(...items){this.children=[];this.append(...items);}setAttribute(k,v){this[k]=v;}querySelector(q){return this.children.find(c=>c.className?.split(' ').includes(q.slice(1)))||null;}addEventListener(k,f){this.events[k]=f;}focus(){this.focused=true;}setPointerCapture(){}getBoundingClientRect(){return {left:0,top:0,width:1280,height:860};}
  getContext(){return this.ctx??=new Proxy({globalAlpha:1,createLinearGradient:()=>({addColorStop(){}}),createRadialGradient:()=>({addColorStop(){}}),measureText:t=>({width:t.length*7})},{get:(o,k)=>k in o?o[k]:()=>{},set:(o,k,v)=>(o[k]=v,true)});}
 }
 class Input extends Element{}class Select extends Element{}class Textarea extends Element{}
 const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');for(const m of html.matchAll(/<(\w+)[^>]*\bid="([^"]+)"([^>]*)>/g)){const e=new(m[1]==='input'?Input:m[1]==='select'?Select:Element)(m[1]);e.hidden=m[3].includes('hidden');ids.set(m[2],e);}ids.get('botLevel').value='2';ids.get('ammo').append(new Element('i'),new Element('i'),new Element('i'));
 const document={body:new Element('body'),documentElement:new Element('html'),hidden:false,getElementById:id=>{assert(ids.has(id),'Unknown DOM id: '+id);return ids.get(id);},createElement:tag=>new Element(tag),createTextNode:text=>({textContent:text}),addEventListener:(k,f)=>listeners['document:'+k]=f};
 const context={console,document,HTMLInputElement:Input,HTMLSelectElement:Select,HTMLTextAreaElement:Textarea,localStorage:{getItem:k=>saved.get(k)??null,setItem:(k,v)=>saved.set(k,v)},location:{protocol,host:'test.local'},performance:{now:()=>now},devicePixelRatio:1,innerWidth:1280,innerHeight:860,requestAnimationFrame:f=>raf=f,setTimeout,clearTimeout,URL,Math,Map,Set};context.window=context;context.addEventListener=(k,f)=>listeners[k]=f;vm.createContext(context);
 for(const name of ['expansion.js','roster.js','core.js','economy.js','render.js','app.js']){let source=fs.readFileSync(path.join(__dirname,'..',name),'utf8');if(name==='app.js')source=source.replace('selectMode(battle);chooseFighter(selected);requestAnimationFrame(frame);','window.inspectGame=()=>({state,profile,paused,playing,keys,selected,battle,loadout,award});selectMode(battle);chooseFighter(selected);requestAnimationFrame(frame);');vm.runInContext(source,context,{filename:name});}
 return {context,ids,saved,get:()=>context.inspectGame(),key:(code,type='keydown')=>listeners[type]({code,target:ids.get('arena'),preventDefault(){},repeat:false}),blur:()=>listeners.blur(),frame:(count=1)=>{for(let i=0;i<count;i++){now+=1000/30;raf(now);}}};
}

module.exports={browser};
