export type TournamentStatus =
  | 'RegistrationOpen'
  | 'Started'
  | 'AwaitingResult'
  | 'Completed'
  | 'Cancelled'
  | 'Disputed';

export type PrizeModel = 'WinnerTakesAll' | 'Tiered' | 'Custom';

export interface Tournament {
  id: number;
  organizer: string;
  prize_pool: string;
  entry_fee: string;
  max_players: number;
  players: string[];
  referees: string[];
  status: TournamentStatus;
  consensus_threshold: number;
  prize_model: PrizeModel;
  token: string;
  created_at: number;
}

export interface Vote {
  tournament_id: number;
  referee: string;
  winner: string;
  submitted_at: number;
}

export interface Payout {
  tournament_id: number;
  recipient: string;
  amount: string;
  released_at: number;
}

export interface Dispute {
  id: number;
  tournament_id: number;
  raised_by: string;
  reason?: string;
  resolved: boolean;
  final_winner?: string;
}

export interface VotesResponse {
  votes: Vote[];
  tally: Record<string, number>;
}

export interface CreateTournamentPayload {
  organizer_secret: string;
  entry_fee: string;
  max_players: number;
  referees: string[];
  consensus_threshold: number;
  prize_model: PrizeModel;
  token: string;
  initial_prize: string;
}
