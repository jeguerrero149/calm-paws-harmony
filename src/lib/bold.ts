declare global {
  interface Window { BoldCheckout?: new (cfg: Record<string, string>) => { open: () => void } }
}

const SCRIPT = "https://checkout.bold.co/library/boldPaymentButton.js";

export const loadBold = () =>
  new Promise<void>((resolve, reject) => {
    if (window.BoldCheckout) return resolve();
    const existing = document.querySelector(`script[src="${SCRIPT}"]`);
    const s = (existing as HTMLScriptElement) ?? document.createElement("script");
    s.addEventListener("load", () => resolve());
    s.addEventListener("error", () => reject(new Error("bold")));
    if (!existing) { s.src = SCRIPT; document.head.appendChild(s); }
    // Bold dispatches this when ready
    window.addEventListener("boldCheckoutLoaded", () => resolve(), { once: true });
  });

export const openBoldCheckout = async (cfg: {
  orderId: string; amount: string; currency: string; apiKey: string; signature: string; description: string;
}) => {
  await loadBold();
  if (!window.BoldCheckout) throw new Error("bold");
  const checkout = new window.BoldCheckout({
    orderId: cfg.orderId,
    currency: cfg.currency,
    amount: cfg.amount,
    apiKey: cfg.apiKey,
    integritySignature: cfg.signature,
    description: cfg.description,
    redirectionUrl: `${window.location.origin}/pago`,
  });
  checkout.open();
};
