'use client';

import { useEffect, useState } from 'react';
import type { Tournament, TournamentStatus } from '@/lib/types';
import { getTournaments } from '@/lib/api';
import TournamentCard from '@/components/TournamentCard';

const STATUSES: Array<TournamentStatus | 'All'> = [
  'All',
  'RegistrationOpen',
  'Started',
  'AwaitingResult',
  'Completed',
  'Cancelled',
  'Disputed',
];

export default function TournamentsPage() {
  const [filter, setFilter] = useState<TournamentStatus | 'All'>('All');
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    getTournaments(filter === 'All' ? undefined : filter)
      .then(setTournaments)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [filter]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Tournaments</h1>

      {/* Status filter */}
      <div className="mt-4 flex flex-wrap gap-2">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition ${
              filter === s
                ? 'bg-indigo-600 text-white'
                : 'bg-white border text-gray-600 hover:border-indigo-400'
            }`}
          >
            {s === 'All' ? 'All' : s.replace(/([A-Z])/g, ' $1').trim()}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {loading && <p className="text-gray-500">Loading…</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && tournaments.length === 0 && (
          <p className="text-gray-500">No tournaments found.</p>
        )}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tournaments.map((t) => (
            <TournamentCard key={t.id} t={t} />
          ))}
        </div>
      </div>
    </div>
  );
}
