const W=640,H=360,$=i=>document.getElementById(i),rnd=a=>a[Math.random()*a.length|0],cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const LIVE=!!(CONFIG.SUPABASE_URL&&window.supabase)&&!/[?&]demo=1/.test(location.search),cv=$('c'),cx=cv.getContext('2d');cv.width=1280;cv.height=720;
const SKY=['#1a0b3b','#2b0f55','#40136b','#5a1a7a','#7a2288','#a02f93','#c93d95','#e84d93','#ff6a8a','#ff8a7a','#ffab70','#ffc880'];
const SKIN=['#f1c9a5','#d9a273','#a8704a','#6b4328'],HC=['#1a1a1a','#5a3a1a','#e8c14a','#ff4fd8','#46e0ff'],SH=['#ff4fd8','#46e0ff','#ffd24a','#7aff9a','#e8e8ff'],PN=['#2b2b55','#1a1a1a','#5a3a1a','#3a6a9a'];
// ---- personagem chibi: peças desenhadas por retângulos (trocáveis por sprites do GPT depois) ----
const SK=['#ffdfc4','#f1c9a5','#e0ac7e','#c68642','#a8704a','#8d5524','#6b4328','#4a2c1a'];
const HCL=['#161616','#4a2c1a','#7a4a24','#e8c14a','#c8501e','#dddddd','#ff4fd8','#46e0ff','#7aff9a','#8a4fff'];
const CLC=['#f4f4f4','#1a1a1a','#d9322e','#2e6fd9','#f2c230','#2e9a5a','#ff7ac8','#8a4fff','#f2822e','#8a8a95'];
// [id, nome, preço em centavos de dólar (0 = grátis), retângulos [x,y,w,h,cor]]  cor: 's' pele, 'd' tom escuro da cor escolhida, vazio = cor escolhida
const S={
hair:[['hair_00','Bald',0,[]],['hair_01','Buzz cut',0,[[-5,-20,10,2]]],['hair_02','Side part',0,[[-5,-21,10,3],[-5,-18,2,2]]],['hair_03','Spiky',0,[[-5,-20,10,2],[-4,-22,2,2],[-1,-23,2,3],[2,-22,2,2]]],['hair_04','Long',0,[[-5,-21,10,3],[-6,-18,2,9],[4,-18,2,9]]],['hair_05','Ponytail',0,[[-5,-21,10,3],[4,-19,3,2],[5,-17,2,5]]],['hair_06','Afro',99,[[-7,-24,14,7],[-6,-18,2,3],[4,-18,2,3]]],['hair_07','Curly',0,[[-6,-22,12,5],[-7,-20,2,3],[5,-20,2,3]]],['hair_08','Mohawk',99,[[-1,-24,3,7],[-5,-19,10,1,'d']]],['hair_09','Slick back',99,[[-5,-21,10,3],[-5,-18,1,3],[-5,-21,10,1,'d']]],['hair_10','Mullet',99,[[-5,-21,10,3],[-6,-18,2,7],[4,-18,2,7]]],['hair_11','Bob',99,[[-6,-21,12,4],[-6,-17,2,5],[4,-17,2,5]]]],
beard:[['beard_00','None',0,[]],['beard_01','Stubble',0,[[-4,-14,8,2]]],['beard_02','Full beard',99,[[-5,-14,10,3],[-4,-11,8,1]]],['beard_03','Goatee',0,[[-2,-13,4,2]]],['beard_04','Mustache',0,[[-3,-14,6,1]]],['beard_05','Chin strap',99,[[-5,-15,1,3],[4,-15,1,3],[-4,-12,8,1]]],['beard_06','Long beard',149,[[-5,-14,10,3],[-4,-11,8,3]]]],
top:[['top_01','Tee',0,[[-4,-11,8,6],[-5,-11,1,3],[4,-11,1,3],[-5,-8,1,3,'s'],[4,-8,1,3,'s']]],['top_02','Hoodie',0,[[-4,-11,8,6],[-5,-11,1,6],[4,-11,1,6],[-2,-7,4,1,'d'],[-4,-12,8,1,'d']]],['top_03','Tank top',0,[[-3,-11,6,6],[-5,-11,1,5,'s'],[4,-11,1,5,'s'],[-4,-11,1,2,'s'],[3,-11,1,2,'s']]],['top_04','Hawaiian shirt',199,[[-4,-11,8,6],[-5,-11,1,3],[4,-11,1,3],[-5,-8,1,3,'s'],[4,-8,1,3,'s'],[-3,-10,1,1,'#ffd24a'],[0,-9,1,1,'#fff'],[2,-10,1,1,'#ff4fd8'],[-2,-7,1,1,'#fff'],[2,-7,1,1,'#ffd24a']]],['top_05','Leather jacket',249,[[-4,-11,8,6],[-5,-11,1,6],[4,-11,1,6],[0,-11,1,6,'#d8d8d8']]],['top_06','Suit',299,[[-4,-11,8,6],[-5,-11,1,6],[4,-11,1,6],[-1,-11,2,6,'#fff'],[0,-10,1,4,'#d9322e']]],['top_07','Crop top',149,[[-4,-11,8,3],[-5,-11,1,3],[4,-11,1,3],[-5,-8,1,3,'s'],[4,-8,1,3,'s'],[-4,-8,8,3,'s']]],['top_08','Jersey',199,[[-4,-11,8,6],[-5,-11,1,3],[4,-11,1,3],[-5,-8,1,3,'s'],[4,-8,1,3,'s'],[-4,-8,8,1,'#fff'],[-4,-6,8,1,'#fff']]]],
bot:[['bot_01','Jeans',0,[[-4,-5,4,4],[0,-5,4,4]]],['bot_02','Shorts',0,[[-4,-5,4,2],[0,-5,4,2],[-3,-3,2,1,'s'],[1,-3,2,1,'s']]],['bot_03','Skirt',99,[[-4,-6,8,3],[-3,-3,2,1,'s'],[1,-3,2,1,'s']]],['bot_04','Track pants',99,[[-4,-5,4,4],[0,-5,4,4],[-4,-5,1,4,'#fff'],[3,-5,1,4,'#fff']]]],
shoe:[['shoe_01','Sneakers',0,[[-4,-2,4,2,'#f4f4f4'],[0,-2,4,2,'#f4f4f4'],[-4,-1,4,1,'#aaa'],[0,-1,4,1,'#aaa']]],['shoe_02','Boots',149,[[-4,-3,4,3,'#6b4328'],[0,-3,4,3,'#6b4328']]],['shoe_03','Sandals',0,[[-4,-1,4,1,'#c8a15a'],[0,-1,4,1,'#c8a15a'],[-3,-2,2,1,'s'],[1,-2,2,1,'s']]],['shoe_04','Loafers',149,[[-4,-2,4,2,'#1a1a1a'],[0,-2,4,2,'#1a1a1a']]]],
hat:[['hat_00','None',0,[]],['hat_01','Cap',0,[[-5,-22,10,3],[-7,-19,6,1,'d']]],['hat_02','Trucker cap',99,[[-5,-22,10,3,'#f4f4f4'],[-5,-22,10,1],[-7,-19,6,1,'d']]],['hat_03','Beanie',0,[[-5,-23,10,4],[-5,-20,10,1,'d']]],['hat_04','Bucket hat',149,[[-5,-22,10,3],[-7,-19,14,1,'d']]],['hat_05','Fedora',199,[[-4,-23,8,4],[-7,-20,14,1,'d'],[-4,-20,8,1,'#1a1a1a']]],['hat_06','Cowboy hat',249,[[-4,-24,8,5],[-8,-20,16,1,'d'],[-8,-21,2,1,'d'],[6,-21,2,1,'d']]],['hat_07','Bandana',99,[[-5,-21,10,3],[4,-19,3,2,'d'],[-5,-19,10,1,'d']]],['hat_08','Golf visor',99,[[-5,-21,10,2],[-7,-19,6,1,'d']]]],
gl:[['gl_00','None',0,[]],['gl_01','Aviators',99,[[-4,-17,4,3,'#1a1a1a'],[0,-17,4,3,'#1a1a1a'],[-1,-16,1,1,'#1a1a1a']]],['gl_02','Round shades',99,[[-4,-17,4,3,'#2a2a55'],[0,-17,4,3,'#2a2a55'],[-1,-16,1,1,'#111'],[-3,-16,1,1,'#8ad']]],['gl_03','Neon hearts',149,[[-4,-17,4,3,'#ff4fd8'],[0,-17,4,3,'#ff4fd8'],[-1,-16,1,1,'#ff4fd8']]],['gl_04','Visor',199,[[-5,-17,10,3,'#46e0ff'],[-5,-17,10,1,'#8ff']]]],
acc:[['acc_00','None',0,[]],['acc_01','Gold chain',299,[[-2,-12,4,1,'#ffd24a'],[-1,-11,2,2,'#ffd24a']]],['acc_02','Earrings',99,[[-6,-15,1,2,'#ffd24a'],[5,-15,1,2,'#ffd24a']]],['acc_03','Headphones',149,[[-5,-21,10,1,'#ddd'],[-6,-18,1,4,'#ddd'],[5,-18,1,4,'#ddd']]],['acc_04','Face mask',99,[[-4,-14,8,3,'#8ad0ff'],[-6,-15,1,3,'#8ad0ff'],[5,-15,1,3,'#8ad0ff']]]]};
const PM={},PRICE={},NAME={};for(const k in S)for(const [id,n,pr,r] of S[k]){PM[id]=r;PRICE[id]=pr;NAME[id]=n}
const DEF={skin:SK[1],hair:'hair_01',hc:HCL[1],beard:'beard_00',bc:HCL[1],top:'top_01',tc:CLC[3],bot:'bot_01',pc:CLC[9],shoe:'shoe_01',hat:'hat_00',htc:CLC[2],gl:'gl_00',acc:'acc_00'};
const FREE=k=>S[k].filter(x=>!x[2]).map(x=>x[0]);
const rav=()=>({skin:rnd(SK),hair:rnd(FREE('hair')),hc:rnd(HCL),beard:rnd(['beard_00','beard_00',...FREE('beard')]),bc:rnd(HCL),top:rnd(FREE('top')),tc:rnd(CLC),bot:rnd(FREE('bot')),pc:rnd(CLC),shoe:rnd(FREE('shoe')),hat:rnd(['hat_00',...FREE('hat')]),htc:rnd(CLC),gl:'gl_00',acc:'acc_00'});
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
const ITEMS=[['pet_dog','pet','🐶','Dog',300],['pet_cat','pet','🐱','Cat',300],['pet_parrot','pet','🦜','Parrot',400],['pet_rabbit','pet','🐰','Rabbit',350],['pet_flamingo','pet','🦩','Flamingo',700],['pet_monkey','pet','🐒','Monkey',800],['pet_snake','pet','🐍','Python',900],['pet_croc','pet','🐊','Crocodile',1200],['pet_tiger','pet','🐯','Tiger',1500],
['car_moto','car','🏍️','Motorbike',900],['car_coupe','car','🏎️','Sports coupe',1200],['car_muscle','car','🚗','Muscle car',1400],['car_suv','car','🚙','Armored SUV',1800],['car_limo','car','🚐','Limo van',2500],
['st_palm','statue','🌴','Neon palm',600],['st_money','statue','💰','Money bag',700],['st_trophy','statue','🏆','Giant trophy',900],['st_dolphin','statue','🐬','Golden dolphin',1000],['st_crown','statue','👑','Giant crown',1500],
['aura_pink','aura','','Neon pink aura',500,'#ff4fd8'],['aura_blue','aura','','Neon blue aura',500,'#46e0ff']].map(([id,t,e,n,p,c])=>({id,t,e,n,p,c}));
const TC={100:'#46e0ff',250:'#7aff9a',500:'#ffd24a',1000:'#ff4fa8'},DUR={0:5000,100:10000,250:20000,500:40000,1000:60000};
const LN=['esse jogo tá brabo','vai lançar quando mesmo?','cidade linda demais','bora fazer um rolê?','tô aqui desde cedo kkk','alguém no cassino?','vai ter evento?','amei o mapa'];
let prof;try{prof=JSON.parse(localStorage.nco)}catch(e){}
prof=Object.assign({name:'',av:Object.assign({},DEF),coins:5000,all:false,inv:[],eq:{},ok:0},prof);
const save=()=>{try{localStorage.nco=JSON.stringify(prof)}catch(e){}};
const I18={"en": ["tap the ground to walk · mouse wheel = zoom", "GLOBAL CHAT", "Shop", "Super chat:", "Normal", "Type your message...", "Your character", "Your name", "Skin", "Hair", "Hair color", "Shirt", "Pants", "Accessory", "None", "Glasses", "Cap", "I accept the terms", "Read terms", "Enter", "Close", "Buy", "Equip", "Remove", "Not enough coins", "Choose a name", "Accept the terms to enter", "THE BIG LAUNCH IN:", "LIVE NOW!", "YOUR AD HERE", "BE TODAY'S TOP", "Card payments coming soon", "+50 coins (demo)", "Language", "d"], "es": ["toca el suelo para caminar · rueda del ratón = zoom", "CHAT GLOBAL", "Tienda", "Super chat:", "Normal", "Escribe tu mensaje...", "Tu personaje", "Tu nombre", "Piel", "Pelo", "Color de pelo", "Camiseta", "Pantalón", "Accesorio", "Ninguno", "Gafas", "Gorra", "Acepto los términos", "Leer términos", "Entrar", "Cerrar", "Comprar", "Equipar", "Quitar", "Monedas insuficientes", "Elige un nombre", "Acepta los términos para entrar", "EL GRAN LANZAMIENTO EN:", "¡YA DISPONIBLE!", "TU ANUNCIO AQUÍ", "SÉ EL TOP DE HOY", "Pagos con tarjeta próximamente", "+50 monedas (demo)", "Idioma", "d"], "pt": ["toque no chão para andar · roda do mouse = zoom", "CHAT GLOBAL", "Loja", "Super chat:", "Normal", "Digite sua mensagem...", "Seu personagem", "Seu nome", "Pele", "Cabelo", "Cor do cabelo", "Camisa", "Calça", "Acessório", "Nada", "Óculos", "Boné", "Li e aceito os termos", "Ler termos", "Entrar", "Fechar", "Comprar", "Equipar", "Tirar", "Moedas insuficientes", "Escolha um nome", "Aceite os termos para entrar", "O GRANDE LANÇAMENTO EM:", "NO AR!", "SEU ANÚNCIO AQUI", "SEJA O TOP DO DIA", "Pagamento por cartão em breve", "+50 moedas (demo)", "Idioma", "d"], "fr": ["touchez le sol pour marcher · molette = zoom", "CHAT GLOBAL", "Boutique", "Super chat :", "Normal", "Écrivez votre message...", "Votre personnage", "Votre nom", "Peau", "Cheveux", "Couleur des cheveux", "T-shirt", "Pantalon", "Accessoire", "Aucun", "Lunettes", "Casquette", "J'accepte les conditions", "Lire les conditions", "Entrer", "Fermer", "Acheter", "Équiper", "Retirer", "Pièces insuffisantes", "Choisissez un nom", "Acceptez les conditions pour entrer", "LE GRAND LANCEMENT DANS :", "DISPONIBLE !", "VOTRE PUB ICI", "SOYEZ LE TOP DU JOUR", "Paiement par carte bientôt", "+50 pièces (démo)", "Langue", "j"], "de": ["Boden antippen zum Laufen · Mausrad = Zoom", "GLOBALER CHAT", "Shop", "Super-Chat:", "Normal", "Nachricht eingeben...", "Deine Figur", "Dein Name", "Haut", "Haare", "Haarfarbe", "Shirt", "Hose", "Zubehör", "Keins", "Brille", "Kappe", "Ich akzeptiere die Bedingungen", "Bedingungen lesen", "Betreten", "Schließen", "Kaufen", "Anlegen", "Ablegen", "Nicht genug Münzen", "Wähle einen Namen", "Bedingungen akzeptieren, um einzutreten", "DER GROSSE START IN:", "JETZT LIVE!", "DEINE WERBUNG HIER", "WERDE TOP DES TAGES", "Kartenzahlung bald verfügbar", "+50 Münzen (Demo)", "Sprache", "T"], "it": ["tocca il suolo per camminare · rotella = zoom", "CHAT GLOBALE", "Negozio", "Super chat:", "Normale", "Scrivi il tuo messaggio...", "Il tuo personaggio", "Il tuo nome", "Pelle", "Capelli", "Colore capelli", "Maglia", "Pantaloni", "Accessorio", "Nessuno", "Occhiali", "Cappello", "Accetto i termini", "Leggi i termini", "Entra", "Chiudi", "Acquista", "Equipaggia", "Rimuovi", "Monete insufficienti", "Scegli un nome", "Accetta i termini per entrare", "IL GRANDE LANCIO TRA:", "IN ONDA!", "LA TUA PUBBLICITÀ QUI", "DIVENTA IL TOP DEL GIORNO", "Pagamento con carta in arrivo", "+50 monete (demo)", "Lingua", "g"], "ru": ["коснитесь земли, чтобы идти · колесо мыши = зум", "ОБЩИЙ ЧАТ", "Магазин", "Супер-чат:", "Обычный", "Введите сообщение...", "Ваш персонаж", "Ваше имя", "Кожа", "Волосы", "Цвет волос", "Футболка", "Штаны", "Аксессуар", "Нет", "Очки", "Кепка", "Я принимаю условия", "Читать условия", "Войти", "Закрыть", "Купить", "Надеть", "Снять", "Недостаточно монет", "Выберите имя", "Примите условия, чтобы войти", "ВЕЛИКИЙ ЗАПУСК ЧЕРЕЗ:", "УЖЕ В ЭФИРЕ!", "ВАША РЕКЛАМА ЗДЕСЬ", "СТАНЬ ТОПОМ ДНЯ", "Оплата картой скоро", "+50 монет (демо)", "Язык", "д"], "ja": ["地面をタップして移動 · マウスホイール=ズーム", "グローバルチャット", "ショップ", "スーパーチャット:", "通常", "メッセージを入力...", "あなたのキャラ", "あなたの名前", "肌", "髪型", "髪の色", "シャツ", "ズボン", "アクセサリー", "なし", "メガネ", "キャップ", "利用規約に同意します", "規約を読む", "入る", "閉じる", "購入", "装備", "外す", "コインが足りません", "名前を選んでください", "入るには規約への同意が必要です", "大型リリースまで:", "公開中!", "広告募集中", "今日のトップになろう", "カード決済は近日対応", "+50コイン(デモ)", "言語", "日"], "ko": ["바닥을 눌러 이동 · 마우스 휠 = 확대", "전체 채팅", "상점", "슈퍼챗:", "일반", "메시지를 입력하세요...", "내 캐릭터", "내 이름", "피부", "머리", "머리 색", "셔츠", "바지", "액세서리", "없음", "안경", "모자", "약관에 동의합니다", "약관 읽기", "입장", "닫기", "구매", "장착", "해제", "코인이 부족합니다", "이름을 선택하세요", "입장하려면 약관에 동의하세요", "대형 출시까지:", "지금 출시!", "광고 문의", "오늘의 TOP이 되세요", "카드 결제 곧 지원", "+50 코인(데모)", "언어", "일"], "zh": ["点击地面行走 · 鼠标滚轮=缩放", "全球聊天", "商店", "超级聊天:", "普通", "输入消息...", "你的角色", "你的名字", "肤色", "发型", "发色", "上衣", "裤子", "配饰", "无", "眼镜", "帽子", "我接受条款", "阅读条款", "进入", "关闭", "购买", "装备", "卸下", "金币不足", "请选择名字", "请接受条款后进入", "盛大发售倒计时:", "现已上线!", "广告位招租", "成为今日榜首", "银行卡支付即将上线", "+50金币(演示)", "语言", "天"], "tr": ["yürümek için zemine dokun · fare tekerleği = yakınlaştır", "GENEL SOHBET", "Mağaza", "Süper sohbet:", "Normal", "Mesajını yaz...", "Karakterin", "Adın", "Ten", "Saç", "Saç rengi", "Tişört", "Pantolon", "Aksesuar", "Yok", "Gözlük", "Şapka", "Şartları kabul ediyorum", "Şartları oku", "Gir", "Kapat", "Satın al", "Kuşan", "Çıkar", "Yetersiz jeton", "Bir isim seç", "Girmek için şartları kabul et", "BÜYÜK ÇIKIŞA:", "YAYINDA!", "REKLAMINIZ BURADA", "GÜNÜN ZİRVESİ OL", "Kartla ödeme yakında", "+50 jeton (demo)", "Dil", "g"], "hi": ["चलने के लिए ज़मीन पर टैप करें · माउस व्हील = ज़ूम", "ग्लोबल चैट", "दुकान", "सुपर चैट:", "सामान्य", "अपना संदेश लिखें...", "आपका किरदार", "आपका नाम", "त्वचा", "बाल", "बालों का रंग", "शर्ट", "पैंट", "एक्सेसरी", "कोई नहीं", "चश्मा", "टोपी", "मैं शर्तें स्वीकार करता/करती हूँ", "शर्तें पढ़ें", "प्रवेश करें", "बंद करें", "खरीदें", "पहनें", "हटाएँ", "सिक्के कम हैं", "एक नाम चुनें", "प्रवेश के लिए शर्तें स्वीकार करें", "बड़े लॉन्च में:", "अब लाइव!", "आपका विज्ञापन यहाँ", "आज के टॉप बनें", "कार्ड भुगतान जल्द", "+50 सिक्के (डेमो)", "भाषा", "दिन"]};
const LGN=[["en", "English"], ["es", "Español"], ["pt", "Português"], ["fr", "Français"], ["de", "Deutsch"], ["it", "Italiano"], ["ru", "Русский"], ["ja", "日本語"], ["ko", "한국어"], ["zh", "中文"], ["tr", "Türkçe"], ["hi", "हिन्दी"]],TXT={"en": "1) Experimental, temporary project: it may change or shut down at any time without notice. 2) Coins and items are digital, have no cash value, are non-transferable and may be removed when the project ends. 3) Harassment, spam, illegal content and fraud are prohibited; accounts may be banned. 4) Not affiliated with Rockstar Games or Take-Two. 5) 18+ only, or with a guardian's permission. (Draft: review with a lawyer.)", "pt": "1) Projeto experimental e temporário: pode mudar ou ser encerrado a qualquer momento, sem aviso. 2) Moedas e itens são digitais, sem valor em dinheiro, intransferíveis e podem ser removidos ao encerrar. 3) Proibido assédio, spam, conteúdo ilegal e fraude; contas podem ser banidas. 4) Sem vínculo com a Rockstar Games ou a Take-Two. 5) Só para maiores de 18 anos ou com autorização dos responsáveis. (Rascunho: revise com um advogado.)"};
prof.lang=I18[prof.lang]?prof.lang:'en'; // idioma padrão: inglês
const t=i=>I18[prof.lang][i];
let toastT;function toast(m){const e=$('ts');e.textContent=m;e.style.display='block';clearTimeout(toastT);toastT=setTimeout(()=>e.style.display='none',2000)}
// ---- desenho ----
// ---- cenário fixo + luz dia/noite ----
const mi=s=>{const i=new Image();i.src=s;return i};
const FR=mi('img/plaza_front.webp'),BK=mi('img/plaza_back.webp'),SUN=mi('img/sol.webp'),MOON=mi('img/lua.webp'),CL=mi('img/balada.webp');// ciclo de 15 min igual para todos: sol 9 min (nasce, cruza o céu, se põe) e lua 6 min
const cyc=()=>(Date.now()/1000%900)/900;
function sky(){const c=cyc(),e=c<.6?Math.sin(Math.PI*c/.6):-Math.sin(Math.PI*(c-.6)/.4);return[cl((e-.3)/.7,0,1),cl((.1-e)/.6,0,1),e,c]}
const hx=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)),KD=[['#3d9bff','#ffe2a8'],['#5a1fc0','#ff7a50'],['#050218','#1a0a4a']];
function skyCol(dia,nt,k){const w=[dia,1-Math.max(dia,nt),nt],o=[0,0,0];KD.forEach((q,i)=>hx(q[k]).forEach((v,j)=>o[j]+=v*w[i]));return`rgb(${o.map(v=>v|0)})`}
function drawWorld(t){const [dia,nt,e,c]=sky();
 const g=cx.createLinearGradient(0,0,0,75);g.addColorStop(0,skyCol(dia,nt,0));g.addColorStop(1,skyCol(dia,nt,1));cx.fillStyle=g;cx.fillRect(0,0,W,75);
 if(nt>0){cx.fillStyle='#fff';for(let i=0;i<60;i++){cx.globalAlpha=nt*(.4+.6*Math.abs(Math.sin(t/500+i)));cx.fillRect((i*97.3)%W|0,(i*37.7)%58|0,1,1)}cx.globalAlpha=1}
 const u=c<.6?c/.6:(c-.6)/.4,sp=c<.6?SUN:MOON,sz=c<.6?22:20;
 if(sp.naturalWidth)cx.drawImage(sp,-12+(W+24)*u-sz/2,62-52*Math.sin(Math.PI*u)-sz/2,sz,sz);
 if(BK.naturalWidth)cx.drawImage(BK,0,0,W,BK.naturalHeight/2);
 if(FR.naturalWidth)cx.drawImage(FR,0,0,W,H);else{cx.fillStyle='#2a1442';cx.fillRect(0,75,W,H-75)}}
