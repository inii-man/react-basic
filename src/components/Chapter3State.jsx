import React, { useState } from 'react';
import { Camera, Zap, CheckCircle, RefreshCcw, User, MessageSquare, AlertCircle } from 'lucide-react';

/**
 * Chapter3State.jsx
 * Berisi demo interaktif untuk Bab 03: State, Event, dan Form (Slide 13 - 20)
 */
export default function Chapter3State() {
  // Slide 13 & 15: State Snapshot Lab
  const [snapshotCount, setSnapshotCount] = useState(0);
  const [snapshotLogs, setSnapshotLogs] = useState([]);

  // Slide 16: Immutable Object & Array
  const [profile, setProfile] = useState({ name: 'Ayu Lestari', role: 'UI Engineer', city: 'Jakarta' });
  const [todoList, setTodoList] = useState([
    { id: '1', title: 'Belajar useState', done: true },
    { id: '2', title: 'Pahami Snapshot State', done: false }
  ]);
  const [newTodoInput, setNewTodoInput] = useState('');

  // Slide 17: Derived State
  const [searchQuery, setSearchQuery] = useState('');

  // Slide 18: Controlled Form
  const [formData, setFormData] = useState({ fullName: '', email: '', agreement: false });
  const [simulateLocked, setSimulateLocked] = useState(false);

  // Slide 19: Lifting State Up
  const [sharedText, setSharedText] = useState('React membuat antarmuka terasa hidup!');

  // Slide 20: Key reset demo (Chat recipient)
  const [activeRecipient, setActiveRecipient] = useState('Alice');

  // Snapshot Test: Direct (count + 1)
  const runDirectUpdates = () => {
    const startVal = snapshotCount;
    setSnapshotCount(snapshotCount + 1);
    setSnapshotCount(snapshotCount + 1);
    setSnapshotCount(snapshotCount + 1);

    setSnapshotLogs(prev => [
      `[Direct: 3x setCount(count + 1)] Dibaca dari snapshot: ${startVal} -> Hanya bertambah 1!`,
      ...prev.slice(0, 5)
    ]);
  };

  // Snapshot Test: Functional Updater (c => c + 1)
  const runFunctionalUpdates = () => {
    const startVal = snapshotCount;
    setSnapshotCount(c => c + 1);
    setSnapshotCount(c => c + 1);
    setSnapshotCount(c => c + 1);

    setSnapshotLogs(prev => [
      `[Updater: 3x setCount(c => c + 1)] Menggunakan antrean update -> Bertambah 3!`,
      ...prev.slice(0, 5)
    ]);
  };

  // Derived calculations (Slide 17)
  const filteredTodos = todoList.filter(t =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const activeRemainingCount = todoList.filter(t => !t.done).length;

  return (
    <div className="chapter-demos">
      {/* Slide 15: State as Snapshot Lab */}
      <section className="demo-box">
        <div className="demo-badge">Slide 15 Demo</div>
        <h3>Laboratorium: State Adalah Snapshot</h3>
        <p className="demo-desc">
          Buktikan langsung konsep Slide 15! Nilai variabel state tidak berubah seketika di baris berikutnya. 
          Bandingkan hasil mengklik <strong>Direct (count + 1) 3x</strong> versus <strong>Updater (c =&gt; c + 1) 3x</strong>:
        </p>

        <div className="interactive-card">
          <div className="snapshot-scoreboard">
            <div className="score-box">
              <span>Nilai State Saat Ini:</span>
              <h2 className="score-number">{snapshotCount}</h2>
            </div>
            <div className="score-actions">
              <button onClick={runDirectUpdates} className="action-btn outline">
                Jalankan 3x <code>setCount(count + 1)</code>
              </button>
              <button onClick={runFunctionalUpdates} className="action-btn primary">
                Jalankan 3x <code>setCount(c =&gt; c + 1)</code>
              </button>
              <button onClick={() => setSnapshotCount(0)} className="action-btn small">
                Reset ke 0
              </button>
            </div>
          </div>

          <div className="snapshot-logs">
            <h5>Riwayat Log Eksekusi:</h5>
            {snapshotLogs.length === 0 ? (
              <p className="empty-log">Klik salah satu tombol di atas untuk melihat perilakunya...</p>
            ) : (
              <ul>
                {snapshotLogs.map((log, i) => (
                  <li key={i} className="log-line">{log}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* Slide 16: Immutable Object & Array Studio */}
      <section className="demo-box">
        <div className="demo-badge">Slide 16 Demo</div>
        <h3>Studio Immutability: Mengubah Object &amp; Array</h3>
        <p className="demo-desc">
          Di React, kita dilarang melakukan mutasi langsung (seperti <code>profile.name = '...'</code> atau <code>tasks.push(...)</code>).
          Semua perubahan harus menggunakan <strong>Spread Operator</strong>:
        </p>

        <div className="interactive-card">
          <div className="grid-2-col">
            {/* Object Immutability */}
            <div className="sub-box">
              <h4>1. Update State Object:</h4>
              <div className="input-group">
                <label>Nama:</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                  className="custom-input"
                />
              </div>
              <div className="input-group">
                <label>Kota:</label>
                <input
                  type="text"
                  value={profile.city}
                  onChange={e => setProfile(p => ({ ...p, city: e.target.value }))}
                  className="custom-input"
                />
              </div>
              <div className="profile-preview-card">
                <strong>{profile.name}</strong>
                <span>{profile.role} • 📍 {profile.city}</span>
              </div>
            </div>

            {/* Array Immutability */}
            <div className="sub-box">
              <h4>2. Update State Array (.map, .filter, spread):</h4>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  if (!newTodoInput.trim()) return;
                  setTodoList(prev => [
                    ...prev,
                    { id: String(Date.now()), title: newTodoInput.trim(), done: false }
                  ]);
                  setNewTodoInput('');
                }}
                className="add-todo-inline"
              >
                <input
                  type="text"
                  value={newTodoInput}
                  onChange={e => setNewTodoInput(e.target.value)}
                  placeholder="Tambah item dengan spread..."
                  className="custom-input"
                />
                <button type="submit" className="action-btn primary small">+ Tambah</button>
              </form>

              <div className="todo-mini-list">
                {todoList.map(t => (
                  <div key={t.id} className="todo-mini-item">
                    <label>
                      <input
                        type="checkbox"
                        checked={t.done}
                        onChange={() => {
                          // Update dengan .map()
                          setTodoList(prev => prev.map(item => item.id === t.id ? { ...item, done: !item.done } : item));
                        }}
                      />
                      <span className={t.done ? 'strike' : ''}>{t.title}</span>
                    </label>
                    <button
                      onClick={() => {
                        // Hapus dengan .filter()
                        setTodoList(prev => prev.filter(item => item.id !== t.id));
                      }}
                      className="delete-icon-btn"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 17: Derived State */}
      <section className="demo-box">
        <div className="demo-badge">Slide 17 Demo</div>
        <h3>State Minimal &amp; Nilai Turunan (Derived State)</h3>
        <p className="demo-desc">
          Hindari membuat <code>useState</code> untuk hal yang dapat dihitung langsung saat render! 
          Di bawah ini, <code>activeRemainingCount</code> dan daftar yang tersaring dihitung seketika tanpa perlu state tambahan:
        </p>

        <div className="interactive-card">
          <div className="derived-controls-row">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Cari tugas di sini..."
              className="custom-input"
            />
            <div className="derived-stat-badge">
              <strong>{activeRemainingCount}</strong> tugas aktif dari <strong>{todoList.length}</strong> total
            </div>
          </div>

          <div className="derived-results-list">
            <span>Hasil Filter saat Render ({filteredTodos.length}):</span>
            {filteredTodos.map(item => (
              <span key={item.id} className="result-pill">
                {item.done ? '✅' : '⏳'} {item.title}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Slide 18: Form Terkontrol */}
      <section className="demo-box">
        <div className="demo-badge">Slide 18 Demo</div>
        <h3>Form Terkontrol (Controlled Component) &amp; Uji Input Terkunci</h3>
        <p className="demo-desc">
          Komponen form terkontrol menghubungkan <code>value</code> ke state dan <code>onChange</code> untuk update. 
          Coba aktifkan simulasi <strong>"Hapus onChange"</strong> untuk merasakan bagaimana rasanya input terkunci!
        </p>

        <div className="interactive-card">
          <div className="toggle-sim-row">
            <button
              onClick={() => setSimulateLocked(prev => !prev)}
              className={`pill-btn ${simulateLocked ? 'error-pill active' : ''}`}
            >
              {simulateLocked ? '⚠️ Sedang Mode: onChange Dihapus (Input Terkunci!)' : '✅ Mode Normal: onChange Aktif'}
            </button>
          </div>

          <div className="grid-2-col">
            <div className="form-column">
              <div className="input-group">
                <label htmlFor="fullname-input">Nama Lengkap:</label>
                <input
                  id="fullname-input"
                  type="text"
                  value={formData.fullName}
                  onChange={simulateLocked ? undefined : e => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Ketik nama Anda..."
                  className="custom-input"
                />
              </div>

              <div className="input-group">
                <label htmlFor="email-input">Alamat Email:</label>
                <input
                  id="email-input"
                  type="email"
                  value={formData.email}
                  onChange={simulateLocked ? undefined : e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="nama@domain.com"
                  className="custom-input"
                />
              </div>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.agreement}
                  onChange={simulateLocked ? undefined : e => setFormData({ ...formData, agreement: e.target.checked })}
                />
                <span>Setuju dengan syarat &amp; ketentuan</span>
              </label>
            </div>

            <div className="payload-column">
              <h5>Isi State Form Terkontrol Saat Ini:</h5>
              <pre className="json-box">
                {JSON.stringify(formData, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 20: Reset State dengan Key */}
      <section className="demo-box">
        <div className="demo-badge">Slide 20 Demo</div>
        <h3>Identitas Komponen: Reset Otomatis Menggunakan <code>key</code></h3>
        <p className="demo-desc">
          Ketik pesan draf untuk Alice, lalu ganti kontak ke Bob. Karena komponen diberi 
          <code>key={'{recipient}'}</code>, React akan membuat instance baru yang bersih sehingga draf Alice tidak tertinggal ke obrolan Bob!
        </p>

        <div className="interactive-card">
          <div className="recipient-selector-row">
            <span>Pilih Kontak Penerima:</span>
            {['Alice', 'Bob', 'Citra'].map(name => (
              <button
                key={name}
                onClick={() => setActiveRecipient(name)}
                className={`pill-btn ${activeRecipient === name ? 'active' : ''}`}
              >
                <User size={14} />
                {name}
              </button>
            ))}
          </div>

          <div className="live-preview-box">
            <h4>Kotak Obrolan Aktif:</h4>
            {/* Kunci ada pada key={activeRecipient} */}
            <ChatBoxDraft key={activeRecipient} recipient={activeRecipient} />
          </div>
        </div>
      </section>
    </div>
  );
}

/**
 * Komponen Child untuk demo Slide 20
 * State lokal 'draft' akan otomatis di-reset saat prop key di parent berubah!
 */
function ChatBoxDraft({ recipient }) {
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setMessages(prev => [...prev, { text: draft, time: new Date().toLocaleTimeString() }]);
    setDraft('');
  };

  return (
    <div className="chat-box-widget">
      <div className="chat-header">
        <MessageSquare size={16} className="text-cyan" />
        <span>Kirim Pesan ke: <strong>{recipient}</strong></span>
        <code className="key-tag">key="{recipient}"</code>
      </div>

      <div className="chat-messages-area">
        {messages.length === 0 ? (
          <p className="empty-chat">Belum ada pesan terkirim ke {recipient}. Draf lokal aman.</p>
        ) : (
          messages.map((m, idx) => (
            <div key={idx} className="chat-bubble">
              <p>{m.text}</p>
              <small>{m.time}</small>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSend} className="chat-input-row">
        <input
          type="text"
          value={draft}
          onChange={e => setDraft(e.target.value)}
          placeholder={`Tulis draf pesan untuk ${recipient}...`}
          className="custom-input"
        />
        <button type="submit" className="action-btn primary small">Kirim</button>
      </form>
    </div>
  );
}
