const W=640,H=360,$=i=>document.getElementById(i),rnd=a=>a[Math.random()*a.length|0],cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const LIVE=!!(CONFIG.SUPABASE_URL&&window.supabase),cv=$('c'),cx=cv.getContext('2d');cv.width=1280;cv.height=720;
const SKY=['#1a0b3b','#2b0f55','#40136b','#5a1a7a','#7a2288','#a02f93','#c93d95','#e84d93','#ff6a8a','#ff8a7a','#ffab70','#ffc880'];
const SKIN=['#f1c9a5','#d9a273','#a8704a','#6b4328'],HC=['#1a1a1a','#5a3a1a','#e8c14a','#ff4fd8','#46e0ff'],SH=['#ff4fd8','#46e0ff','#ffd24a','#7aff9a','#e8e8ff'],PN=['#2b2b55','#1a1a1a','#5a3a1a','#3a6a9a'];
const DEF={skin:SKIN[0],hs:0,hc:HC[0],sh:SH[0],pn:PN[0],ac:0},rav=()=>({skin:rnd(SKIN),hs:rnd([0,1,2,3]),hc:rnd(HC),sh:rnd(SH),pn:rnd(PN),ac:rnd([0,1,2])});
const ITEMS=[{id:'c1',n:'🚗 #1',t:'car',p:50,c:'#ff4fa8'},{id:'c2',n:'🚗 #2',t:'car',p:50,c:'#46a8ff'},{id:'c3',n:'🚗 #3',t:'car',p:80,c:'#2a2a33'},{id:'p1',n:'🐶',t:'pet',p:30,c:'#b07a3a'},{id:'p2',n:'🐱',t:'pet',p:30,c:'#9a9aa8'},{id:'a1',n:'✨',t:'aura',p:40,c:'#ff4fd8'}];
const TC={5:'#46e0ff',10:'#7aff9a',20:'#ffd24a',50:'#ff4fa8'},DUR={0:5000,5:10000,10:20000,20:40000,50:60000};
const LN=['esse jogo tá brabo','vai lançar quando mesmo?','cidade linda demais','bora fazer um rolê?','tô aqui desde cedo kkk','alguém no cassino?','vai ter evento?','amei o mapa'];
let prof;try{prof=JSON.parse(localStorage.nco)}catch(e){}
prof=Object.assign({name:'',av:Object.assign({},DEF),coins:100,inv:[],eq:{},ok:0},prof);
const save=()=>{try{localStorage.nco=JSON.stringify(prof)}catch(e){}};
const I18={"en": ["tap the ground to walk · mouse wheel = zoom", "GLOBAL CHAT", "Shop", "Super chat:", "Normal", "Type your message...", "Your character", "Your name", "Skin", "Hair", "Hair color", "Shirt", "Pants", "Accessory", "None", "Glasses", "Cap", "I accept the terms", "Read terms", "Enter", "Close", "Buy", "Equip", "Remove", "Not enough coins", "Choose a name", "Accept the terms to enter", "THE BIG LAUNCH IN:", "LIVE NOW!", "YOUR AD HERE", "BE TODAY'S TOP", "Card payments coming soon", "+50 coins (demo)", "Language", "d"], "es": ["toca el suelo para caminar · rueda del ratón = zoom", "CHAT GLOBAL", "Tienda", "Super chat:", "Normal", "Escribe tu mensaje...", "Tu personaje", "Tu nombre", "Piel", "Pelo", "Color de pelo", "Camiseta", "Pantalón", "Accesorio", "Ninguno", "Gafas", "Gorra", "Acepto los términos", "Leer términos", "Entrar", "Cerrar", "Comprar", "Equipar", "Quitar", "Monedas insuficientes", "Elige un nombre", "Acepta los términos para entrar", "EL GRAN LANZAMIENTO EN:", "¡YA DISPONIBLE!", "TU ANUNCIO AQUÍ", "SÉ EL TOP DE HOY", "Pagos con tarjeta próximamente", "+50 monedas (demo)", "Idioma", "d"], "pt": ["toque no chão para andar · roda do mouse = zoom", "CHAT GLOBAL", "Loja", "Super chat:", "Normal", "Digite sua mensagem...", "Seu personagem", "Seu nome", "Pele", "Cabelo", "Cor do cabelo", "Camisa", "Calça", "Acessório", "Nada", "Óculos", "Boné", "Li e aceito os termos", "Ler termos", "Entrar", "Fechar", "Comprar", "Equipar", "Tirar", "Moedas insuficientes", "Escolha um nome", "Aceite os termos para entrar", "O GRANDE LANÇAMENTO EM:", "NO AR!", "SEU ANÚNCIO AQUI", "SEJA O TOP DO DIA", "Pagamento por cartão em breve", "+50 moedas (demo)", "Idioma", "d"], "fr": ["touchez le sol pour marcher · molette = zoom", "CHAT GLOBAL", "Boutique", "Super chat :", "Normal", "Écrivez votre message...", "Votre personnage", "Votre nom", "Peau", "Cheveux", "Couleur des cheveux", "T-shirt", "Pantalon", "Accessoire", "Aucun", "Lunettes", "Casquette", "J'accepte les conditions", "Lire les conditions", "Entrer", "Fermer", "Acheter", "Équiper", "Retirer", "Pièces insuffisantes", "Choisissez un nom", "Acceptez les conditions pour entrer", "LE GRAND LANCEMENT DANS :", "DISPONIBLE !", "VOTRE PUB ICI", "SOYEZ LE TOP DU JOUR", "Paiement par carte bientôt", "+50 pièces (démo)", "Langue", "j"], "de": ["Boden antippen zum Laufen · Mausrad = Zoom", "GLOBALER CHAT", "Shop", "Super-Chat:", "Normal", "Nachricht eingeben...", "Deine Figur", "Dein Name", "Haut", "Haare", "Haarfarbe", "Shirt", "Hose", "Zubehör", "Keins", "Brille", "Kappe", "Ich akzeptiere die Bedingungen", "Bedingungen lesen", "Betreten", "Schließen", "Kaufen", "Anlegen", "Ablegen", "Nicht genug Münzen", "Wähle einen Namen", "Bedingungen akzeptieren, um einzutreten", "DER GROSSE START IN:", "JETZT LIVE!", "DEINE WERBUNG HIER", "WERDE TOP DES TAGES", "Kartenzahlung bald verfügbar", "+50 Münzen (Demo)", "Sprache", "T"], "it": ["tocca il suolo per camminare · rotella = zoom", "CHAT GLOBALE", "Negozio", "Super chat:", "Normale", "Scrivi il tuo messaggio...", "Il tuo personaggio", "Il tuo nome", "Pelle", "Capelli", "Colore capelli", "Maglia", "Pantaloni", "Accessorio", "Nessuno", "Occhiali", "Cappello", "Accetto i termini", "Leggi i termini", "Entra", "Chiudi", "Acquista", "Equipaggia", "Rimuovi", "Monete insufficienti", "Scegli un nome", "Accetta i termini per entrare", "IL GRANDE LANCIO TRA:", "IN ONDA!", "LA TUA PUBBLICITÀ QUI", "DIVENTA IL TOP DEL GIORNO", "Pagamento con carta in arrivo", "+50 monete (demo)", "Lingua", "g"], "ru": ["коснитесь земли, чтобы идти · колесо мыши = зум", "ОБЩИЙ ЧАТ", "Магазин", "Супер-чат:", "Обычный", "Введите сообщение...", "Ваш персонаж", "Ваше имя", "Кожа", "Волосы", "Цвет волос", "Футболка", "Штаны", "Аксессуар", "Нет", "Очки", "Кепка", "Я принимаю условия", "Читать условия", "Войти", "Закрыть", "Купить", "Надеть", "Снять", "Недостаточно монет", "Выберите имя", "Примите условия, чтобы войти", "ВЕЛИКИЙ ЗАПУСК ЧЕРЕЗ:", "УЖЕ В ЭФИРЕ!", "ВАША РЕКЛАМА ЗДЕСЬ", "СТАНЬ ТОПОМ ДНЯ", "Оплата картой скоро", "+50 монет (демо)", "Язык", "д"], "ja": ["地面をタップして移動 · マウスホイール=ズーム", "グローバルチャット", "ショップ", "スーパーチャット:", "通常", "メッセージを入力...", "あなたのキャラ", "あなたの名前", "肌", "髪型", "髪の色", "シャツ", "ズボン", "アクセサリー", "なし", "メガネ", "キャップ", "利用規約に同意します", "規約を読む", "入る", "閉じる", "購入", "装備", "外す", "コインが足りません", "名前を選んでください", "入るには規約への同意が必要です", "大型リリースまで:", "公開中!", "広告募集中", "今日のトップになろう", "カード決済は近日対応", "+50コイン(デモ)", "言語", "日"], "ko": ["바닥을 눌러 이동 · 마우스 휠 = 확대", "전체 채팅", "상점", "슈퍼챗:", "일반", "메시지를 입력하세요...", "내 캐릭터", "내 이름", "피부", "머리", "머리 색", "셔츠", "바지", "액세서리", "없음", "안경", "모자", "약관에 동의합니다", "약관 읽기", "입장", "닫기", "구매", "장착", "해제", "코인이 부족합니다", "이름을 선택하세요", "입장하려면 약관에 동의하세요", "대형 출시까지:", "지금 출시!", "광고 문의", "오늘의 TOP이 되세요", "카드 결제 곧 지원", "+50 코인(데모)", "언어", "일"], "zh": ["点击地面行走 · 鼠标滚轮=缩放", "全球聊天", "商店", "超级聊天:", "普通", "输入消息...", "你的角色", "你的名字", "肤色", "发型", "发色", "上衣", "裤子", "配饰", "无", "眼镜", "帽子", "我接受条款", "阅读条款", "进入", "关闭", "购买", "装备", "卸下", "金币不足", "请选择名字", "请接受条款后进入", "盛大发售倒计时:", "现已上线!", "广告位招租", "成为今日榜首", "银行卡支付即将上线", "+50金币(演示)", "语言", "天"], "tr": ["yürümek için zemine dokun · fare tekerleği = yakınlaştır", "GENEL SOHBET", "Mağaza", "Süper sohbet:", "Normal", "Mesajını yaz...", "Karakterin", "Adın", "Ten", "Saç", "Saç rengi", "Tişört", "Pantolon", "Aksesuar", "Yok", "Gözlük", "Şapka", "Şartları kabul ediyorum", "Şartları oku", "Gir", "Kapat", "Satın al", "Kuşan", "Çıkar", "Yetersiz jeton", "Bir isim seç", "Girmek için şartları kabul et", "BÜYÜK ÇIKIŞA:", "YAYINDA!", "REKLAMINIZ BURADA", "GÜNÜN ZİRVESİ OL", "Kartla ödeme yakında", "+50 jeton (demo)", "Dil", "g"], "hi": ["चलने के लिए ज़मीन पर टैप करें · माउस व्हील = ज़ूम", "ग्लोबल चैट", "दुकान", "सुपर चैट:", "सामान्य", "अपना संदेश लिखें...", "आपका किरदार", "आपका नाम", "त्वचा", "बाल", "बालों का रंग", "शर्ट", "पैंट", "एक्सेसरी", "कोई नहीं", "चश्मा", "टोपी", "मैं शर्तें स्वीकार करता/करती हूँ", "शर्तें पढ़ें", "प्रवेश करें", "बंद करें", "खरीदें", "पहनें", "हटाएँ", "सिक्के कम हैं", "एक नाम चुनें", "प्रवेश के लिए शर्तें स्वीकार करें", "बड़े लॉन्च में:", "अब लाइव!", "आपका विज्ञापन यहाँ", "आज के टॉप बनें", "कार्ड भुगतान जल्द", "+50 सिक्के (डेमो)", "भाषा", "दिन"]};
const LGN=[["en", "English"], ["es", "Español"], ["pt", "Português"], ["fr", "Français"], ["de", "Deutsch"], ["it", "Italiano"], ["ru", "Русский"], ["ja", "日本語"], ["ko", "한국어"], ["zh", "中文"], ["tr", "Türkçe"], ["hi", "हिन्दी"]],TXT={"en": "1) Experimental, temporary project: it may change or shut down at any time without notice. 2) Coins and items are digital, have no cash value, are non-transferable and may be removed when the project ends. 3) Harassment, spam, illegal content and fraud are prohibited; accounts may be banned. 4) Not affiliated with Rockstar Games or Take-Two. 5) 18+ only, or with a guardian's permission. (Draft: review with a lawyer.)", "pt": "1) Projeto experimental e temporário: pode mudar ou ser encerrado a qualquer momento, sem aviso. 2) Moedas e itens são digitais, sem valor em dinheiro, intransferíveis e podem ser removidos ao encerrar. 3) Proibido assédio, spam, conteúdo ilegal e fraude; contas podem ser banidas. 4) Sem vínculo com a Rockstar Games ou a Take-Two. 5) Só para maiores de 18 anos ou com autorização dos responsáveis. (Rascunho: revise com um advogado.)"};
prof.lang=I18[prof.lang]?prof.lang:'en'; // idioma padrão: inglês
const t=i=>I18[prof.lang][i];
let toastT;function toast(m){const e=$('ts');e.textContent=m;e.style.display='block';clearTimeout(toastT);toastT=setTimeout(()=>e.style.display='none',2000)}
// ---- desenho ----
// ---- cenário fixo + luz dia/noite ----
const BG=new Image();BG.src='img/cenario.webp';const ST=[[1,0],[0,0],[0,1]]; // dia → entardecer → noite: 5 min cada, ciclo de 15 min igual para todos
function sky(){const p=(Date.now()/1000%900)/300,i=p|0,f=p-i,k=f*f*(3-2*f),a=ST[i],b=ST[(i+1)%3];return[a[0]+(b[0]-a[0])*k,a[1]+(b[1]-a[1])*k]}

