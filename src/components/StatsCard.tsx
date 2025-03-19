
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
        "rounded-2xl p-6 bg-gradient-to-br transition-all duration-300 hover:shadow-lg transform hover:translate-y-[-5px] relative overflow-hidden group animate-reveal-up",
        getColorClasses()
      )}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Add diagonal slash for more dynamic look */}
      <div className="absolute -right-8 -top-8 w-16 h-16 bg-white/10 rotate-45 transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
      <div className="absolute -left-8 -bottom-8 w-16 h-16 bg-white/10 rotate-45 transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
      
      <div className="flex items-start relative z-10">
        <div className="mr-4 p-3 bg-white dark:bg-calmpets-dark/40 rounded-xl shadow-md transform transition-transform duration-300 group-hover:rotate-6">
          {icon}
        </div>
        <div>
          <h3 className="font-display text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-calmpets-cyan via-current to-calmpets-magenta">{value}</h3>
          <p className="font-medium text-base">{label}</p>
          {description && (
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
