import { Link, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const PaymentResult = () => {
  const [params] = useSearchParams();
  const status = params.get("bold-tx-status");
  const ref = (params.get("bold-order-id") ?? "").slice(0, 8).toUpperCase();
  const ok = status === "approved";
  const pending = status === "pending" || status === "processing";
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-24 text-center max-w-xl">
        <h1 className="font-display text-5xl uppercase mb-4">
          {ok ? "¡Pago recibido!" : pending ? "Pago en proceso" : "El pago no se completó"}
        </h1>
        {ref && <p className="mb-2">Pedido #{ref}</p>}
        <p className="mb-8 text-muted-foreground">
          {ok ? "Ya estamos preparando tu Fil-Chill. Te contactaremos para la entrega."
            : pending ? "Te avisaremos apenas se confirme."
            : "Puedes intentarlo de nuevo desde el carrito o escribirnos por WhatsApp."}
        </p>
        <Button asChild><Link to="/products">Volver a la tienda</Link></Button>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentResult;
