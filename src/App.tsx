import React, { useState } from 'react';
import { HighwayCanvas } from './components/HighwayCanvas';
import { Dashboard } from './components/Dashboard';
import { QuoteTicker } from './components/QuoteTicker';
import { MusicPlayer } from './components/MusicPlayer';
import { TicketGenerator } from './components/TicketGenerator';
import { MemoriesDrawer } from './components/MemoriesDrawer';
import { TimeOfDay } from './types';
import { soundEngine } from './utils/soundEngine';
import { Bus, Wind, Sparkles } from 'lucide-react';

const PASSENGER_SHOUTS = [
  "Aage cholo, Aage cholo! Bhitore sob khali!",
  "Baah! Shundor Air Horn dilyen dada!",
  "Barasat ashbe koto khon-e?",
  "Eto spid-e chalachho keno dada!",
  "Kisku Express-e uthechhi, time-e pouchhe jabo!",
  "Chhoto bhai, kaanch-ta ektu naamao!"
];

export default function App() {
  const [speed, setSpeed] = useState<number>(45); // Default 45 km/h cruising speed
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('golden');
  const [isRaining, setIsRaining] = useState<boolean>(false);
  const [isWiperActive, setIsWiperActive] = useState<boolean>(false);
  const [isHornBlowing, setIsHornBlowing] = useState<boolean>(false);
  const [hornCount, setHornCount] = useState<number>(0);

  // Modals
  const [isTicketModalOpen, setIsTicketModalOpen] = useState<boolean>(false);
  const [isMemoriesModalOpen, setIsMemoriesModalOpen] = useState<boolean>(false);

  // Floating passenger shout
  const [currentShout, setCurrentShout] = useState<string | null>(null);

  const handleHornClick = () => {
    setIsHornBlowing(true);
    setHornCount((prev) => prev + 1);

    // Random passenger reaction shout
    const randomShout = PASSENGER_SHOUTS[Math.floor(Math.random() * PASSENGER_SHOUTS.length)];
    setCurrentShout(randomShout);

    setTimeout(() => {
      setIsHornBlowing(false);
    }, 600);

    setTimeout(() => {
      setCurrentShout(null);
    }, 3500);
  };

  return (
    <main className="relative w-full min-h-screen bg-immersive-radial bg-dust-pattern font-sans select-none text-stone-100 flex flex-col justify-between selection:bg-orange-500/30 overflow-x-hidden overflow-y-auto pb-32 sm:pb-36">
      
      {/* 1. Highway Canvas Background */}
      <HighwayCanvas
        speed={speed}
        timeOfDay={timeOfDay}
        isRaining={isRaining}
        isWiperActive={isWiperActive}
        isHornBlowing={isHornBlowing}
      />

      {/* 2. Top Title & Marquee Header */}
      <header className="relative z-20 pt-3 px-2 sm:px-4 text-center pointer-events-none">
        
        {/* Large Memorable Title with Immersive UI Styling */}
        <div className="inline-block bg-[#2d1b0d]/90 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.9)] pointer-events-auto max-w-4xl w-full">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-3 mb-2 border-b border-white/10 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-orange-400 font-bold font-mono">
                NATIONAL HIGHWAY 114A / NH-34
              </span>
            </div>

            <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-mono text-stone-400">
              <span className="bg-orange-900/40 text-orange-300 border border-orange-500/30 px-2 py-0.5 rounded font-bold uppercase">
                ALL INDIA PERMIT
              </span>
              <span className="hidden sm:inline">REG NO. JH-04-A-2024</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase italic leading-none text-stone-100 shadow-orange-900/50 drop-shadow-2xl">
            KISKU <span className="text-orange-500">TRAVELS / BUS DRIVER</span>
          </h1>

          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-1.5">
            <div className="h-px w-6 sm:w-16 bg-orange-500/40"></div>
            <p className="text-[11px] sm:text-sm text-stone-300 font-serif italic tracking-wide">
              "Across the red soil of the east • A nostalgic highway journey"
            </p>
            <div className="h-px w-6 sm:w-16 bg-orange-500/40"></div>
          </div>

        </div>

        {/* Floating Passenger Speech Bubble when Horn is Blown */}
        {currentShout && (
          <div className="mt-2 inline-block bg-orange-500 text-stone-950 font-black text-xs sm:text-sm px-4 py-1.5 rounded-2xl shadow-2xl border-2 border-orange-300 animate-bounce transition-all uppercase tracking-wider">
            💬 "{currentShout}"
          </div>
        )}

        {/* Rotating Nostalgic Quote Ticker */}
        <div className="pointer-events-auto mt-1">
          <QuoteTicker />
        </div>

      </header>

      {/* 3. Central Driver Cabin Dashboard Console */}
      <div className="relative z-20 w-full flex-1 flex flex-col justify-end">
        <Dashboard
          speed={speed}
          setSpeed={setSpeed}
          timeOfDay={timeOfDay}
          setTimeOfDay={setTimeOfDay}
          isRaining={isRaining}
          setIsRaining={setIsRaining}
          isWiperActive={isWiperActive}
          setIsWiperActive={setIsWiperActive}
          onHornClick={handleHornClick}
          onOpenTicketModal={() => setIsTicketModalOpen(true)}
          onOpenMemoriesModal={() => setIsMemoriesModalOpen(true)}
          hornCount={hornCount}
        />
      </div>

      {/* 4. Glassmorphic Music Player */}
      <MusicPlayer />

      {/* 5. Modals */}
      <TicketGenerator
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
      />

      <MemoriesDrawer
        isOpen={isMemoriesModalOpen}
        onClose={() => setIsMemoriesModalOpen(false)}
      />

    </main>
  );
}
