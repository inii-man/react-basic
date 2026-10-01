import React, { useState } from 'react';
import { Copy, Check, Code2 } from 'lucide-react';

/**
 * CodeViewer
 * Komponen untuk menampilkan blok kode dengan penyorotan rapi,
 * nomor baris, tombol salin ke clipboard, dan label bahasa.
 */
export default function CodeViewer({ code, language = 'jsx', title = 'Contoh Kode' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Gagal menyalin:', err);
    }
  };

  const lines = code.trim().split('\n');

  return (
    <div className="code-viewer-card">
      <div className="code-viewer-header">
        <div className="code-viewer-title">
          <Code2 size={16} className="text-cyan" />
          <span>{title}</span>
          <span className="code-badge">{language.toUpperCase()}</span>
        </div>
        <button
          onClick={handleCopy}
          className={`copy-btn ${copied ? 'copied' : ''}`}
          title="Salin kode ke papan klip"
        >
          {copied ? (
            <>
              <Check size={14} />
              <span>Tersalin!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Salin</span>
            </>
          )}
        </button>
      </div>

      <div className="code-scroll-container">
        <pre className="code-pre">
          <code>
            {lines.map((line, idx) => (
              <div key={idx} className="code-line">
                <span className="line-number">{idx + 1}</span>
                <span className="line-content">{line || ' '}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
