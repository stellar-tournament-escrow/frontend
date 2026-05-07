import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-10 py-16 text-center">
      <div>
        <h1 className="text-4xl font-bold text-gray-900">
          🏆 Tournament Escrow
        </h1>
        <p className="mt-3 max-w-xl text-lg text-gray-600">
          Decentralized esports prize pools on Stellar. Funds locked on-chain,
          released automatically when referees reach consensus.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {[
          { icon: '🔒', title: 'Trustless Escrow', desc: 'Prize money locked on-chain — no organizer can run away.' },
          { icon: '⚖️', title: 'Oracle Consensus', desc: 'Multiple referees must agree before funds are released.' },
          { icon: '⚡', title: 'Instant Payouts', desc: 'Stellar settles in seconds with near-zero fees.' },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="text-3xl">{icon}</div>
            <h2 className="mt-2 font-semibold text-gray-900">{title}</h2>
            <p className="mt-1 text-sm text-gray-500">{desc}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <Link
          href="/tournaments"
          className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Browse Tournaments
        </Link>
        <Link
          href="/tournaments/create"
          className="rounded-lg border border-indigo-600 px-6 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-50"
        >
          Create Tournament
        </Link>
      </div>
    </div>
  );
}
