import React, { useState, useEffect } from 'react';
import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { 
  Database, Zap, History, ArrowRight, RefreshCw, ShoppingCart, 
  Wallet, User, Check, Play, Clock, Code2, AlertTriangle, Layers,
  Terminal, ShieldCheck, Sparkles, ChevronRight, RotateCcw
} from 'lucide-react';
import CodeViewer from './CodeViewer';

/* =========================================================================
   1. REDUX TOOLKIT SLICES & STORE DEFINITIONS
   ========================================================================= */

// Slice 1: Bank & Dompet Digital
const bankSlice = createSlice({
  name: 'bank',
  initialState: {
    balance: 1500000,
    holder: 'Sulaiman Saleh',
    tier: 'Platinum Member',
    status: 'Active'
  },
  reducers: {
    deposit: (state, action) => {
      // Immer memperbolehkan sintaks mutasi langsung di RTK
      state.balance += action.payload;
    },
    withdraw: (state, action) => {
      if (state.balance >= action.payload) {
        state.balance -= action.payload;
      }
    },
    upgradeTier: (state) => {
      state.tier = state.tier === 'Platinum Member' ? 'Diamond VIP' : 'Platinum Member';
    },
    resetBank: (state) => {
      state.balance = 1000000;
    }
  }
});

// Slice 2: Keranjang Belanja (E-Commerce Cart)
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [
      { id: 'c1', name: 'Buku Panduan React Modern', price: 120000, qty: 1 },
      { id: 'c2', name: 'Kaos Developer Redux', price: 95000, qty: 2 }
    ]
  },
  reducers: {
    addToCart: (state, action) => {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({ ...action.payload, qty: 1 });
      }
    },
    incrementQty: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) item.qty += 1;
    },
    decrementQty: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item && item.qty > 1) {
        item.qty -= 1;
      } else {
        state.items = state.items.filter(i => i.id !== action.payload);
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    }
  }
});

// Slice 3: Async Thunk (Simulasi Fetch API)
export const fetchApiUsers = createAsyncThunk(
  'users/fetchApiUsers',
  async (amount = 3, { rejectWithValue }) => {
    // Simulasi jeda jaringan 1000ms
    await new Promise(r => setTimeout(r, 1000));
    return [
      { id: 1, name: 'Budi Hartono', role: 'Fullstack Dev', city: 'Jakarta' },
      { id: 2, name: 'Siti Rahma', role: 'Frontend Engineer', city: 'Bandung' },
      { id: 3, name: 'Reza Pratama', role: 'Mobile Specialist', city: 'Surabaya' }
    ].slice(0, amount);
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [
      { id: 0, name: 'Sulaiman (Lokal)', role: 'Lead Architect', city: 'Indonesia' }
    ],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchApiUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchApiUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'Gagal memuat pengguna dari server';
      });
  }
});

export const { deposit, withdraw, upgradeTier, resetBank } = bankSlice.actions;
export const { addToCart, incrementQty, decrementQty, removeFromCart, clearCart } = cartSlice.actions;

// Membuat Centralized Redux Store
const demoReduxStore = configureStore({
  reducer: {
    bank: bankSlice.reducer,
    cart: cartSlice.reducer,
    users: usersSlice.reducer
  }
});

/* =========================================================================
   2. KOMPONEN UI KONSUMEN REDUX (useSelector & useDispatch)
   ========================================================================= */

function BankWidget({ onActionDispatched }) {
  const { balance, holder, tier } = useSelector((state) => state.bank);
  const dispatch = useDispatch();

  const handleDeposit = (amount) => {
    dispatch(deposit(amount));
    onActionDispatched('bank/deposit', { amount });
  };

  const handleWithdraw = (amount) => {
    dispatch(withdraw(amount));
    onActionDispatched('bank/withdraw', { amount });
  };

  const handleTier = () => {
    dispatch(upgradeTier());
    onActionDispatched('bank/upgradeTier', null);
  };

  const handleReset = () => {
    dispatch(resetBank());
    onActionDispatched('bank/resetBank', null);
  };

  return (
    <div className="redux-module-card">
      <div className="module-header">
        <Wallet size={20} className="text-cyan" />
        <h4>1. Bank &amp; Dompet Digital (Slice: bank)</h4>
        <span className="key-tag">{tier}</span>
      </div>

      <div className="module-body">
        <p>Pemilik Rekening: <strong>{holder}</strong></p>
        <h2 className="score-number" style={{ fontSize: '2rem', margin: '8px 0' }}>
          Rp {balance.toLocaleString('id-ID')}
        </h2>

        <div className="pill-group" style={{ marginTop: 12 }}>
          <button onClick={() => handleDeposit(100000)} className="action-btn outline small">
            + Setor Rp 100.000
          </button>
          <button onClick={() => handleDeposit(500000)} className="action-btn outline small">
            + Setor Rp 500.000
          </button>
          <button onClick={() => handleWithdraw(50000)} className="action-btn outline small">
            - Tarik Rp 50.000
          </button>
          <button onClick={handleTier} className="action-btn primary small">
            Ganti Tier VIP
          </button>
          <button onClick={handleReset} className="action-btn danger small">
            Reset Saldo
          </button>
        </div>
      </div>
    </div>
  );
}

