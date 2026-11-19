// Mode Misi: tugas kecil yang dinilai otomatis. Progres disimpan di localStorage (tanpa akun).
const KEY = 'animathion:progress';
const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };
const save = (p) => { try { localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* mode privat: abaikan */ } };
const near = (x, y, t = 0.15) => Math.abs(x - y) <= t;
const sorted3 = (s) => [s.a, s.b, s.c].sort((x, y) => x - y);

const roots = ({ a, b, c }) => {
  const D = b * b - 4 * a * c; if (Math.abs(a) <= 0.05 || D < 0) return null;
  return [(-b - Math.sqrt(D)) / (2 * a), (-b + Math.sqrt(D)) / (2 * a)].sort((x, y) => x - y);
};
const vertex = ({ a, b, c }) => (Math.abs(a) <= 0.05 ? null : [-b / (2 * a), c - b * b / (4 * a)]);
const f = ({ a, b, c }, x) => a * x * x + b * x + c;
const det2 = ([a, b, c, d]) => a * d - b * c;

export const MISSIONS = {
  kuadrat: [
    { id: 'k1', level: '🟢', title: 'Buat parabola yang membuka ke bawah', hints: ['Nilai mana yang mengatur arah buka parabola?', 'Buat a bernilai negatif.'], check: (s) => s.a < -0.05 },
    { id: 'k2', level: '🟢', title: 'Buat parabola yang memotong sumbu X di x = 1 dan x = 3', hints: ['Akar-akarnya muncul sebagai titik kuning di sumbu X.', 'Mulai dari a = 1, lalu atur b dan c sampai kedua titik kuning ada di 1 dan 3.', 'Jawaban: a = 1, b = −4, c = 3.'], check: (s) => { const r = roots(s); return !!r && near(r[0], 1) && near(r[1], 3); } },
    { id: 'k3', level: '🟡', title: 'Buat parabola yang hanya menyinggung sumbu X', hints: ['Menyinggung berarti hanya 1 titik akar. Lihat keterangan di bawah rumus.', 'Diskriminan D = b² − 4ac harus sama dengan 0.', 'Jawaban salah satunya: a = 1, b = −4, c = 4.'], check: (s) => Math.abs(s.a) > 0.05 && Math.abs(s.b * s.b - 4 * s.a * s.c) < 0.02 },
    { id: 'k4', level: '🟡', title: 'Pindahkan puncak parabola ke (−2, 3)', hints: ['Puncak ditandai titik ungu. Rumus x puncak = −b / 2a.', 'Buat parabola membuka ke bawah, lalu atur b agar puncak bergeser ke x = −2, dan c agar naik ke y = 3.', 'Jawaban: a = −1, b = −4, c = −1.'], check: (s) => { const v = vertex(s); return !!v && near(v[0], -2) && near(v[1], 3); } },
    { id: 'k5', level: '🔴', title: 'Buat parabola yang melewati (1, 0), (3, 0), dan (0, 6)', hints: ['Dua titik pertama ada di sumbu X, jadi keduanya adalah akar.', 'Titik (0, 6) berarti c = 6. Akar 1 dan 3 membuat bentuknya a(x−1)(x−3).', 'Jawaban: a = 2, b = −8, c = 6.'], check: (s) => near(f(s, 1), 0) && near(f(s, 3), 0) && near(f(s, 0), 6) },
  ],
  pythagoras: [
    { id: 'p1', level: '🟢', title: 'Alas 6 dan tinggi 8: cari panjang sisi miringnya', hints: ['Isi sisi alas (a) dan sisi tinggi (b).', 'Sisi miring (kotak hijau) terhitung otomatis. Harusnya 10.'], check: (s) => near(s.a, 6, 0.01) && near(s.b, 8, 0.01) && near(s.c, 10, 0.01) },
    { id: 'p2', level: '🟢', title: 'Sisi miring 13 dan alas 5: cari tingginya', hints: ['Isi alas (a) dan sisi miring (c), kosongkan tinggi (b).', 'Kalau b terlanjur terisi, hapus isinya dulu. Harusnya 12.'], check: (s) => near(s.a, 5, 0.01) && near(s.c, 13, 0.01) && near(s.b, 12, 0.01) },
    { id: 'p3', level: '🟡', title: 'Buktikan bahwa 5, 7, 9 bukan segitiga siku-siku', hints: ['Isi ketiga sisi sekaligus: a = 5, b = 7, c = 9.', 'Kalau ketiga kotak terisi, halaman memeriksa apakah a² + b² = c². Di sini 25 + 49 ≠ 81.'], check: (s) => s.own.a && s.own.b && s.own.c && sorted3(s).every((v, i) => near(v, [5, 7, 9][i], 0.01)) },
    { id: 'p4', level: '🟡', title: 'Temukan tripel bilangan bulat siku-siku selain 3-4-5', hints: ['Isi ketiga sisi dengan bilangan bulat, lalu lihat apakah muncul "Siku-siku".', 'Coba gandakan 3-4-5, atau coba 5, 12, 13.', 'Jawaban contoh: 6-8-10, 5-12-13, 8-15-17.'], check: (s) => s.own.a && s.own.b && s.own.c && [s.a, s.b, s.c].every(Number.isInteger) && s.a > 0 && s.b > 0 && s.a * s.a + s.b * s.b === s.c * s.c && !sorted3(s).every((v, i) => v === [3, 4, 5][i]) },
    { id: 'p5', level: '🔴', title: 'Di tab bukti, bongkar segitiga 5-12-13 sampai penuh', hints: ['Isi a = 5 dan b = 12, lalu buka tab "Bukti potong-pindah".', 'Geser slider (atau tekan a² + b²) sampai segitiga selesai dipindah. Luasnya: 25 + 144 = 169.'], check: (s) => s.view === 'bukti' && near(s.a, 5, 0.01) && near(s.b, 12, 0.01) && s.t > 0.95 },
  ],
  transformasi: [
    { id: 't1', level: '🟢', title: 'Geser bangun 4 ke kanan dan 3 ke atas', hints: ['Pakai tab Translasi.', 'Atur Geser Sumbu X = 4 dan Geser Sumbu Y = 3.'], check: (s) => s.mode === 'translasi' && near(s.tx, 4) && near(s.ty, 3) },
    { id: 't2', level: '🟢', title: 'Putar 180°. Pada segitiga, titik B menjadi (−2, 1)', hints: ['Pakai tab Rotasi.', 'Geser sudut sampai 180°, lalu lihat tabel koordinat di bawah kanvas.'], check: (s) => s.mode === 'rotasi' && near(s.rot, 180, 2) },
    { id: 't3', level: '🟡', title: 'Perbesar bangun 2 kali', hints: ['Pakai tab Dilatasi.', 'Faktor skala = 2. Perhatikan luasnya jadi 4 kali, bukan 2 kali.'], check: (s) => s.mode === 'dilatasi' && near(s.dil, 2, 0.06) },
    { id: 't4', level: '🟡', title: 'Cerminkan bangun terhadap garis y = x', hints: ['Pakai tab Refleksi.', 'Pilih "Garis y = x" di daftar sumbu cermin.'], check: (s) => s.mode === 'refleksi' && s.ref === 'y=x' && s.refT > 0.95 },
    { id: 't5', level: '🔴', title: 'Ubah titik A (−1, −1) pada segitiga menjadi A′ (1, 1), dengan cara apa pun', hints: ['Pakai bentuk Segitiga. Titik A ada di pojok kiri bawah.', 'Ada lebih dari satu cara: geser, putar, atau cermin.', 'Jawaban: geser (2, 2), atau rotasi 180°, atau cermin y = −x.'], check: (s) => s.shape === 'segitiga' && near(s.Ap[0], 1) && near(s.Ap[1], 1) },
  ],
  trigonometri: [
    { id: 'g1', level: '🟢', title: 'Temukan sudut dengan sin θ = 0,5', hints: ['Lihat nilai sin(θ) di panel kiri sambil menggeser sudut.', 'Ada dua jawaban: 30° dan 150°.'], check: (s) => near(s.sin, 0.5, 0.02) },
    { id: 'g2', level: '🟢', title: 'Temukan sudut dengan cos θ = 0', hints: ['Cos adalah koordinat mendatar titik di lingkaran.', 'Kapan titik tepat di atas atau di bawah pusat? 90° atau 270°.'], check: (s) => Math.abs(s.cos) < 0.02 },
    { id: 'g3', level: '🟡', title: 'Temukan sudut dengan sin dan cos sama-sama negatif', hints: ['Titik harus ada di bawah dan di kiri pusat lingkaran.', 'Sudut antara 180° dan 270°.'], check: (s) => s.sin < -0.02 && s.cos < -0.02 },
    { id: 'g4', level: '🟡', title: 'Temukan sudut dengan sin θ = cos θ', hints: ['Tinggi dan lebar titik harus sama.', 'Titik ada di diagonal lingkaran: 45° atau 225°.'], check: (s) => Math.abs(s.sin - s.cos) < 0.02 },
    { id: 'g5', level: '🔴', title: 'Di mode unwrap, bentangkan lingkaran sampai θ = π (180°)', hints: ['Buka tab "Unwrap".', 'Atur θ = 180° dan geser slider bentang sampai gelombang (kanan).', 'Panjang busur yang diluruskan sama dengan π ≈ 3,14.'], check: (s) => s.mode === 'unwrap' && s.u > 0.95 && near(s.deg, 180, 3) },
  ],
  matriks: [
    { id: 'm1', app: '2x2', level: '🟢', title: 'Buat matriks 2×2 yang memutar bidang 90°', hints: ['Kolom pertama = ke mana i (1,0) pergi. Kolom kedua = ke mana j (0,1) pergi.', 'i harus pergi ke (0, 1) dan j ke (−1, 0).', 'Jawaban: baris 1 = 0, −1 dan baris 2 = 1, 0.'], check: (s) => s.m2.every((v, i) => near(v, [0, -1, 1, 0][i], 0.05)) },
    { id: 'm2', app: '2x2', level: '🟢', title: 'Buat matriks dengan determinan = 6 (nyalakan Mode Luas)', hints: ['Tekan tombol Mode Luas, lalu lihat angka luasnya.', 'Matriks diagonal mudah: determinan = a × d.', 'Jawaban contoh: 2, 0, 0, 3.'], check: (s) => s.area && near(det2(s.m2), 6, 0.05) },
    { id: 'm3', app: '2x2', level: '🟡', title: 'Gepengkan bidang (determinan 0) tanpa memakai matriks nol', hints: ['Gepeng terjadi saat i′ dan j′ searah.', 'Buat baris kedua kelipatan baris pertama.', 'Jawaban contoh: 1, 2, 2, 4.'], check: (s) => Math.abs(det2(s.m2)) < 0.02 && s.m2.some((v) => Math.abs(v) > 0.05) },
    { id: 'm4', app: '2x2', level: '🟡', title: 'Buat transformasi yang luasnya tetap 1 tapi bentuknya miring', hints: ['Luas tetap berarti determinan = 1.', 'Panah i′ atau j′ tidak boleh sama panjang dengan 1.', 'Coba geser (shear): 1, 1, 0, 1.'], check: (s) => near(det2(s.m2), 1, 0.02) && (Math.abs(Math.hypot(s.m2[0], s.m2[2]) - 1) > 0.05 || Math.abs(Math.hypot(s.m2[1], s.m2[3]) - 1) > 0.05) },
    { id: 'm5', app: '3x3', level: '🔴', title: 'Di 3×3, buat matriks yang hanya memanjangkan sumbu z 3 kali', hints: ['Sumbu x dan y tidak boleh berubah, jadi kolom pertama dan kedua seperti matriks identitas.', 'Hanya kolom ketiga yang berubah: z menjadi 3z.', 'Jawaban: diagonal 1, 1, 3 dan sisanya 0.'], check: (s) => s.m3.every((v, i) => near(v, [1, 0, 0, 0, 1, 0, 0, 0, 3][i], 0.05)) },
  ],
};