function drawClub(t){if(CL.naturalWidth)cx.drawImage(CL,0,0,W,H);else{cx.fillStyle='#0b0418';cx.fillRect(0,0,W,H)}
 const bt=NOW&&AC?((Date.now()-NOW.t0)/1000*TR[NOW.id].bpm/60)%1:(t/700)%1;cx.globalCompositeOperation='lighter';cx.fillStyle=`rgba(150,60,255,${.07*(1-bt)})`;cx.fillRect(0,0,W,H);cx.globalCompositeOperation='source-over'}

const GL=[[38,160,34],[179,160,34],[456,160,34],[602,160,34],[320,142,60],[102,165,36],[531,165,36]]; // brilhos noturnos: x,y,raio
function light(){const [dia,nt]=sky();
 if(dia){const g=cx.createLinearGradient(0,0,0,H);g.addColorStop(0,`rgba(255,150,40,${.16*dia})`);g.addColorStop(.7,`rgba(255,205,70,${.22*dia})`);g.addColorStop(1,`rgba(255,175,60,${.1*dia})`);cx.globalCompositeOperation='screen';cx.fillStyle=g;cx.fillRect(0,0,W,H)}
 if(nt){cx.globalCompositeOperation='multiply';{const q=cx.createLinearGradient(0,0,0,80);q.addColorStop(0,`rgb(${255-40*nt|0},${255-35*nt|0},${255-15*nt|0})`);q.addColorStop(1,`rgb(${255-120*nt|0},${255-105*nt|0},${255-45*nt|0})`);cx.fillStyle=q;cx.fillRect(0,0,W,80);cx.fillStyle=`rgb(${255-120*nt|0},${255-105*nt|0},${255-45*nt|0})`;cx.fillRect(0,80,W,H-80)}cx.globalCompositeOperation='lighter';
  for(const [x,y,r] of GL){const g=cx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,`rgba(255,170,90,${.55*nt})`);g.addColorStop(1,'rgba(255,170,90,0)');cx.fillStyle=g;cx.fillRect(x-r,y-r,2*r,2*r)}}
 cx.globalCompositeOperation='source-over'}

