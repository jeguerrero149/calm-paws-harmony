import { useState } from 'react';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/stores/cartStore';
import type { SupabaseProduct } from '@/hooks/useSupabaseProducts';

const VIEW_LABELS = ['Frente', 'Respaldo', 'Tapa'];

const DOSES = [
  { weight: '2 - 5 kg', dose: 1 },
  { weight: '6 - 10 kg', dose: 2 },
  { weight: '11 - 20 kg', dose: 3 },
  { weight: 'Más de 20 kg', dose: 4 },
];

const formatCOP = (v: number) =>
  new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 }).format(v);

interface Props {
  product: SupabaseProduct;
  onAdded?: () => void;
}

const ProductDetail = ({ product, onAdded }: Props) => {
  const addItem = useCartStore((s) => s.addItem);
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const images = product.images;
  const isSnack = /snack/i.test(product.title);
  const unit = isSnack ? (n: number) => `${n} snack${n > 1 ? 's' : ''}` : (n: number) => `${n} cucharada${n > 1 ? 's' : ''}`;

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      addItem({ productId: product.id, name: product.title, price: product.price, image: images[0]?.url || '' });
    }
    toast.success('¡Agregado al carrito!', { description: `${qty} × ${product.title} 🐶` });
    onAdded?.();
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 md:gap-10">
      <div>
        <div className="border-2 border-black rounded-xl overflow-hidden bg-white aspect-square">
          {images[active] && (
            <img src={images[active].url} alt={`${product.title} - ${VIEW_LABELS[active] || ''}`} className="w-full h-full object-cover" />
          )}
        </div>
        {images.length > 1 && (
          <div className="grid grid-cols-3 gap-3 mt-3">
            {images.map((img, i) => (
              <button
                key={img.id}
                onClick={() => setActive(i)}
                className={cn(
                  'border-2 rounded-lg overflow-hidden bg-white aspect-square transition-transform',
                  i === active ? 'border-black scale-105' : 'border-black/20 hover:border-black/60'
                )}
                aria-label={`Ver ${VIEW_LABELS[i] || `imagen ${i + 1}`}`}
              >
                <img src={img.url} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-5">
        <div>
          {product.category && (
            <span className="pelambre-border-thin bg-primary text-primary-foreground px-3 py-1 font-display text-sm uppercase inline-block mb-3">
              {product.category}
            </span>
          )}
          <h1 className="font-display text-4xl md:text-5xl uppercase leading-none text-foreground">{product.title}</h1>
          <p className="font-display text-4xl mt-3 text-foreground">${formatCOP(product.price)}</p>
        </div>

        {product.description && (
          <p className="font-sans text-base text-foreground/80 leading-relaxed whitespace-pre-line">{product.description}</p>
        )}

        <div className="border-2 border-black rounded-xl overflow-hidden">
          <div className="bg-secondary text-secondary-foreground px-4 py-2 font-display uppercase">Dosis diaria según peso</div>
          <table className="w-full font-sans text-sm bg-card text-card-foreground">
            <tbody>
              {DOSES.map((d) => (
                <tr key={d.weight} className="border-t border-black/10">
                  <td className="px-4 py-2 font-bold">{d.weight}</td>
                  <td className="px-4 py-2">{unit(d.dose)} al día</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {product.tags.map((t) => (
              <span key={t} className="pelambre-border-thin bg-card px-3 py-1 font-sans text-xs font-bold uppercase">{t}</span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <div className="flex items-center pelambre-border-thin bg-card">
            <button className="p-3" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Menos"><Minus className="w-4 h-4" /></button>
            <span className="font-display text-xl w-8 text-center">{qty}</span>
            <button className="p-3" onClick={() => setQty((q) => Math.min(20, q + 1))} aria-label="Más"><Plus className="w-4 h-4" /></button>
          </div>
          <button
            onClick={handleAdd}
            className="pelambre-border-thin bg-primary text-primary-foreground px-6 py-3 font-display text-xl uppercase inline-flex items-center gap-2 transition-all hover:rotate-2 hover:scale-105 active:scale-95"
          >
            <ShoppingCart className="w-5 h-5" /> Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
