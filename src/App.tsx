import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { StudyProvider, useStudy } from './context/StudyContext';
import { PastelBackground } from './components/layout/PastelBackground';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { SearchModal } from './components/common/SearchModal';
import { OverviewSection } from './components/sections/OverviewSection';
import { PinyinSection } from './components/sections/PinyinSection';
import { RulesSection } from './components/sections/RulesSection';
import { HanziSection } from './components/sections/HanziSection';
import { NumbersSection } from './components/sections/NumbersSection';
import { VocabSection } from './components/sections/VocabSection';
import { LessonSection } from './components/sections/LessonSection';
import { CultureSection } from './components/sections/CultureSection';
import { FlashcardSection } from './components/sections/FlashcardSection';
import { HanziStudioSection } from './components/sections/HanziStudioSection';
import { QuizArenaSection } from './components/sections/QuizArenaSection';

const MainShell: React.FC = () => {
  const { activeSection } = useStudy();

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection />;
      case 'pinyin':
        return <PinyinSection />;
      case 'rules':
        return <RulesSection />;
      case 'hanzi':
        return <HanziSection />;
      case 'numbers':
        return <NumbersSection />;
      case 'vocab':
        return <VocabSection />;
      case 'lesson':
        return <LessonSection />;
      case 'culture':
        return <CultureSection />;
      case 'flashcards':
        return <FlashcardSection />;
      case 'studio':
        return <HanziStudioSection />;
      case 'quiz':
        return <QuizArenaSection />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className="paper-texture relative min-h-screen text-[#2F3640]">
      <PastelBackground />
      <SearchModal />

      <div className="relative z-10 flex min-h-screen">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar />

          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 pb-20 md:px-7 md:py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {renderSection()}
              </motion.div>
            </AnimatePresence>
          </main>

          <footer className="border-t border-[#88B3A2]/20 bg-[#FAF6F0]/75 py-4 text-center text-xs text-[#636E72]">
            汉语复习笔记 · เนื้อหาครบ 100% จากหนังสือ Chinese XP (体验汉语), สไลด์การสอน และสมุดจดสรุป
          </footer>
        </div>
      </div>
    </div>
  );
};

export function App() {
  return (
    <StudyProvider>
      <MainShell />
    </StudyProvider>
  );
}

export default App;
