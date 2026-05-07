<<<<<<< HEAD
# frontend
Frontend platform for players, organizers, and referees to join tournaments, manage prize pools, verify results, track brackets, and claim Stellar-based rewards.
=======
# 🏆 Tournament Escrow — Frontend

Decentralized esports prize pool platform built on [Stellar](https://stellar.org). Prize money is locked on-chain via Soroban smart contracts and released automatically when trusted referees reach consensus — no organizer can run away with the funds.

## Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4**
- **Stellar Soroban** smart contracts (backend)
- **Jest + Testing Library** for tests

## Features (implemented)

| Feature | Route |
|---------|-------|
| Browse tournaments with status filter | `/tournaments` |
| Tournament detail — info, players, votes, payouts | `/tournaments/[id]` |
| Create tournament (organizer) | `/tournaments/create` |
| Register as player & pay entry fee | `/tournaments/[id]` |
| Submit referee vote | `/tournaments/[id]` |
| Live updates via WebSocket | hook: `useTournamentSocket` |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Copy `.env.local.example` to `.env.local` and fill in the values:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_WS_URL=ws://localhost:3002
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_TOKEN_XLM=C...
NEXT_PUBLIC_TOKEN_USDC=C...
NEXT_PUBLIC_ESCROW_CONTRACT_ID=C...
NEXT_PUBLIC_FACTORY_CONTRACT_ID=C...
NEXT_PUBLIC_ORACLE_CONTRACT_ID=C...
```

The backend must be running at `NEXT_PUBLIC_API_URL` before the UI can fetch data. See the `backend/` repo for setup.

## Scripts

```bash
npm run dev      # development server
npm run build    # production build
npm run test     # run tests
npm run lint     # lint
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # home
│   ├── tournaments/
│   │   ├── page.tsx                # list + filter
│   │   ├── [id]/page.tsx           # detail
│   │   └── create/page.tsx         # create form
├── components/
│   ├── Navbar.tsx
│   ├── StatusBadge.tsx
│   ├── TournamentCard.tsx
│   ├── RegisterForm.tsx
│   └── VoteForm.tsx
├── hooks/
│   └── useTournamentSocket.ts      # WebSocket live updates
└── lib/
    ├── api.ts                      # REST API client
    ├── types.ts                    # shared TypeScript types
    └── utils.ts                    # stroops↔XLM, prize display
```

## Tournament Lifecycle

```
RegistrationOpen → Started → AwaitingResult → Completed
                                    ↓
                               Disputed → resolve → Completed
[any state] → Cancelled → refunds issued
```

## Prize Models

| Model | Distribution |
|-------|-------------|
| WinnerTakesAll | 1st: 95%, Platform: 5% |
| Tiered | 1st: 60%, 2nd: 25%, 3rd: 15% |
| Custom | Organizer-defined off-chain |

## Token Amounts

All on-chain amounts are in **stroops** (`1 XLM = 10,000,000 stroops`). The UI converts automatically before display.

## Roadmap

- [ ] Wallet integration (Freighter / Stellar Wallet Kit)
- [ ] Organizer controls — start, cancel, await-result
- [ ] Dispute raise & resolve UI
- [ ] Payout manager & platform fee dashboard
- [ ] Leaderboard & player profiles
- [ ] NFT tournament tickets
- [ ] DAO governance for referee selection
>>>>>>> b9b8d9a (stellar-tournament-escrow frontend)
