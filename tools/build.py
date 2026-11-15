import json,base64,io,os,shutil
from core import *
import hair as Hh, parts2 as P
from PIL import Image
# ---- catalogue: (id, name, price_cents, layer)
cat={k:[] for k in ['hair','beard','top','bot','shoe','hat','gl','acc']}
cat['hair'].append(('hair_00','Bald',0,L()))
mp=[0,0,0,0,99,99,99,99,149,149,149,149]
for i,(k,l) in enumerate(Hh.HM.items(),1): cat['hair'].append(('hair_m%02d'%i,k+' ♂',mp[i-1],l))
for i,(k,l) in enumerate(Hh.HF.items(),1): cat['hair'].append(('hair_f%02d'%i,k+' ♀',mp[i-1],l))
tp_m=[0,0,0,199,249,299,149,99,99,149,99,199,149]; tp_f=[0,0,0,199,149,99,149,99,149,99,249,249]
for i,(k,l) in enumerate(P.TM.items(),1): cat['top'].append(('top_m%02d'%i,k+' ♂',tp_m[i-1],l))
for i,(k,l) in enumerate(P.TF.items(),1): cat['top'].append(('top_f%02d'%i,k+' ♀',tp_f[i-1],l))
for i,(k,l) in enumerate(P.BM_.items(),1): cat['bot'].append(('bot_%02d'%i,k,0 if i<=4 else 99,l))
for i,(k,l) in enumerate(P.SH.items(),1): cat['shoe'].append(('shoe_%02d'%i,k,0 if i<=3 else 99,l))
cat['hat'].append(('hat_00','None',0,L()))
for i,(k,l) in enumerate(P.HAT.items(),1): cat['hat'].append(('hat_%02d'%i,k,[0,99,0,149,199,249,99,99][i-1],l))
cat['gl'].append(('gl_00','None',0,L()))
for i,(k,l) in enumerate(P.GL.items(),1): cat['gl'].append(('gl_%02d'%i,k,[99,99,149,199,99][i-1],l))
cat['beard'].append(('beard_00','None',0,L()))
for i,(k,l) in enumerate(P.BD.items(),1): cat['beard'].append(('beard_%02d'%i,k,[0,99,0,0,99,149][i-1],l))
cat['acc'].append(('acc_00','None',0,L()))
for i,(k,l) in enumerate(P.AC.items(),1): cat['acc'].append(('acc_%02d'%i,k,[299,99,149,99,99,99][i-1],l))
dress=['top_f%02d'%(list(P.TF).index(k)+1) for k in P.DRESS]
# ---- atlas
items=[('body',base_img())]
os.makedirs('out/layers',exist_ok=True)
S={};idx={'body':0}
for k,lst in cat.items():
    S[k]=[]
    for id,n,pr,l in lst:
        S[k].append([id,n,pr,[]])
        if l.p:
            idx[id]=len(items); items.append((id,render(l)))
            render(l).resize((CW*8,CH*8),Image.NEAREST).save('out/layers/%s.png'%id) if False else None
COLS=16;rows=(len(items)+COLS-1)//COLS
atlas=Image.new('RGBA',(COLS*CW,rows*CH),(0,0,0,0))
for i,(id,im) in enumerate(items): atlas.alpha_composite(im,((i%COLS)*CW,(i//COLS)*CH))
atlas.save('out/atlas.png')
b=io.BytesIO();atlas.save(b,'PNG',optimize=True)
js="// GERADO por build.py - sprites pixel art (corpo-base inquebravel + camadas).\n"
js+="const SPR_CELL=[%d,%d],SPR_COLS=%d,SPR_IDX=%s,DRESS=%s;\n"%(CW,CH,COLS,json.dumps(idx),json.dumps(dress))
js+="const S=%s;\n"%json.dumps(S,ensure_ascii=False)
js+="const SPR_URL='data:image/png;base64,%s';\n"%base64.b64encode(b.getvalue()).decode()
open('out/sprites.js','w',encoding='utf-8').write(js)
print(len(items),atlas.size,len(js)//1024,'KB')
json.dump({k:[(x[0],x[1],x[2]) for x in v] for k,v in S.items()},open('out/catalog.json','w'),ensure_ascii=False,indent=1)
