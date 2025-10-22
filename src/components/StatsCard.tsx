import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  value: string;
  label: string;
  description?: string;
  icon?: LucideIcon | React.ReactNode;
  accentColor?: 'cyan' | 'magenta' | 'gradient';
  index?: number;
}

const StatsCard = ({ value, label, description, icon: Icon, accentColor = 'cyan', index = 0 }: StatsCardProps) => {
  const rotations = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2'];
  const rotation = rotations[index % rotations.length];
  
  const bgColors = {
    cyan: 'bg-pelambre-indigo',
    magenta: 'bg-pelambre-magenta',
    gradient: 'bg-pelambre-bittersweet',
  };

  const accentElements = {
    cyan: 'bg-pelambre-lemon',
    magenta: 'bg-pelambre-indigo',
    gradient: 'bg-pelambre-magenta',
  };

  const bgColor = bgColors[accentColor];
  const accentBg = accentElements[accentColor];

  return (
    <div 
      className={cn(
        "pelambre-border rounded-2xl p-8 transition-all duration-500 hover:rotate-0 hover:scale-105 hover:shadow-2xl group",
        bgColor,
        rotation
      )}
      style={{
        animationDelay: `${index * 0.1}s`
      }}
    >
      {/* Decorative Corner Element */}
      <div className={cn(
        "absolute top-4 right-4 w-12 h-12 rotate-45 opacity-20",
        accentBg
      )} />

      <div className="relative space-y-4 text-white">
        {/* Icon */}
        {Icon && (
          <div className={cn(
            "inline-flex items-center justify-center w-16 h-16 rounded-full border-4 border-black transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110",
            accentBg,
            accentColor === 'gradient' ? 'text-white' : 'text-black'
          )}>
            {typeof Icon === 'function' ? <Icon className="w-8 h-8" strokeWidth={3} /> : Icon}
          </div>
        )}

        {/* Value */}
        <div className="font-display text-7xl md:text-8xl leading-none">
          {value}
        </div>

        {/* Label */}
        <div className="font-display text-2xl md:text-3xl uppercase tracking-wide">
          {label}
        </div>

        {/* Description */}
        {description && (
          <p className="font-sans text-lg opacity-90 pt-2 max-w-xs">
            {description}
          </p>
        )}

        {/* Diagonal Line Accent */}
        <div className={cn(
          "absolute bottom-4 left-4 w-20 h-1 rotate-45",
          accentBg
        )} />
      </div>
    </div>
  );
};

export default StatsCard;
