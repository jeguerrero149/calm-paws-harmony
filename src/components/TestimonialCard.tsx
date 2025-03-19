
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
      className="bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Rating stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star 
            key={i} 
            size={18} 
            className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
          />
        ))}
      </div>

      {/* Comment */}
      <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
        "{comment}"
      </p>

      {/* User info */}
      <div className="flex items-center">
        {image ? (
          <img 
            src={image} 
            alt={name} 
            className="h-12 w-12 rounded-full object-cover mr-4" 
          />
        ) : (
          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-calmpets-cyan to-calmpets-magenta flex items-center justify-center text-white font-medium text-lg mr-4">
            {name.charAt(0)}
          </div>
        )}
        <div>
          <h4 className="font-bold text-lg">{name}</h4>
          {position && (
            <p className="text-gray-500 dark:text-gray-400 text-sm">{position}</p>
          )}
          {petName && (
            <p className="text-sm">
              <span className="text-calmpets-cyan">{petName}</span> · 
              <span className="text-calmpets-magenta ml-1">{petType}</span>
            </p>
          )}
          <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">{date}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