const GL=[[30,200,38],[609,200,38],[322,185,60],[97,205,40],[548,205,40]]; // brilhos noturnos: x,y,raio
function light(){const [dia,nt]=sky();
 if(dia){const g=cx.createLinearGradient(0,0,0,H);g.addColorStop(0,`rgba(255,150,40,${.5*dia})`);g.addColorStop(.7,`rgba(255,205,70,${.3*dia})`);g.addColorStop(1,`rgba(255,175,60,${.16*dia})`);cx.globalCompositeOperation='screen';cx.fillStyle=g;cx.fillRect(0,0,W,H)}
 if(nt){cx.globalCompositeOperation='multiply';cx.fillStyle=`rgb(${255-150*nt|0},${255-125*nt|0},${255-55*nt|0})`;cx.fillRect(0,0,W,H);cx.globalCompositeOperation='lighter';
  for(const [x,y,r] of GL){const g=cx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,`rgba(255,170,90,${.55*nt})`);g.addColorStop(1,'rgba(255,170,90,0)');cx.fillStyle=g;cx.fillRect(x-r,y-r,2*r,2*r)}}
 cx.globalCompositeOperation='source-over'}

const EM=['😀','😂','😎','🔥','❤️','👏','🎉','🚗','🐶','🐱','💎','🌴','😍','🤙','👑','🎮'];
EM.forEach(e=>{const x=document.createElement('span');x.textContent=e;x.onclick=()=>{$('i').value+=e;$('i').focus()};$('ep').append(x)});
$('em').onclick=()=>$('ep').classList.toggle('on');
function drawAv(c,x,y,a,t,mv){
 const f=mv?(t/150|0)%2:0,b=mv&&f?-1:0,F=(X,Y,w,h,k)=>{c.fillStyle=k;c.fillRect(x+X,y+Y,w,h)};
 F(-5,-1,10,2,'#0005');F(-3,-8,3,7,a.pn);F(0,-8,3,7,a.pn);F(-3,mv&&f?-3:-2,3,2,'#111');F(0,mv&&!f?-3:-2,3,2,'#111');
 F(-4,-14+b,8,7,a.sh);F(-5,-13+b,1,5,a.sh);F(4,-13+b,1,5,a.sh);F(-5,-8+b,1,1,a.skin);F(4,-8+b,1,1,a.skin);
 F(-3,-20+b,6,6,a.skin);F(-2,-18+b,1,1,'#111');F(1,-18+b,1,1,'#111');
 const s=a.hs;if(s==0)F(-3,-21+b,6,2,a.hc);if(s==1)F(-4,-21+b,8,3,a.hc);if(s==2){F(-4,-21+b,8,3,a.hc);F(-4,-18+b,1,6,a.hc);F(3,-18+b,1,6,a.hc)}if(s==3){F(-1,-23+b,2,4,a.hc);F(-3,-20+b,6,1,a.hc)}
 if(a.ac==1){F(-3,-18+b,6,1,'#111');F(-2,-18+b,2,1,'#46e0ff');F(1,-18+b,2,1,'#46e0ff')}
 if(a.ac==2){F(-4,-22+b,8,2,'#ff4fd8');F(-4,-20+b,9,1,'#ff4fd8')}}
