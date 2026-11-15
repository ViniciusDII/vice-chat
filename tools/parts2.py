from core import *
def mk(spans,tex=None,ol=False,fix=None,holes=(),shade=True):
    l=L()
    for sp in spans:
        r,c0,c1=sp[:3]; ch=sp[3] if len(sp)>3 else '#'
        for c in range(c0,c1+1): l.put(r,c,ch)
    for h in holes: l.p.pop(h,None)
    if shade: autoshade(l,tex,light=False)
    if fix: fix(l)
    if ol: outline(l)
    return l
def mir(spans):
    out=[]
    for sp in spans:
        r,c0,c1=sp[:3]; out.append((r,14-c1,14-c0)+tuple(sp[3:]))
    return out
def both(spans): return spans+mir(spans)
def put(l,pts,ch):
    for r,c in pts: l.put(r,c,ch)
# ---------- TOPS ----------
def torso(sl=15,end=18,neck=True):
    sp=[(11,3,4),(11,10,11),(12,2,12),(13,2,12),(14,2,12)]
    for r in range(15,end+1): sp.append((r,4,10))
    for r in range(15,sl+1): sp+= [(r,1,2),(r,12,13)]
    return sp
def tank(end=18): return [(12,4,5),(12,9,10),(13,3,11),(14,3,11)]+[(r,4,10) for r in range(15,end+1)]
def skirt(r0,r1,flare=1):
    sp=[]
    for i,r in enumerate(range(r0,r1+1)):
        w=min(i,flare+0); sp.append((r,4-w if r>r0 else 4,10+w if r>r0 else 10))
    return sp
TM={};TF={}
def zip_(l,r0=12,r1=18,c=7):
    for r in range(r0,r1+1): l.put(r,c,'g')
