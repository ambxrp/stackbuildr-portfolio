'use client';

import { useState, useEffect, useRef } from 'react';
import { Terminal, Play, RotateCcw, AlertCircle } from 'lucide-react';

interface LogLine {
  text: string;
  type: 'cmd' | 'info' | 'success' | 'warn' | 'error';
}

export default function BuildConsole() {
  const [logs, setLogs] = useState<LogLine[]>([
    { text: 'system core initialized. awaiting commands...', type: 'info' },
    { text: 'type or select a command below to compile project stacks.', type: 'info' },
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentCmd, setCurrentCmd] = useState('');
  const consoleContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    const container = consoleContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  const addLog = (text: string, type: LogLine['type'] = 'info', delay = 0) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, { text, type }]);
        resolve();
      }, delay);
    });
  };

  const clearConsole = () => {
    if (isRunning) return;
    setLogs([{ text: 'console cleared. system ready.', type: 'info' }]);
  };

  const runCommand = async (cmdKey: 'sabryna' | 'baklava' | 'ac' | 'portfolio') => {
    if (isRunning) return;
    setIsRunning(true);

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    if (cmdKey === 'sabryna') {
      setCurrentCmd('npm run build filmbysabryna.com');
      await sleep(500);
      setLogs((p) => [...p, { text: '$ npm run build filmbysabryna.com', type: 'cmd' }]);
      await sleep(400);
      await addLog('▶ compiling assets for filmbysabryna.com (Photography Website)...', 'info');
      await sleep(600);
      await addLog('ℹ loading photos metadata (248 high-res films, 12 galleries)', 'info');
      await sleep(500);
      await addLog('⚡ optimizing images with next/image wrapper', 'info');
      await sleep(400);
      await addLog('  [===================] 100% (248/248 images compressed)', 'success');
      await sleep(300);
      await addLog('✓ generated static html pages', 'success');
      await sleep(400);
      await addLog('✓ filmbysabryna.com is fully compiled and deployed!', 'success');
      await addLog('🌐 domain: https://filmbysabryna.com (Status: Live)', 'success');
    } else if (cmdKey === 'baklava') {
      setCurrentCmd('supabase status --project baklava-queen');
      await sleep(500);
      setLogs((p) => [...p, { text: '$ supabase status --project baklava-queen', type: 'cmd' }]);
      await sleep(400);
      await addLog('▶ checking remote connection to Supabase DB cluster (Boerne, Texas)...', 'info');
      await sleep(600);
      await addLog('⚙ API endpoints: Next.js 16.2.9 Edge Functions', 'info');
      await sleep(400);
      await addLog('💳 Square checkout gateway synced with product inventory', 'info');
      await sleep(500);
      await addLog('▲ active connection pools: 8/10 nodes healthy', 'success');
      await sleep(300);
      await addLog('⚠ warning: supabase is in public development mode (auto-pause active)', 'warn');
      await sleep(400);
      await addLog('✓ local stack: http://localhost:3000 (status: in-progress)', 'info');
    } else if (cmdKey === 'ac') {
      setCurrentCmd('next build --ac-heating-website');
      await sleep(500);
      setLogs((p) => [...p, { text: '$ next build --ac-heating-website', type: 'cmd' }]);
      await sleep(400);
      await addLog('▶ starting production build for AC & Heating Small Business Website...', 'info');
      await sleep(700);
      await addLog('ℹ scanning react components (ThermostatDial, ServiceScheduler, ContactForm)', 'info');
      await sleep(500);
      await addLog('ℹ connecting to mail API providers', 'info');
      await sleep(400);
      await addLog('⚡ building CSS modules with Tailwind v4 engine...', 'info');
      await sleep(600);
      await addLog('✓ compiled 14 assets successfully', 'success');
      await addLog('🔄 status: still in development/progress (90% complete)', 'warn');
    } else if (cmdKey === 'portfolio') {
      setCurrentCmd('cat stackbuildr.json');
      await sleep(500);
      setLogs((p) => [...p, { text: '$ cat stackbuildr.json', type: 'cmd' }]);
      await sleep(500);
      await addLog('{', 'info');
      await addLog('  "name": "Amber Parker",', 'info');
      await addLog('  "handle": "StackBuildr",', 'info');
      await addLog('  "role": "Full Stack Engineer",', 'info');
      await addLog('  "skills": ["Next.js 16+", "Supabase", "React 19", "Tailwind CSS v4", "TypeScript", "Node.js"],', 'info');
      await addLog('  "hobby": "Building highly animated, unique digital experiences"', 'info');
      await addLog('}', 'info');
    }

    setIsRunning(false);
    setCurrentCmd('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-black/60 backdrop-blur-xl border border-purple-500/20 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(147,51,234,0.15)] flex flex-col h-[340px]">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between bg-zinc-950/80 px-4 py-3 border-b border-purple-500/10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="text-xs text-zinc-400 font-mono flex items-center gap-1.5 ml-2">
            <Terminal className="w-3.5 h-3.5 text-purple-400" />
            stackbuildr-console v1.2.0
          </span>
        </div>
        <button 
          onClick={clearConsole} 
          disabled={isRunning}
          className="text-xs text-zinc-500 hover:text-zinc-300 font-mono transition-colors flex items-center gap-1 disabled:opacity-50 interactive"
        >
          <RotateCcw className="w-3 h-3" />
          clear
        </button>
      </div>

      {/* Terminal Content Screen */}
      <div ref={consoleContainerRef} className="flex-1 overflow-y-auto p-4 font-mono text-xs md:text-sm space-y-2 scrollbar-thin scrollbar-thumb-purple-900/30 scrollbar-track-transparent">
        {logs.map((log, idx) => (
          <div key={idx} className="leading-relaxed">
            {log.type === 'cmd' && (
              <span className="text-cyan-400 font-bold">{log.text}</span>
            )}
            {log.type === 'info' && (
              <span className="text-zinc-300">{log.text}</span>
            )}
            {log.type === 'success' && (
              <span className="text-emerald-400 font-medium">✓ {log.text}</span>
            )}
            {log.type === 'warn' && (
              <span className="text-yellow-400 font-medium flex items-start gap-1">
                <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                {log.text}
              </span>
            )}
            {log.type === 'error' && (
              <span className="text-red-400 font-bold">✖ {log.text}</span>
            )}
          </div>
        ))}
        {currentCmd && (
          <div className="text-cyan-400 font-bold animate-pulse">
            $ {currentCmd}...
          </div>
        )}
      </div>

      {/* Terminal Keyboard/Controls */}
      <div className="bg-zinc-950/80 p-3 border-t border-purple-500/10 flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => runCommand('sabryna')}
          disabled={isRunning}
          className="bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 text-purple-300 text-xs font-mono py-1.5 px-3 rounded-lg transition-all flex items-center gap-1 interactive disabled:opacity-30"
        >
          <Play className="w-3 h-3" />
          run filmbysabryna
        </button>
        <button
          onClick={() => runCommand('baklava')}
          disabled={isRunning}
          className="bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono py-1.5 px-3 rounded-lg transition-all flex items-center gap-1 interactive disabled:opacity-30"
        >
          <Play className="w-3 h-3" />
          check baklava-queen
        </button>
        <button
          onClick={() => runCommand('ac')}
          disabled={isRunning}
          className="bg-yellow-950/40 hover:bg-yellow-900/60 border border-yellow-500/30 text-yellow-300 text-xs font-mono py-1.5 px-3 rounded-lg transition-all flex items-center gap-1 interactive disabled:opacity-30"
        >
          <Play className="w-3 h-3" />
          compile ac-heating
        </button>
        <button
          onClick={() => runCommand('portfolio')}
          disabled={isRunning}
          className="bg-zinc-800/40 hover:bg-zinc-700/60 border border-zinc-600/30 text-zinc-300 text-xs font-mono py-1.5 px-3 rounded-lg transition-all flex items-center gap-1 interactive disabled:opacity-30"
        >
          <Play className="w-3 h-3" />
          cat profile
        </button>
      </div>
    </div>
  );
}
