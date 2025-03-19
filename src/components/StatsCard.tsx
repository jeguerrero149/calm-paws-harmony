
import { cn } from "@/lib/utils";

interface StatsCardProps {
  value: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  accentColor?: "cyan" | "magenta" | "gradient";
  index: number;
}

const StatsCard = ({ 
  value, 
  label, 
  description, 
  icon, 
  accentColor = "gradient",
  index
}: StatsCardProps) => {
  const getColorClasses = () => {
    switch (accentColor) {
      case "cyan":
        return "from-calmpets-cyan/20 to-calmpets-cyan/5 text-calmpets-cyan";
      case "magenta":
        return "from-calmpets-magenta/20 to-calmpets-magenta/5 text-calmpets-magenta";
      case "gradient":
      default:
        return "from-calmpets-cyan/10 to-calmpets-magenta/10 text-foreground";
    }
  };

  return (
    <div 
      className={cn(
        "edgy-card p-6 bg-gradient-to-br transition-all duration-300 hover:shadow-lg transform hover:translate-y-[-5px] relative overflow-hidden group animate-reveal-up noise-overlay",
        getColorClasses()
      )}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Dynamic corner cuts */}
      <div className="absolute top-0 right-0 w-0 h-0 border-t-[25px] border-r-[25px] border-t-transparent border-r-white/20 dark:border-r-black/40"></div>
      <div className="absolute bottom-0 left-0 w-0 h-0 border-b-[15px] border-l-[15px] border-b-transparent border-l-white/20 dark:border-l-black/40"></div>
      
      {/* Diagonal decorative lines */}
      <div className="absolute -right-8 top-[30%] w-16 h-[2px] bg-calmpets-cyan/20 rotate-45 transform group-hover:scale-150 transition-transform duration-500"></div>
      <div className="absolute -left-8 bottom-[30%] w-16 h-[2px] bg-calmpets-magenta/20 -rotate-45 transform group-hover:scale-150 transition-transform duration-500"></div>
      
      <div className="flex items-start relative z-10">
        <div className="mr-4 p-3 bg-white dark:bg-calmpets-dark/40 rounded-lg shadow-md transform transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:translate-y-[-5px]">
          {icon}
        </div>
        <div>
          <h3 className="font-display text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-calmpets-cyan via-current to-calmpets-magenta animate-jitter">{value}</h3>
          <p className="font-medium text-base transform transition-transform duration-300 group-hover:translate-x-2">{label}</p>
          {description && (
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 transform transition-transform duration-300 group-hover:translate-x-1">{description}</p>
          )}
        </div>
      </div>
      
      {/* Dynamic background elements */}
      <div className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full bg-gradient-to-br from-calmpets-cyan/10 to-calmpets-magenta/10 blur-md transform scale-0 group-hover:scale-100 transition-transform duration-700"></div>
    </div>
  );
};

export default StatsCard;