const EM=['😀','😂','😎','🔥','❤️','👏','🎉','🚗','🐶','🐱','💎','🌴','😍','🤙','👑','🎮'];
EM.forEach(e=>{const x=document.createElement('span');x.textContent=e;x.onclick=()=>{$('i').value+=e;$('i').focus()};$('ep').append(x)});
$('em').onclick=()=>$('ep').classList.toggle('on');
function drawAv(c,x,y,a,t,mv){a=Object.assign({},DEF,a);const f=mv?(t/150|0)%2:0,b=mv&&f?-1:0,Q=[],sk=a.skin;
 const L=(id,tn,al)=>{for(const [X,Y,w,h,k] of PM[id]||[])Q.push([X,Y+(Y<-4?b:0),w,h,k==='s'?sk:k==='d'?shade(tn):k||tn,al||1])};
 L(a.bot,a.pc);L(a.shoe);L(a.top,a.tc);
 Q.push([-5,-20+b,10,8,sk,1],[-3,-16+b,1,2,'#161616',1],[1,-16+b,1,2,'#161616',1],[-1,-13+b,2,1,'#a8554a',1]);
 L(a.beard,a.bc,a.beard==='beard_01'?.45:1);L(a.hair,a.hc);L(a.hat,a.htc);L(a.gl);L(a.acc);
 c.globalAlpha=1;c.fillStyle='#0006';c.fillRect(x-6,y-1,12,2);
 c.fillStyle='#150a14';for(const [X,Y,w,h,k,al] of Q)if(al===1)c.fillRect(x+X-1,y+Y-1,w+2,h+2);
 for(const [X,Y,w,h,k,al] of Q){c.globalAlpha=al;c.fillStyle=k;c.fillRect(x+X,y+Y,w,h)}c.globalAlpha=1}
