const W=640,H=360,$=i=>document.getElementById(i),rnd=a=>a[Math.random()*a.length|0],cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const LIVE=!!(CONFIG.SUPABASE_URL&&window.supabase)&&!/[?&]demo=1/.test(location.search),cv=$('c'),cx=cv.getContext('2d');cv.width=1280;cv.height=720;
const SKY=['#1a0b3b','#2b0f55','#40136b','#5a1a7a','#7a2288','#a02f93','#c93d95','#e84d93','#ff6a8a','#ff8a7a','#ffab70','#ffc880'];
const SKIN=['#f1c9a5','#d9a273','#a8704a','#6b4328'],HC=['#1a1a1a','#5a3a1a','#e8c14a','#ff4fd8','#46e0ff'],SH=['#ff4fd8','#46e0ff','#ffd24a','#7aff9a','#e8e8ff'],PN=['#2b2b55','#1a1a1a','#5a3a1a','#3a6a9a'];
// ---- personagem chibi: peças desenhadas por retângulos (trocáveis por sprites do GPT depois) ----
const SK=['#f1c9a5','#c68642','#8d5524','#4a2c1a','#7ad65a','#a266e8','#e0453d']; // 4 tons normais + verde, roxo, vermelho (o corpo e um so; a cor e aplicada por codigo)
const HCL=['#161616','#4a2c1a','#7a4a24','#e8c14a','#c8501e','#dddddd','#ff4fd8','#46e0ff','#7aff9a','#8a4fff'];
const CLC=['#f4f4f4','#1a1a1a','#d9322e','#2e6fd9','#f2c230','#2e9a5a','#ff7ac8','#8a4fff','#f2822e','#8a8a95'];
// [id, nome, preço em centavos de dólar (0 = grátis), retângulos [x,y,w,h,cor]]  cor: 's' pele, 'd' tom escuro da cor escolhida, vazio = cor escolhida
const S={
hair:[['hair_00','Bald',0,[],'u'],['hair_01','Buzz cut',0,[[-5,-20,10,2]],'m'],['hair_02','Side part',0,[[-5,-21,10,3],[-5,-18,2,2]],'m'],['hair_03','Spiky',0,[[-5,-20,10,2],[-4,-22,2,2],[-1,-23,2,3],[2,-22,2,2]],'m'],['hair_09','Slick back',99,[[-5,-21,10,3],[-5,-18,1,3],[-5,-21,10,1,"d"]],'m'],['hair_10','Mullet',99,[[-5,-21,10,3],[-6,-18,2,7],[4,-18,2,7]],'m'],['hair_08','Mohawk',99,[[-1,-24,3,7],[-5,-19,10,1,"d"]],'m'],['hair_12','Punk',99,[[-5,-20,10,2],[-4,-24,1,4],[-2,-25,1,5],[0,-26,1,6],[2,-25,1,5],[3,-24,1,3]],'m'],['hair_06','Afro',99,[[-7,-24,14,7],[-6,-18,2,3],[4,-18,2,3]],'m'],['hair_13','Braids',99,[[-5,-21,10,3],[-6,-18,1,9],[5,-18,1,9],[-4,-19,1,6,"d"],[3,-19,1,6,"d"]],'m'],['hair_14','Dreads',99,[[-5,-21,10,3],[-6,-18,1,10],[-7,-17,1,8],[5,-18,1,10],[6,-17,1,8],[-4,-18,1,3,"d"]],'m'],['hair_15','Curly fade',99,[[-5,-22,10,3],[-4,-23,2,1],[0,-23,3,1],[-5,-19,1,1]],'m'],['hair_16','High top',99,[[-4,-25,8,5],[-5,-21,10,2]],'m'],['hair_04','Long',0,[[-5,-21,10,3],[-6,-18,2,9],[4,-18,2,9]],'f'],['hair_05','Ponytail',0,[[-5,-21,10,3],[4,-19,3,2],[5,-17,2,5]],'f'],['hair_07','Curly',0,[[-6,-22,12,5],[-7,-20,2,3],[5,-20,2,3]],'f'],['hair_11','Bob',99,[[-6,-21,12,4],[-6,-17,2,5],[4,-17,2,5]],'f'],['hair_17','Big afro',99,[[-8,-25,16,9],[-7,-17,2,5],[5,-17,2,5]],'f'],['hair_18','Puffs',99,[[-5,-21,10,2],[-9,-24,5,5],[4,-24,5,5]],'f'],['hair_19','Box braids',99,[[-5,-21,10,3],[-6,-18,2,12],[4,-18,2,12],[-8,-17,1,10],[7,-17,1,10]],'f'],['hair_20','Curly bob',99,[[-6,-22,12,5],[-7,-19,2,5],[5,-19,2,5],[-5,-23,3,1]],'f'],['hair_21','Pixie',99,[[-5,-21,10,2],[-5,-19,2,2],[-3,-19,1,1]],'f'],['hair_22','Bun',99,[[-5,-21,10,3],[-3,-25,6,4]],'f'],['hair_23','80s perm',99,[[-8,-24,16,7],[-9,-20,3,8],[6,-20,3,8]],'f'],['hair_24','Side shave',99,[[0,-22,6,3],[-5,-20,5,1],[-4,-24,2,3],[-5,-21,10,1,"d"]],'f']],
beard:[['beard_00','None',0,[]],['beard_01','Stubble',0,[[-4,-14,8,2]]],['beard_02','Full beard',99,[[-5,-14,10,3],[-4,-11,8,1]]],['beard_03','Goatee',0,[[-2,-13,4,2]]],['beard_04','Mustache',0,[[-3,-14,6,1]]],['beard_05','Chin strap',99,[[-5,-15,1,3],[4,-15,1,3],[-4,-12,8,1]]],['beard_06','Long beard',149,[[-5,-14,10,3],[-4,-11,8,3]]]],
top:[['top_01','Tee',0,[[-4,-11,8,6],[-5,-11,1,3],[4,-11,1,3],[-5,-8,1,3,'s'],[4,-8,1,3,'s']]],['top_02','Hoodie',0,[[-4,-11,8,6],[-5,-11,1,6],[4,-11,1,6],[-2,-7,4,1,'d'],[-4,-12,8,1,'d']]],['top_03','Tank top',0,[[-3,-11,6,6],[-5,-11,1,5,'s'],[4,-11,1,5,'s'],[-4,-11,1,2,'s'],[3,-11,1,2,'s']]],['top_04','Hawaiian shirt',199,[[-4,-11,8,6],[-5,-11,1,3],[4,-11,1,3],[-5,-8,1,3,'s'],[4,-8,1,3,'s'],[-3,-10,1,1,'#ffd24a'],[0,-9,1,1,'#fff'],[2,-10,1,1,'#ff4fd8'],[-2,-7,1,1,'#fff'],[2,-7,1,1,'#ffd24a']]],['top_05','Leather jacket',249,[[-4,-11,8,6],[-5,-11,1,6],[4,-11,1,6],[0,-11,1,6,'#d8d8d8']]],['top_06','Suit',299,[[-4,-11,8,6],[-5,-11,1,6],[4,-11,1,6],[-1,-11,2,6,'#fff'],[0,-10,1,4,'#d9322e']]],['top_07','Crop top',149,[[-4,-11,8,3],[-5,-11,1,3],[4,-11,1,3],[-5,-8,1,3,'s'],[4,-8,1,3,'s'],[-4,-8,8,3,'s']]],['top_08','Jersey',199,[[-4,-11,8,6],[-5,-11,1,3],[4,-11,1,3],[-5,-8,1,3,'s'],[4,-8,1,3,'s'],[-4,-8,8,1,'#fff'],[-4,-6,8,1,'#fff']]]],
bot:[['bot_01','Jeans',0,[[-4,-5,4,4],[0,-5,4,4]]],['bot_02','Shorts',0,[[-4,-5,4,2],[0,-5,4,2],[-3,-3,2,1,'s'],[1,-3,2,1,'s']]],['bot_03','Skirt',99,[[-4,-6,8,3],[-3,-3,2,1,'s'],[1,-3,2,1,'s']]],['bot_04','Track pants',99,[[-4,-5,4,4],[0,-5,4,4],[-4,-5,1,4,'#fff'],[3,-5,1,4,'#fff']]]],
shoe:[['shoe_01','Sneakers',0,[[-4,-2,4,2,'#f4f4f4'],[0,-2,4,2,'#f4f4f4'],[-4,-1,4,1,'#aaa'],[0,-1,4,1,'#aaa']]],['shoe_02','Boots',149,[[-4,-3,4,3,'#6b4328'],[0,-3,4,3,'#6b4328']]],['shoe_03','Sandals',0,[[-4,-1,4,1,'#c8a15a'],[0,-1,4,1,'#c8a15a'],[-3,-2,2,1,'s'],[1,-2,2,1,'s']]],['shoe_04','Loafers',149,[[-4,-2,4,2,'#1a1a1a'],[0,-2,4,2,'#1a1a1a']]]],
hat:[['hat_00','None',0,[]],['hat_01','Cap',0,[[-5,-22,10,3],[-7,-19,6,1,'d']]],['hat_02','Trucker cap',99,[[-5,-22,10,3,'#f4f4f4'],[-5,-22,10,1],[-7,-19,6,1,'d']]],['hat_03','Beanie',0,[[-5,-23,10,4],[-5,-20,10,1,'d']]],['hat_04','Bucket hat',149,[[-5,-22,10,3],[-7,-19,14,1,'d']]],['hat_05','Fedora',199,[[-4,-23,8,4],[-7,-20,14,1,'d'],[-4,-20,8,1,'#1a1a1a']]],['hat_06','Cowboy hat',249,[[-4,-24,8,5],[-8,-20,16,1,'d'],[-8,-21,2,1,'d'],[6,-21,2,1,'d']]],['hat_07','Bandana',99,[[-5,-21,10,3],[4,-19,3,2,'d'],[-5,-19,10,1,'d']]],['hat_08','Golf visor',99,[[-5,-21,10,2],[-7,-19,6,1,'d']]]],
gl:[['gl_00','None',0,[]],['gl_01','Aviators',99,[[-4,-17,4,3,'#1a1a1a'],[0,-17,4,3,'#1a1a1a'],[-1,-16,1,1,'#1a1a1a']]],['gl_02','Round shades',99,[[-4,-17,4,3,'#2a2a55'],[0,-17,4,3,'#2a2a55'],[-1,-16,1,1,'#111'],[-3,-16,1,1,'#8ad']]],['gl_03','Neon hearts',149,[[-4,-17,4,3,'#ff4fd8'],[0,-17,4,3,'#ff4fd8'],[-1,-16,1,1,'#ff4fd8']]],['gl_04','Visor',199,[[-5,-17,10,3,'#46e0ff'],[-5,-17,10,1,'#8ff']]]],
acc:[['acc_00','None',0,[]],['acc_01','Gold chain',299,[[-2,-12,4,1,'#ffd24a'],[-1,-11,2,2,'#ffd24a']]],['acc_02','Earrings',99,[[-6,-15,1,2,'#ffd24a'],[5,-15,1,2,'#ffd24a']]],['acc_03','Headphones',149,[[-5,-21,10,1,'#ddd'],[-6,-18,1,4,'#ddd'],[5,-18,1,4,'#ddd']]],['acc_04','Face mask',99,[[-4,-14,8,3,'#8ad0ff'],[-6,-15,1,3,'#8ad0ff'],[5,-15,1,3,'#8ad0ff']]]]};
S.top.push(['top_09','Lab coat',299,[[-4,-11,8,6,'#f4f4f4'],[-5,-11,1,6,'#f4f4f4'],[4,-11,1,6,'#f4f4f4'],[-1,-11,2,6,'#8ad0ff'],[-4,-8,1,1,'#bbb'],[3,-8,1,1,'#bbb']]],
['top_10','Police shirt',249,[[-4,-11,8,6,'#2b3a8a'],[-5,-11,1,3,'#2b3a8a'],[4,-11,1,3,'#2b3a8a'],[-5,-8,1,3,'s'],[4,-8,1,3,'s'],[2,-10,2,2,'#ffd24a'],[-1,-11,2,1,'#fff']]],
['top_11','Pink tropical',199,[[-4,-11,8,6,'#ff7ac8'],[-5,-11,1,3,'#ff7ac8'],[4,-11,1,3,'#ff7ac8'],[-5,-8,1,3,'s'],[4,-8,1,3,'s'],[-3,-10,1,1,'#46e0ff'],[0,-9,1,1,'#ffd24a'],[2,-10,1,1,'#fff'],[-2,-7,1,1,'#7aff9a'],[2,-7,1,1,'#46e0ff']]],
['top_12','White suit',299,[[-4,-11,8,6,'#f4f4f4'],[-5,-11,1,6,'#f4f4f4'],[4,-11,1,6,'#f4f4f4'],[-1,-11,2,6,'#ff7ac8'],[0,-10,1,5,'#ff4fd8']]],
['top_13','Teal suit',299,[[-4,-11,8,6,'#1ab5a5'],[-5,-11,1,6,'#1ab5a5'],[4,-11,1,6,'#1ab5a5'],[-1,-11,2,6,'#fff'],[0,-10,1,4,'#ffd24a']]],
['top_14','Pink suit',299,[[-4,-11,8,6,'#ff7ac8'],[-5,-11,1,6,'#ff7ac8'],[4,-11,1,6,'#ff7ac8'],[-1,-11,2,6,'#fff'],[0,-10,1,4,'#8a4fff']]],
['top_15','80s blouse',199,[[-6,-12,12,2,'#8a4fff'],[-4,-11,8,6,'#8a4fff'],[-5,-9,1,3,'s'],[4,-9,1,3,'s'],[-3,-9,6,1,'#ff4fd8']]]);
S.bot.push(['bot_05','80s skirt',149,[[-5,-6,10,3,'#ff4fd8'],[-3,-3,2,1,'s'],[1,-3,2,1,'s']]],['bot_06','Black suit pants',149,[[-4,-5,4,4,'#1a1a2e'],[0,-5,4,4,'#1a1a2e']]],['bot_07','White pants',149,[[-4,-5,4,4,'#f4f4f4'],[0,-5,4,4,'#f4f4f4']]],
['bot_08','Teal suit pants',149,[[-4,-5,4,4,'#1ab5a5'],[0,-5,4,4,'#1ab5a5']]],['bot_09','Police pants',149,[[-4,-5,4,4,'#1c2a5a'],[0,-5,4,4,'#1c2a5a']]],['bot_10','Pink suit pants',149,[[-4,-5,4,4,'#ff7ac8'],[0,-5,4,4,'#ff7ac8']]]);
S.shoe.push(['shoe_05','Heels',149,[[-4,-2,4,2,'#ff4fd8'],[0,-2,4,2,'#ff4fd8'],[-4,-3,1,1,'#ff4fd8'],[3,-3,1,1,'#ff4fd8']]],['shoe_06','Police boots',149,[[-4,-3,4,3,'#111'],[0,-3,4,3,'#111']]]);
S.hat.push(['hat_09','Police cap',149,[[-5,-22,10,3,'#2b3a8a'],[-7,-19,6,1,'#111'],[-2,-22,2,1,'#ffd24a']]]);
S.gl.push(['gl_05','Safety goggles',149,[[-5,-17,10,3,'#9be8ff'],[-5,-17,10,1,'#fff']]]);
const PM={},PRICE={},NAME={};for(const k in S)for(const [id,n,pr,r] of S[k]){PM[id]=r;PRICE[id]=pr;NAME[id]=n}
const DEF={skin:SK[0],hair:'hair_01',hc:HCL[1],beard:'beard_00',bc:HCL[1],top:'top_01',tc:CLC[3],bot:'bot_01',pc:CLC[9],shoe:'shoe_01',hat:'hat_00',htc:CLC[2],gl:'gl_00',acc:'acc_00'};
const FREE=k=>S[k].filter(x=>!x[2]).map(x=>x[0]);
const rav=()=>({skin:rnd(SK.slice(0,4)),hair:rnd(FREE('hair')),hc:rnd(HCL),beard:rnd(['beard_00','beard_00',...FREE('beard')]),bc:rnd(HCL),top:rnd(FREE('top')),tc:rnd(CLC),bot:rnd(FREE('bot')),pc:rnd(CLC),shoe:rnd(FREE('shoe')),hat:rnd(['hat_00',...FREE('hat')]),htc:rnd(CLC),gl:'gl_00',acc:'acc_00'});
const usd=c=>'$'+(c/100).toFixed(2);
const shade=h=>{const n=parseInt(h.slice(1),16);return '#'+[n>>16&255,n>>8&255,n&255].map(v=>(v*.7|0).toString(16).padStart(2,'0')).join('')};
// looks prontos (estilo GTA/Miami): é só um atalho; cada peça continua trocável
const LOOKS=[['Street Crew',{hair:'hair_01',hat:'hat_07',htc:CLC[2],top:'top_02',tc:CLC[1],bot:'bot_04',pc:CLC[9],shoe:'shoe_01',gl:'gl_01',acc:'acc_01'}],
['Miami Retiree',{hair:'hair_00',hat:'hat_08',htc:CLC[0],top:'top_04',tc:CLC[8],bot:'bot_02',pc:CLC[0],shoe:'shoe_03',gl:'gl_02',hc:HCL[5]}],
['Country',{hair:'hair_10',hc:HCL[2],beard:'beard_02',bc:HCL[2],hat:'hat_02',htc:CLC[2],top:'top_03',tc:CLC[2],bot:'bot_01',pc:CLC[3],shoe:'shoe_02'}],
['Miami Night',{hair:'hair_09',hc:HCL[0],top:'top_06',tc:CLC[6],bot:'bot_01',pc:CLC[0],shoe:'shoe_04',gl:'gl_02'}],
['Beach',{hair:'hair_04',hc:HCL[3],top:'top_07',tc:CLC[6],bot:'bot_02',pc:CLC[3],shoe:'shoe_03',gl:'gl_03'}],
['Biker',{hair:'hair_02',beard:'beard_02',top:'top_05',tc:CLC[1],bot:'bot_01',pc:CLC[3],shoe:'shoe_02',hat:'hat_07',htc:CLC[1],gl:'gl_01'}],
['Club',{hair:'hair_08',hc:HCL[6],top:'top_08',tc:CLC[7],bot:'bot_04',pc:CLC[1],shoe:'shoe_01',gl:'gl_04'}],
['Tourist',{hair:'hair_03',hat:'hat_04',htc:CLC[4],top:'top_04',tc:CLC[3],bot:'bot_02',pc:CLC[4],shoe:'shoe_03',gl:'gl_01',acc:'acc_03'}]];
LOOKS.push(['Casual',{hair:'hair_01',top:'top_01',tc:CLC[3],bot:'bot_01',pc:CLC[9],shoe:'shoe_01'},'u'],['Hoodie Day',{hair:'hair_03',top:'top_02',tc:CLC[7],bot:'bot_01',pc:CLC[1],shoe:'shoe_01'},'u'],
['Chemist',{hair:'hair_09',hc:HCL[5],top:'top_09',bot:'bot_07',shoe:'shoe_01',gl:'gl_05'},'u'],['Police',{hair:'hair_01',top:'top_10',bot:'bot_09',shoe:'shoe_06',hat:'hat_09',gl:'gl_01'},'u'],
['80s Dress',{hair:'hair_23',hc:HCL[6],top:'top_15',bot:'bot_05',shoe:'shoe_05',acc:'acc_02'},'f'],['White Suit',{hair:'hair_09',top:'top_12',bot:'bot_07',shoe:'shoe_04',gl:'gl_02'},'m'],
['Teal Suit',{hair:'hair_02',top:'top_13',bot:'bot_08',shoe:'shoe_04',gl:'gl_01'},'m'],['Pink Suit',{hair:'hair_21',hc:HCL[0],top:'top_14',bot:'bot_10',shoe:'shoe_05'},'f'],['Miami Pink',{hair:'hair_18',hc:HCL[1],top:'top_11',bot:'bot_02',shoe:'shoe_03',gl:'gl_03'},'f']);
const lookParts=l=>['hair','beard','top','bot','shoe','hat','gl','acc'].map(k=>l[1][k]).filter(Boolean);
const isPrem=l=>lookParts(l).some(id=>PRICE[id]);
const ITEMS=[['pet_dog','pet','','Dog',300],['pet_cat','pet','','Cat',300],['pet_parrot','pet','','Parrot',400],['pet_rabbit','pet','','Rabbit',350],['pet_flamingo','pet','','Flamingo',700],['pet_monkey','pet','','Monkey',800],['pet_snake','pet','','Python',900],['pet_croc','pet','','Crocodile',1200],['pet_tiger','pet','','Tiger',1500],
['car_moto','car','','Motorbike',900],['car_coupe','car','','Sports coupe',1200],['car_muscle','car','','Muscle car',1400],['car_suv','car','','Armored SUV',1800],['car_limo','car','','Limo van',2500],
['st_palm','statue','','Neon palm',600],['st_money','statue','','Money bag',700],['st_trophy','statue','','Giant trophy',900],['st_dolphin','statue','','Golden dolphin',1000],['st_crown','statue','','Giant crown',1500],
['aura_pink','aura','','Neon pink aura',500,'#ff4fd8'],['aura_blue','aura','','Neon blue aura',500,'#46e0ff']].map(([id,t,e,n,p,c])=>({id,t,e:id,n,p,c}));
const TC={100:'#46e0ff',250:'#7aff9a',500:'#ffd24a',1000:'#ff4fa8'},DUR={0:5000,100:10000,250:20000,500:40000,1000:60000};
const LN=['this game is awesome','when does it launch?','love this city','wanna hang out?','been here since early lol','anyone at the club?','is there an event?','love the map'];
let prof;try{prof=JSON.parse(localStorage.nco)}catch(e){}
prof=Object.assign({name:'',av:Object.assign({},DEF),coins:5000,all:false,tier:'free',claims:{},inv:[],eq:{},ok:0,sets:[],drawn:0,terms:null},prof);
if(prof.tier==='boss')prof.tier='gangster'; // Vice Boss foi removido
if(prof.tier==='gangster')prof.all=true;
const save=()=>{try{localStorage.nco=JSON.stringify(prof)}catch(e){}};
const I18={"en": ["tap the ground to walk · mouse wheel = zoom", "GLOBAL CHAT", "Shop", "Super chat:", "Normal", "Type your message...", "Your character", "Your name", "Skin", "Hair", "Hair color", "Shirt", "Pants", "Accessory", "None", "Glasses", "Cap", "I accept the terms", "Read terms", "Enter", "Close", "Buy", "Equip", "Remove", "Not enough coins", "Choose a name", "Accept the terms to enter", "THE BIG LAUNCH IN:", "LIVE NOW!", "YOUR AD HERE", "BE TODAY'S TOP", "Card payments coming soon", "+50 coins (demo)", "Language", "d"], "es": ["toca el suelo para caminar · rueda del ratón = zoom", "CHAT GLOBAL", "Tienda", "Super chat:", "Normal", "Escribe tu mensaje...", "Tu personaje", "Tu nombre", "Piel", "Pelo", "Color de pelo", "Camiseta", "Pantalón", "Accesorio", "Ninguno", "Gafas", "Gorra", "Acepto los términos", "Leer términos", "Entrar", "Cerrar", "Comprar", "Equipar", "Quitar", "Monedas insuficientes", "Elige un nombre", "Acepta los términos para entrar", "EL GRAN LANZAMIENTO EN:", "¡YA DISPONIBLE!", "TU ANUNCIO AQUÍ", "SÉ EL TOP DE HOY", "Pagos con tarjeta próximamente", "+50 monedas (demo)", "Idioma", "d"], "pt": ["toque no chão para andar · roda do mouse = zoom", "CHAT GLOBAL", "Loja", "Super chat:", "Normal", "Digite sua mensagem...", "Seu personagem", "Seu nome", "Pele", "Cabelo", "Cor do cabelo", "Camisa", "Calça", "Acessório", "Nada", "Óculos", "Boné", "Li e aceito os termos", "Ler termos", "Entrar", "Fechar", "Comprar", "Equipar", "Tirar", "Moedas insuficientes", "Escolha um nome", "Aceite os termos para entrar", "O GRANDE LANÇAMENTO EM:", "NO AR!", "SEU ANÚNCIO AQUI", "SEJA O TOP DO DIA", "Pagamento por cartão em breve", "+50 moedas (demo)", "Idioma", "d"], "fr": ["touchez le sol pour marcher · molette = zoom", "CHAT GLOBAL", "Boutique", "Super chat :", "Normal", "Écrivez votre message...", "Votre personnage", "Votre nom", "Peau", "Cheveux", "Couleur des cheveux", "T-shirt", "Pantalon", "Accessoire", "Aucun", "Lunettes", "Casquette", "J'accepte les conditions", "Lire les conditions", "Entrer", "Fermer", "Acheter", "Équiper", "Retirer", "Pièces insuffisantes", "Choisissez un nom", "Acceptez les conditions pour entrer", "LE GRAND LANCEMENT DANS :", "DISPONIBLE !", "VOTRE PUB ICI", "SOYEZ LE TOP DU JOUR", "Paiement par carte bientôt", "+50 pièces (démo)", "Langue", "j"], "de": ["Boden antippen zum Laufen · Mausrad = Zoom", "GLOBALER CHAT", "Shop", "Super-Chat:", "Normal", "Nachricht eingeben...", "Deine Figur", "Dein Name", "Haut", "Haare", "Haarfarbe", "Shirt", "Hose", "Zubehör", "Keins", "Brille", "Kappe", "Ich akzeptiere die Bedingungen", "Bedingungen lesen", "Betreten", "Schließen", "Kaufen", "Anlegen", "Ablegen", "Nicht genug Münzen", "Wähle einen Namen", "Bedingungen akzeptieren, um einzutreten", "DER GROSSE START IN:", "JETZT LIVE!", "DEINE WERBUNG HIER", "WERDE TOP DES TAGES", "Kartenzahlung bald verfügbar", "+50 Münzen (Demo)", "Sprache", "T"], "it": ["tocca il suolo per camminare · rotella = zoom", "CHAT GLOBALE", "Negozio", "Super chat:", "Normale", "Scrivi il tuo messaggio...", "Il tuo personaggio", "Il tuo nome", "Pelle", "Capelli", "Colore capelli", "Maglia", "Pantaloni", "Accessorio", "Nessuno", "Occhiali", "Cappello", "Accetto i termini", "Leggi i termini", "Entra", "Chiudi", "Acquista", "Equipaggia", "Rimuovi", "Monete insufficienti", "Scegli un nome", "Accetta i termini per entrare", "IL GRANDE LANCIO TRA:", "IN ONDA!", "LA TUA PUBBLICITÀ QUI", "DIVENTA IL TOP DEL GIORNO", "Pagamento con carta in arrivo", "+50 monete (demo)", "Lingua", "g"], "ru": ["коснитесь земли, чтобы идти · колесо мыши = зум", "ОБЩИЙ ЧАТ", "Магазин", "Супер-чат:", "Обычный", "Введите сообщение...", "Ваш персонаж", "Ваше имя", "Кожа", "Волосы", "Цвет волос", "Футболка", "Штаны", "Аксессуар", "Нет", "Очки", "Кепка", "Я принимаю условия", "Читать условия", "Войти", "Закрыть", "Купить", "Надеть", "Снять", "Недостаточно монет", "Выберите имя", "Примите условия, чтобы войти", "ВЕЛИКИЙ ЗАПУСК ЧЕРЕЗ:", "УЖЕ В ЭФИРЕ!", "ВАША РЕКЛАМА ЗДЕСЬ", "СТАНЬ ТОПОМ ДНЯ", "Оплата картой скоро", "+50 монет (демо)", "Язык", "д"], "ja": ["地面をタップして移動 · マウスホイール=ズーム", "グローバルチャット", "ショップ", "スーパーチャット:", "通常", "メッセージを入力...", "あなたのキャラ", "あなたの名前", "肌", "髪型", "髪の色", "シャツ", "ズボン", "アクセサリー", "なし", "メガネ", "キャップ", "利用規約に同意します", "規約を読む", "入る", "閉じる", "購入", "装備", "外す", "コインが足りません", "名前を選んでください", "入るには規約への同意が必要です", "大型リリースまで:", "公開中!", "広告募集中", "今日のトップになろう", "カード決済は近日対応", "+50コイン(デモ)", "言語", "日"], "ko": ["바닥을 눌러 이동 · 마우스 휠 = 확대", "전체 채팅", "상점", "슈퍼챗:", "일반", "메시지를 입력하세요...", "내 캐릭터", "내 이름", "피부", "머리", "머리 색", "셔츠", "바지", "액세서리", "없음", "안경", "모자", "약관에 동의합니다", "약관 읽기", "입장", "닫기", "구매", "장착", "해제", "코인이 부족합니다", "이름을 선택하세요", "입장하려면 약관에 동의하세요", "대형 출시까지:", "지금 출시!", "광고 문의", "오늘의 TOP이 되세요", "카드 결제 곧 지원", "+50 코인(데모)", "언어", "일"], "zh": ["点击地面行走 · 鼠标滚轮=缩放", "全球聊天", "商店", "超级聊天:", "普通", "输入消息...", "你的角色", "你的名字", "肤色", "发型", "发色", "上衣", "裤子", "配饰", "无", "眼镜", "帽子", "我接受条款", "阅读条款", "进入", "关闭", "购买", "装备", "卸下", "金币不足", "请选择名字", "请接受条款后进入", "盛大发售倒计时:", "现已上线!", "广告位招租", "成为今日榜首", "银行卡支付即将上线", "+50金币(演示)", "语言", "天"], "tr": ["yürümek için zemine dokun · fare tekerleği = yakınlaştır", "GENEL SOHBET", "Mağaza", "Süper sohbet:", "Normal", "Mesajını yaz...", "Karakterin", "Adın", "Ten", "Saç", "Saç rengi", "Tişört", "Pantolon", "Aksesuar", "Yok", "Gözlük", "Şapka", "Şartları kabul ediyorum", "Şartları oku", "Gir", "Kapat", "Satın al", "Kuşan", "Çıkar", "Yetersiz jeton", "Bir isim seç", "Girmek için şartları kabul et", "BÜYÜK ÇIKIŞA:", "YAYINDA!", "REKLAMINIZ BURADA", "GÜNÜN ZİRVESİ OL", "Kartla ödeme yakında", "+50 jeton (demo)", "Dil", "g"], "hi": ["चलने के लिए ज़मीन पर टैप करें · माउस व्हील = ज़ूम", "ग्लोबल चैट", "दुकान", "सुपर चैट:", "सामान्य", "अपना संदेश लिखें...", "आपका किरदार", "आपका नाम", "त्वचा", "बाल", "बालों का रंग", "शर्ट", "पैंट", "एक्सेसरी", "कोई नहीं", "चश्मा", "टोपी", "मैं शर्तें स्वीकार करता/करती हूँ", "शर्तें पढ़ें", "प्रवेश करें", "बंद करें", "खरीदें", "पहनें", "हटाएँ", "सिक्के कम हैं", "एक नाम चुनें", "प्रवेश के लिए शर्तें स्वीकार करें", "बड़े लॉन्च में:", "अब लाइव!", "आपका विज्ञापन यहाँ", "आज के टॉप बनें", "कार्ड भुगतान जल्द", "+50 सिक्के (डेमो)", "भाषा", "दिन"]};
const LGN=[["en", "English"], ["es", "Español"], ["pt", "Português"], ["fr", "Français"], ["de", "Deutsch"], ["it", "Italiano"], ["ru", "Русский"], ["ja", "日本語"], ["ko", "한국어"], ["zh", "中文"], ["tr", "Türkçe"], ["hi", "हिन्दी"]];
prof.lang=I18[prof.lang]?prof.lang:'en'; // idioma padrão: inglês
const t=i=>I18[prof.lang][i];
var READY=false;
const x=k=>{const a=X[k];if(!a)return k;const i=LGN.findIndex(l=>l[0]===prof.lang);return a[i<0?0:i]||a[0]}; // textos novos: js/i18n.js (ingles = principal/fallback)
let toastT;function toast(m){const e=$('ts');e.textContent=m;e.style.display='block';clearTimeout(toastT);toastT=setTimeout(()=>e.style.display='none',2000)}
// ---- desenho ----
// ---- cenário fixo + luz dia/noite ----
const mi=s=>{const i=new Image();i.src=s;return i};
const FR=mi('img/plaza_front.webp'),BK=mi('img/plaza_back.webp'),SUN=mi('img/sol.webp'),MOON=mi('img/lua.webp'),CL=mi('img/balada.webp'),FRN=mi('img/plaza_front_n.webp'),BKN=mi('img/plaza_back_n.webp');// dia 7 min / noite 5 min, igual para todos; a troca dura 3 s: o sol sobe e some, a lua entra quicando (e o contrário)
const DAYS=420,NIGHTS=300,TRS=3,CYCL=DAYS+NIGHTS,SX=460,SY=26;
function dn(){const p=(Date.now()/1000)%CYCL;if(p<TRS)return[1-p/TRS,'n2d',p/TRS];if(p<DAYS)return[0];if(p<DAYS+TRS)return[(p-DAYS)/TRS,'d2n',(p-DAYS)/TRS];return[1]}
const sm=u=>u*u*(3-2*u),eb=u=>1+2.9*(u-1)**3+1.9*(u-1)**2;
const ebo=u=>{const n=7.5625,d=2.75;if(u<1/d)return n*u*u;if(u<2/d)return n*(u-=1.5/d)*u+.75;if(u<2.5/d)return n*(u-=2.25/d)*u+.9375;return n*(u-=2.625/d)*u+.984375};
const hx=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)),KD=[['#3d9bff','#ffe2a8'],['#5a1fc0','#ff7a50'],['#050218','#1a0a4a']];
const skyCol=(w,k)=>{const o=[0,0,0];KD.forEach((q,n)=>hx(q[k]).forEach((v,j)=>o[j]+=v*w[n]));return`rgb(${o.map(v=>v|0)})`};
function body(im,x,y,s,r,a){if(!im.naturalWidth||a<=0)return;cx.save();cx.globalAlpha=a;cx.translate(x,y);cx.rotate(r);cx.drawImage(im,-s/2,-s/2,s,s);cx.restore()}
function drawWorld(t){const [nm,ph,u]=dn(),k=sm(nm),dw=Math.min(.55,2.4*k*(1-k)),w=[(1-k)*(1-dw),dw,k*(1-dw)];
 const g=cx.createLinearGradient(0,0,0,75);g.addColorStop(0,skyCol(w,0));g.addColorStop(1,skyCol(w,1));cx.fillStyle=g;cx.fillRect(0,0,W,75);
 if(k>0){cx.fillStyle='#fff';for(let i=0;i<60;i++){cx.globalAlpha=k*(.4+.6*Math.abs(Math.sin(t/500+i)));cx.fillRect((i*97.3)%W|0,(i*37.7)%58|0,1,1)}cx.globalAlpha=1}
 const bob=Math.sin(t/600)*1.2;let sy=SY+bob,sr=0,sa=0,my=SY+bob,mr=0,ma=0,ms=20;
 if(!ph){if(nm)ma=1;else sa=1}
 else if(ph==='d2n'){sa=1;if(u<.2)sy=SY+5*sm(u/.2);else{const v=(u-.2)/.8;sy=SY+5-(SY+50)*v*v;sr=v*6.3}
  if(u>=.25){const v=(u-.25)/.75,e=eb(v);ma=1;my=SY+60-60*e;ms=20*(.4+.6*Math.min(1,e));mr=Math.sin(v*16)*.45*(1-v)}}
 else{ma=1;if(u<.2)my=SY-5*sm(u/.2);else{const v=(u-.2)/.8;my=SY-5+65*v*v;mr=-v*6.3}
  if(u>=.25){const v=(u-.25)/.75;sa=1;sy=-30+(SY+30)*ebo(v);sr=Math.sin(v*14)*.3*(1-v)}}
 body(MOON,SX,my,ms,mr,ma);body(SUN,SX,sy,22,sr,sa);
 if(BK.naturalWidth)cx.drawImage(BK,0,0,W,BK.naturalHeight/2);
 if(k>0&&BKN.naturalWidth){cx.globalAlpha=k;cx.drawImage(BKN,0,0,W,BKN.naturalHeight/2);cx.globalAlpha=1}
 if(FR.naturalWidth)cx.drawImage(FR,0,0,W,H);else{cx.fillStyle='#2a1442';cx.fillRect(0,75,W,H-75)}
 if(k>0&&FRN.naturalWidth){cx.globalAlpha=k;cx.drawImage(FRN,0,0,W,H);cx.globalAlpha=1}}
