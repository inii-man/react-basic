import React, { useState, useTransition, useMemo, useCallback } from 'react';
import { Gauge, Cpu, ShieldAlert, Sparkles, Send, Globe, Server, Check } from 'lucide-react';

/**
 * Chapter5Advanced.jsx
 * Berisi demo interaktif untuk Bab 05: Data, Performa, dan Arsitektur (Slide 30 - 40)
 */
export default function Chapter5Advanced() {
  // Slide 30: useMemo Heavy Calculation
  const [memoNumber, setMemoNumber] = useState(30);
  const [useMemoActive, setUseMemoActive] = useState(true);
  const [calcTime, setCalcTime] = useState(0);
  const [unrelatedState, setUnrelatedState] = useState(0);

  // Slide 31: useTransition Responsive Search
  const [inputText, setInputText] = useState('');
  const [deferredQuery, setDeferredQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  const [enableTransition, setEnableTransition] = useState(true);

  // Slide 33: Error Boundary
  const [triggerCrash, setTriggerCrash] = useState(false);
  const [errorRecovered, setErrorRecovered] = useState(false);

  // Slide 35: React 19 Form Action Simulator
  const [formPending, setFormPending] = useState(false);
  const [actionResult, setActionResult] = useState(null);

  // Slide 36: CSR vs SSR vs RSC Visual Tab
  const [activeArchTab, setActiveArchTab] = useState('csr');

  // Heavy calculation benchmark (Fibonacci / Primes simulation)
  const heavyResult = useMemo(() => {
    const t0 = performance.now();
    let sum = 0;
    // Komputasi yang sengaja disimulasikan berat
    for (let i = 0; i < memoNumber * 100000; i++) {
      sum += Math.sqrt(i % 100);
    }
    const t1 = performance.now();
    // setTimeout agar tidak melanggar pure render saat setCalcTime
    setTimeout(() => setCalcTime(Math.round(t1 - t0)), 0);
    return Math.round(sum);
  }, [useMemoActive ? memoNumber : Math.random()]);

  // Generate 2,000 mock items for useTransition testing
  const allDataset = useMemo(() => {
    const arr = [];
    for (let i = 1; i <= 2000; i++) {
      arr.push(`Item Paket React #${i} - Modul Belajar Komponen ${i % 10}`);
    }
    return arr;
  }, []);

  const filteredItems = useMemo(() => {
    const q = deferredQuery.toLowerCase();
    if (!q) return allDataset.slice(0, 10);
    return allDataset.filter(item => item.toLowerCase().includes(q)).slice(0, 15);
  }, [allDataset, deferredQuery]);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setInputText(val);

    if (enableTransition) {
      // Menggunakan useTransition untuk menjaga responsivitas input
      startTransition(() => {
        setDeferredQuery(val);
      });
    } else {
      // Langsung eksekusi (bisa menyebabkan input terasa lambat pada komputasi besar)
      setDeferredQuery(val);
    }
  };

  // React 19 Form Action simulation
  const handleActionSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('actionTitle');
    setFormPending(true);

    // Simulasi delay server
    await new Promise(r => setTimeout(r, 1200));
    setFormPending(false);
    setActionResult(`✅ Sukses: Entitas "${title}" berhasil disimpan ke server pada ${new Date().toLocaleTimeString()}`);
    e.currentTarget.reset();
  };

  return (
    <div className="chapter-demos">
      {/* Slide 30: useMemo & Performance Benchmark */}
      <section className="demo-box">
        <div className="demo-badge">Slide 30 Demo</div>
        <h3>Optimasi Performa: Uji Benchmark <code>useMemo</code></h3>
        <p className="demo-desc">
          <code>useMemo</code> menyimpan hasil perhitungan selama dependensinya tidak berubah.
          Klik tombol <strong>"Re-render Tanpa Ubah Angka"</strong> untuk membuktikan bahwa perhitungan berat tidak dijalankan ulang jika <code>useMemo</code> aktif!
        </p>

        <div className="interactive-card">
          <div className="grid-2-col">
            <div className="input-group">
              <label>Tingkat Beban Komputasi:</label>
              <input
                type="range"
                min="10"
                max="80"
                value={memoNumber}
                onChange={e => setMemoNumber(Number(e.target.value))}
                className="custom-range"
              />
              <span>Nilai pengali: <strong>{memoNumber}</strong></span>
            </div>

            <div className="memo-toggles">
              <button
                onClick={() => setUseMemoActive(prev => !prev)}
                className={`pill-btn ${useMemoActive ? 'active' : 'error-pill active'}`}
              >
                {useMemoActive ? '⚡ useMemo AKTIF' : '⚠️ useMemo DINONAKTIFKAN'}
              </button>

              <button
                onClick={() => setUnrelatedState(n => n + 1)}
                className="action-btn outline small"
              >
                Re-render Tanpa Ubah Angka (Klik: {unrelatedState})
              </button>
            </div>
          </div>

          <div className="benchmark-results">
            <div className="bench-card">
              <span>Waktu Eksekusi:</span>
              <h3 className="bench-time">{calcTime} ms</h3>
            </div>
            <div className="bench-card">
              <span>Hasil Komputasi:</span>
              <h3>{heavyResult.toLocaleString()}</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 31: useTransition Responsive Search */}
      <section className="demo-box">
        <div className="demo-badge">Slide 31 Demo</div>
        <h3>Responsivitas dengan <code>useTransition</code> (Dataset 2.000 Item)</h3>
        <p className="demo-desc">
          <code>useTransition</code> membedakan update mendesak (ketikan keyboard di input) dengan update berat (penyaringan 2.000 data). 
          Input Anda akan selalu terasa mulus dan responsif!
        </p>

        <div className="interactive-card">
          <div className="transition-mode-row">
            <button
              onClick={() => setEnableTransition(prev => !prev)}
              className={`pill-btn ${enableTransition ? 'active' : 'error-pill active'}`}
            >
              {enableTransition ? '⚡ useTransition AKTIF (Non-blocking)' : '⚠️ Mode Biasa (Blocking)'}
            </button>
          </div>

          <div className="search-interactive-row">
            <input
              type="text"
              value={inputText}
              onChange={handleSearchChange}
              placeholder="Coba ketik dengan cepat: react, modul, komponen..."
              className="custom-input"
            />
            {isPending && (
              <span className="pending-indicator">
                <Cpu size={16} className="spin text-cyan" />
                <span>Menyaring di latar belakang...</span>
              </span>
            )}
          </div>

          <div className="transition-results-preview">
            <span>Daftar Hasil ({filteredItems.length} dari 2.000):</span>
            <div className="filtered-tags-list">
              {filteredItems.map((item, idx) => (
                <div key={idx} className="dataset-item-pill">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Slide 33: Error Boundary Simulator */}
      <section className="demo-box">
        <div className="demo-badge">Slide 33 Demo</div>
        <h3>Error Boundary: Mencegah Layar Putih (White Screen Crash)</h3>
        <p className="demo-desc">
          Jika sebuah komponen child melempar error saat fase render, Error Boundary menangkapnya dan menampilkan 
          UI fallback yang elegan tanpa merusak seluruh antarmuka aplikasi:
        </p>

        <div className="interactive-card">
          {triggerCrash ? (
            <div className="error-fallback-card">
              <ShieldAlert size={28} className="text-rose" />
              <div>
                <h4>Terjadi Kesalahan Render pada Komponen Ini!</h4>
                <p>Simulasi: <code>Uncaught Error: Komponen crash yang disengaja!</code></p>
                <button
                  onClick={() => {
                    setTriggerCrash(false);
                    setErrorRecovered(true);
                  }}
                  className="action-btn primary small"
                >
                  Pulihkan Komponen (Recover)
                </button>
              </div>
            </div>
          ) : (
            <div className="healthy-component-box">
              <div className="healthy-header">
                <Check size={18} className="text-emerald" />
                <span>Komponen Sehat &amp; Berjalan Normal</span>
              </div>
              <p>Komponen ini berada di dalam batas pengawasan Error Boundary.</p>
              <button
                onClick={() => setTriggerCrash(true)}
                className="action-btn danger small"
              >
                💥 Picu Error Render yang Disengaja
              </button>
              {errorRecovered && (
                <p className="text-emerald" style={{ marginTop: 8 }}>
                  ✅ Berhasil dipulihkan kembali oleh Error Boundary!
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Slide 35: React 19 Form Actions */}
      <section className="demo-box">
        <div className="demo-badge">Slide 35 Demo</div>
        <h3>Form Actions pada React Modern (React 19)</h3>
        <p className="demo-desc">
          React 19 menyederhanakan formulir dengan <code>useActionState</code>. 
          Status <code>isPending</code> dan hasil submit dikelola secara otomatis tanpa puluhan baris <code>useState</code>:
        </p>

        <div className="interactive-card">
          <form onSubmit={handleActionSubmit} className="action-form-demo">
            <div className="input-group">
              <label htmlFor="actionTitle">Judul Rencana Proyek:</label>
              <input
                id="actionTitle"
                name="actionTitle"
                required
                placeholder="Misal: Membangun Web React Portofolio..."
                className="custom-input"
              />
            </div>
            <button
              type="submit"
              disabled={formPending}
              className="action-btn primary"
            >
              {formPending ? 'Menyimpan ke Server...' : 'Simpan dengan Action'}
            </button>
          </form>

          {actionResult && (
            <div className="action-feedback-box">
              {actionResult}
            </div>
          )}
        </div>
      </section>

      {/* Slide 36: CSR vs SSR vs RSC Visual Explainer */}
      <section className="demo-box">
        <div className="demo-badge">Slide 36 Demo</div>
        <h3>Arsitektur Render: CSR vs SSR vs Hydration vs RSC</h3>
        <p className="demo-desc">
          Pahami perbedaan mendasar dari 3 paradigma modern rendering di ekosistem React:
        </p>

        <div className="interactive-card">
          <div className="arch-tabs">
            <button
              onClick={() => setActiveArchTab('csr')}
              className={`arch-tab-btn ${activeArchTab === 'csr' ? 'active' : ''}`}
            >
              <Globe size={16} /> CSR (Client-Side)
            </button>
            <button
              onClick={() => setActiveArchTab('ssr')}
              className={`arch-tab-btn ${activeArchTab === 'ssr' ? 'active' : ''}`}
            >
              <Server size={16} /> SSR + Hydration
            </button>
            <button
              onClick={() => setActiveArchTab('rsc')}
              className={`arch-tab-btn ${activeArchTab === 'rsc' ? 'active' : ''}`}
            >
              <Sparkles size={16} /> RSC (Server Components)
            </button>
          </div>

          <div className="arch-content-box">
            {activeArchTab === 'csr' && (
              <div>
                <h4>Client-Side Rendering (CSR):</h4>
                <p>Browser mengunduh HTML kosong (<code>&lt;div id="root"&gt;&lt;/div&gt;</code>) dan satu file bundel JavaScript besar. Seluruh komponen dirakit di browser pengguna.</p>
                <div className="pro-con-grid">
                  <div className="pro-box"><strong>Kelebihan:</strong> Transisi navigasi instan tanpa reload, hosting murah (statis).</div>
                  <div className="con-box"><strong>Kekurangan:</strong> FCP (First Contentful Paint) awal lebih lambat, SEO membutuhkan penanganan ekstra.</div>
                </div>
              </div>
            )}
            {activeArchTab === 'ssr' && (
              <div>
                <h4>Server-Side Rendering (SSR) &amp; Hydration:</h4>
                <p>Server merender HTML utuh saat request datang sehingga halaman langsung terlihat di browser. Setelah itu, file JavaScript diunduh dan melakukan <strong>Hydration</strong> (menghubungkan event listener onClick dsb).</p>
                <div className="pro-con-grid">
                  <div className="pro-box"><strong>Kelebihan:</strong> SEO sangat baik, tampilan langsung muncul seketika saat pertama buka.</div>
                  <div className="con-box"><strong>Kekurangan:</strong> Beban komputasi server lebih tinggi saat traffic padat, ada fase jeda sebelum tombol bisa diklik (hydration lag).</div>
                </div>
              </div>
            )}
            {activeArchTab === 'rsc' && (
              <div>
                <h4>React Server Components (RSC):</h4>
                <p>Komponen berjalan 100% di server dan <strong>TIDAK pernah mengirimkan JavaScript komponen tersebut ke browser</strong> (*zero client bundle size*). Hanya komponen interaktif dengan interaksi pengguna (ditandai <code>'use client'</code>) yang dikirim JS-nya.</p>
                <div className="pro-con-grid">
                  <div className="pro-box"><strong>Kelebihan:</strong> Ukuran bundle JavaScript browser sangat kecil, akses database langsung dari komponen.</div>
                  <div className="con-box"><strong>Kekurangan:</strong> Memerlukan framework modern seperti Next.js atau Vite RSC plugin.</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
