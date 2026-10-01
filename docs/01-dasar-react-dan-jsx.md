# 📘 Bab 01: Dasar React dan JSX (Slide 1 – 7)

---

## 1. Apa itu React? (Slide 3)

React adalah **library JavaScript deklaratif** yang dikembangkan oleh Meta untuk membangun antarmuka pengguna (*User Interface* atau UI) berbasis komponen (*component-based*).

### Mengapa React Berbeda? (Imperatif vs Deklaratif)

- **Gaya Imperatif (Vanilla JS / DOM Manipulation):**
  Anda harus menulis instruksi langkah demi langkah bagaimana elemen DOM dibuat, dicari (`getElementById`), diubah teksnya, dan ditambahkan *event listener*. Kode menjadi panjang, rumit, dan mudah tidak sinkron jika aplikasi membesar.
  
- **Gaya Deklaratif (React):**
  Anda hanya perlu **mendeskripsikan tampilan UI berdasarkan data saat ini**. Ketika data berubah (*state update*), React akan secara cerdas menghitung perbedaan (*diffing* menggunakan Virtual DOM) dan hanya memperbarui elemen browser yang memang perlu berubah.

> 💡 **Kunci Konsep:**
> - **Komponen**: Potongan UI mandiri yang dapat digunakan kembali (*reusable*), mulai dari tombol kecil hingga satu halaman penuh.
> - **React DOM**: Jembatan perekat antara logika React dan browser DOM yang sebenarnya.

---

## 2. Bekal JavaScript Esensial (Slide 4)

Sebelum mendalami React, ada beberapa fitur modern JavaScript (ES6+) yang merupakan "fondasi harian" dalam menulis kode React:

### A. Destructuring Object & Array
Mengekstrak nilai properti langsung ke dalam variabel dengan sintaks yang ringkas:
```javascript
// Destructuring Object
const task = { id: 1, title: "Belajar React", done: false };
const { id, title } = task;
console.log(title); // "Belajar React"

// Destructuring Array (sering dipakai di Hooks seperti useState)
const colors = ["red", "blue", "green"];
const [firstColor, secondColor] = colors;
```

### B. Spread Operator (`...`)
Menyalin elemen array atau properti object secara *shallow* (dangkal) tanpa mengubah object asli (*immutability*):
```javascript
const task = { id: 1, done: false };

// Membuat object baru dengan status yang diubah
const nextTask = { ...task, done: true };
console.log(nextTask); // { id: 1, done: true }
console.log(task === nextTask); // false (referensi memori baru)

// Menyalin dan menambah array
const todos = ["Tugas 1", "Tugas 2"];
const newTodos = [...todos, "Tugas 3"];
```

### C. Metode Array: `map()` dan `filter()`
- `map()`: Mengubah setiap elemen array menjadi format baru (biasanya diubah menjadi elemen JSX).
- `filter()`: Menyaring elemen berdasarkan kondisi boolean (menghasilkan array baru).
```javascript
const tasks = [
  { id: 1, title: "Belajar JSX", done: true },
  { id: 2, title: "Pahami Props", done: false }
];

// Ambil judul saja
const titles = tasks.map(t => t.title); // ["Belajar JSX", "Pahami Props"]

// Ambil tugas yang belum selesai
const activeTasks = tasks.filter(t => !t.done); // Hanya tugas ID 2
```

---

## 3. Komponen Pertama Anda (Slide 6)

Di React modern, komponen ditulis sebagai **JavaScript Function biasa** yang mengembalikan elemen JSX (*UI description*).

### Aturan Wajib Komponen:
1. **Nama function harus diawali dengan huruf KAPITAL** (contoh: `Greeting`, `UserProfile`, `App`).
   - Jika diawali huruf kecil (`greeting`), React akan menganggapnya sebagai tag HTML biasa (`<greeting>`) sehingga tidak memanggil fungsi Anda.
2. Harus mengembalikan (*return*) JSX atau nilai valid (`null`, string, number).

```jsx
// Komponen Child
function Greeting() {
  return <h2>Selamat belajar React Indonesia!</h2>;
}

// Komponen Parent
export default function App() {
  return (
    <main>
      <h1>React Lab</h1>
      {/* Memanggil komponen seperti tag HTML */}
      <Greeting />
    </main>
  );
}
```

---

## 4. Aturan Penulisan JSX (Slide 7)

JSX (*JavaScript XML*) adalah ekstensi sintaksis untuk JavaScript yang memungkinkan Anda menulis struktur UI yang mirip HTML langsung di dalam file `.jsx`.

Di balik layar, JSX akan diubah oleh bundler (Vite / Babel) menjadi panggilan fungsi JavaScript `React.createElement()` atau JSX runtime compiler.

### 4 Aturan Utama JSX:

### 1. Harus Memiliki Satu Root Element (atau Gunakan Fragment `<>`)
Sebuah komponen tidak boleh mengembalikan dua elemen sejajar (*sibling*) tanpa pembungkus. Gunakan React Fragment (`<> ... </>`) agar tidak menambah node `<div>` yang tidak perlu di DOM browser:
```jsx
// ❌ SALAH: Error JSX expressions must have one parent element
return (
  <h1>Halo</h1>
  <p>Dunia</p>
);

// ✅ BENAR: Dibungkus Fragment
return (
  <>
    <h1>Halo</h1>
    <p>Dunia</p>
  </>
);
```

### 2. Semua Tag Wajib Ditutup (*Self-closing Tags*)
Di HTML biasa, tag seperti `<img>`, `<input>`, `<br>`, `<hr>` boleh tidak ditutup. Di JSX, **semua tag wajib ditutup**:
```jsx
// ❌ SALAH di JSX
<img src="/avatar.png" alt="User">
<input type="text">

// ✅ BENAR di JSX
<img src="/avatar.png" alt="User" />
<input type="text" />
```

### 3. Gunakan `className`, Bukan `class`
Karena kata `class` adalah *reserved keyword* di JavaScript untuk membuat kelas OOP, atribut HTML `class` diganti menjadi `className`:
```jsx
// ❌ SALAH
<div class="card">...</div>

// ✅ BENAR
<div className="card">...</div>
```
*Catatan serupa:* Atribut `<label for="...">` diubah menjadi `<label htmlFor="...">`.

### 4. Kurung Kurawal `{}` untuk Menyisipkan Ekspresi JavaScript
Segala hal di dalam `{}` dievaluasi sebagai kode JavaScript murni:
```jsx
const userName = "Rani";
const age = 22;

return (
  <div>
    {/* Menyisipkan variabel */}
    <h2>Halo, {userName}!</h2>

    {/* Menyisipkan operasi aritmatika */}
    <p>Umur tahun depan: {age + 1}</p>

    {/* Memanggil function */}
    <p>Huruf besar: {userName.toUpperCase()}</p>
  </div>
);
```
