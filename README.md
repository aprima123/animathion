<div align="center">

# 📐 ANIMATHION

**Visualisasikan Matematika. Pahami Konsepnya. Jangan Cuma Hafal Rumus.**

[![Website](https://img.shields.io/badge/🌐_Buka_Animathion-di_Sini-blue?style=for-the-badge&logo=github)](https://aprima123.github.io/animathion/)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)]()
[![License](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)]()

</div>

---

## 🚀 Tentang Proyek Ini
**Animathion** (*Animation + Math*) adalah platform visualisasi matematika interaktif berbasis web untuk membantu siswa dan mahasiswa memahami konsep abstrak secara visual dan *real-time*.

Alih-alih sekadar menghafal rumus mati, pengguna bisa menggeser slider variabel, menyorot komponen persamaan, dan melihat langsung bagaimana kurva, vektor, maupun bangun datar ber-**morphing** di atas kanvas.

---

## 📚 Katalog Modul (8 Materi)

| Ikon | Modul | File | Fitur Visualisasi Utama |
| :---: | :--- | :--- | :--- |
| ⊞ | **Matriks 2×2 & 3×3** | `matriks.html` | Transformasi ruang 2D & proyeksi 3D, pergeseran vektor basis `i′`, `j′`, `k′`, determinan, trace, serta **Mode Luas** (`\|ad − bc\|`). |
| 📈 | **Fungsi Kuadrat** | `kuadrat.html` | Eksplorasi parabola `y = ax² + bx + c`, titik puncak, sumbu simetri, akar persamaan, diskriminan, serta *highlight* komponen rumus saat di-*hover*. |
| 🎡 | **Trigonometri** | `trigonometri.html` | Lingkaran satuan `(cos θ, sin θ)`, 6 rasio trigonometri, gelombang sinus-cosinus, serta mode **Unwrap** yang meluruskan busur lingkaran menjadi gelombang. |
| 🪞 | **Geometri Transformasi** | `transformasi.html` | Simulasi translasi, rotasi, dilatasi, dan refleksi pada 4 bangun datar lengkap dengan tabel koordinat `(x, y) → (x′, y′)` otomatis. |
| ↗️ | **Persamaan Linear & Gradien** | `linear.html` | Visualisasi segitiga gradien `m`, titik potong sumbu Y, serta mode dua garis untuk melihat perpotongan sebagai solusi **SPLDV**. |
| 🔁 | **Eksponen & Logaritma** | `eksponen.html` | Membuktikan hubungan invers eksponen dan logaritma lewat slider **Cermin** simetris terhadap garis `y = x`. |
| 🎢 | **Turunan (Kemiringan Kurva)** | `turunan.html` | Pendekatan limit `h → 0` dari garis potong menjadi garis singgung, sekaligus menggambar grafik turunannya `f′(x)` di panel bawah. |
| 📐 | **Teorema Pythagoras** | `pythagoras.html` | Kalkulator 3 sisi otomatis untuk mengecek segitiga siku-siku dan animasi **bukti potong-pindah** `a² + b² = c²`. |

---

## ✨ Fitur Utama
- **🎯 Mode Misi Otomatis (35 Misi):** Tersedia 5 tantangan bertingkat (🟢 Mudah, 🟡 Sedang, 🔴 Sulit) di 7 modul dengan evaluasi otomatis, *hint* bertahap, dan penyimpanan progres di `localStorage` tanpa perlu akun.
- **🎞️ Animasi Morphing & Viewport Interaktif:** Transisi grafik berbasis waktu yang mulus di layar 60Hz maupun 120Hz, mendukung *scroll zoom* dan *drag* di laptop serta *pinch-to-zoom* di layar sentuh.
- **⌨️ Custom Touch Numpad:** Papan angka bawaan khusus perangkat layar sentuh yang dilengkapi tombol tanda negatif (`±`) untuk memudahkan input angka minus di ponsel.
- **🔗 Shareable URL State & Preset:** Perubahan parameter otomatis tersimpan ke *query* URL agar konfigurasi grafik bisa langsung dibagikan lewat tautan, dilengkapi preset *"Coba ini"* dan ringkasan *"Intinya"*.
- **🎨 Desain Neo-Brutalism:** Antarmuka bergaya buku catatan kotak-kotak dengan kontras tinggi dan warna stabilo yang nyaman dibaca.

---

## 🗂️ Struktur Proyek
```text
animathion/
├── index.html          # Halaman utama & katalog modul dengan indikator progres misi
├── about.html          # Halaman profil pembuat
├── lessons.js          # Daftar konfigurasi seluruh modul pelajaran
├── matriks.html        # Modul Matriks 2x2 & 3x3
├── kuadrat.html        # Modul Fungsi Kuadrat
├── trigonometri.html   # Modul Trigonometri & Unwrap
├── transformasi.html   # Modul Geometri Transformasi
├── linear.html         # Modul Persamaan Linear & SPLDV
├── eksponen.html       # Modul Eksponen & Logaritma
├── turunan.html        # Modul Turunan & Garis Singgung
├── pythagoras.html     # Modul Teorema Pythagoras & Bukti Visual
└── shared/
    ├── animathion.css  # Design tokens & komponen UI Neo-Brutalism
    ├── core.js         # Setup Hi-DPI canvas, Smoother, Viewport, & URL state
    ├── missions.js     # Engine evaluasi 35 misi interaktif
    └── numpad.js       # Custom touch number pad dengan tombol ±
