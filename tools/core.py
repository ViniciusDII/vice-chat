from PIL import Image
import base64, io, json
CW,CH=23,34; OX,OY=4,8   # canvas cell; base placed at (4,8)
PAL={'K':(21,10,20),'w':(245,245,250),'g':(150,160,175),'k':(40,40,50),'y':(255,210,74),'r':(217,50,46),
 'B':(46,111,217),'c':(70,224,255),'p':(255,79,216),'n':(107,67,40),'e':(46,154,90),'O':(242,130,46),
 's':(250,189,143),'d':(237,163,119),'#':(128,128,128),'+':(192,192,192),'o':(64,64,64),'q':(255,150,200),'Y':(255,240,150)}
BASE="""....KKKKKKK....
...KsssssssK...
..KdsssssssdK..
.KdsssssssssdK.
.KdsssssssssdK.
.KdsbKsssKbsdK.
KsKssKsdsKssKsK
KsdssKsdsKssdsK
.KdsssssssssdK.
..KddsKKKsddK..
...KKdddddKK...
...sdKKKKKds...
.KdsssssssssdK.
.KsssssssssssK.
.KsdsdsssdsdsK.
KssKsssssssKssK
KssKsssssssKssK
KssKdssdssdKssK
KddKKbbbbbKKddK
.KKKwwwwwwwKKK.
...KdwwgwwdK...
...KsdKKKddK...
...KssK.KssK...
...KssK.KssK...
..KdsdK.KdsdK..
..KKKKK.KKKKK.."""
BASE=BASE.replace('b','k')   # brow/belt -> near black
class L:
    def __init__(s): s.p={}
    def put(s,r,c,ch):
        if ch!='.': s.p[(r,c)]=ch
    def fill(s,r,c0,c1,ch):
        for c in range(c0,c1+1): s.put(r,c,ch)
    def rows(s,top,strs,left=None):
        for i,t in enumerate(strs):
            assert len(t)%2==1 or left is not None,(t,len(t))
            c0=(7-len(t)//2) if left is None else left
            for j,ch in enumerate(t): s.put(top+i,c0+j,ch)
    def has(s,r,c): return (r,c) in s.p
def base_map():
    m={}
    for r,l in enumerate(BASE.split('\n')):
        for c,ch in enumerate(l):
            if ch!='.': m[(r,c)]=ch
    return m
BM=base_map()
def autoshade(l,tex=None,light=True):
    """# -> + / o by position; only touches '#'."""
    q=dict(l.p)
    for (r,c),ch in l.p.items():
        if ch!='#': continue
        up=(r-1,c) in l.p; dn=(r+1,c) in l.p; lf=(r,c-1) in l.p; rt=(r,c+1) in l.p
        v='#'
        if not dn: v='o'
        elif not rt and (r+c)%2==0: v='o'
        elif not up and light and (c%3==0): v='+'
        elif tex=='curly':
            k=(r*2+c*3)%7
            v='o' if k==0 else '+' if k==3 else '#'
        elif tex=='wave':
            v='o' if (c+r)%4==0 else '+' if (c+r)%4==2 and r<4 else '#'
        elif tex=='line':
            v='o' if c%3==0 else '#'
        elif tex=='dots':
            v='+' if (r+c)%3==0 and not up else '#'
        q[(r,c)]=v
    l.p=q
def outline(l,from_row_body=11):
    """K around layer pixels where neighbour empty in both layer & base; also vs body below chin."""
    add={}
    for (r,c) in list(l.p):
        if l.p[(r,c)]=='K': continue
        for dr,dc in ((1,0),(-1,0),(0,1),(0,-1)):
            n=(r+dr,c+dc)
            if n in l.p: continue
            if n not in BM: add[n]='K'
            elif n[0]>=from_row_body and BM[n]!='K' and BM[n] not in 'wgkd' and False: add[n]='K'
    for k,v in add.items(): l.p[k]=v
def render(l):
    im=Image.new('RGBA',(CW,CH),(0,0,0,0))
    for (r,c),ch in l.p.items():
        x,y=c+OX,r+OY
        if 0<=x<CW and 0<=y<CH: im.putpixel((x,y),PAL[ch]+(255,))
    return im
def base_img():
    l=L()
    for k,v in BM.items(): l.p[k]=v
    return render(l)