function drawCar(c,x,y,k){const F=(X,Y,w,h,q)=>{c.fillStyle=q;c.fillRect(x+X,y+Y,w,h)};F(-2,-1,22,2,'#0005');F(0,-5,20,4,k);F(4,-8,10,3,k);F(5,-7,3,2,'#9be8ff');F(10,-7,3,2,'#9be8ff');F(1,-2,4,3,'#111');F(14,-2,4,3,'#111');F(18,-4,2,1,'#ffe27a')}
function drawPet(c,x,y,k,cat){const F=(X,Y,w,h,q)=>{c.fillStyle=q;c.fillRect(x+X,y+Y,w,h)};F(-3,-1,7,1,'#0004');F(-3,-4,6,3,k);F(2,-6,3,3,k);F(2,-7,1,1,k);F(4,-7,1,1,k);F(-4,cat?-7:-5,1,cat?4:2,k);F(-3,-1,1,1,'#222');F(1,-1,1,1,'#222');F(4,-5,1,1,'#111')}
// ---- jogadores ----
const P=new Map();let me=null,rt=null,lastS=0,Z=1,ZT=1,CX0=0,CY0=0,TP={n:'',v:0};const tot={};
function mk(id,name,av,x,y){return{id,name,av:Object.assign({},DEF,av),x,y,tx:x,ty:y,px:x+12,py:y,mv:0,say:'',sayT:0,sc:'',eq:{},col:rnd(['#ff7ae0','#7ae0ff','#ffe27a','#9aff9a'])}}
const go=(p,x,y)=>{p.tx=cl(x,10,630);p.ty=cl(y,246,350)};
function step(p,dt){const dx=p.tx-p.x,dy=p.ty-p.y,d=Math.hypot(dx,dy);if(d>1){const k=Math.min(1,84*dt/d);p.x+=dx*k;p.y+=dy*k;p.mv=1}else p.mv=0;const q=Math.min(1,dt*5);p.px+=(p.x+12-p.px)*q;p.py+=(p.y-p.py)*q}
function loop(t){const dt=Math.min(.05,(t-loop.l)/1000||0);loop.l=t;Z+=(ZT-Z)*Math.min(1,dt*8);const vw=W/Z,vh=H/Z,x0=me?cl(me.x-vw/2,0,W-vw):0,y0=me?cl(me.y-14-vh/2,0,H-vh):0;CX0=x0;CY0=y0;
 $('ov').style.transform=`scale(${Z}) translate(${-x0/W*100}%,${-y0/H*100}%)`;cx.setTransform(2*Z,0,0,2*Z,-x0*2*Z,-y0*2*Z);cx.imageSmoothingEnabled=false;if(BG.complete&&BG.naturalWidth)cx.drawImage(BG,0,0,W,H);else{cx.fillStyle='#2a1442';cx.fillRect(0,0,W,H)}
 const L=[...P.values()];for(const p of L)step(p,dt);L.sort((a,b)=>a.y-b.y);
 for(const p of L){const e=p.eq||{},it=k=>ITEMS.find(i=>i.id===e[k]),a=it('aura'),c=it('car'),q=it('pet');
  if(a){cx.strokeStyle=a.c;cx.globalAlpha=.5+.3*Math.sin(t/200);cx.lineWidth=1;cx.beginPath();cx.ellipse(p.x,p.y-1,10,3,0,0,7);cx.stroke();cx.globalAlpha=1}
  if(c)drawCar(cx,p.x-31,p.y,c.c);if(q)drawPet(cx,p.px,p.py,q.c,q.id==='p2');drawAv(cx,p.x,p.y,p.av,t,p.mv)}
 if(TP.av)drawAv(cx,322,60,TP.av,t,0);light();cx.font='5px PS2P,monospace';cx.textAlign='center';cx.lineJoin='round';roofLabel();
 for(const p of L){cx.lineWidth=2;cx.strokeStyle='#000';cx.fillStyle=p.col;cx.strokeText(p.name,p.x,p.y-24);cx.fillText(p.name,p.x,p.y-24);
  if(p.say&&t<p.sayT){const s=p.say.length>28?p.say.slice(0,27)+'…':p.say,w=cx.measureText(s).width+6;cx.fillStyle=p.sc||'#fff';cx.fillRect(p.x-w/2,p.y-40,w,10);cx.fillStyle='#111';cx.fillText(s,p.x,p.y-32)}}
 requestAnimationFrame(loop)}
