'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createTournament } from '@/lib/api';
import type { PrizeModel } from '@/lib/types';

export default function CreateTournamentPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    organizer_secret: '',
    entry_fee_xlm: '1',
    max_players: 8,
    referees: '',
    consensus_threshold: 2,
    prize_model: 'WinnerTakesAll' as PrizeModel,
    token: process.env.NEXT_PUBLIC_TOKEN_XLM ?? '',
    initial_prize_xlm: '50',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function set(field: string, value: string | number) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { tournament_id } = await createTournament({
        organizer_secret: form.organizer_secret,
        entry_fee: String(Math.round(Number(form.entry_fee_xlm) * 1e7)),
        max_players: form.max_players,
        referees: form.referees.split('\n').map((r) => r.trim()).filter(Boolean),
        consensus_threshold: form.consensus_threshold,
        prize_model: form.prize_model,
        token: form.token,
        initial_prize: String(Math.round(Number(form.initial_prize_xlm) * 1e7)),
      });
      router.push(`/tournaments/${tournament_id}`);
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="text-2xl font-bold text-gray-900">Create Tournament</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <Field label="Organizer Secret Key">
          <input
            type="password"
            required
            placeholder="S..."
            value={form.organizer_secret}
            onChange={(e) => set('organizer_secret', e.target.value)}
            className={inputCls}
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Entry Fee (XLM)">
            <input
              type="number"
              min="0"
              step="0.01"
              required
              value={form.entry_fee_xlm}
              onChange={(e) => set('entry_fee_xlm', e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Initial Prize (XLM)">
            <input
              type="number"
              min="0"
              step="0.01"
              required
              value={form.initial_prize_xlm}
              onChange={(e) => set('initial_prize_xlm', e.target.value)}
              className={inputCls}
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Max Players">
            <input
              type="number"
              min="2"
              max="256"
              required
              value={form.max_players}
              onChange={(e) => set('max_players', Number(e.target.value))}
              className={inputCls}
            />
          </Field>
          <Field label="Consensus Threshold">
            <input
              type="number"
              min="1"
              required
              value={form.consensus_threshold}
              onChange={(e) => set('consensus_threshold', Number(e.target.value))}
              className={inputCls}
            />
          </Field>
        </div>

        <Field label="Prize Model">
          <select
            value={form.prize_model}
            onChange={(e) => set('prize_model', e.target.value)}
            className={inputCls}
          >
            <option value="WinnerTakesAll">Winner Takes All</option>
            <option value="Tiered">Tiered (60/25/15)</option>
            <option value="Custom">Custom</option>
          </select>
        </Field>

        <Field label="Token Contract Address">
          <input
            type="text"
            required
            placeholder="C..."
            value={form.token}
            onChange={(e) => set('token', e.target.value)}
            className={inputCls}
          />
        </Field>

        <Field label="Referee Addresses (one per line)">
          <textarea
            required
            rows={3}
            placeholder="G..."
            value={form.referees}
            onChange={(e) => set('referees', e.target.value)}
            className={inputCls}
          />
        </Field>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? 'Creating…' : 'Create Tournament'}
        </button>
      </form>
    </div>
  );
}

const inputCls =
  'w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
      {children}
    </div>
  );
}
