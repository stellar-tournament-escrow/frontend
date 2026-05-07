import Link from 'next/link';
import type { Tournament } from '@/lib/types';
import { toXLM, shortenAddress } from '@/lib/utils';
import StatusBadge from './StatusBadge';

export default function TournamentCard({ t }: { t: Tournament }) {
  return (
    <Link
      href={`/tournaments/${t.id}`}
      className="block rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs text-gray-400">#{t.id}</p>
          <p className="mt-0.5 font-semibold text-gray-900">
            {shortenAddress(t.organizer)}
          </p>
        </div>
        <StatusBadge status={t.status} />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center text-sm">
        <div>
          <p className="text-gray-500">Prize Pool</p>
          <p className="font-medium">{toXLM(t.prize_pool)} XLM</p>
        </div>
        <div>
          <p className="text-gray-500">Entry Fee</p>
          <p className="font-medium">{toXLM(t.entry_fee)} XLM</p>
        </div>
        <div>
          <p className="text-gray-500">Players</p>
          <p className="font-medium">
            {t.players.length}/{t.max_players}
          </p>
        </div>
      </div>
      <p className="mt-2 text-right text-xs text-gray-400">{t.prize_model}</p>
    </Link>
  );
}