function CartWidget({ onActionDispatched }) {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const totalBelanja = items.reduce((acc, it) => acc + (it.price * it.qty), 0);

  const catalog = [
    { id: 'c3', name: 'Kursus React Native & Expo', price: 250000 },
    { id: 'c4', name: 'Stiker Keren React & Vite', price: 25000 }
  ];

  return (
    <div className="redux-module-card">
      <div className="module-header">
        <ShoppingCart size={20} className="text-emerald" />
        <h4>2. Keranjang Belanja Global (Slice: cart)</h4>
        <span className="key-tag">{items.length} Macam Barang</span>
      </div>

      <div className="module-body">
        <div className="cart-items-mini-list">
          {items.length === 0 ? (
            <p className="text-muted">Keranjang kosong. Tambahkan dari katalog di bawah!</p>
          ) : (
            items.map(item => (
              <div key={item.id} className="cart-mini-row">
                <div>
                  <strong>{item.name}</strong>
                  <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                    Rp {item.price.toLocaleString('id-ID')} × {item.qty} = 
                    <strong style={{ color: '#38bdf8' }}> Rp {(item.price * item.qty).toLocaleString('id-ID')}</strong>
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <button
                    onClick={() => {
                      dispatch(decrementQty(item.id));
                      onActionDispatched('cart/decrementQty', item.id);
                    }}
                    className="action-btn small"
                  >
                    -
                  </button>
                  <span>{item.qty}</span>
                  <button
                    onClick={() => {
                      dispatch(incrementQty(item.id));
                      onActionDispatched('cart/incrementQty', item.id);
                    }}
                    className="action-btn small"
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      dispatch(removeFromCart(item.id));
                      onActionDispatched('cart/removeFromCart', item.id);
                    }}
                    className="delete-icon-btn"
                    title="Hapus barang"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-total-bar">
          <span>Total Belanja:</span>
          <strong className="text-emerald">Rp {totalBelanja.toLocaleString('id-ID')}</strong>
        </div>

        <div className="catalog-adder-row" style={{ marginTop: 12 }}>
          <span>+ Tambah dari Katalog:</span>
          {catalog.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                dispatch(addToCart(cat));
                onActionDispatched('cart/addToCart', cat);
              }}
              className="pill-btn"
            >
              + {cat.name} (Rp {cat.price.toLocaleString('id-ID')})
            </button>
          ))}
          {items.length > 0 && (
            <button
              onClick={() => {
                dispatch(clearCart());
                onActionDispatched('cart/clearCart', null);
              }}
              className="action-btn danger small"
            >
              Kosongkan Keranjang
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function AsyncUsersWidget({ onActionDispatched }) {
  const { list, status, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleFetch = async () => {
    onActionDispatched('users/fetchApiUsers/pending', { amount: 3 });
    const res = await dispatch(fetchApiUsers(3));
    if (fetchApiUsers.fulfilled.match(res)) {
      onActionDispatched('users/fetchApiUsers/fulfilled', res.payload);
    } else {
      onActionDispatched('users/fetchApiUsers/rejected', res.payload);
    }
  };

  return (
    <div className="redux-module-card">
      <div className="module-header">
        <User size={20} className="text-purple" />
        <h4>3. Async Thunk API (Slice: users)</h4>
        <span className={`key-tag ${status === 'loading' ? 'text-cyan' : status === 'succeeded' ? 'text-emerald' : ''}`}>
          Status: {status.toUpperCase()}
        </span>
      </div>

      <div className="module-body">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <p>Memuat data pengguna asinkron dengan <code>createAsyncThunk</code>:</p>
          <button
            onClick={handleFetch}
            disabled={status === 'loading'}
            className="action-btn primary small"
          >
            {status === 'loading' ? (
              <>
                <RefreshCw size={14} className="spin" />
                <span>Memuat API...</span>
              </>
            ) : (
              <span>Panggil API (Thunk)</span>
            )}
          </button>
        </div>

        <div className="users-list-grid">
          {list.map(u => (
            <div key={u.id} className="user-mini-badge">
              <span className="user-avatar-emoji">👨‍💻</span>
              <div>
                <strong>{u.name}</strong>
                <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{u.role} • 📍 {u.city}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   3. KOMPONEN UTAMA REDUX TOOLKIT LAB
   ========================================================================= */

export default function ReduxToolkitLab() {
  const [activeTab, setActiveTab] = useState('demo'); // 'demo' | 'devtools' | 'arch' | 'code' | 'compare'
  const [actionHistory, setActionHistory] = useState([
    {
      id: 1,
      type: '@@INIT',
      payload: null,
      time: 'Inisialisasi',
      stateSnapshot: demoReduxStore.getState()
    }
  ]);
  const [storeStateLive, setStoreStateLive] = useState(demoReduxStore.getState());
  const [timeTravelIndex, setTimeTravelIndex] = useState(null);

  // Subscribe ke store untuk update snapshot state realtime
  useEffect(() => {
    const unsubscribe = demoReduxStore.subscribe(() => {
      setStoreStateLive(demoReduxStore.getState());
    });
    return () => unsubscribe();
  }, []);

  const recordDispatchedAction = (type, payload) => {
    const newSnapshot = JSON.parse(JSON.stringify(demoReduxStore.getState()));
    setActionHistory(prev => [
      {
        id: prev.length + 1,
        type,
        payload,
        time: new Date().toLocaleTimeString(),
        stateSnapshot: newSnapshot
      },
      ...prev.slice(0, 19) // Simpan hingga 20 aksi terakhir
    ]);
  };

  return (
    <Provider store={demoReduxStore}>
      <div className="demo-box redux-lab-master">
        <div className="demo-badge">Materi Lanjutan Redux</div>
        <h3>🗄️ Laboratorium Redux &amp; Redux Toolkit (RTK)</h3>
        <p className="demo-desc">
          Eksplorasi arsitektur state global terpusat (*Single Source of Truth*), 
          dispatch action, reducer Immer, async thunk, dan simulasi <strong>Time-Travel Debugging</strong>:
        </p>

        {/* TAB NAVIGATION */}
        <div className="pill-group lab-tab-group" style={{ marginBottom: 20 }}>
          <button
            onClick={() => setActiveTab('demo')}
            className={`pill-btn ${activeTab === 'demo' ? 'active' : ''}`}
          >
            <Zap size={15} /> 1. Playground Aplikasi Redux
          </button>
          <button
            onClick={() => setActiveTab('devtools')}
            className={`pill-btn ${activeTab === 'devtools' ? 'active' : ''}`}
          >
            <History size={15} /> 2. Redux DevTools &amp; Time Travel
          </button>
          <button
            onClick={() => setActiveTab('arch')}
            className={`pill-btn ${activeTab === 'arch' ? 'active' : ''}`}
          >
            <Layers size={15} /> 3. Diagram Alur Redux
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`pill-btn ${activeTab === 'code' ? 'active' : ''}`}
          >
            <Code2 size={15} /> 4. Kode Store &amp; Slice
          </button>
          <button
            onClick={() => setActiveTab('compare')}
            className={`pill-btn ${activeTab === 'compare' ? 'active' : ''}`}
          >
            <Sparkles size={15} /> 5. Redux vs Context vs Zustand
          </button>
        </div>

        {/* TAB 1: DEMO APLIKASI NYATA */}
        {activeTab === 'demo' && (
          <div className="interactive-card">
            <div className="grid-2-col">
              {/* Kolom Kiri: Modul Interaktif */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <BankWidget onActionDispatched={recordDispatchedAction} />
                <CartWidget onActionDispatched={recordDispatchedAction} />
                <AsyncUsersWidget onActionDispatched={recordDispatchedAction} />
              </div>

              {/* Kolom Kanan: Single Source of Truth Inspector */}
              <div className="state-tree-inspector">
                <div className="inspector-header">
                  <Database size={18} className="text-cyan" />
                  <h4>Central Redux Store (Single State Tree)</h4>
                  <span className="badge-math">Live Synchronized</span>
                </div>
                <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: '8px 0' }}>
                  Seluruh data di samping tersimpan dalam SATU objek store terpusat ini:
                </p>
                <pre className="json-box redux-json-tree">
                  {JSON.stringify(storeStateLive, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DEVTOOLS & TIME-TRAVEL DEBUGGING */}
        {activeTab === 'devtools' && (
          <div className="interactive-card">
            <div className="status-display-row">
              <h4>Simulasi Redux DevTools: Time-Travel Debugging</h4>
              <button
                onClick={() => {
                  setActionHistory([{
                    id: 1,
                    type: '@@INIT',
                    payload: null,
                    time: 'Inisialisasi',
                    stateSnapshot: demoReduxStore.getState()
                  }]);
                  setTimeTravelIndex(null);
                }}
                className="action-btn outline small"
              >
                <RotateCcw size={14} /> Bersihkan Riwayat Aksi
              </button>
            </div>

            <p className="demo-desc" style={{ marginBottom: 12 }}>
              Setiap kali tombol di tab 1 diklik, sebuah <strong>Action</strong> dikirim ke Redux Store. 
              Klik tombol <strong>"Lihat Snapshot State"</strong> pada aksi masa lalu untuk mengamati riwayat perubahan state dari waktu ke waktu:
            </p>

            <div className="devtools-timeline-container">
              <div className="timeline-actions-list">
                <h5>Daftar Action yang Di-dispatch:</h5>
                {actionHistory.map((act, index) => (
                  <div
                    key={act.id}
                    onClick={() => setTimeTravelIndex(index)}
                    className={`timeline-action-card ${timeTravelIndex === index ? 'active-step' : ''}`}
                  >
                    <div className="act-header">
                      <span className="act-badge">#{act.id}</span>
                      <strong className="act-type">{act.type}</strong>
                      <small className="act-time">{act.time}</small>
                    </div>
                    {act.payload !== null && act.payload !== undefined && (
                      <code className="act-payload">
                        payload: {typeof act.payload === 'object' ? JSON.stringify(act.payload) : String(act.payload)}
                      </code>
                    )}
                  </div>
                ))}
              </div>

              <div className="timeline-snapshot-viewer">
                <h5>
                  Snapshot State Redux saat #{actionHistory[timeTravelIndex || 0]?.id} (
                  <strong className="text-cyan">{actionHistory[timeTravelIndex || 0]?.type}</strong>):
                </h5>
                <pre className="json-box">
                  {JSON.stringify(actionHistory[timeTravelIndex || 0]?.stateSnapshot, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DIAGRAM ALUR ARSITEKTUR */}
        {activeTab === 'arch' && (
          <div className="interactive-card">
            <h4>Alur Data Satu Arah Redux (Unidirectional Data Flow)</h4>
            <p className="demo-desc">
              Bagaimana data mengalir saat tombol diklik hingga komponen ter-update:
            </p>

            <div className="redux-arch-flow">
              <div className="flow-step">
                <span className="step-num">1</span>
                <strong>UI View</strong>
                <p>Pengguna mengklik tombol di komponen React.</p>
              </div>
              <ArrowRight className="flow-arrow text-cyan" size={24} />

              <div className="flow-step">
                <span className="step-num">2</span>
                <strong>useDispatch()</strong>
                <p>Mengirimkan objek action ke Store.</p>
              </div>
              <ArrowRight className="flow-arrow text-cyan" size={24} />

              <div className="flow-step">
                <span className="step-num">3</span>
                <strong>Action</strong>
                <p>Deskripsi peristiwa: <code>{`{ type, payload }`}</code></p>
              </div>
              <ArrowRight className="flow-arrow text-cyan" size={24} />

              <div className="flow-step">
                <span className="step-num">4</span>
                <strong>Reducer (Immer)</strong>
                <p>Menghitung state berikutnya secara murni.</p>
              </div>
              <ArrowRight className="flow-arrow text-cyan" size={24} />

              <div className="flow-step">
                <span className="step-num">5</span>
                <strong>Store Terpusat</strong>
                <p>Menyimpan data dan memberi sinyal update.</p>
              </div>
              <ArrowRight className="flow-arrow text-cyan" size={24} />

              <div className="flow-step">
                <span className="step-num">6</span>
                <strong>useSelector()</strong>
                <p>Komponen membaca state baru dan re-render!</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: KODE CONTOH & SETUP */}
        {activeTab === 'code' && (
          <div className="interactive-card">
            <h4>Implementasi Redux Toolkit (RTK) Standar Industri</h4>
            <div className="grid-2-col">
              <CodeViewer
                title="1. src/features/bankSlice.js (createSlice)"
                code={`import { createSlice } from '@reduxjs/toolkit';

export const bankSlice = createSlice({
  name: 'bank',
  initialState: { balance: 1500000, holder: 'Sulaiman Saleh' },
  reducers: {
    deposit: (state, action) => {
      // Immer di RTK membolehkan mutasi langsung:
      state.balance += action.payload;
    },
    withdraw: (state, action) => {
      if (state.balance >= action.payload) {
        state.balance -= action.payload;
      }
    }
  }
});

export const { deposit, withdraw } = bankSlice.actions;
export default bankSlice.reducer;`}
              />

              <CodeViewer
                title="2. src/app/store.js & Komponen Konsumen"
                code={`// STORE (src/app/store.js)
import { configureStore } from '@reduxjs/toolkit';
import bankReducer from '../features/bankSlice';

export const store = configureStore({
  reducer: { bank: bankReducer }
});

// KOMPONEN (src/BankComponent.jsx)
import { useSelector, useDispatch } from 'react-redux';
import { deposit } from './features/bankSlice';

export function BankView() {
  const balance = useSelector(state => state.bank.balance);
  const dispatch = useDispatch();

  return (
    <div>
      <p>Saldo: Rp {balance.toLocaleString()}</p>
      <button onClick={() => dispatch(deposit(50000))}>+ Rp 50.000</button>
    </div>
  );
}`}
              />
            </div>
          </div>
        )}

        {/* TAB 5: PERBANDINGAN REDUX VS CONTEXT VS ZUSTAND */}
        {activeTab === 'compare' && (
          <div className="interactive-card">
            <h4>Kapan Menggunakan Redux vs Context API vs Zustand?</h4>
            
            <div className="table-responsive-wrapper">
              <table className="memo-matrix-table">
                <thead>
                  <tr>
                    <th>Kriteria</th>
                    <th>useState Lokal</th>
                    <th>Context API</th>
                    <th>Redux Toolkit (RTK)</th>
                    <th>Zustand</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Cakupan State</strong></td>
                    <td>Satu komponen &amp; anak terdekat</td>
                    <td>State global sederhana (Tema, Auth)</td>
                    <td>Skala besar enterprise kompleks</td>
                    <td>Skala menengah - besar</td>
                  </tr>
                  <tr>
                    <td><strong>Performa Render</strong></td>
                    <td>Sangat cepat &amp; terisolasi</td>
                    <td>Bisa memicu re-render seluruh consumer</td>
                    <td>Sangat optimal berkat selector murni</td>
                    <td>Sangat optimal &amp; selektor bawaan</td>
                  </tr>
                  <tr>
                    <td><strong>Time-Travel Debug</strong></td>
                    <td>❌ Tidak ada</td>
                    <td>❌ Tidak ada</td>
                    <td>✅ Redux DevTools Sangat Kuat</td>
                    <td>✅ Mendukung Redux DevTools</td>
                  </tr>
                  <tr>
                    <td><strong>Boilerplate Setup</strong></td>
                    <td>Nol (0)</td>
                    <td>Rendah (createContext + Provider)</td>
                    <td>Sedang (configureStore + createSlice)</td>
                    <td>Sangat Rendah (create store langsung)</td>
                  </tr>
                  <tr>
                    <td><strong>Rekomendasi Terbaik</strong></td>
                    <td>Form input, tab lokal, accordion</td>
                    <td>User profile, preferensi bahasa, tema</td>
                    <td>E-Commerce checkout, sistem ERP, Multi-dashboard</td>
                    <td>Aplikasi modern cepat tanpa Provider wrapper</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Provider>
  );
}
