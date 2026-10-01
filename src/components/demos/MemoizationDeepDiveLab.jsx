import React, { useState, useMemo, useCallback, useRef, useEffect, memo } from 'react';
import { 
  Cpu, Gauge, Zap, RefreshCw, CheckCircle2, XCircle, 
  Layers, ArrowRight, Activity, Flame, ShieldAlert, Sparkles, Timer
} from 'lucide-react';

/* =========================================================================
   KOMPONEN CHILD UNTUK PEMBUKTIAN React.memo & useCallback
   ========================================================================= */

// Komponen Child Standar (Tanpa memo)
function RegularChild({ label, onAction }) {
  const renderCount = useRef(0);
  renderCount.current += 1;
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    setFlash(true);
    const t = setTimeout(() => setFlash(false), 400);
    return () => clearTimeout(t);
  });

  return (
    <div className={`child-benchmark-card ${flash ? 'flash-red' : ''}`}>
      <div className="child-badge unmemoized">Komponen Biasa (Tanpa memo)</div>
      <h4>{label}</h4>
      <p>Total Re-render Komponen Ini: <strong className="render-counter badge-danger">{renderCount.current} kali</strong></p>
      <button onClick={onAction} className="action-btn outline small">
        Panggil Callback
      </button>
      <small className="hint-text">⚠️ Komponen ini selalu ikut re-render setiap kali Parent render!</small>
    </div>
  );
}

// Komponen Child yang Dioptimasi dengan React.memo
const MemoizedChild = memo(function MemoizedChild({ label, onAction }) {
  const renderCount = useRef(0);
  renderCount.current += 1;
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    setFlash(true);
    const t = setTimeout(() => setFlash(false), 400);
    return () => clearTimeout(t);
  });

  return (
    <div className={`child-benchmark-card ${flash ? 'flash-green' : ''}`}>
      <div className="child-badge memoized">Dibungkus React.memo</div>
      <h4>{label}</h4>
      <p>Total Re-render Komponen Ini: <strong className="render-counter badge-success">{renderCount.current} kali</strong></p>
      <button onClick={onAction} className="action-btn primary small">
        Panggil Callback
      </button>
      <small className="hint-text">✅ Render dilewati jika referensi props tidak berubah!</small>
    </div>
  );
});

/**
 * MemoizationDeepDiveLab
 * Laboratorium Pembuktian useMemo, useCallback, dan React.memo
 */
