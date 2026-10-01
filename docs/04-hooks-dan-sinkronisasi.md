# 📙 Bab 04: Hooks dan Sinkronisasi (Slide 21 – 29)

---

## 1. Aturan Penggunaan Hooks (*Rules of Hooks*) (Slide 21)

Hook adalah fungsi khusus yang memungkinkan Anda menggunakan fitur-fitur React (seperti state dan lifecycle) di dalam function component.

### 2 Aturan Mutlak Hooks:
1. **Panggil Hooks Hanya di Tingkat Teratas (*Top Level*):**
   - ❌ Jangan panggil di dalam perulangan (*loop* `for`, `while`).
   - ❌ Jangan panggil di dalam percabangan (*if*, `switch`).
   - ❌ Jangan panggil di dalam event handler atau fungsi bersarang.
   - Panggilan harus berada sebelum kemungkinan adanya *early return*.
2. **Hanya Panggil Hooks dari Komponen React atau Custom Hook Lainnya.**
3. **Konvensi Penamaan:** Nama fungsi custom hook wajib diawali dengan kata `use` (contoh: `useAuth`, `useCounter`, `useLocalStorage`).

---

## 2. Hook `useEffect` dan Fungsi Cleanup (Slide 22)

`useEffect` digunakan untuk menyinkronkan komponen Anda dengan **sistem di luar React** (*side effects*), seperti:
- Menyetel timer / interval browser (`setInterval`)
- Berlangganan event listener window (`window.addEventListener`)
- Membuka koneksi WebSocket atau WebRTC

```jsx
import { useState, useEffect } from "react";

export default function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // 1. Eksekusi side-effect
    const intervalId = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    // 2. Fungsi Pembersih (Cleanup Function)
    // Dipanggil saat komponen di-unmount atau sebelum effect dijalankan ulang
    return () => {
      clearInterval(intervalId);
    };
  }, []); // [] = hanya berjalan saat mount dan unmount

  return <p>Waktu berjalan: {seconds} detik</p>;
}
```

---

## 3. Memahami Dependency Array (Slide 23)

Array dependensi memberi tahu React kapan `useEffect` harus dijalankan ulang:

| Sintaks | Kapan Dijalankan? | Contoh Kasus |
|---|---|---|
| `useEffect(fn)` *(tanpa array)* | Setelah **setiap render & commit** | Sangat jarang digunakan, hati-hati infinite loop! |
| `useEffect(fn, [])` *(array kosong)* | Hanya **sekali saat pertama kali mount** | Inisialisasi subscription global, timer |
| `useEffect(fn, [roomId, userId])` | Saat mount + **setiap kali nilai `roomId` atau `userId` berubah** | Sinkronisasi koneksi chat per ruang obrolan |

> 💡 **Aturan:** Jangan pernah mengakali linter (*eslint-disable*) untuk menyembunyikan dependensi yang lupa dimasukkan. Masukkan semua nilai reaktif yang dibaca di dalam effect.

---

## 4. Kapan TIDAK Memerlukan `useEffect`? (Slide 24)

Pemula sering kali memasukkan semua logika ke dalam `useEffect`. Padahal, banyak hal yang jauh lebih baik jika **tanpa** Effect:

### Kasus 1: Menghitung Data dari Props atau State
- ❌ **SALAH:** Menjalankan Effect untuk mengubah state nama lengkap saat nama depan berubah.
- ✅ **BENAR:** Hitung langsung saat render:
  ```jsx
  const fullName = firstName + " " + lastName;
  ```

### Kasus 2: Merespons Tindakan Klik Pengguna
- ❌ **SALAH:** Mengubah state `submitted = true` lalu menunggu Effect mendeteksinya untuk kirim API.
- ✅ **BENAR:** Jalankan langsung di dalam event handler:
  ```jsx
  async function handleSave() {
    await saveProfile({ firstName, lastName });
  }
  ```

---

## 5. Pengambilan Data & Mengatasi Race Condition (Slide 25)

