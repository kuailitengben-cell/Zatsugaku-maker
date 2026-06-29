import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, Info, Sparkles } from 'lucide-react';

interface Trivia {
  title: string;
  detail: string;
}

export default function TriviaDisplay() {
  const [trivia, setTrivia] = useState<Trivia | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchTrivia = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch('/api/fact');
      const data = await response.json();
      setTrivia(data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrivia();
  }, []);

  return (
    <div className="min-h-screen border-8 border-[#1A1A1A] flex flex-col items-center justify-between p-8 md:p-12 overflow-hidden relative">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center gap-4"
          >
            <RefreshCw className="w-10 h-10 animate-spin text-gray-200" />
            <p className="text-[10px] tracking-[0.4em] uppercase font-black">Archive Loading...</p>
          </motion.div>
        ) : error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col items-center justify-center text-center"
          >
            <h2 className="text-2xl font-bold mb-4 border-y-2 border-[#1A1A1A] py-4">SYSTEM ERROR</h2>
            <button
              onClick={fetchTrivia}
              className="px-10 py-4 bg-[#1A1A1A] text-white text-[10px] tracking-[0.3em] uppercase hover:bg-gray-800 transition-colors"
            >
              Retry Access
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col items-center justify-between w-full"
          >
            {/* Header */}
            <header className="w-full flex justify-between items-center border-b-2 border-[#1A1A1A] pb-6">
              <div className="text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] uppercase font-black">Archive No. {Math.floor(Math.random() * 999)}</div>
              <div className="hidden md:block text-xs tracking-[0.4em] uppercase font-black">Daily Insights</div>
              <div className="text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] uppercase font-black">Vol. {new Date().getFullYear()}</div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center relative w-full overflow-hidden">
              {/* Concentric Circles Background */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] border border-[#EEEEEE] rounded-full -z-10 animate-pulse"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[225px] h-[225px] md:w-[450px] md:h-[450px] border border-[#E0E0E0] rounded-full -z-10"></div>

              <div className="text-center max-w-4xl px-4 md:px-8 z-10 w-full">
                <motion.div 
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="mb-8 md:mb-12 inline-block px-4 py-1 bg-[#1A1A1A] text-white text-[9px] md:text-[10px] tracking-[0.5em] uppercase"
                >
                  Trivia Entry
                </motion.div>

                <motion.h1
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-3xl md:text-5xl lg:text-7xl font-black leading-tight tracking-tighter border-y-2 border-[#1A1A1A] py-6 md:py-10 mb-8 md:mb-10 text-balance"
                >
                  {trivia?.title}
                </motion.h1>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-lg md:text-xl lg:text-2xl leading-relaxed text-[#4A4A4A] max-w-2xl mx-auto font-light"
                >
                  {trivia?.detail}
                </motion.p>
              </div>
            </main>

            {/* Footer */}
            <footer className="w-full flex flex-col items-center gap-6 md:gap-8 border-t-2 border-[#1A1A1A] pt-8">
              <div className="flex gap-8 md:gap-24 overflow-x-auto w-full justify-center md:overflow-visible pb-2 md:pb-0">
                <div className="text-center whitespace-nowrap">
                  <span className="block text-[8px] md:text-[10px] uppercase tracking-widest text-[#999999] mb-1">Source</span>
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-tighter">AI Knowledge Base</span>
                </div>
                <div className="text-center whitespace-nowrap">
                  <span className="block text-[8px] md:text-[10px] uppercase tracking-widest text-[#999999] mb-1">Status</span>
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-tighter">Verified Stream</span>
                </div>
                <div className="text-center whitespace-nowrap">
                  <span className="block text-[8px] md:text-[10px] uppercase tracking-widest text-[#999999] mb-1">Category</span>
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-tighter">General Facts</span>
                </div>
              </div>

              <div className="w-full flex justify-between items-end">
                <div className="hidden sm:block w-16 md:w-32 h-[1px] bg-[#1A1A1A] mb-5"></div>
                <button
                  onClick={fetchTrivia}
                  className="group relative flex items-center justify-center px-8 md:px-12 py-4 md:py-5 bg-[#1A1A1A] text-white text-[10px] md:text-xs tracking-[0.3em] uppercase hover:bg-[#333333] transition-all overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : 'group-hover:rotate-180'} transition-transform duration-500`} />
                    Next Trivia
                  </span>
                </button>
                <div className="hidden sm:block w-16 md:w-32 h-[1px] bg-[#1A1A1A] mb-5"></div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