function drawClub(t){if(CL.naturalWidth)cx.drawImage(CL,0,0,W,H);else{cx.fillStyle='#0b0418';cx.fillRect(0,0,W,H)}
 const bt=NOW&&AC?((Date.now()-NOW.t0)/1000*TR[NOW.id].bpm/60)%1:(t/700)%1;cx.globalCompositeOperation='lighter';cx.fillStyle=`rgba(150,60,255,${.07*(1-bt)})`;cx.fillRect(0,0,W,H);cx.globalCompositeOperation='source-over'}

const GL=[[38,160,34],[179,160,34],[456,160,34],[602,160,34],[320,142,60],[102,165,36],[531,165,36]]; // brilhos noturnos: x,y,raio
function light(){const k=sm(dn()[0]);
 if(k<1){cx.globalCompositeOperation='screen';const q=cx.createLinearGradient(0,0,0,H);q.addColorStop(0,`rgba(255,150,40,${.08*(1-k)})`);q.addColorStop(.7,`rgba(255,205,70,${.14*(1-k)})`);q.addColorStop(1,`rgba(255,175,60,${.08*(1-k)})`);cx.fillStyle=q;cx.fillRect(0,0,W,H)}
 if(k>0){cx.globalCompositeOperation='multiply';cx.fillStyle=`rgb(${255-60*k|0},${255-50*k|0},${255-20*k|0})`;cx.fillRect(0,0,W,H);cx.globalCompositeOperation='lighter';
  for(const [x,y,r] of GL){const q=cx.createRadialGradient(x,y,0,x,y,r);q.addColorStop(0,`rgba(255,170,90,${.45*k})`);q.addColorStop(1,'rgba(255,170,90,0)');cx.fillStyle=q;cx.fillRect(x-r,y-r,2*r,2*r)}}
 cx.globalCompositeOperation='source-over'}