// ---- chat ----
const ms=$('ms');
function addMsg(n,tx,tier,col){const d=document.createElement('div'),b=document.createElement('b');b.textContent=n+': ';b.style.color=tier?'#111':col;d.append(b,document.createTextNode(tx));if(tier){d.className='sc';d.style.background=TC[tier]}ms.append(d);while(ms.children.length>60)ms.firstChild.remove();ms.scrollTop=ms.scrollHeight}
function roofLabel(){const s='👑 '+(TP.n?TP.n+' · '+TP.v+' 🪙':t(30)),y=TP.av?33:54;cx.lineWidth=2;cx.strokeStyle='#000';cx.fillStyle='#ffd24a';cx.strokeText(s,322,y);cx.fillText(s,322,y)}
function say(p,tx,tier){p.say=tx;p.sayT=performance.now()+DUR[tier];p.sc=tier?TC[tier]:'';addMsg(p.name,tx,tier,p.col);if(tier){tot[p.name]=(tot[p.name]||0)+tier;if(tot[p.name]>TP.v){TP={n:p.name,v:tot[p.name],av:p.av}}}}
function updHud(){$('on').textContent='🟢 ONLINE: '+P.size;$('co').textContent=LIVE?'':'🪙 '+prof.coins}
$('tr').disabled=LIVE;
$('f').onsubmit=e=>{e.preventDefault();if(!me)return;const v=$('i').value.trim().slice(0,120),tier=LIVE?0:+$('tr').value,n=Date.now();if(!v||n-lastS<1000)return;
 if(tier&&prof.coins<tier)return toast(t(24));if(tier){prof.coins-=tier;save()}lastS=n;$('i').value='';say(me,v,tier);send('chat',{id:me.id,text:v});updHud()};
