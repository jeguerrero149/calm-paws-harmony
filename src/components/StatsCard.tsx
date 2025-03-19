
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
        "rounded-2xl p-6 bg-gradient-to-br transition-all duration-300 hover:shadow-lg hover-scale animate-reveal-up",
        getColorClasses()
      )}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="flex items-start">
        <div className="mr-4 p-3 bg-white dark:bg-calmpets-dark/40 rounded-xl shadow-md">
          {icon}
        </div>
        <div>
          <h3 className="font-display text-3xl font-bold">{value}</h3>
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
