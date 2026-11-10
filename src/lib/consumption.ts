// Dosis diaria oficial de Fil-Chill (cucharadas o snacks) según peso del perro.
export const dailyDoses = (weightKg: number | null | undefined): number | null => {
  if (weightKg == null || weightKg <= 0) return null;
  if (weightKg <= 5) return 1;
  if (weightKg <= 10) return 2;
  if (weightKg <= 20) return 3;
  return 4;
};

export interface DogPurchase {
  date: string; // ISO fecha de la venta
  servings: number; // dosis por unidad (30 o 90)
  quantity: number;
}

export type ConsumptionStatus = 'active' | 'soon' | 'out' | 'unknown';

export interface ConsumptionEstimate {
  status: ConsumptionStatus;
  dosesPerDay: number | null;
  runOutDate: Date | null;
  daysLeft: number | null;
}

const DAY = 86_400_000;

/**
 * Estima cuándo se le acaba el producto a un perro. Las compras se encadenan:
 * si compró antes de terminar, el nuevo producto empieza cuando se acaba el anterior.
 */
export const estimateConsumption = (
  weightKg: number | null | undefined,
  purchases: DogPurchase[],
  now: Date = new Date(),
  soonThresholdDays = 7
): ConsumptionEstimate => {
  const dosesPerDay = dailyDoses(weightKg);
  if (!dosesPerDay || purchases.length === 0) {
    return { status: 'unknown', dosesPerDay, runOutDate: null, daysLeft: null };
  }
  const sorted = [...purchases].sort((a, b) => +new Date(a.date) - +new Date(b.date));
  let end = 0;
  for (const p of sorted) {
    const start = Math.max(+new Date(p.date), end);
    end = start + Math.floor((p.servings * p.quantity) / dosesPerDay) * DAY;
  }
  const runOutDate = new Date(end);
  const daysLeft = Math.ceil((end - +now) / DAY);
  const status: ConsumptionStatus = daysLeft <= 0 ? 'out' : daysLeft <= soonThresholdDays ? 'soon' : 'active';
  return { status, dosesPerDay, runOutDate, daysLeft };
};
