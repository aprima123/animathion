// Number pad bawaan Animathion untuk layar sentuh. Tema senada, tidak mengubah tata letak halaman,
// dan punya tombol minus (keypad angka iPhone tidak punya). Di laptop (kursor biasa) tidak aktif sama sekali.
let panel = null, cur = null, fresh = false, shown = false;
const reg = new Map(); // input -> { group, opts, label }
const isTouch = () => matchMedia('(pointer: coarse)').matches;

const KEYS = [['7', '8', '9', 'del'], ['4', '5', '6', 'neg'], ['1', '2', '3', 'next'], ['0', '.', 'done']];
const LABEL = { del: '⌫', neg: '±', next: 'Lanjut ▶', done: 'Selesai ✓' };

function build() {
  panel = document.createElement('div'); panel.className = 'numpad'; panel.setAttribute('role', 'group'); panel.setAttribute('aria-label', 'Papan angka');
  panel.innerHTML = '<div class="np-top"><span id="np-label"></span><span class="np-display" id="np-display"></span></div><div class="np-grid"></div>';
  const grid = panel.querySelector('.np-grid');
  KEYS.flat().forEach((k) => {
    const b = document.createElement('button'); b.type = 'button'; b.dataset.k = k; b.className = 'np-key' + (k === '0' ? ' zero' : '') + (k === 'del' || k === 'neg' ? ' fn' : '') + (k === 'next' ? ' nx' : '') + (k === 'done' ? ' ok' : '');
    b.textContent = LABEL[k] || k; grid.appendChild(b);
  });
  panel.addEventListener('mousedown', (e) => e.preventDefault()); // jangan rebut fokus dari input
  panel.addEventListener('click', (e) => { const b = e.target.closest('.np-key'); if (b) press(b.dataset.k); });
  document.body.appendChild(panel);
  document.addEventListener('pointerdown', (e) => { if (shown && !panel.contains(e.target) && !reg.has(e.target)) close(); }, true);
}

function refresh() {
  if (!cur) return;
  const info = reg.get(cur);
  panel.querySelector('#np-label').textContent = info.label;
  panel.querySelector('#np-display').textContent = cur.value === '' ? '—' : cur.value;
  panel.querySelector('[data-k="neg"]').disabled = !info.opts.allowNegative;
  reg.forEach((_, el) => { el.classList.toggle('np-active', el === cur); el.classList.toggle('np-fresh', el === cur && fresh); });
}

function open(el) {
  cur = el; fresh = true; shown = true; panel.classList.add('show'); refresh();
  requestAnimationFrame(() => { // sediakan ruang gulir di bawah (tanpa menggeser isi halaman), lalu pastikan input terlihat
    const h = panel.offsetHeight; document.documentElement.style.paddingBottom = h + 'px';
    const r = el.getBoundingClientRect(), limit = innerHeight - h - 12;
    if (r.bottom > limit) scrollBy({ top: r.bottom - limit }); else if (r.top < 12) scrollBy({ top: r.top - 12 });
  });
}
function close() {
  shown = false; panel.classList.remove('show'); document.documentElement.style.paddingBottom = '';
  if (cur) { cur.classList.remove('np-active', 'np-fresh'); cur.blur(); } cur = null;
}

function press(k) {
  const el = cur; if (!el) return;
  const info = reg.get(el); let v = el.value, edited = true;
  if (/^\d$/.test(k)) v = fresh || v === '0' ? k : (v.length < 9 ? v + k : v);
  else if (k === '.') { let base = fresh ? '' : v; if (base.includes('.')) return; if (base === '' || base === '-') base += '0'; v = base + '.'; }
  else if (k === 'neg') { if (!info.opts.allowNegative) return; v = fresh ? '-' : (v.startsWith('-') ? v.slice(1) : '-' + v); } // baru diketuk: ± memulai angka negatif baru
  else if (k === 'del') v = fresh ? '' : v.slice(0, -1);
  else if (k === 'next') { const nx = info.group[info.group.indexOf(el) + 1]; if (nx) nx.focus({ preventScroll: true }); else close(); return; }
  else if (k === 'done') { close(); return; }
  fresh = false; el.value = v;
  el.dispatchEvent(new Event('input', { bubbles: true }));
  el.focus({ preventScroll: true }); refresh();
}

/** Pasang number pad ke sekelompok input. opts: { allowNegative, labels[] | labelFn(i), force }. Mengembalikan true bila aktif. */
export function attachNumpad(els, opts = {}) {
  if (!isTouch() && !opts.force) return false;
  els = [...els]; if (!panel) build();
  els.forEach((el, i) => {
    el.type = 'text'; el.setAttribute('inputmode', 'none'); el.setAttribute('autocomplete', 'off'); el.classList.add('np-input');
    reg.set(el, { group: els, opts, label: opts.labels ? opts.labels[i] : opts.labelFn ? opts.labelFn(i) : el.id });
    el.addEventListener('focus', () => open(el));
    el.addEventListener('click', () => { if (cur === el) { fresh = true; refresh(); } else open(el); }); // ketuk ulang: mode ganti nilai
  });
  return true;
}
