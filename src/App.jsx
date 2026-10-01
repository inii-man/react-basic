import React, { useState, useEffect } from 'react';
import {
  BookOpen, Moon, Sun, ChevronLeft, ChevronRight, Search, Play,
  HelpCircle, AlertOctagon, CheckCircle2, ListTodo, ExternalLink,
  Code2, Sparkles, Layers, RefreshCw, Cpu, Database
} from 'lucide-react';

import { CHAPTERS, SLIDES_DATA } from './data/slidesData';
import CodeViewer from './components/CodeViewer';

// Chapter Demo Components
import Chapter1Basics from './components/Chapter1Basics';
import Chapter2Components from './components/Chapter2Components';
import Chapter3State from './components/Chapter3State';
import Chapter4Hooks from './components/Chapter4Hooks';
import Chapter5Advanced from './components/Chapter5Advanced';
import Chapter6Project from './components/Chapter6Project';

// Standalone Interactive Modules
import DecisionWizard from './components/DecisionWizard';
import CommonMistakesSandbox from './components/CommonMistakesSandbox';
import DocsViewerModal from './components/DocsViewerModal';
import SlideDemoContainer from './components/SlideDemoContainer';
import ReduxToolkitLab from './components/ReduxToolkitLab';

/**
 * App.jsx
 * Komponen Utama Web Playground React Indonesia
 * Mendukung navigasi 48 slide, 6 bab, dark/light mode, dan modal dokumentasi.
 */
