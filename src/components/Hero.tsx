
import { useState, useEffect } from 'react';
import { ArrowRight, Star, Heart, Shield, Check } from 'lucide-react';
import { cn } from "@/lib/utils";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulating image load
    setTimeout(() => setIsLoaded(true), 300);
  }, []);

  const benefits = [
    { icon: <Shield className="text-calmpets-cyan" size={20} />, text: "100% Natural" },
    { icon: <Heart className="text-calmpets-magenta" size={20} />, text: "Veterinarios Aprueban" },
    { icon: <Star className="text-calmpets-cyan" size={20} />, text: "Fórmula Rápida" },
    { icon: <Check className="text-calmpets-magenta" size={20} />, text: "Sin Efectos Secundarios" },
  ];

  return (
    <section className="pt-20 md:pt-28 pb-14 md:pb-24 overflow-hidden relative">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-[30%] -left-[10%] w-[40%] h-[60%] bg-calmpets-cyan/10 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-[30%] -right-[10%] w-[40%] h-[60%] bg-calmpets-magenta/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className={cn(
              "flex flex-col space-y-6 text-center lg:text-left transition-opacity duration-700",
              isLoaded ? "opacity-100" : "opacity-0"
            )}>
              {/* Pill badge */}
              <div className="flex justify-center lg:justify-start">
                <div className="flex items-center gap-1.5 bg-calmpets-cyan/10 text-calmpets-cyan px-4 py-1.5 rounded-full text-sm font-medium animate-fade-in">
                  <div className="h-2 w-2 rounded-full bg-calmpets-cyan animate-pulse"></div>
                  Veterinarios Aprueban
                </div>
              </div>

              {/* Main heading */}
              <h1 className="text-balance text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-reveal-up">
                Next-Level <span className="gradient-text">Chill</span> for <span className="gradient-text">Stressed-out</span> Dogs
              </h1>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 text-lg max-w-xl mx-auto lg:mx-0 animate-reveal-up" style={{animationDelay: '100ms'}}>
                Formulado con ingredientes naturales como valeriana, manzanilla y lavanda para calmar a tu mejor amigo sin efectos secundarios.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-2 animate-reveal-up" style={{animationDelay: '200ms'}}>
                <button className="w-full sm:w-auto bg-gradient-to-r from-calmpets-cyan to-calmpets-magenta hover:opacity-90 text-white font-medium px-8 py-3 rounded-full transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                  Ver Productos
                  <ArrowRight size={18} />
                </button>
                <button className="w-full sm:w-auto text-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 hover:border-calmpets-cyan dark:hover:border-calmpets-cyan font-medium px-8 py-3 rounded-full transition duration-300">
                  Conocer Más
                </button>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 animate-reveal-up" style={{animationDelay: '300ms'}}>
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex flex-col items-center lg:items-start gap-2">
                    <div className="p-2 rounded-full bg-white dark:bg-calmpets-dark/60 shadow-md">
                      {benefit.icon}
                    </div>
                    <span className="text-sm font-medium">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image */}
            <div className={cn(
              "relative transition-opacity duration-1000",
              isLoaded ? "opacity-100" : "opacity-0"
            )}>
              <div className="relative z-10 p-2 rounded-3xl bg-gradient-to-br from-calmpets-cyan/20 to-calmpets-magenta/20 backdrop-blur-sm animate-fade-in">
                <div className="relative rounded-2xl overflow-hidden aspect-[5/6] transition-all duration-500 shadow-xl">
                  <div className="blur-load" style={{backgroundImage: 'url(public/lovable-uploads/3436af3a-f1d7-400f-a8b7-f5e3adb764af.png)'}}>
                    <img
                      src="public/lovable-uploads/f9fc22a2-880e-4f09-b2d6-6d4e7ceabe1a.png"
                      alt="CalmPets producto para perros"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      onLoad={() => setIsLoaded(true)}
                    />
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-[10%] -right-10 w-20 h-20 bg-calmpets-cyan/20 rounded-full blur-md animate-float"></div>
              <div className="absolute bottom-[10%] -left-10 w-20 h-20 bg-calmpets-magenta/20 rounded-full blur-md animate-float" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-[40%] left-[10%] w-10 h-10 bg-calmpets-cyan/30 rounded-full blur-sm animate-float" style={{animationDelay: '2s'}}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
