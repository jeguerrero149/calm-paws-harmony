import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  name: string;
  rating: number;
  comment: string;
  date: string;
  position?: string;
  petName?: string;
  petType?: string;
  image?: string;
  index?: number;
}

const TestimonialCard = ({ 
  name, 
  rating, 
  comment, 
  date, 
  position, 
  petName, 
  petType, 
  image,
  index = 0 
}: TestimonialCardProps) => {
  const rotations = ['rotate-2', '-rotate-1', 'rotate-1', '-rotate-2'];
  const rotation = rotations[index % rotations.length];

  const gradientBgs = [
    'from-pelambre-indigo/20 to-pelambre-magenta/20',
    'from-pelambre-lemon/30 to-pelambre-bittersweet/20',
    'from-pelambre-magenta/20 to-pelambre-indigo/20',
  ];
  const gradientBg = gradientBgs[index % gradientBgs.length];

  return (
    <div 
      className={cn(
        "pelambre-border bg-pelambre-cream rounded-2xl p-6 transition-all duration-500 hover:rotate-0 hover:scale-105 hover:shadow-2xl",
        rotation
      )}
      style={{
        animationDelay: `${index * 0.15}s`
      }}
    >
      {/* Decorative gradient background */}
      <div className={cn(
        "absolute inset-0 rounded-2xl bg-gradient-to-br opacity-30 -z-10",
        gradientBg
      )} />

      <div className="relative space-y-4">
        {/* Header with Avatar and Info */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="flex-shrink-0">
            {image ? (
              <div className="w-16 h-16 rounded-full border-3 border-black overflow-hidden bg-white">
                <img 
                  src={image} 
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full border-3 border-black bg-gradient-to-br from-pelambre-indigo to-pelambre-magenta flex items-center justify-center">
                <span className="font-display text-2xl text-white">
                  {name.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="flex-1 min-w-0">
            <div className="font-display text-2xl text-foreground truncate">
              {name}
            </div>
            {position && (
              <div className="font-sans text-sm text-foreground/70 truncate">
                {position}
              </div>
            )}
            {petName && petType && (
              <div className="font-sans text-sm text-foreground/70 truncate">
                🐶 {petName} • {petType}
              </div>
            )}
          </div>
        </div>

        {/* Rating */}
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                "w-5 h-5",
                i < rating 
                  ? "fill-pelambre-lemon stroke-black" 
                  : "fill-none stroke-black"
              )}
              strokeWidth={2}
            />
          ))}
        </div>

        {/* Comment */}
        <p className="font-sans text-lg italic text-foreground/90 leading-relaxed">
          "{comment}"
        </p>

        {/* Date Badge */}
        <div className="flex justify-end">
          <div className="pelambre-border-thin bg-white px-4 py-1 rotate-2">
            <span className="font-sans text-xs font-bold uppercase text-foreground/60">
              {date}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
