'use client';

import { useState } from 'react';
import { registerPlayer } from '@/lib/api';

export default function RegisterForm({ tournamentId }: { tournamentId: number }) {
  const [secret, setSecret] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      await registerPlayer(tournamentId, secret);
      setStatus('success');
      setMessage('Registered successfully!');
      setSecret('');
    } catch (err) {
      setStatus('error');
      setMessage((err as Error).message);
    }
  }

  return (
    <div className="rounded-xl border bg-white p-5">
      <h2 className="font-semibold text-gray-900">Register as Player</h2>
      <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-3">
        <input
          type="password"
          placeholder="Your Stellar secret key (S...)"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          required
          className="rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {status === 'loading' ? 'Registering…' : 'Register & Pay Entry Fee'}
        </button>
        {message && (
          <p className={`text-sm ${status === 'success' ? 'text-green-600' : 'text-red-500'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
