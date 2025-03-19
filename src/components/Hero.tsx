
import { useState, useEffect } from 'react';
import { ArrowRight, Star, Heart, Shield, Check, Zap, Sparkles } from 'lucide-react';
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
    { icon: <Zap className="text-calmpets-cyan" size={20} />, text: "Fórmula Rápida" },
    { icon: <Check className="text-calmpets-magenta" size={20} />, text: "Sin Efectos Secundarios" },
  ];

  return (
    <section className="pt-20 md:pt-28 pb-14 md:pb-24 overflow-hidden relative">
      {/* Background decorations - more dynamic patterns */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-[30%] -left-[10%] w-[50%] h-[70%] bg-calmpets-cyan/20 rounded-full blur-[150px] animate-pulse-gentle"></div>
        <div className="absolute -bottom-[20%] right-[5%] w-[40%] h-[60%] bg-calmpets-magenta/20 rounded-full blur-[120px] animate-pulse-gentle" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-[40%] left-[30%] w-[25%] h-[30%] bg-calmpets-cyan/10 rounded-full blur-[80px] animate-pulse-gentle" style={{animationDelay: '1s'}}></div>
        
        {/* Add decorative elements */}
        <div className="absolute top-[20%] right-[20%] w-8 h-8 bg-calmpets-cyan/30 rounded-full blur-sm animate-float" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-[30%] left-[15%] w-6 h-6 bg-calmpets-magenta/30 rounded-full blur-sm animate-float" style={{animationDelay: '1.2s'}}></div>
        <div className="absolute top-[60%] right-[30%] w-10 h-10 bg-calmpets-cyan/20 rounded-full blur-md animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content - more dynamic and edgy */}
            <div className={cn(
              "flex flex-col space-y-6 text-center lg:text-left transition-opacity duration-700",
              isLoaded ? "opacity-100" : "opacity-0"
            )}>
              {/* Updated pill badge with more dynamism */}
              <div className="flex justify-center lg:justify-start">
                <div className="flex items-center gap-1.5 bg-gradient-to-r from-calmpets-cyan/20 to-calmpets-magenta/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium animate-fade-in">
                  <Sparkles className="text-calmpets-cyan" size={16} />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-calmpets-cyan to-calmpets-magenta">
                    Veterinarios Aprueban
                  </span>
                </div>
              </div>

              {/* Main heading with more dynamic styling */}
              <h1 className="text-balance text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-reveal-up relative">
                Next-Level <span className="gradient-text relative inline-block transform hover:scale-105 transition-transform">Chill</span> for <span className="gradient-text relative inline-block transform hover:scale-105 transition-transform">Stressed-out</span> Dogs
              </h1>

              {/* Description with more vibrant approach */}
              <p className="text-gray-600 dark:text-gray-300 text-lg max-w-xl mx-auto lg:mx-0 animate-reveal-up" style={{animationDelay: '100ms'}}>
                Formulado con ingredientes naturales como valeriana, manzanilla y lavanda para calmar a tu mejor amigo sin efectos secundarios.
              </p>

              {/* CTA buttons with more dynamic design */}
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-2 animate-reveal-up" style={{animationDelay: '200ms'}}>
                <button className="w-full sm:w-auto bg-gradient-to-r from-calmpets-cyan to-calmpets-magenta hover:opacity-90 text-white font-medium px-8 py-3 rounded-full transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2">
                  Ver Productos
                  <ArrowRight size={18} className="animate-pulse-gentle" />
                </button>
                <button className="w-full sm:w-auto relative overflow-hidden group px-8 py-3 rounded-full transition duration-300">
                  <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-white dark:bg-calmpets-dark group-hover:bg-transparent group-hover:skew-x-12"></span>
                  <span className="absolute inset-0 w-full h-full transition-all delay-150 duration-700 ease-out transform skew-x-12 bg-calmpets-cyan/10 dark:bg-calmpets-cyan/20 group-hover:bg-transparent group-hover:-skew-x-12"></span>
                  <span className="absolute inset-0 w-full h-full transition-all delay-300 duration-700 ease-out transform translate-x-0 skew-x-12 bg-calmpets-magenta/10 dark:bg-calmpets-magenta/20 group-hover:bg-transparent group-hover:-skew-x-12"></span>
                  <span className="relative text-gray-800 dark:text-white font-medium group-hover:text-calmpets-cyan">Conocer Más</span>
                </button>
              </div>

              {/* Benefits with more dynamic styling */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 animate-reveal-up" style={{animationDelay: '300ms'}}>
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex flex-col items-center lg:items-start gap-2 transform transition-all duration-500 hover:scale-105">
                    <div className="p-2 rounded-full bg-gradient-to-br from-white to-gray-100 dark:from-calmpets-dark/80 dark:to-calmpets-dark/60 shadow-md relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-r from-calmpets-cyan/10 to-calmpets-magenta/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative z-10">
                        {benefit.icon}
                      </div>
                    </div>
                    <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image with more dynamic presentation */}
            <div className={cn(
              "relative transition-opacity duration-1000",
              isLoaded ? "opacity-100" : "opacity-0"
            )}>
              <div className="relative z-10 p-4 rounded-3xl bg-gradient-to-br from-calmpets-cyan/30 to-calmpets-magenta/30 backdrop-blur-sm animate-fade-in overflow-hidden group">
                {/* Animated borders */}
                <div className="absolute inset-0 bg-gradient-to-r from-calmpets-cyan/40 to-calmpets-magenta/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative rounded-2xl overflow-hidden aspect-[5/6] transition-all duration-500 shadow-xl transform group-hover:scale-[0.98]">
                  <div className="blur-load" style={{backgroundImage: 'url(public/lovable-uploads/3436af3a-f1d7-400f-a8b7-f5e3adb764af.png)'}}>
                    <img
                      src="public/lovable-uploads/f9fc22a2-880e-4f09-b2d6-6d4e7ceabe1a.png"
                      alt="CalmPets producto para perros"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onLoad={() => setIsLoaded(true)}
                    />
                  </div>
                </div>
              </div>

              {/* Decorative elements with more dynamism */}
              <div className="absolute top-[5%] -right-10 w-24 h-24 bg-calmpets-cyan/30 rounded-full blur-md animate-float"></div>
              <div className="absolute bottom-[10%] -left-10 w-24 h-24 bg-calmpets-magenta/30 rounded-full blur-md animate-float" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-[30%] left-[10%] w-16 h-16 bg-calmpets-cyan/20 rounded-full blur-sm animate-float" style={{animationDelay: '2s'}}></div>
              <div className="absolute bottom-[30%] right-[15%] w-12 h-12 bg-calmpets-magenta/20 rounded-full blur-sm animate-float" style={{animationDelay: '1.5s'}}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