PX.EMOJI.forEach(n=>{const x=document.createElement('span');x.append(PX.el(n,2));x.title=n;x.onclick=()=>{$('i').value+=':'+n+': ';$('i').focus()};$('ep').append(x)}); // emojis em pixel art (js/px.js); no chat viajam como :nome:
$('em').onclick=()=>$('ep').classList.toggle('on');
function drawAv(c,x,y,a,t,mv){a=Object.assign({},DEF,a);const f=mv?(t/150|0)%2:0,b=mv&&f?-1:0,Q=[],sk=a.skin;
 const L=(id,tn,al)=>{for(const [X,Y,w,h,k] of PM[id]||[])Q.push([X,Y+(Y<-4?b:0),w,h,k==='s'?sk:k==='d'?shade(tn):k||tn,al||1])};
 L(a.bot,a.pc);L(a.shoe);L(a.top,a.tc);
 Q.push([-5,-20+b,10,8,sk,1],[-4,-17+b,2,3,'#161616',1],[2,-17+b,2,3,'#161616',1],[-4,-17+b,1,1,'#fff',1],[2,-17+b,1,1,'#fff',1],[-5,-14+b,2,1,'#ff8a8a',1],[3,-14+b,2,1,'#ff8a8a',1],[-1,-13+b,2,1,'#a8554a',1]);
 L(a.beard,a.bc,a.beard==='beard_01'?.45:1);L(a.hair,a.hc);L(a.hat,a.htc);L(a.gl);L(a.acc);
 c.globalAlpha=1;c.fillStyle='#0006';c.fillRect(x-6,y-1,12,2);
 c.fillStyle='#150a14';for(const [X,Y,w,h,k,al] of Q)if(al===1)c.fillRect(x+X-1,y+Y-1,w+2,h+2);
 for(const [X,Y,w,h,k,al] of Q){c.globalAlpha=al;c.fillStyle=k;c.fillRect(x+X,y+Y,w,h)}c.globalAlpha=1}
