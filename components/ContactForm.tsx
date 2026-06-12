// components/ContactForm.tsx
'use client';
import { useState } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';

export default function ContactForm() {
  const [status, setStatus] = useState('');
  const [isError, setIsError] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    if (!turnstileToken) {
        setIsError(true);
        setStatus('Security check in progress, please wait.');
        return;
    }

    // FIX: Capture the form reference synchronously BEFORE the await call
    const targetForm = e.currentTarget;

    const formData = new FormData(targetForm);
    const payload = {
        email: formData.get('email'),
        message: formData.get('message'),
        token: turnstileToken, 
    };

    const res = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
        setIsError(false);
        setStatus('Message sent successfully!');
        targetForm.reset(); // FIX: Safely call reset on our saved reference
        setTurnstileToken(null);  
    } else {
        setIsError(true);
        setStatus('Submission failed or security check expired.');
    }
    }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <label className="block text-white mb-1">Email</label>
        <input type="email" name="email" required className="w-full p-2 bg-zinc-800 rounded text-white" />
      </div>
      <div>
        <label className="block text-white mb-1">Message</label>
        <textarea name="message" required className="w-full p-2 bg-zinc-800 rounded text-white h-32" />
      </div>

      {/* Cloudflare Turnstile Component */}
      <div className="my-2 flex justify-center">
        <Turnstile 
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!} 
          onSuccess={(token) => setTurnstileToken(token)}
          onExpire={() => setTurnstileToken(null)}
          onError={() => setTurnstileToken(null)}
          options={{ theme: 'dark' }} // Matches your dark theme layout
        />
      </div>

      <button 
        type="submit" 
        disabled={!turnstileToken}
        className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:opacity-50"
      >
        Send Message
      </button>
      {status && <p className={`text-sm mt-2 text-center ${isError ? 'text-red-500' : 'text-purple-300'}`}>{status}</p>}
    </form>
  );
}