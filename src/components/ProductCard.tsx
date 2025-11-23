import { useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  id: string | number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  tags: string[];
  isNew?: boolean;
  shopifyProduct?: any;
}

const ProductCard = ({ name, description, price, image, category, tags, isNew, id, shopifyProduct }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const addItem = shopifyProduct ? require('@/stores/cartStore').useCartStore.getState().addItem : null;

  const bgColors = [
    'bg-pelambre-lemon',
    'bg-pelambre-magenta',
    'bg-pelambre-cream',
  ];
  
  const buttonColors = [
    'bg-pelambre-bittersweet text-white',
    'bg-pelambre-indigo text-white',
    'bg-pelambre-lemon text-black',
  ];

  const colorIndex = (typeof id === 'number' ? id : parseInt(id) || 0) % 3;
  const bgColor = bgColors[colorIndex];
  const buttonColor = buttonColors[colorIndex];

  const handleAddToCart = () => {
    if (!shopifyProduct || !addItem) return;
    
    const variant = shopifyProduct.node.variants.edges[0]?.node;
    if (!variant) return;

    const cartItem = {
      product: shopifyProduct,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || []
    };
    
    addItem(cartItem);
    
    const toast = require('sonner').toast;
    toast.success("¡Producto agregado!", {
      description: `${name} fue agregado a tu carrito`,
      position: "top-center",
    });
  };

  return (
    <div
      className={cn(
        "pelambre-border rounded-3xl p-6 transition-all duration-300 group cursor-pointer",
        bgColor,
        isHovered && "rotate-2 -translate-y-2 shadow-2xl"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative mb-4">
        <div className="border-2 border-black rounded-xl overflow-hidden bg-white">
          <div className="aspect-square relative">
            <img
              src={image}
              alt={name}
              className={cn(
                "w-full h-full object-cover transition-all duration-500",
                imageLoaded ? "blur-0 scale-100" : "blur-md scale-95",
                isHovered && "scale-110"
              )}
              onLoad={() => setImageLoaded(true)}
            />
            
            {/* Category Badge */}
            <div className="absolute top-3 left-3 pelambre-border-thin bg-primary text-primary-foreground px-3 py-1 rotate-2">
              <span className="font-display text-sm uppercase">{category}</span>
            </div>

            {/* New Badge */}
            {isNew && (
              <div className="absolute top-3 right-3 pelambre-border-thin bg-accent text-accent-foreground px-3 py-1 -rotate-2 animate-bounce-crazy">
                <span className="font-display text-sm uppercase">¡Nuevo!</span>
              </div>
            )}

            {/* Favorite Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFavorite(!isFavorite);
              }}
              className={cn(
                "absolute bottom-3 right-3 w-10 h-10 rounded-full border-2 border-black flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95",
                isFavorite 
                  ? "bg-accent text-accent-foreground rotate-12" 
                  : "bg-white text-foreground hover:rotate-12"
              )}
            >
              <Heart className={cn("w-5 h-5", isFavorite && "fill-current")} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <h3 className="font-display text-3xl uppercase leading-tight text-foreground">
          {name}
        </h3>
        
        <p className="font-sans text-base text-foreground/80 leading-relaxed">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="pelambre-border-thin bg-white px-3 py-1 font-sans text-xs font-bold uppercase"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Price and CTA */}
        <div className="flex justify-between items-end pt-4">
          <div>
            <span className="font-display text-5xl text-foreground">
              ${price}
            </span>
          </div>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            disabled={!shopifyProduct}
            className={cn(
              "pelambre-border-thin px-6 py-3 font-display text-xl uppercase inline-flex items-center gap-2 transition-all duration-300 hover:rotate-2 hover:scale-105 active:scale-95 active:rotate-0",
              buttonColor,
              !shopifyProduct && "opacity-50 cursor-not-allowed"
            )}
          >
            <ShoppingCart className="w-5 h-5" strokeWidth={2.5} />
            ¡Comprar!
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
