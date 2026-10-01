# 🎓 Bab 06: Proyek Daftar Tugas & Studi Kasus (Slide 41 – 44, 46)

---

## 1. Spesifikasi Proyek Proyektor / Slide Asli (Slide 41)

Dalam presentasi *"Memahami React"*, proyek kecil Daftar Tugas dipecah menjadi 3 bagian kode (Slide 42, 43, 44) yang dirancang untuk digabungkan menjadi satu file utuh `App.jsx`.

### Fitur Utama:
1. Menambahkan tugas baru (menolak input kosong/hanya spasi dengan `.trim()`).
2. Menandai tugas selesai atau belum (*toggle status*).
3. Menghitung jumlah tugas aktif secara otomatis (*derived state*).
4. Pemakaian ID unik berbasis `crypto.randomUUID()`.

---

## 2. Bedah Kode 3 Bagian Utuh (Slide 42 – 44)

Berikut adalah penggabungan kode dari Slide 42, 43, dan 44 dengan dokumentasi dan anotasi baris lengkap:

```jsx
import { useState } from "react";

export default function TodoApp() {
  // 1. STATE UTAMA (Slide 42)
  // 'tasks' menyimpan array objek: [{ id, title, done }]
  const [tasks, setTasks] = useState([]);
  
  // 'text' menyimpan isi input ketikan pengguna
  const [text, setText] = useState("");

  // FUNGSI MENAMBAH TUGAS (Slide 42)
  function add(e) {
    e.preventDefault(); // Mencegah browser me-refresh halaman saat form disubmit
    
    // Validasi: tolak jika hanya berisi spasi kosong
    if (!text.trim()) return;

    // Buat objek tugas baru dengan id unik
    const task = {
      id: crypto.randomUUID(),
      title: text.trim(),
      done: false
    };

    // Immutability: buat array baru menggunakan spread operator
    setTasks(ts => [...ts, task]);
    
    // Bersihkan kembali kolom input
    setText("");
  }

  // FUNGSI TOGGLE STATUS SELESAI (Slide 43)
  function toggle(id) {
    // Array map menghasilkan array baru dengan item tertentu yang diubah
    setTasks(ts =>
      ts.map(t =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  }

  // NILAI TURUNAN (Slide 43)
  // Dihitung langsung saat render, TIDAK memerlukan state terpisah
  const remaining = tasks.filter(t => !t.done);

  // TAMPILAN FORM DAN DAFTAR (Slide 43 & 44)
  return (
    <main className="todo-container">
      <h1>Daftar Tugas</h1>
      
      {/* Formulir penambahan tugas */}
      <form onSubmit={add} className="todo-form">
        <label htmlFor="task">Tugas baru</label>
        <input
          id="task"
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Tuliskan rencana kegiatan..."
        />
        <button type="submit">Tambah</button>
      </form>

      {/* Ringkasan status */}
      <p className="remaining-text">
        <strong>{remaining.length}</strong> tugas aktif dari total {tasks.length}
      </p>

      {/* Daftar list tugas */}
      <ul className="todo-list">
        {tasks.map(task => (
          <li key={task.id} className={task.done ? "task-done" : ""}>
            <label>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggle(task.id)}
              />
              <span className="task-title">{task.title}</span>
            </label>
          </li>
        ))}
      </ul>
    </main>
  );
}
```

---

## 3. Latihan Lanjutan (Slide 46)

Pada Slide 46, diberikan panduan untuk mengembangkan aplikasi ini menjadi standar produksi:
1. **Fitur Hapus Tugas:** Menambahkan fungsi `.filter()` untuk menghapus item.
2. **Filter Tampilan:** Tab untuk menampilkan `Semua`, `Aktif`, atau `Selesai`.
3. **Pemisahan Komponen:** Memecah menjadi `TaskForm`, `TaskItem`, dan `TaskFilter`.
4. **Custom Hook `useTasks`:** Memisahkan logika manajemen data dari tampilan UI.
5. **Persistensi Data (`localStorage`):** Menyimpan daftar tugas agar tidak hilang saat browser di-refresh.

### Contoh Refactoring Menjadi Custom Hook `useTasks`:

```jsx
// src/hooks/useTasks.js
import { useState, useEffect } from "react";

const STORAGE_KEY = "react_lab_tasks_v1";

export function useTasks() {
  // Inisialisasi state dari localStorage secara lazy
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Simpan ke localStorage setiap kali tasks berubah
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title) => {
    if (!title.trim()) return;
    const newTask = { id: crypto.randomUUID(), title: title.trim(), done: false };
    setTasks(prev => [...prev, newTask]);
  };

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const clearCompleted = () => {
    setTasks(prev => prev.filter(t => !t.done));
  };

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    clearCompleted
  };
}
```
*Dengan pemisahan ini, komponen UI menjadi sangat ramping dan logika bisnis dapat diuji secara independen.*
