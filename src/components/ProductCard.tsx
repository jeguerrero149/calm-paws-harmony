
import { useState } from 'react';
import { Heart, ShoppingCart, Star, Check } from 'lucide-react';
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  tags: string[];
  isNew?: boolean;
}

const ProductCard = ({
  id,
  name,
  description,
  price,
  image,
  category,
  tags,
  isNew = false
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div 
      className="group relative rounded-2xl overflow-hidden transition-all duration-500 bg-white dark:bg-calmpets-dark/60 shadow-lg hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product image */}
      <div className="relative h-[280px] overflow-hidden">
        <div 
          className={cn(
            "blur-load",
            imageLoaded ? "loaded" : ""
          )}
          style={{
            backgroundImage: `url(${image.replace(/\.[^/.]+$/, "-small.jpg")})`,
            backgroundColor: 'rgba(0,0,0,0.05)'
          }}
        >
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Category tag */}
        <span className="absolute top-4 left-4 bg-white/80 dark:bg-calmpets-dark/80 backdrop-blur-sm text-xs font-medium px-3 py-1 rounded-full">
          {category}
        </span>

        {/* New tag */}
        {isNew && (
          <span className="absolute top-4 right-4 bg-gradient-to-r from-calmpets-cyan to-calmpets-magenta text-white text-xs font-bold px-3 py-1 rounded-full">
            NUEVO
          </span>
        )}

        {/* Actions */}
        <div 
          className={cn(
            "absolute right-4 bottom-4 flex flex-col gap-2 transition-all duration-300",
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          )}
        >
          <button 
            onClick={() => setIsFavorite(!isFavorite)}
            className={cn(
              "p-2 rounded-full bg-white dark:bg-calmpets-dark shadow-md transition-colors duration-300",
              isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-500"
            )}
            aria-label="Añadir a favoritos"
          >
            <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      {/* Product info */}
      <div className="p-5">
        <div className="flex items-start justify-between">
          <h3 className="font-display font-semibold text-lg truncate">{name}</h3>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star size={14} fill="currentColor" />
            <span className="text-sm font-medium">4.9</span>
          </div>
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 line-clamp-2">{description}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className="inline-flex items-center text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full"
            >
              <span className="mr-1 text-calmpets-cyan"><Check size={10} /></span>
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
          <div className="text-lg font-semibold text-calmpets-magenta">
            ${price.toFixed(2)}
          </div>
          <button className="flex items-center gap-1.5 bg-gradient-to-r from-calmpets-cyan to-calmpets-magenta hover:opacity-90 text-white font-medium px-4 py-2 rounded-full transition shadow-md hover:shadow-lg">
            <ShoppingCart size={16} />
            <span>Añadir</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
