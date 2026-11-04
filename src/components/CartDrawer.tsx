import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2, ArrowLeft, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useCartStore } from "@/stores/cartStore";

const formatCOP = (value: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

const checkoutSchema = z.object({
  name: z.string().trim().min(3, "Escribe tu nombre completo").max(100),
  phone: z.string().trim().regex(/^\+?[0-9 ]{7,15}$/, "Celular inválido"),
  email: z.string().trim().email("Email inválido").max(255).or(z.literal("")),
  document: z.string().trim().regex(/^[0-9]{5,12}$/, "Cédula inválida (solo números)"),
  address: z.string().trim().min(5, "Escribe la dirección completa").max(200),
  city: z.string().trim().min(2, "Escribe la ciudad").max(80),
  department: z.string().trim().min(2, "Escribe el departamento").max(80),
  notes: z.string().trim().max(500),
});
type CheckoutForm = z.infer<typeof checkoutSchema>;
const emptyForm: CheckoutForm = { name: "", phone: "", email: "", document: "", address: "", city: "", department: "", notes: "" };

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"cart" | "shipping">("cart");
  const [form, setForm] = useState<CheckoutForm>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutForm, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCartStore();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const whatsappOrderUrl = `https://wa.me/573145056764?text=${encodeURIComponent(
    `¡Hola! Quiero hacer este pedido 🐶\n\n${items.map(item =>
      `• ${item.name} x${item.quantity} - $${formatCOP(item.price * item.quantity)} COP`
    ).join('\n')}\n\nTotal: $${formatCOP(totalPrice)} COP`
  )}`;

  const handleSubmitOrder = async () => {
    const parsed = checkoutSchema.safeParse(form);
    if (!parsed.success) {
      const errs: Partial<Record<keyof CheckoutForm, string>> = {};
      parsed.error.issues.forEach(i => { errs[i.path[0] as keyof CheckoutForm] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    const d = parsed.data;
    const { data: orderId, error } = await supabase.rpc("create_checkout_order", {
      _name: d.name, _phone: d.phone, _email: d.email, _document: d.document,
      _address: d.address, _city: d.city, _department: d.department, _notes: d.notes,
      _items: items.map(i => ({ product_id: i.productId, quantity: i.quantity })),
    });
    setSubmitting(false);
    if (error || !orderId) {
      toast.error("No pudimos registrar tu pedido. Intenta de nuevo.");
      return;
    }
    const ref = String(orderId).slice(0, 8).toUpperCase();
    const productList = items.map(item =>
      `• ${item.name} x${item.quantity} - $${formatCOP(item.price * item.quantity)} COP`
    ).join('\n');
    const message = encodeURIComponent(
      `¡Hola! Hice el pedido #${ref} 🐶\n\n${productList}\n\nTotal: $${formatCOP(totalPrice)} COP\n\nEnvío a: ${d.name}, ${d.address}, ${d.city} (${d.department}). Cel: ${d.phone}`
    );
    window.open(`https://wa.me/573145056764?text=${message}`, '_blank');
    toast.success(`Pedido #${ref} registrado`);
    clearCart();
    setForm(emptyForm);
    setStep("cart");
    setIsOpen(false);
  };

  const field = (key: keyof CheckoutForm, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div className="space-y-1">
      <Label htmlFor={`co-${key}`}>{label}</Label>
      <Input
        id={`co-${key}`}
        value={form[key]}
        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
        aria-invalid={!!errors[key]}
        {...props}
      />
      {errors[key] && <p className="text-sm text-destructive">{errors[key]}</p>}
    </div>
  );

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative" aria-label="Carrito de compras">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-accent">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle>Carrito de Compras</SheetTitle>
          <SheetDescription>
            {totalItems === 0 ? "Tu carrito está vacío" : `${totalItems} producto${totalItems !== 1 ? 's' : ''} en tu carrito`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Tu carrito está vacío</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.productId} className="flex gap-4 p-2">
                      <div className="w-16 h-16 bg-secondary/20 rounded-md overflow-hidden flex-shrink-0">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{item.name}</h4>
                        <p className="font-semibold">
                          ${formatCOP(item.price)} COP
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          aria-label={`Quitar ${item.name}`}
                          onClick={() => removeItem(item.productId)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>

                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            aria-label="Disminuir cantidad"
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            aria-label="Aumentar cantidad"
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {step === "shipping" && (
                <div className="flex-shrink-0 max-h-[50vh] overflow-y-auto border-t pt-4 space-y-3 pr-2">
                  <h3 className="font-semibold text-lg">Datos de entrega</h3>
                  {field("name", "Nombre completo *", { autoComplete: "name" })}
                  {field("phone", "Celular *", { type: "tel", autoComplete: "tel", placeholder: "300 123 4567" })}
                  {field("document", "Cédula *", { inputMode: "numeric" })}
                  {field("email", "Email (opcional)", { type: "email", autoComplete: "email" })}
                  {field("address", "Dirección *", { autoComplete: "street-address", placeholder: "Calle, número, apto/casa" })}
                  <div className="grid grid-cols-2 gap-3">
                    {field("city", "Ciudad *")}
                    {field("department", "Departamento *")}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="co-notes">Notas (opcional)</Label>
                    <Textarea id="co-notes" maxLength={500} value={form.notes}
                      onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
                  </div>
                </div>
              )}

              <div className="flex-shrink-0 space-y-3 pt-4 border-t bg-background">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-xl font-bold">
                    ${formatCOP(totalPrice)} COP
                  </span>
                </div>

                {step === "cart" ? (
                  <div className="space-y-2">
                    <Button onClick={() => setStep("shipping")} className="w-full" size="lg">
                      Pagar en línea
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">PSE, Nequi, Daviplata o tarjeta</p>
                    <Button asChild variant="outline" className="w-full" size="lg">
                      <a href={whatsappOrderUrl} target="_blank" rel="noopener noreferrer">
                        Pedir por WhatsApp
                      </a>
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" size="lg" onClick={() => setStep("cart")} disabled={submitting}>
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <Button onClick={handleSubmitOrder} className="flex-1" size="lg" disabled={submitting}>
                      {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Confirmar pedido"}
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
