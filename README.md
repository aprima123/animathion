<div align="center">
  
# 📐 ANIMATHION
  
**Visualisasikan Matematika. Pahami Konsepnya. Jangan Cuma Hafal Rumus.**

[![Website](https://img.shields.io/badge/🌐_Buka_Animathion-Live_Demo-60c3ff?style=for-the-badge&logo=github)](https://aprima123.github.io/animathion/)
[![Modules](https://img.shields.io/badge/Modul-5_Interaktif-a3f160?style=for-the-badge)]()
[![Tech](https://img.shields.io/badge/Built_With-HTML5_Canvas_&_Vanilla_JS-ffe566?style=for-the-badge)]()

</div>

---

## 🚀 Tentang Proyek Ini
**Animathion** (*Animation + Math*) adalah platform edukasi matematika interaktif berbasis web yang dirancang untuk memvisualisasikan konsep abstrak secara **real-time**. 

Alih-alih sekadar menghafal rumus statis, pengguna dapat menggeser *slider*, mengubah angka, dan berinteraksi langsung dengan grafik untuk melihat bagaimana perubahan variabel memengaruhi bentuk, sudut, vektor, dan kurva secara langsung[cite: 1, 2, 4, 5, 8].

---

## 📚 Katalog Modul (5 Topik Interaktif)

Seluruh modul sudah aktif dan dapat dieksplorasi langsung:

| Ikon | Modul | Fitur Utama & Visualisasi | File | Status |
| :---: | :--- | :--- | :---: | :---: |
| ⊞ | **Matriks 2×2 & 3×3** | Transformasi ruang 2D & proyeksi 3D kustom, vektor basis ($\hat{i}', \hat{j}', \hat{k}'$), luas/volume determinan, serta *trace*[cite: 4]. | `matriks.html`[cite: 4] | ✅ Live |
| 📈 | **Fungsi Kuadrat** | Kurva parabola dinamis ($y = ax^2 + bx + c$), pelacakan titik puncak, sumbu simetri, serta deteksi akar-akar persamaan ($x_1, x_2$)[cite: 5]. | `kuadrat.html`[cite: 5] | ✅ Live[cite: 8] |
| 🎡 | **Trigonometri** | Sinkronisasi lingkaran satuan dengan gelombang sinus & kosinus, mode putar otomatis, serta nilai 6 rasio trigonometri[cite: 1]. | `trigonometri.html`[cite: 1] | ✅ Live |
| 🪞 | **Geometri Transformasi** | Simulasi Translasi, Rotasi, Dilatasi, dan Refleksi ($X, Y, y=x, y=-x$) pada 4 bangun datar lengkap dengan tabel koordinat[cite: 2]. | `transformasi.html`[cite: 2] | ✅ Live |
| 📐 | **Teorema Pythagoras** | Pembuktian visual luas persegi ($a^2 + b^2 = c^2$), kalkulator pintar dua sisi, dan perhitungan sudut dalam segitiga otomatis[cite: 3]. | `pythagoras.html`[cite: 3] | ✅ Live |

---

## ✨ Keunggulan & Fitur
- **Animasi Interpolasi Halus (*Lerp*):** Transisi perubahan grafik dan vektor dirender mulus menggunakan `requestAnimationFrame`[cite: 1, 2, 4, 8].
- **Custom 3D Projection Engine:** Rendering ruang 3 dimensi pada modul Matriks 3×3 dibangun murni menggunakan matematika proyeksi perspektif di HTML5 Canvas 2D tanpa *library* eksternal[cite: 4].
- **Responsif Desktop & Mobile:** Mendukung kontrol *mouse* (*scroll zoom* & *drag pan*) maupun gestur layar sentuh (*pinch-to-zoom* & *swipe*)[cite: 3, 4, 5, 8].
- **Antarmuka Neo-Brutalism:** Desain kontras tinggi bergaya buku catatan berpetak dengan aksen warna stabilo dan tipografi *Space Grotesk*.

---

## 📂 Struktur Repositori

```text
animathion/
├── index.html          # Halaman utama & katalog modul
├── matriks.html        # Visualizer transformasi matriks 2x2 & 3x3[cite: 4]
├── kuadrat.html        # Visualizer grafik fungsi kuadrat[cite: 5]
├── trigonometri.html   # Visualizer lingkaran satuan & gelombang sin/cos[cite: 1]
├── transformasi.html   # Visualizer geometri transformasi 2D[cite: 2]
├── pythagoras.html     # Visualizer & kalkulator Teorema Pythagoras[cite: 3]
├── about.html          # Halaman profil & kontak pembuat[cite: 7]
└── README.md           # Dokumentasi proyek
