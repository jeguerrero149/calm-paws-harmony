
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
      style={{ 
        animationDelay: `${index * 150}ms`,
        clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)"
      }}
    >
      {/* Dynamic corner cuts with higher contrast */}
      <div className="absolute top-0 right-0 w-0 h-0 border-t-[35px] border-r-[35px] border-t-transparent border-r-white/30 dark:border-r-black/60"></div>
      <div className="absolute bottom-0 left-0 w-0 h-0 border-b-[25px] border-l-[25px] border-b-transparent border-l-white/30 dark:border-l-black/60"></div>
      
      {/* More dynamic background elements with increased size and vibrancy */}
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-calmpets-cyan/20 to-calmpets-magenta/20 rounded-full blur-xl transform group-hover:scale-150 transition-transform duration-700"></div>
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-br from-calmpets-magenta/20 to-calmpets-cyan/20 rounded-full blur-xl transform group-hover:rotate-90 transition-transform duration-700"></div>

      {/* Diagonal accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-calmpets-cyan to-calmpets-magenta transform origin-top-left rotate-3"></div>
      
      {/* Rating with more dynamic presentation and larger stars */}
      <div className="flex gap-1.5 mb-5 relative">
        <div className="absolute -left-3 -top-2 w-12 h-12 bg-calmpets-cyan/20 rounded-full blur-md"></div>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star 
            key={i} 
            size={22} 
            className={cn(
              "transition-all duration-300 transform hover:scale-125 hover:rotate-12",
              i < rating 
                ? "text-yellow-400 fill-yellow-400 animate-pulse-gentle" 
                : "text-gray-300 dark:text-gray-600"
            )} 
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>

      {/* Comment with more dynamic styling and larger quotes */}
      <p className="text-gray-700 dark:text-gray-300 mb-8 italic relative skewed-element">
        <span className="absolute -left-3 top-0 text-5xl text-calmpets-cyan/30">"</span>
        <span className="relative z-10 pl-5 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-calmpets-cyan group-hover:to-calmpets-magenta transition-all duration-500">
          {comment}
        </span>
        <span className="absolute -right-3 bottom-0 text-5xl text-calmpets-magenta/30">"</span>
      </p>

      {/* User info with more dynamic presentation and enhanced hover effects */}
      <div className="flex items-center relative z-10">
        <div className="absolute right-0 bottom-0 w-16 h-16 bg-calmpets-cyan/10 rounded-full blur-md"></div>
        <div className="flex-shrink-0 mr-5 relative group">
          {image ? (
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-calmpets-cyan to-calmpets-magenta opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
              <img 
                src={image} 
                alt={name} 
                className="h-14 w-14 rounded-full object-cover border-3 border-transparent group-hover:border-calmpets-cyan relative z-10 transition-all duration-500" 
              />
              <div className="absolute inset-0 rounded-full border-3 border-dashed border-calmpets-magenta/50 animate-rotate-slow"></div>
            </div>
          ) : (
            <div className="h-14 w-14 rounded-full bg-gradient-to-r from-calmpets-cyan to-calmpets-magenta flex items-center justify-center text-white font-medium text-lg transform transition-transform duration-500 group-hover:scale-110 relative">
              <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <span className="relative z-10 glitch-text" data-text={name.charAt(0)}>{name.charAt(0)}</span>
            </div>
          )}
        </div>
        <div className="transform transition-transform duration-500 group-hover:translate-x-2">
          <h4 className="font-display font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300">{name}</h4>
          {position && (
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{position}</p>
          )}
          {petName && (
            <p className="text-sm font-medium">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-calmpets-cyan to-calmpets-cyan">
                {petName}
              </span> · 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-calmpets-magenta to-calmpets-magenta ml-1">
                {petType}
              </span>
            </p>
          )}
          <p className="text-gray-500 dark:text-gray-400 text-xs mt-1 italic">{date}</p>
        </div>
      </div>
      
      {/* Add edge accent at the bottom */}
      <div className="absolute bottom-0 right-0 w-3/4 h-1 bg-gradient-to-l from-calmpets-magenta to-transparent"></div>
      
      {/* Diagonal slash decoration */}
      <div className="absolute top-1/4 right-3 w-1 h-10 bg-calmpets-cyan/30 transform rotate-45"></div>
      <div className="absolute bottom-1/4 left-3 w-1 h-10 bg-calmpets-magenta/30 transform -rotate-45"></div>
    </div>
  );
};

export default TestimonialCard;
