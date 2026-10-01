/**
 * slidesData.js
 * Metadata lengkap 48 slide presentasi "Memahami React: Konsep Inti dan Contoh Kode"
 * Berisi informasi bab, slide, judul, ringkasan, kode contoh, dan tipe demo interaktif.
 */

export const CHAPTERS = [
  {
    id: 1,
    title: "01 Dasar React dan JSX",
    description: "Pengenalan library React, bekal JavaScript modern, setup Vite, dan aturan penulisan JSX.",
    slides: [1, 2, 3, 4, 5, 6, 7]
  },
  {
    id: 2,
    title: "02 Component, Props, dan Komposisi",
    description: "Membuat komponen fungsi, passing props, komposisi children, conditional rendering, dan keys.",
    slides: [8, 9, 10, 11, 12]
  },
  {
    id: 3,
    title: "03 State, Event, dan Form",
    description: "useState, siklus Render & Commit, State sebagai Snapshot, Immutability, Derived State, dan Form Terkontrol.",
    slides: [13, 14, 15, 16, 17, 18, 19, 20]
  },
  {
    id: 4,
    title: "04 Hooks dan Sinkronisasi",
    description: "Aturan Hooks, useEffect & cleanup, race condition, useRef, useReducer, Context API, dan Custom Hooks.",
    slides: [21, 22, 23, 24, 25, 26, 27, 28, 29]
  },
  {
    id: 5,
    title: "05 Data, Performa, dan Arsitektur",
    description: "useMemo, useCallback, React.memo, useTransition, lazy/Suspense, Error Boundary, React 19 Form Actions, CSR vs SSR vs RSC.",
    slides: [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]
  },
  {
    id: 6,
    title: "06 Proyek Kecil dan Latihan",
    description: "Proyek Todo List (App.jsx), analisis 6 kesalahan umum, latihan lanjutan, dan peta keputusan React.",
    slides: [41, 42, 43, 44, 45, 46, 47, 48]
  }
];

