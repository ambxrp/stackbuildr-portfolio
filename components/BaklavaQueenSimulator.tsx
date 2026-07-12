'use client';

import { useState } from 'react';
import { ShoppingBag, Database, CreditCard, CheckCircle2, ArrowRight } from 'lucide-react';

export default function BaklavaQueenSimulator() {
  const [stock, setStock] = useState(42);
  const [step, setStep] = useState<'idle' | 'checking' | 'paying' | 'confirming' | 'receipt'>('idle');
  const [log, setLog] = useState('Select item to test checkout loop');

  const runCheckout = async () => {
    if (step !== 'idle') return;
    
    // Step 1: Client triggers order
    setStep('checking');
    setLog('Next.js: client requested Pistachio Box. Verifying stock...');
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Step 2: Supabase check
    setStep('paying');
    setLog('Supabase: row level security (RLS) passed. Stock verified.');
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Step 3: Square payment processing
    setStep('confirming');
    setLog('Square Gateway: encrypting reader. charging $24.99...');
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Step 4: Write back to database and complete
    setStep('receipt');
    setStock((prev) => Math.max(0, prev - 1));
    setLog('Transaction approved! Supabase decrement sync completed.');
  };

  const resetSimulator = () => {
    setStep('idle');
    setLog('Select item to test checkout loop');
  };

  return (
    <div className="bg-zinc-950/70 border border-zinc-800 rounded-2xl p-4 shadow-lg flex flex-col justify-between font-mono relative overflow-hidden h-[340px]">
      {/* Simulation Header */}
      <div className="flex justify-between items-center border-b border-zinc-800 pb-2 mb-2">
        <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Stack Blueprint Simulator</span>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-[9px] text-emerald-400">Live API sandbox</span>
        </div>
      </div>

      {/* Database/API architecture diagram - compact and responsive */}
      <div className="grid grid-cols-5 items-center gap-0.5 text-center my-2 select-none">
        <div className={`flex flex-col items-center py-1 px-0.5 rounded border transition-all ${
          step === 'checking' ? 'border-purple-400 bg-purple-950/30' : 'border-zinc-800 bg-zinc-900/40'
        }`}>
          <ShoppingBag className={`w-4 h-4 sm:w-5 sm:h-5 ${step === 'checking' ? 'text-purple-400' : 'text-zinc-400'}`} />
          <span className="text-[7px] sm:text-[8px] mt-0.5">Next.js</span>
        </div>

        <div className="flex justify-center items-center">
          <ArrowRight className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${step === 'checking' ? 'text-purple-400 animate-pulse' : 'text-zinc-600'}`} />
        </div>

        <div className={`flex flex-col items-center py-1 px-0.5 rounded border transition-all ${
          step === 'paying' ? 'border-cyan-400 bg-cyan-950/30' : 'border-zinc-800 bg-zinc-900/40'
        }`}>
          <Database className={`w-4 h-4 sm:w-5 sm:h-5 ${step === 'paying' ? 'text-cyan-400' : 'text-zinc-400'}`} />
          <span className="text-[7px] sm:text-[8px] mt-0.5">Supabase</span>
        </div>

        <div className="flex justify-center items-center">
          <ArrowRight className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${step === 'paying' || step === 'confirming' ? 'text-cyan-400 animate-pulse' : 'text-zinc-600'}`} />
        </div>

        <div className={`flex flex-col items-center py-1 px-0.5 rounded border transition-all ${
          step === 'confirming' ? 'border-pink-400 bg-pink-950/30' : 'border-zinc-800 bg-zinc-900/40'
        }`}>
          <CreditCard className={`w-4 h-4 sm:w-5 sm:h-5 ${step === 'confirming' ? 'text-pink-400' : 'text-zinc-400'}`} />
          <span className="text-[7px] sm:text-[8px] mt-0.5">Square</span>
        </div>
      </div>

      {/* Sandbox Log Screen */}
      <div className="bg-black border border-zinc-900 p-2 rounded-lg text-[9px] sm:text-[10px] min-h-[56px] text-zinc-400 leading-tight">
        <span className="text-purple-400 font-bold">$ </span>
        {log}
      </div>

      {/* Main interaction screen */}
      <div className="flex-1 flex items-center justify-center min-h-[96px] relative">
        {step === 'idle' && (
          <div className="text-center w-full">
            <div className="text-[11px] sm:text-xs text-white mb-2 flex items-center justify-between px-3 bg-zinc-900/50 py-1.5 rounded-lg border border-zinc-800">
              <span className="text-yellow-500">Pistachio Baklava Box</span>
              <span className="font-bold text-white">$24.99</span>
            </div>
            <button
              onClick={runCheckout}
              className="w-full py-2 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 active:scale-98 text-black font-bold text-[11px] sm:text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 interactive shadow-[0_0_15px_rgba(168,85,247,0.2)]"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Order & Pay (Test Gateway)
            </button>
            <div className="text-[9px] text-zinc-500 mt-1.5">
              Available Inventory: <span className="text-zinc-300 font-bold">{stock} left</span>
            </div>
          </div>
        )}

        {step !== 'idle' && step !== 'receipt' && (
          <div className="flex flex-col items-center gap-2">
            <span className="text-[11px] sm:text-xs text-purple-400 animate-pulse">Syncing transactions...</span>
            <div className="flex gap-1.5 items-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
            </div>
          </div>
        )}

        {step === 'receipt' && (
          <div className="absolute inset-0 bg-zinc-900 border border-zinc-800 rounded-xl p-3 flex flex-col items-center justify-between text-center animate-fade-in z-10">
            <div className="flex flex-col items-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 mb-0.5" />
              <span className="text-[11px] sm:text-xs text-white font-bold">Transaction Success</span>
            </div>
            
            {/* Slide receipt representation */}
            <div className="bg-white text-black p-1.5 text-[7px] sm:text-[8px] text-left leading-normal w-full max-w-[180px] border shadow-md font-mono select-none">
              <div className="text-center font-bold text-[8px] sm:text-[9px]">BAKLAVA QUEEN</div>
              <div className="text-center text-[6px] sm:text-[7px] border-b border-dashed border-black pb-0.5 mb-1">BOERNE, TEXAS</div>
              <div className="flex justify-between">
                <span>1x Pistachio Box</span>
                <span>$24.99</span>
              </div>
              <div className="flex justify-between border-t border-dashed border-black pt-0.5 mt-0.5 font-bold">
                <span>TOTAL PAID</span>
                <span>$24.99</span>
              </div>
              <div className="text-[5px] sm:text-[6px] text-center text-zinc-500 mt-1 font-sans">
                SYNCED: Next.js ➔ Supabase ➔ Square
              </div>
            </div>

            <button
              onClick={resetSimulator}
              className="py-1 px-3 bg-zinc-800 hover:bg-zinc-700 text-[9px] rounded text-zinc-300 interactive mt-1"
            >
              Order Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
