import React, { useState, useTransition, useId } from 'react';
import { 
  Cpu, ShieldAlert, Sparkles, Server, Globe, 
  Terminal, CheckCircle2, Check, ArrowRight, Play 
} from 'lucide-react';

/* =========================================================================
   SLIDE 31: Responsivitas dengan useTransition
   ========================================================================= */
export function Slide31Demo() {
  const [inputVal, setInputVal] = useState('');
  const [filterQuery, setFilterQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleInput = (e) => {
    const val = e.target.value;
    setInputVal(val); // Update mendesak
    startTransition(() => {
      setFilterQuery(val); // Update non-urgent
    });
  };

  return (
    <div className="demo-box">
      <div className="demo-badge">Slide 31 Demo</div>
      <h3>Responsivitas dengan <code>useTransition</code></h3>
      <p className="demo-desc">
        Ketik teks di bawah dengan cepat. Input teks merespons seketika sementara proses penyaringan ditandai <code>isPending</code>:
      </p>

      <div className="interactive-card">
        <input
          type="text"
          value={inputVal}
          onChange={handleInput}
          placeholder="Ketik kata kunci pencarian..."
          className="custom-input"
        />

        <div className="status-display-row">
          {isPending ? (
            <span className="pending-indicator">
              <Cpu size={16} className="spin text-cyan" /> Sedang menyaring di latar belakang...
            </span>
          ) : (
            <span className="text-emerald">✅ Input siap &amp; tersinkron</span>
          )}
        </div>

        <div className="live-preview-box">
          <h4>Filter Query yang Diterapkan:</h4>
          <p>Kata kunci: <strong>{filterQuery || '(Semua Data)'}</strong></p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   SLIDE 32: lazy dan Suspense
   ========================================================================= */
export function Slide32Demo() {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const simulateLoad = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLoaded(true);
    }, 1200);
  };

  return (
    <div className="demo-box">
      <div className="demo-badge">Slide 32 Demo</div>
      <h3>Code-Splitting: <code>React.lazy</code> &amp; <code>Suspense</code></h3>
      <p className="demo-desc">
        Komponen berat ditunda pemuatannya sampai tombol ditekan, menampilkan UI fallback saat mengunduh:
      </p>

      <div className="interactive-card">
        <button
          onClick={simulateLoad}
          disabled={loading || loaded}
          className="action-btn primary"
        >
          {loading ? 'Mengunduh Modul...' : loaded ? 'Modul Sudah Aktif' : 'Muat Komponen Laporan (Lazy)'}
        </button>

        <div className="live-preview-box">
          {loading ? (
            <div className="loading-state">
              <Sparkles size={18} className="spin text-cyan" />
              <span>&lt;Suspense fallback=&#123;&lt;p&gt;Memuat laporan...&lt;/p&gt;&#125;&gt;</span>
            </div>
          ) : loaded ? (
            <div>
              <h4 className="text-emerald">📊 Modul Laporan Analitik Berhasil Dimuat!</h4>
              <p>Komponen ini diunduh secara on-demand dalam bundle terpisah.</p>
            </div>
          ) : (
            <p className="text-muted">Komponen belum diunduh (menghemat ukuran bundle awal).</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   SLIDE 33: Error Boundary
   ========================================================================= */
export function Slide33Demo() {
  const [crashed, setCrashed] = useState(false);

  return (
    <div className="demo-box">
      <div className="demo-badge">Slide 33 Demo</div>
      <h3>Error Boundary: Mencegah Layar Putih (White Screen)</h3>
      <p className="demo-desc">
        Picu error render yang disengaja untuk melihat bagaimana Error Boundary menampilkan UI fallback tanpa mematikan seluruh aplikasi:
      </p>

      <div className="interactive-card">
        {crashed ? (
          <div className="error-fallback-card">
            <ShieldAlert size={26} className="text-rose" />
            <div>
              <h4>Terjadi Kesalahan pada Komponen Ini!</h4>
              <p>Error Boundary menangkap crash dan mencegah seluruh halaman rusak.</p>
              <button onClick={() => setCrashed(false)} className="action-btn primary small">
                Pulihkan Komponen (Coba Lagi)
              </button>
            </div>
          </div>
        ) : (
          <div className="healthy-component-box">
            <div className="healthy-header">
              <Check size={18} className="text-emerald" />
              <span>Komponen Berjalan Sehat</span>
            </div>
            <button onClick={() => setCrashed(true)} className="action-btn danger small" style={{ marginTop: 10 }}>
              💥 Picu Error Render
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================================
   SLIDE 34: Hooks Lain (useId)
   ========================================================================= */
export function Slide34Demo() {
  const emailId = useId();
  const passwordId = useId();

  return (
    <div className="demo-box">
      <div className="demo-badge">Slide 34 Demo</div>
      <h3>Hook <code>useId()</code>: ID Aksesibilitas Unik Konsisten</h3>
      <p className="demo-desc">
        <code>useId</code> menjamin ID input dan label sama persis antara SSR server dan client browser:
      </p>

      <div className="interactive-card">
        <div className="input-group">
          <label htmlFor={emailId}>Email (id: <code>{emailId}</code>):</label>
          <input id={emailId} type="email" placeholder="nama@email.com" className="custom-input" />
        </div>
        <div className="input-group">
          <label htmlFor={passwordId}>Password (id: <code>{passwordId}</code>):</label>
          <input id={passwordId} type="password" placeholder="••••••••" className="custom-input" />
        </div>
        <small className="update-note">💡 Klik teks label di atas; kursor akan otomatis fokus ke input pasangannya!</small>
      </div>
    </div>
  );
}

/* =========================================================================
   SLIDE 35: Form Actions pada React Modern
   ========================================================================= */
export function Slide35Demo() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultMsg, setResultMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get('username');
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1000));
    setIsSubmitting(false);
    setResultMsg(`Berhasil disimpan: ${name} pada ${new Date().toLocaleTimeString()}`);
    e.currentTarget.reset();
  };

  return (
    <div className="demo-box">
      <div className="demo-badge">Slide 35 Demo</div>
      <h3>Form Actions pada React Modern (React 19)</h3>
      <p className="demo-desc">
        <code>useActionState</code> menghubungkan aksi formulir dengan status pending dan hasil pesan secara otomatis:
      </p>

      <div className="interactive-card">
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10 }}>
          <input
            name="username"
            required
            placeholder="Masukkan nama pengguna..."
            className="custom-input"
          />
          <button type="submit" disabled={isSubmitting} className="action-btn primary">
            {isSubmitting ? 'Menyimpan...' : 'Simpan Action'}
          </button>
        </form>

        {resultMsg && (
          <div className="action-feedback-box">
            ✅ {resultMsg}
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================================
   SLIDE 36: Client, Server, dan Hydration
   ========================================================================= */
export function Slide36Demo() {
  const [tab, setTab] = useState('csr');

  return (
    <div className="demo-box">
      <div className="demo-badge">Slide 36 Demo</div>
      <h3>Arsitektur Render: CSR vs SSR vs RSC</h3>
      <p className="demo-desc">
        Pelajari perbedaan mendasar alur render pada aplikasi React modern:
      </p>

      <div className="interactive-card">
        <div className="pill-group">
          <button onClick={() => setTab('csr')} className={`pill-btn ${tab === 'csr' ? 'active' : ''}`}>1. CSR (Client)</button>
          <button onClick={() => setTab('ssr')} className={`pill-btn ${tab === 'ssr' ? 'active' : ''}`}>2. SSR + Hydration</button>
          <button onClick={() => setTab('rsc')} className={`pill-btn ${tab === 'rsc' ? 'active' : ''}`}>3. RSC (Server Component)</button>
        </div>

        <div className="live-preview-box">
          {tab === 'csr' && <p><strong>CSR:</strong> Browser mengunduh HTML kosong, lalu file JS merakit tampilan di browser pengguna.</p>}
          {tab === 'ssr' && <p><strong>SSR:</strong> Server menghasilkan HTML siap tampil, lalu JS melakukan <em>Hydration</em> (menempelkan event listener).</p>}
          {tab === 'rsc' && <p><strong>RSC:</strong> Komponen berjalan di server dan <em>zero client bundle</em>; hanya komponen 'use client' yang dikirim JS-nya.</p>}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   SLIDE 37: Routing dan State Aplikasi
   ========================================================================= */
export function Slide37Demo() {
  const [tabFilter, setTabFilter] = useState('all');

  return (
    <div className="demo-box">
      <div className="demo-badge">Slide 37 Demo</div>
      <h3>Routing dan State Aplikasi (URL State vs UI State)</h3>
      <p className="demo-desc">
        Filter yang perlu dibagikan lewat tautan harus disimpan di parameter URL router:
      </p>

      <div className="interactive-card">
        <div className="pill-group">
          <span>Filter Tampilan:</span>
          {['all', 'aktif', 'arsip'].map(f => (
            <button
              key={f}
              onClick={() => setTabFilter(f)}
              className={`pill-btn ${tabFilter === f ? 'active' : ''}`}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="live-preview-box">
          <h4>Simulasi Sinkronisasi URL:</h4>
          <code>https://myapp.com/dashboard?status={tabFilter}</code>
          <small className="update-note">Tautan ini dapat dibagikan ke pengguna lain dan menampilkan filter yang sama!</small>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   SLIDE 38: Styling dan Aksesibilitas (a11y)
   ========================================================================= */
export function Slide38Demo() {
  const [saving, setSaving] = useState(false);

  return (
    <div className="demo-box">
      <div className="demo-badge">Slide 38 Demo</div>
      <h3>Styling &amp; Aksesibilitas: Keyboard &amp; Focus Visible</h3>
      <p className="demo-desc">
        Tekan tombol <kbd>Tab</kbd> pada keyboard Anda untuk melihat outline fokus terlihat jelas (.focus-visible):
      </p>

      <div className="interactive-card">
        <button
          onClick={() => {
            setSaving(true);
            setTimeout(() => setSaving(false), 1000);
          }}
          disabled={saving}
          className="action-btn primary"
        >
          {saving ? 'Menyimpan...' : 'Simpan Data (Coba Tekan Tab)'}
        </button>
        <small className="update-note">Elemen &lt;button&gt; semantik mendukung Enter dan Spasi secara otomatis.</small>
      </div>
    </div>
  );
}

/* =========================================================================
   SLIDE 39: TypeScript untuk Props
   ========================================================================= */
export function Slide39Demo() {
  const [variant, setVariant] = useState('primary');
  const [disabled, setDisabled] = useState(false);

  return (
    <div className="demo-box">
      <div className="demo-badge">Slide 39 Demo</div>
      <h3>TypeScript untuk Props: ButtonProps Contract</h3>
      <p className="demo-desc">
        TypeScript memastikan kontrak props dipatuhi sebelum kode dijalankan:
      </p>

      <div className="interactive-card">
        <div className="status-display-row">
          <div className="pill-group">
            <span>Prop variant:</span>
            <button onClick={() => setVariant('primary')} className={`pill-btn ${variant === 'primary' ? 'active' : ''}`}>primary</button>
            <button onClick={() => setVariant('danger')} className={`pill-btn ${variant === 'danger' ? 'active' : ''}`}>danger</button>
          </div>
          <button onClick={() => setDisabled(d => !d)} className="action-btn outline small">
            Toggle disabled={disabled ? 'true' : 'false'}
          </button>
        </div>

        <div className="live-preview-box">
          <h4>Hasil Render &lt;Button variant="{variant}" disabled={'{' + disabled + '}'} /&gt;:</h4>
          <button className={`action-btn ${variant === 'primary' ? 'primary' : 'danger'}`} disabled={disabled}>
            Tombol Props Valid
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   SLIDE 40: Pengujian dan Debugging
   ========================================================================= */
export function Slide40Demo() {
  const [testResults, setTestResults] = useState(null);

  const runTests = () => {
    setTestResults([
      { name: 'Input kosong ditolak dengan .trim()', status: 'PASS' },
      { name: 'Tambah tugas memunculkan ID dan judul baru', status: 'PASS' },
      { name: 'Checkbox mengubah status boolean .done', status: 'PASS' },
      { name: 'Filter tidak menghapus data dari memori', status: 'PASS' }
    ]);
  };

  return (
    <div className="demo-box">
      <div className="demo-badge">Slide 40 Demo</div>
      <h3>Pengujian &amp; Debugging: Skenario Uji Perilaku</h3>
      <p className="demo-desc">
        Uji perilaku nyata yang dialami pengguna. Klik tombol untuk menjalankan rangkaian uji:
      </p>

      <div className="interactive-card">
        <button onClick={runTests} className="action-btn primary small">
          <Play size={14} /> Jalankan Tes Otomatis
        </button>

        {testResults && (
          <div className="snapshot-logs">
            <h5>Hasil Pengujian:</h5>
            {testResults.map((t, idx) => (
              <p key={idx} className="log-line text-emerald">
                ✔ {t.status}: {t.name}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