TM['Tee']=mk(torso(15,18))
TM['Hoodie']=mk(torso(18,18),fix=lambda l:(put(l,[(11,c) for c in range(3,12)],'o'),put(l,[(r,c) for r in (17,) for c in range(5,10)],'o'),put(l,[(13,6),(14,6),(13,8),(14,8)],'w'),put(l,[(17,1),(17,2),(17,12),(17,13)],'o')))
TM['Tank top']=mk(tank(18))
TM['Hawaiian']=mk(torso(15,18),fix=lambda l:(put(l,[(13,4),(15,6),(17,9),(14,10),(16,4),(12,8)],'y'),put(l,[(14,5),(16,8),(13,9),(17,5),(15,1),(15,13)],'w'),put(l,[(12,3),(14,8),(16,10),(17,7),(15,12)],'r'),put(l,[(11,5),(12,6),(13,7)],'w'),put(l,[(11,9),(12,8)],'w')))
TM['Leather jacket']=mk(torso(18,18),fix=lambda l:(zip_(l,12,18,7),put(l,[(r,6) for r in (12,13)]+[(r,8) for r in (12,13)],'o'),put(l,[(17,1),(17,2),(17,12),(17,13)],'o')))
TM['Suit']=mk(torso(17,18),fix=lambda l:(put(l,[(12,6),(12,7),(12,8),(13,7)],'w'),put(l,[(13,6),(13,8),(14,7),(15,7),(16,7),(17,7)],'r' if False else 'w'),put(l,[(14,7),(15,7),(16,7)],'r'),put(l,[(12,5),(13,5),(14,5),(12,9),(13,9),(14,9)],'o'),put(l,[(13,7)],'r')))
TM['Jersey']=mk(torso(15,18),fix=lambda l:(put(l,[(18,c) for c in range(5,10)]+[(15,1),(15,2),(15,12),(15,13)],'w'),put(l,[(14,6),(14,7),(14,8),(15,8),(16,7),(17,7)],'w')))
TM['Polo']=mk(torso(15,18),fix=lambda l:(put(l,[(11,4),(11,10),(12,5),(12,9)],'+'),put(l,[(12,6),(12,7),(12,8)],'o'),put(l,[(13,7),(14,7)],'w')))
TM['Striped tee']=mk(torso(15,18),fix=lambda l:[l.put(r,c,'w') for r in (13,15,17) for c in range(1,14) if (r,c) in l.p and l.p[(r,c)]!='K'])
TM['Track jacket']=mk(torso(18,18),fix=lambda l:(zip_(l,12,18,7),put(l,[(r,c) for r in (15,16,17) for c in (1,13)],'w'),put(l,[(r,c) for r in (15,16,17,18) for c in (4,10)],'w'),put(l,[(12,3),(12,11)],'w')))
TM['Sweater']=mk(torso(17,18),fix=lambda l:[l.put(r,c,'o') for r in (14,16,18) for c in range(1,14) if (r,c) in l.p and l.p[(r,c)]!='K'])
TM['Bomber']=mk(torso(18,18),fix=lambda l:(zip_(l,12,18,7),put(l,[(11,c) for c in range(3,12)],'o'),put(l,[(18,c) for c in range(4,11)]+[(17,1),(17,2),(17,12),(17,13)],'o'),put(l,[(14,5),(15,5)],'w')))
TM['Overalls']=mk(torso(15,18),fix=lambda l:(put(l,[(r,c) for r in range(15,19) for c in range(4,11)],'B'),put(l,[(14,4),(14,10),(13,4),(13,10),(12,4),(12,10)],'B'),put(l,[(16,5),(16,9)],'y'),put(l,[(15,6),(15,7),(15,8)],'o')))
# female
TF['Crop top']=mk([(12,3,4),(12,10,11),(13,3,11),(14,3,11),(15,4,10)])
TF['Tube top']=mk([(13,3,11),(14,3,11),(15,4,10)],fix=lambda l:put(l,[(13,c) for c in range(3,12)],'+'))
TF['Halter']=mk([(12,5,5),(12,9,9),(13,4,10),(14,4,10),(15,4,10),(16,5,9)])
TF['Mini dress']=mk([(12,4,5),(12,9,10),(13,3,11),(14,3,11),(15,4,10),(16,4,10),(17,4,10),(18,3,11),(19,3,11),(20,2,12),(21,2,12)],fix=lambda l:put(l,[(17,c) for c in range(4,11)],'o'))
TF['Sundress']=mk([(12,4,5),(12,9,10),(13,3,11),(14,3,11),(15,4,10),(16,4,10),(17,4,10),(18,3,11),(19,3,11),(20,2,12),(21,2,12),(22,2,12)],fix=lambda l:(put(l,[(14,5),(16,8),(19,6),(20,4),(21,9),(22,6),(18,10),(20,10)],'w'),put(l,[(15,9),(19,9),(21,5),(22,10),(17,5),(20,7)],'y')))
TF['Bikini top']=mk([(12,5,5),(12,9,9),(13,4,6),(13,8,10),(14,5,5),(14,9,9)],fix=lambda l:put(l,[(14,6),(14,8)],'o'))
TF['Off-shoulder']=mk([(13,2,12),(14,2,12)]+[(r,4,10) for r in range(15,19)]+[(r,1,2) for r in range(15,18)]+[(r,12,13) for r in range(15,18)],fix=lambda l:(put(l,[(13,c) for c in range(2,13)],'o'),put(l,[(17,1),(17,2),(17,12),(17,13)],'o')))
TF['Blouse bow']=mk(torso(16,18),fix=lambda l:(put(l,[(12,6),(12,8)],'p'),put(l,[(12,7)],'r'),put(l,[(13,7)],'p')))
TF['Crop hoodie']=mk([(11,3,4),(11,10,11),(12,2,12),(13,2,12),(14,2,12),(15,4,10),(16,4,10)]+[(r,1,2) for r in range(15,18)]+[(r,12,13) for r in range(15,18)],fix=lambda l:(put(l,[(11,c) for c in range(3,12)],'o'),put(l,[(13,6),(14,6),(13,8),(14,8)],'w'),put(l,[(16,c) for c in range(4,11)],'o'),put(l,[(17,1),(17,2),(17,12),(17,13)],'o')))
TF['Sports bra']=mk([(12,4,4),(12,10,10),(13,4,10),(14,4,10),(15,4,10)],fix=lambda l:(put(l,[(15,c) for c in range(4,11)],'o'),put(l,[(13,7)],'w')))
TF['Long dress']=mk([(12,4,5),(12,9,10),(13,3,11),(14,3,11),(15,4,10),(16,4,10),(17,4,10),(18,3,11),(19,3,11),(20,2,12),(21,2,12),(22,2,12),(23,2,12)],fix=lambda l:(put(l,[(17,c) for c in range(4,11)],'p' if False else 'o'),put(l,[(23,c) for c in range(2,13)],'o')))
TF['Leather crop']=mk([(11,3,4),(11,10,11),(12,2,12),(13,2,12),(14,2,12),(15,4,10)]+[(r,1,2) for r in range(15,18)]+[(r,12,13) for r in range(15,18)],fix=lambda l:(zip_(l,12,15,7),put(l,[(13,6),(13,8)],'o'),put(l,[(17,1),(17,2),(17,12),(17,13)],'o')))
DRESS=['Mini dress','Sundress','Long dress']
# ---------- BOTTOMS ----------
def legs(end,waist=True):
    sp=[(18,5,9),(19,4,10),(20,4,10)] if waist else []
    for r in range(21,end+1): sp+=[(r,4,5),(r,9,10)]
    return sp
