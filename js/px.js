// ===== PIXEL ART EM CODIGO (sem PixelLab, sem emojis do sistema) =====
// Tudo aqui sao grades de pixels: strings (cada letra = uma cor da paleta) ou listas de retangulos.
// Serve para: icones de interface, emojis do chat, pets, carros e estatuas (provisorios, ate a arte final existir).
// O mesmo arquivo roda no navegador (PX.cv / PX.set) e no Node (tools/export-assets.js gera os PNGs).
(function(root){
const PAL={'.':null,k:'#1a0b2e',w:'#ffffff',y:'#ffd24a',o:'#ff8a2e',r:'#ff3b5c',p:'#ff4fd8',m:'#b82a9a',v:'#b24cff',c:'#46e0ff',g:'#5aff9a',d:'#2e9a5a',b:'#2e6fd9',n:'#8a5a2b',s:'#f1c9a5',a:'#c8801e',e:'#8a8a95',l:'#d8d8e8',u:'#2b2b55'};
const A=(rows,pal)=>({rows,pal});
const R=(w,h,rects,pal)=>{const g=Array.from({length:h},()=>Array(w).fill('.'));for(const [x,y,rw,rh,ch] of rects)for(let j=y;j<y+rh;j++)for(let i=x;i<x+rw;i++)if(j>=0&&j<h&&i>=0&&i<w)g[j][i]=ch;return{rows:g.map(r=>r.join('')),pal}};
// sobrepoe um desenho (overlay) sobre uma base; '.' no overlay = mantem a base
const OV=(base,over,pal)=>({rows:base.map((r,y)=>{const o=over[y];if(!o)return r;return[...r].map((c,x)=>o[x]&&o[x]!=='.'?o[x]:c).join('')}),pal});
// ---------- carinhas (base amarela 16x14) ----------
const FACE=['.....kkkkkk.....','...kkyyyyyykk...','..kyyyyyyyyyyk..','.kyyyyyyyyyyyyk.','.kyyyyyyyyyyyyk.','.kyyyyyyyyyyyyk.','.kyyyyyyyyyyyyk.','.kyyyyyyyyyyyyk.','.kyyyyyyyyyyyyk.','.kyyyyyyyyyyyyk.','.kyyyyyyyyyyyyk.','..kyyyyyyyyyyk..','...kkyyyyyykk...','.....kkkkkk.....'];
const O=(m)=>{const a=Array(14).fill(null);for(const k in m)a[+k]=m[k];return a};
const I={};
// ---------- EMOJIS DO CHAT (16 + extras) ----------
I.smile=OV(FACE,O({4:'.....k....k.....',5:'.....k....k.....',7:'...p........p...',8:'....k......k....',9:'.....kkkkkk.....'}));
I.laugh=OV(FACE,O({4:'....kkk..kkk....',5:'..c..........c..',6:'..c..........c..',7:'...kkkkkkkkkk...',8:'...kwwwwwwwwk...',9:'....krrrrrrk....',10:'.....kkkkkk.....'}));
I.cool=OV(FACE,O({4:'..kkkkkkkkkkkk..',5:'..kkwkkyykkwkk..',6:'...kkkk..kkkk...',8:'....k......k....',9:'.....kkkkkk.....'}));
I.love=OV(FACE,O({4:'...r.r....r.r...',5:'..rrrrr..rrrrr..',6:'...rrr....rrr...',7:'....r......r....',9:'....k......k....',10:'.....kkkkkk.....'}));
I.heart=A(['..rrrr....rrrr..','.rrrrrr..rrrrrr.','rrwwrrrrrrrrrrrr','rrwrrrrrrrrrrrrr','rrrrrrrrrrrrrrrr','rrrrrrrrrrrrrrrr','.rrrrrrrrrrrrrr.','..rrrrrrrrrrrr..','...rrrrrrrrrr...','....rrrrrrrr....','.....rrrrrr.....','......rrrr......','.......rr.......']);
I.fire=A(['.......r........','......rro.......','......rooo..r...','.....rooooo.rr..','..r..roooyoorr..','..rr.rooyyyorr..','..rrroooyyyoor..','.rrroooyyyyoorr.','.rroooyyyyyyorr.','.rroooyywwyyorr.','.rrooyywwwyyorr.','..rroyywwwwyorr.','..rrooyywwyyorr.','...rrooyyyoorr..','....rrroooorr...','......rrrrr.....']);
I.thumb=A(['......sss.......','......ssss......','......ssss......','......ssss......','.....sssss......','.bbb.ssssssssss.','.bbb.sssssaaaaa.','.bbb.ssssssssss.','.bbb.sssssaaaaa.','.bbb.ssssssssss.','.bbb.sssssaaaaa.','.bbb.ssssssssss.','.bbb..ssssssss..']);
I.crown=A(['y......y......y','yy....yyy....yy','yyy..yyyyy..yyy','yyyyyyyyyyyyyyy','yyyyyyyyyyyyyyy','ycyyyyyryyyyycy','yyyyyyyyyyyyyyy','aaaaaaaaaaaaaaa']);
I.palm=A(['....gggg..gggg..','..gggdggggdgggg.','.ggdgggggggggdg.','gggggdggggdggggg','.ggggggddgggggg.','..ggd..dd..dgg..','......ndn.......','......nn........','......nn........','.....nn.........','.....nn.........','.....nn.........','....nn..........','....nn..........','...nnn..........','..yyyyyyyy......']);
I.car=A(['.....rrrrrr.........','....rcccrcccr.......','...rcccrrccccr......','.rrrrrrrrrrrrrrr....','rrrrrrrrrrrrrrrrry..','rrrrrrrrrrrrrrrrrry.','.kkk.rrrrrrr.kkk.rr.','kkwwkk.....kkwwkk...','kkwwkk.....kkwwkk...','.kkkk.......kkkk....']);
I.diamond=A(['...cccccccccc...','..cccwwcccccbb..','.ccccwcccccccbb.','cccccccccccccbbb','.ccccccbbbbbbbb.','..cccccbbbbbbb..','...ccccbbbbbb...','....cccbbbbb....','.....ccbbbb.....','......cbbb......','.......bb.......']);
I.star=A(['.......y........','.......y........','......yyy.......','.......y........','yyyyyyyyyyyyyyy.','.yyyyyyyyyyyyy..','..yyyyyyyyyyy...','...yyyyyyyyy....','...yyyyyyyyy....','..yyyyy.yyyyy...','..yyyy...yyyy...','.yyy.......yyy..']);
I.dog=A(['..nn.....nn.....','.nnnn...nnnn....','.nnnnnnnnnnn....','nnnnnnnnnnnnn...','nnkkwnnnwkknn...','nnkkknnnkkknn...','nnnnnnnnnnnnn...','.nnnnnkknnnnn...','..nnnnkknnnn....','...nnnrrnnn.....','....nnnnnn......']);
I.cat=A(['.e.......e.....','.ee.....ee.....','.eeeeeeeeee....','eeeeeeeeeeeee..','eekkeeeeekkee..','eekkeeeeekkee..','eeeeepppeeeee..','eeeeeekeeeeee..','.eeeeeeeeeee...','..eeeeeeeee....','...eeeeeee.....']);
I.music=A(['....wwwwwwww....','....wwwwwwww....','....ww....ww....','....ww....ww....','....ww....ww....','....ww....ww....','..www....www....','.wwwww..wwwww...','..www....www....']);
I.money=A(['.....gg..gg.....','......gggg......','.....dddddd.....','....gggggggg....','...gggggggggg...','..ggggyyyyyggg..','..gggyggggggggg.','..ggggyyyyggggg.','..ggggggggyggg..','..gggyyyyyggggg.','..gggggggggggg..','...gggggggggg...','....dddddddd....']);
I.trophy=R(16,14,[[3,0,10,6,'y'],[4,6,8,1,'y'],[5,7,6,1,'y'],[7,8,2,3,'y'],[5,11,6,1,'a'],[4,12,8,2,'a'],[1,1,2,1,'y'],[0,2,1,2,'y'],[1,4,2,1,'y'],[13,1,2,1,'y'],[15,2,1,2,'y'],[13,4,2,1,'y'],[5,1,2,4,'w']]);
I.dolphin=A(['..........bbb...','.........bbbbb..','........bbbbbbc.','...bb..bbbbbbbbc','..bbbbbbbbbbbbbb','.bbbbbbbbwbbbbb.','bbbbbbbbbbbbbb..','bb.bbwwwwbbbb...','b...bbwwwwbb....','....bbbb..bbb...','...bbb......bb..']);
// ---------- ICONES DE INTERFACE (8x8 aprox.) ----------
const U={};
U.user=A(['..ssss..','.ssssss.','.ssssss.','..ssss..','.cccccc.','cccccccc','cccccccc','cccccccc']);
U.cart=A(['w.......','wwwwwwww','.wyyyyw.','.wyyyyw.','..wwww..','..w..w..','.cc..cc.','.cc..cc.']);
U.pin=A(['..rrrr..','.rrrrrr.','.rrwwrr.','.rrwwrr.','.rrrrrr.','..rrrr..','...rr...','....r...']);
U.chat=A(['.cccccc.','cccccccc','cwcwcwcc','cccccccc','.cccccc.','..ccc...','..cc....','...c....']);
U.send=A(['....w...','.....w..','wwwwwww.','wwwwwwww','wwwwwww.','.....w..','....w...']);
U.sound=A(['...w....','..ww..w.','wwww.w.w','wwww.w.w','wwww.w.w','..ww..w.','...w....']);
U.mute=A(['...w....','..ww....','wwww.r.r','wwww..r.','wwww.r.r','..ww....','...w....']);
U.close=A(['r.....r','.r...r.','..r.r..','...r...','..r.r..','.r...r.','r.....r']);
U.back=A(['...w....','..w.....','.wwwwwww','wwwwwwww','.wwwwwww','..w.....','...w....']);
U.rot=A(['..wwww..','.w....w.','w.....ww','w....www','w.....w.','.w......','..wwww..']);
U.lock=A(['..eeee..','.e....e.','.e....e.','yyyyyyyy','yyykkyyy','yyykkyyy','yyyyyyyy','yyyyyyyy']);
U.ticket=R(16,12,[[1,2,14,8,'p'],[0,4,1,4,'k'],[15,4,1,4,'k'],[7,3,1,1,'w'],[7,5,1,1,'w'],[7,7,1,1,'w'],[7,9,1,1,'w'],[3,4,3,3,'y'],[9,4,4,1,'w'],[9,6,4,1,'w'],[9,8,3,1,'w']]);
U.city=R(16,14,[[2,6,4,8,'u'],[7,2,4,12,'b'],[12,5,3,9,'u'],[8,0,1,2,'p'],[3,8,1,1,'y'],[3,10,1,1,'y'],[5,12,1,1,'y'],[8,4,1,1,'y'],[10,6,1,1,'y'],[8,8,1,1,'y'],[10,10,1,1,'y'],[8,12,1,1,'y'],[13,7,1,1,'y'],[13,9,1,1,'y'],[14,11,1,1,'y']]);
U.shades=R(16,8,[[0,1,16,1,'k'],[1,2,6,4,'k'],[9,2,6,4,'k'],[7,2,2,1,'k'],[2,3,2,1,'c'],[10,3,2,1,'c'],[3,4,2,1,'p'],[11,4,2,1,'p']]);
U.gift=R(8,8,[[1,3,6,5,'p'],[0,2,8,2,'m'],[3,2,2,6,'y'],[3,0,2,2,'y'],[2,1,1,1,'y'],[5,1,1,1,'y']]);
U.dot=A(['.ggg.','ggggg','ggggg','ggggg','.ggg.']);
U.coin=A(['..yyyy..','.yyyyyy.','yyyaayyy','yyyaayyy','yyyaayyy','yyyaayyy','.yyyyyy.','..yyyy..']);
U.sparkle=A(['...y...','...y...','..yyy..','yyyyyyy','..yyy..','...y...','...y...']);
U.hair=A(['..aaaa..','.aaaaaa.','aaaaaaaa','aaaaaaaa','aa....aa','aa....aa','.a....a.']);
U.beard=A(['.ssssss.','ssksskss','nnssssnn','nnnnnnnn','.nnnnnn.','..nnnn..']);
U.shirt=A(['.cc..cc.','cccccccc','cccccccc','.cccccc.','.cccccc.','.cccccc.']);
U.pants=A(['bbbbbbbb','bbbbbbbb','bbb..bbb','bbb..bbb','bbb..bbb','bbb..bbb','bbb..bbb']);
U.shoe=A(['..ww....','..ww....','..wwww..','wwwwwwww','rrrrrrrr']);
U.hat=A(['..pppp..','.pppppp.','pppppppp','pppppppp','mmmmmmmm']);
U.glasses=A(['kkkkkkkk','kkkk.kkk','kcckkcck','.kk..kk.']);
U.chain=A(['y......y','.y....y.','..y..y..','...yy...','...yy...']);
U.palette=A(['..aaaa..','.arraaa.','aaaaabba','agga.aaa','agga.aa.','.aaaaa..']);
U.paw=A(['.w....w.','ww.ww.ww','.w.ww.w.','..wwww..','.wwwwww.','.ww..ww.','..w..w..']);
U.cart2=A(['..rrrr..','.rcrrcr.','rrrrrrrr','rrrrrrrr','.kk..kk.','.kk..kk.']);
U.statue=A(['..yyyy..','..yyyy..','...yy...','..yyyy..','.yyyyyy.','eeeeeeee','.eeeeee.','eeeeeeee']);
U.aura=A(['.pppppp.','p......p','p......p','.pppppp.']);
U.note=A(['..wwwww.','..w...w.','..w...w.','.ww..ww.','www.www.','.w...w..']);
U.door=A(['.nnnnn..','.nnnnn..','.nnnnyn.','.nnnnn..','.nnnnn..','.nnnnn..']);
U.check=A(['......g.','.....g..','g...g...','.g.g....','..g.....']);
U.starS=A(['...y...','..yyy..','yyyyyyy','.yyyyy.','..yyy..','.yy.yy.','.y...y.']);
// ---------- PETS / CARROS / ESTATUAS (provisorios, estilo chibi, 1 direcao, olhando para a direita) ----------
const PETP=(B,D,L)=>({B,D,L,E:'#1a0b2e',N:'#ff7a8a'});
const quad=(pal,extra,ears)=>R(14,11,[[0,2,1,2,'B'],[1,3,2,1,'B'],[2,4,8,4,'B'],[3,7,6,1,'L'],[2,8,2,3,'D'],[5,8,2,3,'D'],[8,8,2,3,'D'],[10,8,2,3,'D'],[9,2,5,4,'B'],[12,4,2,2,'L'],[13,4,1,1,'E'],[11,3,1,1,'E'],...ears,...extra],pal);
const P={};
P.pet_dog=quad(PETP('#c8903e','#8a5a2b','#f1d9a8'),[],[[9,1,2,3,'D']]);
P.pet_cat=quad(PETP('#9a9aa8','#6a6a78','#e8e8f0'),[[0,0,1,4,'B'],[1,0,1,1,'B'],[12,3,1,1,'E']],[[9,1,1,2,'B'],[12,1,1,2,'B'],[10,0,1,1,'B'],[13,0,1,1,'B']]);
P.pet_rabbit=quad(PETP('#f4f4f4','#d8d8e8','#ffc0d8'),[[0,4,2,2,'L']],[[9,-1,1,1,'B'],[10,-0,1,1,'B'],[9,0,2,3,'B'],[12,0,2,3,'B'],[10,1,1,2,'L'],[13,1,1,2,'L']]);
P.pet_tiger=quad(PETP('#ff9a2e','#1a0b2e','#f4f4f4'),[[3,4,1,3,'D'],[5,4,1,3,'D'],[7,4,1,3,'D'],[0,0,1,4,'B'],[0,1,1,1,'D'],[10,2,1,2,'D']],[[9,1,2,2,'B'],[12,1,2,2,'B']]);
P.pet_monkey=R(14,12,[[1,0,2,1,'B'],[0,1,1,5,'B'],[1,5,2,1,'B'],[3,4,7,5,'B'],[4,5,4,3,'L'],[3,9,2,3,'D'],[8,9,2,3,'D'],[8,0,5,5,'B'],[9,1,4,3,'L'],[10,2,1,1,'E'],[12,2,1,1,'E'],[10,3,2,1,'N'],[7,1,1,2,'B'],[13,1,1,2,'B'],[2,6,2,3,'B']],{B:'#6b4328',D:'#4a2c1a',L:'#e0b080',E:'#1a0b2e',N:'#a8554a'});
P.pet_parrot=R(10,14,[[3,0,4,4,'B'],[6,1,3,2,'O'],[5,1,1,1,'E'],[2,4,6,6,'B'],[3,5,4,4,'L'],[0,5,2,6,'D'],[0,10,2,3,'R'],[3,10,1,3,'O'],[6,10,1,3,'O'],[2,13,3,1,'O'],[5,13,3,1,'O']],{B:'#46c864',D:'#2e9a5a',L:'#ffd24a',O:'#ff8a2e',R:'#ff3b5c',E:'#1a0b2e'});
P.pet_flamingo=R(12,16,[[7,0,3,3,'B'],[9,1,3,1,'O'],[8,1,1,1,'E'],[7,3,2,1,'B'],[6,4,2,1,'B'],[5,5,2,1,'B'],[2,6,7,4,'B'],[1,7,1,2,'D'],[3,7,4,2,'L'],[5,10,1,6,'O'],[4,15,3,1,'O']],{B:'#ff6ac8',D:'#d63aa5',L:'#ffa0e0',O:'#ff8a2e',E:'#1a0b2e'});
P.pet_snake=R(14,9,[[0,6,12,3,'B'],[1,3,10,3,'B'],[2,0,8,3,'B'],[10,0,4,3,'B'],[13,1,1,1,'E'],[11,1,1,1,'E'],[3,7,2,1,'L'],[6,7,2,1,'L'],[9,7,2,1,'L'],[4,4,2,1,'L'],[7,4,2,1,'L'],[11,3,2,1,'N'],[1,1,1,2,'B']],{B:'#5ac85a',L:'#c8ff8a',E:'#1a0b2e',N:'#ff3b5c'});
P.pet_croc=R(22,9,[[0,3,3,3,'B'],[3,2,11,5,'B'],[4,0,2,2,'B'],[8,0,2,2,'B'],[13,3,9,3,'B'],[3,6,10,1,'L'],[4,7,2,2,'B'],[10,7,2,2,'B'],[14,3,8,1,'B'],[14,5,8,1,'L'],[15,6,1,1,'W'],[18,6,1,1,'W'],[13,2,2,2,'B'],[14,2,1,1,'E'],[5,2,1,1,'D'],[8,2,1,1,'D'],[11,2,1,1,'D']],{B:'#3ab45a',D:'#2e8a3a',L:'#d8f0a8',W:'#ffffff',E:'#1a0b2e'});
const CP=(B,S)=>({B,S,C:'#9be8ff',K:'#1a0b2e',H:'#8a8a95',Y:'#ffe27a',R:'#ff3b5c',W:'#d8d8e8'});
const wheels=(a,b)=>[[a,7,5,3,'K'],[b,7,5,3,'K'],[a+1,8,3,1,'H'],[b+1,8,3,1,'H']];
P.car_coupe=R(27,10,[[1,5,25,3,'B'],[7,2,12,3,'B'],[8,3,4,2,'C'],[13,3,5,2,'C'],[2,6,23,1,'S'],[26,5,1,1,'Y'],[0,5,1,2,'R'],[18,2,1,1,'B'],...wheels(4,19)],CP('#ff4fd8','#b82a9a'));
P.car_muscle=R(27,10,[[1,4,25,4,'B'],[8,1,11,3,'B'],[9,2,4,2,'C'],[14,2,4,2,'C'],[1,6,25,1,'S'],[3,3,4,1,'B'],[26,5,1,2,'Y'],[0,4,1,3,'R'],[10,4,1,1,'W'],[15,4,1,1,'W'],...wheels(4,19)],CP('#46e0ff','#2e6fd9'));
P.car_suv=R(27,12,[[1,5,25,5,'B'],[3,1,19,5,'B'],[4,2,5,3,'C'],[10,2,5,3,'C'],[16,2,5,3,'C'],[2,8,23,1,'S'],[26,7,1,2,'Y'],[0,6,1,3,'R'],[22,1,3,1,'S'],...wheels(4,19).map(([x,y,w,h,c])=>[x,y+2,w,h,c])],CP('#3a3a55','#1a1a2e'));
P.car_limo=R(36,11,[[1,5,34,4,'B'],[4,2,26,3,'B'],[5,3,5,2,'C'],[11,3,5,2,'C'],[17,3,5,2,'C'],[23,3,5,2,'C'],[2,7,32,1,'S'],[35,6,1,1,'Y'],[0,5,1,3,'R'],...wheels(4,28).map(([x,y,w,h,c])=>[x,y+1,w,h,c]),[14,8,5,3,'K'],[15,9,3,1,'H']],CP('#ffd24a','#c8801e'));
P.car_moto=R(18,11,[[1,6,5,5,'K'],[12,6,5,5,'K'],[2,7,3,3,'H'],[13,7,3,3,'H'],[4,5,9,2,'B'],[10,2,2,4,'B'],[10,1,4,1,'S'],[5,3,4,2,'S'],[6,2,3,1,'K'],[14,5,2,1,'Y'],[0,5,2,1,'R'],[8,7,3,2,'H']],CP('#ff4fd8','#8a49d0'));
const pedestal=(i,w)=>({rows:[...i.rows,'.'.repeat(Math.max(0,(w-12)>>1))+'eeeeeeeeeeee'+'.'.repeat(w),'.'.repeat(Math.max(0,(w-14)>>1))+'llllllllllllll'].map(r=>r.slice(0,w).padEnd(w,'.')),pal:i.pal});
const gold=i=>({rows:i.rows,pal:Object.assign({},i.pal,{y:'#ffd24a'})});
P.st_palm=pedestal(I.palm,16);P.st_money=pedestal(I.money,16);P.st_trophy=pedestal(gold(I.trophy),16);P.st_dolphin=pedestal(I.dolphin,16);P.st_crown=pedestal(I.crown,16);
// ---------- registro ----------
const ALL=Object.assign({},I,U,P);
const EMOJI=['smile','laugh','cool','love','heart','fire','thumb','crown','palm','car','diamond','star','dog','cat','music','money']; // emojis liberados no chat Free
const dims=d=>({w:Math.max(...d.rows.map(r=>r.length)),h:d.rows.length});
// grade -> pixels [{x,y,c}]; usada pelo navegador e pelo exportador PNG
function pixels(name){const d=ALL[name];if(!d)return null;const pal=Object.assign({},PAL,d.pal||{}),o=[];d.rows.forEach((r,y)=>[...r].forEach((ch,x)=>{const c=pal[ch];if(c)o.push({x,y,c})}));return{px:o,...dims(d)}}
const cache={};
function cv(name,s,doc){s=s||1;const key=name+'@'+s;if(cache[key])return cache[key];const q=pixels(name);if(!q)return null;const D=doc||(typeof document!=='undefined'?document:null);if(!D)return null;
 const c=D.createElement('canvas');c.width=q.w*s;c.height=q.h*s;const x=c.getContext('2d');for(const p of q.px){x.fillStyle=p.c;x.fillRect(p.x*s,p.y*s,s,s)}c.className='pxi';cache[key]=c;return c}
// devolve uma copia nova (um canvas so pode estar em um lugar do DOM)
function el(name,s){const b=cv(name,s);if(!b)return document.createTextNode('');const c=document.createElement('canvas');c.width=b.width;c.height=b.height;c.className='pxi';c.getContext('2d').drawImage(b,0,0);c.setAttribute('aria-hidden','true');return c}
// troca o conteudo de um elemento por [icone] + texto
function set(e,name,text,s){e.textContent='';if(name)e.append(el(name,s||2));if(text!=null&&text!==''){const t=document.createElement('span');t.textContent=(name?' ':'')+text;e.append(t)}}
// marca [data-ic="nome"] / [data-s="escala"] no HTML
function scan(rootEl){(rootEl||document).querySelectorAll('[data-ic]').forEach(n=>{if(n.dataset.done)return;n.dataset.done=1;n.append(el(n.dataset.ic,+n.dataset.s||2))})}
const EMO_RE=/^(?:\s*:[a-z0-9_]+:\s*){1,8}$/;
const isEmojiMsg=t=>EMO_RE.test(t)&&t.match(/:[a-z0-9_]+:/g).every(k=>EMOJI.includes(k.slice(1,-1)));
const PX={PAL,ALL,EMOJI,pixels,cv,el,set,scan,dims,isEmojiMsg,names:()=>Object.keys(ALL)};
if(typeof module!=='undefined'&&module.exports)module.exports=PX;else root.PX=PX;
})(typeof window!=='undefined'?window:globalThis);
