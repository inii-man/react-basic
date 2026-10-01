# 🛠️ Panduan Instalasi dan Menjalankan Proyek

Dokumen ini menjelaskan langkah demi langkah cara menyiapkan lingkungan (*environment*), menginstal dependensi, serta menjalankan aplikasi playground React ini di komputer lokal Anda.

---

## 1. Prasyarat Sistem (*Prerequisites*)

Sebelum memulai, pastikan komputer Anda telah terinstal:
- **Node.js**: Versi `18.0.0` atau yang lebih baru (disarankan versi LTS terbaru seperti v20 atau v22).
- **npm** (biasanya otomatis terinstal bersama Node.js) atau **yarn** / **pnpm**.
- Browser modern (Google Chrome, Firefox, Safari, atau Edge).

Untuk memastikan instalasi Node.js dan npm berhasil, jalankan perintah ini di terminal:
```bash
node -v
npm -v
```

---

## 2. Struktur Direktori Proyek

Proyek ini memiliki struktur direktori sebagai berikut:

```text
react/
├── docs/                               # 📖 Dokumentasi mendalam (file .md)
│   ├── README.md                       # Daftar isi dan ringkasan dokumentasi
│   ├── 00-panduan-instalasi-dan-menjalankan.md
│   ├── 01-dasar-react-dan-jsx.md
│   ├── 02-komponen-props-dan-komposisi.md
│   ├── 03-state-event-dan-form.md
│   ├── 04-hooks-dan-sinkronisasi.md
│   ├── 05-data-performa-dan-arsitektur.md
│   ├── 06-proyek-todo-dan-studi-kasus.md
│   ├── 07-kesalahan-umum-dan-solusi.md
│   └── 08-peta-keputusan-dan-glosarium.md
├── src/                                # ⚛️ Source code aplikasi Playground
│   ├── components/                     # Komponen UI dan demo interaktif tiap bab
│   │   ├── Chapter1Basics.jsx          # Demo Bab 1: Dasar & JSX
│   │   ├── Chapter2Components.jsx      # Demo Bab 2: Props & Komposisi
│   │   ├── Chapter3State.jsx           # Demo Bab 3: State & Form
│   │   ├── Chapter4Hooks.jsx           # Demo Bab 4: Hooks & Sinkronisasi
│   │   ├── Chapter5Advanced.jsx        # Demo Bab 5: Data, Performa, Arsitektur
│   │   ├── Chapter6Project.jsx         # Demo Bab 6: Proyek Todo & Tantangan
│   │   ├── DecisionWizard.jsx          # Wizard interaktif Peta Keputusan (Slide 47)
│   │   ├── CommonMistakesSandbox.jsx   # Sandbox simulasi 6 bug umum (Slide 45)
│   │   └── DocsViewerModal.jsx         # Pembaca dokumen Markdown langsung di web
│   ├── data/                           # Data materi 48 slide dan referensi
│   │   └── slidesData.js
│   ├── App.jsx                         # Komponen utama (Layout, Navigasi, Theme)
│   ├── index.css                       # Desain sistem responsif, Dark Mode, Glassmorphism
│   └── main.jsx                        # Entry point React 19
├── index.html                          # Root HTML dengan web fonts dan metadata
├── vite.config.js                      # Konfigurasi Vite & React plugin
├── package.json                        # Konfigurasi dependensi dan script npm
└── React-Indonesia-Simple-Dark-Mode.pptx # File presentasi sumber (48 slide)
```

---

## 3. Langkah Instalasi Dependensi

Jika Anda baru saja meng-clone atau membuka direktori ini pertama kali:

1. Buka Terminal atau Command Prompt, lalu arahkan ke folder proyek:
   ```bash
   cd /Users/sulaimansaleh/Documents/uob-fullstack-mobile/react
   ```

2. Jalankan perintah instalasi dependensi:
   ```bash
   npm install
   ```
   *Dependensi utama yang dipasang meliputi `react`, `react-dom`, `lucide-react` (koleksi ikon modern), serta `vite` sebagai build tool yang super cepat.*

---

## 4. Menjalankan Server Pengembangan (*Development Mode*)

Untuk memulai server pengembangan lokal:
```bash
npm run dev
```

Output di terminal akan menampilkan URL lokal:
```text
  VITE v6.x.x  ready in 180 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

Buka browser dan kunjungi `http://localhost:3000` (atau port yang tertera). Anda akan langsung disuguhi antarmuka web playground interaktif!

Fitur **Hot Module Replacement (HMR)** dari Vite aktif secara default, artinya setiap perubahan kode pada berkas di folder `src/` akan langsung ter-update di layar tanpa perlu me-refresh halaman secara manual.

---

## 5. Membuat Build Produksi (*Production Bundle*)

Jika Anda ingin menguji hasil kompilasi akhir untuk rilis (*production*):
```bash
npm run build
```
Hasil file statis yang telah di-minifikasi dan dioptimasi akan dibuat di folder `dist/`.

Untuk melihat pratinjau hasil build lokal tersebut:
```bash
npm run preview
```

---

## 6. Pemecahan Masalah (*Troubleshooting*)

| Masalah | Penyebab | Solusi |
|---|---|---|
| `Port 3000 is already in use` | Ada aplikasi lain yang menggunakan port 3000 | Ubah port di `vite.config.js` atau biarkan Vite otomatis beralih ke port berikutnya (misal 3001). |
| `Cannot find module 'react'` | Dependensi belum terinstal | Jalankan `npm install` kembali sampai selesai tanpa error. |
| Layar putih (*White screen*) | Terjadi error syntax JavaScript pada browser | Buka browser Console (`F12` atau `Cmd + Option + I`), periksa pesan error merah. |
| Ikon tidak muncul | Paket `lucide-react` bermasalah | Pastikan versi `lucide-react` terpasang dengan benar melalui `npm install lucide-react`. |