function drawCar(c,x,y,k){const F=(X,Y,w,h,q)=>{c.fillStyle=q;c.fillRect(x+X,y+Y,w,h)};F(-2,-1,22,2,'#0005');F(0,-5,20,4,k);F(4,-8,10,3,k);F(5,-7,3,2,'#9be8ff');F(10,-7,3,2,'#9be8ff');F(1,-2,4,3,'#111');F(14,-2,4,3,'#111');F(18,-4,2,1,'#ffe27a')}
function drawPet(c,x,y,k,cat){const F=(X,Y,w,h,q)=>{c.fillStyle=q;c.fillRect(x+X,y+Y,w,h)};F(-3,-1,7,1,'#0004');F(-3,-4,6,3,k);F(2,-6,3,3,k);F(2,-7,1,1,k);F(4,-7,1,1,k);F(-4,cat?-7:-5,1,cat?4:2,k);F(-3,-1,1,1,'#222');F(1,-1,1,1,'#222');F(4,-5,1,1,'#111')}
// ---- NPCs, boate e música (tudo sintetizado no navegador: sem arquivos, sem direitos autorais) ----
const R=(x,y,w,h,k)=>{cx.fillStyle=k;cx.fillRect(x,y,w,h)};
const ct=k=>x({enter:'club_enter',exit:'club_exit',door:'club_exit',now:'club_now',q:'club_q'}[k]);
function clubTxt(){PX.set($('en'),'note',ct('enter'),1);PX.set($('ex'),'back',ct('exit'),1);PX.set($('xd'),'door',ct('door'),1)}
function drawGuard(c,x,y){const F=(X,Y,w,h,k)=>{c.fillStyle=k;c.fillRect(x+X,y+Y,w,h)};
 F(-9,-1,18,2,'#0005');F(-5,-9,4,8,'#0c0c12');F(1,-9,4,8,'#0c0c12');F(-5,-2,4,2,'#000');F(1,-2,4,2,'#000');
 F(-8,-21,16,13,'#14141c');F(-8,-21,16,1,'#2a2a38');F(-1,-21,2,9,'#e8e8ff');F(-1,-20,2,1,'#111');
 F(-10,-20,3,10,'#14141c');F(7,-20,3,10,'#14141c');F(-7,-15,14,3,'#1c1c28');F(-10,-11,2,2,'#4a2c1a');F(8,-11,2,2,'#4a2c1a');
 F(-4,-29,8,8,'#4a2c1a');F(-4,-29,8,2,'#120a06');F(-4,-26,8,2,'#000');F(-3,-26,2,1,'#3a3a55');F(1,-26,2,1,'#3a3a55');F(4,-25,1,3,'#222')}
const DJAV={skin:SK[2],hair:'hair_01',hc:HCL[0],top:'top_02',tc:CLC[7],bot:'bot_04',pc:CLC[1],shoe:'shoe_01',gl:'gl_02'};
function drawDJ(c,x,y,t){const pb=NOW?((Date.now()-NOW.t0)/1000*TR[NOW.id].bpm/60)%1:0,b=pb<.2?-1:0,F=(X,Y,w,h,k)=>{c.fillStyle=k;c.fillRect(x+X,y+Y,w,h)};
 drawAv(c,x,y+b,DJAV,t,0);F(-5,-21+b,10,1,'#e8e8f0');F(-6,-18+b,1,4,'#e8e8f0');F(5,-18+b,1,4,'#e8e8f0')}
