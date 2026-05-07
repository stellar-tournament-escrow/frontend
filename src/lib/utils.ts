import type { PrizeModel } from './types';

export const toXLM = (stroops: string): string =>
  (Number(stroops) / 1e7).toFixed(2);

export function displayPrize(prizePool: string, model: PrizeModel) {
  const total = Number(prizePool) / 1e7;
  if (model === 'WinnerTakesAll') return { first: total * 0.95 };
  if (model === 'Tiered')
    return { first: total * 0.6, second: total * 0.25, third: total * 0.15 };
  return { first: total * 0.95 };
}

export function shortenAddress(addr: string): string {
  if (!addr || addr.length < 10) return addr;
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

export const STATUS_LABELS: Record<string, string> = {
  RegistrationOpen: 'Registration Open',
  Started: 'Started',
  AwaitingResult: 'Awaiting Result',
  Completed: 'Completed',
  Cancelled: 'Cancelled',
  Disputed: 'Disputed',
};

export const STATUS_COLORS: Record<string, string> = {
  RegistrationOpen: 'bg-green-100 text-green-800',
  Started: 'bg-blue-100 text-blue-800',
  AwaitingResult: 'bg-yellow-100 text-yellow-800',
  Completed: 'bg-gray-100 text-gray-800',
  Cancelled: 'bg-red-100 text-red-800',
  Disputed: 'bg-orange-100 text-orange-800',
};