function drawCar(c,x,y,k){const F=(X,Y,w,h,q)=>{c.fillStyle=q;c.fillRect(x+X,y+Y,w,h)};F(-2,-1,22,2,'#0005');F(0,-5,20,4,k);F(4,-8,10,3,k);F(5,-7,3,2,'#9be8ff');F(10,-7,3,2,'#9be8ff');F(1,-2,4,3,'#111');F(14,-2,4,3,'#111');F(18,-4,2,1,'#ffe27a')}
function drawPet(c,x,y,k,cat){const F=(X,Y,w,h,q)=>{c.fillStyle=q;c.fillRect(x+X,y+Y,w,h)};F(-3,-1,7,1,'#0004');F(-3,-4,6,3,k);F(2,-6,3,3,k);F(2,-7,1,1,k);F(4,-7,1,1,k);F(-4,cat?-7:-5,1,cat?4:2,k);F(-3,-1,1,1,'#222');F(1,-1,1,1,'#222');F(4,-5,1,1,'#111')}
// ---- NPCs, boate e música (tudo sintetizado no navegador: sem arquivos, sem direitos autorais) ----
const R=(x,y,w,h,k)=>{cx.fillStyle=k;cx.fillRect(x,y,w,h)};
const GQ={en:['CLOSED FOR MAINTENANCE... COME BACK LATER.','NOT TONIGHT, PAL. MAINTENANCE.','MOVE ALONG. NOTHING TO SEE HERE.','I SAID COME BACK LATER.'],pt:['ESTÁ EM MANUTENÇÃO... VOLTE OUTRA HORA.','HOJE NÃO. MANUTENÇÃO.','CIRCULA. NADA PRA VER AQUI.','JÁ FALEI: VOLTE OUTRA HORA.']};
const CS={en:{enter:'🎶 ENTER CLUB',exit:'⬅ EXIT',door:'🚪 EXIT',now:'NOW PLAYING',q:'QUEUE'},pt:{enter:'🎶 ENTRAR NA BOATE',exit:'⬅ SAIR',door:'🚪 SAIR',now:'TOCANDO',q:'FILA'}};
const ct=k=>(CS[prof.lang]||CS.en)[k];
function clubTxt(){$('en').textContent=ct('enter');$('ex').textContent=ct('exit');$('xd').textContent=ct('door')}
function drawGuard(c,x,y){const F=(X,Y,w,h,k)=>{c.fillStyle=k;c.fillRect(x+X,y+Y,w,h)};
 F(-9,-1,18,2,'#0005');F(-5,-9,4,8,'#0c0c12');F(1,-9,4,8,'#0c0c12');F(-5,-2,4,2,'#000');F(1,-2,4,2,'#000');
 F(-8,-21,16,13,'#14141c');F(-8,-21,16,1,'#2a2a38');F(-1,-21,2,9,'#e8e8ff');F(-1,-20,2,1,'#111');
 F(-10,-20,3,10,'#14141c');F(7,-20,3,10,'#14141c');F(-7,-15,14,3,'#1c1c28');F(-10,-11,2,2,'#4a2c1a');F(8,-11,2,2,'#4a2c1a');
 F(-4,-29,8,8,'#4a2c1a');F(-4,-29,8,2,'#120a06');F(-4,-26,8,2,'#000');F(-3,-26,2,1,'#3a3a55');F(1,-26,2,1,'#3a3a55');F(4,-25,1,3,'#222')}
