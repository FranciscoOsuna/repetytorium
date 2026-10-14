import json, sys
from playwright.sync_api import sync_playwright
figs = json.load(open('figs.json'))
only = sys.argv[1:] 
css = open('fig.css').read()
with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/opt/pw-browsers/chromium')
    for theme in ['light','dark']:
        pg = b.new_page(viewport={'width':347,'height':800}, device_scale_factor=2)
        html = f'<html data-theme="{theme}"><head><meta charset="utf-8"><style>{css}</style></head><body>' + ''.join(f'<h4>{k}</h4><figure class="fig" id="f{i}">{v}</figure>' for i,(k,v) in enumerate(figs.items()) if (not only or any(o in k for o in only))) + '</body></html>'
        pg.set_content(html)
        pg.wait_for_timeout(200)
        els = pg.query_selector_all('figure')
        keys = [k for k in figs if (not only or any(o in k for o in only))]
        for k, e in zip(keys, els):
            if theme=='light' or only:
                e.screenshot(path=f'shot_{k}_{theme}.png')
        pg.close()
    b.close()
