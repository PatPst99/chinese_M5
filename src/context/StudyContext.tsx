import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { SectionId } from '../types';
import { speakChinese } from '../utils/speech';
import { VOCAB_LIST } from '../data/vocabData';

interface StudyContextValue {
  activeSection: SectionId;
  setActiveSection: (s: SectionId) => void;
  hidePinyin: boolean;
  toggleHidePinyin: () => void;
  hideThai: boolean;
  toggleHideThai: () => void;
  speechRate: 1.0 | 0.7;
  toggleSpeechRate: () => void;
  focusMode: boolean;
  toggleFocusMode: () => void;
  speak: (text: string) => void;
  masteredIds: Set<string>;
  toggleMastered: (id: string) => void;
  markMastered: (id: string, value: boolean) => void;
  masteryPercent: number;
  masteredCount: number;
  totalVocabCount: number;
  studioChar: string;
  openInStudio: (char: string) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
}

const STORAGE_MASTERY_KEY = 'chinese_pastel_mastered_v1';
const STORAGE_PREFS_KEY = 'chinese_pastel_prefs_v1';

const StudyContext = createContext<StudyContextValue | null>(null);

export const StudyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSection, setActiveSectionState] = useState<SectionId>('overview');
  const [hidePinyin, setHidePinyin] = useState(false);
  const [hideThai, setHideThai] = useState(false);
  const [speechRate, setSpeechRate] = useState<1.0 | 0.7>(1.0);
  const [focusMode, setFocusMode] = useState(false);
  const [studioChar, setStudioChar] = useState('你');
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const [masteredIds, setMasteredIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_MASTERY_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return new Set(parsed);
      }
    } catch {
      // ignore storage errors
    }
    return new Set<string>();
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_PREFS_KEY);
      if (saved) {
        const p = JSON.parse(saved);
        if (typeof p.focusMode === 'boolean') setFocusMode(p.focusMode);
        if (p.speechRate === 0.7 || p.speechRate === 1.0) setSpeechRate(p.speechRate);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_MASTERY_KEY, JSON.stringify(Array.from(masteredIds)));
    } catch {
      // ignore
    }
  }, [masteredIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PREFS_KEY, JSON.stringify({ focusMode, speechRate }));
    } catch {
      // ignore
    }
  }, [focusMode, speechRate]);

  // Keyboard shortcut Ctrl/Cmd + K for instant search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setSearchOpen(false);
        setMobileNavOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [activeSection]);

  const setActiveSection = useCallback((section: SectionId) => {
    setActiveSectionState(section);
    setMobileNavOpen(false);
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  const speak = useCallback(
    (text: string) => {
      speakChinese(text, speechRate);
    },
    [speechRate]
  );

  const toggleMastered = useCallback((id: string) => {
    setMasteredIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const markMastered = useCallback((id: string, value: boolean) => {
    setMasteredIds((prev) => {
      const next = new Set(prev);
      if (value) next.add(id);
      else next.delete(id);
      return next;
    });
  }, []);

  const openInStudio = useCallback((char: string) => {
    const firstHanzi = char.match(/[\u4e00-\u9fff]/)?.[0];
    if (firstHanzi) {
      setStudioChar(firstHanzi);
      setActiveSectionState('studio');
      setMobileNavOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const totalVocabCount = VOCAB_LIST.length;
  const masteredCount = VOCAB_LIST.filter((v) => masteredIds.has(v.id)).length;
  const masteryPercent = totalVocabCount > 0 ? Math.round((masteredCount / totalVocabCount) * 100) : 0;

  return (
    <StudyContext.Provider
      value={{
        activeSection,
        setActiveSection,
        hidePinyin,
        toggleHidePinyin: () => setHidePinyin((v) => !v),
        hideThai,
        toggleHideThai: () => setHideThai((v) => !v),
        speechRate,
        toggleSpeechRate: () => setSpeechRate((r) => (r === 1.0 ? 0.7 : 1.0)),
        focusMode,
        toggleFocusMode: () => setFocusMode((f) => !f),
        speak,
        masteredIds,
        toggleMastered,
        markMastered,
        masteryPercent,
        masteredCount,
        totalVocabCount,
        studioChar,
        openInStudio,
        searchOpen,
        setSearchOpen,
        mobileNavOpen,
        setMobileNavOpen,
      }}
    >
      {children}
    </StudyContext.Provider>
  );
};

export function useStudy(): StudyContextValue {
  const ctx = useContext(StudyContext);
  if (!ctx) throw new Error('useStudy must be used within StudyProvider');
  return ctx;
}
