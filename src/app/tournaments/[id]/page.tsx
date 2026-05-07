'use client';

import { useEffect, useState } from 'react';
import { use } from 'react';
import type { Tournament, VotesResponse, Payout } from '@/lib/types';
import { getTournament, getVotes, getPayouts } from '@/lib/api';
import { toXLM, shortenAddress, displayPrize } from '@/lib/utils';
import StatusBadge from '@/components/StatusBadge';
import RegisterForm from '@/components/RegisterForm';
import VoteForm from '@/components/VoteForm';

export default function TournamentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const numId = Number(id);

  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [votes, setVotes] = useState<VotesResponse | null>(null);
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      getTournament(numId),
      getVotes(numId),
      getPayouts(numId),
    ])
      .then(([t, v, p]) => {
        setTournament(t);
        setVotes(v);
        setPayouts(p);
      })
      .catch((e: Error) => setError(e.message));
  }, [numId]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!tournament) return <p className="text-gray-500">Loading…</p>;

  const prize = displayPrize(tournament.prize_pool, tournament.prize_model);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Tournament #{tournament.id}
          </h1>
          <p className="text-sm text-gray-500">
            Organizer: {shortenAddress(tournament.organizer)}
          </p>
        </div>
        <StatusBadge status={tournament.status} />
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-2 gap-4 rounded-xl border bg-white p-5 sm:grid-cols-4">
        {[
          { label: 'Prize Pool', value: `${toXLM(tournament.prize_pool)} XLM` },
          { label: 'Entry Fee', value: `${toXLM(tournament.entry_fee)} XLM` },
          { label: 'Players', value: `${tournament.players.length}/${tournament.max_players}` },
          { label: 'Model', value: tournament.prize_model },
        ].map(({ label, value }) => (
          <div key={label} className="text-center">
            <p className="text-xs text-gray-500">{label}</p>
            <p className="mt-0.5 font-semibold text-gray-900">{value}</p>
          </div>
        ))}
      </div>

      {/* Prize distribution */}
      <div className="rounded-xl border bg-white p-5">
        <h2 className="font-semibold text-gray-900">Prize Distribution</h2>
        <div className="mt-2 flex gap-4 text-sm">
          <span>🥇 {prize.first?.toFixed(2)} XLM</span>
          {'second' in prize && <span>🥈 {prize.second?.toFixed(2)} XLM</span>}
          {'third' in prize && <span>🥉 {prize.third?.toFixed(2)} XLM</span>}
        </div>
      </div>

      {/* Players */}
      <div className="rounded-xl border bg-white p-5">
        <h2 className="font-semibold text-gray-900">
          Players ({tournament.players.length})
        </h2>
        {tournament.players.length === 0 ? (
          <p className="mt-2 text-sm text-gray-400">No players yet.</p>
        ) : (
          <ul className="mt-2 space-y-1">
            {tournament.players.map((p) => (
              <li key={p} className="font-mono text-xs text-gray-700">
                {p}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Votes */}
      {votes && (
        <div className="rounded-xl border bg-white p-5">
          <h2 className="font-semibold text-gray-900">
            Referee Votes ({votes.votes.length}/{tournament.consensus_threshold} needed)
          </h2>
          {votes.votes.length === 0 ? (
            <p className="mt-2 text-sm text-gray-400">No votes yet.</p>
          ) : (
            <ul className="mt-2 space-y-1 text-sm">
              {votes.votes.map((v) => (
                <li key={v.referee} className="flex justify-between">
                  <span className="font-mono text-xs text-gray-500">
                    {shortenAddress(v.referee)}
                  </span>
                  <span className="font-mono text-xs">→ {shortenAddress(v.winner)}</span>
                </li>
              ))}
            </ul>
          )}
          {Object.keys(votes.tally).length > 0 && (
            <div className="mt-3 border-t pt-3">
              <p className="text-xs font-medium text-gray-500">Tally</p>
              {Object.entries(votes.tally).map(([addr, count]) => (
                <div key={addr} className="flex justify-between text-xs">
                  <span className="font-mono">{shortenAddress(addr)}</span>
                  <span>{count} vote{count !== 1 ? 's' : ''}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Payouts */}
      {payouts.length > 0 && (
        <div className="rounded-xl border bg-white p-5">
          <h2 className="font-semibold text-gray-900">Payouts</h2>
          <ul className="mt-2 space-y-1 text-sm">
            {payouts.map((p, i) => (
              <li key={i} className="flex justify-between">
                <span className="font-mono text-xs">{shortenAddress(p.recipient)}</span>
                <span className="font-medium">{toXLM(p.amount)} XLM</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Actions */}
      {tournament.status === 'RegistrationOpen' && (
        <RegisterForm tournamentId={numId} />
      )}
      {tournament.status === 'AwaitingResult' && (
        <VoteForm tournamentId={numId} players={tournament.players} />
      )}
    </div>
  );
}
