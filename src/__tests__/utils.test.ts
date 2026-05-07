import { toXLM, shortenAddress, displayPrize } from '@/lib/utils';

describe('toXLM', () => {
  it('converts stroops to XLM', () => {
    expect(toXLM('10000000')).toBe('1.00');
    expect(toXLM('500000000')).toBe('50.00');
    expect(toXLM('0')).toBe('0.00');
  });
});

describe('shortenAddress', () => {
  it('shortens a long address', () => {
    const addr = 'GABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890ABCDEFGHIJKLMNOPQRSTU';
    const result = shortenAddress(addr);
    expect(result).toContain('…');
    expect(result.length).toBeLessThan(addr.length);
  });

  it('returns short strings unchanged', () => {
    expect(shortenAddress('GABC')).toBe('GABC');
  });
});

describe('displayPrize', () => {
  it('WinnerTakesAll gives 95% to first', () => {
    const result = displayPrize('100000000', 'WinnerTakesAll'); // 10 XLM
    expect(result.first).toBeCloseTo(9.5);
  });

  it('Tiered splits 60/25/15', () => {
    const result = displayPrize('100000000', 'Tiered');
    expect(result.first).toBeCloseTo(6);
    expect((result as { second: number }).second).toBeCloseTo(2.5);
    expect((result as { third: number }).third).toBeCloseTo(1.5);
  });
});