BM_={}
BM_['Jeans']=mk(legs(23),fix=lambda l:(put(l,[(18,c) for c in range(5,10)],'o'),put(l,[(19,7),(20,7)],'o')))
BM_['Shorts']=mk(legs(21))
BM_['Skirt']=mk([(18,5,9),(19,4,10),(20,3,11),(21,3,11)],fix=lambda l:put(l,[(18,c) for c in range(5,10)],'o'))
BM_['Track pants']=mk(legs(23),fix=lambda l:(put(l,[(r,4) for r in range(19,24)]+[(r,10) for r in range(19,24)],'w'),put(l,[(18,c) for c in range(5,10)],'o')))
BM_['Belted cargo']=mk(legs(23),fix=lambda l:(put(l,[(18,c) for c in range(5,10)],'k'),put(l,[(18,7)],'y'),put(l,[(22,4),(22,10)],'o')))
BM_['Bermuda']=mk(legs(22),fix=lambda l:put(l,[(18,c) for c in range(5,10)],'o'))
BM_['Pleated skirt']=mk([(18,5,9),(19,4,10),(20,3,11)],fix=lambda l:(put(l,[(20,c) for c in (4,6,8,10)],'o'),put(l,[(19,c) for c in (5,7,9)],'o'),put(l,[(18,c) for c in range(5,10)],'k')))
BM_['Bike shorts']=mk([(18,5,9),(19,4,10),(20,4,10),(21,4,5),(21,9,10)],fix=lambda l:put(l,[(21,4),(21,5),(21,9),(21,10),(18,6),(18,8)],'o'))
BM_['Bikini bottom']=mk([(19,5,9),(20,6,8)])
# ---------- SHOES ----------
def sh(spans,fix=None): return mk(both(spans),fix=fix,shade=False)
SH={}
SH['Sneakers']=sh([(24,3,5),(23,4,5,'w')],fix=lambda l:(put(l,[(24,5),(24,9)],'+'),put(l,[(24,4),(24,10)],'w')))
SH['Boots']=sh([(22,4,5),(23,4,5),(24,3,5)],fix=lambda l:(put(l,[(22,4),(22,5),(22,9),(22,10)],'o'),put(l,[(24,3),(24,11)],'o')))
SH['Sandals']=sh([(24,3,3,'o'),(24,5,5,'o'),(23,4,5,'o')],fix=None)
SH['Loafers']=sh([(24,3,5)],fix=lambda l:put(l,[(24,4),(24,10)],'y'))
SH['High-tops']=sh([(21,4,5,'w'),(22,4,5),(23,4,5),(24,3,5)],fix=lambda l:(put(l,[(22,5),(23,4),(22,9),(23,10)],'w'),put(l,[(24,3),(24,11)],'w')))
# ---------- HATS ----------
HAT={}
HAT['Cap']=mk([(-2,4,10),(-1,3,11),(0,2,12),(1,2,12),(2,1,13,'o'),(3,2,4,'o')],ol=True)
HAT['Trucker']=mk([(-2,4,10,'w'),(-1,3,11,'w'),(0,2,12),(1,2,12),(2,1,13,'o')],ol=True,fix=lambda l:put(l,[(-2,5),(-1,5),(-1,9),(-2,9),(0,7),(-1,7)],'+'))
HAT['Beanie']=mk([(-3,5,9),(-2,3,11),(-1,2,12),(0,2,12),(1,1,13,'o'),(2,1,13,'o')],ol=True,fix=lambda l:put(l,[(-2,c) for c in (4,6,8,10)],'o'))
HAT['Bucket hat']=mk([(-2,4,10),(-1,3,11),(0,2,12),(1,0,14,'o'),(2,1,13,'o')],ol=True)
HAT['Fedora']=mk([(-3,4,10),(-2,3,11),(-1,3,11),(0,3,11,'k'),(1,0,14,'o'),(2,1,13,'o')],ol=True)
HAT['Cowboy']=mk([(-4,4,5),(-4,9,10),(-3,4,10),(-2,3,11),(-1,3,11),(0,3,11,'o'),(1,-1,15,'o'),(0,-1,0,'o'),(0,14,15,'o'),(2,1,13,'o')],ol=True)
HAT['Bandana']=mk([(-1,4,10),(0,3,11),(1,2,12),(2,2,12),(1,13,14),(2,13,14),(3,14,15)],ol=True,fix=lambda l:put(l,[(1,4),(1,7),(1,10),(2,5),(2,9)],'w'))
HAT['Visor']=mk([(0,3,11),(1,2,12),(2,1,13,'o'),(3,2,4,'o')],ol=True)
# ---------- GLASSES ----------
GL={}
def lens(spans,ch): return mk(spans,shade=False)
def box(c0,c1,r0=5,r1=7): return [(r,c0,c1) for r in range(r0,r1+1)]
GL['Aviators']=mk([(r,4,6,'k') for r in (5,6,7)]+[(r,8,10,'k') for r in (5,6,7)]+[(5,7,7,'k')],shade=False,fix=lambda l:put(l,[(5,4),(5,8)],'g'))
GL['Round shades']=mk([(5,4,6,'B'),(6,4,6,'k'),(7,4,6,'k'),(5,8,10,'B'),(6,8,10,'k'),(7,8,10,'k'),(5,7,7,'k')],shade=False,fix=lambda l:put(l,[(5,4),(5,8)],'c'))
GL['Neon hearts']=mk([(5,4,6,'p'),(6,4,6,'p'),(7,5,5,'p'),(5,8,10,'p'),(6,8,10,'p'),(7,9,9,'p'),(5,7,7,'p')],shade=False,fix=lambda l:put(l,[(5,4),(5,8)],'w'))
GL['Visor shades']=mk([(r,3,11,'c') for r in (5,6)]+[(7,4,10,'c')],shade=False,fix=lambda l:put(l,[(5,4),(5,5),(5,8),(5,9)],'w'))
GL['Nerd frames']=mk([(r,3,6,'k') for r in (4,8)][0:0]+[(5,4,6,'k'),(6,4,4,'k'),(6,6,6,'k'),(7,4,6,'k'),(5,8,10,'k'),(6,8,8,'k'),(6,10,10,'k'),(7,8,10,'k'),(5,7,7,'k')],shade=False)
# ---------- BEARDS ----------
BD={}
BD['Stubble']=mk([(8,3,3),(8,11,11),(9,3,4),(9,10,11),(10,5,5),(10,7,7),(10,9,9),(8,5,5),(8,9,9)],shade=False,fix=lambda l:[l.p.__setitem__(k,'o') for k in list(l.p)])
BD['Full beard']=mk([(8,2,3),(8,11,12),(8,4,10),(9,2,5),(9,9,12),(10,3,11),(9,6,8,'K')],tex='line')
BD['Goatee']=mk([(8,5,9),(9,5,5),(9,9,9),(10,5,9),(9,6,8,'K')],shade=False)
BD['Mustache']=mk([(8,4,10),(9,4,4),(9,10,10)],shade=False)
BD['Chinstrap']=mk([(8,2,2),(8,12,12),(9,2,3),(9,11,12),(10,3,11)],shade=False)
BD['Long beard']=mk([(8,2,3),(8,11,12),(8,4,10),(9,2,5),(9,9,12),(10,3,11),(11,4,10),(12,5,9),(13,6,8),(9,6,8,'K')],tex='line')
# ---------- ACCESSORIES ----------
AC={}
AC['Gold chain']=mk([(12,5,6,'y'),(12,8,9,'y'),(13,6,6,'y'),(13,8,8,'y'),(14,7,7,'y')],shade=False,fix=lambda l:put(l,[(13,7)],'y'))
AC['Hoop earrings']=mk([(8,1,1,'y'),(9,1,1,'y'),(8,13,13,'y'),(9,13,13,'y')],shade=False)
AC['Headphones']=mk([(-2,5,9,'k'),(-1,3,4,'k'),(-1,10,11,'k'),(0,2,2,'k'),(0,12,12,'k')]+[(r,1,1,'k') for r in range(1,5)]+[(r,13,13,'k') for r in range(1,5)]+[(r,-1,1,'k') for r in (5,6,7)][0:0]+[(r,0,1,'r') for r in (5,6,7)]+[(r,13,14,'r') for r in (5,6,7)]+[(4,0,1,'k'),(8,0,1,'k'),(4,13,14,'k'),(8,13,14,'k')],shade=False)
AC['Face mask']=mk([(8,4,10,'c'),(9,3,11,'c'),(10,5,9,'c'),(7,2,2,'w'),(7,12,12,'w')],shade=False,fix=lambda l:(put(l,[(9,5),(9,9)],'w'),put(l,[(8,7)],'w')))
AC['Bow tie']=mk([(12,5,6,'r'),(12,8,9,'r'),(12,7,7,'o')],shade=False)
AC['Choker']=mk([(11,5,9,'k'),(12,7,7,'p')],shade=False)