const GD={name:'SECURITY',x:102,y:190,tx:102,ty:190,px:0,py:0,mv:0,say:'',sayT:0,sc:'plaza',cool:0,i:-1,eq:{},av:DEF,col:'#ffd24a',hh:6,max:48,draw:(c,p)=>drawGuard(c,p.x,p.y)};
const DJ={name:'DJ',x:320,y:112,tx:320,ty:112,px:0,py:0,mv:0,say:'',sayT:0,sc:'club',eq:{},av:DEF,col:'#7ae0ff',draw:(c,p,t)=>drawDJ(c,p.x,p.y,t)};
const NPCS=[GD,DJ];
// música: 6 faixas originais geradas por código (sintetizador), sincronizadas pelo relógio
const TR=[{n:'Neon Drive',bpm:118,r:45,k:'x...x...x...x...',h:'..x...x...x...x.',s:'....x.......x...',b:'0 - 0 - -2 - -2 - -4 - -4 - -5 - -5 -',l:'12 - 15 - 19 - 15 - 17 - 14 - 12 - 10 -',w:'sawtooth'},
{n:'Midnight House',bpm:124,r:43,k:'x...x...x...x...',h:'x.x.x.x.x.x.x.x.',s:'....x.......x...',b:'0 - 0 0 - 0 - 0 3 - 3 3 - 3 - 3',l:'- - 12 - - - 15 - - - 12 - - - 10 -',w:'sawtooth'},
{n:'Pixel Funk',bpm:108,r:40,k:'x.....x...x.....',h:'x.xxx.xxx.xxx.xx',s:'....x.......x..x',b:'0 - - 3 - 5 - - 0 - - 7 - 5 3 -',l:'- 12 - - 15 - 12 - - 10 - - 12 - - -',w:'square'},
{n:'Sunset Disco',bpm:116,r:45,k:'x...x...x...x...',h:'.x.x.x.x.x.x.x.x',s:'....x.......x...',b:'0 12 0 12 3 15 3 15 5 17 5 17 7 19 7 19',l:'24 - 19 - 22 - 17 - 24 - 19 - 22 - 26 -',w:'sawtooth'},
{n:'Turbo Beat',bpm:128,r:41,k:'x...x...x...x...',h:'..x...x...x...x.',s:'....x.......x.x.',b:'0 0 - 0 0 - 0 - 0 0 - 0 0 - 12 -',l:'- - - - 12 - - 12 - - - - 15 - 14 -',w:'square'},
{n:'Chill Lounge',bpm:90,r:48,k:'x.......x.x.....',h:'x...x...x...x...',s:'........x.......',b:'0 - - - 5 - - - 3 - - - 7 - - -',l:'12 - - - 15 - 17 - - - 14 - 12 - - -',w:'triangle'}];
TR.forEach(x=>{x.b=x.b.split(' ').map(v=>v==='-'?null:+v);x.l=x.l.split(' ').map(v=>v==='-'?null:+v)});
const LEN=120;let AC=null,MG=null,NB=null,MUTE=false,NOW=null,QU=[],needSync=false,heard=false,lastP=0;
function ac(){if(!AC){AC=new(window.AudioContext||window.webkitAudioContext)();MG=AC.createGain();MG.gain.value=MUTE?0:.5;MG.connect(AC.destination);const n=AC.sampleRate>>1,b=AC.createBuffer(1,n,AC.sampleRate),d=b.getChannelData(0);for(let i=0;i<n;i++)d[i]=Math.random()*2-1;NB=b}if(AC.state==='suspended')AC.resume()}
const fq=m=>440*2**((m-69)/12);
function nt(f,t,d,ty,v,lp){const o=AC.createOscillator(),g=AC.createGain(),l=AC.createBiquadFilter();o.type=ty;o.frequency.value=f;l.type='lowpass';l.frequency.value=lp;g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(l);l.connect(g);g.connect(MG);o.start(t);o.stop(t+d)}
function kk(t){const o=AC.createOscillator(),g=AC.createGain();o.frequency.setValueAtTime(150,t);o.frequency.exponentialRampToValueAtTime(40,t+.12);g.gain.setValueAtTime(.9,t);g.gain.exponentialRampToValueAtTime(.001,t+.2);o.connect(g);g.connect(MG);o.start(t);o.stop(t+.2)}
function nz(t,d,hp,v){const s=AC.createBufferSource(),g=AC.createGain(),f=AC.createBiquadFilter();s.buffer=NB;f.type='highpass';f.frequency.value=hp;g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+d);s.connect(f);f.connect(g);g.connect(MG);s.start(t);s.stop(t+d)}
function stepAt(T,i,at,sd){if(T.k[i]==='x')kk(at);if(T.h[i]==='x')nz(at,.05,7000,.25);if(T.s[i]==='x'){nz(at,.14,1500,.5);nt(190,at,.1,'triangle',.3,1200)}
 if(T.b[i]!=null)nt(fq(T.r+T.b[i]),at,sd*1.8,T.w,.35,500);if(T.l[i]!=null)nt(fq(T.r+T.l[i]),at,sd*1.5,'square',.1,2500)}
function nextTrack(){const t0=NOW.t0+LEN*1000,n=QU.shift();NOW=n?{id:n.id,by:n.by,t0,k:null}:{id:(NOW.id+1)%TR.length,by:'DJ',t0,k:null}}
function sched(){if(!AC||!NOW||MUTE||SC!=='club')return;let n=0;while(Date.now()>NOW.t0+LEN*1000&&n++<20)nextTrack();
 const T=TR[NOW.id],sd=15/T.bpm,w=Date.now();if(NOW.k==null)NOW.k=Math.max(0,Math.ceil((w-NOW.t0)/1000/sd));
 for(;;){const tw=NOW.t0+NOW.k*sd*1000-Date.now();if(tw>300)break;if(tw>-50)stepAt(T,NOW.k%16,AC.currentTime+Math.max(0,tw)/1000,sd);NOW.k++}}
setInterval(sched,100);
function enqueue(id,by){if(!NOW||Date.now()>NOW.t0+LEN*1000)NOW={id,by,t0:Date.now(),k:null};else if(QU.length<5)QU.push({id,by})}
const DJP=200;
function pick(i){if(LIVE){toast(x('toast_dj'));return}if(Date.now()-lastP<5000)return toast(x('toast_wait'));
 $('rq').textContent=TR[i].n+' · '+usd(DJP)+'  ('+usd(prof.coins)+')';$('rp').textContent=x('dj_pay')+' '+usd(DJP);
 $('rp').onclick=()=>{if(prof.coins<DJP)return toast(t(24));prof.coins-=DJP;save();updHud();lastP=Date.now();enqueue(i,me.name);send('club',{k:'pick',id:i,by:me.name});$('m3').classList.remove('on')};$('m3').classList.add('on')}
$('rc').onclick=()=>$('m3').classList.remove('on');
function clubMsg(q){if(!q)return;if(q.k==='pick'&&TR[q.id])enqueue(+q.id,String(q.by).slice(0,16));
 else if(q.k==='hello'&&NOW&&SC==='club')setTimeout(()=>{if(!heard)send('club',{k:'state',n:NOW,q:QU})},Math.random()*1000);
 else if(q.k==='state'){heard=true;setTimeout(()=>heard=false,1500);if(needSync&&q.n&&TR[q.n.id]&&isFinite(+q.n.t0)){NOW={id:+q.n.id,by:String(q.n.by).slice(0,16),t0:+q.n.t0,k:null};QU=(q.q||[]).slice(0,5).filter(x=>TR[x.id]).map(x=>({id:+x.id,by:String(x.by).slice(0,16)}));needSync=false}}}