const DJAV={skin:SK[6],hair:'hair_01',hc:HCL[0],top:'top_02',tc:CLC[7],bot:'bot_04',pc:CLC[1],shoe:'shoe_01',gl:'gl_02'};
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
function pick(i){if(LIVE){toast('🎵 Paid requests go online with payments');return}if(Date.now()-lastP<5000)return toast('⏳');
 $('rq').textContent='🎵 '+TR[i].n+' · '+usd(DJP)+'  ('+usd(prof.coins)+')';$('rp').textContent='Pay '+usd(DJP);
 $('rp').onclick=()=>{if(prof.coins<DJP)return toast(t(24));prof.coins-=DJP;save();updHud();lastP=Date.now();enqueue(i,me.name);send('club',{k:'pick',id:i,by:me.name});$('m3').classList.remove('on')};$('m3').classList.add('on')}
$('rc').onclick=()=>$('m3').classList.remove('on');
function clubMsg(q){if(!q)return;if(q.k==='pick'&&TR[q.id])enqueue(+q.id,String(q.by).slice(0,16));
 else if(q.k==='hello'&&NOW&&SC==='club')setTimeout(()=>{if(!heard)send('club',{k:'state',n:NOW,q:QU})},Math.random()*1000);
 else if(q.k==='state'){heard=true;setTimeout(()=>heard=false,1500);if(needSync&&q.n&&TR[q.n.id]&&isFinite(+q.n.t0)){NOW={id:+q.n.id,by:String(q.n.by).slice(0,16),t0:+q.n.t0,k:null};QU=(q.q||[]).slice(0,5).filter(x=>TR[x.id]).map(x=>({id:+x.id,by:String(x.by).slice(0,16)}));needSync=false}}}
