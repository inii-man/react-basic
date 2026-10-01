import React, { useState } from 'react';
import { Play, Sparkles, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import CodeViewer from './CodeViewer';

/**
 * Chapter1Basics.jsx
 * Berisi demo interaktif untuk Bab 01: Dasar React dan JSX (Slide 1 - 7)
 */
export default function Chapter1Basics({ activeSlide = 3 }) {
  // Demo Slide 3: Deklaratif vs Imperatif
  const [isOnline, setIsOnline] = useState(true);
  const [userRole, setUserRole] = useState('Frontend Developer');

  // Demo Slide 4: JS Essentials Playground
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Pelajari Sintaks JSX', done: true },
    { id: 2, title: 'Kuasai Array.map() & filter()', done: false },
    { id: 3, title: 'Pahami Spread Operator', done: true },
    { id: 4, title: 'Eksperimen State di Playground', done: false }
  ]);
  const [filterMode, setFilterMode] = useState('all'); // 'all', 'active', 'done'

  // Demo Slide 6: Greeting Component
  const [greetingName, setGreetingName] = useState('Sulaiman');
  const [greetingEmoji, setGreetingEmoji] = useState('🚀');

  // Demo Slide 7: JSX Expression
  const [numA, setNumA] = useState(15);
  const [numB, setNumB] = useState(25);

  const filteredTasks = tasks.filter(t => {
    if (filterMode === 'active') return !t.done;
    if (filterMode === 'done') return t.done;
    return true;
  });

  return (
    <div className="chapter-demos">
      {/* Slide 3 Demo: Deklaratif vs Imperatif */}
      <section className="demo-box">
        <div className="demo-badge">Slide 3 Demo</div>
        <h3>Simulasi Deklaratif (React) vs Imperatif (Vanilla JS)</h3>
        <p className="demo-desc">
          Di React, kita cukup mendeklarasikan tampilan berdasarkan state <code>isOnline</code>. 
          React secara otomatis memperbarui warna, teks, dan animasi tanpa kita perlu mencari elemen di DOM!
        </p>

        <div className="interactive-card">
          <div className="status-display-row">
            <span className={`status-pill ${isOnline ? 'online' : 'offline'}`}>
              <span className="dot" />
              {isOnline ? '🟢 Status: Sedang Aktif (Online)' : '⚪ Status: Tidak Aktif (Offline)'}
            </span>
            <button
              onClick={() => setIsOnline(prev => !prev)}
              className="action-btn primary"
            >
              Toggle Status (Ubah State)
            </button>
          </div>

          <div className="role-selector">
            <label>Pilih Peran:</label>
            <div className="pill-group">
              {['Frontend Developer', 'Mobile Developer', 'UI/UX Designer', 'React Learner'].map(r => (
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
            <h4>Pratinjau Komponen Profil:</h4>
            <div className="user-profile-preview">
              <div className="avatar-placeholder">⚛️</div>
              <div>
                <h5>Pengguna Terdaftar</h5>
                <p className="user-role-text">{userRole}</p>
                <small className="update-note">
                  Dirender secara otomatis saat state berubah
                </small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 4 Demo: JS Essentials (map, filter, spread) */}
      <section className="demo-box">
        <div className="demo-badge">Slide 4 Demo</div>
        <h3>Eksperimen Bekal JavaScript: <code>map()</code>, <code>filter()</code> &amp; Spread</h3>
        <p className="demo-desc">
          React sangat mengandalkan metode array murni JavaScript. Coba filter daftar di bawah ini untuk melihat 
          hasil komputasi instan:
        </p>

        <div className="interactive-card">
          <div className="filter-controls">
            <span>Filter Tugas:</span>
            <button
              onClick={() => setFilterMode('all')}
              className={`pill-btn ${filterMode === 'all' ? 'active' : ''}`}
            >
              Semua ({tasks.length})
            </button>
            <button
              onClick={() => setFilterMode('active')}
              className={`pill-btn ${filterMode === 'active' ? 'active' : ''}`}
            >
              Belum Selesai ({tasks.filter(t => !t.done).length})
            </button>
            <button
              onClick={() => setFilterMode('done')}
              className={`pill-btn ${filterMode === 'done' ? 'active' : ''}`}
            >
              Selesai ({tasks.filter(t => t.done).length})
            </button>
          </div>

          <div className="task-preview-grid">
            {filteredTasks.map(t => (
              <div
                key={t.id}
                onClick={() => {
                  // Menggunakan spread operator untuk update immutable
                  setTasks(prev => prev.map(item => item.id === t.id ? { ...item, done: !item.done } : item));
                }}
                className={`task-preview-item ${t.done ? 'completed' : ''}`}
                title="Klik untuk toggle status selesai"
              >
                <CheckCircle2 size={18} className={t.done ? 'icon-done' : 'icon-pending'} />
                <span>{t.title}</span>
                <span className="task-tag">{t.done ? 'DONE' : 'PENDING'}</span>
              </div>
            ))}
          </div>
          <small className="hint-text">
            💡 Klik salah satu item untuk melihat Spread Operator <code>{`{ ...item, done: !item.done }`}</code> beraksi secara instan!
          </small>
        </div>
      </section>

      {/* Slide 6 & 7 Demo: Greeting & JSX Rules */}
      <section className="demo-box">
        <div className="demo-badge">Slide 6 &amp; 7 Demo</div>
        <h3>Komponen Function &amp; Evaluasi Ekspresi JSX <code>{`{}`}</code></h3>
        <p className="demo-desc">
          Kurung kurawal di JSX memungkinkan kita memasukkan segala ekspresi JavaScript, 
          mulai dari variabel, kalkulasi matematika, hingga pemanggilan fungsi string:
        </p>

        <div className="interactive-card">
          <div className="grid-2-col">
            <div className="input-group">
              <label htmlFor="input-name">Nama Peserta (Props):</label>
              <input
                id="input-name"
                type="text"
                value={greetingName}
                onChange={e => setGreetingName(e.target.value)}
                placeholder="Masukkan nama..."
                className="custom-input"
              />
            </div>
            <div className="input-group">
              <label>Pilih Ikon Emoji:</label>
              <div className="emoji-picker">
                {['🚀', '⚛️', '🔥', '✨', '💻', '🎯'].map(emoji => (
                  <button
                    key={emoji}
                    onClick={() => setGreetingEmoji(emoji)}
                    className={`emoji-btn ${greetingEmoji === emoji ? 'active' : ''}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="math-row">
            <label>Uji Ekspresi Matematika:</label>
            <div className="math-inputs">
              <input
                type="number"
                value={numA}
                onChange={e => setNumA(Number(e.target.value))}
                className="custom-input small"
              />
              <span>+</span>
              <input
                type="number"
                value={numB}
                onChange={e => setNumB(Number(e.target.value))}
                className="custom-input small"
              />
              <span>=</span>
              <strong className="math-result">{numA + numB}</strong>
            </div>
          </div>

          <div className="rendered-greeting-result">
            <h4>Hasil Render Komponen <code>&lt;Greeting /&gt;</code>:</h4>
            <div className="greeting-card">
              <span className="big-emoji">{greetingEmoji}</span>
              <div>
                <h2>Selamat Belajar, {greetingName || 'Teman'}!</h2>
                <p>
                  Nama dalam huruf besar: <strong>{greetingName.toUpperCase() || 'TEMAN'}</strong>
                </p>
                <p className="badge-math">
                  Hasil komputasi JSX: {numA} + {numB} = {numA + numB}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