function setScene(s){SC=s;ZT=1;for(const k of ['cd','b0','b1'])$(k).style.display=s==='club'?'none':'';$('cs').style.display=(s==='club'&&CONFIG.clubBanner&&CONFIG.clubBanner.img)?'':'none';$('cp').style.display=s==='club'?'block':'none';$('xd').style.display=s==='club'?'':'none'}
const trk=()=>{if(rt)rt.track({name:me.name,av:me.av,x:me.x,y:me.y,sc:SC})};
TR.forEach((x,i)=>{const b=document.createElement('button');PX.set(b,'note',x.n,1);b.onclick=()=>pick(i);$('tl').append(b)});
$('en').onclick=()=>{if(!me)return;ac();me.sc='club';me.x=me.tx=320;me.y=me.ty=300;setScene('club');trk();needSync=true;send('club',{k:'hello'});setTimeout(()=>{if(needSync){needSync=false;if(!NOW)NOW={id:0,by:'DJ',t0:Date.now(),k:null}}},1500)};
$('ex').onclick=()=>{me.sc='plaza';me.x=me.tx=533;me.y=me.ty=198;setScene('plaza');trk()};
$('xd').onclick=$('ex').onclick;
$('mt').onclick=()=>{MUTE=!MUTE;PX.set($('mt'),MUTE?'mute':'sound',null,2);if(MG)MG.gain.value=MUTE?0:.5};
PX.set($('mt'),'sound',null,2);
setInterval(()=>{if(SC==='club')$('np').textContent=(NOW?ct('now')+': '+TR[NOW.id].n+' · '+NOW.by:'')+(QU.length?'  |  '+ct('q')+': '+QU.length:'')},500);
// ---- jogadores ----
const P=new Map();let me=null,rt=null,lastS=0,SC='plaza',Z=1,ZT=1,CX0=0,CY0=0,TP={n:'',v:0};const tot={};
function mk(id,name,av,x,y){return{id,name,av:Object.assign({},DEF,av),x,y,tx:x,ty:y,px:x+12,py:y,mv:0,say:'',sayT:0,sc:'',eq:{},col:rnd(['#ff7ae0','#7ae0ff','#ffe27a','#9aff9a'])}}
const go=(p,x,y)=>{const c=p.sc==='club';p.tx=cl(x,c?80:10,c?560:630);p.ty=cl(y,c?150:192,c?335:350)};
function step(p,dt){const dx=p.tx-p.x,dy=p.ty-p.y,d=Math.hypot(dx,dy);if(d>1){const k=Math.min(1,84*dt/d);p.x+=dx*k;p.y+=dy*k;p.mv=1}else p.mv=0;const q=Math.min(1,dt*5);p.px+=(p.x+12-p.px)*q;p.py+=(p.y-p.py)*q}
function loop(t){const dt=Math.min(.05,(t-loop.l)/1000||0);loop.l=t;if(me&&SC==='plaza'&&t>GD.cool&&Math.hypot(me.x-GD.x,me.y-GD.y)<46){GD.cool=t+7000;GD.i++;const a=['g1','g2','g3','g4'].map(x);GD.say=a[GD.i<1?0:1+(GD.i-1)%(a.length-1)];GD.sayT=t+4500}
 $('en').style.display=(me&&SC==='plaza'&&Math.hypot(me.x-533,me.y-192)<52)?'':'none';
 Z+=(ZT-Z)*Math.min(1,dt*8);const vw=W/Z,vh=H/Z,x0=me?cl(me.x-vw/2,0,W-vw):0,y0=me?cl(me.y-14-vh/2,0,H-vh):0;CX0=x0;CY0=y0;
 $('ov').style.transform=`scale(${Z}) translate(${-x0/W*100}%,${-y0/H*100}%)`;cx.setTransform(2*Z,0,0,2*Z,-x0*2*Z,-y0*2*Z);cx.imageSmoothingEnabled=false;if(SC==='club')drawClub(t);else drawWorld(t)
 const L=[...P.values(),...NPCS].filter(p=>(p.sc||'plaza')===SC);for(const p of L)step(p,dt);L.sort((a,b)=>a.y-b.y);
 for(const p of L){const e=p.eq||{},it=k=>ITEMS.find(i=>i.id===e[k]),a=it('aura'),c=it('car'),q=it('pet');
  if(a){cx.strokeStyle=a.c;cx.globalAlpha=.5+.3*Math.sin(t/200);cx.lineWidth=1;cx.beginPath();cx.ellipse(p.x,p.y-1,10,3,0,0,7);cx.stroke();cx.globalAlpha=1}
  drawObj(p,dt,t,it);if(p.draw)p.draw(cx,p,t);else drawAv(cx,p.x,p.y,p.av,t,p.mv)}
 if(SC==='club'&&CL.naturalWidth)cx.drawImage(CL,545,205,195,80,272.5,102.5,97.5,40);if(SC==='plaza'){if(TP.av)drawAv(cx,320,52,TP.av,t,0);light()}cx.font='5px PS2P,monospace';cx.textAlign='center';cx.lineJoin='round';if(SC==='plaza')roofLabel();
 for(const p of L){cx.lineWidth=2;cx.strokeStyle='#000';cx.fillStyle=p.col;const ny=p.y-24-(p.hh||0);cx.strokeText(p.name,p.x,ny);cx.fillText(p.name,p.x,ny);
  if(p.say&&t<p.sayT){const ic=(p.say.match(/:[a-z0-9_]+:/g)||[]).map(k=>k.slice(1,-1)).filter(k=>PX.EMOJI.includes(k)),tx=p.say.replace(/:[a-z0-9_]+:/g,'').trim(),s=tx.length>(p.max||28)?tx.slice(0,(p.max||28)-1)+'…':tx,tw=s?cx.measureText(s).width:0,iw=ic.length*9,w=tw+iw+6+(tw&&iw?3:0);cx.fillStyle=p.sc||'#fff';cx.fillRect(p.x-w/2,ny-16,w,10);let X=p.x-w/2+3;for(const k of ic){const im=PX.cv(k,1);if(im)cx.drawImage(im,Math.round(X),ny-15,im.width/2,im.height/2);X+=9}cx.fillStyle='#111';if(s)cx.fillText(s,X+(iw?3:0)+tw/2,ny-8)}}
 fxFrame(t);requestAnimationFrame(loop)}
// ---- chat ----
const ms=$('ms');
const msgNodes=tx=>String(tx).split(/(:[a-z0-9_]+:)/).map(s=>{const n=s.slice(1,-1);return /^:[a-z0-9_]+:$/.test(s)&&PX.EMOJI.includes(n)?PX.el(n,2):document.createTextNode(s)});
function addMsg(n,tx,tier,col){const d=document.createElement('div'),b=document.createElement('b');b.textContent=n+': ';b.style.color=tier?'#111':col;d.append(b,...msgNodes(tx));if(tier){d.className='sc';d.style.background=TC[tier]}ms.append(d);while(ms.children.length>60)ms.firstChild.remove();ms.scrollTop=ms.scrollHeight}
function roofLabel(){const s=TP.n?TP.n+' · '+TP.v:t(30),y=TP.av?22:46,w=cx.measureText(s).width,cr=PX.cv('crown',1),co=PX.cv('coin',1);cx.lineWidth=2;cx.strokeStyle='#000';cx.fillStyle='#ffd24a';cx.strokeText(s,320,y);cx.fillText(s,320,y);if(cr)cx.drawImage(cr,Math.round(320-w/2-cr.width-3),y-7);if(TP.n&&co)cx.drawImage(co,Math.round(320+w/2+3),y-7)}
function say(p,tx,tier){p.say=tx;p.sayT=performance.now()+DUR[tier];p.sc=tier?TC[tier]:'';addMsg(p.name,tx,tier,p.col);if(tier){tot[p.name]=(tot[p.name]||0)+tier;if(tot[p.name]>TP.v){TP={n:p.name,v:tot[p.name],av:p.av}}}}
function updHud(){PX.set($('on'),'dot',x('h_online')+': '+P.size,2);$('co').textContent=LIVE?'':usd(prof.coins);const T_=TIERS.find(x=>x.id===prof.tier)||TIERS[0];PX.set($('pk'),T_.ic,T_.n,1)}
$('tr').disabled=LIVE;
$('f').onsubmit=e=>{e.preventDefault();if(!me)return;const v=$('i').value.trim().slice(0,120),tier=LIVE?0:+$('tr').value,n=Date.now();if(!v||n-lastS<1000)return;if(RANK()===0&&!PX.isEmojiMsg(v)){packs(false);return}
 if(tier&&prof.coins<tier)return toast(t(24));if(tier){prof.coins-=tier;save()}lastS=n;$('i').value='';say(me,v,tier);send('chat',{id:me.id,text:v});updHud()};
// ---- rede (Supabase Realtime: Broadcast p/ mover e falar, Presence p/ entrar/sair) ----
const send=(ev,payload)=>{if(rt)rt.send({type:'broadcast',event:ev,payload})};
function join(){const sb=supabase.createClient(CONFIG.SUPABASE_URL,CONFIG.SUPABASE_ANON_KEY);rt=sb.channel('world',{config:{presence:{key:me.id}}});
 rt.on('broadcast',{event:'move'},({payload:q})=>{const p=P.get(q.id);if(p&&p!==me){p.x=+q.x||p.x;p.y=+q.y||p.y;go(p,+q.tx,+q.ty)}})
 .on('broadcast',{event:'club'},({payload:q})=>clubMsg(q))
 .on('broadcast',{event:'chat'},({payload:q})=>{const p=P.get(q.id);if(p&&p!==me)say(p,String(q.text).slice(0,120),0)})
 .on('presence',{event:'sync'},()=>{const s=rt.presenceState();for(const k in s){if(k===me.id)continue;const m=s[k][0];if(P.has(k)){P.get(k).sc=m.sc==='club'?'club':'plaza';continue}const np=mk(k,String(m.name).slice(0,16),m.av,+m.x||320,+m.y||300);np.sc=m.sc==='club'?'club':'plaza';P.set(k,np)}for(const k of [...P.keys()])if(k!==me.id&&!s[k])P.delete(k);updHud()})
 .subscribe(st=>{if(st==='SUBSCRIBED')trk()})}
cv.addEventListener('pointerdown',e=>{if(!me)return;const b=cv.getBoundingClientRect();const wx=CX0+(e.clientX-b.left)/b.width*W/Z,wy=CY0+(e.clientY-b.top)/b.height*H/Z;if(SC==='club'&&wx>300&&wx<342&&wy>310&&wy<356){$('ex').onclick();return}go(me,wx,wy);send('move',{id:me.id,x:me.x,y:me.y,tx:me.tx,ty:me.ty})});
cv.addEventListener('wheel',e=>{e.preventDefault();ZT=cl(ZT*(e.deltaY<0?1.2:1/1.2),1,3)},{passive:false});
function start(){if(!me){me=mk(LIVE?crypto.randomUUID():'me',prof.name,prof.av,320,300);me.eq=prof.eq;me.col='#ffffff';P.set(me.id,me);if(LIVE)join()}
 else{me.name=prof.name;me.av=Object.assign({},DEF,prof.av);if(rt)trk()}updHud()}
if(!LIVE){['mike7','kaito','ghostfps','vini.exe','breno_77','starboy','luanx'].forEach((n,i)=>P.set('bot'+i,mk('bot'+i,n,rav(),40+Math.random()*560,250+Math.random()*95)));
 setInterval(()=>{for(const p of P.values())if(p.id.startsWith('bot')){if(Math.random()<.4)go(p,Math.random()*640,246+Math.random()*100);if(Math.random()<.18)say(p,rnd(LN),Math.random()<.12?rnd([100,250,500]):0)}},3000)}
// ---- pacotes: FREE / Vice Citizen US$1 / Vice Gangster US$5 / Vice Boss US$10 (visual pronto; o pagamento entra depois pela Stripe) ----
const PAY_READY=false; // vira true quando a função create-checkout estiver ligada
const TIERS=[{id:'free',n:'FREE',pr:0,ic:'ticket',c:'#8a8a95',sub:'sub_free',perks:['pf1','pf2','pf3']},
{id:'citizen',n:'Vice Citizen',pr:100,ic:'city',c:'#46e0ff',sub:'sub_cit',perks:['pc1','pc2','pc3']},
{id:'gangster',n:'Vice Gangster',pr:500,ic:'shades',c:'#ff4fd8',sub:'sub_gang',tag:'tag_best',perks:['pc1','pg2']}]; // Vice Boss removido
const RK={free:0,citizen:1,gangster:2},RANK=()=>RK[prof.tier]||0;
const catOf=id=>{for(const k in S)if(S[k].some(x=>x[0]===id))return k;const i=ITEMS.find(x=>x.id===id);return i&&i.t};
function chatMode(){const f=RANK()===0;$('i').readOnly=f;$('i').placeholder=f?x('c_emoji'):t(5);$('tr').disabled=LIVE||f}
// Vice Citizen: sorteia n conjuntos premium ainda nao possuidos (Fisher-Yates, chance igual, sem repeticao). Chances declaradas em termos.md (clausula 6).
function drawSets(n){const pool=LOOKS.filter(l=>isPrem(l)&&!prof.sets.includes(l[0]));for(let i=pool.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[pool[i],pool[j]]=[pool[j],pool[i]]}const got=pool.slice(0,n).map(l=>l[0]);prof.sets.push(...got);return got.length}
function grantTier(id){const T=TIERS.find(x=>x.id===id);let c=0;if(id==='citizen'&&!prof.drawn){c=drawSets(5);prof.drawn=1}if(id==='gangster')prof.all=true;prof.tier=id;save();updHud();chatMode();toast(T.n+(c?' · '+c+' '+x('toast_sets'):' '+x('toast_unl')))}
async function startCheckout(id){/* STRIPE: chamar a Edge Function create-checkout com {tier:id} e redirecionar para a URL devolvida; o webhook libera o pacote no servidor */throw new Error('not wired')}
let PKF=false;
function packsClose(){$('m4').classList.remove('on');if(PKF){PKF=false;openAv()}}
const DEV=!LIVE&&/[?&]dev=1/.test(location.search); // so no modo DEMO com &dev=1 os botoes simulam a compra (teste); sem isso ficam "em breve"
const VIT_ART={skin:true,pet:false,car:false,statue:false}; // false = moldura com "em breve" na vitrine ate a arte final existir
async function buyTier(id){if(id==='free'){packsClose();return}
 if(DEV){grantTier(id);packsClose();return}
 if(LIVE&&PAY_READY){try{await startCheckout(id)}catch(e){toast(x('toast_pay'))}return}
 toast(x('toast_soon'))}
