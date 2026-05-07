'use client';

import { useState } from 'react';
import { submitVote } from '@/lib/api';

interface Props {
  tournamentId: number;
  players: string[];
}

export default function VoteForm({ tournamentId, players }: Props) {
  const [secret, setSecret] = useState('');
  const [winner, setWinner] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await submitVote(tournamentId, secret, winner);
      setStatus('success');
      setMessage(
        res.consensus_reached
          ? '✅ Consensus reached! Prize released.'
          : '✅ Vote submitted. Waiting for more referees.'
      );
      setSecret('');
    } catch (err) {
      setStatus('error');
      setMessage((err as Error).message);
    }
  }

  return (
    <div className="rounded-xl border bg-white p-5">
      <h2 className="font-semibold text-gray-900">Submit Referee Vote</h2>
      <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-3">
        <input
          type="password"
          placeholder="Referee secret key (S...)"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          required
          className="rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <select
          value={winner}
          onChange={(e) => setWinner(e.target.value)}
          required
          className="rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">Select winner…</option>
          {players.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {status === 'loading' ? 'Submitting…' : 'Submit Vote'}
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