// ---- rede (Supabase Realtime: Broadcast p/ mover e falar, Presence p/ entrar/sair) ----
const send=(ev,payload)=>{if(rt)rt.send({type:'broadcast',event:ev,payload})};
function join(){const sb=supabase.createClient(CONFIG.SUPABASE_URL,CONFIG.SUPABASE_ANON_KEY);rt=sb.channel('world',{config:{presence:{key:me.id}}});
 rt.on('broadcast',{event:'move'},({payload:q})=>{const p=P.get(q.id);if(p&&p!==me){p.x=+q.x||p.x;p.y=+q.y||p.y;go(p,+q.tx,+q.ty)}})
 .on('broadcast',{event:'chat'},({payload:q})=>{const p=P.get(q.id);if(p&&p!==me)say(p,String(q.text).slice(0,120),0)})
 .on('presence',{event:'sync'},()=>{const s=rt.presenceState();for(const k in s){if(k===me.id||P.has(k))continue;const m=s[k][0];P.set(k,mk(k,String(m.name).slice(0,16),m.av,+m.x||320,+m.y||300))}for(const k of [...P.keys()])if(k!==me.id&&!s[k])P.delete(k);updHud()})
 .subscribe(st=>{if(st==='SUBSCRIBED')rt.track({name:me.name,av:me.av,x:me.x,y:me.y})})}