function setScene(s){SC=s;ZT=1;for(const k of ['cd','b0','b1'])$(k).style.display=s==='club'?'none':'';$('cs').style.display=(s==='club'&&CONFIG.clubBanner&&CONFIG.clubBanner.img)?'':'none';$('cp').style.display=s==='club'?'block':'none';$('xd').style.display=s==='club'?'':'none'}
const trk=()=>{if(rt)rt.track({name:me.name,av:me.av,x:me.x,y:me.y,sc:SC})};
TR.forEach((x,i)=>{const b=document.createElement('button');b.textContent='🎵 '+x.n;b.onclick=()=>pick(i);$('tl').append(b)});
$('en').onclick=()=>{if(!me)return;ac();me.sc='club';me.x=me.tx=320;me.y=me.ty=300;setScene('club');trk();needSync=true;send('club',{k:'hello'});setTimeout(()=>{if(needSync){needSync=false;if(!NOW)NOW={id:0,by:'DJ',t0:Date.now(),k:null}}},1500)};
$('ex').onclick=()=>{me.sc='plaza';me.x=me.tx=533;me.y=me.ty=198;setScene('plaza');trk()};
$('xd').onclick=$('ex').onclick;
$('mt').onclick=()=>{MUTE=!MUTE;$('mt').textContent=MUTE?'🔇':'🔊';if(MG)MG.gain.value=MUTE?0:.5};
setInterval(()=>{if(SC==='club')$('np').textContent=(NOW?ct('now')+': '+TR[NOW.id].n+' · '+NOW.by:'')+(QU.length?'  |  '+ct('q')+': '+QU.length:'')},500);
// ---- jogadores ----
const P=new Map();let me=null,rt=null,lastS=0,SC='plaza',Z=1,ZT=1,CX0=0,CY0=0,TP={n:'',v:0};const tot={};
function mk(id,name,av,x,y){return{id,name,av:Object.assign({},DEF,av),x,y,tx:x,ty:y,px:x+12,py:y,mv:0,say:'',sayT:0,sc:'',eq:{},col:rnd(['#ff7ae0','#7ae0ff','#ffe27a','#9aff9a'])}}
const go=(p,x,y)=>{const c=p.sc==='club';p.tx=cl(x,c?80:10,c?560:630);p.ty=cl(y,c?150:192,c?335:350)};
function step(p,dt){const dx=p.tx-p.x,dy=p.ty-p.y,d=Math.hypot(dx,dy);if(d>1){const k=Math.min(1,84*dt/d);p.x+=dx*k;p.y+=dy*k;p.mv=1}else p.mv=0;const q=Math.min(1,dt*5);p.px+=(p.x+12-p.px)*q;p.py+=(p.y-p.py)*q}
function loop(t){const dt=Math.min(.05,(t-loop.l)/1000||0);loop.l=t;if(me&&SC==='plaza'&&t>GD.cool&&Math.hypot(me.x-GD.x,me.y-GD.y)<46){GD.cool=t+7000;GD.i++;const a=GQ[prof.lang]||GQ.en;GD.say=a[GD.i<1?0:1+(GD.i-1)%(a.length-1)];GD.sayT=t+4500}
 $('en').style.display=(me&&SC==='plaza'&&Math.hypot(me.x-533,me.y-192)<52)?'':'none';
 Z+=(ZT-Z)*Math.min(1,dt*8);const vw=W/Z,vh=H/Z,x0=me?cl(me.x-vw/2,0,W-vw):0,y0=me?cl(me.y-14-vh/2,0,H-vh):0;CX0=x0;CY0=y0;
 $('ov').style.transform=`scale(${Z}) translate(${-x0/W*100}%,${-y0/H*100}%)`;cx.setTransform(2*Z,0,0,2*Z,-x0*2*Z,-y0*2*Z);cx.imageSmoothingEnabled=false;if(SC==='club')drawClub(t);else drawWorld(t)
 const L=[...P.values(),...NPCS].filter(p=>(p.sc||'plaza')===SC);for(const p of L)step(p,dt);L.sort((a,b)=>a.y-b.y);
 for(const p of L){const e=p.eq||{},it=k=>ITEMS.find(i=>i.id===e[k]),a=it('aura'),c=it('car'),q=it('pet');
  if(a){cx.strokeStyle=a.c;cx.globalAlpha=.5+.3*Math.sin(t/200);cx.lineWidth=1;cx.beginPath();cx.ellipse(p.x,p.y-1,10,3,0,0,7);cx.stroke();cx.globalAlpha=1}
  drawObj(p,dt,t,it);if(p.draw)p.draw(cx,p,t);else drawAv(cx,p.x,p.y,p.av,t,p.mv)}
 if(SC==='club'&&CL.naturalWidth)cx.drawImage(CL,545,205,195,80,272.5,102.5,97.5,40);if(SC==='plaza'){if(TP.av)drawAv(cx,320,52,TP.av,t,0);light()}cx.font='5px PS2P,monospace';cx.textAlign='center';cx.lineJoin='round';if(SC==='plaza')roofLabel();
 for(const p of L){cx.lineWidth=2;cx.strokeStyle='#000';cx.fillStyle=p.col;const ny=p.y-24-(p.hh||0);cx.strokeText(p.name,p.x,ny);cx.fillText(p.name,p.x,ny);
  if(p.say&&t<p.sayT){const s=p.say.length>(p.max||28)?p.say.slice(0,(p.max||28)-1)+'…':p.say,w=cx.measureText(s).width+6;cx.fillStyle=p.sc||'#fff';cx.fillRect(p.x-w/2,ny-16,w,10);cx.fillStyle='#111';cx.fillText(s,p.x,ny-8)}}
 requestAnimationFrame(loop)}
