'use client';

import { useState } from 'react';
import { Thermometer, Snowflake, Flame, Leaf, Plus, Minus } from 'lucide-react';

export default function ThermostatSimulator() {
  const [temp, setTemp] = useState(72);

  const getMode = () => {
    if (temp <= 68) return 'cool';
    if (temp >= 77) return 'heat';
    return 'eco';
  };

  const mode = getMode();

  const handleIncrement = () => {
    setTemp((prev) => Math.min(85, prev + 1));
  };

  const handleDecrement = () => {
    setTemp((prev) => Math.max(60, prev - 1));
  };

  return (
    <div
      style={{
        transition: 'background 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease',
      }}
      className={`border rounded-2xl p-4 shadow-lg flex flex-col justify-between font-mono relative overflow-hidden h-[340px] ${
        mode === 'cool' 
          ? 'bg-sky-950/40 border-sky-500/30 shadow-[0_0_30px_rgba(14,165,233,0.15)] text-sky-200' 
          : mode === 'heat' 
          ? 'bg-amber-950/40 border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.15)] text-amber-200' 
          : 'bg-zinc-950/70 border-zinc-800 shadow-md text-zinc-300'
      }`}
    >
      {/* Simulation Header */}
      <div className="flex justify-between items-center border-b border-zinc-800/40 pb-2">
        <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Climate Control Simulator</span>
        <div className="flex items-center gap-1">
          {mode === 'cool' && <Snowflake className="w-3.5 h-3.5 text-sky-400 animate-spin" style={{ animationDuration: '4s' }} />}
          {mode === 'heat' && <Flame className="w-3.5 h-3.5 text-amber-500 animate-pulse" />}
          {mode === 'eco' && <Leaf className="w-3.5 h-3.5 text-emerald-400 animate-bounce" style={{ animationDuration: '3s' }} />}
          <span className="text-[9px] uppercase font-bold">
            {mode === 'cool' ? 'Cooling' : mode === 'heat' ? 'Heating' : 'Eco Mode'}
          </span>
        </div>
      </div>

      {/* Thermodynamic flow graphics in background */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden z-0">
        {mode === 'cool' && (
          <div className="absolute inset-0 flex justify-around items-end">
            <div className="w-0.5 h-20 bg-sky-400 rounded-full animate-bubble" style={{ animationDelay: '0s', left: '10%' }} />
            <div className="w-0.5 h-16 bg-sky-300 rounded-full animate-bubble" style={{ animationDelay: '0.4s', left: '30%' }} />
            <div className="w-0.5 h-24 bg-sky-400 rounded-full animate-bubble" style={{ animationDelay: '0.8s', left: '55%' }} />
            <div className="w-0.5 h-12 bg-sky-200 rounded-full animate-bubble" style={{ animationDelay: '1.2s', left: '80%' }} />
          </div>
        )}
        {mode === 'heat' && (
          <div className="absolute inset-0 flex justify-around items-start">
            <div className="w-0.5 h-20 bg-amber-500 rounded-full animate-rise" style={{ animationDelay: '0s', left: '15%' }} />
            <div className="w-0.5 h-16 bg-orange-400 rounded-full animate-rise" style={{ animationDelay: '0.5s', left: '40%' }} />
            <div className="w-0.5 h-24 bg-red-400 rounded-full animate-rise" style={{ animationDelay: '0.2s', left: '65%' }} />
            <div className="w-0.5 h-12 bg-yellow-400 rounded-full animate-rise" style={{ animationDelay: '0.9s', left: '85%' }} />
          </div>
        )}
      </div>

      {/* Sandbox Log Screen */}
      <div className="bg-black/80 border border-zinc-900/60 p-2.5 rounded-lg text-[10px] text-zinc-400 leading-tight z-10">
        <span className="text-purple-400 font-bold">$ </span>
        {mode === 'cool' && `HVAC: Blowing cool air at ${temp}°F.`}
        {mode === 'heat' && `HVAC: Blowing heat at ${temp}°F.`}
        {mode === 'eco' && `HVAC: Fan running at low wattage (72W).`}
      </div>

      {/* Thermostat central dial */}
      <div className="flex-1 flex flex-col justify-center items-center relative z-10">
        <div className="relative w-32 h-32 rounded-full border-4 border-zinc-800/80 flex flex-col justify-center items-center bg-black/60 shadow-inner">
          
          {/* Circular tick marks simulation */}
          <div className="absolute inset-2 border border-dashed border-zinc-700/50 rounded-full" />
          
          <Thermometer className={`w-4 h-4 mb-1 ${
            mode === 'cool' ? 'text-sky-400' : mode === 'heat' ? 'text-amber-500' : 'text-zinc-500'
          }`} />

          <span className="text-3xl font-bold tracking-tight text-white select-none">
            {temp}°F
          </span>

          <span className="text-[8px] text-zinc-500 uppercase tracking-widest select-none">Target Temp</span>
        </div>
      </div>

      {/* Thermostat Controls */}
      <div className="flex justify-between items-center gap-4 relative z-10">
        <button
          onClick={handleDecrement}
          className="flex-1 py-2 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 rounded-lg flex items-center justify-center text-zinc-300 hover:text-white interactive active:scale-95 transition-all"
          aria-label="Decrease temperature"
        >
          <Minus className="w-4 h-4" />
        </button>

        <button
          onClick={handleIncrement}
          className="flex-1 py-2 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 rounded-lg flex items-center justify-center text-zinc-300 hover:text-white interactive active:scale-95 transition-all"
          aria-label="Increase temperature"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Custom Styles Inject for animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bubble {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-160px);
            opacity: 0;
          }
        }
        @keyframes rise {
          0% {
            transform: translateY(-160px);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(0);
            opacity: 0;
          }
        }
        .animate-bubble {
          animation: bubble 3s infinite linear;
        }
        .animate-rise {
          animation: rise 3s infinite linear;
        }
      `}} />
    </div>
  );
}