cv.addEventListener('pointerdown',e=>{if(!me)return;const b=cv.getBoundingClientRect();go(me,CX0+(e.clientX-b.left)/b.width*W/Z,CY0+(e.clientY-b.top)/b.height*H/Z);send('move',{id:me.id,x:me.x,y:me.y,tx:me.tx,ty:me.ty})});
cv.addEventListener('wheel',e=>{e.preventDefault();ZT=cl(ZT*(e.deltaY<0?1.2:1/1.2),1,3)},{passive:false});
function start(){if(!me){me=mk(LIVE?crypto.randomUUID():'me',prof.name,prof.av,320,300);me.eq=prof.eq;me.col='#ffffff';P.set(me.id,me);if(LIVE)join()}
 else{me.name=prof.name;me.av=Object.assign({},DEF,prof.av);if(rt)rt.track({name:me.name,av:me.av,x:me.x,y:me.y})}updHud()}
if(!LIVE){['mike7','kaito','ghostfps','vini.exe','breno_77','starboy','luanx'].forEach((n,i)=>P.set('bot'+i,mk('bot'+i,n,rav(),40+Math.random()*560,250+Math.random()*95)));
 setInterval(()=>{for(const p of P.values())if(p.id.startsWith('bot')){if(Math.random()<.4)go(p,Math.random()*640,246+Math.random()*100);if(Math.random()<.18)say(p,rnd(LN),Math.random()<.12?rnd([5,10,20]):0)}},3000)}
