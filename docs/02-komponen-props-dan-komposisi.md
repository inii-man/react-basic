# 📗 Bab 02: Komponen, Props, dan Komposisi (Slide 8 – 12)

---

## 1. Props: Komunikasi Antara Parent dan Child (Slide 8)

Props (*singkatan dari properties*) adalah argumen yang dikirim oleh komponen induk (*parent*) ke komponen anak (*child*).

### Karakteristik Penting Props:
1. **Satu Arah (Unidirectional Data Flow):** Data selalu mengalir dari atas (parent) ke bawah (child).
2. **Bersifat Read-Only (Immutable):** Komponen anak **dilarang mengubah props-nya sendiri**. Jika input berubah, parent harus mengirimkan prop baru dengan nilai baru.
3. **Mendukung Default Value:** Anda dapat memberikan nilai cadangan jika prop tidak diberikan oleh pemanggil.

```jsx
// Komponen Badge dengan default prop: color = "blue"
function Badge({ label, color = "blue" }) {
  return (
    <span style={{ 
      backgroundColor: color, 
      color: "#fff", 
      padding: "4px 8px", 
      borderRadius: "4px" 
    }}>
      {label}
    </span>
  );
}

// Pemakaian:
function App() {
  return (
    <div>
      {/* Menggunakan default color ("blue") */}
      <Badge label="Draft" />

      {/* Menentukan warna eksplisit */}
      <Badge label="Aktif" color="green" />
    </div>
  );
}
```

---

## 2. Komposisi dengan `children` (Slide 9)

Prop spesial bernama `children` mewakili konten apa pun yang ditulis di antara tag pembuka `<Komponen>` dan penutup `</Komponen>`.

### Keuntungan Pola Komposisi:
- Tidak perlu membuat puluhan props kustom (`text1`, `text2`, `icon`, `buttonProp`).
- Komponen pembungkus (*wrapper* seperti Card, Modal, Panel, Layout) menjadi sangat fleksibel dan dapat membungkus elemen HTML maupun komponen React lainnya.

```jsx
function Panel({ title, children }) {
  return (
    <section className="panel-box">
      <h2 className="panel-title">{title}</h2>
      <div className="panel-content">
        {children} {/* Konten di dalam tag dirender di sini */}
      </div>
    </section>
  );
}

// Pemakaian:
function App() {
  return (
    <Panel title="Profil Pengguna">
      <p>Halo, saya sedang belajar React!</p>
      <button>Edit Profil</button>
    </Panel>
  );
}
```

---

## 3. Conditional Rendering (Slide 10)

Di React, tidak ada sintaks khusus seperti `v-if` atau `*ngIf`. Kita cukup menggunakan fitur percabangan JavaScript biasa.

### 3 Pola Conditional Rendering:

### A. Statement `if` / Early Return (Cocok untuk blok logika besar)
```jsx
function UserStatus({ loading, user }) {
  if (loading) {
    return <p className="loading">Sedang memuat data...</p>;
  }

  if (!user) {
    return <p>Silakan login terlebih dahulu.</p>;
  }

  return <h3>Selamat datang, {user.name}!</h3>;
}
```

### B. Operator Ternary `condition ? true : false` (Cocok untuk memilih 2 tampilan)
```jsx
function AuthButton({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <button>Logout</button> : <button>Login</button>}
    </div>
  );
}
```

### C. Operator Logika AND (`&&`) (Menampilkan elemen jika kondisi bernilai true)
```jsx
function Notification({ unreadCount }) {
  return (
    <div>
      {unreadCount > 0 && <span className="badge">{unreadCount} pesan baru</span>}
    </div>
  );
}
```

> ⚠️ **JEBAKAN FATAL PEMULA: Angka 0 di operator `&&`!**
> 
> ```jsx
> // ❌ HATI-HATI:
> const items = [];
> return (
>   <div>
>     {items.length && <List items={items} />}
>   </div>
> );
> ```
> Karena `items.length` adalah `0` (falsy number), JavaScript mengevaluasi `0 && <List />` menjadi angka `0`, sehingga layar akan merender angka `0` literal!
> 
> **Solusi Aman:**
> ```jsx
> // ✅ Selalu gunakan ekspresi boolean eksplisit:
> {items.length > 0 && <List items={items} />}
> // atau
> {Boolean(items.length) && <List items={items} />}
> ```

---

## 4. List dan Key (Slide 11)

Untuk merender daftar array data ke dalam elemen JSX, kita menggunakan fungsi array standar `.map()`.

Setiap elemen teratas di dalam `.map()` **WAJIB memiliki atribut `key` yang unik dan stabil**.

```jsx
const tasks = [
  { id: "t1", title: "Membeli buku", done: false },
  { id: "t2", title: "Belajar JavaScript", done: true }
];

function TaskList({ tasks }) {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          {task.title}
        </li>
      ))}
    </ul>
  );
}
```

### Mengapa `key` Sangat Penting Bagi React?
1. **Identitas Elemen:** Virtual DOM membandingkan pohon render lama dan baru. `key` memberi tahu React elemen mana yang tetap sama, berpindah posisi, ditambahkan, atau dihapus.
2. **Menjaga State Lokal Elemen:** Jika sebuah item dalam list memiliki state internal (misalnya input teks atau animasi), React memakai `key` agar state tersebut tidak tertukar dengan item lain.

> ❌ **Jangan Gunakan `index` Array Sebagai Key jika:**
> - Daftar item dapat ditambah di awal/tengah
> - Daftar item dapat diurutkan ulang (*sorting*)
> - Item dapat dihapus
> 
> Menggunakan `index` akan menyebabkan React mengira item pada baris pertama selalu sama, sehingga input formulir atau checkbox bisa tertukar ke baris lain saat item dihapus!

---

## 5. Event Handler (Slide 12)

Event handler memungkinkan komponen merespons interaksi pengguna seperti klik, ketikan keyboard, submit formulir, atau gerakan mouse.

### Aturan Emas: Berikan Referensi Fungsi, Jangan Eksekusi Langsung!

```jsx
// ✅ BENAR: Mengirimkan referensi fungsi
<button onClick={handleClick}>Klik Saya</button>

// ❌ SALAH BESAR: Memanggil fungsi langsung saat render
<button onClick={handleClick()}>Klik Saya</button>
```
*Jika Anda menulis `handleClick()`, fungsi tersebut akan dieksekusi seketika saat komponen dirender, bukan saat tombol diklik!*

### Meneruskan Argumen ke Event Handler
Gunakan *inline arrow function* sebagai pembungkus:
```jsx
function SaveButton({ save, id }) {
  return (
    // Arrow function memastikan save(id) hanya dipanggil saat event 'click' terjadi
    <button onClick={() => save(id)}>
      Simpan Item #{id}
    </button>
  );
}
```
