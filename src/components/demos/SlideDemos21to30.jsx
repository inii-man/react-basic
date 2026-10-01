import React, { useState, useEffect, useRef, useReducer, createContext, useContext, useMemo, useCallback } from 'react';
import { 
  Clock, Wifi, Focus, Wallet, Palette, Hammer, 
  ShieldCheck, RefreshCw, AlertTriangle, CheckCircle2, Gauge 
} from 'lucide-react';
import MemoizationDeepDiveLab from './MemoizationDeepDiveLab';

/* =========================================================================
   SLIDE 21: Hooks dan Aturan Pemanggilan
   ========================================================================= */
export function Slide21Demo() {
  const [activeRule, setActiveRule] = useState(1);

  return (
    <div className="demo-box">
      <div className="demo-badge">Slide 21 Demo</div>
      <h3>Aturan Hooks (Rules of Hooks)</h3>
      <p className="demo-desc">
        React mengandalkan <strong>urutan pemanggilan tetap</strong> di setiap render. 
        Pelajari 2 aturan mutlak di bawah ini:
      </p>

      <div className="interactive-card">
        <div className="pill-group">
          <button onClick={() => setActiveRule(1)} className={`pill-btn ${activeRule === 1 ? 'active' : ''}`}>
            Aturan 1: Hanya di Top Level
          </button>
          <button onClick={() => setActiveRule(2)} className={`pill-btn ${activeRule === 2 ? 'active' : ''}`}>
            Aturan 2: Hanya dari Fungsi React
          </button>
        </div>

        <div className="live-preview-box">
          {activeRule === 1 ? (
            <div>
              <h4>✅ Panggil di Tingkat Teratas:</h4>
              <p>Dilarang memanggil Hook di dalam <code>if</code>, loop <code>for</code>, atau event handler. Panggilan harus terjadi sebelum adanya <code>return</code> awal.</p>
              <code className="key-badge">function Komponen() &#123; const [x, setX] = useState(0); ... &#125;</code>
            </div>
          ) : (
            <div>
              <h4>✅ Hanya dari Komponen atau Custom Hook:</h4>
              <p>Jangan panggil Hook dari fungsi JavaScript biasa. Nama custom hook wajib diawali dengan kata <code>use</code>.</p>
              <code className="key-badge">function useCounter() &#123; ... &#125;</code>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   SLIDE 22: useEffect
   ========================================================================= */
export function Slide22Demo() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    return () => {
      clearInterval(interval); // Cleanup!
    };
  }, [isActive]);

  return (
    <div className="demo-box">
      <div className="demo-badge">Slide 22 Demo</div>
      <h3>Hook <code>useEffect</code> &amp; Fungsi Pembersih (Cleanup)</h3>
      <p className="demo-desc">
        Effect menyinkronkan komponen dengan timer browser. Saat dijeda, fungsi <code>return () =&gt; clearInterval(timer)</code> aktif membersihkan interval:
      </p>

      <div className="interactive-card">
        <div className="status-display-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Clock size={28} className={`text-cyan ${isActive ? 'spin' : ''}`} />
            <h2 className="score-number">{seconds} <small style={{ fontSize: '1rem' }}>detik</small></h2>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => setIsActive(prev => !prev)}
              className={`action-btn ${isActive ? 'danger' : 'primary'}`}
            >
              {isActive ? 'Jeda (Jalankan Cleanup)' : 'Mulai (Jalankan Effect)'}
            </button>
            <button onClick={() => { setIsActive(false); setSeconds(0); }} className="action-btn outline">
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   SLIDE 23: Dependensi Effect
   ========================================================================= */
export function Slide23Demo() {
  const [roomId, setRoomId] = useState('umum');
  const [connectLogs, setConnectLogs] = useState([]);

  useEffect(() => {
    setConnectLogs(prev => [
      `[Effect Berjalan] Tersambung ke room: "${roomId}" pada ${new Date().toLocaleTimeString()}`,
      ...prev.slice(0, 3)
    ]);

    return () => {
      setConnectLogs(prev => [
        `[Cleanup] Memutuskan sambungan dari room: "${roomId}"`,
        ...prev.slice(0, 3)
      ]);
    };
  }, [roomId]); // Bergantung pada roomId

  return (
    <div className="demo-box">
      <div className="demo-badge">Slide 23 Demo</div>
      <h3>Array Dependensi: <code>[roomId]</code></h3>
      <p className="demo-desc">
        Ganti ruang obrolan di bawah untuk melihat Effect menjalankan cleanup ruang lama sebelum membuka koneksi ruang baru:
      </p>

      <div className="interactive-card">
        <div className="pill-group">
          <span>Pilih Room:</span>
          {['umum', 'react-dev', 'mobile-lab'].map(r => (
            <button
              key={r}
              onClick={() => setRoomId(r)}
              className={`pill-btn ${roomId === r ? 'active' : ''}`}
            >
              #{r}
            </button>
          ))}
        </div>

        <div className="snapshot-logs">
          <h5>Log Lifecycle Sinkronisasi:</h5>
          {connectLogs.map((l, i) => (
            <p key={i} className="log-line">{l}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   SLIDE 24: Kapan TIDAK Perlu Effect?
   ========================================================================= */
export function Slide24Demo() {
  const [first, setFirst] = useState('Sulaiman');
  const [last, setLast] = useState('Saleh');

  // ✅ Nilai turunan dihitung langsung saat render!
  const fullName = `${first} ${last}`.trim();

  return (
    <div className="demo-box">
      <div className="demo-badge">Slide 24 Demo</div>
      <h3>Kapan TIDAK Perlu Effect? (Derived &amp; Event Handler)</h3>
      <p className="demo-desc">
        Menghitung nama lengkap dari <code>first</code> dan <code>last</code> cukup dilakukan langsung saat render, tanpa <code>useEffect</code>:
      </p>

      <div className="interactive-card">
        <div className="grid-2-col">
          <div className="input-group">
            <label>Nama Depan:</label>
            <input
              type="text"
              value={first}
              onChange={e => setFirst(e.target.value)}
              className="custom-input"
            />
          </div>
          <div className="input-group">
            <label>Nama Belakang:</label>
            <input
              type="text"
              value={last}
              onChange={e => setLast(e.target.value)}
              className="custom-input"
            />
          </div>
        </div>

        <div className="live-preview-box">
          <h4>Hasil Perhitungan Pure Render:</h4>
          <p>Nama Lengkap: <strong className="text-cyan">{fullName || '(Kosong)'}</strong></p>
          <small className="update-note">✅ Dihitung seketika tanpa membuat state berlebih atau Effect tambahan.</small>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   SLIDE 25: Pengambilan Data dan Race Condition
   ========================================================================= */
export function Slide25Demo() {
  const [userId, setUserId] = useState(1);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [useIgnore, setUseIgnore] = useState(true);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    let ignore = false;
    setLoading(true);

    const delay = userId === 1 ? 1500 : 300;
    const reqId = userId;

    const timer = setTimeout(() => {
      if (useIgnore && ignore) {
        setLogs(prev => [`[Dibatalkan] Respon User #${reqId} (${delay}ms) diabaikan!`, ...prev.slice(0, 3)]);
        return;
      }
      setUserData({ id: reqId, name: reqId === 1 ? 'Ahmad (User Lambat)' : 'Siti (User Cepat)' });
      setLoading(false);
      setLogs(prev => [`[Diterapkan] User #${reqId} (${delay}ms) berhasil masuk ke UI.`, ...prev.slice(0, 3)]);
    }, delay);

    return () => {
      ignore = true;
      clearTimeout(timer);
    };
  }, [userId, useIgnore]);

  return (
    <div className="demo-box">
      <div className="demo-badge">Slide 25 Demo</div>
      <h3>Simulasi Race Condition &amp; Flag <code>ignore</code></h3>
      <p className="demo-desc">
        User 1 lambat (1500ms), User 2 cepat (300ms). Klik User 1 lalu cepat klik User 2:
      </p>

      <div className="interactive-card">
        <button
          onClick={() => setUseIgnore(prev => !prev)}
          className={`pill-btn ${useIgnore ? 'active' : 'error-pill active'}`}
        >
          {useIgnore ? '🛡️ Pola Aman: ignore = true AKTIF' : '⚠️ Rentan Bug: Tanpa ignore flag'}
        </button>

        <div className="pill-group">
          <span>Pilih User:</span>
          <button onClick={() => setUserId(1)} className={`pill-btn ${userId === 1 ? 'active' : ''}`}>User 1 (1500ms)</button>
          <button onClick={() => setUserId(2)} className={`pill-btn ${userId === 2 ? 'active' : ''}`}>User 2 (300ms)</button>
        </div>

        <div className="live-preview-box">
          {loading ? <p className="text-cyan">⏳ Sedang mengambil data...</p> : (
            userData && <p>Tampil di Layar: <strong>{userData.name} (ID: #{userData.id})</strong></p>
          )}
        </div>

        <div className="snapshot-logs">
          <h5>Log Jaringan:</h5>
          {logs.map((l, i) => <p key={i} className="log-line">{l}</p>)}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   SLIDE 26: useRef
   ========================================================================= */
export function Slide26Demo() {
  const inputRef = useRef(null);
  const clickCountRef = useRef(0);
  const [, setTick] = useState(0);

  return (
    <div className="demo-box">
      <div className="demo-badge">Slide 26 Demo</div>
      <h3>Hook <code>useRef</code>: Akses DOM &amp; Memori Tanpa Re-render</h3>
      <p className="demo-desc">
        Klik tombol fokus untuk memanggil <code>inputRef.current.focus()</code> langsung pada elemen input:
      </p>

      <div className="interactive-card">
        <div className="grid-2-col">
          <div className="sub-box">
            <h4>1. Akses Elemen DOM:</h4>
            <input
              ref={inputRef}
              type="text"
              placeholder="Kursor akan lompat ke sini..."
              className="custom-input"
            />
            <button
              onClick={() => inputRef.current?.focus()}
              className="action-btn primary small"
              style={{ marginTop: 8 }}
            >
              <Focus size={14} /> Beri Fokus Input
            </button>
          </div>

          <div className="sub-box">
            <h4>2. Nilai Ref (Tanpa Re-render):</h4>
            <button
              onClick={() => { clickCountRef.current += 1; }}
              className="action-btn outline small"
            >
              + Klik Diam-diam (Ref)
            </button>
            <button
              onClick={() => setTick(t => t + 1)}
              className="action-btn primary small"
              style={{ marginLeft: 6 }}
            >
              Lihat Hasil
            </button>
            <p style={{ marginTop: 8 }}>Total klik tersimpan: <strong>{clickCountRef.current}</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   SLIDE 27: useReducer
   ========================================================================= */
export function Slide27Demo() {
  function reducer(state, action) {
    switch (action.type) {
      case 'deposit': return { balance: state.balance + action.amount };
      case 'withdraw': return { balance: Math.max(0, state.balance - action.amount) };
      case 'reset': return { balance: 0 };
      default: return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, { balance: 100000 });

  return (
    <div className="demo-box">
      <div className="demo-badge">Slide 27 Demo</div>
      <h3>Hook <code>useReducer</code>: Mesin Status Dompet</h3>
      <p className="demo-desc">
        Reducer memusatkan logika perubahan state menggunakan aksi yang terdefinisi:
      </p>

      <div className="interactive-card">
        <div className="wallet-card">
          <div className="wallet-header">
            <Wallet size={24} className="text-cyan" />
            <div>
              <span>Saldo Dompet:</span>
              <h3>Rp {state.balance.toLocaleString('id-ID')}</h3>
            </div>
          </div>

          <div className="pill-group" style={{ marginTop: 12 }}>
            <button onClick={() => dispatch({ type: 'deposit', amount: 50000 })} className="action-btn outline small">+ Rp 50.000</button>
            <button onClick={() => dispatch({ type: 'deposit', amount: 100000 })} className="action-btn outline small">+ Rp 100.000</button>
            <button onClick={() => dispatch({ type: 'withdraw', amount: 25000 })} className="action-btn outline small">- Rp 25.000</button>
            <button onClick={() => dispatch({ type: 'reset' })} className="action-btn danger small">Reset 0</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   SLIDE 28: Context dan useContext
   ========================================================================= */
const ThemeContext = createContext('dark');

export function Slide28Demo() {
  const [themeValue, setThemeValue] = useState('dark');

  return (
    <div className="demo-box">
      <div className="demo-badge">Slide 28 Demo</div>
      <h3>Context API: Meneruskan Nilai Tanpa Prop Drilling</h3>
      <p className="demo-desc">
        Ubah tema di Provider, seluruh komponen child yang membaca dengan <code>useContext</code> otomatis ter-update:
      </p>

      <div className="interactive-card">
        <div className="status-display-row">
          <span>Nilai di ThemeContext.Provider:</span>
          <button
            onClick={() => setThemeValue(t => t === 'dark' ? 'light' : 'dark')}
            className="action-btn primary small"
          >
            Ganti Tema Provider ({themeValue})
          </button>
        </div>

        <ThemeContext.Provider value={themeValue}>
          <ToolbarConsumer />
        </ThemeContext.Provider>
      </div>
    </div>
  );
}

function ToolbarConsumer() {
  const theme = useContext(ThemeContext);
  return (
    <div className="live-preview-box">
      <h4>Dibaca oleh Komponen Child (&lt;ToolbarConsumer /&gt;):</h4>
      <p>Tema aktif saat ini: <strong className="text-cyan">{theme.toUpperCase()}</strong></p>
    </div>
  );
}

/* =========================================================================
   SLIDE 29: Custom Hook
   ========================================================================= */
function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);
  const increment = () => setCount(c => c + 1);
  const reset = () => setCount(initial);
  return { count, increment, reset };
}

export function Slide29Demo() {
  const c1 = useCounter(5);
  const c2 = useCounter(50);

  return (
    <div className="demo-box">
      <div className="demo-badge">Slide 29 Demo</div>
      <h3>Custom Hook: <code>useCounter()</code></h3>
      <p className="demo-desc">
        Custom Hook membungkus logika stateful yang reusable. Dua pemanggilan memiliki memori masing-masing:
      </p>

      <div className="interactive-card">
        <div className="grid-2-col">
          <div className="sub-box">
            <h4>Counter Instance 1:</h4>
            <h2 className="score-number">{c1.count}</h2>
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={c1.increment} className="action-btn primary small">+1</button>
              <button onClick={c1.reset} className="action-btn outline small">Reset</button>
            </div>
          </div>
          <div className="sub-box">
            <h4>Counter Instance 2:</h4>
            <h2 className="score-number">{c2.count}</h2>
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={c2.increment} className="action-btn primary small">+1</button>
              <button onClick={c2.reset} className="action-btn outline small">Reset</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   SLIDE 30: useMemo, useCallback, dan memo (Deep Dive Lab)
   ========================================================================= */
export function Slide30Demo() {
  return <MemoizationDeepDiveLab />;
}