// ---- avatar e loja ----
let draft;const ROWS=[[8,'skin',SKIN],[9,'hs',[0,1,2,3]],[10,'hc',HC],[11,'sh',SH],[12,'pn',PN],[13,'ac',[0,1,2]]],LB={hs:['A','B','C','D'],ac:[0,1,2]};
function editor(){const box=$('rw');box.innerHTML='';for(const [lb,k,vs] of ROWS){const r=document.createElement('div');r.append(t(lb)+': ');vs.forEach((v,i)=>{const b=document.createElement('button');if(LB[k]){b.textContent=k==='ac'?t(14+i):LB[k][i];b.className='ch'}else{b.className='sw';b.style.background=v}if(draft[k]===v)b.classList.add('on');b.onclick=()=>{draft[k]=v;editor()};r.append(b)});box.append(r)}
 const c=$('pv').getContext('2d');c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,100,120);c.setTransform(4,0,0,4,0,0);drawAv(c,12,27,draft,0,0)}
function openAv(){draft=Object.assign({},DEF,prof.av);$('nm').value=prof.name;$('tk').style.display=prof.ok?'none':'';$('m1').classList.add('on');editor()}
$('ba').onclick=openAv;
$('go').onclick=()=>{const n=$('nm').value.trim().slice(0,16);if(!n)return toast(t(25));if(!prof.ok&&!$('ok').checked)return toast(t(26));prof.name=n;prof.av=Object.assign({},draft);prof.ok=1;save();$('m1').classList.remove('on');start()};
function shop(){const l=$('sl');l.innerHTML='';for(const it of ITEMS){const own=prof.inv.includes(it.id),on=prof.eq[it.t]===it.id,r=document.createElement('div'),s=document.createElement('span'),b=document.createElement('button');r.className='r';s.textContent=it.n+' · '+it.p+' 🪙';b.textContent=own?(on?t(23):t(22)):t(21);b.disabled=LIVE;
 b.onclick=()=>{if(!own){if(prof.coins<it.p)return toast(t(24));prof.coins-=it.p;prof.inv.push(it.id)}prof.eq[it.t]=on?null:it.id;save();shop();updHud()};r.append(s,b);l.append(r)}
 $('bc').textContent=LIVE?t(31):t(32);$('bc').disabled=LIVE;$('sn').textContent=LIVE?'':'DEMO'}
