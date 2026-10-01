import React, { useState } from 'react';
import { ShieldAlert, Layers, Eye, ListOrdered, MousePointerClick, Check, RefreshCw } from 'lucide-react';

/**
 * Chapter2Components.jsx
 * Berisi demo interaktif untuk Bab 02: Component, Props, dan Komposisi (Slide 8 - 12)
 */
export default function Chapter2Components() {
  // Slide 8: Props Badge
  const [badgeText, setBadgeText] = useState('Aktif');
  const [badgeColor, setBadgeColor] = useState('#10b981');
  const [badgeVariant, setBadgeVariant] = useState('solid'); // 'solid', 'outline'

  // Slide 9: Komposisi children
  const [panelTitle, setPanelTitle] = useState('Kartu Profil Peserta');
  const [selectedChildType, setSelectedChildType] = useState('profile'); // 'profile', 'stats', 'callout'

  // Slide 10: Conditional rendering & 0 bug
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Slide 11: List and Key (UUID vs Index demo)
  const [items, setItems] = useState([
    { id: 'uid-1', title: 'Belajar Fundamental', note: 'Catatan pertama' },
    { id: 'uid-2', title: 'Pahami Alur Props', note: 'Catatan kedua' }
  ]);
  const [useIndexKey, setUseIndexKey] = useState(false);

  // Slide 12: Event Handler
  const [lastEventMessage, setLastEventMessage] = useState('Belum ada tombol diklik');

  const addItemAtTop = () => {
    const newItem = {
      id: `uid-${Date.now()}`,
      title: `Tugas Baru #${items.length + 1}`,
      note: 'Ketik di sini...'
    };
    setItems([newItem, ...items]);
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="chapter-demos">
      {/* Slide 8: Props */}
      <section className="demo-box">
        <div className="demo-badge">Slide 8 Demo</div>
        <h3>Props: Komponen Badge Kustom</h3>
        <p className="demo-desc">
          Props adalah input dari parent ke child yang bersifat <em>read-only</em>. 
          Ubah nilai props di bawah ini dan perhatikan bagaimana komponen <code>&lt;Badge /&gt;</code> merespons:
        </p>

        <div className="interactive-card">
          <div className="grid-3-col">
            <div className="input-group">
              <label>Teks Label (Prop: label):</label>
              <input
                type="text"
                value={badgeText}
                onChange={e => setBadgeText(e.target.value)}
                className="custom-input"
              />
            </div>
            <div className="input-group">
              <label>Pilih Warna (Prop: color):</label>
              <div className="color-presets">
                {['#10b981', '#38bdf8', '#818cf8', '#f59e0b', '#f43f5e', '#a855f7'].map(c => (
                  <button
                    key={c}
                    onClick={() => setBadgeColor(c)}
                    className="color-dot"
                    style={{ backgroundColor: c, border: badgeColor === c ? '2px solid #fff' : 'none' }}
                  />
                ))}
              </div>
            </div>
            <div className="input-group">
              <label>Gaya (Prop: variant):</label>
              <div className="pill-group">
                <button
                  onClick={() => setBadgeVariant('solid')}
                  className={`pill-btn ${badgeVariant === 'solid' ? 'active' : ''}`}
                >
                  Solid
                </button>
                <button
                  onClick={() => setBadgeVariant('outline')}
                  className={`pill-btn ${badgeVariant === 'outline' ? 'active' : ''}`}
                >
                  Outline
                </button>
              </div>
            </div>
          </div>

          <div className="live-preview-box">
            <h4>Hasil Render Komponen <code>&lt;Badge label="{badgeText}" color="{badgeColor}" /&gt;</code>:</h4>
            <div className="badge-preview-area">
              <span
                style={{
                  backgroundColor: badgeVariant === 'solid' ? badgeColor : 'transparent',
                  color: badgeVariant === 'solid' ? '#fff' : badgeColor,
                  border: `2px solid ${badgeColor}`,
                  padding: '6px 16px',
                  borderRadius: '999px',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: badgeVariant === 'solid' ? '#fff' : badgeColor }} />
                {badgeText || '(Kosong)'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 9: Komposisi dengan children */}
      <section className="demo-box">
        <div className="demo-badge">Slide 9 Demo</div>
        <h3>Komposisi dengan Prop Spesial: <code>children</code></h3>
        <p className="demo-desc">
          Komponen <code>&lt;Panel&gt;</code> bertindak sebagai wrapper serbaguna. Ia tidak peduli apa isi di dalamnya, 
          apakah tombol, formulir, atau teks—semua diterima melalui prop <code>children</code>:
        </p>

        <div className="interactive-card">
          <div className="input-group">
            <label>Judul Panel (Prop title):</label>
            <input
              type="text"
              value={panelTitle}
              onChange={e => setPanelTitle(e.target.value)}
              className="custom-input"
            />
          </div>

          <div className="child-type-selector">
            <span>Pilih Konten <code>children</code>:</span>
            <div className="pill-group">
              <button
                onClick={() => setSelectedChildType('profile')}
                className={`pill-btn ${selectedChildType === 'profile' ? 'active' : ''}`}
              >
                Biodata Singkat
              </button>
              <button
                onClick={() => setSelectedChildType('stats')}
                className={`pill-btn ${selectedChildType === 'stats' ? 'active' : ''}`}
              >
                Statistik Belajar
              </button>
              <button
                onClick={() => setSelectedChildType('callout')}
                className={`pill-btn ${selectedChildType === 'callout' ? 'active' : ''}`}
              >
                Kotak Pengumuman
              </button>
            </div>
          </div>

          <div className="live-preview-box">
            <h4>Pratinjau Komponen Wrapper <code>&lt;Panel title="{panelTitle}"&gt;</code>:</h4>
            <div className="panel-wrapper">
              <div className="panel-header-bar">
                <Layers size={18} className="text-cyan" />
                <h4>{panelTitle}</h4>
              </div>
              <div className="panel-content-body">
                {selectedChildType === 'profile' && (
                  <div className="child-slot">
                    <p>👨‍💻 <strong>Nama:</strong> Sulaiman Saleh</p>
                    <p>📚 <strong>Fokus:</strong> Fullstack &amp; Mobile Engineer</p>
                    <button className="action-btn primary small">Kirim Pesan</button>
                  </div>
                )}
                {selectedChildType === 'stats' && (
                  <div className="child-slot">
                    <div className="stats-row">
                      <div className="stat-card"><strong>48</strong><span>Slide</span></div>
                      <div className="stat-card"><strong>6</strong><span>Bab</span></div>
                      <div className="stat-card"><strong>100%</strong><span>Interaktif</span></div>
                    </div>
                  </div>
                )}
                {selectedChildType === 'callout' && (
                  <div className="child-slot callout-slot">
                    <p>📢 <em>"Komposisi mengalahkan pewarisan (inheritance) di arsitektur komponen React!"</em></p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 10: Conditional Rendering */}
      <section className="demo-box">
        <div className="demo-badge">Slide 10 Demo</div>
        <h3>Conditional Rendering &amp; Jebakan Angka 0 pada <code>&amp;&amp;</code></h3>
        <p className="demo-desc">
          Perhatikan bagaimana React menampilkan komponen berbeda berdasarkan kondisi boolean.
          Coba turunkan angka pesan ke <strong>0</strong> untuk melihat bagaimana <code>count &gt; 0</code> melindungi dari bug merender angka 0!
        </p>

        <div className="interactive-card">
          <div className="toggle-group-row">
            <button
              onClick={() => setIsLoggedIn(prev => !prev)}
              className={`action-btn ${isLoggedIn ? 'primary' : 'outline'}`}
            >
              {isLoggedIn ? '🔓 Sedang Login' : '🔒 Belum Login (Guest)'}
            </button>

            <button
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => setIsLoading(false), 1200);
              }}
              className="action-btn outline"
            >
              <RefreshCw size={14} className={isLoading ? 'spin' : ''} />
              Simulasi Memuat Data
            </button>

            <div className="counter-controls">
              <span>Jumlah Notifikasi:</span>
              <button
                onClick={() => setUnreadCount(c => Math.max(0, c - 1))}
                className="action-btn small"
              >
                -
              </button>
              <span className="count-display">{unreadCount}</span>
              <button
                onClick={() => setUnreadCount(c => c + 1)}
                className="action-btn small"
              >
                +
              </button>
            </div>
          </div>

          <div className="live-preview-box">
            <h4>Output Antarmuka:</h4>
            {isLoading ? (
              <div className="loading-state">
                <RefreshCw size={20} className="spin text-cyan" />
                <span>Sedang mengambil data terbaru...</span>
              </div>
            ) : (
              <div className="auth-result-box">
                {isLoggedIn ? (
                  <div>
                    <h5>Selamat Datang Kembali, Pengguna! 🎉</h5>
                    <p>Anda memiliki akses penuh ke seluruh modul latihan.</p>
                  </div>
                ) : (
                  <div>
                    <h5>Silakan Masuk Terlebih Dahulu 🛡️</h5>
                    <p>Tampilan ini dihasilkan melalui ekspresi ternary <code>{`{isLoggedIn ? <Member /> : <Guest />}`}</code>.</p>
                  </div>
                )}

                {/* Aman dengan count > 0 */}
                <div className="notification-status">
                  {unreadCount > 0 ? (
                    <span className="notif-badge active">🔔 {unreadCount} Pesan Baru Belum Dibaca</span>
                  ) : (
                    <span className="notif-badge empty">✔️ Semua pesan sudah dibaca</span>
                  )}
                </div>

                <div className="bug-warning-box">
                  <ShieldAlert size={18} className="text-amber" />
                  <div>
                    <strong>Peringatan Jebakan Slide 10:</strong>
                    <p>
                      Jika Anda menulis <code>{`{unreadCount && <Badge />}`}</code> saat <code>unreadCount = 0</code>, 
                      React akan menampilkan teks angka <strong>0</strong> di antarmuka Anda! Selalu gunakan <code>{`{unreadCount > 0 && <Badge />}`}</code>.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Slide 11: List & Key Simulator */}
      <section className="demo-box">
        <div className="demo-badge">Slide 11 Demo</div>
        <h3>Eksperimen Key: ID Unik vs Index Array</h3>
        <p className="demo-desc">
          Ketik catatan di salah satu input, lalu klik <strong>"Tambah di Posisi Pertama"</strong>. 
          Jika menggunakan <strong>Key = ID Unik</strong>, catatan Anda tetap menempel pada item yang benar. 
          Jika menggunakan <strong>Key = Index</strong>, React akan tertipu dan catatan tertinggal di baris atas!
        </p>

        <div className="interactive-card">
          <div className="key-switcher-row">
            <button
              onClick={() => setUseIndexKey(false)}
              className={`pill-btn ${!useIndexKey ? 'active' : ''}`}
            >
              ✅ Gunakan Key ID Unik (crypto.randomUUID)
            </button>
            <button
              onClick={() => setUseIndexKey(true)}
              className={`pill-btn ${useIndexKey ? 'active error-pill' : ''}`}
            >
              ⚠️ Gunakan Key Index Array (Bahaya Bug!)
            </button>

            <button onClick={addItemAtTop} className="action-btn primary small">
              + Tambah di Posisi Pertama
            </button>
          </div>

          <div className="key-list-container">
            {items.map((item, index) => {
              const currentKey = useIndexKey ? index : item.id;
              return (
                <div key={currentKey} className="key-item-row">
                  <div className="item-meta">
                    <strong>{item.title}</strong>
                    <code className="key-badge">key="{currentKey}"</code>
                  </div>
                  <input
                    type="text"
                    defaultValue={item.note}
                    placeholder="Ketik catatan di sini untuk menguji state DOM..."
                    className="custom-input key-input"
                  />
                  <button
                    onClick={() => removeItem(item.id)}
                    className="action-btn danger small"
                    title="Hapus baris ini"
                  >
                    Hapus
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Slide 12: Event Handler */}
      <section className="demo-box">
        <div className="demo-badge">Slide 12 Demo</div>
        <h3>Event Handler: Meneruskan Callback dengan Argumen</h3>
        <p className="demo-desc">
          Gunakan inline arrow function <code>{"onClick={() => handleClick(id)}"}</code> untuk mengirimkan parameter 
          tanpa mengeksekusinya secara tidak sengaja saat render!
        </p>

        <div className="interactive-card">
          <div className="buttons-demo-row">
            {[101, 102, 103].map(id => (
              <button
                key={id}
                onClick={() => setLastEventMessage(`Berhasil menyimpan data dokumen dengan ID: #${id} pada ${new Date().toLocaleTimeString()}`)}
                className="action-btn outline"
              >
                <MousePointerClick size={16} />
                Simpan Dokumen #{id}
              </button>
            ))}
          </div>

          <div className="event-log-box">
            <span>Log Event Terakhir:</span>
            <strong>{lastEventMessage}</strong>
          </div>
        </div>
      </section>
    </div>
  );
}
