import type {
  Tournament,
  TournamentStatus,
  VotesResponse,
  Payout,
  Dispute,
  CreateTournamentPayload,
} from './types';

const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? 'Request failed');
  return data as T;
}

// Tournaments
export const getTournaments = (status?: TournamentStatus) =>
  request<Tournament[]>(`/tournaments${status ? `?status=${status}` : ''}`);

export const getTournament = (id: number) =>
  request<Tournament>(`/tournaments/${id}`);

export const createTournament = (payload: CreateTournamentPayload) =>
  request<{ tournament_id: number }>('/tournaments', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const startTournament = (id: number, organizer_secret: string) =>
  request<{ status: string }>(`/tournaments/${id}/start`, {
    method: 'POST',
    body: JSON.stringify({ organizer_secret }),
  });

export const cancelTournament = (id: number, organizer_secret: string) =>
  request<{ status: string }>(`/tournaments/${id}/cancel`, {
    method: 'POST',
    body: JSON.stringify({ organizer_secret }),
  });

export const awaitResult = (id: number, organizer_secret: string) =>
  request<{ status: string }>(`/tournaments/${id}/await-result`, {
    method: 'POST',
    body: JSON.stringify({ organizer_secret }),
  });

// Players
export const registerPlayer = (id: number, player_secret: string) =>
  request<{ registered: boolean }>(`/tournaments/${id}/register`, {
    method: 'POST',
    body: JSON.stringify({ player_secret }),
  });

// Votes
export const getVotes = (id: number) =>
  request<VotesResponse>(`/tournaments/${id}/votes`);

export const submitVote = (
  id: number,
  referee_secret: string,
  winner: string,
  runners_up?: string[]
) =>
  request<{ consensus_reached: boolean }>(`/tournaments/${id}/vote`, {
    method: 'POST',
    body: JSON.stringify({ referee_secret, winner, runners_up }),
  });

// Payouts
export const getPayouts = (id: number) =>
  request<Payout[]>(`/tournaments/${id}/payouts`);

// Disputes
export const getDisputes = (id: number) =>
  request<Dispute[]>(`/tournaments/${id}/disputes`);

export const raiseDispute = (
  id: number,
  caller_secret: string,
  reason: string
) =>
  request<{ disputed: boolean }>(`/tournaments/${id}/dispute`, {
    method: 'POST',
    body: JSON.stringify({ caller_secret, reason }),
  });
