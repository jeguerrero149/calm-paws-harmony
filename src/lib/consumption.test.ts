import { describe, it, expect } from 'vitest';
import { dailyDoses, estimateConsumption } from './consumption';

describe('dailyDoses', () => {
  it('2-5 kg toma 1', () => expect(dailyDoses(4)).toBe(1));
  it('6-10 kg toma 2', () => expect(dailyDoses(8)).toBe(2));
  it('11-20 kg toma 3', () => expect(dailyDoses(15)).toBe(3));
  it('más de 20 kg toma 4', () => expect(dailyDoses(25)).toBe(4));
});

describe('estimateConsumption', () => {
  const now = new Date('2026-11-10T00:00:00Z');
  it('perro de 15 kg con 30 dosis dura 10 días', () => {
    const r = estimateConsumption(15, [{ date: '2026-11-01T00:00:00Z', servings: 30, quantity: 1 }], now);
    expect(r.runOutDate?.toISOString()).toBe('2026-11-11T00:00:00.000Z');
    expect(r.status).toBe('soon');
  });
  it('perro de 4 kg con 90 dosis dura 90 días', () => {
    const r = estimateConsumption(4, [{ date: '2026-11-01T00:00:00Z', servings: 90, quantity: 1 }], now);
    expect(r.daysLeft).toBe(81);
    expect(r.status).toBe('active');
  });
  it('compras encadenadas suman duración', () => {
    const r = estimateConsumption(8, [
      { date: '2026-10-01T00:00:00Z', servings: 30, quantity: 1 },
      { date: '2026-10-05T00:00:00Z', servings: 30, quantity: 1 },
    ], now);
    expect(r.runOutDate?.toISOString()).toBe('2026-10-31T00:00:00.000Z');
    expect(r.status).toBe('out');
  });
});
