import React from 'react';
import { MEMORY_CARDS, ROUTE_STOPS } from '../data/mockData';
import { X, ArrowLeft, MapPin, BookOpen } from 'lucide-react';

interface MemoriesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MemoriesDrawer: React.FC<MemoriesDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#2d1b0d]/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-hidden">
      <div className="relative w-full max-w-3xl bg-stone-900 border border-white/10 rounded-3xl p-4 sm:p-6 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col text-stone-100">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-orange-600 flex items-center justify-center text-stone-950 font-bold text-base sm:text-lg shadow-lg">
              📜
            </div>
            <div>
              <h2 className="text-base sm:text-xl font-bold text-stone-100 font-serif leading-tight">Driver Log & Museum</h2>
              <p className="text-[10px] sm:text-xs text-orange-400 font-mono">Heritage & Route History</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-950 hover:bg-stone-800 text-stone-300 hover:text-white transition-all border border-white/10 text-xs font-mono font-bold active:scale-95"
            title="Back to Bus"
          >
            <ArrowLeft className="w-4 h-4 text-orange-400" />
            <span>Back</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto pr-1 space-y-5 my-4 flex-1">
          
          {/* Driver Badge Card */}
          <div className="bg-gradient-to-r from-stone-950 via-stone-900 to-orange-950/40 border border-white/10 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
            <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-xl bg-stone-950 border-2 border-orange-500 overflow-hidden flex-shrink-0 flex flex-col items-center justify-center p-2 text-center shadow-lg">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-500/20 border border-orange-400 flex items-center justify-center text-orange-300 font-extrabold text-base sm:text-xl mb-1">
                RK
              </div>
              <span className="text-[8px] sm:text-[9px] font-mono text-orange-400 uppercase font-bold">PILOT #01</span>
            </div>

            <div className="flex-1 space-y-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h3 className="text-base sm:text-lg font-bold text-stone-100">Shri Rabindra Kisku</h3>
                <span className="bg-orange-500 text-stone-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  Senior Pilot
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-orange-300 font-mono">License: WB-34-EXPRESS-1994 • 28 Years Service</p>
              <p className="text-xs text-stone-300 leading-relaxed pt-1 italic">
                "In 28 years on National Highway 114A & NH-34, I never missed a single morning trip at 5:30 AM. My bus is my temple, and my passengers are my family."
              </p>
            </div>
          </div>

          {/* Memory Cards Grid */}
          <div>
            <h4 className="text-xs font-bold text-orange-400 uppercase tracking-widest font-mono flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-orange-400" />
              <span>Nostalgic Details & Artifacts</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {MEMORY_CARDS.map((card, idx) => (
                <div
                  key={idx}
                  className="bg-stone-950 border border-white/10 hover:border-orange-500/50 rounded-2xl p-3.5 sm:p-4 transition-all shadow-md group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-bold text-stone-100 text-xs sm:text-sm group-hover:text-orange-400 transition-colors">
                      {card.title}
                    </h5>
                    <span className="text-[10px] font-mono text-orange-400 bg-orange-950/50 px-2 py-0.5 rounded border border-orange-500/30">
                      {card.year}
                    </span>
                  </div>
                  <p className="text-xs text-orange-200/90 font-medium mb-1">
                    {card.tagline}
                  </p>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Route Map & Stops Table */}
          <div>
            <h4 className="text-xs font-bold text-orange-400 uppercase tracking-widest font-mono flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-orange-400" />
              <span>Highway Route Breakdown</span>
            </h4>

            <div className="bg-stone-950 border border-white/10 rounded-2xl p-3 sm:p-4 overflow-x-auto">
              <table className="w-full text-left text-xs font-mono min-w-[380px]">
                <thead>
                  <tr className="border-b border-white/10 text-orange-400 font-bold">
                    <th className="pb-2">Stop Name</th>
                    <th className="pb-2">Distance</th>
                    <th className="pb-2">Highlight</th>
                    <th className="pb-2 text-right">Fare</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-stone-300">
                  {ROUTE_STOPS.map((stop) => (
                    <tr key={stop.name} className="hover:bg-stone-900/50 transition-colors">
                      <td className="py-2 font-bold text-stone-100">{stop.name}</td>
                      <td className="py-2 text-stone-400">{stop.distanceKm} km</td>
                      <td className="py-2 text-orange-200/80">{stop.popularFor}</td>
                      <td className="py-2 text-right font-bold text-orange-400">₹{stop.fare}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Bottom Fixed Bar with Back to Bus button */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between flex-shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-stone-950 text-xs font-mono font-bold flex items-center gap-2 shadow-lg transition-transform active:scale-95 uppercase tracking-wide"
          >
            <ArrowLeft className="w-4 h-4 text-stone-950" />
            <span>Back to Bus</span>
          </button>
          <span className="text-[10px] font-mono text-stone-500 hidden sm:inline">Kisku Express Heritage Museum</span>
        </div>

      </div>
    </div>
  );
};
