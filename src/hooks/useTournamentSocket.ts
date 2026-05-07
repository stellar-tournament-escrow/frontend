'use client';

import { useEffect, useRef, useCallback } from 'react';

export type WsEvent =
  | { type: 'tournament_updated'; data: { id: number; status: string } }
  | { type: 'vote_submitted'; data: { tournament_id: number; referee: string; winner: string } }
  | { type: 'prize_released'; data: { tournament_id: number; winner: string; amount: string } }
  | { type: 'dispute_raised'; data: { tournament_id: number; raised_by: string } };

export function useTournamentSocket(
  tournamentId: number,
  onEvent: (event: WsEvent) => void
) {
  const wsRef = useRef<WebSocket | null>(null);
  const onEventRef = useRef(onEvent);
  onEventRef.current = onEvent;

  const connect = useCallback(() => {
    const url = process.env.NEXT_PUBLIC_WS_URL ?? 'ws://localhost:3002';
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: 'subscribe', tournament_id: tournamentId }));
    };

    ws.onmessage = (e) => {
      try {
        const event = JSON.parse(e.data) as WsEvent;
        onEventRef.current(event);
      } catch {
        // ignore malformed messages
      }
    };

    ws.onclose = () => {
      // reconnect after 3s
      setTimeout(connect, 3000);
    };
  }, [tournamentId]);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
  }, [connect]);
}
