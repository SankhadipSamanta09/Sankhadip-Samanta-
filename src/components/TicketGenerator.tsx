import React, { useState } from 'react';
import { ROUTE_STOPS } from '../data/mockData';
import { Ticket } from '../types';
import { soundEngine } from '../utils/soundEngine';
import { X, ArrowLeft, Stamp, User } from 'lucide-react';

interface TicketGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TicketGenerator: React.FC<TicketGeneratorProps> = ({ isOpen, onClose }) => {
  const [passengerName, setPassengerName] = useState('Nostalgic Traveler');
  const [fromStop, setFromStop] = useState(ROUTE_STOPS[0].name);
  const [toStop, setToStop] = useState(ROUTE_STOPS[4].name);
  const [seatType, setSeatType] = useState<'Window' | 'Cabin' | 'Roof' | 'Standard'>('Window');
  const [issuedTickets, setIssuedTickets] = useState<Ticket[]>([]);
  const [activeTicket, setActiveTicket] = useState<Ticket | null>(null);

  if (!isOpen) return null;

  // Calculate Fare based on stops
  const fromObj = ROUTE_STOPS.find((s) => s.name === fromStop) || ROUTE_STOPS[0];
  const toObj = ROUTE_STOPS.find((s) => s.name === toStop) || ROUTE_STOPS[4];
  const distance = Math.abs(toObj.distanceKm - fromObj.distanceKm);
  const calculatedFare = Math.max(15, Math.round(distance * 0.8));

  const handlePunchTicket = () => {
    soundEngine.playPunchSound();

    const newTicket: Ticket = {
      id: Math.random().toString(36).substring(2, 9),
      passengerName: passengerName.trim() || 'Passenger',
      from: fromStop,
      to: toStop,
      fare: calculatedFare,
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ticketNo: `KB-${Math.floor(100000 + Math.random() * 900000)}`,
      punched: true,
      seatType: seatType,
    };

    setIssuedTickets([newTicket, ...issuedTickets]);
    setActiveTicket(newTicket);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2d1b0d]/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-hidden">
      <div className="relative w-full max-w-2xl bg-stone-900 border border-white/10 rounded-3xl p-4 sm:p-6 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col text-stone-100">
        
        {/* Header with Prominent Back/Close Button */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-orange-500 flex items-center justify-center text-stone-950 font-black text-base sm:text-lg shadow-lg">
              KB
            </div>
            <div>
              <h2 className="text-base sm:text-xl font-bold text-stone-100 font-serif leading-tight">Ticket Counter</h2>
              <p className="text-[10px] sm:text-xs text-orange-400 font-mono">Conductor Souvenir Punch Desk</p>
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

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto pr-1 flex-1 space-y-5 my-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Ticket Input Form */}
            <div className="flex flex-col gap-3.5">
              
