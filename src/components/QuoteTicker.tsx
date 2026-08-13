import React, { useState, useEffect } from 'react';
import { NOSTALGiC_QUOTES } from '../data/mockData';
import { Volume2, ChevronLeft, ChevronRight, MessageSquareQuote } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export const QuoteTicker: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const currentQuote = NOSTALGiC_QUOTES[currentIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIndex((idx) => (idx + 1) % NOSTALGiC_QUOTES.length);
          return 0;
        }
        return prev + 2; // 50 * 100ms = 5000ms
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % NOSTALGiC_QUOTES.length);
    setProgress(0);
    soundEngine.playWhistle();
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + NOSTALGiC_QUOTES.length) % NOSTALGiC_QUOTES.length);
    setProgress(0);
    soundEngine.playWhistle();
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto my-2 px-4 z-20">
      <div className="bg-stone-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl overflow-hidden relative group">
        
        {/* Top Ticker Header */}
        <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <MessageSquareQuote className="w-4 h-4 text-orange-400" />
            <span className="text-orange-400 font-bold text-[10px] uppercase tracking-[0.3em] font-mono">
              Highway Radio & Nostalgia
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-orange-900/40 text-orange-300 border border-orange-500/30 text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              {currentQuote.speaker}
            </span>

            <button
              onClick={() => soundEngine.playWhistle()}
              className="p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-orange-300 transition-all border border-white/10"
              title="Shout Out Loud"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Main Quote Content */}
        <div className="min-h-[70px] flex flex-col justify-center">
          <p className="text-lg sm:text-xl font-bold text-stone-100 font-serif leading-snug tracking-wide italic">
            "{currentQuote.phrase}"
          </p>
          
          {currentQuote.transliteration && (
            <p className="text-xs text-orange-200/80 font-mono italic mt-1">
              "{currentQuote.transliteration}"
            </p>
          )}

          <p className="text-xs text-stone-400 mt-1">
            {currentQuote.translation}
          </p>
        </div>

        {/* Navigation & Progress Bar */}
        <div className="mt-3 flex items-center justify-between gap-3 pt-2 border-t border-white/10">
          <button
            onClick={handlePrev}
            className="p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 border border-white/10 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Progress Bar */}
          <div className="flex-1 h-1.5 bg-stone-950 rounded-full overflow-hidden border border-stone-800">
            <div
              className="h-full bg-gradient-to-r from-orange-600 to-orange-400 transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <button
            onClick={handleNext}
            className="p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 border border-white/10 transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
