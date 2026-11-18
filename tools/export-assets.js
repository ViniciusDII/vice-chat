// node tools/export-assets.js -> grava os sprites de js/px.js como PNG (1x) em assets/ui e assets/shop e atualiza assets/manifest.json
// Arte 100% gerada por codigo: custo de creditos do PixelLab = 0.
const fs=require('fs'),path=require('path'),PX=require('../js/px.js'),{encode,hex}=require('./png.js');
const root=path.join(__dirname,'..'),mp=path.join(root,'assets','manifest.json');
const man=fs.existsSync(mp)?JSON.parse(fs.readFileSync(mp,'utf8')):{items:[]};
const idx=new Map(man.items.map(i=>[i.file,i]));let n=0;
for(const name of PX.names()){const dir=/^(pet_|car_|st_)/.test(name)?'shop':'ui',q=PX.pixels(name),d=new Uint8Array(q.w*q.h*4);
 for(const p of q.px){const[r,g,b]=hex(p.c),k=(p.y*q.w+p.x)*4;d[k]=r;d[k+1]=g;d[k+2]=b;d[k+3]=255}
 const rel='assets/'+dir+'/'+name+'.png';fs.mkdirSync(path.join(root,'assets',dir),{recursive:true});fs.writeFileSync(path.join(root,rel),encode({w:q.w,h:q.h,data:d}));
 const e=idx.get(rel);if(!e)man.items.push({name,file:rel,size:q.w+'x'+q.h,prompt:null,tool:'code (js/px.js)',date:new Date().toISOString().slice(0,10),credits:0});n++}
fs.writeFileSync(mp,JSON.stringify(man,null,1));console.log(n+' PNGs exportados; manifest:',man.items.length,'itens');
