# 📕 Bab 05: Data, Performa, dan Arsitektur (Slide 30 – 40)

---

## 1. Optimasi Performa: `useMemo`, `useCallback`, dan `React.memo` (Slide 30)

Sebelum menambahkan optimasi memoization, **selalu ukur performa terlebih dahulu**. Jangan melakukan optimasi prematur karena memoization sendiri memiliki overhead memori.

### A. `useMemo` (Menyimpan Hasil Komputasi Berat)
Menghindari eksekusi ulang perhitungan matematika atau filter data array besar jika dependensinya tidak berubah:
```jsx
const filteredList = useMemo(() => {
  return heavyCalculationOrFilter(items, searchQuery);
}, [items, searchQuery]);
```

### B. `useCallback` (Menjaga Referensi Fungsi Tetap Stabil)
Mencegah pembuatan ulang referensi fungsi baru di setiap render (sangat penting jika fungsi dioper ke child yang dibungkus `memo`):
```jsx
const handleSelectItem = useCallback((id) => {
  setSelectedId(id);
}, []); // Referensi fungsi tetap stabil
```

### C. `React.memo` (Melewati Render Komponen Anak)
Mencegah komponen child dirender ulang jika nilai props yang diterimanya sama persis dengan render sebelumnya:
```jsx
const TaskItem = React.memo(function TaskItem({ title, done, onToggle }) {
  return (
    <li>
      <input type="checkbox" checked={done} onChange={onToggle} />
      <span>{title}</span>
    </li>
  );
});
```

---

## 2. Responsivitas dengan `useTransition` & `useDeferredValue` (Slide 31)

Ketika pengguna mengetik di input pencarian, mengetik adalah tindakan yang sangat mendesak (*urgent*). Jika pemfilteran 10.000 data dijalankan serentak, input akan terasa macet (*laggy*).

Dengan `useTransition`, Anda dapat memisahkan update mendesak dari update berat (*non-urgent*):

```jsx
import { useState, useTransition } from "react";

export default function SearchPage() {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleChange(e) {
    const nextValue = e.target.value;
    
    // 1. Update mendesak (input teks tetap responsif seketika!)
    setInput(nextValue);

    // 2. Tandai komputasi berat sebagai transisi non-urgent
    startTransition(() => {
      setQuery(nextValue);
    });
  }

  return (
    <div>
      <input value={input} onChange={handleChange} />
      {isPending && <span className="spinner">Menyaring data...</span>}
      <HeavyList query={query} />
    </div>
  );
}
```

---

## 3. Code Splitting: `lazy` dan `Suspense` (Slide 32)

Daripada memuat seluruh bundle JavaScript aplikasi di awal yang membuat loading lambat, `lazy()` memungkinkan pemuatan komponen hanya saat dibutuhkan (*on-demand*):

```jsx
import { lazy, Suspense } from "react";

// Impor komponen secara dinamis (akan dibuat chunk terpisah)
const ReportsModal = lazy(() => import("./ReportsModal.jsx"));

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Buka Laporan</button>

      {isOpen && (
        <Suspense fallback={<div className="skeleton">Memuat berkas laporan...</div>}>
          <ReportsModal />
        </Suspense>
      )}
    </div>
  );
}
```

---

## 4. Error Boundary (Slide 33)

Jika salah satu komponen mengalami crash saat render, secara default seluruh halaman React bisa menjadi layar putih kosong. **Error Boundary** membungkus pohon komponen dan menampilkan UI cadangan (*fallback*) jika terjadi kegagalan.

```jsx
import React from "react";

export class ErrorBoundary extends React.Component {
  state = { hasError: false, errorMessage: "" };

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Tertangkap oleh ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-card">
          <h3>Terjadi kesalahan pada modul ini.</h3>
          <p>{this.state.errorMessage}</p>
          <button onClick={() => this.setState({ hasError: false })}>Coba Lagi</button>
        </div>
      );
    }
    return this.props.children;
  }
}
```
> ⚠️ **Catatan:** Error Boundary menangkap error saat fase render & lifecycle, **bukan** error di dalam event handler (gunakan `try...catch` biasa untuk event handler).

---

## 5. Hook Khusus Lainnya (Slide 34)

| Hook | Fungsi Utama | Kapan Digunakan? |
|---|---|---|
| `useId()` | Menghasilkan ID unik yang konsisten antara SSR dan client | Menghubungkan label form `<label htmlFor={id}>` dengan `<input id={id}>` |
| `useLayoutEffect()` | Berjalan sinkron tepat setelah DOM berubah, sebelum browser melukis | Mengukur dimensi layout DOM (posisi tooltip/popover) |
| `useImperativeHandle()` | Mengatur method kustom yang diekspos melalui `ref` | Membuat API komponen ref yang terbatas dan aman |
| `useSyncExternalStore()` | Berlangganan ke external store di luar React | Pembuat library state management (Zustand, Redux) |

---

## 6. Form Actions pada React Modern (React 19) (Slide 35)

React 19 memperkenalkan integrasi formulir tingkat tinggi dengan konsep *Actions*:

```jsx
import { useActionState } from "react";

// Server Action atau Async Function
async function submitNameAction(previousState, formData) {
  const name = formData.get("name");
  await new Promise(r => setTimeout(r, 1000)); // Simulasi API
  return { message: `Berhasil disimpan: ${name}` };
}

export default function ModernForm() {
  const [state, formAction, isPending] = useActionState(submitNameAction, null);

  return (
    <form action={formAction}>
      <input name="name" required placeholder="Nama lengkap..." />
      <button type="submit" disabled={isPending}>
        {isPending ? "Menyimpan..." : "Simpan Data"}
      </button>
      {state?.message && <p className="success">{state.message}</p>}
    </form>
  );
}
```

---

## 7. CSR, SSR, Hydration, dan Server Components (Slide 36)

- **Client Side Rendering (CSR):** Browser mengunduh HTML kosong + bundel JS besar, lalu JavaScript membangun seluruh antarmuka di perangkat pengguna.
- **Server Side Rendering (SSR):** Server merender HTML siap pakai saat request datang. Halaman cepat terlihat, lalu file JavaScript diunduh untuk melakukan **Hydration** (menempelkan event listener ke HTML tersebut).
- **React Server Components (RSC):** Komponen berjalan eksklusif di server, tidak mengirimkan JavaScript komponen tersebut ke browser sehingga menghemat ukuran bundel (*zero-bundle-size*). Hanya komponen dengan interaktivitas pengguna (`"use client"`) yang dikirim ke browser.

---

## 8. State Architecture, TypeScript, dan Aksesibilitas (Slide 37 – 40)

### Strategi Pembagian State:
1. **State Lokal (Local State):** Input teks, accordion buka/tutup (gunakan `useState`).
2. **State URL (URL State):** Filter pencarian, halaman paginasi, tab aktif (gunakan Router query params agar link bisa dibagikan).
3. **State Global (Shared State):** Sesi pengguna login, keranjang belanja (gunakan `Context` atau library state).
4. **Server Cache State:** Data API dengan status loading, refetch, dan caching (gunakan TanStack Query).

### Contoh Pengetikan Props dengan TypeScript (Slide 39):
```typescript
type ButtonProps = {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
};

export function Button({ label, onClick, variant = "primary", disabled = false }: ButtonProps) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}
```