// ---- chat ----
const ms=$('ms');
function addMsg(n,tx,tier,col){const d=document.createElement('div'),b=document.createElement('b');b.textContent=n+': ';b.style.color=tier?'#111':col;d.append(b,document.createTextNode(tx));if(tier){d.className='sc';d.style.background=TC[tier]}ms.append(d);while(ms.children.length>60)ms.firstChild.remove();ms.scrollTop=ms.scrollHeight}
function roofLabel(){const s='👑 '+(TP.n?TP.n+' · '+TP.v+' 🪙':t(30)),y=TP.av?22:46;cx.lineWidth=2;cx.strokeStyle='#000';cx.fillStyle='#ffd24a';cx.strokeText(s,320,y);cx.fillText(s,320,y)}
function say(p,tx,tier){p.say=tx;p.sayT=performance.now()+DUR[tier];p.sc=tier?TC[tier]:'';addMsg(p.name,tx,tier,p.col);if(tier){tot[p.name]=(tot[p.name]||0)+tier;if(tot[p.name]>TP.v){TP={n:p.name,v:tot[p.name],av:p.av}}}}
function updHud(){$('on').textContent='🟢 ONLINE: '+P.size;$('co').textContent=LIVE?'':usd(prof.coins)}
$('tr').disabled=LIVE;
$('f').onsubmit=e=>{e.preventDefault();if(!me)return;const v=$('i').value.trim().slice(0,120),tier=LIVE?0:+$('tr').value,n=Date.now();if(!v||n-lastS<1000)return;
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
// ---- avatar e loja ----
let draft,tab='lk';
const OWN=id=>!PRICE[id]||prof.all||prof.inv.includes(id);
const need=()=>['hair','beard','top','bot','shoe','hat','gl','acc'].map(k=>draft[k]).filter(id=>!OWN(id));
const TABS=[['lk','✨ Looks'],['hair','💇 Hair'],['beard','🧔 Beard'],['top','👕 Tops'],['bot','👖 Bottoms'],['shoe','👟 Shoes'],['hat','🧢 Hats'],['gl','🕶️ Glasses'],['acc','⛓️ Extras'],['skin','🎨 Skin']];
const TINT={hair:['hc',HCL],beard:['bc',HCL],top:['tc',CLC],bot:['pc',CLC],hat:['htc',CLC]};
const mini=d=>{const e=document.createElement('canvas');e.width=40;e.height=56;const c=e.getContext('2d');c.setTransform(2,0,0,2,0,0);drawAv(c,10,27,d,0,0);return e};
const mkb=(cls,fn)=>{const b=document.createElement('button');b.className=cls;b.onclick=fn;return b};
function editor(){
 const tb=$('tb');tb.innerHTML='';for(const [k,l] of TABS){const b=mkb('ch'+(tab===k?' on':''),()=>{tab=k;editor()});b.textContent=l;tb.append(b)}
 const cc=$('cc');cc.innerHTML='';
 if(TINT[tab]){const [key,pal]=TINT[tab];pal.forEach(v=>{const b=mkb('sw'+(draft[key]===v?' on':''),()=>{draft[key]=v;editor()});b.style.background=v;cc.append(b)})}
 const gr=$('gr');gr.innerHTML='';
 if(tab==='lk')LOOKS.forEach(([n,l])=>{const d=Object.assign({},DEF,l,{skin:draft.skin}),b=mkb('cd',()=>{draft=d;editor()}),s=document.createElement('small');s.textContent=n;b.append(mini(d),s);gr.append(b)});
 else if(tab==='skin')SK.forEach(v=>{const b=mkb('sw'+(draft.skin===v?' on':''),()=>{draft.skin=v;editor()});b.style.background=v;gr.append(b)});
 else S[tab].forEach(([id,n,pr])=>{const b=mkb('cd'+(draft[tab]===id?' on':''),()=>{draft[tab]=id;editor()}),s=document.createElement('small');s.textContent=n+' · '+(!pr?'Free':OWN(id)?'✓':usd(pr));b.append(mini(Object.assign({},draft,{[tab]:id})),s);gr.append(b)});
 const nd=need(),tot=nd.reduce((s,id)=>s+PRICE[id],0),ft=$('ft');ft.innerHTML='';
 if(nd.length){const b=mkb('',()=>{if(prof.coins<tot)return toast(t(24));prof.coins-=tot;prof.inv.push(...nd);save();updHud();editor()});b.textContent='🛒 Buy '+nd.length+' · '+usd(tot);b.disabled=LIVE;ft.append(b)}
 const c=$('pv').getContext('2d');c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,120,160);c.setTransform(5,0,0,5,0,0);drawAv(c,12,31,draft,0,0)}
