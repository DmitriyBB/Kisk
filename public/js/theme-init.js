// Тема ставится до первой отрисовки, чтобы страница не мигала.
(function () {
  var pref = 'auto';
  try {
    pref = localStorage.getItem('kisk.theme') || localStorage.getItem('lozha.theme') || 'auto';
    if (!localStorage.getItem('kisk.theme') && localStorage.getItem('lozha.theme')) localStorage.setItem('kisk.theme', pref);
    var saved = JSON.parse(localStorage.getItem('kisk.preferences') || localStorage.getItem('lozha.preferences') || '{}');
    document.documentElement.dataset.glass = saved.glass === false ? 'off' : 'on';
    document.documentElement.dataset.motion = saved.smoothTransitions === false ? 'off' : 'on';
  } catch (e) {}
  var mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: light)') : null;
  function apply() {
    var light = pref === 'light' || (pref === 'auto' && mq && mq.matches);
    document.documentElement.setAttribute('data-theme', light ? 'light' : 'dark');
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', light ? '#f3f3f3' : '#060606');
  }
  apply();
  if (mq) {
    if (mq.addEventListener) mq.addEventListener('change', apply); else if (mq.addListener) mq.addListener(apply);
  }
  window.__theme = {
    get: function () { return pref; },
    set: function (v) { pref = v; try { localStorage.setItem('kisk.theme', v); } catch (e) {} apply(); },
  };
})();