// vitrine do card: miniaturas por categoria; so aparece o que o pacote inclui (pacote maior mostra mais)
function vitrine(T){const w=document.createElement('div');w.className='vt';
 const frame=(cat,id,q)=>{const f=document.createElement('div');f.className='vf'+(q?' q':'');if(q)f.textContent='?';else if(VIT_ART[cat]&&PX.ALL[id]){f.className='vf art';f.append(PX.el(id,1))}return f};
 const grp=(ic,title,thumbs,note)=>{const gp=document.createElement('div');gp.className='vg';const h=document.createElement('div');h.className='vh';h.append(PX.el(ic,1),' '+x(title));if(note){const n=document.createElement('em');n.textContent=x(note);h.append(n)}const r=document.createElement('div');r.className='vr';thumbs.forEach(x=>r.append(x));gp.append(r);gp.prepend(h);w.append(gp)};
 const looks=f=>LOOKS.filter(f).map(l=>{const c=mini(Object.assign({},DEF,l[1]));c.className='vm';return c});
 const ids=cat=>ITEMS.filter(i=>i.t===cat).map(i=>i.id),soon=cat=>VIT_ART[cat]?'':'v_soon';
 if(T.id==='free')grp('hair','v_skins',looks(l=>!isPrem(l)));
 else if(T.id==='citizen'){grp('hair','v_skins5',[0,1,2,3,4].map(()=>frame('skin',null,1)),'v_draw');grp('cart2','v_car1',[frame('car',null,1)],soon('car'));grp('statue','v_stat1',[frame('statue',null,1)],soon('statue'))}
 else{grp('hair','v_skins',looks(()=>true));grp('paw','v_pets',ids('pet').map(i=>frame('pet',i)),soon('pet'));grp('cart2','v_cars',ids('car').map(i=>frame('car',i)),soon('car'));grp('statue','v_stats',ids('statue').map(i=>frame('statue',i)),soon('statue'))}
 return w}
function packs(first){PKF=!!first;const g=$('pg');g.innerHTML='';const cur=TIERS.find(x=>x.id===prof.tier)||TIERS[0];
 TIERS.forEach((T,i)=>{const c=document.createElement('div');c.className='pc '+T.id+(T.tag?' hot':'');c.style.setProperty('--c',T.c);c.style.setProperty('--i',i);
  const add=(tag,tx,cls)=>{const e=document.createElement(tag);if(cls)e.className=cls;e.textContent=tx;c.append(e);return e};
  if(T.tag)add('span',x(T.tag),'tg');const ic=document.createElement('div');ic.className='ic';ic.append(PX.el(T.ic,4));c.append(ic);add('h4',T.n);add('small',x(T.sub));
  const up=Math.max(0,T.pr-cur.pr);add('div',T.pr?usd(T.pr):'FREE','pr');
  const ul=document.createElement('ul');T.perks.forEach(p=>{const li=document.createElement('li');li.textContent=x(p);ul.append(li)});c.append(ul);c.append(vitrine(T));
  const b=document.createElement('button'),own=RK[T.id]===RANK(),low=RK[T.id]<RANK();
  if(!T.pr){b.textContent=own?x('b_enter'):x('b_inc');b.disabled=!own}
  else if(own)PX.set(b,'check',x('b_own'),1);else if(low){b.textContent=x('b_inc');b.disabled=true}
  else{b.textContent=DEV?'DEV · '+usd(up):x('b_soon');b.disabled=!DEV}
  if(own&&T.pr)b.disabled=true;b.onclick=()=>buyTier(T.id);c.append(b);g.append(c)});
 $('m4').classList.add('on')}
$('pk').onclick=()=>packs(false);$('pcl').onclick=packsClose;$('i').onclick=()=>{if(RANK()===0)packs(false)};
// ---- avatar e loja ----
let draft,tab='lk',ROT=false,hg='m';
const OWNP=()=>{const s=new Set();for(const l of LOOKS)if(prof.sets.includes(l[0]))lookParts(l).forEach(i=>s.add(i));return s}; // pecas liberadas pelos conjuntos sorteados
const OWN=id=>!PRICE[id]||prof.all||prof.inv.includes(id)||OWNP().has(id);
const ownLook=l=>!isPrem(l)||prof.all||prof.sets.includes(l[0]);
const need=()=>['hair','beard','top','bot','shoe','hat','gl','acc'].map(k=>draft[k]).filter(id=>!OWN(id));
const TABS=[['lk','sparkle','t_lk'],['hair','hair','t_hair'],['beard','beard','t_beard'],['top','shirt','t_top'],['bot','pants','t_bot'],['shoe','shoe','t_shoe'],['hat','hat','t_hat'],['gl','glasses','t_gl'],['acc','chain','t_acc'],['skin','palette','t_skin']];
const TINT={hair:['hc',HCL],beard:['bc',HCL],top:['tc',CLC],bot:['pc',CLC],hat:['htc',CLC]};
const mini=d=>{const e=document.createElement('canvas');e.width=40;e.height=56;const c=e.getContext('2d');c.setTransform(2,0,0,2,0,0);drawAv(c,10,27,d,0,0);return e};
const mkb=(cls,fn)=>{const b=document.createElement('button');b.className=cls;b.onclick=fn;return b};
function editor(){
 const tb=$('tb');tb.innerHTML='';for(const [k,ic,l] of TABS){const b=mkb('ch'+(tab===k?' on':''),()=>{tab=k;editor()});b.append(PX.el(ic,3));b.title=x(l);tb.append(b)}
 const cc=$('cc');cc.innerHTML='';
 if(TINT[tab]){const [key,pal]=TINT[tab];pal.forEach(v=>{const b=mkb('sw'+(draft[key]===v?' on':''),()=>{draft[key]=v;editor()});b.style.background=v;cc.append(b)})}
 cc.parentElement.style.visibility=cc.children.length?'visible':'hidden';const gr=$('gr');gr.innerHTML='';
 const lockTag=(s,ok)=>{if(!ok)s.prepend(PX.el('lock',1),' ')};
 if(tab==='lk')LOOKS.forEach(l=>{const [n,o]=l,d=Object.assign({},DEF,o,{skin:draft.skin}),ok=ownLook(l),b=mkb('cd'+(ok?'':' lk'),()=>{if(!ok)return toast(x('e_lock'));draft=d;editor()}),s=document.createElement('small');s.textContent=n;lockTag(s,ok);b.append(mini(d),s);gr.append(b)});
 else if(tab==='skin')SK.forEach(v=>{const b=mkb('sw'+(draft.skin===v?' on':''),()=>{draft.skin=v;editor()});b.style.background=v;gr.append(b)});
 else{let list=S[tab];if(tab==='hair'){const sub=document.createElement('div');sub.className='sub';for(const [k,lb] of [['m','e_male'],['f','e_female']]){const b=mkb('ch'+(hg===k?' on':''),()=>{hg=k;editor()});b.textContent=x(lb);sub.append(b)}gr.append(sub);list=list.filter(x=>x[4]==='u'||x[4]===hg)}
  list.forEach(([id,n])=>{const ok=OWN(id),b=mkb('cd'+(draft[tab]===id?' on':'')+(ok?'':' lk'),()=>{if(!ok)return toast(x('e_lock'));draft[tab]=id;editor()}),s=document.createElement('small');s.textContent=n;lockTag(s,ok);b.append(mini(Object.assign({},draft,{[tab]:id})),s);gr.append(b)})}
 const ft=$('ft');ft.innerHTML='';if(!prof.all){const b=mkb('',()=>packs(false));PX.set(b,'ticket',x('e_get'),1);ft.append(b)}
 const c=$('pv').getContext('2d');c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,168,224);c.setTransform(ROT?-7:7,0,0,7,84,0);drawAv(c,0,31,draft,0,0)}
function openAv(){draft=Object.assign({},DEF,prof.av);const h=S.hair.find(x=>x[0]===draft.hair);if(h&&h[4]!=='u')hg=h[4];$('nm').value=prof.name;$('m1').classList.add('on');editor()}
$('ba').onclick=openAv;$('rt').onclick=()=>{ROT=!ROT;editor()};$('bk').onclick=()=>{$('m1').classList.remove('on');if(!prof.ok)packs(true)};
$('go').onclick=()=>{const n=$('nm').value.trim().slice(0,16);if(!n)return toast(t(25));if(need().length)return toast(x('e_locked_sel'));prof.name=n;prof.av=Object.assign({},draft);prof.ok=1;save();$('m1').classList.remove('on');start()};
// loja = inventario: pets/carros/estatuas/auras. Itens vem dos pacotes (Citizen: 1 carro + 1 estatua a escolha; Gangster: tudo). Compra real fica para o Stripe.
let stab='pet';
const OWNI=id=>prof.all||prof.inv.includes(id);
const SHOP_T=[['pet','paw','v_pets'],['car','cart2','v_cars'],['statue','statue','v_stats'],['aura','aura','v_auras']],citizenCat=c=>c==='car'||c==='statue';
function shop(){
 const l=$('sl');l.innerHTML='';$('bc').style.display='none';$('sn').textContent='';
 const T_=TIERS.find(x=>x.id===prof.tier)||TIERS[0],h=document.createElement('div');h.className='r';const bal=document.createElement('b');bal.textContent=T_.n;const pb=mkb('',()=>{$('m2').classList.remove('on');packs(false)});PX.set(pb,'ticket',x('s_packs'),1);h.append(bal,pb);l.append(h);
 const tb=document.createElement('div');for(const [k,ic,lb] of SHOP_T){const b=mkb('ch'+(stab===k?' on':''),()=>{stab=k;shop()});PX.set(b,ic,x(lb),2);tb.append(b)}l.append(tb);
 for(const it of ITEMS.filter(i=>i.t===stab)){const own=OWNI(it.id),on=prof.eq[it.t]===it.id,r=document.createElement('div');r.className='r';const s=document.createElement('span');s.append(PX.el(PX.ALL[it.id]?it.id:'aura',2),' '+it.n);let b;
  if(own){b=mkb('',()=>{prof.eq[it.t]=on?null:it.id;save();shop()});b.textContent=on?t(23):t(22)}
  else if(prof.tier==='citizen'&&citizenCat(it.t)&&!prof.claims[it.t]){b=mkb('',()=>{prof.claims[it.t]=it.id;prof.inv.push(it.id);prof.eq[it.t]=it.id;save();shop()});PX.set(b,'gift',x('s_pick'),1)}
  else{b=mkb('',()=>{$('m2').classList.remove('on');packs(false)});PX.set(b,'lock',citizenCat(it.t)&&RANK()===0?'CITIZEN+':'GANGSTER',1)}
  r.append(s,b);l.append(r)}}
