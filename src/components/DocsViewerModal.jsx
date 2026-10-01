import React, { useState } from 'react';
import { BookOpen, X, ChevronRight, FileText, Download, Check } from 'lucide-react';

const DOCS_LIST = [
  { id: '00', title: '00. Panduan Instalasi & Menjalankan', filename: '00-panduan-instalasi-dan-menjalankan.md' },
  { id: '01', title: '01. Dasar React dan JSX (Slide 1-7)', filename: '01-dasar-react-dan-jsx.md' },
  { id: '02', title: '02. Komponen, Props & Komposisi (Slide 8-12)', filename: '02-komponen-props-dan-komposisi.md' },
  { id: '03', title: '03. State, Event & Form (Slide 13-20)', filename: '03-state-event-dan-form.md' },
  { id: '04', title: '04. Hooks & Sinkronisasi (Slide 21-29)', filename: '04-hooks-dan-sinkronisasi.md' },
  { id: '05', title: '05. Data, Performa & Arsitektur (Slide 30-40)', filename: '05-data-performa-dan-arsitektur.md' },
  { id: '06', title: '06. Proyek Todo & Studi Kasus (Slide 41-44)', filename: '06-proyek-todo-dan-studi-kasus.md' },
  { id: '07', title: '07. Kesalahan Umum & Solusi (Slide 45)', filename: '07-kesalahan-umum-dan-solusi.md' },
  { id: '08', title: '08. Peta Keputusan & Glosarium (Slide 47-48)', filename: '08-peta-keputusan-dan-glosarium.md' }
];

