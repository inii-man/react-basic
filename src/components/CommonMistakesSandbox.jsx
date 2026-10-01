import React, { useState } from 'react';
import { AlertOctagon, CheckCircle2, XCircle, RefreshCw, Terminal, ArrowRight } from 'lucide-react';
import CodeViewer from './CodeViewer';

/**
 * CommonMistakesSandbox.jsx
 * Sandbox Interaktif 6 Kesalahan yang Sering Muncul (Slide 45)
 */
export default function CommonMistakesSandbox() {
  const [activeBugTab, setActiveBugTab] = useState(1);

  // Bug 1: State Mutation State
  const [bug1User, setBug1User] = useState({ name: 'Budi', score: 10 });
  const [bug1Fixed, setBug1Fixed] = useState(false);
  const [bug1RenderTick, setBug1RenderTick] = useState(0);

  // Bug 3: Stale Closure State
  const [bug3Count, setBug3Count] = useState(0);
  const [bug3Fixed, setBug3Fixed] = useState(false);

  // Bug 4: Index as Key Swap State
  const [bug4Items, setBug4Items] = useState([
    { id: 'item-a', label: 'Item 1' },
    { id: 'item-b', label: 'Item 2' },
    { id: 'item-c', label: 'Item 3' }
  ]);
  const [bug4UseIndex, setBug4UseIndex] = useState(true);

  // Bug 6: Locked input
  const [bug6Value, setBug6Value] = useState('Sulaiman');
  const [bug6HasOnChange, setBug6HasOnChange] = useState(false);

  // Handlers for Bug 1
  const handleMutateScore = () => {
    if (!bug1Fixed) {
      // ❌ KODE RUSAK: Memutasi object lama secara langsung!
      bug1User.score += 5;
      setBug1User(bug1User); // React mengecek Object.is(bug1User, bug1User) -> true -> TIDAK AKAN RE-RENDER!
      console.warn('Object dimutasi langsung:', bug1User);
    } else {
      // ✅ KODE BENAR: Membuat object baru dengan spread
      setBug1User(prev => ({
        ...prev,
        score: prev.score + 5
      }));
    }
  };

  // Handlers for Bug 3
  const handleSimulateTripleAdd = () => {
    if (!bug3Fixed) {
      // ❌ KODE RUSAK: Membaca snapshot lama 3 kali
      setBug3Count(bug3Count + 1);
      setBug3Count(bug3Count + 1);
      setBug3Count(bug3Count + 1);
    } else {
      // ✅ KODE BENAR: Menggunakan functional updater
      setBug3Count(c => c + 1);
      setBug3Count(c => c + 1);
      setBug3Count(c => c + 1);
    }
  };

  // Handlers for Bug 4
  const removeFirstItem = () => {
    setBug4Items(prev => prev.slice(1));
  };

  return (
    <div className="mistakes-sandbox-container">
      <div className="sandbox-header">
        <AlertOctagon size={24} className="text-rose" />
        <div>
          <h3>Sandbox 6 Kesalahan Paling Fatal di React (Slide 45)</h3>
          <p>Uji langsung 6 skenario bug klasik, rasakan kerusakannya, lalu amati cara memperbaikinya:</p>
        </div>
      </div>

      <div className="bug-nav-tabs">
        {[
          { id: 1, title: '1. UI Tidak Berubah' },
          { id: 2, title: '2. Render Loop' },
          { id: 3, title: '3. Nilai Lama (Stale)' },
          { id: 4, title: '4. List Tertukar' },
          { id: 5, title: '5. Effect 2x Dev' },
          { id: 6, title: '6. Input Terkunci' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveBugTab(tab.id)}
            className={`bug-tab-btn ${activeBugTab === tab.id ? 'active' : ''}`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <div className="sandbox-content">
        {/* BUG 1: Mutasi State */}
        {activeBugTab === 1 && (
          <div className="bug-case-card">
            <div className="case-title-row">
              <h4>Kasus 1: UI Tidak Berubah Karena Mutasi State Langsung</h4>
              <button
                onClick={() => setBug1Fixed(prev => !prev)}
                className={`pill-btn ${bug1Fixed ? 'active' : 'error-pill active'}`}
              >
                {bug1Fixed ? '✅ Mode: Kode Sudah Diperbaiki (Spread)' : '❌ Mode: Kode Rusak (Mutasi Langsung)'}
              </button>
            </div>

            <p className="case-desc">
              Saat mode rusak aktif, klik tombol <strong>"Tambah Skor +5"</strong>. Angka di layar 
              <strong> tidak akan berubah sama sekali</strong> karena React melihat referensi memori object <code>bug1User</code> tidak berganti!
            </p>

            <div className="live-tester-row">
              <div className="test-widget">
                <p>Nama: <strong>{bug1User.name}</strong></p>
                <p>Skor di Layar: <strong className="score-badge">{bug1User.score}</strong></p>
                <button onClick={handleMutateScore} className="action-btn primary small">
                  + Tambah Skor (+5)
                </button>
                <button onClick={() => setBug1RenderTick(n => n + 1)} className="action-btn outline small">
                  Force Render (Cek Nilai di Memori)
                </button>
              </div>

              <div className="code-comparison-box">
                <CodeViewer
                  title={bug1Fixed ? 'Solusi Benar (Immutability)' : 'Kode Bermasalah (Mutasi)'}
                  code={bug1Fixed ? `// ✅ BENAR: Buat object baru\nsetUser(prev => ({\n  ...prev,\n  score: prev.score + 5\n}));` : `// ❌ SALAH: Mutasi langsung\nuser.score += 5;\nsetUser(user); // Referensi sama -> Batal render!`}
                />
              </div>
            </div>
          </div>
        )}

        {/* BUG 2: Infinite Loop */}
        {activeBugTab === 2 && (
          <div className="bug-case-card">
            <h4>Kasus 2: Render Tanpa Henti (Infinite Re-render Loop)</h4>
            <p className="case-desc">
              Kesalahan pemula terbesar: memanggil fungsi setter state langsung di dalam render atau salah menuliskan tanda kurung di event handler!
            </p>

            <div className="code-comparison-box">
              <CodeViewer
                title="Penyebab Loop & Solusinya"
                code={`// ❌ SALAH: Memanggil dengan tanda kurung () di onClick\n<button onClick={setCount(count + 1)}>Klik</button>\n// Ini langsung dieksekusi saat render -> ubah state -> re-render -> LOOP MACET!\n\n// ✅ BENAR: Berikan referensi fungsi callback\n<button onClick={() => setCount(c => c + 1)}>Klik</button>`}
              />
            </div>
          </div>
        )}

        {/* BUG 3: Stale Closure */}
        {activeBugTab === 3 && (
          <div className="bug-case-card">
            <div className="case-title-row">
              <h4>Kasus 3: Nilai Lama / Stale Snapshot</h4>
              <button
                onClick={() => setBug3Fixed(prev => !prev)}
                className={`pill-btn ${bug3Fixed ? 'active' : 'error-pill active'}`}
              >
                {bug3Fixed ? '✅ Mode: Menggunakan Updater (c => c + 1)' : '❌ Mode: Direct (count + 1)'}
              </button>
            </div>

            <p className="case-desc">
              Di mode rusak, tombol memanggil <code>setCount(count + 1)</code> sebanyak 3 kali berturut-turut.
              Karena membaca snapshot lama yang sama, angka hanya bertambah 1 bukan 3!
            </p>

            <div className="live-tester-row">
              <div className="test-widget">
                <p>Nilai Count: <strong className="score-badge">{bug3Count}</strong></p>
                <button onClick={handleSimulateTripleAdd} className="action-btn primary small">
                  Jalankan 3x Tambah
                </button>
                <button onClick={() => setBug3Count(0)} className="action-btn outline small">
                  Reset
                </button>
              </div>

              <div className="code-comparison-box">
                <CodeViewer
                  title={bug3Fixed ? 'Solusi Updater' : 'Stale Snapshot'}
                  code={bug3Fixed ? `// ✅ BENAR: Mengambil nilai antrean terbaru\nsetCount(c => c + 1);\nsetCount(c => c + 1);\nsetCount(c => c + 1); // Bertambah 3!` : `// ❌ SALAH: Membaca snapshot yang sama 3x\nsetCount(count + 1);\nsetCount(count + 1);\nsetCount(count + 1); // Hanya bertambah 1!`}
                />
              </div>
            </div>
          </div>
        )}

        {/* BUG 4: Unstable Key */}
        {activeBugTab === 4 && (
          <div className="bug-case-card">
            <div className="case-title-row">
              <h4>Kasus 4: State Item Tertukar Akibat Key Index</h4>
              <button
                onClick={() => setBug4UseIndex(prev => !prev)}
                className={`pill-btn ${bug4UseIndex ? 'error-pill active' : 'active'}`}
              >
                {bug4UseIndex ? '❌ Sedang Memakai: key={index} (Bermasalah)' : '✅ Sedang Memakai: key={item.id} (Aman)'}
              </button>
            </div>

            <p className="case-desc">
              Ketik teks pada input baris pertama, lalu klik <strong>"Hapus Baris Pertama"</strong>. 
              Jika menggunakan <code>key={'{index}'}</code>, teks Anda akan tertinggal dan salah menempel pada item kedua!
            </p>

            <div className="live-tester-row">
              <div className="test-widget" style={{ flex: 1 }}>
                <button onClick={removeFirstItem} className="action-btn danger small" style={{ marginBottom: 12 }}>
                  🗑️ Hapus Baris Pertama
                </button>

                <div className="mini-item-list">
                  {bug4Items.map((item, index) => {
                    const currentKey = bug4UseIndex ? index : item.id;
                    return (
                      <div key={currentKey} className="mini-row">
                        <span>{item.label} (<code>key="{currentKey}"</code>):</span>
                        <input
                          type="text"
                          defaultValue=""
                          placeholder="Ketik teks di sini..."
                          className="custom-input small"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BUG 5: StrictMode 2x */}
        {activeBugTab === 5 && (
          <div className="bug-case-card">
            <h4>Kasus 5: Effect Berjalan Dua Kali Saat Development</h4>
            <p className="case-desc">
              Ini <strong>bukan bug pada kode Anda</strong>, melainkan fitur bawaan <code>React.StrictMode</code> untuk mendeteksi ketiadaan fungsi cleanup!
            </p>
            <div className="info-box-note">
              <h5>Mengapa React Melakukannya?</h5>
              <p>
                Di mode development, React me-mount, me-unmount, lalu me-mount ulang setiap komponen sekali lagi. 
                Jika Anda lupa membersihkan timer atau event listener di fungsi pembersih <code>return () =&gt; ...</code>, 
                bug kebocoran memori akan segera terdeteksi. Di mode produksi (*production build*), Effect hanya berjalan 1 kali.
              </p>
            </div>
          </div>
        )}

        {/* BUG 6: Locked Input */}
        {activeBugTab === 6 && (
          <div className="bug-case-card">
            <div className="case-title-row">
              <h4>Kasus 6: Input Formulir Terkunci (Locked Input)</h4>
              <button
                onClick={() => setBug6HasOnChange(prev => !prev)}
                className={`pill-btn ${bug6HasOnChange ? 'active' : 'error-pill active'}`}
              >
                {bug6HasOnChange ? '✅ onChange Ditambahkan' : '❌ onChange Dihilangkan (Terkunci)'}
              </button>
            </div>

            <p className="case-desc">
              Ketika Anda memberikan atribut <code>value</code> tanpa event handler <code>onChange</code>, 
              React mengunci nilai input tersebut sehingga pengguna tidak bisa mengetik atau menghapusnya sama sekali!
            </p>

            <div className="live-tester-row">
              <div className="test-widget">
                <label>Uji Mengetik di Sini:</label>
                <input
                  type="text"
                  value={bug6Value}
                  onChange={bug6HasOnChange ? e => setBug6Value(e.target.value) : undefined}
                  className="custom-input"
                />
                <small className="hint-text" style={{ marginTop: 6, display: 'block' }}>
                  {bug6HasOnChange ? '✅ Anda bisa mengetik dengan leluasa!' : '🚫 Coba ketik atau tekan tombol backspace; teks tidak akan berubah!'}
                </small>
              </div>

              <div className="code-comparison-box">
                <CodeViewer
                  title="Form Terkontrol yang Benar"
                  code={`// ✅ BENAR: Pasangkan selalu value dengan onChange\n<input\n  value={name}\n  onChange={e => setName(e.target.value)}\n/>`}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
