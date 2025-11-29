import { useState, useEffect } from 'react';
import { ArrowRight, Leaf, Shield, Users, Award, Heart, Phone } from 'lucide-react';
import { cn } from "@/lib/utils";
import TestimonialCard from '@/components/TestimonialCard';
import { Link } from 'react-router-dom';
import filIsotipo from '@/assets/pelambre-isotipo.png';
const About = () => {
  const [isVisible, setIsVisible] = useState<{
    [key: string]: boolean;
  }>({
    mission: false,
    story: false,
    values: false,
    team: false,
    testimonials: false,
    cta: false
  });
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['mission', 'story', 'values', 'team', 'testimonials', 'cta'];
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
  const teamMembers = [{
    name: "Franki Ocampo",
    position: "Co-Founder & Director de Producción",
    image: "public/lovable-uploads/578f0bad-0aa9-4d05-ac41-570162b7f61a.png",
    bio: "Especialista en comportamiento animal con más de 15 años de experiencia trabajando con mascotas ansiosas."
  }, {
    name: "Dra. Ana Gómez",
    position: "Directora de Investigación",
    image: "public/lovable-uploads/3436af3a-f1d7-400f-a8b7-f5e3adb764af.png",
    bio: "PhD en Farmacología Natural con especialización en fitoterapia aplicada a la medicina veterinaria."
  }, {
    name: "Carlos Fuentes",
    position: "Desarrollo de Producto",
    image: "public/lovable-uploads/aaeaea2d-dd60-4bff-b670-68d2c4eaa0b2.png",
    bio: "Experto en formulación de productos naturales con enfoque en calidad y sostenibilidad."
  }, {
    name: "María Rodríguez",
    position: "Especialista en Nutrición",
    image: "public/lovable-uploads/852be7eb-c363-42ed-a53d-92d383034ab6.png",
    bio: "Nutricionista canina certificada, enfocada en la relación entre alimentación y salud mental en mascotas."
  }];
  const testimonials = [{
    id: "1",
    name: "Carolina Méndez",
    rating: 5,
    comment: "Mi perro Toby sufría de ansiedad severa durante tormentas. Después de probar los snacks de FIL, noto una diferencia impresionante en su comportamiento. ¡Ahora duerme tranquilo incluso con truenos!",
    petName: "Toby",
    petType: "Labrador",
    date: "15 mayo, 2023"
  }, {
    id: "2",
    name: "Dr. Ramón Gutiérrez",
    position: "Veterinario Comportamental",
    rating: 5,
    comment: "Como especialista en comportamiento animal, he recomendado FIL a muchos de mis pacientes con excelentes resultados. Su formulación natural es efectiva sin los efectos secundarios de medicamentos convencionales.",
    date: "3 junio, 2023"
  }, {
    id: "3",
    name: "Lucía Fernández",
    rating: 4,
    comment: "El spray relajante funciona maravillosamente para mi Chihuahua durante los viajes en auto. Pasamos de tener viajes estresantes a momentos tranquilos. Recomiendo mucho este producto.",
    petName: "Luna",
    petType: "Chihuahua",
    date: "22 abril, 2023"
  }];
  const values = [{
    icon: <Leaf className="text-calmpets-cyan" size={28} />,
    title: "Natural Primero",
    description: "Comprometidos con los ingredientes naturales de la más alta calidad, cuidadosamente seleccionados por sus propiedades calmantes."
  }, {
    icon: <Shield className="text-calmpets-magenta" size={28} />,
    title: "Efectividad y Seguridad",
    description: "Cada producto es rigurosamente probado para garantizar resultados excepcionales sin efectos secundarios dañinos."
  }, {
    icon: <Heart className="text-calmpets-cyan" size={28} />,
    title: "Bienestar Animal",
    description: "Nuestra misión es mejorar la calidad de vida de las mascotas, reduciendo el estrés y promoviendo el equilibrio emocional."
  }, {
    icon: <Users className="text-calmpets-magenta" size={28} />,
    title: "Educación Constante",
    description: "Creemos en compartir conocimiento con dueños y veterinarios sobre el manejo de la ansiedad canina."
  }];
  return <div className="pt-20 pb-16">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-calmpets-cyan/10 to-calmpets-magenta/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[20%] right-[10%] w-[50%] h-[50%] bg-calmpets-cyan/5 rounded-full blur-[80px]"></div>
          <div className="absolute bottom-[20%] left-[10%] w-[40%] h-[40%] bg-calmpets-magenta/5 rounded-full blur-[80px]"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="px-4 py-1.5 bg-calmpets-cyan/10 text-calmpets-cyan rounded-full text-sm font-medium inline-block mb-6 animate-fade-in">
              Conócenos
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in" style={{
            animationDelay: '100ms'
          }}>
              Nuestra Historia
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto animate-fade-in" style={{
            animationDelay: '200ms'
          }}>
              Descubre cómo nació FIL, nuestra misión y el equipo dedicado a mejorar la vida de perros ansiosos a través de soluciones naturales.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section id="mission" className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className={cn("transition-all duration-1000 transform", isVisible.mission ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                Nuestra Misión
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
                En FIL, nos dedicamos a mejorar la calidad de vida de perros que sufren de ansiedad, 
                proporcionando soluciones naturales, efectivas y respaldadas por la ciencia que dan 
                tranquilidad tanto a las mascotas como a sus dueños.
              </p>
              <div className="p-px bg-gradient-to-r from-calmpets-cyan to-calmpets-magenta rounded-full max-w-md mx-auto"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section id="story" className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={cn("relative transition-all duration-1000 transform", isVisible.story ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20")}>
              <div className="relative z-10">
                <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                  <img src={filIsotipo} alt="Isotipo de FIL" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-[-10%] right-[-5%] w-72 h-72 bg-calmpets-cyan/10 rounded-full blur-md transform rotate-45 z-0"></div>
              <div className="absolute bottom-[-10%] left-[-5%] w-72 h-72 bg-calmpets-magenta/10 rounded-full blur-md z-0"></div>
            </div>

            <div className={cn("transition-all duration-1000 transform", isVisible.story ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20")}>
              <span className="px-4 py-1.5 bg-calmpets-cyan/10 text-calmpets-cyan rounded-full text-sm font-medium inline-block mb-4">
                Nuestra historia
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                De la Necesidad al Propósito
              </h2>
              <div className="space-y-6 text-gray-600 dark:text-gray-400">
                <p>FIL nació de nuestro dolor de cabeza de años el ver a nuestros peludos estresados sin nada natural que actuase debidamente, resignándose a químicos calmantes con efectos secundarios. </p>
                <p>Insatisfechos con los medicamentos tradicionales y sus efectos secundarios, combinamos nuestro conocimiento en distintas áreas para construir algo COOL que, sin dudas, ayudase a nuestros peludos (y OBVIO, a los tuyos también).</p>
                
                <p>En FIL queremos ser líderes en soluciones naturales para la ansiedad canina, construyendo productos que ayuden miles de perros y sus familias a vivir vidas más felices y tranquilas.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="values" className="py-12 md:py-20 bg-gray-50 dark:bg-calmpets-dark/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <div className={cn("transition-all duration-1000 transform", isVisible.values ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                Nuestros Valores
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Los principios que nos guían en nuestra misión de crear productos excepcionales para el bienestar animal.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {values.map((value, index) => <div key={index} className={cn("bg-white dark:bg-calmpets-dark/60 p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1", "transition-all duration-1000 transform", isVisible.values ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20")} style={{
            transitionDelay: `${index * 150}ms`
          }}>
                <div className="p-3 rounded-full bg-gradient-to-r from-calmpets-cyan/10 to-calmpets-magenta/10 w-16 h-16 flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="font-display font-semibold text-xl mb-3">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <div className={cn("transition-all duration-1000 transform", isVisible.team ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
              <span className="px-4 py-1.5 bg-calmpets-cyan/10 text-calmpets-cyan rounded-full text-sm font-medium inline-block mb-4">
                Nuestro equipo
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                Expertos Apasionados
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Conoce a las mentes brillantes detrás de FIL, unidas por la pasión de mejorar la vida de las mascotas.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => <div key={index} className={cn("group transition-all duration-1000 transform text-center", isVisible.team ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20")} style={{
            transitionDelay: `${index * 150}ms`
          }}>
                <div className="relative rounded-2xl overflow-hidden mb-6 aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-br from-calmpets-cyan/70 to-calmpets-magenta/70 opacity-0 group-hover:opacity-60 transition-opacity duration-300 z-10"></div>
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <h3 className="font-display font-semibold text-xl mb-1">{member.name}</h3>
                <p className="text-calmpets-cyan mb-3">{member.position}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{member.bio}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-12 md:py-20 bg-gray-50 dark:bg-calmpets-dark/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <div className={cn("transition-all duration-1000 transform", isVisible.testimonials ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
              <span className="px-4 py-1.5 bg-calmpets-cyan/10 text-calmpets-cyan rounded-full text-sm font-medium inline-block mb-4">
                Testimonios
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                Lo que Dicen Nuestros Clientes
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Experiencias reales de dueños de mascotas y veterinarios que han confiado en FIL.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => <div key={testimonial.id} className={cn("transition-all duration-1000 transform", isVisible.testimonials ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20")} style={{
            transitionDelay: `${index * 150}ms`
          }}>
                <TestimonialCard {...testimonial} index={index} />
              </div>)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className={cn("max-w-3xl mx-auto bg-gradient-to-r from-calmpets-cyan/10 to-calmpets-magenta/10 rounded-3xl p-8 md:p-12 shadow-lg text-center transition-all duration-1000 transform", isVisible.cta ? "opacity-100 scale-100" : "opacity-0 scale-95")}>
            <Award size={48} className="mx-auto mb-6 text-calmpets-cyan" />
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Únete a la Familia FIL
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Miles de mascotas ya disfrutan de una vida más tranquila gracias a nuestros productos. 
              ¿Estás listo para transformar la calidad de vida de tu perro?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products" className="bg-gradient-to-r from-calmpets-cyan to-calmpets-magenta hover:opacity-90 text-white font-medium px-8 py-3 rounded-full transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                Ver Productos
                <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="bg-white dark:bg-calmpets-dark hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 font-medium px-8 py-3 rounded-full transition duration-300 shadow-md flex items-center justify-center gap-2">
                <Phone size={18} />
                Contactar
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default About;