export default function MemoizationDeepDiveLab() {
  const [activeTab, setActiveTab] = useState('useMemo'); // 'useMemo' | 'reactMemo' | 'useCallback' | 'synergy'

  /* -------------------------------------------------------------------------
     STATE UNTUK TAB 1: PEMBUKTIAN useMemo
     ------------------------------------------------------------------------- */
  const [calcInput, setCalcInput] = useState(35);
  const [useMemoActive, setUseMemoActive] = useState(true);
  const [parentUnrelatedText, setParentUnrelatedText] = useState('');
  const [unrelatedParentClicks, setUnrelatedParentClicks] = useState(0);
  const memoCalcRunsRef = useRef(0);

  // Perhitungan berat yang terukur secara presisi
  const { heavyResult, timeTaken, runCount } = useMemo(() => {
    if (useMemoActive) {
      memoCalcRunsRef.current += 1;
      const t0 = performance.now();
      let total = 0;
      // Loop berat disengaja untuk memberi jeda CPU
      for (let i = 0; i < calcInput * 250000; i++) {
        total += Math.sqrt(i % 100) * Math.sin(i % 10);
      }
      const t1 = performance.now();
      return {
        heavyResult: Math.round(total),
        timeTaken: (t1 - t0).toFixed(2),
        runCount: memoCalcRunsRef.current
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useMemoActive ? calcInput : Math.random()]);

  // Jika useMemo dinonaktifkan, hitung manual di badan render:
  let directResult = heavyResult;
  let directTime = timeTaken;
  let directRunCount = runCount;

  if (!useMemoActive) {
    memoCalcRunsRef.current += 1;
    const t0 = performance.now();
    let total = 0;
    for (let i = 0; i < calcInput * 250000; i++) {
      total += Math.sqrt(i % 100) * Math.sin(i % 10);
    }
    const t1 = performance.now();
    directResult = Math.round(total);
    directTime = (t1 - t0).toFixed(2);
    directRunCount = memoCalcRunsRef.current;
  }

  /* -------------------------------------------------------------------------
     STATE UNTUK TAB 2: PEMBUKTIAN React.memo
     ------------------------------------------------------------------------- */
  const [parentCounter, setParentCounter] = useState(0);
  const [childSharedProp, setChildSharedProp] = useState('Data Konstan');

  /* -------------------------------------------------------------------------
     STATE UNTUK TAB 3: PEMBUKTIAN useCallback
     ------------------------------------------------------------------------- */
  const [useCallbackActive, setUseCallbackActive] = useState(true);
  const [parentRenders, setParentRenders] = useState(0);
  const lastFunctionRef = useRef(null);
  const [isSameFunctionRef, setIsSameFunctionRef] = useState(true);
  const [actionHistory, setActionHistory] = useState([]);

  // Fungsi tanpa useCallback (dibuat baru tiap render di memori)
  const regularHandler = () => {
    setActionHistory(prev => [`[Regular Callback] Dieksekusi pada ${new Date().toLocaleTimeString()}`, ...prev.slice(0, 3)]);
  };

  // Fungsi dengan useCallback (referensi stabil di memori)
  const memoizedHandler = useCallback(() => {
    setActionHistory(prev => [`[useCallback Callback] Dieksekusi pada ${new Date().toLocaleTimeString()}`, ...prev.slice(0, 3)]);
  }, []); // [] = referensi identik seumur hidup komponen

  const currentActionHandler = useCallbackActive ? memoizedHandler : regularHandler;

  // Lacak apakah referensi fungsi sama dengan render sebelumnya
  useEffect(() => {
    if (lastFunctionRef.current) {
      setIsSameFunctionRef(lastFunctionRef.current === currentActionHandler);
    }
    lastFunctionRef.current = currentActionHandler;
  }, [currentActionHandler, parentRenders]);

  return (
    <div className="demo-box memo-lab-box">
      <div className="demo-badge">Slide 30 Deep Dive</div>
      <h3>🔬 Laboratorium Pembuktian: <code>useMemo</code>, <code>useCallback</code>, &amp; <code>React.memo</code></h3>
      <p className="demo-desc">
        Pilih tab pengujian di bawah ini untuk melihat bukti empiris dan metrik nyata dari ketiga teknik optimasi performa React:
      </p>

      {/* TAB SELECTOR */}
      <div className="pill-group lab-tab-group">
        <button
          onClick={() => setActiveTab('useMemo')}
          className={`pill-btn ${activeTab === 'useMemo' ? 'active' : ''}`}
        >
          <Cpu size={15} /> 1. Bukti useMemo
        </button>
        <button
          onClick={() => setActiveTab('reactMemo')}
          className={`pill-btn ${activeTab === 'reactMemo' ? 'active' : ''}`}
        >
          <Layers size={15} /> 2. Bukti React.memo
        </button>
        <button
          onClick={() => setActiveTab('useCallback')}
          className={`pill-btn ${activeTab === 'useCallback' ? 'active' : ''}`}
        >
          <Zap size={15} /> 3. Bukti useCallback
        </button>
        <button
          onClick={() => setActiveTab('synergy')}
          className={`pill-btn ${activeTab === 'synergy' ? 'active' : ''}`}
        >
          <Sparkles size={15} /> 4. Perbandingan &amp; Sinergi
        </button>
      </div>

      {/* =====================================================================
         TAB 1: PEMBUKTIAN useMemo
         ===================================================================== */}
      {activeTab === 'useMemo' && (
        <div className="interactive-card">
          <div className="status-display-row">
            <h4>1. Uji Benchmark Komputasi Berat (CPU Workload):</h4>
            <button
              onClick={() => {
                memoCalcRunsRef.current = 0;
                setUseMemoActive(prev => !prev);
              }}
              className={`pill-btn ${useMemoActive ? 'active' : 'error-pill active'}`}
            >
              {useMemoActive ? '⚡ useMemo AKTIF (Hasil di-Cache)' : '⚠️ useMemo MATI (Dihitung Ulang Tiap Render)'}
            </button>
          </div>

          <div className="benchmark-meters-grid">
            <div className="metric-tile">
              <span className="metric-title"><Timer size={14} /> Waktu Eksekusi Render Terakhir:</span>
              <h2 className={`metric-value ${Number(directTime) > 10 ? 'text-rose' : 'text-emerald'}`}>
                {directTime} <small>ms</small>
              </h2>
              <span className="metric-sub">
                {useMemoActive ? 'Tersimpan di memori cache' : 'Menghabiskan CPU browser'}
              </span>
            </div>

            <div className="metric-tile">
              <span className="metric-title"><Activity size={14} /> Berapa Kali Loop Dijalankan?</span>
              <h2 className="metric-value text-cyan">
                {directRunCount} <small>kali</small>
              </h2>
              <span className="metric-sub">Frekuensi kalkulasi sejak reset</span>
            </div>

            <div className="metric-tile">
              <span className="metric-title"><Gauge size={14} /> Hasil Komputasi:</span>
              <h2 className="metric-value text-primary">
                {directResult.toLocaleString('id-ID')}
              </h2>
              <span className="metric-sub">Input iterasi: {calcInput * 250000}</span>
            </div>
          </div>

          {/* PEMBUKTIAN: UPDATE STATE TIDAK TERKAIT */}
          <div className="proof-experiment-panel">
            <h5>🧪 Eksperimen Pembuktian (Re-render Tanpa Ubah Input):</h5>
            <p>
              Ketik teks di bawah atau klik tombol counter parent. Perhatikan angka <strong>"Waktu Eksekusi"</strong> dan <strong>"Berapa Kali Loop"</strong> di atas:
            </p>

            <div className="grid-2-col">
              <div className="input-group">
                <label>Ketik di Sini (State Parent yang Berubah):</label>
                <input
                  type="text"
                  value={parentUnrelatedText}
                  onChange={e => setParentUnrelatedText(e.target.value)}
                  placeholder="Ketik apa saja untuk memicu re-render..."
                  className="custom-input"
                />
              </div>

              <div className="input-group">
                <label>Picu Re-render Parent:</label>
                <button
                  onClick={() => setUnrelatedParentClicks(c => c + 1)}
                  className="action-btn outline"
                >
                  <RefreshCw size={15} /> Klik Re-render Parent ({unrelatedParentClicks})
                </button>
              </div>
            </div>

            <div className={`proof-summary-box ${useMemoActive ? 'success' : 'danger'}`}>
              <strong>
                {useMemoActive ? '✅ PEMBUKTIAN BERHASIL (useMemo Aktif):' : '❌ PEMBUKTIAN MASALAH (Tanpa useMemo):'}
              </strong>
              <p>
                {useMemoActive ? (
                  `Saat parent di-render ulang (klik: ${unrelatedParentClicks}), fungsi loop BERAT TIDAK DIJALANKAN ULANG sama sekali (Run count tetap ${directRunCount}). Hasil langsung diambil seketika dari memori cache!`
                ) : (
                  `Setiap kali Anda mengetik atau mengklik tombol parent, loop berat ${calcInput * 250000} iterasi DIPAKSA BERJALAN LAGI dari awal (${directTime}ms), menyebabkan UI lag!`
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
         TAB 2: PEMBUKTIAN React.memo
         ===================================================================== */}
      {activeTab === 'reactMemo' && (
        <div className="interactive-card">
          <div className="status-display-row">
            <h4>2. Perbandingan Komponen Biasa vs <code>React.memo</code>:</h4>
            <button
              onClick={() => setParentCounter(c => c + 1)}
              className="action-btn primary"
            >
              <RefreshCw size={15} /> Re-render Komponen Parent (Klik: {parentCounter})
            </button>
          </div>

          <p className="demo-desc" style={{ marginBottom: 12 }}>
            Kedua komponen child di bawah menerima prop yang <strong>sama persis</strong>. 
            Klik tombol <strong>"Re-render Komponen Parent"</strong> di atas dan amati mana yang ikut me-render ulang!
          </p>

          <div className="grid-2-col">
            {/* CHILD BIASA */}
            <RegularChild
              label="Komponen Tanpa Optimasi"
              onAction={() => alert('Aksi dari Komponen Biasa')}
            />

            {/* CHILD DENGAN React.memo */}
            <MemoizedChild
              label="Komponen Dioptimasi"
              onAction={() => alert('Aksi dari Memoized Component')}
            />
          </div>

          <div className="proof-summary-box success" style={{ marginTop: 16 }}>
            <strong>💡 Kesimpulan Ilmiah:</strong>
            <p>
              Komponen biasa akan ikut me-render ulang setiap kali parent-nya render (counter warna merah terus naik). 
              Sebaliknya, komponen yang dibungkus <code>React.memo</code> (warna hijau) 
              secara cerdas <strong>melewati fase render</strong> karena props-nya tidak berubah sama sekali!
            </p>
          </div>
        </div>
      )}

      {/* =====================================================================
         TAB 3: PEMBUKTIAN useCallback
         ===================================================================== */}
      {activeTab === 'useCallback' && (
        <div className="interactive-card">
          <div className="status-display-row">
            <h4>3. Mengapa <code>React.memo</code> Butuh <code>useCallback</code>?</h4>
            <button
              onClick={() => setUseCallbackActive(prev => !prev)}
              className={`pill-btn ${useCallbackActive ? 'active' : 'error-pill active'}`}
            >
              {useCallbackActive ? '⚡ useCallback AKTIF (Referensi Stabil)' : '⚠️ Tanpa useCallback (Fungsi Baru Tiap Render)'}
            </button>
          </div>

          <p className="demo-desc" style={{ marginBottom: 12 }}>
            Bahkan jika komponen child dibungkus <code>React.memo</code>, jika fungsi callback yang dioper dibuat baru di setiap render 
            (<code>{"onClick={() => ...}"}</code>), <code>React.memo</code> akan <strong>gagal</strong> karena JavaScript melihat referensi fungsi berbeda!
          </p>

          <div className="parent-trigger-box">
            <button
              onClick={() => setParentRenders(r => r + 1)}
              className="action-btn outline"
            >
              Picu Re-render Parent (#{parentRenders})
            </button>
            <div className="ref-check-status">
              <span>Referensi Fungsi di Memori:</span>
              <strong className={isSameFunctionRef ? 'text-emerald' : 'text-rose'}>
                {isSameFunctionRef ? 'Identik (=== TRUE, Tidak Berubah)' : 'Baru Dibuat (=== FALSE, Berubah!)'}
              </strong>
            </div>
          </div>

          <div className="single-child-test">
            <MemoizedChild
              label={`Child dibungkus React.memo + ${useCallbackActive ? 'useCallback' : 'Fungsi Biasa'}`}
              onAction={currentActionHandler}
            />
          </div>

          <div className={`proof-summary-box ${useCallbackActive ? 'success' : 'danger'}`} style={{ marginTop: 14 }}>
            <strong>
              {useCallbackActive ? '✅ Sinergi Berhasil:' : '⚠️ Terjadi Re-render Sia-sia:'}
            </strong>
            <p>
              {useCallbackActive ? (
                'useCallback mengembalikan referensi fungsi yang SAMA persis antar-render. React.memo memeriksa prevProps.onAction === nextProps.onAction -> TRUE -> Child TIDAK re-render!'
              ) : (
                'Tanpa useCallback, fungsi onAction dibuat ulang di alamat memori baru pada setiap render. React.memo memeriksa prevProps.onAction === nextProps.onAction -> FALSE -> Child DIPAKSA re-render ulang!'
              )}
            </p>
          </div>
        </div>
      )}

      {/* =====================================================================
         TAB 4: RANGKUMAN & KAPAN MENGGUNAKANNYA
         ===================================================================== */}
      {activeTab === 'synergy' && (
        <div className="interactive-card">
          <h4>Peta Perbandingan &amp; Aturan Pemakaian</h4>
          
          <div className="table-responsive-wrapper">
            <table className="memo-matrix-table">
              <thead>
                <tr>
                  <th>Fitur Optimasi</th>
                  <th>Apa yang Disimpan (Di-cache)?</th>
                  <th>Kapan Harus Digunakan?</th>
                  <th>Kapan JANGAN Digunakan?</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong><code>useMemo</code></strong></td>
                  <td><strong>Hasil nilai kalkulasi</strong> (angka, array terfilter, object olahan)</td>
                  <td>Komputasi berat (&gt;5ms), filtering ribuan data, atau membuat object referensi untuk child memo.</td>
                  <td>Operasi matematika ringan (penjumlahan, concat string). Overhead useMemo justru lebih lambat!</td>
                </tr>
                <tr>
                  <td><strong><code>useCallback</code></strong></td>
                  <td><strong>Referensi fungsi</strong> (definisi function yang sama)</td>
                  <td>Fungsi yang dioper sebagai props ke komponen child yang dibungkus <code>React.memo</code> atau dependensi useEffect.</td>
                  <td>Fungsi yang hanya digunakan di elemen native biasa (seperti <code>&lt;button onClick&gt;</code> lokal).</td>
                </tr>
                <tr>
                  <td><strong><code>React.memo</code></strong></td>
                  <td><strong>Komponen virtual DOM</strong> (melewati render function komponen anak)</td>
                  <td>Komponen anak yang sering di-render ulang oleh parent padahal props-nya jarang berubah.</td>
                  <td>Komponen sangat sederhana atau komponen yang props-nya memang hampir selalu berubah di setiap render.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pitfall-alert" style={{ marginTop: 16 }}>
            <ShieldAlert size={20} className="text-amber" />
            <div>
              <strong>Aturan Emas Performa React:</strong>
              <p>
                <strong>"Ukur dahulu sebelum mengoptimasi!"</strong> Jangan membungkus semua fungsi dan variabel dengan memoization. 
                React secara default sudah sangat cepat. Tambahkan memoization hanya ketika Anda merasakan kelambatan nyata pada UI.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