/** Jumlah misi selesai / total untuk satu materi (dipakai halaman menu). */
export function getProgress(id) {
  const total = (MISSIONS[id] || []).length, p = load();
  return { total, done: (MISSIONS[id] || []).filter((m) => p[id + '.' + m.id]).length };
}

/** Pasang panel misi ke `container`. getState() mengembalikan nilai TARGET saat ini (bukan yang sedang beranimasi). */
export function initMissions(lessonId, getState, container, filter = () => true) {
  const all = MISSIONS[lessonId], list = all.filter(filter);
  const el = document.createElement('div'); el.className = 'panel missions'; container.appendChild(el);
  const isDone = (m) => !!load()[lessonId + '.' + m.id];
  let active = (list.find((m) => !isDone(m)) || list[0]).id, hintN = 0, streak = 0, toast = false;

  function render() {
    const doneN = all.filter(isDone).length, m = list.find((x) => x.id === active);
    el.innerHTML = `<h2>🎯 Misi <span class="mis-count">${doneN}/${all.length} ⭐</span></h2>` +
      (doneN === all.length ? '<div class="mis-win">🏆 Semua misi materi ini selesai!</div>' : '') +
      `<div class="mis-list">${list.map((x) => `<button class="mis-row${x.id === active ? ' active' : ''}${isDone(x) ? ' done' : ''}" data-id="${x.id}"><span>${x.level}</span><span class="mis-title">${x.title}</span><span>${isDone(x) ? '⭐' : '☆'}</span></button>`).join('')}</div>` +
      (m ? `<div class="mis-hints">${m.hints.slice(0, hintN).map((h) => `<div>💡 ${h}</div>`).join('') || 'Atur nilainya sampai cocok. Misi dinilai otomatis.'}<button class="preset-btn" data-hint ${hintN >= m.hints.length ? 'disabled' : ''}>💡 Bantu aku (${hintN}/${m.hints.length})</button></div>` : '') +
      (toast ? '<div class="mis-toast">⭐ Misi selesai!</div>' : '');
  }
  el.addEventListener('click', (e) => {
    const row = e.target.closest('.mis-row');
    if (row) { active = row.dataset.id; hintN = 0; streak = 0; render(); return; }
    if (e.target.closest('[data-hint]')) { hintN++; render(); }
  });
  function complete(m) {
    const p = load(); p[lessonId + '.' + m.id] = true; save(p); toast = true; render();
    setTimeout(() => { toast = false; const next = list.find((x) => !isDone(x)); if (next) active = next.id; hintN = 0; streak = 0; render(); }, 1400);
  }
  // Dinilai tiap 300 ms; harus cocok 2 kali berturut-turut agar tidak lolos hanya karena slider lewat sekilas.
  setInterval(() => {
    const m = list.find((x) => x.id === active);
    if (!m || toast || isDone(m)) return;
    let ok = false; try { ok = !!m.check(getState()); } catch { ok = false; }
    streak = ok ? streak + 1 : 0; if (streak >= 2) complete(m);
  }, 300);
  render();
}
