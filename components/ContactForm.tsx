// components/ContactForm.tsx
'use client';

import { useState } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import { Send, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function ContactForm() {
  const [status, setStatus] = useState('');
  const [isError, setIsError] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    if (!turnstileToken) {
      setIsError(true);
      setStatus('Please wait for the security check to complete.');
      return;
    }

    setIsSubmitting(true);
    setStatus('Sending your message.');
    
    const targetForm = e.currentTarget;
    const formData = new FormData(targetForm);
    const payload = {
      email: formData.get('email'),
      message: formData.get('message'),
      token: turnstileToken, 
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        setIsError(false);
        setStatus('I received your message. I will get back to you soon.');
        targetForm.reset(); 
        setTurnstileToken(null);  
      } else {
        setIsError(true);
        setStatus('Your message did not send. The security check may have expired.');
      }
    } catch (err) {
      console.error(err);
      setIsError(true);
      setStatus('There was a connection issue. Please check your network.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 w-full max-w-md mx-auto">
      <div>
        <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-1.5 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
          Email
        </label>
        <input 
          type="email" 
          name="email" 
          required 
          disabled={isSubmitting}
          className="w-full px-4 py-3 bg-zinc-950/80 border border-zinc-800 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-purple-400 focus:shadow-[0_0_12px_rgba(168,85,247,0.2)] transition-all placeholder:text-zinc-600 disabled:opacity-50"
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-1.5 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          Message
        </label>
        <textarea 
          name="message" 
          required 
          disabled={isSubmitting}
          className="w-full px-4 py-3 bg-zinc-950/80 border border-zinc-800 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_12px_rgba(34,211,238,0.2)] transition-all placeholder:text-zinc-600 h-32 resize-none disabled:opacity-50"
          placeholder="Enter your message"
        />
      </div>

      {/* Cloudflare Turnstile Component */}
      <div className="my-3 flex flex-col items-center gap-2">
        <Turnstile 
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!} 
          onSuccess={(token) => setTurnstileToken(token)}
          onExpire={() => setTurnstileToken(null)}
          onError={() => setTurnstileToken(null)}
          options={{ theme: 'dark' }} 
        />
        {!turnstileToken && !isSubmitting && (
          <span className="text-[10px] text-zinc-500 font-mono flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400/70" />
            Verifying security
          </span>
        )}
      </div>

      <button 
        type="submit" 
        disabled={!turnstileToken || isSubmitting}
        className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-black font-bold font-mono py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed interactive shadow-[0_0_15px_rgba(168,85,247,0.15)] active:scale-[0.98]"
      >
        <Send className="w-4 h-4" />
        {isSubmitting ? 'Sending' : 'Send Message'}
      </button>

      {status && (
        <div 
          style={{ animationDuration: '0.2s' }}
          className={`flex items-start gap-2 p-3 rounded-lg border text-xs font-mono animate-fade-in ${
            isError 
              ? 'bg-red-950/20 border-red-500/30 text-red-400' 
              : 'bg-emerald-950/20 border-emerald-500/30 text-emerald-400'
          }`}
        >
          {isError ? (
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          ) : (
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
          )}
          <span>{status}</span>
        </div>
      )}
    </form>
  );
}