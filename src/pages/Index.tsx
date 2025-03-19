
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Shield, Star, Zap, Award, Dog, Paw, Users, CircleCheck } from 'lucide-react';
import { cn } from "@/lib/utils";
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import TestimonialCard from '@/components/TestimonialCard';
import StatsCard from '@/components/StatsCard';

const Index = () => {
  const [isVisible, setIsVisible] = useState<{[key: string]: boolean}>({
    products: false,
    benefits: false,
    stats: false,
    testimonials: false,
    cta: false
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['products', 'benefits', 'stats', 'testimonials', 'cta'];
      
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isInView = rect.top < window.innerHeight * 0.75;
          
          setIsVisible(prev => ({
            ...prev,
            [section]: isInView
          }));
        }
      });
    };

    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const featuredProducts = [
    {
      id: "1",
      name: "Snacks Calmantes Premium",
      description: "Deliciosos snacks formulados con valeriana y manzanilla para calmar a tu mascota durante momentos de estrés.",
      price: 24.99,
      image: "public/lovable-uploads/bf7b954f-9d30-4b42-a6be-561a26427460.png",
      category: "Snacks",
      tags: ["Natural", "Sin químicos", "Rápida acción"],
      isNew: true
    },
    {
      id: "2",
      name: "Spray Relajante Instantáneo",
      description: "Spray de acción rápida con extractos de lavanda para aliviar la ansiedad en situaciones como visitas al veterinario.",
      price: 19.99,
      image: "public/lovable-uploads/9c5774e2-03e2-4536-814c-a2016c4e0d1b.png",
      category: "Sprays",
      tags: ["Veterinarios aprueban", "Natural", "Lavanda"],
    },
    {
      id: "3",
      name: "Polvo Calmante Diario",
      description: "Añade este polvo calmante a la comida diaria de tu perro para una reducción sostenida de ansiedad y comportamientos nerviosos.",
      price: 29.99,
      image: "public/lovable-uploads/583e6b78-836f-4641-88cd-332dc59cd7ff.png",
      category: "Polvos",
      tags: ["Uso diario", "Para comidas", "Natural"],
    }
  ];

  const testimonials = [
    {
      id: "1",
      name: "Carolina Méndez",
      rating: 5,
      comment: "Mi perro Toby sufría de ansiedad severa durante tormentas. Después de probar los snacks de CalmPets, noto una diferencia impresionante en su comportamiento. ¡Ahora duerme tranquilo incluso con truenos!",
      petName: "Toby",
      petType: "Labrador",
      date: "15 mayo, 2023"
    },
    {
      id: "2",
      name: "Dr. Ramón Gutiérrez",
      position: "Veterinario Comportamental",
      rating: 5,
      comment: "Como especialista en comportamiento animal, he recomendado CalmPets a muchos de mis pacientes con excelentes resultados. Su formulación natural es efectiva sin los efectos secundarios de medicamentos convencionales.",
      date: "3 junio, 2023"
    },
    {
      id: "3",
      name: "Lucía Fernández",
      rating: 4,
      comment: "El spray relajante funciona maravillosamente para mi Chihuahua durante los viajes en auto. Pasamos de tener viajes estresantes a momentos tranquilos. Recomiendo mucho este producto.",
      petName: "Luna",
      petType: "Chihuahua",
      date: "22 abril, 2023"
    }
  ];

  return (
    <div className="overflow-hidden">
      <Hero />

      {/* Featured Products */}
      <section id="products" className="py-16 md:py-24 bg-gray-50 dark:bg-calmpets-dark/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className={cn(
            "text-center mb-12 transition-all duration-1000 transform",
            isVisible.products ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <h2 className="font-display text-4xl font-bold mb-4">Productos Destacados</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Descubre nuestra línea de productos premium diseñados para ayudar a tu mascota a mantener la calma naturalmente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <div 
                key={product.id}
                className={cn(
                  "transition-all duration-1000 transform",
                  isVisible.products 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-20"
                )}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>

          <div className={cn(
            "text-center mt-12 transition-all duration-1000 transform",
            isVisible.products ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )} style={{ transitionDelay: '600ms' }}>
            <Link to="/products" className="inline-flex items-center gap-2 font-medium text-calmpets-cyan hover:text-calmpets-magenta transition-colors duration-300">
              Ver todos los productos
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-calmpets-cyan/10 to-transparent rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-calmpets-magenta/10 to-transparent rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={cn(
              "transition-all duration-1000 transform",
              isVisible.benefits ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
            )}>
              <div className="text-center lg:text-left">
                <span className="px-4 py-1.5 bg-calmpets-cyan/10 text-calmpets-cyan rounded-full text-sm font-medium inline-block mb-4">
                  100% Natural
                </span>
                <h2 className="font-display text-4xl font-bold mb-6">¿Por qué elegir CalmPets?</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0">
                  En CalmPets combinamos la ciencia y lo natural para crear productos que realmente funcionan para la ansiedad canina, sin efectos secundarios.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    icon: <Shield className="text-calmpets-cyan" size={20} />,
                    title: "Ingredientes Naturales",
                    description: "Usamos solo ingredientes de la más alta calidad, comprobados para reducir la ansiedad."
                  },
                  {
                    icon: <Heart className="text-calmpets-magenta" size={20} />,
                    title: "Fórmula Segura",
                    description: "Sin efectos secundarios ni ingredientes artificiales que puedan dañar a tu mascota."
                  },
                  {
                    icon: <Award className="text-calmpets-cyan" size={20} />,
                    title: "Veterinarios Aprueban",
                    description: "Desarrollado y probado con veterinarios especialistas en comportamiento animal."
                  },
                  {
                    icon: <Zap className="text-calmpets-magenta" size={20} />,
                    title: "Acción Rápida",
                    description: "Resultados visibles en minutos, ideal para situaciones de estrés inmediato."
                  }
                ].map((benefit, index) => (
                  <div 
                    key={index} 
                    className="bg-white dark:bg-calmpets-dark/60 p-6 rounded-xl shadow-sm transition-transform duration-300 hover:shadow-md hover:scale-[1.02]"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="p-2 rounded-full w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-800 mb-4">
                      {benefit.icon}
                    </div>
                    <h3 className="font-display font-semibold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={cn(
              "relative transition-all duration-1000 transform flex items-center justify-center",
              isVisible.benefits ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
            )}>
              <div className="relative w-full max-w-md aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-calmpets-cyan/20 to-calmpets-magenta/20 rounded-full animate-rotate-slow opacity-70 blur-md"></div>
                <div className="absolute inset-[15%] bg-white dark:bg-calmpets-dark rounded-full shadow-xl overflow-hidden p-2">
                  <img
                    src="public/lovable-uploads/56a6cdab-20a0-4d14-92c1-72a7ddbae9fa.png"
                    alt="Perro relajado con CalmPets"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                {/* Floating elements */}
                <div className="absolute top-[10%] right-[10%] bg-white dark:bg-calmpets-dark p-3 rounded-full shadow-lg animate-float">
                  <Star className="text-yellow-400" size={24} fill="currentColor" />
                </div>
                <div className="absolute bottom-[10%] left-[5%] bg-white dark:bg-calmpets-dark p-3 rounded-full shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                  <Heart className="text-calmpets-magenta" size={24} />
                </div>
                <div className="absolute top-[45%] left-[0%] bg-white dark:bg-calmpets-dark p-3 rounded-full shadow-lg animate-float" style={{ animationDelay: '2s' }}>
                  <CircleCheck className="text-calmpets-cyan" size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="py-16 md:py-24 bg-gray-50 dark:bg-calmpets-dark/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className={cn(
            "text-center mb-12 transition-all duration-1000 transform",
            isVisible.stats ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <h2 className="font-display text-4xl font-bold mb-4">El Impacto de CalmPets</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Nuestros productos han ayudado a miles de mascotas a vivir una vida más tranquila y feliz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                value: "72%",
                label: "de perros sufren ansiedad",
                description: "Según estudios recientes",
                icon: <Dog size={24} className="text-calmpets-cyan" />,
                accentColor: "cyan"
              },
              {
                value: "85%",
                label: "de efectividad",
                description: "En reducción de ansiedad",
                icon: <Star size={24} className="text-calmpets-magenta" />,
                accentColor: "magenta"
              },
              {
                value: "10k+",
                label: "mascotas ayudadas",
                description: "En el último año",
                icon: <Paw size={24} className="text-calmpets-cyan" />,
                accentColor: "cyan"
              },
              {
                value: "500+",
                label: "veterinarios recomiendan",
                description: "Nuestros productos",
                icon: <Users size={24} className="text-calmpets-magenta" />,
                accentColor: "magenta"
              }
            ].map((stat, index) => (
              <div
                key={index}
                className={cn(
                  "transition-all duration-1000 transform",
                  isVisible.stats 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-20"
                )}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <StatsCard {...stat} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[50%] -right-[20%] w-[60%] h-[100%] bg-calmpets-cyan/5 rounded-full blur-[100px]"></div>
          <div className="absolute -bottom-[50%] -left-[20%] w-[60%] h-[100%] bg-calmpets-magenta/5 rounded-full blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className={cn(
            "text-center mb-12 transition-all duration-1000 transform",
            isVisible.testimonials ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <h2 className="font-display text-4xl font-bold mb-4">Lo que dicen nuestros clientes</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Historias reales de dueños de mascotas que han transformado la vida de sus compañeros con CalmPets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={cn(
                  "transition-all duration-1000 transform",
                  isVisible.testimonials 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-20"
                )}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <TestimonialCard {...testimonial} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-16 md:py-24 bg-gradient-to-r from-calmpets-cyan/10 to-calmpets-magenta/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className={cn(
            "max-w-3xl mx-auto text-center transition-all duration-1000 transform",
            isVisible.cta ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )}>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Empieza a mejorar la vida de tu mascota hoy
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Únete a miles de dueños de mascotas satisfechos y transforma la calidad de vida de tu perro con CalmPets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/products" 
                className="bg-gradient-to-r from-calmpets-cyan to-calmpets-magenta hover:opacity-90 text-white font-medium px-8 py-3 rounded-full transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Ver Productos
                <ArrowRight size={18} />
              </Link>
              <Link 
                to="/contact" 
                className="bg-white dark:bg-calmpets-dark hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 font-medium px-8 py-3 rounded-full transition duration-300 shadow-md"
              >
                Contactar a un Experto
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