export default function DocsViewerModal({ isOpen, onClose }) {
  const [selectedDocId, setSelectedDocId] = useState('00');
  const [copiedPath, setCopiedPath] = useState(false);

  if (!isOpen) return null;

  const currentDoc = DOCS_LIST.find(d => d.id === selectedDocId) || DOCS_LIST[0];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-window" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-row">
            <BookOpen size={22} className="text-cyan" />
            <div>
              <h3>Dokumentasi Lengkap React Indonesia (Folder docs/)</h3>
              <p>Panduan markdown komprehensif tersimpan di direktori <code>react/docs/</code></p>
            </div>
          </div>
          <button onClick={onClose} className="modal-close-btn" title="Tutup modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-content-grid">
          {/* Sidebar Daftar Dokumen */}
          <div className="docs-sidebar">
            <h5>Daftar Berkas Markdown:</h5>
            <ul className="docs-file-list">
              {DOCS_LIST.map(doc => (
                <li key={doc.id}>
                  <button
                    onClick={() => setSelectedDocId(doc.id)}
                    className={`doc-item-btn ${selectedDocId === doc.id ? 'active' : ''}`}
                  >
                    <FileText size={15} />
                    <span>{doc.title}</span>
                    <ChevronRight size={14} className="arrow-icon" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Main Viewer Area */}
          <div className="docs-reading-area">
            <div className="doc-meta-bar">
              <div>
                <strong>Berkas:</strong> <code>react/docs/{currentDoc.filename}</code>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`docs/${currentDoc.filename}`);
                  setCopiedPath(true);
                  setTimeout(() => setCopiedPath(false), 2000);
                }}
                className="action-btn outline small"
              >
                {copiedPath ? <Check size={14} /> : <Download size={14} />}
                <span>{copiedPath ? 'Path Tersalin!' : 'Salin Path Berkas'}</span>
              </button>
            </div>

            <div className="doc-markdown-body">
              {selectedDocId === '00' && (
                <div>
                  <h2>🛠️ Panduan Instalasi dan Menjalankan</h2>
                  <p>Pastikan Anda memiliki <strong>Node.js versi 18+</strong> dan npm. Untuk menjalankan proyek:</p>
                  <pre><code>npm install{"\n"}npm run dev</code></pre>
                  <p>Server lokal akan otomatis berjalan di <code>http://localhost:3000</code> dengan Hot Module Replacement (HMR).</p>
                  <h3>Perintah Tersedia:</h3>
                  <ul>
                    <li><code>npm run dev</code>: Memulai development server Vite</li>
                    <li><code>npm run build</code>: Kompilasi bundle produksi di folder <code>dist/</code></li>
                    <li><code>npm run preview</code>: Pratinjau lokal dari hasil build produksi</li>
                  </ul>
                </div>
              )}

              {selectedDocId === '01' && (
                <div>
                  <h2>📘 Bab 01: Dasar React dan JSX (Slide 1 – 7)</h2>
                  <p>React adalah library deklaratif untuk membangun antarmuka pengguna berbasis komponen.</p>
                  <h3>Prinsip Utama:</h3>
                  <ul>
                    <li><strong>Deklaratif:</strong> Jelaskan <em>apa</em> yang ingin ditampilkan berdasarkan data saat ini, bukan langkah demi langkah manipulasi DOM.</li>
                    <li><strong>Bekal JS Esensial:</strong> Destructuring object/array, Spread operator (<code>...</code>), serta metode array murni <code>map()</code> dan <code>filter()</code>.</li>
                    <li><strong>Aturan JSX:</strong> Harus memiliki satu root/Fragment (<code>&lt;&gt;...&lt;/&gt;</code>), semua tag wajib ditutup, gunakan <code>className</code> bukan <code>class</code>, dan gunakan kurung kurawal <code>{`{}`}</code> untuk ekspresi JavaScript.</li>
                  </ul>
                </div>
              )}

              {selectedDocId === '02' && (
                <div>
                  <h2>📗 Bab 02: Komponen, Props, dan Komposisi (Slide 8 – 12)</h2>
                  <p>Komponen adalah fungsi yang menerima input berupa <strong>props</strong> dan mengembalikan deskripsi UI.</p>
                  <h3>Poin Penting:</h3>
                  <ul>
                    <li><strong>Props Bersifat Read-Only:</strong> Komponen anak tidak boleh mengubah props-nya sendiri.</li>
                    <li><strong>Komposisi dengan children:</strong> Memungkinkan pembuatan wrapper fleksibel (Card, Panel, Modal).</li>
                    <li><strong>Conditional Rendering:</strong> Gunakan ternary atau <code>count &gt; 0 &amp;&amp; &lt;Badge /&gt;</code> untuk menghindari bug angka 0.</li>
                    <li><strong>List dan Key:</strong> Wajib menggunakan ID unik yang stabil dari data. Jangan gunakan index array untuk data dinamis!</li>
                  </ul>
                </div>
              )}

              {selectedDocId === '03' && (
                <div>
                  <h2>📙 Bab 03: State, Event, dan Form (Slide 13 – 20)</h2>
                  <p>State adalah memori komponen yang bertahan antar-render dan pembaruannya menjadwalkan render ulang.</p>
                  <h3>Konsep Kunci:</h3>
                  <ul>
                    <li><strong>State Adalah Snapshot:</strong> Variabel state tidak langsung berubah di baris berikutnya. Gunakan updater <code>setCount(c =&gt; c + 1)</code> jika bergantung nilai sebelumnya.</li>
                    <li><strong>Immutability Mutlak:</strong> Dilarang melakukan <code>array.push()</code> atau <code>obj.prop = ...</code>. Selalu buat salinan baru dengan spread operator.</li>
                    <li><strong>Derived State:</strong> Hitung langsung nilai turunan saat render; jangan simpan ke state terpisah!</li>
                    <li><strong>Reset State dengan Key:</strong> Mengganti nilai <code>key</code> mereset seluruh state lokal komponen.</li>
                  </ul>
                </div>
              )}

              {selectedDocId === '04' && (
                <div>
                  <h2>📙 Bab 04: Hooks dan Sinkronisasi (Slide 21 – 29)</h2>
                  <p>Hooks adalah fungsi khusus yang memungkinkan komponen fungsi mengakses fitur lifecycle dan state.</p>
                  <h3>Aturan &amp; Pola:</h3>
                  <ul>
                    <li><strong>Aturan Hooks:</strong> Hanya panggil di tingkat teratas (top level), jangan di dalam loop atau kondisi <code>if</code>.</li>
                    <li><strong>useEffect &amp; Cleanup:</strong> Gunakan untuk sinkronisasi eksternal (timer, resize, socket). Wajib sediakan fungsi cleanup.</li>
                    <li><strong>Race Condition:</strong> Tangani fetch API asinkron dengan pola flag <code>let ignore = false</code> di cleanup.</li>
                    <li><strong>useRef vs useState:</strong> Ref menyimpan nilai tanpa memicu re-render dan memberi akses langsung ke elemen DOM.</li>
                    <li><strong>useReducer:</strong> Memusatkan transisi state kompleks dalam fungsi murni.</li>
                    <li><strong>Context API:</strong> Mendistribusikan data global tanpa prop drilling.</li>
                  </ul>
                </div>
              )}

              {selectedDocId === '05' && (
                <div>
                  <h2>📕 Bab 05: Data, Performa, dan Arsitektur (Slide 30 – 40)</h2>
                  <p>Teknik optimasi, arsitektur render, dan pengetikan props:</p>
                  <ul>
                    <li><code>useMemo</code> &amp; <code>useCallback</code>: Mengoptimasi komputasi berat dan stabilitas referensi fungsi.</li>
                    <li><code>useTransition</code>: Memisahkan update mendesak (input pengguna) dari render berat.</li>
                    <li><code>lazy</code> &amp; <code>Suspense</code>: Code-splitting untuk mempercepat waktu muat halaman awal.</li>
                    <li><strong>Error Boundary:</strong> Menangkap error render agar satu komponen rusak tidak mematikan seluruh web.</li>
                    <li><strong>Form Actions (React 19):</strong> <code>useActionState</code> mengelola pending dan feedback secara otomatis.</li>
                    <li><strong>CSR vs SSR vs RSC:</strong> Evolusi arsitektur rendering web dari client ke server.</li>
                  </ul>
                </div>
              )}

              {selectedDocId === '06' && (
                <div>
                  <h2>🎓 Bab 06: Proyek Todo &amp; Studi Kasus (Slide 41 – 44, 46)</h2>
                  <p>Bedah tuntas aplikasi Daftar Tugas dari Slide 41 hingga 44:</p>
                  <ul>
                    <li>Slide 42: Inisialisasi state <code>tasks</code> dan fungsi <code>add()</code> dengan <code>crypto.randomUUID()</code>.</li>
                    <li>Slide 43: Fungsi <code>toggle()</code> dengan <code>.map()</code> dan kalkulasi <code>remaining</code> saat render.</li>
                    <li>Slide 44: Render daftar dengan <code>key={'{task.id}'}</code> dan checkbox controlled.</li>
                    <li>Slide 46: Refactoring tingkat lanjut (filter, hapus, custom hook <code>useTasks</code>, localStorage).</li>
                  </ul>
                </div>
              )}

              {selectedDocId === '07' && (
                <div>
                  <h2>⚠️ Bab 07: Kesalahan yang Sering Muncul &amp; Solusinya (Slide 45)</h2>
                  <p>Daftar 6 jebakan klasik pemula:</p>
                  <ol>
                    <li>UI tidak berubah: Periksa mutasi objek/array langsung (gunakan spread).</li>
                    <li>Render tanpa henti: Periksa setter saat render (bungkus dalam arrow function).</li>
                    <li>Nilai lama: Periksa stale snapshot (gunakan updater function <code>c =&gt; c + 1</code>).</li>
                    <li>State item tertukar: Ganti <code>key={'{index}'}</code> dengan <code>key={'{item.id}'}</code>.</li>
                    <li>Effect 2x di dev: StrictMode mendeteksi hilangnya fungsi cleanup.</li>
                    <li>Input terkunci: Pastikan <code>value</code> memiliki pasangan <code>onChange</code>.</li>
                  </ol>
                </div>
              )}

              {selectedDocId === '08' && (
                <div>
                  <h2>🧭 Bab 08: Peta Keputusan &amp; Glosarium (Slide 47 – 48)</h2>
                  <p>Panduan "Kapan Memakai Apa?" dan kamus istilah lengkap:</p>
                  <ul>
                    <li>Tampilan perlu berubah? 👉 <code>useState</code></li>
                    <li>Bisa dihitung dari data ada? 👉 <strong>Hitung saat render (Derived State)</strong></li>
                    <li>Bertahan tanpa memicu render? 👉 <code>useRef</code></li>
                    <li>Sinkronisasi sistem luar? 👉 <code>useEffect</code> dengan cleanup</li>
                    <li>Transisi alur kompleks? 👉 <code>useReducer</code></li>
                    <li>Banyak anak butuh nilai sama? 👉 <code>useContext</code></li>
                    <li>Input macet karena filter ribuan data? 👉 <code>useTransition</code></li>
                  </ul>
                </div>
              )}

              <div className="doc-footer-hint">
                <p>
                  📖 <em>Catatan: Berkas lengkap dengan ribuan baris penjelasan mendalam dapat Anda baca di folder <code>react/docs/{currentDoc.filename}</code> menggunakan VS Code atau editor Markdown favorit Anda.</em>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
