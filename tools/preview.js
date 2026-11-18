// node tools/preview.js <saida.png> [escala] -> folha de contato com todos os sprites de js/px.js
const fs=require('fs'),PX=require('../js/px.js'),{encode,hex}=require('./png.js');
const out=process.argv[2]||'preview.png',S=+process.argv[3]||4,names=PX.names(),CW=40,CH=34,cols=8,rows=Math.ceil(names.length/cols),W=cols*CW*S,H=rows*CH*S,d=new Uint8Array(W*H*4);
for(let i=0;i<W*H;i++){d[i*4]=0x2a;d[i*4+1]=0x14;d[i*4+2]=0x55;d[i*4+3]=255}
names.forEach((n,i)=>{const q=PX.pixels(n),ox=(i%cols)*CW+2,oy=((i/cols)|0)*CH+2;if(q.w>CW-2||q.h>CH-2)console.log('GRANDE',n,q.w,q.h);for(const p of q.px){const[r,g,b]=hex(p.c);for(let y=0;y<S;y++)for(let x=0;x<S;x++){const k=(((oy+p.y)*S+y)*W+(ox+p.x)*S+x)*4;d[k]=r;d[k+1]=g;d[k+2]=b;d[k+3]=255}}});
fs.writeFileSync(out,encode({w:W,h:H,data:d}));console.log(names.map((n,i)=>i+':'+n).join(' '));
// checagem de largura das linhas
for(const n of names){const x=PX.ALL[n],w=Math.max(...x.rows.map(r=>r.length));x.rows.forEach((r,y)=>{if(r.length!==w)console.log('LINHA TORTA',n,'y='+y,r.length,'esperado',w)})}
