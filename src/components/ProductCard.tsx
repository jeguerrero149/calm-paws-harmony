
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
      className="group relative rounded-2xl overflow-hidden transition-all duration-500 bg-white dark:bg-calmpets-dark/60 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product image with diagonal slash design */}
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

        {/* Diagonal overlay for more dynamic look */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-calmpets-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Category tag with updated style */}
        <span className="absolute top-4 left-4 bg-white/80 dark:bg-calmpets-dark/80 backdrop-blur-sm text-xs font-medium px-3 py-1 rounded-full transform -skew-x-6">
          {category}
        </span>

        {/* New tag with more dynamic style */}
        {isNew && (
          <span className="absolute top-4 right-4 bg-gradient-to-r from-calmpets-cyan to-calmpets-magenta text-white text-xs font-bold px-3 py-1 rounded-full transform skew-x-6 animate-pulse-gentle">
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
              "p-2 rounded-full bg-white dark:bg-calmpets-dark shadow-md transition-all duration-300 transform hover:scale-110",
              isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-500"
            )}
            aria-label="Añadir a favoritos"
          >
            <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      {/* Product info with more dynamic styling */}
      <div className="p-5 relative">
        {/* Diagonal divider for more edgy look */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-calmpets-cyan/20 via-calmpets-magenta/20 to-transparent transform -rotate-1"></div>
        
        <div className="flex items-start justify-between">
          <h3 className="font-display font-semibold text-lg truncate">{name}</h3>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star size={14} fill="currentColor" />
            <span className="text-sm font-medium">4.9</span>
          </div>
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 line-clamp-2">{description}</p>
        
        {/* Tags with more dynamic styling */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className="inline-flex items-center text-xs font-medium bg-gradient-to-r from-gray-100 to-transparent dark:from-gray-800 dark:to-gray-800/50 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full transform hover:scale-105 transition-transform"
            >
              <span className="mr-1 text-calmpets-cyan"><Check size={10} /></span>
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
          <div className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-calmpets-magenta to-calmpets-cyan">
            ${price.toFixed(2)}
          </div>
          <button className="flex items-center gap-1.5 bg-gradient-to-r from-calmpets-cyan to-calmpets-magenta hover:opacity-90 text-white font-medium px-4 py-2 rounded-full transition shadow-md hover:shadow-lg transform hover:scale-105">
            <ShoppingCart size={16} className="animate-pulse-gentle" />
            <span>Añadir</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
