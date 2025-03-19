import { useState, useEffect } from 'react';
import { ArrowRight, Star, Heart, Shield, Check, Zap, Sparkles } from 'lucide-react';
import { cn } from "@/lib/utils";
const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    // Simulating image load
    setTimeout(() => setIsLoaded(true), 300);
  }, []);
  const benefits = [{
    icon: <Shield className="text-calmpets-cyan" size={20} />,
    text: "100% Natural"
  }, {
    icon: <Heart className="text-calmpets-magenta" size={20} />,
    text: "Veterinarios Aprueban"
  }, {
    icon: <Zap className="text-calmpets-cyan" size={20} />,
    text: "Fórmula Rápida"
  }, {
    icon: <Check className="text-calmpets-magenta" size={20} />,
    text: "Sin Efectos Secundarios"
  }];
  return <section className="pt-28 md:pt-36 pb-20 md:pb-32 overflow-hidden relative">
      {/* Dynamic background with extreme shapes and energy */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[80%] bg-calmpets-cyan/30 rounded-full blur-[150px] animate-pulse-gentle"></div>
        <div className="absolute -bottom-[20%] right-[5%] w-[60%] h-[70%] bg-calmpets-magenta/30 rounded-full blur-[120px] animate-pulse-gentle" style={{
        animationDelay: '1.5s'
      }}></div>
        <div className="absolute top-[40%] left-[30%] w-[35%] h-[40%] bg-calmpets-cyan/20 rounded-full blur-[80px] animate-pulse-gentle" style={{
        animationDelay: '1s'
      }}></div>
        
        {/* More dynamic decorative elements */}
        <div className="absolute top-[20%] right-[20%] w-12 h-12 bg-calmpets-cyan/40 rounded-full blur-sm animate-float" style={{
        animationDelay: '0.5s'
      }}></div>
        <div className="absolute bottom-[30%] left-[15%] w-10 h-10 bg-calmpets-magenta/40 rounded-full blur-sm animate-float" style={{
        animationDelay: '1.2s'
      }}></div>
        <div className="absolute top-[60%] right-[30%] w-16 h-16 bg-calmpets-cyan/30 rounded-full blur-md animate-float" style={{
        animationDelay: '2s'
      }}></div>
        
        {/* Add zigzag patterns for more energy */}
        <div className="absolute top-[15%] left-[25%] w-32 h-2 bg-calmpets-cyan/40 rounded-full transform rotate-45 animate-float"></div>
        <div className="absolute bottom-[25%] right-[20%] w-24 h-2 bg-calmpets-magenta/40 rounded-full transform -rotate-45 animate-float" style={{
        animationDelay: '1.8s'
      }}></div>
        <div className="absolute top-[45%] right-[10%] w-28 h-2 bg-calmpets-cyan/30 rounded-full transform rotate-[30deg] animate-float" style={{
        animationDelay: '0.7s'
      }}></div>
        
        {/* Add angular dynamic shapes */}
        <div className="absolute top-[35%] left-[50%] w-40 h-40 bg-white/5 dark:bg-white/10 backdrop-blur-md transform rotate-45 animate-rotate-slow"></div>
        <div className="absolute bottom-[15%] right-[40%] w-32 h-32 bg-white/5 dark:bg-white/10 backdrop-blur-md transform -rotate-12 animate-rotate-slow" style={{
        animationDelay: '2.5s'
      }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Hero Content - extremely dynamic and edgy */}
            <div className={cn("flex flex-col space-y-8 text-center lg:text-left transition-opacity duration-700", isLoaded ? "opacity-100" : "opacity-0")}>
              {/* Edgy, dynamic pill badge */}
              <div className="flex justify-center lg:justify-start">
                <div className="flex items-center gap-2 bg-gradient-to-r from-calmpets-cyan/30 to-calmpets-magenta/30 backdrop-blur-md px-6 py-2 rounded-full text-sm font-bold tracking-wide transform -skew-x-6 animate-pulse-gentle relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/10 dark:bg-white/5 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                  <Sparkles className="text-calmpets-cyan relative z-10" size={18} />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-calmpets-cyan to-calmpets-magenta relative z-10 uppercase letter-spacing-wide">VET APPROVED</span>
                </div>
              </div>

              {/* Main heading with extreme dynamic styling */}
              <h1 className="text-balance text-5xl md:text-6xl lg:text-7xl font-black leading-tight animate-reveal-up relative -ml-1">
                <span className="block transform hover:skew-x-3 transition-transform duration-300">Next-Level</span> 
                <span className="gradient-text relative inline-block transform hover:scale-110 transition-transform skew-x-6">Chill</span> for 
                <span className="gradient-text relative inline-block transform hover:scale-110 transition-transform -skew-x-6 ml-4">Stressed-out</span> 
                <span className="block transform hover:skew-x-3 transition-transform duration-300">Dogs</span>
              </h1>

              {/* Description with more vibrant approach */}
              <p className="text-gray-600 dark:text-gray-300 text-xl max-w-xl mx-auto lg:mx-0 animate-reveal-up transform skew-x-3" style={{
              animationDelay: '100ms'
            }}>Formulas naturales y sin efectos secundarios para calmar a tu mejor amigo cuando más lo necesita. </p>

              {/* CTA buttons with extreme dynamic design */}
              <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start pt-4 animate-reveal-up" style={{
              animationDelay: '200ms'
            }}>
                <button className="w-full sm:w-auto relative overflow-hidden group bg-gradient-to-r from-calmpets-cyan to-calmpets-magenta text-white font-bold px-10 py-4 rounded-full transition duration-300 shadow-xl transform hover:translate-y-[-5px] hover:scale-105">
                  <span className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>
                  <span className="relative z-10 flex items-center justify-center gap-3 uppercase tracking-wider">
                    Ver Productos
                    <ArrowRight size={20} className="transform group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </button>
                <button className="w-full sm:w-auto relative overflow-hidden group px-10 py-4 rounded-full transition duration-300 border-3 border-transparent hover:border-calmpets-cyan/70 transform hover:skew-x-3">
                  <span className="absolute inset-0 w-full h-full transition-all duration-500 ease-out transform translate-x-0 -skew-x-12 bg-white dark:bg-calmpets-dark group-hover:bg-transparent group-hover:skew-x-12"></span>
                  <span className="absolute inset-0 w-full h-full transition-all delay-150 duration-700 ease-out transform skew-x-12 bg-calmpets-cyan/20 dark:bg-calmpets-cyan/30 group-hover:bg-transparent group-hover:-skew-x-12"></span>
                  <span className="absolute inset-0 w-full h-full transition-all delay-300 duration-700 ease-out transform translate-x-0 skew-x-12 bg-calmpets-magenta/20 dark:bg-calmpets-magenta/30 group-hover:bg-transparent group-hover:-skew-x-12"></span>
                  <span className="relative text-gray-800 dark:text-white font-bold group-hover:text-calmpets-cyan uppercase tracking-wider">Conocer Más</span>
                </button>
              </div>

              {/* Benefits with more dynamic styling */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 animate-reveal-up" style={{
              animationDelay: '300ms'
            }}>
                {benefits.map((benefit, index) => <div key={index} className="flex flex-col items-center lg:items-start gap-3 transform transition-all duration-500 hover:scale-110 hover:rotate-3">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-white to-gray-100 dark:from-calmpets-dark/90 dark:to-calmpets-dark/70 shadow-lg relative overflow-hidden group transform skew-x-3">
                      <div className="absolute inset-0 bg-gradient-to-r from-calmpets-cyan/20 to-calmpets-magenta/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative z-10">
                        {benefit.icon}
                      </div>
                    </div>
                    <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 uppercase tracking-wide">{benefit.text}</span>
                  </div>)}
              </div>
            </div>

            {/* Hero Image with extreme dynamic presentation */}
            <div className={cn("relative transition-opacity duration-1000 transform skew-y-3 -rotate-3", isLoaded ? "opacity-100" : "opacity-0")}>
              <div className="relative z-10 p-6 rounded-3xl bg-gradient-to-br from-calmpets-cyan/40 to-calmpets-magenta/40 backdrop-blur-sm animate-fade-in overflow-hidden group">
                {/* Dynamic animated borders */}
                <div className="absolute inset-0 bg-gradient-to-r from-calmpets-cyan/50 to-calmpets-magenta/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-calmpets-cyan to-calmpets-magenta opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-500"></div>
                
                <div className="relative rounded-2xl overflow-hidden aspect-[5/6] transition-all duration-500 shadow-2xl transform group-hover:scale-[0.97]">
                  <div className="blur-load" style={{
                  backgroundImage: 'url(public/lovable-uploads/3436af3a-f1d7-400f-a8b7-f5e3adb764af.png)'
                }}>
                    <img src="public/lovable-uploads/f9fc22a2-880e-4f09-b2d6-6d4e7ceabe1a.png" alt="CalmPets producto para perros" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" onLoad={() => setIsLoaded(true)} />
                  </div>
                </div>
                
                {/* Edgy corners and accents */}
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[50px] border-r-[50px] border-t-transparent border-r-white/30 dark:border-r-black/60"></div>
                <div className="absolute bottom-0 left-0 w-0 h-0 border-b-[35px] border-l-[35px] border-b-transparent border-l-white/30 dark:border-l-black/60"></div>
              </div>

              {/* Dynamic decorative elements */}
              <div className="absolute top-[5%] -right-16 w-32 h-32 bg-calmpets-cyan/40 rounded-full blur-md animate-float"></div>
              <div className="absolute bottom-[10%] -left-16 w-32 h-32 bg-calmpets-magenta/40 rounded-full blur-md animate-float" style={{
              animationDelay: '1s'
            }}></div>
              <div className="absolute top-[30%] left-[10%] w-24 h-24 bg-calmpets-cyan/30 rounded-full blur-sm animate-float" style={{
              animationDelay: '2s'
            }}></div>
              <div className="absolute bottom-[30%] right-[15%] w-20 h-20 bg-calmpets-magenta/30 rounded-full blur-sm animate-float" style={{
              animationDelay: '1.5s'
            }}></div>
              
              {/* Angular accents */}
              <div className="absolute top-[20%] right-[40%] w-3 h-16 bg-calmpets-cyan/50 transform rotate-45"></div>
              <div className="absolute bottom-[40%] left-[30%] w-3 h-16 bg-calmpets-magenta/50 transform -rotate-45"></div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;