// Corta uma folha de sprites em grade (padrao 5x5 de 32 px = 160x160) em PNGs individuais, por posicao fixa. Sem dependencias (substitui o Pillow).
// uso: node tools/slice-sheet.js <folha.png> <pasta_saida> [prefixo] [nomes.txt] [cols=5] [rows=5] [cel=32]
// nomes.txt = um nome por linha, na ordem esquerda->direita, cima->baixo. Celulas totalmente transparentes sao puladas (reservadas para variantes futuras).
const fs=require('fs'),zlib=require('zlib'),path=require('path'),{encode}=require('./png.js');
function decode(buf){let o=8,w,h,ct,idat=[];while(o<buf.length){const l=buf.readUInt32BE(o),ty=buf.toString('ascii',o+4,o+8),d=buf.subarray(o+8,o+8+l);if(ty==='IHDR'){w=d.readUInt32BE(0);h=d.readUInt32BE(4);if(d[8]!==8||d[12])throw new Error('So PNG 8 bits sem entrelacamento');ct=d[9]}if(ty==='IDAT')idat.push(d);o+=12+l}
 const ch={2:3,6:4}[ct];if(!ch)throw new Error('So RGB/RGBA (tipo '+ct+')');const raw=zlib.inflateSync(Buffer.concat(idat)),st=w*ch,out=new Uint8Array(w*h*4);let prev=Buffer.alloc(st);
 for(let y=0;y<h;y++){const f=raw[y*(st+1)],line=Buffer.from(raw.subarray(y*(st+1)+1,(y+1)*(st+1)));
  for(let i=0;i<st;i++){const a=i>=ch?line[i-ch]:0,b=prev[i],c=i>=ch?prev[i-ch]:0;let v=line[i];
   if(f===1)v+=a;else if(f===2)v+=b;else if(f===3)v+=(a+b)>>1;else if(f===4){const p=a+b-c,pa=Math.abs(p-a),pb=Math.abs(p-b),pc=Math.abs(p-c);v+=(pa<=pb&&pa<=pc)?a:(pb<=pc?b:c)}line[i]=v&255}
  for(let x=0;x<w;x++){const k=(y*w+x)*4;out[k]=line[x*ch];out[k+1]=line[x*ch+1];out[k+2]=line[x*ch+2];out[k+3]=ch===4?line[x*ch+3]:255}prev=line}
 return{w,h,data:out}}
if(require.main===module){const[,,src,outDir,prefix='item',namesF,C='5',Rw='5',S='32']=process.argv;if(!src||!outDir){console.log('uso: node tools/slice-sheet.js <folha.png> <saida> [prefixo] [nomes.txt] [cols] [rows] [cel]');process.exit(1)}
 const im=decode(fs.readFileSync(src)),cols=+C,rows=+Rw,s=+S,names=namesF&&fs.existsSync(namesF)?fs.readFileSync(namesF,'utf8').split(/\r?\n/).filter(Boolean):[];
 if(im.w!==cols*s||im.h!==rows*s)console.log('AVISO: a folha mede '+im.w+'x'+im.h+' e a grade espera '+cols*s+'x'+rows*s+' -> corte pode ficar torto; confira antes de repetir a geracao.');
 fs.mkdirSync(outDir,{recursive:true});let saved=0,skipped=0;
 for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){const i=r*cols+c,d=new Uint8Array(s*s*4);let any=0;for(let y=0;y<s;y++)for(let x=0;x<s;x++){const k=((r*s+y)*im.w+c*s+x)*4,j=(y*s+x)*4;d[j]=im.data[k];d[j+1]=im.data[k+1];d[j+2]=im.data[k+2];d[j+3]=im.data[k+3];if(im.data[k+3])any=1}
  if(!any){skipped++;continue}fs.writeFileSync(path.join(outDir,(names[i]||prefix+'_'+String(i+1).padStart(2,'0'))+'.png'),encode({w:s,h:s,data:d}));saved++}
 console.log(saved+' recortados, '+skipped+' celulas vazias puladas -> '+outDir)}
module.exports={decode};
