const defaults = { glass: true, smoothTransitions: true, optimizedSync: true };
let values = { ...defaults };

function load() {
  try {
    let raw = localStorage.getItem('kisk.preferences');
    if (!raw) {
      raw = localStorage.getItem('lozha.preferences');
      if (raw) localStorage.setItem('kisk.preferences', raw);
    }
    const saved = JSON.parse(raw || '{}');
    values = { ...defaults, ...saved };
  } catch { values = { ...defaults }; }
  apply();
}

function apply() {
  document.documentElement.dataset.glass = values.glass ? 'on' : 'off';
  document.documentElement.dataset.motion = values.smoothTransitions ? 'on' : 'off';
}

load();
window.addEventListener('storage', (e) => { if (e.key === 'kisk.preferences') load(); });

export const getPreference = (key) => values[key] ?? defaults[key];
export const setPreference = (key, value) => {
  if (!(key in defaults)) return;
  values = { ...values, [key]: !!value };
  apply();
  try { localStorage.setItem('kisk.preferences', JSON.stringify(values)); } catch {}
};
