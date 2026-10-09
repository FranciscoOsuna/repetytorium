/* Nawigacja stron zagadnień: menu skokowe na górze + pasek, który wysuwa się po zjechaniu poniżej niego.
   Dane bierze z assets/pytania.js (to samo źródło co index.html). */
(function(){
  if(typeof KATEGORIE==='undefined') return;
  var all=[]; KATEGORIE.forEach(function(c){c.items.forEach(function(it){all.push({n:it.n,t:it.t,file:it.file,cat:c.name});});});
  var avail=all.filter(function(x){return x.file;}).sort(function(a,b){return a.n-b.n;});
  var cur=decodeURIComponent(location.pathname.split('/').pop());
  var idx=-1; avail.forEach(function(x,i){if(x.file===cur)idx=i;});
  if(idx<0) return;
  var me=avail[idx], prev=avail[idx-1], next=avail[idx+1];
  var short=function(t){t=t.replace(/\s+/g,' ');return t.length>64?t.slice(0,62)+'…':t;};
  var esc=function(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');};

  var css=document.createElement('style');
  css.textContent=
  '.jm{display:flex;flex-wrap:wrap;align-items:center;gap:8px 8px;padding:22px 0 0;font-family:var(--mono);font-size:12px}'+
  '.jc{font:inherit;letter-spacing:.1em;text-transform:uppercase;color:var(--mut);text-decoration:none;white-space:nowrap;'+
    'border:1px solid var(--line);background:var(--card);border-radius:2px;padding:6px 11px;cursor:pointer;line-height:1.2}'+
  'a.jc:hover,a.jc:focus-visible,button.jc:hover,.jc:focus-within{color:var(--ink);border-color:var(--ink);outline:none}'+
  '.jc.off{opacity:.35;pointer-events:none}'+
  '.jf{display:inline-flex;align-items:center;gap:6px;margin:0}'+
  '.jf input{font:inherit;width:3.2em;border:0!important;box-shadow:none!important;-webkit-appearance:none;appearance:none;background:transparent!important;color:var(--ink);text-align:center;padding:0;outline:none;-moz-appearance:textfield}'+
  '.jf input::-webkit-outer-spin-button,.jf input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}'+
  '.jf.bad{border-color:var(--rose);color:var(--rose)}'+
  '.jm select.jc{flex:1 1 200px;min-width:0;max-width:100%;text-transform:none;letter-spacing:.02em;padding:6px 8px;color:var(--ink)}'+
  '.jm .secs,#jbar .secs{display:flex;gap:6px}'+
  '.jm .secs{flex:1 0 100%;flex-wrap:wrap;margin-top:4px}'+
  '.secs a{font:inherit;font-size:11.5px;letter-spacing:.04em;color:var(--mut);text-decoration:none;white-space:nowrap;'+
    'border-bottom:1px solid var(--line);padding:2px 1px}'+
  '.secs a:hover,.secs a:focus-visible{color:var(--ink);border-color:var(--ink);outline:none}'+
  '.secs a.on{color:var(--teal);border-color:var(--teal);font-weight:500}'+
  '#jbar{position:fixed;top:0;left:0;right:0;z-index:50;transform:translateY(-105%);transition:transform .18s ease;'+
    'background:color-mix(in srgb,var(--paper) 95%,transparent);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);'+
    'border-bottom:1px solid var(--line);font-family:var(--mono);font-size:12px;visibility:hidden}'+
  '#jbar.on{transform:none;visibility:visible}'+
  '#jbar .in{max-width:860px;margin:0 auto;padding:8px 22px 7px}'+
  '#jbar .r1{display:flex;align-items:center;gap:8px}'+
  '#jbar .jc{padding:4px 9px}'+
  '#jbar .pc{margin-left:auto;color:var(--teal);font-weight:500;font-variant-numeric:tabular-nums}'+
  '#jbar .secs{margin-top:6px;overflow-x:auto;scrollbar-width:none;padding-bottom:2px}'+
  '#jbar .secs::-webkit-scrollbar{display:none}'+
  '#jbar .trk{position:absolute;left:0;right:0;bottom:-1px;height:3px}'+
  '#jbar .trk i{display:block;height:100%;width:0;background:var(--teal)}'+
  'html{scroll-padding-top:var(--jbh,84px)}'+
  '@media (max-width:600px){#jbar .in{padding:7px 16px 6px}.jm{gap:6px}.jm select.jc{flex:1 0 100%}.jm .secs{flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none;padding-bottom:3px}.jm .secs::-webkit-scrollbar{display:none}}'+
  '@media print{#jbar,.jm{display:none}}';
  document.head.appendChild(css);

  // sekcje strony -> chipy
  var heads=[].slice.call(document.querySelectorAll('section > h2'));
  var chips=heads.map(function(h,i){
    if(!h.id) h.id='sek'+(i+1);
    var num=h.querySelector('.num'), nt=num?num.textContent.trim():String(i+1);
    var label=h.textContent.replace(num?num.textContent:'','').trim();
    return {id:h.id,h:h,html:'<a href="#'+h.id+'" title="'+esc(label)+'">'+nt+' '+esc(label.length>34?label.slice(0,32)+'…':label)+'</a>'};
  });
  var secsHtml='<div class="secs">'+chips.map(function(c){return c.html;}).join('')+'</div>';

  function jumpForm(){
    return '<form class="jf jc" autocomplete="off" title="Skocz do zagadnienia o numerze…"><span>nr</span>'+
           '<input type="number" min="1" max="50" inputmode="numeric" placeholder="'+me.n+'" aria-label="Numer zagadnienia"></form>';
  }
  function arrows(){
    return (prev?'<a class="jc" href="'+prev.file+'" title="'+esc(prev.n+'. '+short(prev.t))+'" aria-label="Poprzednie">&lsaquo; '+prev.n+'</a>':'<span class="jc off">&lsaquo;</span>');
  }
  function arrowN(){
    return (next?'<a class="jc" href="'+next.file+'" title="'+esc(next.n+'. '+short(next.t))+'" aria-label="Następne">'+next.n+' &rsaquo;</a>':'<span class="jc off">&rsaquo;</span>');
  }
  function select(){
    var groups={},order=[];
    avail.forEach(function(x){ if(!groups[x.cat]){groups[x.cat]=[];order.push(x.cat);} groups[x.cat].push(x); });
    return '<select class="jc" aria-label="Kategoria i zagadnienie">'+order.map(function(c){
      return '<optgroup label="'+esc(c)+'">'+groups[c].map(function(x){
        return '<option value="'+x.file+'"'+(x.file===cur?' selected':'')+'>'+x.n+' · '+esc(short(x.t))+'</option>';}).join('')+'</optgroup>';
    }).join('')+'</select>';
  }

  // menu skokowe (w miejscu starego .topnav)
  var jm=document.getElementById('jm')||document.querySelector('.topnav');
  if(!jm){jm=document.createElement('nav');(document.querySelector('.wrap')||document.body).insertBefore(jm,(document.querySelector('.wrap')||document.body).firstChild);}
  jm.className='jm'; jm.id='jm'; jm.setAttribute('aria-label','Nawigacja po zagadnieniach');
  jm.innerHTML='<a class="jc" href="index.html">&larr; Lista</a>'+arrows()+jumpForm()+arrowN()+select()+secsHtml;

  // wysuwany pasek
  var bar=document.createElement('div'); bar.id='jbar'; bar.setAttribute('role','navigation'); bar.setAttribute('aria-label','Nawigacja (pasek)');
  bar.innerHTML='<div class="in"><div class="r1"><a class="jc" href="index.html">&larr; Lista</a>'+arrows()+jumpForm()+arrowN()+
    '<span class="pc">0%</span></div>'+secsHtml+'</div><div class="trk"><i></i></div>';
  document.body.appendChild(bar);

  // skok po numerze (oba formularze)
  [].forEach.call(document.querySelectorAll('.jf'),function(f){
    var inp=f.querySelector('input');
    f.addEventListener('submit',function(e){
      e.preventDefault(); var v=parseInt(inp.value,10), t=null;
      avail.forEach(function(x){if(x.n===v)t=x;});
      if(t){ location.href=t.file; return; }
      f.classList.add('bad'); f.title=(v>=1&&v<=50)?'Zagadnienie '+v+' nie jest jeszcze opracowane':'Numer 1–50';
      setTimeout(function(){f.classList.remove('bad');inp.value='';},1400);
    });
  });
  document.querySelector('#jm select').addEventListener('change',function(){location.href=this.value;});

  // scroll: pokaż/ukryj, postęp, aktywna sekcja
  var fill=bar.querySelector('.trk i'), pc=bar.querySelector('.pc'), links=[].slice.call(bar.querySelectorAll('.secs a')),
      inl=[].slice.call(jm.querySelectorAll('.secs a')), tick=false, lastOn=-1;
  function size(){document.documentElement.style.setProperty('--jbh',(bar.offsetHeight+12)+'px');}
  function upd(){
    tick=false;
    var d=document.documentElement, y=window.pageYOffset||d.scrollTop, max=d.scrollHeight-window.innerHeight;
    var p=max>0?Math.min(1,Math.max(0,y/max)):1;
    fill.style.width=(p*100)+'%'; pc.textContent=Math.round(p*100)+'%';
    bar.classList.toggle('on', jm.getBoundingClientRect().bottom<0);
    var on=-1, lim=bar.offsetHeight+24;
    chips.forEach(function(c,i){ if(c.h.getBoundingClientRect().top<=lim) on=i; });
    if(on!==lastOn){
      lastOn=on;
      links.forEach(function(a,i){a.classList.toggle('on',i===on);});
      inl.forEach(function(a,i){a.classList.toggle('on',i===on);});
      var a=links[on]; if(a){var s=a.parentNode; s.scrollLeft=a.offsetLeft-s.clientWidth/2+a.clientWidth/2;}
    }
  }
  function req(){ if(!tick){tick=true;requestAnimationFrame(upd);} }
  window.addEventListener('scroll',req,{passive:true});
  window.addEventListener('resize',function(){size();req();});
  window.addEventListener('load',function(){size();upd();});
  if(document.fonts&&document.fonts.ready) document.fonts.ready.then(function(){size();upd();});
  size(); upd();
})();
