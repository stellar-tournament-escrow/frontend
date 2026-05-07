import { STATUS_COLORS, STATUS_LABELS } from '@/lib/utils';
import type { TournamentStatus } from '@/lib/types';

export default function StatusBadge({ status }: { status: TournamentStatus }) {
  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[status] ?? 'bg-gray-100 text-gray-700'}`}
    >
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}
