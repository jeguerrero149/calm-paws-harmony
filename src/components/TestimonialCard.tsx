
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
      className="edgy-card p-6 sm:p-8 transition-all duration-500 hover:scale-105 hover:shadow-xl relative overflow-hidden noise-overlay group"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Dynamic corner cuts */}
      <div className="absolute top-0 right-0 w-0 h-0 border-t-[25px] border-r-[25px] border-t-transparent border-r-white/20 dark:border-r-black/40"></div>
      <div className="absolute bottom-0 left-0 w-0 h-0 border-b-[15px] border-l-[15px] border-b-transparent border-l-white/20 dark:border-l-black/40"></div>
      
      {/* Dynamic background elements */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-calmpets-cyan/10 to-calmpets-magenta/10 rounded-full blur-xl transform group-hover:scale-125 transition-transform duration-700"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-calmpets-magenta/10 to-calmpets-cyan/10 rounded-full blur-xl transform group-hover:rotate-45 transition-transform duration-700"></div>

      {/* Rating with more dynamic presentation */}
      <div className="flex gap-1 mb-4 relative">
        <div className="absolute -left-2 -top-1 w-8 h-8 bg-calmpets-cyan/10 rounded-full blur-md"></div>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star 
            key={i} 
            size={18} 
            className={cn(
              "transition-all duration-300 transform hover:scale-110",
              i < rating 
                ? "text-yellow-400 fill-yellow-400 animate-pulse-gentle" 
                : "text-gray-300 dark:text-gray-600"
            )} 
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>

      {/* Comment with more dynamic styling */}
      <p className="text-gray-700 dark:text-gray-300 mb-6 italic relative skewed-element">
        <span className="absolute -left-2 top-0 text-4xl text-calmpets-cyan/20">"</span>
        <span className="relative z-10 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-calmpets-cyan group-hover:to-calmpets-magenta transition-colors duration-300">{comment}</span>
        <span className="absolute -right-2 bottom-0 text-4xl text-calmpets-magenta/20">"</span>
      </p>

      {/* User info with more dynamic presentation */}
      <div className="flex items-center relative">
        <div className="absolute right-0 bottom-0 w-12 h-12 bg-calmpets-cyan/5 rounded-full blur-md"></div>
        <div className="flex-shrink-0 mr-4 relative group">
          {image ? (
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-calmpets-cyan to-calmpets-magenta opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
              <img 
                src={image} 
                alt={name} 
                className="h-12 w-12 rounded-full object-cover border-2 border-transparent group-hover:border-calmpets-cyan relative z-10 transition-all duration-300" 
              />
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-calmpets-magenta/50 animate-rotate-slow"></div>
            </div>
          ) : (
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-calmpets-cyan to-calmpets-magenta flex items-center justify-center text-white font-medium text-lg transform transition-transform duration-300 group-hover:scale-110 relative">
              <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <span className="relative z-10 glitch-text" data-text={name.charAt(0)}>{name.charAt(0)}</span>
            </div>
          )}
        </div>
        <div className="transform transition-transform duration-500 group-hover:translate-x-2">
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