              <div>
                <label className="text-[10px] font-bold text-stone-300 uppercase tracking-widest font-mono block mb-1">
                  Passenger Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-400" />
                  <input
                    type="text"
                    value={passengerName}
                    onChange={(e) => setPassengerName(e.target.value)}
                    placeholder="Enter passenger name..."
                    className="w-full bg-stone-950 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-stone-100 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* From & To Route */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[10px] font-bold text-stone-300 uppercase tracking-widest font-mono block mb-1">
                    From
                  </label>
                  <select
                    value={fromStop}
                    onChange={(e) => setFromStop(e.target.value)}
                    className="w-full bg-stone-950 border border-white/10 rounded-xl px-2.5 py-2 text-xs text-stone-100 focus:outline-none focus:border-orange-500"
                  >
                    {ROUTE_STOPS.map((stop) => (
                      <option key={stop.name} value={stop.name}>{stop.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-stone-300 uppercase tracking-widest font-mono block mb-1">
                    To
                  </label>
                  <select
                    value={toStop}
                    onChange={(e) => setToStop(e.target.value)}
                    className="w-full bg-stone-950 border border-white/10 rounded-xl px-2.5 py-2 text-xs text-stone-100 focus:outline-none focus:border-orange-500"
                  >
                    {ROUTE_STOPS.map((stop) => (
                      <option key={stop.name} value={stop.name}>{stop.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Seat Category */}
              <div>
                <label className="text-[10px] font-bold text-stone-300 uppercase tracking-widest font-mono block mb-1">
                  Preferred Seat
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Window', 'Cabin', 'Roof', 'Standard'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSeatType(type)}
                      className={`py-1.5 px-2.5 rounded-xl text-xs font-bold border transition-all ${
                        seatType === type
                          ? 'bg-orange-500 text-stone-950 border-orange-300 shadow-md'
                          : 'bg-stone-950 text-stone-400 border-white/10 hover:border-stone-700'
                      }`}
                    >
                      {type} {type === 'Window' ? '🪟' : type === 'Roof' ? '🎒' : '💺'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculated Fare Summary & Punch Action */}
              <div className="bg-stone-950 border border-white/10 rounded-2xl p-3.5 flex items-center justify-between mt-1">
                <div>
                  <span className="text-[10px] text-stone-400 block font-mono">Calculated Fare</span>
                  <span className="text-xl sm:text-2xl font-black text-orange-400 font-mono">₹{calculatedFare}.00</span>
                </div>

                <button
                  onClick={handlePunchTicket}
                  className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-stone-950 font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-xl border border-orange-300 transition-transform active:scale-95"
                >
                  <Stamp className="w-4 h-4 text-stone-950" />
                  <span>PUNCH TICKET!</span>
                </button>
              </div>

            </div>

            {/* Ticket Visual Preview */}
            <div className="flex flex-col items-center justify-center">
              
              {activeTicket ? (
                <div className="relative w-full bg-amber-100 text-stone-900 rounded-2xl p-4 sm:p-5 shadow-2xl border-2 border-stone-800 font-mono overflow-hidden">
                  
                  {/* Vintage Punch Hole Punch marks */}
                  <div className="absolute top-2 left-2.5 w-3.5 h-3.5 rounded-full bg-stone-950 border border-stone-800 shadow-inner"></div>
                  <div className="absolute top-2 right-2.5 w-3.5 h-3.5 rounded-full bg-stone-950 border border-stone-800 shadow-inner"></div>
                  <div className="absolute bottom-2 left-2.5 w-3.5 h-3.5 rounded-full bg-stone-950 border border-stone-800 shadow-inner"></div>
                  <div className="absolute bottom-2 right-2.5 w-3.5 h-3.5 rounded-full bg-stone-950 border border-stone-800 shadow-inner"></div>

                  {/* Ticket Top Header */}
                  <div className="text-center border-b-2 border-dashed border-amber-800 pb-2.5 mb-2.5">
                    <h3 className="text-base sm:text-lg font-extrabold uppercase tracking-widest text-orange-950">
                      KISKU EXPRESS BUS SERVICE
                    </h3>
                    <p className="text-[9px] sm:text-[10px] text-stone-700 uppercase font-semibold">
                      KOLKATA • BANDEL • BARDHAMAN • DUMKA
                    </p>
                    <span className="inline-block mt-1 bg-stone-900 text-orange-200 text-[9px] sm:text-[10px] px-2 py-0.5 rounded font-bold">
                      TICKET NO: {activeTicket.ticketNo}
                    </span>
                  </div>

                  {/* Ticket Details */}
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-stone-600">Passenger:</span>
                      <strong className="text-stone-900">{activeTicket.passengerName}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-600">From:</span>
                      <strong className="text-stone-900">{activeTicket.from}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-600">To:</span>
                      <strong className="text-stone-900">{activeTicket.to}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-600">Seat Type:</span>
                      <strong className="text-stone-900">{activeTicket.seatType}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-600">Date & Time:</span>
                      <strong className="text-stone-900">{activeTicket.date} • {activeTicket.time}</strong>
                    </div>
                  </div>

                  {/* Fare & Conductor Stamp */}
                  <div className="mt-3 pt-2.5 border-t-2 border-dashed border-amber-800 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-stone-600 uppercase block">Total Paid</span>
                      <strong className="text-lg sm:text-xl font-black text-orange-900">₹{activeTicket.fare}.00</strong>
                    </div>

                    {/* Stamp Graphic */}
                    <div className="border-2 border-orange-700 rounded-lg p-1 transform rotate-[-8deg] opacity-90 text-center bg-orange-50">
                      <span className="text-[8px] font-bold text-orange-900 uppercase block">KISKU EXPRESS</span>
                      <span className="text-[8px] font-extrabold text-orange-600 uppercase block">PAID & PUNCHED</span>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="w-full h-full min-h-[180px] sm:min-h-[220px] bg-stone-950 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center p-5 text-center">
                  <Stamp className="w-10 h-10 text-stone-700 mb-2 animate-bounce" />
                  <p className="text-xs sm:text-sm font-bold text-stone-400">No Ticket Issued Yet</p>
                  <p className="text-[11px] text-stone-600 mt-1">Fill details and click "PUNCH TICKET!" to create your official souvenir ticket.</p>
                </div>
              )}

            </div>

          </div>
        </div>

        {/* Fixed Footer with explicit Back button */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between flex-shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-stone-950 text-xs font-mono font-bold flex items-center gap-2 shadow-lg transition-transform active:scale-95 uppercase tracking-wide"
          >
            <ArrowLeft className="w-4 h-4 text-stone-950" />
            <span>Back to Bus</span>
          </button>
          <span className="text-[10px] font-mono text-stone-500 hidden sm:inline">Kisku Express Official Souvenir</span>
        </div>

      </div>
    </div>
  );
};
