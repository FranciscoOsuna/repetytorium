import sys
from PIL import Image
theme=sys.argv[1]; names=sys.argv[2:]
ims=[Image.open(f'shot_{n}_{theme}.png') for n in names]
w=sum(i.width for i in ims)+20*(len(ims)-1); h=max(i.height for i in ims)
c=Image.new('RGB',(w,h),'#888'); x=0
for i in ims: c.paste(i,(x,0)); x+=i.width+20
c.save('combo.png'); print(c.size)