Saat mengambil data melalui jaringan internet, request yang dikirim lebih dulu bisa saja tiba lebih lambat dibandingkan request kedua. Tanpa penanganan, data lama yang terlambat datang akan menimpa data terbaru (*race condition*).

### Pola Penanganan yang Benar dengan Flag `ignore`:
```jsx
useEffect(() => {
  let ignore = false;
  setStatus("loading");

  fetchUser(userId)
    .then(data => {
      if (!ignore) {
        setUser(data);
        setStatus("success");
      }
    })
    .catch(err => {
      if (!ignore) setStatus("error");
    });

  // Fungsi cleanup otomatis aktif jika userId berganti sebelum fetch selesai
  return () => {
    ignore = true;
  };
}, [userId]);
```

---

## 6. Hook `useRef` (Slide 26)

`useRef` menyediakan sebuah objek persisten `{ current: ... }` yang bertahan antar-render.

### 2 Perbedaan Kunci `useRef` vs `useState`:
1. Mengubah `ref.current` **TIDAK akan memicu render ulang**.
2. Sangat ideal untuk:
   - Menyimpan referensi elemen HTML DOM langsung (misal: memfokuskan kursor input).
   - Menyimpan ID timer/interval yang perlu dibersihkan nanti.

```jsx
import { useRef } from "react";

export default function SearchBox() {
  const inputRef = useRef(null);

  function handleFocus() {
    // Mengakses DOM langsung dan memanggil method native
    inputRef.current?.focus();
  }

  return (
    <div>
      <input ref={inputRef} placeholder="Ketik kata kunci..." />
      <button onClick={handleFocus}>Beri Fokus</button>
    </div>
  );
}
```

---

## 7. Hook `useReducer` (Slide 27)

Ketika logika perubahan state semakin kompleks (memiliki banyak aksi percabangan atau transisi yang bergantung pada kondisi sebelumnya), `useReducer` membantu memusatkan aturan perubahan state di satu tempat.

```jsx
function counterReducer(state, action) {
  switch (action.type) {
    case "tambah":
      return { count: state.count + (action.step || 1) };
    case "kurang":
      return { count: Math.max(0, state.count - 1) };
    case "reset":
      return { count: 0 };
    default:
      return state;
  }
}

export default function CounterApp() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <p>Nilai: {state.count}</p>
      <button onClick={() => dispatch({ type: "tambah", step: 5 })}>+5</button>
      <button onClick={() => dispatch({ type: "kurang" })}>-1</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
}
```

---

## 8. Context API dan `useContext` (Slide 28)

Context memungkinkan Anda membagikan nilai global (seperti tema gelap/terang, otentikasi login pengguna, atau preferensi bahasa) ke seluruh cabang komponen tanpa harus mengoper props melewati setiap tingkat komponen (*prop drilling*).

```jsx
import { createContext, useContext, useState } from "react";

// 1. Buat Context
const ThemeContext = createContext("dark");

export default function App() {
  const [theme, setTheme] = useState("dark");

  return (
    // 2. Berikan Provider ke pembungkus terluar
    <ThemeContext.Provider value={theme}>
      <button onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}>
        Ganti Tema
      </button>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  return <ThemeDisplay />;
}

function ThemeDisplay() {
  // 3. Baca nilai context langsung di child terdalam
  const theme = useContext(ThemeContext);
  return <p>Tema aktif saat ini: <strong>{theme}</strong></p>;
}
```

---

## 9. Membuat Custom Hook Sendiri (Slide 29)

Jika Anda memiliki logika berbasis Hook yang digunakan di beberapa komponen berbeda, bungkus logika tersebut ke dalam sebuah **Custom Hook**.

```jsx
// Definisi Custom Hook
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}

// Pemakaian di Komponen:
function CounterWidget() {
  const { count, increment, reset } = useCounter(10);

  return (
    <div>
      <span>Skor: {count}</span>
      <button onClick={increment}>Tambah</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```
*Catatan: Setiap pemanggilan custom hook memiliki instance state yang terisolasi sendiri.*
