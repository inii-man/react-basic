import React, { useState } from 'react';
import { 
  ListTodo, Plus, CheckCircle2, Trash2, Database, 
  HelpCircle, AlertOctagon, BookOpen, ExternalLink, Sparkles 
} from 'lucide-react';
import DecisionWizard from '../DecisionWizard';
import CommonMistakesSandbox from '../CommonMistakesSandbox';
import Chapter6Project from '../Chapter6Project';

/* =========================================================================
   SLIDE 41: Proyek Kecil: Daftar Tugas (Blueprint Arsitektur)
   ========================================================================= */
export function Slide41Demo() {
  return (
    <div className="demo-box">
      <div className="demo-badge">Slide 41 Demo</div>
      <h3>Arsitektur Proyek: Daftar Tugas (Todo App)</h3>
      <p className="demo-desc">
        Slide 42, 43, dan 44 dirancang untuk dirangkai menjadi satu file utuh <code>App.jsx</code>:
      </p>

      <div className="interactive-card">
        <div className="grid-3-col">
          <div className="sub-box">
            <h4>Bagian 1 (Slide 42):</h4>
            <p>State <code>tasks</code>, input <code>text</code>, dan fungsi penambahan <code>add(e)</code> dengan ID acak.</p>
          </div>
          <div className="sub-box">
            <h4>Bagian 2 (Slide 43):</h4>
            <p>Fungsi <code>toggle(id)</code> dengan <code>.map()</code>, <code>remaining</code>, dan elemen <code>&lt;form&gt;</code>.</p>
          </div>
          <div className="sub-box">
            <h4>Bagian 3 (Slide 44):</h4>
            <p>Render daftar <code>&lt;ul&gt;</code>, prop <code>key</code>, checkbox, dan penutupan komponen.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   SLIDE 42: Daftar Tugas: State dan Tambah (Bagian 1 dari 3)
   ========================================================================= */
export function Slide42Demo() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');

  function add(e) {
    e.preventDefault();
    if (!text.trim()) return;
    const task = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      title: text.trim(),
      done: false
    };
    setTasks(ts => [...ts, task]);
    setText('');
  }

  return (
    <div className="demo-box">
      <div className="demo-badge">Slide 42 Demo</div>
      <h3>Bagian 1: State &amp; Fungsi <code>add()</code></h3>
      <p className="demo-desc">
        Uji validasi penambahan tugas baru. Teks spasi kosong akan ditolak dengan <code>.trim()</code>:
      </p>

      <div className="interactive-card">
        <form onSubmit={add} style={{ display: 'flex', gap: 10 }}>
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Ketik tugas baru..."
            className="custom-input"
          />
          <button type="submit" className="action-btn primary small">
            + Tambah
          </button>
        </form>

        <div className="live-preview-box">
          <h4>State Array <code>tasks</code> Saat Ini ({tasks.length}):</h4>
          {tasks.length === 0 ? <p className="text-muted">Array masih kosong. Tambahkan tugas di atas!</p> : (
            tasks.map(t => (
              <p key={t.id} className="log-line">
                ID: <code>{t.id.slice(0, 8)}...</code> | Judul: <strong>{t.title}</strong>
              </p>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   SLIDE 43: Daftar Tugas: Toggle dan Form (Bagian 2 dari 3)
   ========================================================================= */
export function Slide43Demo() {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Belajar Sintaks JSX', done: true },
    { id: '2', title: 'Pahami Alur Props', done: false },
    { id: '3', title: 'Eksperimen State', done: false }
  ]);

  function toggle(id) {
    setTasks(ts => ts.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }

  const remaining = tasks.filter(t => !t.done);

  return (
    <div className="demo-box">
      <div className="demo-badge">Slide 43 Demo</div>
      <h3>Bagian 2: Fungsi <code>toggle()</code> &amp; Derived State <code>remaining</code></h3>
      <p className="demo-desc">
        Klik item di bawah untuk melihat fungsi <code>toggle</code> membalik status tanpa state terpisah untuk remaining:
      </p>

      <div className="interactive-card">
        <div className="status-display-row">
          <span className="remaining-badge">{remaining.length} tugas aktif</span>
          <span className="badge-math">Total: {tasks.length} item</span>
        </div>

        <div className="task-preview-grid">
          {tasks.map(t => (
            <div key={t.id} onClick={() => toggle(t.id)} className={`task-preview-item ${t.done ? 'completed' : ''}`}>
              <CheckCircle2 size={16} className={t.done ? 'icon-done' : 'icon-pending'} />
              <span>{t.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   SLIDE 44: Daftar Tugas: Tampilan Daftar Lengkap (Bagian 3 dari 3)
   ========================================================================= */
export function Slide44Demo() {
  return (
    <div className="demo-box">
      <div className="demo-badge">Slide 44 Demo</div>
      <h3>Aplikasi Utuh: Penggabungan 3 Bagian Slide</h3>
      <p className="demo-desc">
        Ini adalah aplikasi utuh dari gabungan Slide 42, 43, dan 44 dalam satu file <code>App.jsx</code>:
      </p>
      <Chapter6Project />
    </div>
  );
}

/* =========================================================================
   SLIDE 45: Kesalahan yang Sering Muncul
   ========================================================================= */
export function Slide45Demo() {
  return <CommonMistakesSandbox />;
}

/* =========================================================================
   SLIDE 46: Latihan Lanjutan (Enhanced Todo)
   ========================================================================= */
export function Slide46Demo() {
  return (
    <div className="demo-box">
      <div className="demo-badge">Slide 46 Demo</div>
      <h3>Latihan Lanjutan: Filter, Hapus &amp; LocalStorage</h3>
      <p className="demo-desc">
        Versi ini telah dilengkapi dengan filter status, tombol hapus, dan penyimpanan permanen <code>localStorage</code>:
      </p>
      <Chapter6Project />
    </div>
  );
}

/* =========================================================================
   SLIDE 47: Peta Keputusan Sehari-hari
   ========================================================================= */
export function Slide47Demo() {
  return <DecisionWizard />;
}

/* =========================================================================
   SLIDE 48: Referensi dan Langkah Berikutnya
   ========================================================================= */
export function Slide48Demo() {
  const [completedList, setCompletedList] = useState([
    'Dasar JSX & Komponen',
    'Props & Komposisi',
    'State, Immutability & Form',
    'Hooks & Sinkronisasi'
  ]);

  return (
    <div className="demo-box">
      <div className="demo-badge">Slide 48 Demo</div>
      <h3>Referensi Resmi &amp; Langkah Berikutnya 🎓</h3>
      <p className="demo-desc">
        Selamat! Anda telah mempelajari seluruh konsep inti dari materi slide presentasi React Indonesia:
      </p>

      <div className="interactive-card">
        <div className="grid-2-col">
          <div className="sub-box">
            <h4>Tautan Pembelajaran Resmi:</h4>
            <ul style={{ paddingLeft: 18, marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <li>
                <a href="https://react.dev/learn" target="_blank" rel="noreferrer" style={{ color: '#38bdf8' }}>
                  react.dev/learn (Dokumentasi Resmi)
                </a>
              </li>
              <li>
                <a href="https://react.dev/reference/react" target="_blank" rel="noreferrer" style={{ color: '#38bdf8' }}>
                  react.dev/reference (API Reference)
                </a>
              </li>
              <li>
                <a href="https://react.dev/learn/tutorial-tic-tac-toe" target="_blank" rel="noreferrer" style={{ color: '#38bdf8' }}>
                  Tutorial Tic-Tac-Toe
                </a>
              </li>
            </ul>
          </div>

          <div className="sub-box">
            <h4>Rangkuman Capaian Belajar:</h4>
            <div className="pill-group" style={{ marginTop: 8 }}>
              {completedList.map((c, i) => (
                <span key={i} className="pill-btn active">✅ {c}</span>
              ))}
              <span className="pill-btn active" style={{ borderColor: '#10b981' }}>🚀 Siap Bangun Web App!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