export default function App() {
  // Slide & Chapter Navigation
  const [currentSlideNum, setCurrentSlideNum] = useState(1);
  const [activeTab, setActiveTab] = useState('slide'); // 'slide' | 'wizard' | 'mistakes' | 'project'
  const [theme, setTheme] = useState('dark');
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Progress tracker
  const [completedSlides, setCompletedSlides] = useState(() => {
    try {
      const saved = localStorage.getItem('react_lab_completed_slides');
      return saved ? JSON.parse(saved) : [1];
    } catch {
      return [1];
    }
  });

  // Apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Save progress
  useEffect(() => {
    localStorage.setItem('react_lab_completed_slides', JSON.stringify(completedSlides));
  }, [completedSlides]);

  // Current Slide Object
  const currentSlide = SLIDES_DATA.find(s => s.slideNumber === currentSlideNum) || SLIDES_DATA[0];
  const currentChapter = CHAPTERS.find(c => c.id === currentSlide.chapterId) || CHAPTERS[0];

  // Mark current slide as completed
  const toggleSlideCompleted = (num) => {
    setCompletedSlides(prev =>
      prev.includes(num) ? prev.filter(n => n !== num) : [...prev, num]
    );
  };

  // Keyboard navigation (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight' && currentSlideNum < 48) {
        setCurrentSlideNum(prev => prev + 1);
        setActiveTab('slide');
      } else if (e.key === 'ArrowLeft' && currentSlideNum > 1) {
        setCurrentSlideNum(prev => prev - 1);
        setActiveTab('slide');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideNum]);

  // Filter slides by search
  const filteredSlideOptions = SLIDES_DATA.filter(s =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    String(s.slideNumber) === searchQuery
  );

  return (
    <div className="app-container">
      {/* 1. TOP HEADER */}
      <header className="top-header">
        <div className="header-content">
          <div className="brand-section">
            <div className="brand-logo-icon">⚛️</div>
            <div className="brand-title-group">
              <h1>
                <span className="gradient-text">React Indonesia</span> Playground
              </h1>
              <span className="brand-badge">Berdasarkan Slide: Memahami React</span>
            </div>
          </div>

          <div className="header-actions">
            {/* Quick Slide Search / Select */}
            <div className="slide-quick-jump">
              <Search size={14} className="text-muted" />
              <select
                value={currentSlideNum}
                onChange={e => {
                  setCurrentSlideNum(Number(e.target.value));
                  setActiveTab('slide');
                }}
                className="slide-select"
                aria-label="Pilih Slide"
              >
                {SLIDES_DATA.map(s => (
                  <option key={s.slideNumber} value={s.slideNumber}>
                    Slide {s.slideNumber}: {s.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Buka Docs Modal */}
            <button
              onClick={() => setIsDocsOpen(true)}
              className="action-btn outline"
              title="Buka panduan Markdown lengkap di folder docs/"
            >
              <BookOpen size={16} className="text-cyan" />
              <span>Buka Dokumentasi (docs/)</span>
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
              className="theme-toggle-btn"
              title={`Beralih ke mode ${theme === 'dark' ? 'terang' : 'gelap'}`}
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          </div>
        </div>
      </header>

      {/* 2. CHAPTER & FEATURE NAVIGATION RIBBON */}
      <nav className="chapter-nav-ribbon">
        <div className="chapter-nav-inner">
          {CHAPTERS.map(ch => (
            <button
              key={ch.id}
              onClick={() => {
                setCurrentSlideNum(ch.slides[0]);
                setActiveTab('slide');
              }}
              className={`chapter-pill-btn ${currentChapter.id === ch.id && activeTab === 'slide' ? 'active' : ''}`}
            >
              <span>{ch.title}</span>
            </button>
          ))}

          {/* Quick Tab: Memoization Lab (Slide 30) */}
          <button
            onClick={() => {
              setCurrentSlideNum(30);
              setActiveTab('slide');
            }}
            className={`chapter-pill-btn ${currentSlideNum === 30 && activeTab === 'slide' ? 'active' : ''}`}
          >
            <Cpu size={15} className="text-cyan" />
            <span>⚡ Lab Memoization (Slide 30)</span>
          </button>

          {/* Quick Tab: Redux Toolkit Lab */}
          <button
            onClick={() => setActiveTab('redux')}
            className={`chapter-pill-btn ${activeTab === 'redux' ? 'active' : ''}`}
          >
            <Database size={15} className="text-purple" />
            <span>⚡ Redux Toolkit Lab</span>
          </button>

          {/* Quick Tab: Peta Keputusan (Slide 47) */}
          <button
            onClick={() => setActiveTab('wizard')}
            className={`chapter-pill-btn ${activeTab === 'wizard' ? 'active' : ''}`}
          >
            <HelpCircle size={15} className="text-cyan" />
            <span>Peta Keputusan (Slide 47)</span>
          </button>

          {/* Quick Tab: Sandbox Bug (Slide 45) */}
          <button
            onClick={() => setActiveTab('mistakes')}
            className={`chapter-pill-btn ${activeTab === 'mistakes' ? 'active' : ''}`}
          >
            <AlertOctagon size={15} className="text-rose" />
            <span>Sandbox 6 Bug Fatal (Slide 45)</span>
          </button>

          {/* Quick Tab: Todo App (Slide 41-44) */}
          <button
            onClick={() => setActiveTab('project')}
            className={`chapter-pill-btn ${activeTab === 'project' ? 'active' : ''}`}
          >
            <ListTodo size={15} className="text-emerald" />
            <span>Proyek Todo App (Slide 41-44)</span>
          </button>
        </div>
      </nav>

      {/* 3. MAIN CONTENT STAGE */}
      <main className="main-stage">
        {/* VIEW: SLIDE PLAYGROUND */}
        {activeTab === 'slide' && (
          <div>
            {/* Slide Navigation Banner */}
            <div className="slide-banner">
              <div>
                <div className="slide-badge-row">
                  <span className="slide-number-pill">Slide {currentSlide.slideNumber} / 48</span>
                  <span className="slide-chapter-tag">{currentChapter.title}</span>
                  <button
                    onClick={() => toggleSlideCompleted(currentSlide.slideNumber)}
                    className="action-btn small outline"
                    style={{ marginLeft: 8 }}
                  >
                    <CheckCircle2
                      size={14}
                      className={completedSlides.includes(currentSlide.slideNumber) ? 'text-emerald' : 'text-muted'}
                    />
                    <span>
                      {completedSlides.includes(currentSlide.slideNumber) ? 'Sudah Dipelajari' : 'Tandai Selesai'}
                    </span>
                  </button>
                </div>
                <h2>{currentSlide.title}</h2>
                <p className="slide-subtitle">{currentSlide.subtitle}</p>
              </div>

              <div className="slide-nav-arrows">
                <button
                  onClick={() => setCurrentSlideNum(n => Math.max(1, n - 1))}
                  disabled={currentSlideNum === 1}
                  className="action-btn outline small"
                  title="Slide sebelumnya (Tombol panah kiri)"
                >
                  <ChevronLeft size={16} /> Sebelumnya
                </button>
                <button
                  onClick={() => setCurrentSlideNum(n => Math.min(48, n + 1))}
                  disabled={currentSlideNum === 48}
                  className="action-btn primary small"
                  title="Slide berikutnya (Tombol panah kanan)"
                >
                  Selanjutnya <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Split Screen: Code & Theory (Left) vs Interactive Demo (Right) */}
            <div className="stage-grid">
              {/* Kolom Kiri: Kode & Penjelasan */}
              <div className="theory-column">
                <CodeViewer
                  title={`Kode Contoh Slide ${currentSlide.slideNumber}: ${currentSlide.title}`}
                  code={currentSlide.code}
                />

                <div className="theory-card">
                  <h4>
                    <Sparkles size={18} />
                    Konsep &amp; Mental Model
                  </h4>
                  <p>{currentSlide.summary}</p>

                  {currentSlide.pitfall && (
                    <div className="pitfall-alert">
                      <AlertOctagon size={20} className="text-amber" />
                      <div>
                        <strong>Awas Jebakan Pemula:</strong>
                        <p>{currentSlide.pitfall}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Kolom Kanan: Demo Interaktif Khusus per Setiap Slide */}
              <div className="demo-column">
                <SlideDemoContainer
                  slideNumber={currentSlideNum}
                  onSelectSlide={(num) => setCurrentSlideNum(num)}
                />
              </div>
            </div>
          </div>
        )}

        {/* VIEW: PETA KEPUTUSAN WIZARD (Slide 47) */}
        {activeTab === 'wizard' && (
          <div>
            <DecisionWizard />
          </div>
        )}

        {/* VIEW: 6 BUG FATAL SANDBOX (Slide 45) */}
        {activeTab === 'mistakes' && (
          <div>
            <CommonMistakesSandbox />
          </div>
        )}

        {/* VIEW: TODO APP PROJECT (Slide 41-44) */}
        {activeTab === 'project' && (
          <div>
            <Chapter6Project />
          </div>
        )}

        {/* VIEW: REDUX TOOLKIT LAB */}
        {activeTab === 'redux' && (
          <div>
            <ReduxToolkitLab />
          </div>
        )}
      </main>

      {/* 4. FOOTER */}
      <footer className="app-footer">
        <p>
          React Indonesia Playground &amp; Panduan Belajar Interaktif • 
          Dipersiapkan untuk pembelajaran komprehensif konsep React • 
          Progres: {completedSlides.length} / 48 Slide Selesai
        </p>
      </footer>

      {/* 5. MODAL DOKUMENTASI (docs/) */}
      <DocsViewerModal
        isOpen={isDocsOpen}
        onClose={() => setIsDocsOpen(false)}
      />
    </div>
  );
}
