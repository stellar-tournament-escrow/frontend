import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TournamentCard from '@/components/TournamentCard';
import type { Tournament } from '@/lib/types';

// Mock next/link
jest.mock('next/link', () => {
  const Link = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  Link.displayName = 'Link';
  return Link;
});

const mockTournament: Tournament = {
  id: 1,
  organizer: 'GABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890ABCDEFGHIJKLMNOPQRSTU',
  prize_pool: '500000000',
  entry_fee: '10000000',
  max_players: 8,
  players: ['G1', 'G2'],
  referees: ['GREF1'],
  status: 'RegistrationOpen',
  consensus_threshold: 1,
  prize_model: 'WinnerTakesAll',
  token: 'CTOKEN',
  created_at: 1700000000,
};

describe('TournamentCard', () => {
  it('renders prize pool in XLM', () => {
    render(<TournamentCard t={mockTournament} />);
    expect(screen.getByText('50.00 XLM')).toBeInTheDocument();
  });

  it('renders player count', () => {
    render(<TournamentCard t={mockTournament} />);
    expect(screen.getByText('2/8')).toBeInTheDocument();
  });

  it('renders status badge', () => {
    render(<TournamentCard t={mockTournament} />);
    expect(screen.getByText('Registration Open')).toBeInTheDocument();
  });

  it('links to the tournament detail page', () => {
    render(<TournamentCard t={mockTournament} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/tournaments/1');
  });
});
