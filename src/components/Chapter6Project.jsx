import React, { useState, useEffect } from 'react';
import { CheckSquare, Square, Trash2, Plus, Sparkles, Filter, Database, CheckCircle2 } from 'lucide-react';

/**
 * Chapter6Project.jsx
 * Berisi demo interaktif untuk Bab 06: Proyek Kecil dan Latihan (Slide 41 - 44, 46)
 * Mengimplementasikan Daftar Tugas secara utuh dengan mode original dan mode latihan lanjutan.
 */
export default function Chapter6Project() {
  const [projectMode, setProjectMode] = useState('enhanced'); // 'original' (Slide 42-44) | 'enhanced' (Slide 46)
  
  // State Proyek Utama (Slide 42)
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('react_lab_tasks_demo');
      return saved ? JSON.parse(saved) : [
        { id: '1', title: 'Belajar Sintaks Dasar JSX', done: true },
        { id: '2', title: 'Pahami Alur Props & Komposisi', done: true },
        { id: '3', title: 'Kuasai useState & Immutability', done: false },
        { id: '4', title: 'Eksperimen dengan Proyek Todo ini', done: false }
      ];
    } catch {
      return [
        { id: '1', title: 'Belajar Sintaks Dasar JSX', done: true },
        { id: '2', title: 'Pahami Alur Props & Komposisi', done: true }
      ];
    }
  });

  const [text, setText] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'active', 'completed'
  const [searchTerm, setSearchTerm] = useState('');
  const [persistToStorage, setPersistToStorage] = useState(true);

  // Simpan ke localStorage jika opsi diaktifkan (Slide 46 Latihan Lanjutan)
  useEffect(() => {
    if (persistToStorage) {
      localStorage.setItem('react_lab_tasks_demo', JSON.stringify(tasks));
    }
  }, [tasks, persistToStorage]);

  // FUNGSI ADD (Slide 42)
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

  // FUNGSI TOGGLE (Slide 43)
  function toggle(id) {
    setTasks(ts =>
      ts.map(t =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  }

  // FUNGSI HAPUS (Slide 46 Latihan Lanjutan)
  function deleteTask(id) {
    setTasks(ts => ts.filter(t => t.id !== id));
  }

  // NILAI TURUNAN (Slide 43)
  const remaining = tasks.filter(t => !t.done);

  // Filter untuk mode lanjutan
  const displayedTasks = tasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;

    if (filterType === 'active') return !t.done;
    if (filterType === 'completed') return t.done;
    return true;
  });

  return (
    <div className="chapter-demos">
      <section className="demo-box">
        <div className="demo-badge">Slide 41 – 44 &amp; 46</div>
        <h3>Aplikasi Daftar Tugas (Todo App) — Proyek Utama</h3>
        <p className="demo-desc">
          Ini adalah aplikasi nyata yang dibangun dari gabungan kode Slide 42, 43, dan 44. 
          Anda dapat berpindah antara <strong>"Kode Slide Asli"</strong> atau <strong>"Mode Latihan Lanjutan (Slide 46)"</strong>:
        </p>

        <div className="interactive-card">
          <div className="project-mode-tabs">
            <button
              onClick={() => setProjectMode('original')}
              className={`pill-btn ${projectMode === 'original' ? 'active' : ''}`}
            >
              📄 Versi Asli Slide 42 – 44
            </button>
            <button
              onClick={() => setProjectMode('enhanced')}
              className={`pill-btn ${projectMode === 'enhanced' ? 'active' : ''}`}
            >
              🚀 Versi Latihan Lanjutan (Slide 46)
            </button>
          </div>

          <div className="todo-app-container">
            <div className="todo-header-row">
              <h2>Daftar Tugas</h2>
              <span className="remaining-badge">
                <strong>{remaining.length}</strong> tugas aktif dari {tasks.length}
              </span>
            </div>

            {/* Input Form (Slide 42 & 43) */}
            <form onSubmit={add} className="todo-main-form">
              <label htmlFor="task" className="sr-only">Tugas baru</label>
              <input
                id="task"
                type="text"
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Tuliskan tugas baru..."
                className="custom-input todo-input"
              />
              <button type="submit" className="action-btn primary">
                <Plus size={16} /> Tambah
              </button>
            </form>

            {/* Fitur Lanjutan Slide 46 */}
            {projectMode === 'enhanced' && (
              <div className="enhanced-controls-panel">
                <div className="search-filter-row">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Saring tugas berdasarkan kata..."
                    className="custom-input small-input"
                  />
                  <div className="filter-pill-group">
                    <button
                      onClick={() => setFilterType('all')}
                      className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}
                    >
                      Semua ({tasks.length})
                    </button>
                    <button
                      onClick={() => setFilterType('active')}
                      className={`filter-btn ${filterType === 'active' ? 'active' : ''}`}
                    >
                      Aktif ({remaining.length})
                    </button>
                    <button
                      onClick={() => setFilterType('completed')}
                      className={`filter-btn ${filterType === 'completed' ? 'active' : ''}`}
                    >
                      Selesai ({tasks.length - remaining.length})
                    </button>
                  </div>
                </div>

                <div className="storage-toggle-row">
                  <label className="checkbox-label small">
                    <input
                      type="checkbox"
                      checked={persistToStorage}
                      onChange={e => setPersistToStorage(e.target.checked)}
                    />
                    <span><Database size={13} /> Simpan otomatis ke LocalStorage (Data tetap ada saat refresh)</span>
                  </label>

                  {tasks.some(t => t.done) && (
                    <button
                      onClick={() => setTasks(ts => ts.filter(t => !t.done))}
                      className="action-btn danger small"
                    >
                      Hapus Semua Tugas Selesai
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* List Tampilan Tugas (Slide 44) */}
            <div className="todo-items-wrapper">
              {displayedTasks.length === 0 ? (
                <div className="empty-todo-state">
                  <CheckCircle2 size={32} className="text-emerald" />
                  <p>Tidak ada tugas yang cocok. Tambahkan tugas baru di atas!</p>
                </div>
              ) : (
                <ul className="todo-ul">
                  {displayedTasks.map(task => (
                    <li key={task.id} className={`todo-li ${task.done ? 'is-completed' : ''}`}>
                      <label className="todo-item-label">
                        <input
                          type="checkbox"
                          checked={task.done}
                          onChange={() => toggle(task.id)}
                          className="todo-checkbox"
                        />
                        <span className="todo-item-title">{task.title}</span>
                      </label>

                      {projectMode === 'enhanced' && (
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="delete-task-btn"
                          title="Hapus tugas ini"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="todo-footer-meta">
              <small>
                💡 Didukung oleh arsitektur state murni React: <code>useState</code>, immutability <code>[...ts, task]</code>, dan derived state <code>remaining.length</code>.
              </small>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
