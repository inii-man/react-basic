import React, { useState, useEffect, useRef, useReducer, createContext, useContext } from 'react';
import { Clock, Wifi, Focus, Wallet, Palette, Hammer, ShieldCheck, RefreshCw, AlertTriangle } from 'lucide-react';

// Context untuk Slide 28
const AppSettingsContext = createContext({
  theme: 'dark',
  currency: 'IDR',
  toggleTheme: () => {},
  setCurrency: () => {}
});

/**
 * Chapter4Hooks.jsx
 * Berisi demo interaktif untuk Bab 04: Hooks dan Sinkronisasi (Slide 21 - 29)
 */
export default function Chapter4Hooks() {
  // Slide 22: useEffect Timer
  const [timerRunning, setTimerRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  // Slide 25: Race Condition Simulator
  const [selectedUserId, setSelectedUserId] = useState(1);
  const [userData, setUserData] = useState(null);
  const [fetchStatus, setFetchStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [useIgnoreCleanup, setUseIgnoreCleanup] = useState(true);
  const [raceLogs, setRaceLogs] = useState([]);

  // Slide 26: useRef
  const inputRef = useRef(null);
  const secretClickCount = useRef(0);
  const [, forceUpdate] = useState(0);

  // Slide 27: useReducer Bank Wallet
  const initialWalletState = { balance: 500000, transactions: [] };
  function walletReducer(state, action) {
    switch (action.type) {
      case 'DEPOSIT':
        return {
          balance: state.balance + action.amount,
          transactions: [
            { text: `Setor: +Rp ${action.amount.toLocaleString('id-ID')}`, time: new Date().toLocaleTimeString() },
            ...state.transactions.slice(0, 4)
          ]
        };
      case 'WITHDRAW':
        if (state.balance < action.amount) {
          alert('Saldo tidak mencukupi!');
          return state;
        }
        return {
          balance: state.balance - action.amount,
          transactions: [
            { text: `Tarik: -Rp ${action.amount.toLocaleString('id-ID')}`, time: new Date().toLocaleTimeString() },
            ...state.transactions.slice(0, 4)
          ]
        };
      case 'RESET':
        return {
          balance: 0,
          transactions: [{ text: 'Reset saldo ke Rp 0', time: new Date().toLocaleTimeString() }]
        };
      default:
        return state;
    }
  }
  const [walletState, dispatchWallet] = useReducer(walletReducer, initialWalletState);

  // Slide 28: Context State
  const [contextTheme, setContextTheme] = useState('dark');
  const [contextCurrency, setContextCurrency] = useState('IDR');

  // Custom Hook instance (Slide 29)
  const counterA = useSimpleCounter(10);
  const counterB = useSimpleCounter(100);

  // Effect Timer (Slide 22)
  useEffect(() => {
    if (!timerRunning) return;

    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    // CLEANUP: Sangat penting agar interval mati saat unmount / timer stopped
    return () => {
      clearInterval(interval);
    };
  }, [timerRunning]);

  // Race Condition Simulation (Slide 25)
  useEffect(() => {
    let ignore = false;
    setFetchStatus('loading');

    // Pengguna 1 lambat (1500ms), Pengguna 2 cepat (300ms)
    const delay = selectedUserId === 1 ? 1600 : 350;
    const requestedId = selectedUserId;

    const timer = setTimeout(() => {
      if (useIgnoreCleanup && ignore) {
        setRaceLogs(prev => [
          `[DIBATALKAN] Respon data ID #${requestedId} (${delay}ms) tiba, namun diabaikan karena cleanup ignore=true!`,
          ...prev.slice(0, 4)
        ]);
        return;
      }

      setUserData({
        id: requestedId,
        name: requestedId === 1 ? 'Ahmad Dahlan (User Lambat)' : 'Siti Fatimah (User Cepat)',
        email: requestedId === 1 ? 'ahmad@example.com' : 'siti@example.com',
        avatar: requestedId === 1 ? '👨' : '👩'
      });
      setFetchStatus('success');

      setRaceLogs(prev => [
        `[BERHASIL DITERAPKAN] Data ID #${requestedId} (${delay}ms) ditulis ke state UI.`,
        ...prev.slice(0, 4)
      ]);
    }, delay);

    return () => {
      ignore = true; // Slide 25: Pola flag ignore
      clearTimeout(timer);
    };
  }, [selectedUserId, useIgnoreCleanup]);

  return (
    <div className="chapter-demos">
      {/* Slide 22: useEffect Timer & Cleanup */}
      <section className="demo-box">
        <div className="demo-badge">Slide 22 Demo</div>
        <h3>Sinkronisasi Sistem Eksternal &amp; Fungsi Pembersih (Cleanup)</h3>
        <p className="demo-desc">
          <code>useEffect</code> menyinkronkan komponen dengan <code>setInterval</code> browser. 
          Fungsi pembersih (<em>cleanup</em>) wajib menghentikan interval dengan <code>clearInterval</code> ketika timer dijeda atau komponen di-unmount.
        </p>

        <div className="interactive-card">
          <div className="timer-display-box">
            <Clock size={36} className={`text-cyan ${timerRunning ? 'spin' : ''}`} />
            <h2 className="timer-seconds">{seconds} <small>detik</small></h2>
          </div>

          <div className="timer-btn-row">
            <button
              onClick={() => setTimerRunning(prev => !prev)}
              className={`action-btn ${timerRunning ? 'danger' : 'primary'}`}
            >
              {timerRunning ? 'Jeda Timer (Jalankan Cleanup)' : 'Mulai Timer (Jalankan Effect)'}
            </button>
            <button
              onClick={() => {
                setTimerRunning(false);
                setSeconds(0);
              }}
              className="action-btn outline"
            >
              Reset ke 0
            </button>
          </div>
          <small className="hint-text">
            💡 Saat dijeda, React mengeksekusi <code>return () =&gt; clearInterval(timer)</code> sehingga tidak terjadi memory leak!
          </small>
        </div>
      </section>

      {/* Slide 25: Race Condition Simulator */}
      <section className="demo-box">
        <div className="demo-badge">Slide 25 Demo</div>
        <h3>Simulasi Pengambilan Data &amp; Race Condition</h3>
        <p className="demo-desc">
          User #1 memiliki koneksi lambat (1600ms), sedangkan User #2 cepat (350ms). 
          Jika Anda mengklik User #1 lalu <strong>langsung mengklik User #2</strong>, 
          apakah data yang muncul di layar benar? Coba bandingkan dengan vs tanpa pola <code>ignore = true</code>!
        </p>

        <div className="interactive-card">
          <div className="race-settings-bar">
            <button
              onClick={() => setUseIgnoreCleanup(prev => !prev)}
              className={`pill-btn ${useIgnoreCleanup ? 'active' : 'error-pill active'}`}
            >
              {useIgnoreCleanup ? '🛡️ Pola Aman: Flag ignore = true AKTIF' : '⚠️ Rentan Bug: Flag ignore DINONAKTIFKAN'}
            </button>
          </div>

          <div className="race-fetch-controls">
            <span>Pilih Pengguna untuk Di-fetch:</span>
            <button
              onClick={() => setSelectedUserId(1)}
              className={`pill-btn ${selectedUserId === 1 ? 'active' : ''}`}
            >
              User #1 (Lambat 1600ms)
            </button>
            <button
              onClick={() => setSelectedUserId(2)}
              className={`pill-btn ${selectedUserId === 2 ? 'active' : ''}`}
            >
              User #2 (Cepat 350ms)
            </button>
          </div>

          <div className="race-result-display">
            {fetchStatus === 'loading' ? (
              <div className="loading-state">
                <RefreshCw size={18} className="spin text-cyan" />
                <span>Sedang mengambil data User #{selectedUserId}...</span>
              </div>
            ) : userData ? (
              <div className="user-profile-preview">
                <span className="user-avatar-emoji">{userData.avatar}</span>
                <div>
                  <h5>{userData.name} (ID: #{userData.id})</h5>
                  <p>{userData.email}</p>
                </div>
              </div>
            ) : null}
          </div>

          <div className="race-logs-box">
            <h6>Log Jaringan &amp; Cleanup:</h6>
            <ul>
              {raceLogs.map((log, idx) => (
                <li key={idx} className="log-line">{log}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Slide 26: useRef */}
      <section className="demo-box">
        <div className="demo-badge">Slide 26 Demo</div>
        <h3>Hook <code>useRef</code>: Akses DOM &amp; Memori Tanpa Re-Render</h3>
        <p className="demo-desc">
          <code>useRef</code> mempertahankan objek <code>{'{ current: ... }'}</code> antar-render. 
          Mengubah nilai <code>ref.current</code> tidak memicu render ulang!
        </p>

        <div className="interactive-card">
          <div className="grid-2-col">
            <div className="sub-box">
              <h4>1. Akses DOM Element Langsung:</h4>
              <input
                ref={inputRef}
                type="text"
                placeholder="Kursor akan fokus di sini..."
                className="custom-input"
              />
              <button
                onClick={() => inputRef.current?.focus()}
                className="action-btn primary small"
                style={{ marginTop: 10 }}
              >
                <Focus size={14} /> Beri Fokus Kursor
              </button>
            </div>

            <div className="sub-box">
              <h4>2. Nilai Bertahan Tanpa Re-Render:</h4>
              <p>
                Klik tombol rahasia untuk menambah <code>secretClickCount.current</code> tanpa merender ulang layar!
              </p>
              <div className="pill-group">
                <button
                  onClick={() => {
                    secretClickCount.current += 1;
                    console.log('secretClickCount:', secretClickCount.current);
                  }}
                  className="action-btn outline small"
                >
                  + Tambah Ref Diam-diam
                </button>
                <button
                  onClick={() => forceUpdate(n => n + 1)}
                  className="action-btn primary small"
                >
                  Re-render Layar untuk Memeriksa Nilai
                </button>
              </div>
              <p className="badge-math" style={{ marginTop: 10 }}>
                Nilai ref saat ini: <strong>{secretClickCount.current}</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 27: useReducer */}
      <section className="demo-box">
        <div className="demo-badge">Slide 27 Demo</div>
        <h3>Hook <code>useReducer</code>: Mesin Status Dompet Digital</h3>
        <p className="demo-desc">
          Ketika alur perubahan state memiliki banyak variasi aksi (deposit, penarikan, reset), 
          <code>useReducer</code> memusatkan seluruh aturan perubahan tersebut dalam fungsi <code>reducer</code> yang murni:
        </p>

        <div className="interactive-card">
          <div className="wallet-card">
            <div className="wallet-header">
              <Wallet size={24} className="text-cyan" />
              <div>
                <span>Saldo Dompet Digital</span>
                <h3>Rp {walletState.balance.toLocaleString('id-ID')}</h3>
              </div>
            </div>

            <div className="wallet-actions-grid">
              <button
                onClick={() => dispatchWallet({ type: 'DEPOSIT', amount: 100000 })}
                className="action-btn outline"
              >
                + Setor Rp 100.000
              </button>
              <button
                onClick={() => dispatchWallet({ type: 'DEPOSIT', amount: 500000 })}
                className="action-btn outline"
              >
                + Setor Rp 500.000
              </button>
              <button
                onClick={() => dispatchWallet({ type: 'WITHDRAW', amount: 50000 })}
                className="action-btn outline"
              >
                - Tarik Rp 50.000
              </button>
              <button
                onClick={() => dispatchWallet({ type: 'RESET' })}
                className="action-btn danger outline"
              >
                Kosongkan Saldo (Reset)
              </button>
            </div>

            <div className="transactions-list">
              <h5>Riwayat Aksi Reducer:</h5>
              {walletState.transactions.length === 0 ? (
                <p className="empty-log">Belum ada transaksi.</p>
              ) : (
                walletState.transactions.map((tx, idx) => (
                  <div key={idx} className="tx-item">
                    <span>{tx.text}</span>
                    <small>{tx.time}</small>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Slide 28 & 29: Context & Custom Hook */}
      <section className="demo-box">
        <div className="demo-badge">Slide 28 &amp; 29 Demo</div>
        <h3>Context API &amp; Pemakaian Custom Hook</h3>
        <p className="demo-desc">
          Context menghindari <em>prop drilling</em>, sedangkan Custom Hook membungkus logika stateful yang dapat digunakan kembali:
        </p>

        <div className="interactive-card">
          <div className="grid-2-col">
            {/* Context Demo */}
            <div className="sub-box">
              <h4>Context Provider &amp; Consumer:</h4>
              <div className="input-group">
                <label>Pilih Mata Uang Global (Context):</label>
                <div className="pill-group">
                  {['IDR', 'USD', 'EUR', 'SGD'].map(curr => (
                    <button
                      key={curr}
                      onClick={() => setContextCurrency(curr)}
                      className={`pill-btn ${contextCurrency === curr ? 'active' : ''}`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              </div>
              <div className="context-consumer-box">
                <Palette size={16} className="text-cyan" />
                <span>
                  Dibaca oleh Consumer: Nilai Mata Uang = <strong>{contextCurrency}</strong>
                </span>
              </div>
            </div>

            {/* Custom Hook Demo */}
            <div className="sub-box">
              <h4>Custom Hook: <code>useSimpleCounter()</code></h4>
              <p>Dua pemanggilan custom hook memiliki instance state yang mandiri dan terisolasi:</p>
              <div className="pill-group" style={{ marginBottom: 12 }}>
                <button onClick={counterA.increment} className="action-btn primary small">
                  Counter A: {counterA.count} (+1)
                </button>
                <button onClick={counterA.reset} className="action-btn outline small">
                  Reset A
                </button>
              </div>
              <div className="pill-group">
                <button onClick={counterB.increment} className="action-btn primary small">
                  Counter B: {counterB.count} (+1)
                </button>
                <button onClick={counterB.reset} className="action-btn outline small">
                  Reset B
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/**
 * Custom Hook sederhana untuk Slide 29
 */
function useSimpleCounter(initial = 0) {
  const [count, setCount] = useState(initial);
  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(initial);
  return { count, increment, decrement, reset };
}