$('bs').onclick=()=>{shop();$('m2').classList.add('on')};$('x2').onclick=()=>$('m2').classList.remove('on');
// objetos (carros, estátuas) ficam parados ao lado e SOMEM com fumaça quando o jogador anda; animais acompanham
function drawObj(p,dt,t,it){const pet=it('pet');if(pet){const s=PX.cv(pet.id,1);if(s){const w=s.width,h=s.height,k=p.mv?Math.abs(Math.sin(t/110)):0,pl=1+.05*Math.sin(t/260+p.px);cx.fillStyle='#0004';cx.fillRect(Math.round(p.px-w/2)+1,Math.round(p.py)-1,w-2,1);cx.save();cx.translate(Math.round(p.px),Math.round(p.py-k*2));cx.scale(1,pl);cx.drawImage(s,-(w>>1),-h);cx.restore()}} // pets: pulsam e saltitam por codigo (sem animacao paga)
 const o=[it('car'),it('statue')].filter(Boolean);p.still=p.mv?0:(p.still||0)+dt;const g=p.still>.8?1:0;p.al=(p.al||0)+(g-(p.al||0))*Math.min(1,dt*6);if(g){p.ix=p.x;p.iy=p.y}
 if(p.al>.02&&o.length&&p.ix!=null){cx.globalAlpha=p.al;o.forEach((q,i)=>{const sc=.7+.3*p.al;cx.save();cx.translate(p.ix+(i?24:-26),p.iy-2);cx.scale(sc,sc);const s=PX.cv(q.id,1);if(s)cx.drawImage(s,-(s.width>>1),-s.height);cx.restore()});
  if(p.al<.9)for(let i=0;i<6;i++){const a=i*1.05+t/300,r=(1-p.al)*14;cx.globalAlpha=(1-p.al)*.8;cx.fillStyle='#fff';cx.beginPath();cx.arc(p.ix-26+Math.cos(a)*r,p.iy-6+Math.sin(a)*r,2.2,0,7);cx.fill()}cx.globalAlpha=1}}
// ---- contagem, banners, layout ----
// Desbloqueio: meia-noite LOCAL de 19/11; EUA e Canadá usam um horário único (meia-noite Eastern = 05:00 UTC)
const US=/^(America\/(New_York|Chicago|Denver|Phoenix|Los_Angeles|Anchorage|Detroit|Boise|Juneau|Sitka|Nome|Adak|Menominee|Indiana\/.+|Kentucky\/.+|North_Dakota\/.+|Toronto|Vancouver|Edmonton|Winnipeg|Halifax|St_Johns|Regina|Montreal|Moncton|Glace_Bay|Goose_Bay|Whitehorse|Yellowknife|Iqaluit|Thunder_Bay|Nipigon|Rainy_River)|US\/.+|Canada\/.+|Pacific\/Honolulu)$/;
const T=US.test(Intl.DateTimeFormat().resolvedOptions().timeZone)?new Date('2026-11-19T00:00:00-05:00'):new Date(2026,10,19,0,0,0);
function tick(){const s=Math.max(0,(T-Date.now())/1000|0),p=n=>String(n).padStart(2,'0');$('tm').textContent=s?(s>=86400?(s/86400|0)+t(34)+' ':'')+p((s%86400)/3600|0)+':'+p((s%3600)/60|0)+':'+p(s%60):t(28)}
setInterval(tick,500);tick();
// Zonas x,y,largura,altura em unidades lógicas 640x360 (= pixels da imagem 2560x1440 ÷ 4). Ajuste ao trocar o cenário.
const PL={cs:[463,32,57,54],en:[500,139,64,14],xd:[298,297,50,14],cd:[267,62,105,48],b0:[64,130,73,20],b1:[490,116,82,20]};
function lay(){for(const k in PL){const [x,y,w,h]=PL[k];Object.assign($(k).style,{left:x/W*100+'%',top:y/H*100+'%',width:w/W*100+'%',height:h/H*100+'%'})}document.documentElement.style.setProperty('--u',cv.clientWidth/W+'px')}
addEventListener('resize',lay);lay();
CONFIG.banners.forEach((b,i)=>{if(b&&b.img){const e=$('b'+i),a=document.createElement('a'),im=new Image();im.src=b.img;im.alt='Sponsor';a.href=b.link||'#';a.target='_blank';a.rel='noopener sponsored';a.append(im);e.textContent='';e.append(a)}});
function applyLang(){document.documentElement.lang=prof.lang;document.querySelectorAll('[data-i]').forEach(e=>e.textContent=t(+e.dataset.i));document.querySelectorAll('[data-p]').forEach(e=>e.placeholder=t(+e.dataset.p));document.querySelectorAll('[data-x]').forEach(e=>e.textContent=x(e.dataset.x));if(draft)editor();tick();clubTxt();chatMode();if(READY){updHud();if($('m4').classList.contains('on'))packs(PKF);if($('m2').classList.contains('on'))shop();if(TERMS_OPEN)renderTerms()}}
const lg=$('lg');LGN.forEach(([c,n])=>{const o=document.createElement('option');o.value=c;o.textContent=n;lg.append(o)});lg.value=prof.lang;lg.onchange=()=>{prof.lang=lg.value;save();applyLang()};
applyLang();
// ---- efeitos de tela: desfoque de movimento leve + aberração cromática leve (WebGL; desliga sozinho se o jogo ficar lento) ----
const FX={on:false,gl:null,i:0,n:0,s:16,slow:0,t:0};
function fxInit(){try{const c=$('fx'),gl=c.getContext('webgl',{alpha:false,antialias:false});if(!gl)return;c.width=cv.width;c.height=cv.height;
 const sh=(ty,s)=>{const o=gl.createShader(ty);gl.shaderSource(o,s);gl.compileShader(o);if(!gl.getShaderParameter(o,gl.COMPILE_STATUS))throw 0;return o},pr=gl.createProgram();
 gl.attachShader(pr,sh(gl.VERTEX_SHADER,'attribute vec2 p;varying vec2 v;void main(){v=vec2(p.x*.5+.5,.5-p.y*.5);gl_Position=vec4(p,0.,1.);}'));
 gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,'precision mediump float;uniform sampler2D a,b;varying vec2 v;void main(){vec2 d=v-.5;float k=dot(d,d);vec2 o=d*(.0016+.005*k);vec3 c=vec3(texture2D(a,v+o).r,texture2D(a,v).g,texture2D(a,v-o).b);gl_FragColor=vec4(mix(c,texture2D(b,v).rgb,.2),1.);}'));
 gl.linkProgram(pr);gl.useProgram(pr);const bf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,bf);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);const lc=gl.getAttribLocation(pr,'p');gl.enableVertexAttribArray(lc);gl.vertexAttribPointer(lc,2,gl.FLOAT,false,0,0);
 FX.tx=[0,1].map(()=>{const x=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,x);for(const [k,v] of [[gl.TEXTURE_MIN_FILTER,gl.NEAREST],[gl.TEXTURE_MAG_FILTER,gl.NEAREST],[gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE],[gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE]])gl.texParameteri(gl.TEXTURE_2D,k,v);return x});
 gl.uniform1i(gl.getUniformLocation(pr,'a'),0);gl.uniform1i(gl.getUniformLocation(pr,'b'),1);FX.gl=gl}catch(e){FX.gl=null}}
function setFx(on){FX.on=!!(on&&FX.gl);$('fx').style.display=FX.on?'block':'none';FX.n=0;FX.slow=0;try{localStorage.nco_fx=on?'1':'0'}catch(e){}}
function fxFrame(t){if(!FX.on)return;const g=FX.gl,d=t-FX.t;FX.t=t;FX.s=FX.s*.95+Math.min(d,100)*.05;if(FX.s>34){if(++FX.slow>180)return setFx(false)}else FX.slow=0;
 const cur=FX.tx[FX.i],pv=FX.tx[1-FX.i];g.activeTexture(g.TEXTURE0);g.bindTexture(g.TEXTURE_2D,cur);g.texImage2D(g.TEXTURE_2D,0,g.RGB,g.RGB,g.UNSIGNED_BYTE,cv);
 g.activeTexture(g.TEXTURE1);g.bindTexture(g.TEXTURE_2D,FX.n?pv:cur);g.viewport(0,0,$('fx').width,$('fx').height);g.drawArrays(g.TRIANGLE_STRIP,0,4);FX.i=1-FX.i;FX.n=1}
fxInit();setFx((()=>{try{return localStorage.nco_fx!=='0'}catch(e){return true}})()&&!/[?&]fx=0/.test(location.search));
requestAnimationFrame(loop);
// ---- termos de uso (clickwrap): texto em termos.md (gerado em js/termos.js). TODO(JURIDICO): revisar antes do lancamento ----
function mdRender(el,md){const bold=(p,s)=>s.split(/\*\*(.+?)\*\*/).forEach((x,i)=>{if(!x)return;if(i%2){const b=document.createElement('b');b.textContent=x;p.append(b)}else p.append(document.createTextNode(x.replace(/\*(.+?)\*/g,'$1')))});
 md.replace(/<!--[\s\S]*?-->/g,'').split('\n').forEach(l=>{l=l.trim();if(!l)return;const m=/^(#{1,2})\s+(.*)$/.exec(l),e=document.createElement(m?(m[1]==='#'?'h3':'h4'):'p');bold(e,m?m[2]:l);el.append(e)})}
var TERMS_OPEN=false;
function renderTerms(){const k=prof.lang==='pt'?'pt':'en',tx=$('tx');tx.textContent='';mdRender(tx,TERMOS_MD[k]);if(k!==prof.lang){const n=document.createElement('p');n.className='tn';n.textContent=x('terms_note');tx.prepend(n)}else if(k==='pt'){const n=document.createElement('p');n.className='tn';n.textContent=x('terms_note');tx.prepend(n)}
 $('tol').textContent=x('terms_chk');$('tdt').textContent=x('terms_ver')+' '+TERMOS_VERSION}
function termsGate(cb){if(prof.terms&&prof.terms.v===TERMOS_VERSION)return cb();
 const m=$('m5'),ck=$('tok'),gb=$('tgo');TERMS_OPEN=true;renderTerms();
 ck.checked=false;gb.disabled=true;ck.onchange=()=>{gb.disabled=!ck.checked};
 gb.onclick=()=>{if(!ck.checked)return;prof.terms={v:TERMOS_VERSION,at:new Date().toISOString()};save();TERMS_OPEN=false;m.classList.remove('on');cb()};m.classList.add('on')}
READY=true;updHud();PX.scan();
termsGate(()=>{if(prof.ok&&prof.name)start();else packs(true)});
