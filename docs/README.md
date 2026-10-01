# ⚛️ Dokumentasi Lengkap Belajar React (Berdasarkan Slide "Memahami React")

Selamat datang di repositori pembelajaran dan playground interaktif **React Indonesia**!
Dokumentasi ini disusun secara terstruktur berdasarkan materi presentasi *"Memahami React: Konsep Inti dan Contoh Kode"*, dilengkapi dengan penjelasan mendalam, contoh kode nyata, jebakan pemula (*common pitfalls*), serta panduan langkah demi langkah.

---

## 📚 Daftar Isi Dokumentasi

| Bab | Berkas Dokumen | Materi Utama | Slide Terkait |
|---|---|---|---|
| **00** | [00-panduan-instalasi-dan-menjalankan.md](file:///Users/sulaimansaleh/Documents/uob-fullstack-mobile/react/docs/00-panduan-instalasi-dan-menjalankan.md) | Cara install Node.js, clone/buka, Vite dev server, build, struktur proyek | Slide 5 |
| **01** | [01-dasar-react-dan-jsx.md](file:///Users/sulaimansaleh/Documents/uob-fullstack-mobile/react/docs/01-dasar-react-dan-jsx.md) | Apa itu React, deklaratif vs imperatif, bekal modern JavaScript, aturan JSX | Slide 1 – 7 |
| **02** | [02-komponen-props-dan-komposisi.md](file:///Users/sulaimansaleh/Documents/uob-fullstack-mobile/react/docs/02-komponen-props-dan-komposisi.md) | Komponen function, props read-only, komposisi `children`, conditional rendering, list & key, event handlers | Slide 8 – 12 |
| **03** | [03-state-event-dan-form.md](file:///Users/sulaimansaleh/Documents/uob-fullstack-mobile/react/docs/03-state-event-dan-form.md) | `useState`, siklus Render & Commit, State sebagai Snapshot, Immutability Object & Array, Derived State, Form Terkontrol, Reset State via Key | Slide 13 – 20 |
| **04** | [04-hooks-dan-sinkronisasi.md](file:///Users/sulaimansaleh/Documents/uob-fullstack-mobile/react/docs/04-hooks-dan-sinkronisasi.md) | Aturan Hooks, `useEffect` & cleanup, kapan HINDARI effect, Race condition data fetching, `useRef`, `useReducer`, `Context API`, Custom Hooks | Slide 21 – 29 |
| **05** | [05-data-performa-dan-arsitektur.md](file:///Users/sulaimansaleh/Documents/uob-fullstack-mobile/react/docs/05-data-performa-dan-arsitektur.md) | `useMemo`, `useCallback`, `React.memo`, `useTransition`, `lazy` & `Suspense`, Error Boundary, Modern Form Actions (React 19), CSR vs SSR vs RSC, TypeScript, A11y & Testing | Slide 30 – 40 |
| **06** | [06-proyek-todo-dan-studi-kasus.md](file:///Users/sulaimansaleh/Documents/uob-fullstack-mobile/react/docs/06-proyek-todo-dan-studi-kasus.md) | Bedah kode proyek Daftar Tugas (Slide 41-44), refactoring modular, custom hook `useTasks`, filter, localStorage | Slide 41 – 44, 46 |
| **07** | [07-kesalahan-umum-dan-solusi.md](file:///Users/sulaimansaleh/Documents/uob-fullstack-mobile/react/docs/07-kesalahan-umum-dan-solusi.md) | Analisis 6 kesalahan paling fatal: mutasi state langsung, infinite re-render, stale closure, index sebagai key, effect 2x StrictMode, input terkunci | Slide 45 |
| **08** | [08-peta-keputusan-dan-glosarium.md](file:///Users/sulaimansaleh/Documents/uob-fullstack-mobile/react/docs/08-peta-keputusan-dan-glosarium.md) | Peta keputusan sehari-hari ("Kapan pakai apa?"), Hook Cheat Sheet, dan Glosarium Istilah React A-Z | Slide 47 – 48 |
| **09** | [09-panduan-lengkap-redux-dan-toolkit.md](file:///Users/sulaimansaleh/Documents/uob-fullstack-mobile/react/docs/09-panduan-lengkap-redux-dan-toolkit.md) | Panduan lengkap Redux & Redux Toolkit (RTK): Store, Slice, Dispatch, Selector, Thunk async, & Time-Travel Debug | Materi Lanjutan |

---

## 🚀 Membuka & Mencoba Web Playground

Proyek ini telah dilengkapi dengan aplikasi web interaktif yang siap dijalankan di browser:
```bash
# 1. Jalankan development server
npm run dev

# 2. Buka URL yang muncul di terminal (biasanya http://localhost:3000)
```
Di web playground, Anda dapat langsung mencoba setiap kode dari slide, melihat hasil render seketika, mengubah parameter, serta menguji simulasi bug dan solusinya secara visual!
