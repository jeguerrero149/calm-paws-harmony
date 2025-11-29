import { useState, useEffect } from 'react';
import { ArrowRight, Heart, Award, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import isotipo from '@/assets/pelambre-isotipo.png';
const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  const benefits = [{
    icon: Heart,
    text: "100% Natural"
  }, {
    icon: Award,
    text: "Vet Approved"
  }, {
    icon: Sparkles,
    text: "Súper Rico"
  }];
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">
      {/* Fondo con bloques de color */}
      <div className="absolute inset-0 bg-pelambre-blocks opacity-10" />
      
      {/* Formas decorativas flotantes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-pelambre-indigo rounded-full border-4 border-black animate-float opacity-80" />
      <div className="absolute bottom-32 right-20 w-24 h-24 bg-pelambre-lemon rotate-45 border-4 border-black animate-bounce-crazy opacity-80" />
      <div className="absolute top-1/3 right-10 w-40 h-40 bg-pelambre-magenta rounded-3xl border-4 border-black rotate-12 animate-pulse-gentle opacity-70" />
      <div className="absolute bottom-20 left-20 w-28 h-28 bg-pelambre-bittersweet border-4 border-black -rotate-12 animate-float opacity-80" style={{
      borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%'
    }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className={cn("space-y-8 transition-all duration-1000", isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
            {/* Badge */}
            <div className="inline-block pelambre-border-thin bg-primary text-primary-foreground px-6 py-2 rotate-2 animate-wobble">
              <span className="font-display text-lg uppercase tracking-wider">
                ✨ Aprobado por Veterinarios
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl uppercase leading-tight tracking-tight">
              <span className="inline-block rotate-2 text-pelambre-bittersweet drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]" style={{
              textShadow: '3px 3px 0 rgba(0,0,0,0.2)'
            }}>Calma</span>{' '}
              <span className="inline-block -rotate-1 text-pelambre-violet font-black drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]" style={{
              textShadow: '3px 3px 0 rgba(0,0,0,0.2)'
            }}>Para</span>{' '}
              <span className="inline-block rotate-1 text-pelambre-lemon font-black drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]" style={{
              textShadow: '3px 3px 0 rgba(0,0,0,0.2)'
            }}>Perros</span>{' '}
              <span className="inline-block -rotate-2 text-pelambre-magenta font-black drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]" style={{
              textShadow: '3px 3px 0 rgba(0,0,0,0.2)'
            }}>Cool</span>
            </h1>

            {/* Description */}
            <p className={cn("font-sans text-xl md:text-2xl text-foreground/90 max-w-lg font-semibold transition-all duration-1000 delay-200", isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}> ¡Ayudamos a tu peludo a relajarse con estilo!</p>

            {/* CTA Buttons */}
            <div className={cn("flex flex-wrap gap-4 transition-all duration-1000 delay-300", isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
              <Link to="/products" className="group pelambre-border bg-accent text-accent-foreground px-8 py-4 font-display text-2xl uppercase inline-flex items-center gap-3 transition-all duration-300 hover:rotate-2 hover:scale-105 hover:shadow-2xl active:scale-95 active:rotate-0">
                Comprar Ahora
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link to="/about" className="pelambre-border-thin bg-card text-card-foreground px-8 py-4 font-display text-2xl uppercase inline-flex items-center gap-3 transition-all duration-300 hover:-rotate-2 hover:scale-105 hover:shadow-xl active:scale-95 active:rotate-0">
                Conocer Más
              </Link>
            </div>

            {/* Benefits Grid */}
            <div className={cn("grid grid-cols-3 gap-4 pt-8 transition-all duration-1000 delay-500", isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
              {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return <div key={index} className={cn("pelambre-border-thin bg-secondary text-secondary-foreground p-4 text-center transition-all duration-300 hover:rotate-3 hover:scale-110", index === 0 && "rotate-1", index === 1 && "-rotate-1", index === 2 && "rotate-2")}>
                    <Icon className="w-8 h-8 mx-auto mb-2" strokeWidth={3} />
                    <span className="font-display text-sm uppercase block">{benefit.text}</span>
                  </div>;
            })}
            </div>
          </div>

          {/* Hero Image */}
          <div className={cn("relative transition-all duration-1000 delay-300", isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95")}>
            <div className="relative">
              {/* Main Image Container */}
              <div className="pelambre-border bg-card p-4 rotate-3 hover:rotate-0 transition-all duration-500 hover:scale-105">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img src={isotipo} alt="Pelambre - Snacks para Perros" className="w-full h-full object-contain" />
                </div>
              </div>

              {/* Floating Sticker - Top Right */}
              <div className="absolute -top-8 -right-8 w-32 h-32 pelambre-border bg-primary rounded-full flex items-center justify-center rotate-12 animate-bounce-crazy">
                <span className="font-display text-4xl text-primary-foreground">🐶</span>
              </div>

              {/* Floating Sticker - Bottom Left */}
              <div className="absolute -bottom-6 -left-6 pelambre-border-thin bg-secondary text-secondary-foreground px-6 py-3 -rotate-6 animate-wobble">
                <span className="font-display text-xl uppercase">¡Nuevo!</span>
              </div>

              {/* Angular Accent Lines */}
              <div className="absolute -z-10 top-8 left-8 w-full h-full border-4 border-pelambre-magenta rounded-2xl -rotate-6" />
              <div className="absolute -z-20 top-16 left-16 w-full h-full border-4 border-pelambre-lemon rounded-2xl rotate-3" />
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;