// Animathion core: canvas hi-dpi, animasi berbasis waktu, viewport (zoom/pan/pinch), grid.

/** Canvas tajam di layar retina. Koordinat logis tetap W x H. */
export function setupCanvas(cv, W = 600, H = W) {
  const dpr = Math.min(window.devicePixelRatio || 1, 3);
  cv.width = W * dpr; cv.height = H * dpr;
  const ctx = cv.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, W, H };
}

/** Morphing: nilai `cur` meluncur ke `tgt`, kecepatan sama di layar 60 Hz maupun 120 Hz. */
export class Smoother {
  constructor(init, draw, { rate = 10, eps = 0.005 } = {}) {
    this.cur = { ...init }; this.tgt = { ...init };
    this.draw = draw; this.rate = rate; this.eps = eps; this.raf = 0; this.last = 0;
  }
  set(t) {
    Object.assign(this.tgt, t);
    if (!this.raf) { this.last = performance.now(); this.raf = requestAnimationFrame(this._tick); }
  }
  redraw() { this.draw(this.cur); }
  _tick = (now) => {
    const dt = Math.min((now - this.last) / 1000, 0.05); this.last = now;
    const k = 1 - Math.exp(-this.rate * dt); let moving = false;
    for (const key in this.tgt) {
      const d = this.tgt[key] - this.cur[key];
      if (Math.abs(d) > this.eps) { this.cur[key] += d * k; moving = true; } else this.cur[key] = this.tgt[key];
    }
    this.draw(this.cur);
    this.raf = moving ? requestAnimationFrame(this._tick) : 0;
  };
}

/** Kamera 2D: world <-> pixel, zoom ke arah kursor, drag, pinch (pointer events: mouse + sentuh). */
export class Viewport {
  constructor(W, H, { scale = 40, min = 2, max = 200 } = {}) {
    this.W = W; this.H = H; this.s0 = scale; this.min = min; this.max = max; this.reset();
  }
  reset() { this.scale = this.s0; this.cx = this.W / 2; this.cy = this.H / 2; }
  w2p(x, y) { return [this.cx + x * this.scale, this.cy - y * this.scale]; }
  p2w(px, py) { return [(px - this.cx) / this.scale, (this.cy - py) / this.scale]; }
  zoomAt(mx, my, f) {
    const [wx, wy] = this.p2w(mx, my);
    this.scale = Math.max(this.min, Math.min(this.max, this.scale * f));
    this.cx = mx - wx * this.scale; this.cy = my + wy * this.scale;
  }
  attach(cv, onChange, { zin, zout, reset } = {}) {
    const pts = new Map();
    const pos = (e) => { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) * this.W / r.width, (e.clientY - r.top) * this.H / r.height]; };
    cv.addEventListener('pointerdown', (e) => { cv.setPointerCapture(e.pointerId); pts.set(e.pointerId, pos(e)); });
    cv.addEventListener('pointermove', (e) => {
      if (!pts.has(e.pointerId)) return;
      const p = pos(e), o = pts.get(e.pointerId);
      if (pts.size === 1) { this.cx += p[0] - o[0]; this.cy += p[1] - o[1]; }
      else if (pts.size === 2) {
        const q = [...pts.entries()].find(([id]) => id !== e.pointerId)[1];
        const d0 = Math.hypot(o[0] - q[0], o[1] - q[1]), d1 = Math.hypot(p[0] - q[0], p[1] - q[1]);
        if (d0 > 0) this.zoomAt((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, d1 / d0);
      }
      pts.set(e.pointerId, p); onChange();
    });
    for (const t of ['pointerup', 'pointercancel']) cv.addEventListener(t, (e) => pts.delete(e.pointerId));
    cv.addEventListener('wheel', (e) => { e.preventDefault(); const [mx, my] = pos(e); this.zoomAt(mx, my, e.deltaY < 0 ? 1.15 : 1 / 1.15); onChange(); }, { passive: false });
    if (zin) zin.onclick = () => { this.zoomAt(this.W / 2, this.H / 2, 1.25); onChange(); };
    if (zout) zout.onclick = () => { this.zoomAt(this.W / 2, this.H / 2, 1 / 1.25); onChange(); };
    if (reset) reset.onclick = () => { this.reset(); onChange(); };
  }
}

/** Grid + sumbu, selalu sejajar dengan titik asal (0,0) di zoom berapa pun. */
export function drawGrid(ctx, vp, { grid = '#e0e0e0', axis = '#111' } = {}) {
  ctx.clearRect(0, 0, vp.W, vp.H);
  const [x0, yTop] = vp.p2w(0, 0), [x1, yBot] = vp.p2w(vp.W, vp.H);
  const step = vp.scale < 12 ? 5 : 1;
  ctx.strokeStyle = grid; ctx.lineWidth = 1; ctx.beginPath();
  for (let i = Math.ceil(x0 / step) * step; i <= x1; i += step) { const [px] = vp.w2p(i, 0); ctx.moveTo(px, 0); ctx.lineTo(px, vp.H); }
  for (let j = Math.ceil(yBot / step) * step; j <= yTop; j += step) { const [, py] = vp.w2p(0, j); ctx.moveTo(0, py); ctx.lineTo(vp.W, py); }
  ctx.stroke();
  ctx.strokeStyle = axis; ctx.lineWidth = 2; ctx.beginPath();
  ctx.moveTo(0, vp.cy); ctx.lineTo(vp.W, vp.cy); ctx.moveTo(vp.cx, 0); ctx.lineTo(vp.cx, vp.H); ctx.stroke();
}

export const fmt = (n, d = 1) => (Math.abs(n) < 0.5 * 10 ** -d ? 0 : n).toFixed(d);

// ---------- Fase 2: URL state, banner "intinya", preset ----------
/** Baca state dari URL (?a=1&b=2) sebagai objek string. */
export const readState = () => Object.fromEntries(new URLSearchParams(location.search));
/** Tulis state ke URL tanpa reload, supaya kondisi apa pun bisa dibagikan lewat tautan. */
export function writeState(obj) {
  const q = new URLSearchParams();
  for (const k in obj) if (obj[k] !== undefined && obj[k] !== '') q.set(k, obj[k]);
  const s = q.toString();
  history.replaceState(null, '', location.pathname + (s ? '?' + s : '') + location.hash);
}
/** Banner "Intinya" di atas semua panel. `html` boleh memuat <b>. */
export function addBanner(html, container = document.querySelector('.app-container')) {
  const d = document.createElement('div'); d.className = 'banner';
  d.innerHTML = `<span class="banner-tag">💡 INTINYA</span><span>${html}</span>`;
  container.prepend(d); return d;
}
/** Deretan tombol preset. onPick(item) dipanggil saat tombol ditekan. */
export function addPresets(host, list, onPick, before = null) {
  const d = document.createElement('div'); d.className = 'presets';
  d.innerHTML = '<div class="presets-title">Coba ini:</div>';
  list.forEach((p) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'preset-btn'; b.textContent = p.label; b.onclick = () => onPick(p); d.appendChild(b); });
  host.insertBefore(d, before); return d;
}
