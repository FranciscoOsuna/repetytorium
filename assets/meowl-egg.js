/* Easter egg: biały meowl wychyla się zza dolnej krawędzi strony.
   Wyskakuje, gdy użytkownik dojedzie do końca. Kliknięcie: "hu-miau!". */
(function () {
  if (document.getElementById('meowl-egg')) return;

  var css =
    '.egg{position:relative;height:92px;margin:30px 0 -100px;overflow:hidden;display:flex;justify-content:center;' +
    'align-items:flex-start;cursor:pointer;-webkit-tap-highlight-color:transparent;user-select:none}' +
    '.egg::after{content:"";position:absolute;left:0;right:0;bottom:0;height:2px;background:var(--ink,#141C24)}' +
    '.egg img{width:140px;height:auto;display:block;transform:translateY(108%);' +
    'transition:transform .75s cubic-bezier(.2,.9,.3,1.25)}' +
    '.egg.up img{transform:translateY(0)}' +
    '.egg.up:hover img{transform:translateY(-5px)}' +
    '.egg-bubble{position:absolute;left:calc(50% + 66px);top:10px;font:500 12px/1 var(--mono,ui-monospace,monospace);' +
    'color:var(--ink,#141C24);background:var(--card,#fff);border:1px solid var(--line,#ccc);' +
    'border-radius:10px 10px 10px 2px;padding:7px 10px;white-space:nowrap;opacity:0;' +
    'transform:translateY(6px) scale(.92);transition:opacity .25s,transform .25s;pointer-events:none}' +
    '.egg.talk .egg-bubble{opacity:1;transform:none}' +
    '@media (prefers-reduced-motion:reduce){.egg img,.egg-bubble{transition:none}}';

  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  var box = document.createElement('div');
  box.id = 'meowl-egg';
  box.className = 'egg';
  box.setAttribute('aria-hidden', 'true');
  box.innerHTML = '<span class="egg-bubble">hu-miau!</span>' +
                  '<img src="assets/meowl-peek.png" width="140" height="110" alt="" decoding="async">';
  (document.querySelector('.wrap') || document.body).appendChild(box);

  function up() { box.classList.add('up'); }
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    up();
  } else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { up(); io.disconnect(); } });
    }, { threshold: 0.5 });
    io.observe(box);
  }

  var t;
  box.addEventListener('click', function () {
    box.classList.add('talk');
    clearTimeout(t);
    t = setTimeout(function () { box.classList.remove('talk'); }, 1800);
  });
})();
