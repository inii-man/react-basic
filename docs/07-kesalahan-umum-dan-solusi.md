# ⚠️ Bab 07: Kesalahan yang Sering Muncul & Solusinya (Slide 45)

Dokumen ini membedah 6 kesalahan fatal (*common bugs*) yang paling sering ditemui dalam pengembangan aplikasi React beserta diagnosis dan solusi konkretnya.

---

## 1. UI Tidak Berubah Setelah Data Diubah (*State Mutation*)

### Gejala:
Anda mengubah data di state, fungsi dijalankan tanpa pesan error, tetapi tampilan di browser sama sekali tidak berubah.

### Penyebab:
Memodifikasi (*mutating*) object atau array state secara langsung. React membandingkan state lama dan state baru menggunakan perbandingan referensi memori (*Object.is*). Jika referensi memorinya sama, React menganggap tidak ada perubahan dan membatalkan render.

```javascript
// ❌ KODE RUSAK (Mutasi Langsung)
const [user, setUser] = useState({ name: "Budi", score: 10 });

function updateScore() {
  user.score = 20; // ⚠️ Memodifikasi object yang sama!
  setUser(user);   // Referensi memori tidak berubah -> UI TIDAK DI-RENDER!
}
```

### ✅ Solusi: Buat Salinan Baru (Immutable Update)
```javascript
// ✅ KODE BENAR
function updateScore() {
  setUser(prevUser => ({
    ...prevUser,
    score: 20 // Membuat objek baru dengan referensi memori baru
  }));
}
```

---

## 2. Render Tanpa Henti (*Infinite Re-render Loop*)

### Gejala:
Browser macet (*hang*), konsol browser dibanjiri pesan error:
`Too many re-renders. React limits the number of renders to prevent an infinite loop.`

### 2 Penyebab Utama:

#### Penyebab A: Memanggil Setter Langsung Saat Render (Bukan di Event Handler)
```jsx
// ❌ SALAH: Memanggil setCount langsung di badan fungsi
function BadComponent() {
  const [count, setCount] = useState(0);
  setCount(1); // Memicu re-render -> jalankan lagi -> panggil setCount lagi -> LOOP!
  return <div>{count}</div>;
}

// ❌ SALAH: Menulis fungsi dengan tanda kurung () di onClick
<button onClick={setCount(count + 1)}>Klik</button> // Dieksekusi langsung saat render!
```

#### Penyebab B: `useEffect` Memperbarui Dependensinya Sendiri
```jsx
// ❌ SALAH: Effect mengubah state yang ada di daftar dependensinya tanpa kondisi henti
useEffect(() => {
  setCount(c => c + 1);
}, [count]); // Setiap count berubah -> Effect jalan lagi -> setCount -> LOOP!
```

### ✅ Solusi:
- Pastikan event handler membungkus setter dalam arrow function: `onClick={() => setCount(c => c + 1)}`.
- Periksa dependensi `useEffect`, hindari mengubah state yang diobservasi oleh effect tersebut tanpa *termination condition*.

---

## 3. Nilai Lama / Basi (*Stale Closures & Snapshot*)

### Gejala:
Timer atau fungsi async membaca nilai variabel state yang sudah usang, bukan nilai yang terbaru di layar.

### Penyebab:
Di JavaScript, fungsi menangkap variabel di sekitarnya pada saat fungsi tersebut dibuat (*closure*). Jika callback async atau interval dibuat pada render pertama, fungsi itu akan terus mengingat nilai state pada saat render pertama tersebut.

```jsx
// ❌ SALAH
useEffect(() => {
  const timer = setInterval(() => {
    // Selalu membaca 'count' = 0 dari snapshot awal!
    setCount(count + 1); 
  }, 1000);
  return () => clearInterval(timer);
}, []); // count tidak bertambah lebih dari 1!
```

### ✅ Solusi:
Gunakan **Updater Function** `setCount(c => c + 1)` atau simpan nilai persisten ke dalam `useRef` jika dibutuhkan oleh callback async.

---

## 4. State Elemen List Tertukar Saat Dihapus (*Unstable Keys*)

### Gejala:
Ketika Anda memiliki daftar item dengan input teks atau checkbox, lalu Anda menghapus item pertama, teks input atau centang pada item pertama malah berpindah ke item kedua!

### Penyebab:
Menggunakan `index` array sebagai prop `key`:
```jsx
// ❌ SALAH
{tasks.map((task, index) => (
  <li key={index}>
    <input type="checkbox" />
    <span>{task.title}</span>
  </li>
))}
```
Saat item index 0 dihapus, item kedua kini menjadi index 0. React mengira elemen DOM pertama masih ada dan hanya mengubah teksnya, sementara state DOM internal checkbox/input tidak di-reset!

### ✅ Solusi:
Selalu gunakan identitas unik dari data (`task.id`), bukan urutan index:
```jsx
// ✅ BENAR
{tasks.map(task => (
  <li key={task.id}>
    <input type="checkbox" />
    <span>{task.title}</span>
  </li>
))}
```

---

## 5. Effect Berjalan Dua Kali Saat Mode Development

### Gejala:
`console.log` di dalam `useEffect` muncul 2 kali berturut-turut saat halaman pertama kali dibuka di browser.

### Penyebab:
Di React 18 & 19, **React StrictMode** (`<React.StrictMode>`) sengaja me-mount, unmount, dan me-mount ulang setiap komponen sekali lagi pada fase pengembangan (*development mode*). Tujuannya adalah untuk membantu Anda mendeteksi efek samping yang lupa dibersihkan (*missing cleanup*).

### ✅ Solusi:
- Ini adalah perilaku normal dan **TIDAK akan terjadi di mode produksi (*production build*)**.
- Pastikan setiap `useEffect` memiliki fungsi *cleanup* yang tepat (seperti `clearInterval`, `removeEventListener`, atau abort controller).

---

## 6. Input Formulir Terkunci / Tidak Bisa Diketik (*Locked Input*)

### Gejala:
Pengguna mencoba mengetik di kolom input teks formulir, tetapi hurufnya sama sekali tidak muncul atau tidak bisa dihapus.

### Penyebab:
Memberikan atribut `value` tetap dari state, tetapi lupa memberikan event handler `onChange`:
```jsx
// ❌ SALAH: Terkunci permanen pada "Budi"
<input value="Budi" />

// ❌ SALAH: Membaca state name tapi tidak ada handler untuk memperbaruinya
<input value={name} />
```

### ✅ Solusi:
Pasangkan selalu properti `value` dengan `onChange`:
```jsx
// ✅ BENAR
<input
  value={name}
  onChange={e => setName(e.target.value)}
/>
```
*(Atau gunakan atribut `defaultValue` jika ingin form tak terkontrol / uncontrolled input).*