export const SLIDES_DATA = [
  {
    slideNumber: 1,
    chapterId: 1,
    title: "Memahami React",
    subtitle: "Konsep Inti dan Contoh Kode — Panduan Belajar Berbahasa Indonesia",
    summary: "Selamat datang di panduan pembelajaran React komprehensif. React adalah library untuk membangun antarmuka web modern berbasis komponen.",
    code: `// Selamat Datang di React Indonesia Playground!
// Aplikasi ini memungkinkan Anda mencoba setiap konsep slide secara langsung.

export default function Welcome() {
  return (
    <div className="welcome-banner">
      <h1>Halo, Pengembang Indonesia! 🇮🇩</h1>
      <p>Mulai eksplorasi 48 konsep inti React dari dasar hingga mahir.</p>
    </div>
  );
}`,
    demoType: "welcome",
    pitfall: "Jangan bingung antara React (library UI) dengan framework full-stack (Next.js, Remix). React fokus pada logika tampilan."
  },
  {
    slideNumber: 2,
    chapterId: 1,
    title: "Peta Materi",
    subtitle: "Alur Pembelajaran 6 Bab Utama",
    summary: "Perjalanan belajar terbagi menjadi 6 bab: 01 Dasar & JSX, 02 Komponen & Props, 03 State & Form, 04 Hooks & Sinkronisasi, 05 Performa & Arsitektur, 06 Proyek & Latihan.",
    code: `const curriculum = [
  "01 Dasar React dan JSX",
  "02 Component, props, dan komposisi",
  "03 State, event, dan form",
  "04 Hooks dan sinkronisasi",
  "05 Data, performa, dan arsitektur",
  "06 Proyek kecil dan latihan"
];`,
    demoType: "curriculum",
    pitfall: "Pelajari konsep secara berurutan; jangan langsung melompat ke memoization sebelum memahami cara kerja Render dan State."
  },
  {
    slideNumber: 3,
    chapterId: 1,
    title: "Apa itu React?",
    subtitle: "Library Deklaratif Berbasis Komponen",
    summary: "Kita mendeskripsikan tampilan berdasarkan data saat ini. React mengoordinasikan pembaruan antarmuka secara efisien menggunakan Virtual DOM.",
    code: `// Gaya Deklaratif di React:
// Anda mendeskripsikan "APA yang tampil saat status tertentu", bukan "BAGAIMANA mengubah DOM secara manual".
function StatusBadge({ isOnline }) {
  return (
    <span className={isOnline ? "badge-online" : "badge-offline"}>
      {isOnline ? "🟢 Sedang Aktif" : "⚪ Offline"}
    </span>
  );
}`,
    demoType: "declarative_demo",
    pitfall: "Jangan memanipulasi DOM langsung dengan document.getElementById() di React. Biarkan React yang mengurus DOM."
  },
  {
    slideNumber: 4,
    chapterId: 1,
    title: "Bekal JavaScript Esensial",
    subtitle: "Destructuring, Spread, map, dan filter",
    summary: "Keahlian JavaScript modern yang wajib dikuasai: function, object, array destructuring, method map untuk membuat list, filter untuk menyaring, dan spread operator untuk immutability.",
    code: `const task = { id: 1, title: "Belajar React", done: false };
const { id, title } = task; // Destructuring
const next = { ...task, done: true }; // Spread copy

const tasks = [
  { id: 1, title: "Belajar JS", done: true },
  { id: 2, title: "Belajar JSX", done: false }
];

const titles = tasks.map(t => t.title);
const active = tasks.filter(t => !t.done);`,
    demoType: "js_essentials",
    pitfall: "Spread operator (...obj) hanya menyalin satu tingkat (shallow copy). Untuk objek bertingkat, salin setiap tingkatnya."
  },
  {
    slideNumber: 5,
    chapterId: 1,
    title: "Menjalankan Proyek",
    subtitle: "Memulai dengan Vite React Tooling",
    summary: "Untuk bereksperimen dan belajar, gunakan build tool Vite yang cepat dan ringan. Vite menyediakan Hot Module Replacement (HMR) instan.",
    code: `# Langkah membuat proyek baru dengan Vite:
npm create vite@latest react-lab -- --template react
cd react-lab
npm install
npm run dev

// src/App.jsx
export default function App() {
  return <h1>Halo React Indonesia!</h1>;
}`,
    demoType: "vite_cli",
    pitfall: "Pastikan Node.js minimal versi 18+ terinstal di komputer Anda agar Vite berjalan lancar."
  },
  {
    slideNumber: 6,
    chapterId: 1,
    title: "Komponen Pertama",
    subtitle: "Function Component & Aturan Penamaan",
    summary: "Komponen function menghasilkan deskripsi UI (JSX). Nama fungsi komponen WAJIB diawali huruf kapital agar React membedakannya dari tag HTML biasa.",
    code: `// Nama diawali huruf KAPITAL
function Greeting({ name = "Kawan" }) {
  return <h2>Selamat belajar, {name}! 🚀</h2>;
}

export default function App() {
  return (
    <main>
      <h1>React Lab</h1>
      <Greeting name="Sulaiman" />
    </main>
  );
}`,
    demoType: "greeting_demo",
    pitfall: "Jika Anda menamai fungsi dengan huruf kecil 'greeting', React akan memperlakukannya sebagai tag kustom HTML <greeting></greeting> dan fungsi Anda tidak akan pernah dipanggil."
  },
  {
    slideNumber: 7,
    chapterId: 1,
    title: "Aturan Penulisan JSX",
    subtitle: "Fragment, Penutupan Tag, className, dan Kurung Kurawal {}",
    summary: "JSX menuliskan struktur UI di JavaScript. Harus punya 1 root (atau Fragment <>), semua tag wajib ditutup, gunakan className bukan class, dan kurung kurawal {} untuk ekspresi JS.",
    code: `const name = "Rani";
const score = 95;

return (
  <>
    <h1 className="title">Halo, {name}!</h1>
    <p>Nilai akhir: {score} ({score >= 75 ? "Lulus" : "Remedial"})</p>
    <img src="/avatar.png" alt={name} />
  </>
);`,
    demoType: "jsx_rules",
    pitfall: "Lupa menutup tag seperti <img src='...'> atau <input> akan menyebabkan error kompilasi JSX."
  },
  {
    slideNumber: 8,
    chapterId: 2,
    title: "Props: Input Komponen",
    subtitle: "Read-only Data Flow & Default Props",
    summary: "Props adalah input yang dikirim dari parent ke child. Komponen anak memperlakukan props sebagai data yang tidak boleh diubah (read-only).",
    code: `function Badge({ label, color = "blue" }) {
  return (
    <span style={{ 
      backgroundColor: color, 
      color: "#fff", 
      padding: "4px 10px", 
      borderRadius: "6px" 
    }}>
      {label}
    </span>
  );
}

// Pemakaian:
<Badge label="Draft" /> // Menggunakan default color ("blue")
<Badge label="Selesai" color="#10b981" />`,
    demoType: "props_badge",
    pitfall: "Dilarang memodifikasi props di dalam child (misal: props.label = 'Baru'). Props hanya boleh diubah oleh parent."
  },
  {
    slideNumber: 9,
    chapterId: 2,
    title: "Komposisi dengan children",
    subtitle: "Membuat Wrapper Fleksibel",
    summary: "Prop spesial 'children' memuat elemen apa pun yang diletakkan di antara tag pembuka dan penutup. Sangat ampuh untuk membuat Card, Modal, atau Panel.",
    code: `function Panel({ title, children }) {
  return (
    <section className="panel-card">
      <h3 className="panel-header">{title}</h3>
      <div className="panel-body">{children}</div>
    </section>
  );
}

// Pemakaian:
<Panel title="Profil Programmer">
  <p>Nama: Budi Santoso</p>
  <button>Kirim Pesan</button>
</Panel>`,
    demoType: "composition_panel",
    pitfall: "Hindari membuat terlalu banyak prop khusus (misal text1, text2, icon1) jika sebenarnya konten tersebut bisa diteruskan via children."
  },
  {
    slideNumber: 10,
    chapterId: 2,
    title: "Conditional Rendering",
    subtitle: "if Statement, Ternary (? :), dan Logika &&",
    summary: "Gunakan if untuk percabangan besar, ternary untuk dua kemungkinan, dan && untuk kondisi boolean tunggal. Hati-hati dengan angka 0 pada &&.",
    code: `function NotificationBadge({ count, isLoading, user }) {
  if (isLoading) return <p>Memuat status...</p>;
  
  return (
    <div>
      {/* Ternary */}
      {user ? <span>Halo, {user.name}</span> : <span>Silakan Masuk</span>}
      
      {/* ⚠️ HATI-HATI: Gunakan count > 0, jangan hanya count && */}
      {count > 0 && <span className="badge">{count} Pesan Baru</span>}
    </div>
  );
}`,
    demoType: "conditional_render",
    pitfall: "Jebakan: '0 && <Komponen />' akan merender angka 0 di layar karena 0 adalah falsy number. Selalu gunakan count > 0!"
  },
  {
    slideNumber: 11,
    chapterId: 2,
    title: "List dan Key",
    subtitle: "Pentingnya Key yang Unik dan Stabil",
    summary: "Gunakan .map() untuk merender array. Key harus stabil dan unik di antara saudara. Gunakan ID unik dari data, hindari index array untuk data dinamis.",
    code: `const tasks = [
  { id: "task-101", title: "Membaca dokumentasi React" },
  { id: "task-102", title: "Mencoba Web Playground" }
];

function TaskList({ tasks }) {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>{task.title}</li>
      ))}
    </ul>
  );
}`,
    demoType: "list_key_demo",
    pitfall: "Menggunakan array index sebagai key saat daftar bisa dihapus atau diurutkan akan menyebabkan input/state tertukar antar baris!"
  },
  {
    slideNumber: 12,
    chapterId: 2,
    title: "Event Handler",
    subtitle: "Meneruskan Callback vs Eksekusi Langsung",
    summary: "Berikan function ke onClick. React memanggilnya saat event terjadi. Gunakan arrow function jika perlu meneruskan parameter argumen.",
    code: `function ActionCard({ id, onSave }) {
  // ✅ BENAR: Mengirim referensi fungsi dengan argumen
  return (
    <button onClick={() => onSave(id)}>
      Simpan Data #{id}
    </button>
  );

  // ❌ SALAH: onClick={onSave(id)} 
  // Ini langsung dieksekusi saat komponen dirender!
}`,
    demoType: "event_handler_demo",
    pitfall: "Menulis onClick={handleClick()} dengan tanda kurung akan mengeksekusi handleClick saat render dan bisa memicu infinite loop jika ada setState."
  },
  {
    slideNumber: 13,
    chapterId: 3,
    title: "State dan useState",
    subtitle: "Memori Komponen Antar-Render",
    summary: "State menyimpan memori yang bertahan antar-render. Memanggil fungsi setter akan menjadwalkan render ulang. Setiap instance komponen memiliki state mandiri.",
    code: `import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Jumlah Klik: {count}
    </button>
  );
}`,
    demoType: "usestate_counter",
    pitfall: "Variabel JavaScript biasa (let x = 0) akan kembali ke 0 setiap kali render. Hanya useState yang mempertahankan nilai antar-render."
  },
  {
    slideNumber: 14,
    chapterId: 3,
    title: "Siklus Render dan Commit",
    subtitle: "Render Harus Murni (Pure Function)",
    summary: "Render: React memanggil komponen untuk menghitung UI baru. Commit: React menulis perubahan ke DOM browser. Fase render harus pure tanpa efek samping.",
    code: `// Render Pure:
// Input sama -> menghasilkan JSX yang sama.
// DILARANG: fetch API, mengubah variabel global saat render.

export default function PureClock({ time }) {
  return <p>Waktu saat ini: {time.toLocaleTimeString()}</p>;
}`,
    demoType: "render_commit_demo",
    pitfall: "Melakukan request API atau memodifikasi objek di luar komponen saat render akan menyebabkan bug render ganda atau perilaku tak menentu."
  },
  {
    slideNumber: 15,
    chapterId: 3,
    title: "State Adalah Snapshot",
    subtitle: "Perbedaan Direct Update vs Updater Function",
    summary: "Handler membaca state dari render tempat handler itu dibuat. Setter tidak langsung mengubah variabel di baris berikutnya. Gunakan updater c => c + 1 jika bergantung nilai lama.",
    code: `// Eksperimen:
// Misal count = 0
setCount(count + 1); // Membaca 0 -> antre 1
setCount(count + 1); // Membaca 0 -> antre 1
// Hasil render berikutnya: 1

// Solusi dengan Updater Function:
setCount(c => c + 1); // 0 -> 1
setCount(c => c + 1); // 1 -> 2
// Hasil render berikutnya: 2!`,
    demoType: "state_snapshot_lab",
    pitfall: "Jangan mengira setelah memanggil setCount(5), variabel 'count' pada baris tepat di bawahnya langsung bernilai 5. Nilai baru hanya aktif di render berikutnya."
  },
  {
    slideNumber: 16,
    chapterId: 3,
    title: "Object dan Array dalam State",
    subtitle: "Prinsip Immutability (Jangan Pernah Mutasi Langsung!)",
    summary: "Selalu buat salinan baru dengan spread operator saat mengubah object atau array di state. Jangan pernah gunakan push(), pop(), atau splice().",
    code: `// Mengubah Object:
setUser(u => ({ ...u, name: "Ayu" }));

// Menambah ke Array:
setTasks(ts => [...ts, newTask]);

// Mengubah Item di Array (pakai .map):
setTasks(ts => ts.map(t => t.id === id ? { ...t, done: !t.done } : t));

// Menghapus dari Array (pakai .filter):
setTasks(ts => ts.filter(t => t.id !== id));`,
    demoType: "immutable_sandbox",
    pitfall: "tasks.push(newTask) mengubah array lama di memori. React membandingkan referensi dan mengira tidak ada perubahan sehingga layar TIDAK ter-update!"
  },
  {
    slideNumber: 17,
    chapterId: 3,
    title: "State Minimal dan Nilai Turunan",
    subtitle: "Derived State Dihitung Langsung Saat Render",
    summary: "Hanya simpan data mentah yang benar-benar tidak bisa dihitung. Menghitung total atau filter saat render menghindari resiko data desinkronisasi.",
    code: `const [tasks, setTasks] = useState([]);
const [query, setQuery] = useState("");

// ✅ Nilai Turunan (Derived State) - TANPA useState tambahan!
const visibleTasks = tasks.filter(t =>
  t.title.toLowerCase().includes(query.toLowerCase())
);
const remainingCount = tasks.filter(t => !t.done).length;`,
    demoType: "derived_state_lab",
    pitfall: "Membuat state const [remaining, setRemaining] = useState(0) dan mengupdatenya lewat useEffect adalah anti-pattern yang sering menimbulkan bug sinkronisasi."
  },
  {
    slideNumber: 18,
    chapterId: 3,
    title: "Form Terkontrol (Controlled Component)",
    subtitle: "State Sebagai Single Source of Truth Input",
    summary: "Nilai input dikontrol oleh 'value' dari state, dan event 'onChange' bertugas memperbaruinya. Gunakan label dengan htmlFor untuk aksesibilitas.",
    code: `const [name, setName] = useState("");

return (
  <div className="form-group">
    <label htmlFor="user-name">Nama Lengkap</label>
    <input
      id="user-name"
      value={name}
      onChange={e => setName(e.target.value)}
      placeholder="Ketik nama Anda..."
    />
    <p>Pratinjau: {name || "(belum diisi)"}</p>
  </div>
);`,
    demoType: "controlled_form",
    pitfall: "Memberikan value={name} tanpa onChange akan mengunci input sehingga pengguna tidak bisa mengetik sama sekali."
  },
  {
    slideNumber: 19,
    chapterId: 3,
    title: "Berbagi State (Lifting State Up)",
    subtitle: "Memindahkan State ke Parent Terdekat",
    summary: "Jika dua komponen butuh data yang sama, pindahkan state ke parent terdekat. Parent meneruskan nilai melalui props dan fungsi callback pembaru.",
    code: `function Parent() {
  const [value, setValue] = useState("");

  return (
    <div className="split-view">
      <Editor value={value} onChange={setValue} />
      <Preview value={value} />
    </div>
  );
}`,
    demoType: "lifting_state",
    pitfall: "Menyimpan dua duplikat state yang sama di dua komponen terpisah hampir selalu berujung pada bug ketika salah satunya diubah."
  },
  {
    slideNumber: 20,
    chapterId: 3,
    title: "Identitas Komponen dan Reset State",
    subtitle: "Mereset Form Menggunakan Prop Key",
    summary: "React mengaitkan state dengan posisi dan key di pohon UI. Mengganti key akan membuat identitas baru sehingga state lokal komponen di-reset otomatis.",
    code: `// Draft obrolan berbeda untuk tiap kontak penerima
// Mengganti recipient.id akan otomatis mereset input draf!
<ChatBox 
  key={recipient.id} 
  recipient={recipient} 
/>`,
    demoType: "key_reset_demo",
    pitfall: "Jika key tidak diganti saat berganti penerima chat, teks draf yang belum terkirim bisa tertinggal dan salah terkirim ke kontak baru."
  },
  {
    slideNumber: 21,
    chapterId: 4,
    title: "Hooks dan Aturan Pemanggilan",
    subtitle: "Rules of Hooks: Top-Level & Only in React Functions",
    summary: "Panggil Hooks di level teratas function komponen atau custom Hook, sebelum return. Hindari Hooks di dalam loop, kondisi if, atau event handler.",
    code: `// ✅ BENAR: Di tingkat teratas fungsi
function UserProfile({ id }) {
  const [user, setUser] = useState(null);
  useEffect(() => { /* ... */ }, [id]);

  if (!id) return <p>Tidak ada ID</p>; // Early return setelah Hooks

  return <div>{user?.name}</div>;
}

// ❌ SALAH:
// if (id) { useEffect(...) } // Melanggar urutan Hooks!`,
    demoType: "rules_of_hooks",
    pitfall: "React mengandalkan urutan pemanggilan Hooks di setiap render. Memanggil Hook di dalam if membuat urutannya kacau dan menyebabkan React crash."
  },
  {
    slideNumber: 22,
    chapterId: 4,
    title: "Hook useEffect dan Cleanup",
    subtitle: "Sinkronisasi Sistem Eksternal & Mencegah Memory Leak",
    summary: "Effect menyinkronkan komponen dengan sistem eksternal seperti timer, resize window, atau subscription. Fungsi cleanup melepas pekerjaan saat unmount atau dependensi berubah.",
    code: `import { useState, useEffect } from "react";

export default function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    // CLEANUP: Bersihkan saat komponen unmount
    return () => clearInterval(timer);
  }, []);

  return <div>Waktu berjalan: {seconds} detik</div>;
}`,
    demoType: "useeffect_timer",
    pitfall: "Lupa menyertakan clearInterval di fungsi cleanup akan membuat timer terus berjalan di latar belakang dan menyebabkan memory leak."
  },
  {
    slideNumber: 23,
    chapterId: 4,
    title: "Dependensi Effect",
    subtitle: "[] vs [deps] vs Tanpa Array",
    summary: "Daftar dependensi memuat semua nilai reaktif yang dibaca Effect. [] berarti hanya jalan saat mount. Tanpa array, effect jalan setelah setiap commit.",
    code: `// Hanya jalan saat mount:
useEffect(() => { /* ... */ }, []);

// Jalan saat roomId berubah:
useEffect(() => {
  const connection = connectChat(roomId);
  connection.open();
  return () => connection.close();
}, [roomId]);`,
    demoType: "effect_deps_demo",
    pitfall: "Menyembunyikan dependensi dari array (eslint-disable) untuk menghindari re-render adalah penyebab nomor satu bug stale closure."
  },
  {
    slideNumber: 24,
    chapterId: 4,
    title: "Kapan TIDAK Perlu Effect?",
    subtitle: "Menghindari Penggunaan Effect yang Berlebihan",
    summary: "Perhitungan dari props/state harus dihitung saat render. Aksi akibat klik pengguna harus ditaruh di event handler, bukan di Effect.",
    code: `// ❌ SALAH: Menggunakan effect untuk nilai turunan
useEffect(() => {
  setFullName(first + " " + last);
}, [first, last]);

// ✅ BENAR: Hitung langsung saat render
const fullName = first + " " + last;

// ✅ BENAR: Aksi submit langsung di event handler
async function handleSave() {
  await saveProfile({ first, last });
}`,
    demoType: "no_effect_needed",
    pitfall: "Menggunakan useEffect untuk mentransfer state ke state lain akan memicu render ganda yang tidak efisien."
  },
  {
    slideNumber: 25,
    chapterId: 4,
    title: "Pengambilan Data & Race Condition",
    subtitle: "Pola Flag 'ignore' untuk Request Asinkron",
    summary: "Kelola status loading, sukses, dan error. Request lama bisa tiba setelah request baru. Gunakan flag ignore di cleanup untuk mencegah stale response menimpa data baru.",
    code: `useEffect(() => {
  let ignore = false;
  setStatus("loading");

  fetchUser(userId).then(
    data => {
      if (!ignore) {
        setUser(data);
        setStatus("success");
      }
    },
    () => { if (!ignore) setStatus("error"); }
  );

  return () => {
    ignore = true; // Batalkan penerapan data jika userId berganti!
  };
}, [userId]);`,
    demoType: "race_condition_demo",
    pitfall: "Tanpa flag ignore, jika user cepat mengklik ID 1 lalu ID 2, respon ID 1 yang lambat bisa tiba terakhir dan menampilkan profil yang salah!"
  },
  {
    slideNumber: 26,
    chapterId: 4,
    title: "Hook useRef",
    subtitle: "Nilai Persisten Tanpa Memicu Re-Render & DOM Access",
    summary: "useRef menyimpan nilai yang bertahan antar-render tanpa memicu render ulang saat nilainya berubah. Sangat berguna untuk referensi DOM (focus) atau ID timer.",
    code: `import { useRef } from "react";

export default function SearchFocus() {
  const inputRef = useRef(null);

  return (
    <>
      <input ref={inputRef} placeholder="Ketik sesuatu..." />
      <button onClick={() => inputRef.current?.focus()}>
        Beri Fokus Kursor
      </button>
    </>
  );
}`,
    demoType: "useref_demo",
    pitfall: "Jangan gunakan ref untuk menyimpan data yang menentukan tampilan UI di layar. Gunakan useState jika perubahan data harus mengubah tampilan."
  },
  {
    slideNumber: 27,
    chapterId: 4,
    title: "Hook useReducer",
    subtitle: "Memusatkan Aturan Perubahan State Kompleks",
    summary: "Reducer memusatkan logika pembaruan state. Komponen mengirim dispatch(action), reducer menghitung state berikutnya secara murni.",
    code: `function reducer(state, action) {
  switch (action.type) {
    case "increment": return { count: state.count + 1 };
    case "decrement": return { count: Math.max(0, state.count - 1) };
    case "reset": return { count: 0 };
    default: return state;
  }
}

const [state, dispatch] = useReducer(reducer, { count: 0 });
<button onClick={() => dispatch({ type: "increment" })}>+1</button>`,
    demoType: "usereducer_demo",
    pitfall: "Fungsi reducer harus murni (pure). Jangan lakukan request API atau Math.random() di dalam fungsi reducer."
  },
  {
    slideNumber: 28,
    chapterId: 4,
    title: "Context dan useContext",
    subtitle: "Meneruskan Nilai Tanpa Prop Drilling",
    summary: "Context meneruskan nilai ke seluruh turunan tanpa lewat setiap lapis props. Cocok untuk tema gelap/terang, otentikasi login, atau bahasa.",
    code: `const ThemeContext = createContext("dark");

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const theme = useContext(ThemeContext);
  return <p>Tema aktif: {theme}</p>;
}`,
    demoType: "context_demo",
    pitfall: "Semua komponen yang membaca Context akan di-render ulang saat nilai Context berubah. Jangan simpan state yang berubah sangat cepat (misal posisi kursor mouse) di Context global."
  },
  {
    slideNumber: 29,
    chapterId: 4,
    title: "Custom Hook",
    subtitle: "Membungkus Logika Stateful yang Reusable",
    summary: "Custom Hook membungkus logika yang menggunakan Hooks bawaan. Pemanggil berbagi logika, tetapi masing-masing pemanggilan memiliki state mandiri.",
    code: `function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);
  const increment = () => setCount(c => c + 1);
  const reset = () => setCount(initial);
  return { count, increment, reset };
}

// Pemakaian:
function CounterWidget() {
  const { count, increment, reset } = useCounter(5);
  return <button onClick={increment}>Skor: {count}</button>;
}`,
    demoType: "custom_hook_demo",
    pitfall: "Dua komponen yang memanggil custom hook yang sama TIDAK berbagi state yang sama. Masing-masing memiliki memorinya sendiri."
  },
  {
    slideNumber: 30,
    chapterId: 5,
    title: "useMemo, useCallback, dan memo",
    subtitle: "Teknik Optimasi Performa",
    summary: "useMemo menyimpan hasil kalkulasi mahal. useCallback mempertahankan referensi fungsi. React.memo mencegah re-render child jika props sama.",
    code: `// 1. Simpan komputasi mahal:
const filtered = useMemo(
  () => filterHeavyItems(items, query),
  [items, query]
);

// 2. Pertahankan referensi fungsi:
const onSelect = useCallback(id => setSelectedId(id), []);

// 3. Hindari re-render child jika props tidak berubah:
const Item = memo(function Item({ name }) {
  return <li>{name}</li>;
});`,
    demoType: "memo_demo",
    pitfall: "Jangan membungkus setiap variabel dengan useMemo tanpa alasan. Penggunaan berlebihan justru menambah beban memori dan komputasi perbandingan dependensi."
  },
  {
    slideNumber: 31,
    chapterId: 5,
    title: "Responsivitas dengan useTransition",
    subtitle: "Memisahkan Update Urgent vs Non-Urgent",
    summary: "useTransition menandai update non-urgent. Input teks pengguna tetap responsif seketika, sementara render daftar berat ditunda di latar belakang.",
    code: `const [isPending, startTransition] = useTransition();

function handleChange(e) {
  const next = e.target.value;
  setInput(next); // Urgent: input teks langsung update
  
  startTransition(() => {
    setQuery(next); // Non-urgent: filter 10.000 data
  });
}`,
    demoType: "transition_demo",
    pitfall: "Jangan gunakan transition untuk input terkontrol itu sendiri. Input teks harus tetap responsif tanpa jeda."
  },
  {
    slideNumber: 32,
    chapterId: 5,
    title: "lazy dan Suspense",
    subtitle: "Code-Splitting dan Dynamic Imports",
    summary: "lazy menunda pemuatan kode komponen hingga dibutuhkan. Suspense menampilkan UI cadangan (fallback) saat komponen sedang diunduh.",
    code: `import { lazy, Suspense } from "react";

const HeavyReports = lazy(() => import("./Reports.jsx"));

function App() {
  return (
    <Suspense fallback={<p>Memuat modul laporan...</p>}>
      <HeavyReports />
    </Suspense>
  );
}`,
    demoType: "lazy_suspense_demo",
    pitfall: "Suspense dengan React.lazy membutuhkan export default dari modul yang diimpor."
  },
  {
    slideNumber: 33,
    chapterId: 5,
    title: "Error Boundary",
    subtitle: "Mencegah Crash Seluruh Halaman",
    summary: "Error boundary menangkap error saat render di komponen anak dan menampilkan UI fallback. Diimplementasikan menggunakan class component.",
    code: `class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <h2>Terjadi gangguan pada modul ini.</h2>;
    }
    return this.props.children;
  }
}`,
    demoType: "error_boundary_demo",
    pitfall: "Error Boundary TIDAK menangkap error di dalam event handler (misal error saat fetch di onClick). Tangani dengan try...catch."
  },
  {
    slideNumber: 34,
    chapterId: 5,
    title: "Hooks Lain yang Perlu Dikenali",
    subtitle: "useId, useLayoutEffect, useSyncExternalStore",
    summary: "useId: ID aksesibilitas konsisten. useLayoutEffect: pengukuran layout sebelum browser melukis. useSyncExternalStore: membaca store eksternal.",
    code: `// useId menjamin ID sama antara SSR dan Client:
const id = useId();
return (
  <>
    <label htmlFor={id}>Email</label>
    <input id={id} type="email" />
  </>
);`,
    demoType: "other_hooks_demo",
    pitfall: "useId dibuat khusus untuk atribut HTML seperti id dan aria-describedby, BUKAN untuk prop 'key' pada list item!"
  },
  {
    slideNumber: 35,
    chapterId: 5,
    title: "Form Actions pada React Modern",
    subtitle: "useActionState, useFormStatus, useOptimistic (React 19)",
    summary: "useActionState menghubungkan action formulir dengan state dan status pending otomatis. useOptimistic menampilkan hasil sementara seketika.",
    code: `const [result, formAction, isPending] = useActionState(submitAction, null);

return (
  <form action={formAction}>
    <input name="name" required />
    <button disabled={isPending}>
      {isPending ? "Menyimpan..." : "Simpan"}
    </button>
    <p>{result?.message}</p>
  </form>
);`,
    demoType: "form_actions_demo",
    pitfall: "Sebelum React 19, developer harus mengelola state isSubmitting, error, dan data secara manual dengan useState."
  },
  {
    slideNumber: 36,
    chapterId: 5,
    title: "Client, Server, dan Hydration",
    subtitle: "CSR vs SSR vs React Server Components (RSC)",
    summary: "CSR merakit UI di browser. SSR menghasilkan HTML di server lalu Hydration menyambungkan event listener. RSC berjalan eksklusif di server tanpa bundle JS.",
    code: `// Perbandingan Arsitektur:
// CSR : Browser unduh JS kosong -> bangun UI
// SSR : Server kirim HTML siap tampil -> Hydration di browser
// RSC : Server kirim stream komponen -> Zero client JS bundle`,
    demoType: "csr_ssr_rsc_demo",
    pitfall: "SSR dan Server Components adalah konsep berbeda. Komponen interaktif dengan onClick dan useState tetap membutuhkan client boundary ('use client')."
  },
  {
    slideNumber: 37,
    chapterId: 5,
    title: "Routing dan State Aplikasi",
    subtitle: "Memisahkan State URL, Lokal, Shared, dan Server Cache",
    summary: "Routing memetakan URL ke tampilan. Simpan filter yang perlu dibagikan lewat tautan di URL. Bedakan state lokal, shared context, dan server cache.",
    code: `// Struktur Kategori State:
// 1. URL State: /products?search=react&page=2
// 2. UI Local State: accordion open/close (useState)
// 3. Shared State: user session (Context / Zustand)
// 4. Server Cache: TanStack Query (loading, cache, refetch)`,
    demoType: "state_architecture_demo",
    pitfall: "Menaruh parameter filter pencarian hanya di state memori membuat user tidak bisa membagikan link hasil pencarian ke orang lain."
  },
  {
    slideNumber: 38,
    chapterId: 5,
    title: "Styling dan Aksesibilitas (a11y)",
    subtitle: "Semantic HTML, Focus Visible, dan Keyboard Support",
    summary: "Gunakan elemen semantik (<button>, <main>, <nav>). Pastikan fokus keyboard terlihat jelas (.primary:focus-visible) dan form memiliki label.",
    code: `// Button native mendukung navigasi keyboard & screen reader
<button className="primary" disabled={saving}>
  {saving ? "Menyimpan..." : "Simpan"}
</button>

/* CSS focus-visible untuk aksesibilitas */
.primary:focus-visible {
  outline: 3px solid #38bdf8;
  outline-offset: 2px;
}`,
    demoType: "a11y_demo",
    pitfall: "Menggunakan <div onClick={...}> alih-alih <button> merusak navigasi tombol keyboard (Tab & Enter) dan tidak ramah screen reader."
  },
  {
    slideNumber: 39,
    chapterId: 5,
    title: "TypeScript untuk Props",
    subtitle: "Pemeriksaan Kontrak Props Saat Coding",
    summary: "TypeScript memeriksa tipe data props sebelum kode dijalankan. Callback types mendokumentasikan nilai yang diterima. Validasi API tetap diperlukan di runtime.",
    code: `type ButtonProps = {
  label: string;
  onClick: () => void;
  variant?: "primary" | "danger";
  disabled?: boolean;
};

function Button({ label, onClick, variant = "primary", disabled }: ButtonProps) {
  return (
    <button className={\`btn btn-\${variant}\`} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}`,
    demoType: "typescript_demo",
    pitfall: "TypeScript hanya memeriksa tipe saat kompilasi. Data yang datang dari API eksternal tetap perlu divalidasi saat runtime (misal pakai Zod)."
  },
  {
    slideNumber: 40,
    chapterId: 5,
    title: "Pengujian dan Debugging",
    subtitle: "React DevTools & Skenario Uji Perilaku Pengguna",
    summary: "Uji perilaku yang terlihat pengguna: mengetik, klik tombol, dan perubahan layar. Gunakan React DevTools dan Profiler untuk memeriksa re-render yang mahal.",
    code: `// Skenario Pengujian Daftar Tugas:
// 1. Input kosong tidak menambah tugas
// 2. Ketik 'Tugas 1' + Enter memunculkan item baru
// 3. Centang checkbox mengubah status selesai
// 4. Filter tidak menghapus data asli dari memori`,
    demoType: "testing_debugger_demo",
    pitfall: "Jangan menguji implementasi internal (seperti nama variabel state). Ujilah perilaku apa yang dilihat dan dialami pengguna di layar."
  },
  {
    slideNumber: 41,
    chapterId: 6,
    title: "Proyek Kecil: Daftar Tugas",
    subtitle: "Gambaran Arsitektur & Spesifikasi Proyek",
    summary: "Tiga slide berikutnya membentuk satu file utuh App.jsx. Fitur: tambah tugas, tandai selesai, dan hitung tugas aktif secara otomatis.",
    code: `// Spesifikasi Proyek App.jsx:
// - State utama: tasks (array) dan text (string)
// - Objek tugas: { id, title, done }
// - Nilai turunan: remaining = tasks.filter(t => !t.done)
// - Validasi: tolak input kosong dengan .trim()`,
    demoType: "todo_part1",
    pitfall: "Pastikan ketiga bagian kode di slide 42, 43, dan 44 dirangkai secara berurutan dalam satu fungsi komponen."
  },
  {
    slideNumber: 42,
    chapterId: 6,
    title: "Daftar Tugas: State dan Tambah",
    subtitle: "Bagian 1 dari 3 — Inisialisasi & Fungsi add()",
    summary: "ID unik dibuat menggunakan crypto.randomUUID(). Updater setTasks(ts => [...ts, task]) menjamin immutability. .trim() menolak spasi kosong.",
    code: `import { useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  function add(e) {
    e.preventDefault();
    if (!text.trim()) return;
    const task = { 
      id: crypto.randomUUID(), 
      title: text.trim(), 
      done: false 
    };
    setTasks(ts => [...ts, task]);
    setText("");
  }`,
    demoType: "todo_part1",
    pitfall: "Lupa memanggil e.preventDefault() akan menyebabkan form memuat ulang (refresh) seluruh halaman browser."
  },
  {
    slideNumber: 43,
    chapterId: 6,
    title: "Daftar Tugas: Toggle dan Form",
    subtitle: "Bagian 2 dari 3 — Fungsi toggle() & Struktur Form",
    summary: "Array .map() mengganti hanya item dengan ID yang cocok. Form mendukung submit tombol dan tombol Enter. remaining dihitung langsung tanpa state tambahan.",
    code: `  function toggle(id) {
    setTasks(ts => ts.map(t => t.id === id 
      ? { ...t, done: !t.done } : t));
  }

  const remaining = tasks.filter(t => !t.done);

  return (
    <main>
      <h1>Daftar tugas</h1>
      <form onSubmit={add}>
        <label htmlFor="task">Tugas baru</label>
        <input 
          id="task" 
          value={text} 
          onChange={e => setText(e.target.value)} 
        />
        <button>Tambah</button>
      </form>`,
    demoType: "todo_part2",
    pitfall: "Mengubah properti task.done = true secara langsung tanpa membuat objek baru {...t, done: !t.done} akan melanggar immutability."
  },
  {
    slideNumber: 44,
    chapterId: 6,
    title: "Daftar Tugas: Tampilan Daftar",
    subtitle: "Bagian 3 dari 3 — Render List, Key, dan Checkbox",
    summary: "key menjaga identitas setiap item di DOM. Checkbox membaca boolean task.done. Ini melengkapi satu file App.jsx yang siap dijalankan.",
    code: `      <p>{remaining.length} tugas aktif</p>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <label>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggle(task.id)}
              />
              {task.title}
            </label>
          </li>
        ))}
      </ul>
    </main>
  );
}`,
    demoType: "todo_full",
    pitfall: "Data di slide ini tersimpan di memori JavaScript dan akan hilang jika halaman di-refresh (lihat Slide 46 untuk solusi localStorage)."
  },
  {
    slideNumber: 45,
    chapterId: 6,
    title: "Kesalahan yang Sering Muncul",
    subtitle: "6 Jebakan Klasik Pemula dan Solusinya",
    summary: "UI tidak berubah (mutasi state), render loop (setter saat render), nilai lama (stale closure), item tertukar (key tidak stabil), effect 2x di StrictMode, dan input terkunci.",
    code: `// 6 Bug Umum & Solusinya:
// 1. Mutasi langsung -> Gunakan spread operator
// 2. Loop render -> Bungkus setter di arrow function
// 3. Stale state -> Gunakan updater function c => c + 1
// 4. Item list tertukar -> Gunakan ID unik, jangan index
// 5. Strict Mode 2x -> Normal di dev, pastikan ada cleanup
// 6. Input terkunci -> Pasangkan value dengan onChange`,
    demoType: "common_mistakes",
    pitfall: "Pelajari pola salah vs benar di sandbox interaktif slide ini agar terhindar dari bug membingungkan."
  },
  {
    slideNumber: 46,
    chapterId: 6,
    title: "Latihan Lanjutan",
    subtitle: "Pengembangan Proyek ke Standar Produksi",
    summary: "Tantangan: tambahkan hapus tugas, filter aktif/selesai, pisahkan komponen TaskItem & TaskForm, pindahkan ke custom hook useTasks, dan tambahkan localStorage.",
    code: `// Fitur Tambahan yang Bisa Dicoba:
// - Hapus tugas: tasks.filter(t => t.id !== id)
// - Filter: filter === 'all' | 'active' | 'completed'
// - Simpan permanen: localStorage.setItem(...)
// - Pisahkan komponen modular`,
    demoType: "todo_advanced",
    pitfall: "Jangan refactor ke custom hook jika komponennya masih sangat kecil. Pindahkan logika saat manfaat pemakaian ulangnya sudah jelas."
  },
  {
    slideNumber: 47,
    chapterId: 6,
    title: "Peta Keputusan Sehari-hari",
    subtitle: "Pedoman Kapan Menggunakan Fitur React Tertentu",
    summary: "Tampilan perlu berubah? Pakai state. Nilai bisa dihitung? Hitung saat render. Tahan tanpa render? Pakai ref. Sinkronisasi luar? Pakai Effect. Logika rumit? Reducer. Nilai bersama? Context.",
    code: `// Ringkasan Peta Keputusan:
// - Tampilan perlu berubah?       -> useState
// - Nilai dapat dihitung?         -> Hitung saat render
// - Bertahan tanpa render?        -> useRef
// - Sinkronisasi sistem luar?     -> useEffect
// - Transisi aksi rumit?          -> useReducer
// - Banyak turunan butuh nilai?   -> useContext`,
    demoType: "decision_tree",
    pitfall: "Jangan gunakan useEffect untuk hal-hal yang sebenarnya bisa dihitung langsung saat render."
  },
  {
    slideNumber: 48,
    chapterId: 6,
    title: "Referensi dan Langkah Berikutnya",
    subtitle: "Sumber Belajar Resmi & Perjalanan Karir React",
    summary: "Dokumentasi pembelajaran: react.dev/learn, referensi API: react.dev/reference/react, tutorial Tic-Tac-Toe. Mulai dengan proyek kecil dan bertahap!",
    code: `// Referensi Resmi:
// 1. https://react.dev/learn
// 2. https://react.dev/reference/react
// 3. https://react.dev/learn/tutorial-tic-tac-toe

console.log("Selamat belajar dan berkarya dengan React! 🚀🇮🇩");`,
    demoType: "reference_next_steps",
    pitfall: "Selalu periksa dokumentasi versi React yang Anda gunakan karena fitur seperti Form Actions dan hooks baru terus berkembang."
  }
];