function openAv(){draft=Object.assign({},DEF,prof.av);$('nm').value=prof.name;$('tk').style.display=prof.ok?'none':'';$('m1').classList.add('on');editor()}
$('ba').onclick=openAv;
$('go').onclick=()=>{const n=$('nm').value.trim().slice(0,16);if(!n)return toast(t(25));if(need().length)return toast('🔒 Buy or remove locked items');if(!prof.ok&&!$('ok').checked)return toast(t(26));prof.name=n;prof.av=Object.assign({},draft);prof.ok=1;save();$('m1').classList.remove('on');start()};
let stab='pet';
const OWNI=id=>prof.all||prof.inv.includes(id);
function shop(){
 const l=$('sl');l.innerHTML='';$('bc').style.display='none';$('sn').textContent=LIVE?'Payments go online tonight (Stripe).':'DEMO: purchases are simulated in this browser.';
 const h=document.createElement('div');h.className='r';const bal=document.createElement('b');bal.textContent='💵 '+usd(prof.coins);h.append(bal);
 for(const v of [500,2000]){const b=mkb('',()=>{prof.coins+=v;save();shop();updHud()});b.textContent='+'+usd(v)+' (demo)';b.disabled=LIVE;h.append(b)}l.append(h);
 const pk=(ico,tx,pr,fn)=>{const r=document.createElement('div');r.className='r';const s=document.createElement('span');s.textContent=ico+' '+tx;const b=mkb('',()=>{if(prof.coins<pr)return toast(t(24));prof.coins-=pr;fn();save();shop();updHud()});b.textContent=usd(pr);b.disabled=LIVE||prof.all;r.append(s,b);l.append(r)};
 pk('🧳','Tourist Pack: 5 random items',500,()=>{const pool=[...ITEMS.map(i=>i.id),...Object.keys(PRICE).filter(id=>PRICE[id])].filter(id=>(PRICE[id]||ITEMS.find(i=>i.id===id).p)<=400&&!OWNI(id));pool.sort(()=>Math.random()-.5);prof.inv.push(...pool.slice(0,5))});
 pk('👑','All-Access: unlock EVERYTHING',2000,()=>{prof.all=true});
 const tb=document.createElement('div');for(const [k,lb] of [['pet','🐾 Pets'],['car','🚗 Cars'],['statue','🗿 Statues'],['aura','✨ Auras']]){const b=mkb('ch'+(stab===k?' on':''),()=>{stab=k;shop()});b.textContent=lb;tb.append(b)}l.append(tb);
 for(const it of ITEMS.filter(i=>i.t===stab)){const own=OWNI(it.id),on=prof.eq[it.t]===it.id,r=document.createElement('div');r.className='r';const s=document.createElement('span');s.textContent=(it.e||'✨')+' '+it.n+' · '+(own?'✓':usd(it.p));
  const b=mkb('',()=>{if(!own){if(prof.coins<it.p)return toast(t(24));prof.coins-=it.p;prof.inv.push(it.id)}prof.eq[it.t]=on?null:it.id;save();shop();updHud()});b.textContent=own?(on?t(23):t(22)):t(21);b.disabled=LIVE;r.append(s,b);l.append(r)}}
$('bs').onclick=()=>{shop();$('m2').classList.add('on')};$('x2').onclick=()=>$('m2').classList.remove('on');
// objetos (carros, estátuas) ficam parados ao lado e SOMEM com fumaça quando o jogador anda; animais acompanham
function drawObj(p,dt,t,it){const pet=it('pet');if(pet){cx.font='13px serif';cx.textAlign='center';cx.fillText(pet.e,p.px,p.py-1)}
 const o=[it('car'),it('statue')].filter(Boolean);p.still=p.mv?0:(p.still||0)+dt;const g=p.still>.8?1:0;p.al=(p.al||0)+(g-(p.al||0))*Math.min(1,dt*6);if(g){p.ix=p.x;p.iy=p.y}
 if(p.al>.02&&o.length&&p.ix!=null){cx.globalAlpha=p.al;o.forEach((q,i)=>{const sc=.7+.3*p.al;cx.save();cx.translate(p.ix+(i?24:-26),p.iy-2);cx.scale(sc,sc);cx.font='18px serif';cx.textAlign='center';cx.fillText(q.e,0,0);cx.restore()});
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
CONFIG.banners.forEach((b,i)=>{if(b&&b.img){const e=$('b'+i),a=document.createElement('a'),im=new Image();im.src=b.img;im.alt='Patrocinador';a.href=b.link||'#';a.target='_blank';a.rel='noopener sponsored';a.append(im);e.textContent='';e.append(a)}});
function applyLang(){document.documentElement.lang=prof.lang;document.querySelectorAll('[data-i]').forEach(e=>e.textContent=t(+e.dataset.i));document.querySelectorAll('[data-p]').forEach(e=>e.placeholder=t(+e.dataset.p));$('tt').textContent=TXT[prof.lang]||TXT.en;if(draft)editor();tick();clubTxt()}
const lg=$('lg');LGN.forEach(([c,n])=>{const o=document.createElement('option');o.value=c;o.textContent=n;lg.append(o)});lg.value=prof.lang;lg.onchange=()=>{prof.lang=lg.value;save();applyLang()};
applyLang();
requestAnimationFrame(loop);
if(prof.ok&&prof.name)start();else openAv();
