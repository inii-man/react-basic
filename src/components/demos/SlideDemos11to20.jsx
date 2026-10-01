import React, { useState } from 'react';
import { 
  ListOrdered, MousePointerClick, Zap, Camera, 
  RotateCcw, User, MessageSquare, ShieldAlert, Check
} from 'lucide-react';

/* =========================================================================
   SLIDE 11: List dan Key
   ========================================================================= */
export function Slide11Demo() {
  const [items, setItems] = useState([
    { id: 't-1', title: 'Belajar Fundamental', note: 'Catatan item 1' },
    { id: 't-2', title: 'Pahami Alur Props', note: 'Catatan item 2' }
  ]);
  const [useIndexKey, setUseIndexKey] = useState(false);

  const addAtTop = () => {
    const newItem = { id: `t-${Date.now()}`, title: `Item Baru #${items.length + 1}`, note: 'Ketik di sini...' };
    setItems([newItem, ...items]);
  };

  const removeFirst = () => {
    setItems(items.slice(1));
  };

  return (
    <div className="demo-box">
      <div className="demo-badge">Slide 11 Demo</div>
      <h3>List dan Key: ID Unik vs Index Array</h3>
      <p className="demo-desc">
        Ketik teks di input baris pertama, lalu klik <strong>"Hapus Baris Pertama"</strong>. 
        Jika menggunakan <code>key={'{index}'}</code>, teks Anda akan tertinggal dan menempel pada item kedua!
      </p>

      <div className="interactive-card">
        <div className="status-display-row">
          <button
            onClick={() => setUseIndexKey(prev => !prev)}
            className={`pill-btn ${useIndexKey ? 'error-pill active' : 'active'}`}
          >
            {useIndexKey ? '❌ Memakai: key={index} (Bug!)' : '✅ Memakai: key={item.id} (Aman)'}
          </button>
          <button onClick={addAtTop} className="action-btn primary small">+ Tambah di Atas</button>
          <button onClick={removeFirst} className="action-btn danger small">🗑️ Hapus Pertama</button>
        </div>

        <div className="key-list-container">
          {items.map((it, idx) => {
            const currentKey = useIndexKey ? idx : it.id;
            return (
              <div key={currentKey} className="key-item-row">
                <div className="item-meta">
                  <strong>{it.title}</strong>
                  <code className="key-badge">key="{currentKey}"</code>
                </div>
                <input
                  type="text"
                  defaultValue={it.note}
                  placeholder="Ketik catatan di sini..."
                  className="custom-input key-input"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   SLIDE 12: Event Handler
   ========================================================================= */
export function Slide12Demo() {
  const [msg, setMsg] = useState('Belum ada tombol diklik');

  return (
    <div className="demo-box">
      <div className="demo-badge">Slide 12 Demo</div>
      <h3>Event Handler: Meneruskan Callback dengan Argumen</h3>
      <p className="demo-desc">
        Gunakan arrow function <code>{"onClick={() => save(id)}"}</code> agar fungsi tidak dieksekusi seketika saat render:
      </p>

      <div className="interactive-card">
        <div className="buttons-demo-row">
          {[1, 2, 3].map(id => (
            <button
              key={id}
              onClick={() => setMsg(`✅ Berhasil menyimpan Dokumen ID #${id} pada ${new Date().toLocaleTimeString()}`)}
              className="action-btn outline"
            >
              <MousePointerClick size={16} /> Simpan #{id}
            </button>
          ))}
        </div>

        <div className="live-preview-box">
          <h4>Log Eksekusi Event:</h4>
          <p>{msg}</p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   SLIDE 13: State dan useState
   ========================================================================= */
export function Slide13Demo() {
  const [countA, setCountA] = useState(0);
  const [countB, setCountB] = useState(10);

  return (
    <div className="demo-box">
      <div className="demo-badge">Slide 13 Demo</div>
      <h3>Hook <code>useState</code>: Memori Mandiri Antar-Render</h3>
      <p className="demo-desc">
        Setiap pemanggilan <code>useState</code> memiliki memori terisolasi sendiri. Mengklik tombol A tidak akan memengaruhi nilai tombol B:
      </p>

      <div className="interactive-card">
        <div className="grid-2-col">
          <div className="sub-box">
            <h4>Counter Instance A:</h4>
            <h2 className="score-number">{countA}</h2>
            <button onClick={() => setCountA(c => c + 1)} className="action-btn primary small">
              Klik Counter A (+1)
            </button>
          </div>
          <div className="sub-box">
            <h4>Counter Instance B:</h4>
            <h2 className="score-number">{countB}</h2>
            <button onClick={() => setCountB(c => c + 1)} className="action-btn outline small">
              Klik Counter B (+1)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   SLIDE 14: Render dan Commit
   ========================================================================= */
export function Slide14Demo() {
  const [renders, setRenders] = useState(1);
  const [clock, setClock] = useState(new Date().toLocaleTimeString());

  return (
    <div className="demo-box">
      <div className="demo-badge">Slide 14 Demo</div>
      <h3>Siklus Render dan Commit: Render Harus Murni (Pure)</h3>
      <p className="demo-desc">
        Fase render memanggil fungsi untuk menghitung UI baru. Fase commit menerapkan perubahannya ke DOM:
      </p>

      <div className="interactive-card">
        <div className="status-display-row">
          <button
            onClick={() => {
              setRenders(r => r + 1);
              setClock(new Date().toLocaleTimeString());
            }}
            className="action-btn primary"
          >
            Picu Siklus Render Baru
          </button>
          <span className="badge-math">Total Render: {renders} kali</span>
        </div>

        <div className="live-preview-box">
          <h4>Status Waktu (Pure Render):</h4>
          <h3>{clock}</h3>
          <small className="update-note">Input sama -&gt; Menghasilkan kalkulasi JSX yang sama.</small>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   SLIDE 15: State Adalah Snapshot
   ========================================================================= */
export function Slide15Demo() {
  const [count, setCount] = useState(0);
  const [logs, setLogs] = useState([]);

  const runDirect = () => {
    const val = count;
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    setLogs(prev => [`[Direct 3x setCount(count + 1)] Membaca nilai ${val} -> Hanya bertambah 1!`, ...prev.slice(0, 3)]);
  };

  const runUpdater = () => {
    setCount(c => c + 1);
    setCount(c => c + 1);
    setCount(c => c + 1);
    setLogs(prev => [`[Updater 3x setCount(c => c + 1)] Menggunakan antrean -> Bertambah 3!`, ...prev.slice(0, 3)]);
  };

  return (
    <div className="demo-box">
      <div className="demo-badge">Slide 15 Demo</div>
      <h3>Laboratorium: State Adalah Snapshot</h3>
      <p className="demo-desc">
        Bandingkan langsung eksekusi direct update vs updater function:
      </p>

      <div className="interactive-card">
        <div className="snapshot-scoreboard">
          <div>
            <span>Nilai State:</span>
            <h2 className="score-number">{count}</h2>
          </div>
          <div className="score-actions">
            <button onClick={runDirect} className="action-btn outline">3x Direct (count + 1)</button>
            <button onClick={runUpdater} className="action-btn primary">3x Updater (c =&gt; c + 1)</button>
            <button onClick={() => setCount(0)} className="action-btn small">Reset ke 0</button>
          </div>
        </div>

        <div className="snapshot-logs">
          <h5>Log Snapshot:</h5>
          {logs.length === 0 ? <p className="empty-log">Klik salah satu tombol di atas...</p> : (
            logs.map((l, i) => <p key={i} className="log-line">{l}</p>)
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   SLIDE 16: Object dan Array dalam State
   ========================================================================= */
export function Slide16Demo() {
  const [user, setUser] = useState({ name: 'Ayu', role: 'Engineer' });
  const [hobbies, setHobbies] = useState(['Membaca', 'Koding']);
  const [hobbyInput, setHobbyInput] = useState('');

  return (
    <div className="demo-box">
      <div className="demo-badge">Slide 16 Demo</div>
      <h3>Immutability: Update Object &amp; Array dengan Spread</h3>
      <p className="demo-desc">
        Selalu buat objek/array baru menggunakan spread operator <code>...</code>:
      </p>

      <div className="interactive-card">
        <div className="grid-2-col">
          <div className="sub-box">
            <h4>1. Object Spread:</h4>
            <div className="input-group">
              <label>Nama Pengguna:</label>
              <input
                type="text"
                value={user.name}
                onChange={e => setUser(u => ({ ...u, name: e.target.value }))}
                className="custom-input"
              />
            </div>
            <p style={{ marginTop: 8 }}>Profil: <strong>{user.name}</strong> ({user.role})</p>
          </div>

          <div className="sub-box">
            <h4>2. Array Spread:</h4>
            <form onSubmit={e => {
              e.preventDefault();
              if (!hobbyInput.trim()) return;
              setHobbies(h => [...h, hobbyInput.trim()]);
              setHobbyInput('');
            }} style={{ display: 'flex', gap: 6 }}>
              <input
                type="text"
                value={hobbyInput}
                onChange={e => setHobbyInput(e.target.value)}
                placeholder="Tambah hobi..."
                className="custom-input"
              />
              <button type="submit" className="action-btn primary small">+ Tambah</button>
            </form>
            <div className="pill-group" style={{ marginTop: 10 }}>
              {hobbies.map((h, idx) => (
                <span key={idx} className="pill-btn active">{h}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   SLIDE 17: State Minimal dan Nilai Turunan
   ========================================================================= */
export function Slide17Demo() {
  const [items, setItems] = useState([
    { id: 1, title: 'Beli Kopi', done: true },
    { id: 2, title: 'Belajar React Hook', done: false },
    { id: 3, title: 'Latihan Kode', done: false }
  ]);
  const [query, setQuery] = useState('');

  // Nilai turunan dihitung langsung saat render!
  const visible = items.filter(t => t.title.toLowerCase().includes(query.toLowerCase()));
  const remaining = items.filter(t => !t.done).length;

  return (
    <div className="demo-box">
      <div className="demo-badge">Slide 17 Demo</div>
      <h3>Derived State: Dihitung Langsung Saat Render</h3>
      <p className="demo-desc">
        Jangan gunakan <code>useState</code> untuk hal yang bisa dihitung dari data lain:
      </p>

      <div className="interactive-card">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Cari tugas di sini..."
          className="custom-input"
        />

        <div className="status-display-row">
          <span className="badge-math">Hasil Ditemukan: {visible.length}</span>
          <span className="remaining-badge">{remaining} tugas belum selesai</span>
        </div>

        <div className="task-preview-grid">
          {visible.map(t => (
            <div key={t.id} className="task-preview-item">
              <span>{t.done ? '✅' : '⏳'} {t.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   SLIDE 18: Form Terkontrol
   ========================================================================= */
export function Slide18Demo() {
  const [name, setName] = useState('Sulaiman');
  const [locked, setLocked] = useState(false);

  return (
    <div className="demo-box">
      <div className="demo-badge">Slide 18 Demo</div>
      <h3>Form Terkontrol &amp; Uji Input Terkunci</h3>
      <p className="demo-desc">
        Input terhubung ke state melalui <code>value</code> dan <code>onChange</code>:
      </p>

      <div className="interactive-card">
        <button
          onClick={() => setLocked(prev => !prev)}
          className={`pill-btn ${locked ? 'error-pill active' : 'active'}`}
        >
          {locked ? '⚠️ Mode: onChange Dihapus (Input Terkunci!)' : '✅ Mode Normal: onChange Aktif'}
        </button>

        <div className="input-group">
          <label htmlFor="s18-name">Nama Pengguna:</label>
          <input
            id="s18-name"
            type="text"
            value={name}
            onChange={locked ? undefined : e => setName(e.target.value)}
            className="custom-input"
          />
        </div>

        <div className="live-preview-box">
          <h4>Pratinjau State:</h4>
          <p>Halo, <strong>{name}</strong>!</p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   SLIDE 19: Berbagi State Antarcomponent
   ========================================================================= */
export function Slide19Demo() {
  const [sharedText, setSharedText] = useState('React membuat antarmuka terasa hidup!');

  return (
    <div className="demo-box">
      <div className="demo-badge">Slide 19 Demo</div>
      <h3>Berbagi State (Lifting State Up)</h3>
      <p className="demo-desc">
        State disimpan di parent, lalu dikirim ke komponen Editor dan Preview:
      </p>

      <div className="interactive-card">
        <div className="grid-2-col">
          <div className="sub-box">
            <h4>Komponen Child: &lt;Editor /&gt;</h4>
            <textarea
              value={sharedText}
              onChange={e => setSharedText(e.target.value)}
              rows={3}
              className="custom-input"
            />
          </div>
          <div className="sub-box">
            <h4>Komponen Child: &lt;Preview /&gt;</h4>
            <div className="live-preview-box">
              <p>{sharedText}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   SLIDE 20: Identitas Component dan Reset State
   ========================================================================= */
export function Slide20Demo() {
  const [recipient, setRecipient] = useState('Alice');

  return (
    <div className="demo-box">
      <div className="demo-badge">Slide 20 Demo</div>
      <h3>Reset State Otomatis Menggunakan <code>key</code></h3>
      <p className="demo-desc">
        Ganti penerima pesan di bawah ini. Karena <code>key={'{recipient}'}</code> berubah, draf input akan otomatis di-reset bersih:
      </p>

      <div className="interactive-card">
        <div className="pill-group">
          <span>Pilih Kontak:</span>
          {['Alice', 'Bob', 'Citra'].map(name => (
            <button
              key={name}
              onClick={() => setRecipient(name)}
              className={`pill-btn ${recipient === name ? 'active' : ''}`}
            >
              <User size={14} /> {name}
            </button>
          ))}
        </div>

        {/* Key mereset state child */}
        <ChatDraftBox key={recipient} recipient={recipient} />
      </div>
    </div>
  );
}

function ChatDraftBox({ recipient }) {
  const [draft, setDraft] = useState('');

  return (
    <div className="live-preview-box">
      <h4>Draf Chat untuk <strong>{recipient}</strong>:</h4>
      <input
        type="text"
        value={draft}
        onChange={e => setDraft(e.target.value)}
        placeholder={`Tulis draf pesan khusus untuk ${recipient}...`}
        className="custom-input"
      />
      <small className="update-note">Draf ini terisolasi untuk {recipient} berkat key="{recipient}".</small>
    </div>
  );
}