$('bs').onclick=()=>{shop();$('m2').classList.add('on')};$('x2').onclick=()=>$('m2').classList.remove('on');
$('bc').onclick=()=>{if(!LIVE){prof.coins+=50;save();shop();updHud()}};
// ---- contagem, banners, layout ----
// Desbloqueio: meia-noite LOCAL de 19/11; EUA e Canadá usam um horário único (meia-noite Eastern = 05:00 UTC)
const US=/^(America\/(New_York|Chicago|Denver|Phoenix|Los_Angeles|Anchorage|Detroit|Boise|Juneau|Sitka|Nome|Adak|Menominee|Indiana\/.+|Kentucky\/.+|North_Dakota\/.+|Toronto|Vancouver|Edmonton|Winnipeg|Halifax|St_Johns|Regina|Montreal|Moncton|Glace_Bay|Goose_Bay|Whitehorse|Yellowknife|Iqaluit|Thunder_Bay|Nipigon|Rainy_River)|US\/.+|Canada\/.+|Pacific\/Honolulu)$/;
const T=US.test(Intl.DateTimeFormat().resolvedOptions().timeZone)?new Date('2026-11-19T00:00:00-05:00'):new Date(2026,10,19,0,0,0);
function tick(){const s=Math.max(0,(T-Date.now())/1000|0),p=n=>String(n).padStart(2,'0');$('tm').textContent=s?(s>=86400?(s/86400|0)+t(34)+' ':'')+p((s%86400)/3600|0)+':'+p((s%3600)/60|0)+':'+p(s%60):t(28)}
setInterval(tick,500);tick();
// Zonas x,y,largura,altura em unidades lógicas 640x360 (= pixels da imagem 2560x1440 ÷ 4). Ajuste ao trocar o cenário.
const PL={cd:[251,80,138,65],b0:[56,161,78,29],b1:[500,149,91,28],b2:[214,80,17,77],b3:[407,80,19,77]};
function lay(){for(const k in PL){const [x,y,w,h]=PL[k];Object.assign($(k).style,{left:x/W*100+'%',top:y/H*100+'%',width:w/W*100+'%',height:h/H*100+'%'})}document.documentElement.style.setProperty('--u',cv.clientWidth/W+'px')}
addEventListener('resize',lay);lay();
CONFIG.banners.forEach((b,i)=>{if(b&&b.img){const e=$('b'+i),a=document.createElement('a'),im=new Image();im.src=b.img;im.alt='Patrocinador';a.href=b.link||'#';a.target='_blank';a.rel='noopener sponsored';a.append(im);e.textContent='';e.append(a)}});
function applyLang(){document.documentElement.lang=prof.lang;document.querySelectorAll('[data-i]').forEach(e=>e.textContent=t(+e.dataset.i));document.querySelectorAll('[data-p]').forEach(e=>e.placeholder=t(+e.dataset.p));$('tt').textContent=TXT[prof.lang]||TXT.en;if(draft)editor();tick()}
const lg=$('lg');LGN.forEach(([c,n])=>{const o=document.createElement('option');o.value=c;o.textContent=n;lg.append(o)});lg.value=prof.lang;lg.onchange=()=>{prof.lang=lg.value;save();applyLang()};
applyLang();
requestAnimationFrame(loop);
if(prof.ok&&prof.name)start();else openAv();
