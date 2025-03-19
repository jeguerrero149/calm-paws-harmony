
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  id: string;
  name: string;
  position?: string;
  rating: number;
  comment: string;
  petName?: string;
  petType?: string;
  date: string;
  image?: string;
  index: number;
}

const TestimonialCard = ({
  name,
  position,
  rating,
  comment,
  petName,
  petType,
  date,
  image,
  index
}: TestimonialCardProps) => {
  return (
    <div 
      className="glass-card rounded-2xl p-6 sm:p-8 transition-all duration-500 hover:scale-105 hover:shadow-xl relative overflow-hidden"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Add diagonal decorative element for more dynamic look */}
      <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-calmpets-cyan/20 to-calmpets-magenta/20 rounded-full blur-xl"></div>
      <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-gradient-to-br from-calmpets-magenta/20 to-calmpets-cyan/20 rounded-full blur-xl"></div>

      {/* Rating with more dynamic presentation */}
      <div className="flex gap-1 mb-4 relative">
        <div className="absolute -left-2 -top-1 w-8 h-8 bg-calmpets-cyan/10 rounded-full blur-md"></div>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star 
            key={i} 
            size={18} 
            className={cn(
              "transition-all duration-300 transform hover:scale-110",
              i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"
            )} 
          />
        ))}
      </div>

      {/* Comment with more dynamic styling */}
      <p className="text-gray-700 dark:text-gray-300 mb-6 italic relative">
        <span className="absolute -left-2 top-0 text-4xl text-calmpets-cyan/20">"</span>
        <span className="relative z-10">{comment}</span>
        <span className="absolute -right-2 bottom-0 text-4xl text-calmpets-magenta/20">"</span>
      </p>

      {/* User info with more dynamic presentation */}
      <div className="flex items-center relative">
        <div className="absolute right-0 bottom-0 w-12 h-12 bg-calmpets-cyan/5 rounded-full blur-md"></div>
        <div className="flex-shrink-0 mr-4 relative group">
          {image ? (
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-calmpets-cyan to-calmpets-magenta opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
              <img 
                src={image} 
                alt={name} 
                className="h-12 w-12 rounded-full object-cover border-2 border-calmpets-cyan relative z-10" 
              />
            </div>
          ) : (
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-calmpets-cyan to-calmpets-magenta flex items-center justify-center text-white font-medium text-lg transform transition-transform duration-300 group-hover:scale-110 relative">
              <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <span className="relative z-10">{name.charAt(0)}</span>
            </div>
          )}
        </div>
        <div>
          <h4 className="font-medium text-base">{name}</h4>
          {position && (
            <p className="text-gray-500 dark:text-gray-400 text-sm">{position}</p>
          )}
          {petName && (
            <p className="text-sm">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-calmpets-cyan to-calmpets-cyan">
                {petName}
              </span> · 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-calmpets-magenta to-calmpets-magenta ml-1">
                {petType}
              </span>
            </p>
          )}
          <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">{date}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
