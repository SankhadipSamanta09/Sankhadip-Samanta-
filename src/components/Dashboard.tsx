import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Key, CloudRain, Sun, Moon, Wind, Bell, Ticket, Flame, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { TimeOfDay } from '../types';

interface DashboardProps {
  speed: number;
  setSpeed: React.Dispatch<React.SetStateAction<number>>;
  timeOfDay: TimeOfDay;
  setTimeOfDay: (time: TimeOfDay) => void;
  isRaining: boolean;
  setIsRaining: (val: boolean) => void;
  isWiperActive: boolean;
  setIsWiperActive: (val: boolean) => void;
  onHornClick: () => void;
  onOpenTicketModal: () => void;
  onOpenMemoriesModal: () => void;
  hornCount: number;
}

export const Dashboard: React.FC<DashboardProps> = ({
  speed,
  setSpeed,
  timeOfDay,
  setTimeOfDay,
  isRaining,
  setIsRaining,
  isWiperActive,
  setIsWiperActive,
  onHornClick,
  onOpenTicketModal,
  onOpenMemoriesModal,
  hornCount
}) => {
  const [isEngineOn, setIsEngineOn] = useState(false);
  const [steeringAngle, setSteeringAngle] = useState(0);
  const [isDraggingWheel, setIsDraggingWheel] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hornPulse, setHornPulse] = useState(false);

  // Toggle Engine
  const handleEngineToggle = () => {
    const newState = soundEngine.toggleEngine(speed);
    setIsEngineOn(!!newState);
  };

  // Horn action with visual feedback
  const handleHornTrigger = () => {
    soundEngine.playAirHorn();
    setHornPulse(true);
    setTimeout(() => setHornPulse(false), 600);
    onHornClick();
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.code === 'Space' || e.key === 'h' || e.key === 'H') {
        e.preventDefault();
        handleHornTrigger();
      } else if (e.key === 'w' || e.key === 'W') {
        setIsWiperActive(!isWiperActive);
        soundEngine.playWiperSound();
      } else if (e.key === 'e' || e.key === 'E') {
        handleEngineToggle();
      } else if (e.key === 'ArrowUp') {
        setSpeed((prev) => Math.min(110, prev + 10));
      } else if (e.key === 'ArrowDown') {
        setSpeed((prev) => Math.max(0, prev - 10));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isWiperActive]);

  // Update sound engine engine RPM when speed changes
  useEffect(() => {
    if (isEngineOn) {
      soundEngine.updateEngineRpm(speed);
    }
  }, [speed, isEngineOn]);

  // Steering wheel rotation drag handlers
  const handleWheelMouseDown = () => setIsDraggingWheel(true);
  const handleWheelMouseUp = () => setIsDraggingWheel(false);
  const handleWheelMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingWheel) return;
    const movement = e.movementX;
    setSteeringAngle((prev) => Math.max(-90, Math.min(90, prev + movement * 1.5)));
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between pointer-events-none select-none overflow-hidden">
      
      {/* Top Banner & Quick Controls */}
      <div className="p-2 sm:p-5 flex flex-wrap justify-between items-center gap-2 pointer-events-auto z-20">
        
        {/* Kisku Bus Badge */}
        <div className="bg-[#2d1b0d]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2.5 sm:p-3 shadow-2xl flex items-center gap-2.5">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-orange-500 to-stone-900 flex items-center justify-center text-stone-950 font-black text-base sm:text-xl shadow-lg border border-orange-400">
            KB
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-orange-400 font-bold text-xs sm:text-sm tracking-wider uppercase">Kisku Express</span>
              <span className="hidden sm:inline bg-orange-600 text-stone-950 text-[10px] font-extrabold px-2 py-0.5 rounded tracking-wider animate-pulse uppercase">
                AIR HORN EQUIPPED
              </span>
            </div>
            <p className="text-stone-300 text-[10px] sm:text-xs font-medium truncate max-w-[180px] sm:max-w-none">
              Esplanade • Bandel • Bardhaman • Dumka
            </p>
          </div>
        </div>

        {/* Highway Environment & Sound Toggles */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 bg-[#2d1b0d]/90 backdrop-blur-xl p-1.5 sm:p-2 rounded-2xl border border-white/10 shadow-xl">
          
          {/* Time of Day Toggle */}
          <button
            onClick={() => {
              const nextTime: TimeOfDay = timeOfDay === 'day' ? 'golden' : timeOfDay === 'golden' ? 'night' : 'day';
              setTimeOfDay(nextTime);
            }}
            className="p-1.5 sm:p-2 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-orange-300 transition-all border border-white/10 flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-semibold"
            title="Toggle Highway Lighting"
          >
            {timeOfDay === 'day' && <Sun className="w-3.5 h-3.5 text-orange-400" />}
            {timeOfDay === 'golden' && <Sparkles className="w-3.5 h-3.5 text-orange-400" />}
            {timeOfDay === 'night' && <Moon className="w-3.5 h-3.5 text-amber-200" />}
            <span className="hidden sm:inline capitalize font-mono">{timeOfDay}</span>
          </button>

          {/* Rain Toggle */}
          <button
            onClick={() => {
              setIsRaining(!isRaining);
              if (!isRaining) setIsWiperActive(true);
            }}
            className={`p-1.5 sm:p-2 rounded-xl transition-all border flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-semibold ${
              isRaining
                ? 'bg-orange-600 border-orange-400 text-stone-950 shadow-lg'
                : 'bg-stone-900/80 border-white/10 text-stone-300 hover:bg-stone-800'
            }`}
            title="Toggle Monsoon Rain"
          >
            <CloudRain className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-mono">{isRaining ? 'Rain' : 'Dry'}</span>
          </button>

          {/* Mute Audio */}
          <button
            onClick={() => {
              const nextMute = !isMuted;
              setIsMuted(nextMute);
              soundEngine.isMuted = nextMute;
            }}
            className="p-1.5 sm:p-2 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-stone-300 transition-all border border-white/10"
            title="Toggle Synthesizer Audio"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
          </button>

          {/* Ticket Souvenir Button */}
          <button
            onClick={onOpenTicketModal}
            className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-stone-950 font-extrabold text-[11px] sm:text-xs flex items-center gap-1 sm:gap-1.5 shadow-lg border border-orange-300 transition-transform active:scale-95 uppercase tracking-wide"
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>Ticket</span>
          </button>

          {/* Memory Museum */}
          <button
            onClick={onOpenMemoriesModal}
            className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-orange-400 font-extrabold text-[11px] sm:text-xs flex items-center gap-1 sm:gap-1.5 shadow-lg border border-white/10 transition-transform active:scale-95 uppercase tracking-wide"
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>Driver Log</span>
          </button>

        </div>
      </div>

      {/* Floating Windshield Rearview Mirror (Desktop/Tablet) */}
      <div className="hidden md:flex absolute top-16 left-1/2 -translate-x-1/2 flex-col items-center pointer-events-none z-10">
        
        {/* Rearview Mirror */}
        <div className="relative w-72 h-10 bg-stone-950 border-2 border-stone-800 rounded-xl shadow-2xl flex items-center justify-center overflow-hidden">
          <div className="text-[9px] text-stone-300 font-mono flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="tracking-widest">OBJECTS IN MIRROR ARE CLOSER THAN THEY APPEAR</span>
          </div>

          {/* Swaying Marigold Garland */}
          <div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-1 transition-transform duration-300"
            style={{ transform: `translateX(-50%) rotate(${steeringAngle * 0.15}deg)` }}
          >
            <div className="w-3.5 h-3.5 rounded-full bg-orange-500 border border-orange-300 shadow-md"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-amber-600 border border-amber-400 shadow-md"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-orange-400 border border-orange-200 shadow-md"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-red-600 border border-red-400 shadow-md"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-orange-500 border border-orange-300 shadow-md"></div>
          </div>
        </div>

        <div className="mt-2 bg-stone-900/90 border border-orange-500/40 px-4 py-0.5 rounded-full backdrop-blur-md text-orange-200 text-[10px] font-serif tracking-widest uppercase shadow-xl">
          মা আশীর্বাদ • KISKU EXPRESS • ALL INDIA PERMIT
        </div>
      </div>

      {/* Bottom Driver Dashboard Console */}
      <div className="relative w-full bg-gradient-to-t from-stone-950 via-[#2d1b0d] to-[#2d1b0d]/95 border-t-2 sm:border-t-4 border-orange-600/80 p-3 sm:p-5 shadow-2xl pointer-events-auto z-20">
        
        {/* Dashboard Decor: Deity & Incense Stick */}
        <div className="hidden sm:flex absolute -top-12 left-4 sm:left-12 items-end gap-3 pointer-events-auto">
          
          {/* Idol Statue */}
          <div className="bg-stone-950 border-2 border-orange-500/80 rounded-t-2xl p-1.5 flex flex-col items-center shadow-2xl">
            <div className="w-8 h-8 rounded-full bg-orange-500/20 border border-orange-400 flex items-center justify-center text-orange-300 font-bold text-sm shadow-inner">
              卐
            </div>
            <span className="text-[9px] text-orange-300 font-bold uppercase tracking-wider mt-0.5">
              জয় মা দুৰ্গা
            </span>
          </div>

          {/* Agarbatti Burning Incense Stick */}
          <div className="flex flex-col items-center">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-ping shadow-[0_0_12px_#f97316]"></div>
            <div className="w-0.5 h-10 bg-stone-800 shadow-md"></div>
            <div className="w-3.5 h-2.5 bg-stone-950 rounded-t border border-stone-800"></div>
          </div>
        </div>

        {/* Main Dashboard Layout */}
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          
          {/* LEFT: Engine & Speedometer Controls */}
          <div className="flex items-center justify-between w-full md:w-auto gap-3 sm:gap-6">
            
            {/* Speedometer Dial */}
            <div className="relative w-22 h-22 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-stone-950 border-2 sm:border-4 border-orange-600/80 p-1.5 flex items-center justify-center shadow-2xl flex-shrink-0">
              
              <div className="absolute inset-0 rounded-full border border-dashed border-orange-500/30"></div>
              
              <div className="text-center z-10">
                <span className="text-xl sm:text-2xl md:text-3xl font-black text-orange-400 tracking-tight font-mono">
                  {Math.round(speed)}
                </span>
                <span className="block text-[9px] text-stone-400 font-extrabold uppercase tracking-widest font-mono">
                  KM/H
                </span>
              </div>

              {/* Glowing Gauge Needle */}
              <div
                className="absolute w-1 h-10 sm:h-12 bg-orange-500 rounded-full origin-bottom transition-transform duration-200 shadow-[0_0_10px_#f97316]"
                style={{
                  bottom: '50%',
                  transform: `rotate(${-120 + (speed / 110) * 240}deg)`,
                }}
              ></div>
              <div className="absolute w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-stone-300 border-2 border-orange-600 z-20"></div>
            </div>

            {/* Accelerator & Ignition Console */}
            <div className="flex flex-col gap-1.5 flex-1 sm:flex-none">
              
              {/* Key Ignition Toggle */}
              <button
                onClick={handleEngineToggle}
                className={`px-2.5 py-1.5 sm:py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all border shadow-md justify-center ${
                  isEngineOn
                    ? 'bg-emerald-600 border-emerald-400 text-white shadow-emerald-900/50'
                    : 'bg-stone-900 border-stone-800 text-stone-300 hover:bg-stone-800'
                }`}
              >
                <Key className={`w-3.5 h-3.5 ${isEngineOn ? 'animate-spin text-orange-300' : ''}`} />
                <span>{isEngineOn ? 'Engine ON' : 'Start Engine'}</span>
              </button>

              {/* Throttle Accelerator Slider */}
              <div className="bg-stone-950 border border-stone-800 p-1.5 sm:p-2 rounded-xl flex flex-col gap-1">
                <div className="flex justify-between items-center text-[10px] font-bold text-orange-400 uppercase font-mono">
                  <span>Throttle</span>
                  <span>{speed} km/h</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="110"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="w-full sm:w-36 accent-orange-500 cursor-pointer"
                />
              </div>

            </div>
          </div>

          {/* CENTER: IMMERSIVE UI "HORN OK PLEASE" STEERING & AIR HORN BUTTON */}
          <div className="flex flex-col items-center">
            
            <button
              onClick={handleHornTrigger}
              className={`relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full border-[6px] sm:border-[8px] md:border-[10px] border-stone-800 shadow-[0_0_50px_rgba(0,0,0,0.5),inset_0_0_30px_rgba(0,0,0,0.8)] bg-gradient-to-br from-stone-700 via-stone-800 to-stone-900 flex items-center justify-center overflow-hidden cursor-pointer group active:scale-95 transition-transform duration-75 ${
                hornPulse ? 'scale-105 shadow-[0_0_40px_rgba(249,115,22,0.8)]' : 'hover:scale-102'
              }`}
            >
              {/* Internal Crosslines */}
              <div className="absolute top-1/2 left-0 w-full h-1 bg-stone-800"></div>
              <div className="absolute top-0 left-1/2 w-1 h-full bg-stone-800"></div>

              {/* Brand Tag */}
              <div className="absolute top-1.5 sm:top-2.5 left-1/2 -translate-x-1/2 text-[7px] sm:text-[8px] font-mono text-stone-500 tracking-widest uppercase">
                TATA MOTORS
              </div>

              {/* Center Horn Cap */}
              <div className="w-16 h-16 sm:w-22 sm:h-22 md:w-24 md:h-24 rounded-full bg-stone-950 border-2 sm:border-4 border-stone-800 flex flex-col items-center justify-center text-center p-1 sm:p-2 shadow-inner z-10 group-hover:border-orange-500/50 transition-colors">
                <span className="text-[8px] sm:text-[9px] text-orange-500 font-bold tracking-widest mb-0.5">
                  HORN
                </span>
                <span className="text-base sm:text-xl md:text-2xl font-black text-stone-100 tracking-tight leading-none">
                  OK
                </span>
                <span className="text-[8px] sm:text-[9px] text-orange-500 font-bold tracking-widest mt-0.5">
                  PLEASE
                </span>
              </div>

              {/* Floating Action Pill */}
              <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-orange-600 px-2 sm:px-3 py-0.5 sm:py-1 rounded text-[8px] sm:text-[10px] font-bold uppercase tracking-wider italic text-black shadow-lg">
                PRESS TO HONK
              </div>
            </button>

            <span className="text-stone-400 text-[10px] sm:text-xs font-mono mt-2">
              Horns Blasted: <strong className="text-orange-400">{hornCount}</strong>
            </span>
          </div>

          {/* RIGHT: Steering Wheel & Conductor Whistle */}
          <div className="flex items-center justify-between w-full md:w-auto gap-4 sm:gap-6">
            
            {/* Interactive Steering Wheel */}
            <div
              onMouseDown={handleWheelMouseDown}
              onMouseUp={handleWheelMouseUp}
              onMouseLeave={handleWheelMouseUp}
              onMouseMove={handleWheelMouseMove}
              className="relative w-22 h-22 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-stone-900 border-4 sm:border-8 border-stone-800 flex items-center justify-center cursor-grab active:cursor-grabbing shadow-2xl transition-transform flex-shrink-0"
              style={{ transform: `rotate(${steeringAngle}deg)` }}
              title="Drag or hold to turn steering wheel"
            >
              {/* Wheel Spokes */}
              <div className="absolute w-full h-2 sm:h-3 bg-stone-950"></div>
              <div className="absolute h-full w-2 sm:w-3 bg-stone-950"></div>
              
              {/* Central Boss Emblem */}
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-500 border-2 border-orange-200 flex items-center justify-center text-stone-950 font-black text-[9px] sm:text-[10px] text-center shadow-lg">
                KISKU
              </div>
            </div>

            {/* Quick Aux Switches */}
            <div className="flex flex-col gap-1.5 flex-1 sm:flex-none">
              
              {/* Wiper Toggle */}
              <button
                onClick={() => {
                  setIsWiperActive(!isWiperActive);
                  soundEngine.playWiperSound();
                }}
                className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all justify-center ${
                  isWiperActive
                    ? 'bg-orange-500 border-orange-300 text-stone-950'
                    : 'bg-stone-900 border-stone-800 text-stone-300 hover:bg-stone-800'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Wiper [W]</span>
              </button>

              {/* Conductor Whistle */}
              <button
                onClick={() => soundEngine.playWhistle()}
                className="p-2 rounded-xl text-xs font-bold bg-stone-900 hover:bg-stone-800 text-orange-300 border border-stone-800 flex items-center gap-1.5 justify-center shadow-md active:scale-95"
              >
                <Bell className="w-3.5 h-3.5 text-orange-400" />
                <span>Whistle</span>
              </button>

            </div>

          </div>

        </div>

        {/* Keyboard Controls Hint Footer */}
        <div className="mt-3 pt-2 border-t border-stone-900 flex flex-wrap justify-center items-center gap-3 text-[10px] sm:text-[11px] text-stone-400 font-mono">
          <span><kbd className="px-1 py-0.5 bg-stone-900 rounded text-orange-300 border border-stone-800">SPACE</kbd> Air Horn</span>
          <span><kbd className="px-1 py-0.5 bg-stone-900 rounded text-orange-300 border border-stone-800">W</kbd> Wiper</span>
          <span><kbd className="px-1 py-0.5 bg-stone-900 rounded text-orange-300 border border-stone-800">E</kbd> Ignition</span>
          <span><kbd className="px-1 py-0.5 bg-stone-900 rounded text-orange-300 border border-stone-800">↑ / ↓</kbd> Accelerate</span>
        </div>

      </div>

    </div>
  );
};
