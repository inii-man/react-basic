import React, { useState } from 'react';
import { 
  Sparkles, Layers, CheckCircle2, Play, ArrowRight, 
  Terminal, Code2, RefreshCw, ShieldAlert, Check
} from 'lucide-react';

/* =========================================================================
   SLIDE 1: Memahami React (Welcome Banner & Interactive Introduction)
   ========================================================================= */
export function Slide1Demo() {
  const [likes, setLikes] = useState(42);
  const [learnerName, setLearnerName] = useState('Developer Indonesia');

  return (
    <div className="demo-box">
      <div className="demo-badge">Slide 1 Demo</div>
      <h3>Selamat Datang di React Indonesia Playground 🇮🇩</h3>
      <p className="demo-desc">
        Ini adalah gerbang pembelajaran interaktif Anda. Coba ketik nama Anda dan klik tombol apresiasi di bawah ini untuk melihat bagaimana React merefleksikan perubahan secara instan:
      </p>

      <div className="interactive-card">
        <div className="input-group">
          <label>Nama Anda:</label>
          <input
            type="text"
            value={learnerName}
            onChange={e => setLearnerName(e.target.value)}
            placeholder="Ketik nama Anda..."
            className="custom-input"
          />
        </div>

        <div className="live-preview-box">
          <div className="user-profile-preview">
            <span className="user-avatar-emoji">⚛️</span>
            <div>
              <h5>Halo, {learnerName || 'Kawan'}!</h5>
              <p>Selamat menjelajahi 48 konsep inti React!</p>
            </div>
          </div>
        </div>

        <div className="status-display-row">
          <button
            onClick={() => setLikes(c => c + 1)}
            className="action-btn primary"
          >
            ❤️ Beri Semangat ({likes})
          </button>
          <span className="update-note">Reaktif • State • Komponen</span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   SLIDE 2: Peta Materi (Interactive Curriculum Explorer)
   ========================================================================= */
export function Slide2Demo({ onSelectSlide }) {
  const [activeChapter, setActiveChapter] = useState(1);

  const chapters = [
    { id: 1, title: '01 Dasar React dan JSX', slides: 'Slide 1 - 7', desc: 'Pengenalan React, bekal JS, setup Vite, dan sintaks JSX.' },
    { id: 2, title: '02 Komponen, Props & Komposisi', slides: 'Slide 8 - 12', desc: 'Props, children composition, conditional render, keys, dan events.' },
    { id: 3, title: '03 State, Event & Form', slides: 'Slide 13 - 20', desc: 'useState, siklus render, snapshot, immutability, derived state, form.' },
    { id: 4, title: '04 Hooks & Sinkronisasi', slides: 'Slide 21 - 29', desc: 'Rules of hooks, useEffect, race conditions, useRef, reducer, context.' },
    { id: 5, title: '05 Data, Performa & Arsitektur', slides: 'Slide 30 - 40', desc: 'useMemo, useTransition, Suspense, Error Boundary, React 19 Actions.' },
    { id: 6, title: '06 Proyek & Latihan', slides: 'Slide 41 - 48', desc: 'Aplikasi Todo lengkap, 6 bug fatal, latihan, dan peta keputusan.' }
  ];

  return (
    <div className="demo-box">
      <div className="demo-badge">Slide 2 Demo</div>
      <h3>Peta Materi Interaktif: 6 Bab Utama</h3>
      <p className="demo-desc">
        Klik salah satu bab di bawah untuk melihat rincian cakupan materinya:
      </p>

      <div className="interactive-card">
        <div className="pill-group">
          {chapters.map(ch => (
            <button
              key={ch.id}
              onClick={() => setActiveChapter(ch.id)}
              className={`pill-btn ${activeChapter === ch.id ? 'active' : ''}`}
            >
              Bab 0{ch.id}
            </button>
          ))}
        </div>

        {chapters.filter(ch => ch.id === activeChapter).map(ch => (
          <div key={ch.id} className="live-preview-box">
            <h4>{ch.title} ({ch.slides})</h4>
            <p>{ch.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   SLIDE 3: Apa itu React? (Deklaratif vs Imperatif)
   ========================================================================= */
export function Slide3Demo() {
  const [isOnline, setIsOnline] = useState(true);
  const [userRole, setUserRole] = useState('Frontend Developer');

  return (
    <div className="demo-box">
      <div className="demo-badge">Slide 3 Demo</div>
      <h3>Deklaratif (React) vs Imperatif (Vanilla JS)</h3>
      <p className="demo-desc">
        Di React, kita cukup mendeklarasikan: <em>"Jika isOnline bernilai true, tampilkan hijau, jika false tampilkan abu-abu."</em> 
        React yang mengurus manipulasi DOM di balik layar!
      </p>

      <div className="interactive-card">
        <div className="status-display-row">
          <span className={`status-pill ${isOnline ? 'online' : 'offline'}`}>
            <span className="dot" />
            {isOnline ? '🟢 Status: Aktif (Online)' : '⚪ Status: Tidak Aktif (Offline)'}
          </span>
          <button
            onClick={() => setIsOnline(prev => !prev)}
            className="action-btn primary small"
          >
            Toggle isOnline State
          </button>
        </div>

        <div className="role-selector">
          <label>Pilih Peran Pengguna:</label>
          <div className="pill-group">
            {['Frontend Developer', 'Mobile Engineer', 'Fullstack Learner'].map(r => (
              <button
                key={r}
                onClick={() => setUserRole(r)}
                className={`pill-btn ${userRole === r ? 'active' : ''}`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="live-preview-box">
          <div className="user-profile-preview">
            <span className="avatar-placeholder">💻</span>
            <div>
              <h5>Sulaiman Saleh</h5>
              <p className="user-role-text">{userRole}</p>
              <small className="update-note">UI otomatis sinkron dengan state saat ini.</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   SLIDE 4: Bekal JavaScript (Destructuring, Spread, map, filter)
   ========================================================================= */
export function Slide4Demo() {
  const [taskList, setTaskList] = useState([
    { id: 1, title: 'Pahami Destructuring', done: true },
    { id: 2, title: 'Kuasai Spread Operator', done: true },
    { id: 3, title: 'Gunakan Array .map() dan .filter()', done: false }
  ]);
  const [filterMode, setFilterMode] = useState('all');

  const filtered = taskList.filter(t => {
    if (filterMode === 'active') return !t.done;
    if (filterMode === 'done') return t.done;
    return true;
  });

  return (
    <div className="demo-box">
      <div className="demo-badge">Slide 4 Demo</div>
      <h3>Bekal JS: Destructuring, Spread, <code>map()</code> &amp; <code>filter()</code></h3>
      <p className="demo-desc">
        Klik item di bawah untuk mencoba <strong>Spread Operator</strong> mengubah status <code>{`{ ...t, done: !t.done }`}</code>:
      </p>

      <div className="interactive-card">
        <div className="filter-controls">
          <span>Filter (filter):</span>
          {['all', 'active', 'done'].map(m => (
            <button
              key={m}
              onClick={() => setFilterMode(m)}
              className={`pill-btn ${filterMode === m ? 'active' : ''}`}
            >
              {m === 'all' ? 'Semua' : m === 'active' ? 'Aktif' : 'Selesai'}
            </button>
          ))}
        </div>

        <div className="task-preview-grid">
          {filtered.map(t => (
            <div
              key={t.id}
              onClick={() => {
                setTaskList(prev => prev.map(item => item.id === t.id ? { ...item, done: !item.done } : item));
              }}
              className={`task-preview-item ${t.done ? 'completed' : ''}`}
            >
              <CheckCircle2 size={16} className={t.done ? 'icon-done' : 'icon-pending'} />
              <span>{t.title}</span>
              <span className="task-tag">{t.done ? 'DONE' : 'PENDING'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   SLIDE 5: Menjalankan Proyek (Simulasi CLI Vite)
   ========================================================================= */
export function Slide5Demo() {
  const [cliStep, setCliStep] = useState(1);
  const [serverRunning, setServerRunning] = useState(false);

  return (
    <div className="demo-box">
      <div className="demo-badge">Slide 5 Demo</div>
      <h3>Simulasi Menjalankan Proyek dengan Vite</h3>
      <p className="demo-desc">
        Klik tombol langkah per langkah di bawah untuk melihat alur kerja CLI membuat proyek React:
      </p>

      <div className="interactive-card">
        <div className="pill-group">
          <button
            onClick={() => { setCliStep(1); setServerRunning(false); }}
            className={`pill-btn ${cliStep === 1 ? 'active' : ''}`}
          >
            1. npm create vite
          </button>
          <button
            onClick={() => { setCliStep(2); setServerRunning(false); }}
            className={`pill-btn ${cliStep === 2 ? 'active' : ''}`}
          >
            2. npm install
          </button>
          <button
            onClick={() => { setCliStep(3); setServerRunning(true); }}
            className={`pill-btn ${cliStep === 3 ? 'active' : ''}`}
          >
            3. npm run dev
          </button>
        </div>

        <div className="snapshot-logs">
          <h5>Output Terminal:</h5>
          {cliStep === 1 && (
            <p className="log-line text-cyan">$ npm create vite@latest react-lab -- --template react{"\n"}✔ Scaffolding project in ./react-lab...</p>
          )}
          {cliStep === 2 && (
            <p className="log-line text-emerald">$ cd react-lab &amp;&amp; npm install{"\n"}added 18 packages in 0.8s. 0 vulnerabilities.</p>
          )}
          {cliStep === 3 && (
            <p className="log-line text-emerald">$ npm run dev{"\n"}➜ Local: http://localhost:3000/ (ready in 120ms)</p>
          )}
        </div>

        {serverRunning && (
          <div className="live-preview-box" style={{ borderColor: 'rgba(16, 185, 129, 0.4)' }}>
            <h4>Browser Render (App.jsx):</h4>
            <h2 style={{ color: '#38bdf8' }}>Halo React Indonesia! 🚀</h2>
            <small className="update-note">HMR (Hot Module Replacement) aktif</small>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================================
   SLIDE 6: Komponen (Greeting Function Component)
   ========================================================================= */
export function Slide6Demo() {
  const [userName, setUserName] = useState('Sulaiman');
  const [userRole, setUserRole] = useState('Frontend Engineer');

  return (
    <div className="demo-box">
      <div className="demo-badge">Slide 6 Demo</div>
      <h3>Komponen Function: <code>&lt;Greeting /&gt;</code></h3>
      <p className="demo-desc">
        Komponen function diawali dengan <strong>huruf kapital</strong> dan mengembalikan struktur UI. 
        Ketik nama di bawah untuk melihat komponen bereaksi:
      </p>

      <div className="interactive-card">
        <div className="input-group">
          <label htmlFor="slide6-input">Nama Pengguna:</label>
          <input
            id="slide6-input"
            type="text"
            value={userName}
            onChange={e => setUserName(e.target.value)}
            className="custom-input"
          />
        </div>

        <div className="live-preview-box">
          <div className="greeting-card">
            <span className="big-emoji">👋</span>
            <div>
              <h3>Selamat Belajar, {userName || 'Kawan'}!</h3>
              <p>Komponen function <code>&lt;Greeting name="{userName}" /&gt;</code> telah dirender.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   SLIDE 7: Aturan Penulisan JSX
   ========================================================================= */
export function Slide7Demo() {
  const [studentName, setStudentName] = useState('Rani');
  const [mathA, setMathA] = useState(12);
  const [mathB, setMathB] = useState(8);

  return (
    <div className="demo-box">
      <div className="demo-badge">Slide 7 Demo</div>
      <h3>Aturan JSX: Fragment, Tag Tertutup, &amp; Kurung Kurawal <code>{`{}`}</code></h3>
      <p className="demo-desc">
        JSX menggabungkan HTML dengan kebebasan JavaScript. Kurung kurawal mengevaluasi variabel maupun kalkulasi matematika seketika:
      </p>

      <div className="interactive-card">
        <div className="grid-2-col">
          <div className="input-group">
            <label>Nama Siswa:</label>
            <input
              type="text"
              value={studentName}
              onChange={e => setStudentName(e.target.value)}
              className="custom-input"
            />
          </div>
          <div className="input-group">
            <label>Kalkulasi Matematika di JSX:</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                type="number"
                value={mathA}
                onChange={e => setMathA(Number(e.target.value))}
                className="custom-input small"
              />
              <span>+</span>
              <input
                type="number"
                value={mathB}
                onChange={e => setMathB(Number(e.target.value))}
                className="custom-input small"
              />
            </div>
          </div>
        </div>

        <div className="live-preview-box">
          <h4>Hasil Evaluasi JSX:</h4>
          <p>Halo, <strong>{studentName}</strong>!</p>
          <p className="badge-math">Hasil ekspresi {mathA} + {mathB} = <strong>{mathA + mathB}</strong></p>
          <small className="update-note">Tag <code>&lt;img /&gt;</code> dan <code>&lt;input /&gt;</code> selalu ditutup rapi.</small>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   SLIDE 8: Props (Badge Kustom & Default Props)
   ========================================================================= */
export function Slide8Demo() {
  const [badgeLabel, setBadgeLabel] = useState('Aktif');
  const [badgeColor, setBadgeColor] = useState('#10b981');

  return (
    <div className="demo-box">
      <div className="demo-badge">Slide 8 Demo</div>
      <h3>Props: Komponen Badge Kustom &amp; Default Props</h3>
      <p className="demo-desc">
        Props dikirim oleh parent ke child dan bersifat <em>read-only</em>. Ubah label dan pilih warna untuk melihatnya:
      </p>

      <div className="interactive-card">
        <div className="grid-2-col">
          <div className="input-group">
            <label>Label Badge:</label>
            <input
              type="text"
              value={badgeLabel}
              onChange={e => setBadgeLabel(e.target.value)}
              className="custom-input"
            />
          </div>
          <div className="input-group">
            <label>Pilih Warna Prop:</label>
            <div className="color-presets">
              {['#10b981', '#38bdf8', '#818cf8', '#f59e0b', '#f43f5e'].map(c => (
                <button
                  key={c}
                  onClick={() => setBadgeColor(c)}
                  className="color-dot"
                  style={{ backgroundColor: c, border: badgeColor === c ? '2px solid #fff' : 'none' }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="live-preview-box" style={{ alignItems: 'center' }}>
          <h4>Pratinjau <code>&lt;Badge label="{badgeLabel}" color="{badgeColor}" /&gt;</code>:</h4>
          <span
            style={{
              backgroundColor: badgeColor,
              color: '#ffffff',
              padding: '6px 18px',
              borderRadius: '999px',
              fontWeight: 700,
              fontSize: '0.95rem'
            }}
          >
            {badgeLabel || '(Kosong)'}
          </span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   SLIDE 9: Komposisi dengan children
   ========================================================================= */
export function Slide9Demo() {
  const [panelTitle, setPanelTitle] = useState('Profil Belajar');
  const [contentType, setContentType] = useState('text');

  return (
    <div className="demo-box">
      <div className="demo-badge">Slide 9 Demo</div>
      <h3>Komposisi dengan Prop Spesial: <code>children</code></h3>
      <p className="demo-desc">
        Komponen wrapper <code>&lt;Panel&gt;</code> membungkus elemen apa pun yang diletakkan di antara tag pembuka dan penutupnya:
      </p>

      <div className="interactive-card">
        <div className="input-group">
          <label>Judul Panel (title):</label>
          <input
            type="text"
            value={panelTitle}
            onChange={e => setPanelTitle(e.target.value)}
            className="custom-input"
          />
        </div>

        <div className="pill-group">
          <span>Pilih Isi children:</span>
          <button onClick={() => setContentType('text')} className={`pill-btn ${contentType === 'text' ? 'active' : ''}`}>Paragraf</button>
          <button onClick={() => setContentType('button')} className={`pill-btn ${contentType === 'button' ? 'active' : ''}`}>Tombol Aksi</button>
          <button onClick={() => setContentType('stats')} className={`pill-btn ${contentType === 'stats' ? 'active' : ''}`}>Statistik</button>
        </div>

        <div className="panel-wrapper">
          <div className="panel-header-bar">
            <Layers size={18} className="text-cyan" />
            <h4>{panelTitle}</h4>
          </div>
          <div className="panel-content-body">
            {contentType === 'text' && <p>Halo, saya sedang mempelajari konsep komposisi komponen React!</p>}
            {contentType === 'button' && <button className="action-btn primary small">Hubungi Pengembang ✉️</button>}
            {contentType === 'stats' && <div className="stats-row"><div className="stat-card"><strong>48</strong><span>Slide</span></div><div className="stat-card"><strong>100%</strong><span>Interaktif</span></div></div>}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   SLIDE 10: Conditional Rendering
   ========================================================================= */
export function Slide10Demo() {
  const [isLogged, setIsLogged] = useState(false);
  const [itemsCount, setItemsCount] = useState(0);

  return (
    <div className="demo-box">
      <div className="demo-badge">Slide 10 Demo</div>
      <h3>Conditional Rendering &amp; Jebakan Angka 0 pada <code>&amp;&amp;</code></h3>
      <p className="demo-desc">
        Gunakan operator ternary <code>? :</code> untuk 2 kondisi, dan waspadai penulisan <code>itemsCount &amp;&amp;</code> saat bernilai 0:
      </p>

      <div className="interactive-card">
        <div className="status-display-row">
          <button
            onClick={() => setIsLogged(prev => !prev)}
            className={`action-btn ${isLogged ? 'primary' : 'outline'}`}
          >
            {isLogged ? '🔓 Sudah Login' : '🔒 Belum Login (Guest)'}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>Jumlah Keranjang:</span>
            <button onClick={() => setItemsCount(c => Math.max(0, c - 1))} className="action-btn small">-</button>
            <strong>{itemsCount}</strong>
            <button onClick={() => setItemsCount(c => c + 1)} className="action-btn small">+</button>
          </div>
        </div>

        <div className="live-preview-box">
          <h4>Hasil Render:</h4>
          {isLogged ? (
            <p className="text-emerald">✅ Selamat Datang, Pengguna Terdaftar!</p>
          ) : (
            <p className="text-muted">Silakan klik Login terlebih dahulu.</p>
          )}

          {itemsCount > 0 ? (
            <span className="badge-math">🛒 Ada {itemsCount} barang di keranjang</span>
          ) : (
            <small className="update-note">Keranjang belanja kosong (Aman dari bug angka 0).</small>
          )}
        </div>
      </div>
    </div>
  );
}
