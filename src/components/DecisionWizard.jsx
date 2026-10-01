import React, { useState } from 'react';
import { HelpCircle, CheckCircle, ArrowRight, RotateCcw, Lightbulb, Code } from 'lucide-react';

/**
 * DecisionWizard.jsx
 * Peta Keputusan Sehari-hari (Slide 47)
 * Wizard interaktif untuk mendiagnosis hook atau pola apa yang tepat untuk kasus Anda.
 */
export default function DecisionWizard() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});

  const handleAnswer = (questionKey, answerValue, nextStep) => {
    setAnswers(prev => ({ ...prev, [questionKey]: answerValue }));
    setStep(nextStep);
  };

  const resetWizard = () => {
    setStep(1);
    setAnswers({});
  };

  return (
    <div className="decision-wizard-container">
      <div className="wizard-header">
        <HelpCircle size={24} className="text-cyan" />
        <div>
          <h3>Peta Keputusan Sehari-hari (Slide 47)</h3>
          <p>Jawab beberapa pertanyaan singkat untuk menemukan Hook atau pola React yang paling tepat:</p>
        </div>
        <button onClick={resetWizard} className="action-btn outline small" title="Mulai ulang">
          <RotateCcw size={14} /> Reset
        </button>
      </div>

      <div className="wizard-body">
        {step === 1 && (
          <div className="wizard-step-card">
            <h4>Pertanyaan 1:</h4>
            <h3>Apakah perubahan data ini harus mengubah tampilan antarmuka (UI)?</h3>
            <div className="wizard-choices">
              <button
                onClick={() => handleAnswer('affectsUI', true, 2)}
                className="choice-btn"
              >
                <span>Ya, tampilan di layar harus diperbarui ketika data ini berubah.</span>
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => handleAnswer('affectsUI', false, 'result_ref')}
                className="choice-btn"
              >
                <span>Tidak, data hanya memori internal (misal ID timer, instance objek DOM).</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="wizard-step-card">
            <h4>Pertanyaan 2:</h4>
            <h3>Apakah nilai ini bisa dihitung langsung dari state atau props yang sudah ada?</h3>
            <p className="wizard-hint">
              Contoh: total harga keranjang dari daftar barang, atau jumlah tugas aktif dari daftar tugas.
            </p>
            <div className="wizard-choices">
              <button
                onClick={() => handleAnswer('isDerived', true, 'result_derived')}
                className="choice-btn"
              >
                <span>Ya, nilainya bisa dikalkulasi dari variabel yang sudah ada.</span>
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => handleAnswer('isDerived', false, 3)}
                className="choice-btn"
              >
                <span>Tidak, ini adalah data mentah baru dari interaksi pengguna / API.</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="wizard-step-card">
            <h4>Pertanyaan 3:</h4>
            <h3>Apakah banyak komponen di tingkatan hierarki yang berbeda membutuhkan data ini?</h3>
            <div className="wizard-choices">
              <button
                onClick={() => handleAnswer('isGlobal', true, 'result_context')}
                className="choice-btn"
              >
                <span>Ya, banyak turunan di berbagai folder butuh nilai ini (misal tema, auth login).</span>
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => handleAnswer('isGlobal', false, 4)}
                className="choice-btn"
              >
                <span>Tidak, hanya komponen ini dan anak terdekatnya saja.</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="wizard-step-card">
            <h4>Pertanyaan 4:</h4>
            <h3>Apakah logika transisi state memiliki banyak aksi rumit / saling terkait?</h3>
            <div className="wizard-choices">
              <button
                onClick={() => handleAnswer('isComplex', true, 'result_reducer')}
                className="choice-btn"
              >
                <span>Ya, ada banyak event (tambah, edit, diskon, batal, rollback status).</span>
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => handleAnswer('isComplex', false, 'result_state')}
                className="choice-btn"
              >
                <span>Sederhana, cukup nilai tunggal atau form biasa.</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* REKOMENDASI HASIL */}
        {step === 'result_ref' && (
          <div className="wizard-result-card">
            <div className="result-badge">Rekomendasi</div>
            <h3>Gunakan <code>useRef</code></h3>
            <p>
              Karena data Anda tidak boleh memicu render ulang saat nilainya berubah, 
              <code>useRef</code> adalah wadah sempurna untuk menyimpan referensi DOM atau ID interval.
            </p>
            <pre className="code-snippet-small">
              <code>{`const timerRef = useRef(null);\nconst inputRef = useRef(null);`}</code>
            </pre>
            <button onClick={resetWizard} className="action-btn primary small">Cari Kebutuhan Lain</button>
          </div>
        )}

        {step === 'result_derived' && (
          <div className="wizard-result-card">
            <div className="result-badge">Rekomendasi</div>
            <h3>Hitung Langsung Saat Render (Derived State)!</h3>
            <p>
              <strong>Jangan gunakan useState atau useEffect!</strong> Menghitung nilai langsung saat fungsi komponen dipanggil 
              menghindarkan Anda dari bug desinkronisasi dan render ganda. Jika perhitungannya sangat berat, bungkus dengan <code>useMemo</code>.
            </p>
            <pre className="code-snippet-small">
              <code>{`// Dihitung langsung saat render:\nconst activeCount = tasks.filter(t => !t.done).length;\nconst totalPrice = cart.reduce((acc, item) => acc + item.price, 0);`}</code>
            </pre>
            <button onClick={resetWizard} className="action-btn primary small">Cari Kebutuhan Lain</button>
          </div>
        )}

        {step === 'result_context' && (
          <div className="wizard-result-card">
            <div className="result-badge">Rekomendasi</div>
            <h3>Gunakan <code>createContext</code> &amp; <code>useContext</code></h3>
            <p>
              Hindari <em>prop drilling</em> melalui banyak tingkat komponen. Bungkus induk dengan <code>Context.Provider</code> 
              dan baca di komponen anak mana pun dengan <code>useContext</code>.
            </p>
            <pre className="code-snippet-small">
              <code>{`const ThemeContext = createContext("dark");\n\n// Di child:\nconst theme = useContext(ThemeContext);`}</code>
            </pre>
            <button onClick={resetWizard} className="action-btn primary small">Cari Kebutuhan Lain</button>
          </div>
        )}

        {step === 'result_reducer' && (
          <div className="wizard-result-card">
            <div className="result-badge">Rekomendasi</div>
            <h3>Gunakan <code>useReducer</code></h3>
            <p>
              Ketika transisi state memiliki banyak cabang (state machine), <code>useReducer</code> memisahkan logika pembaruan ke fungsi 
              terpusat sehingga lebih mudah diuji (*unit test*) dan dibaca.
            </p>
            <pre className="code-snippet-small">
              <code>{`const [state, dispatch] = useReducer(cartReducer, initialCart);\ndispatch({ type: 'ADD_ITEM', item });`}</code>
            </pre>
            <button onClick={resetWizard} className="action-btn primary small">Cari Kebutuhan Lain</button>
          </div>
        )}

        {step === 'result_state' && (
          <div className="wizard-result-card">
            <div className="result-badge">Rekomendasi</div>
            <h3>Gunakan <code>useState</code></h3>
            <p>
              Ini adalah fondasi utama React untuk nilai data lokal komponen yang perubahannya langsung memicu antarmuka diperbarui.
            </p>
            <pre className="code-snippet-small">
              <code>{`const [isOpen, setIsOpen] = useState(false);\nconst [text, setText] = useState("");`}</code>
            </pre>
            <button onClick={resetWizard} className="action-btn primary small">Cari Kebutuhan Lain</button>
          </div>
        )}
      </div>
    </div>
  );
}
