import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    petInfo: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsAnimated(true), 100);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('contacts')
        .insert({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || null,
          subject: formData.subject,
          message: formData.message.trim(),
          pet_info: formData.petInfo.trim() || null,
        });

      if (error) throw error;

      setFormSubmitted(true);
      toast({
        title: "Mensaje enviado",
        description: "Gracias por contactarnos. Te responderemos pronto.",
        variant: "default",
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu mensaje. Intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="text-calmpets-cyan" />,
      title: "Teléfono",
      info: "+57 305 330 7629",
      description: "Lunes a Viernes: 9am - 6pm",
    },
    {
      icon: <Mail className="text-calmpets-magenta" />,
      title: "Email",
      info: "hola@somosfil.com",
      description: "Atención 24/7",
    },
    {
      icon: <MapPin className="text-calmpets-cyan" />,
      title: "Ubicación",
      info: "Medellín, Colombia",
      description: "Envíos a todo el país",
    }
  ];

  const faqItems = [
    {
      question: "¿Cuánto tiempo tardan en hacer efecto los productos?",
      answer: "La mayoría de nuestros productos comienzan a hacer efecto entre 30-60 minutos después de la administración. Sin embargo, el tiempo exacto puede variar dependiendo del producto específico y la sensibilidad individual de cada mascota."
    },
    {
      question: "¿Son seguros para uso prolongado?",
      answer: "Sí, todos nuestros productos están formulados con ingredientes naturales seleccionados por su seguridad a largo plazo. No contienen aditivos dañinos ni generan dependencia, por lo que son adecuados para tratamientos continuos en casos de ansiedad crónica."
    },
    {
      question: "¿Qué hago si mi perro no mejora?",
      answer: "Si no observa mejoría después de 2-3 semanas de uso consistente, recomendamos consultar con su veterinario para una evaluación más profunda. También ofrecemos asesoramiento personalizado - contáctenos directamente para programar una consulta."
    },
    {
      question: "¿Hacen envíos internacionales?",
      answer: "Sí, realizamos envíos a toda Latinoamérica y España. Los tiempos de entrega varían según el destino, pero generalmente oscilan entre 7-14 días hábiles. Ofrecemos seguimiento en tiempo real de todos nuestros envíos."
    }
  ];

  return (
    <div className="pt-20 pb-16">
      {/* Header */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-calmpets-cyan/10 to-calmpets-magenta/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className={cn(
            "max-w-2xl mx-auto text-center transition-all duration-700 ease-out",
            isAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}>
            <span className="px-4 py-1.5 bg-calmpets-cyan/10 text-calmpets-cyan rounded-full text-sm font-medium inline-block mb-4">
              Estamos para ayudarte
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Contáctanos
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-xl mx-auto">
              ¿Tienes preguntas sobre nuestros productos o necesitas asesoría personalizada para tu mascota? 
              Estamos aquí para ayudarte.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfo.map((item, index) => (
              <div 
                key={index}
                className={cn(
                  "bg-white dark:bg-calmpets-dark/60 p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-500 ease-out transform hover:-translate-y-1",
                  isAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                )}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-full w-12 h-12 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-calmpets-magenta font-medium mb-1">{item.info}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and FAQs */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div className={cn(
              "transition-all duration-1000 ease-out",
              isAnimated ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            )}>
              <div className="bg-white dark:bg-calmpets-dark/60 rounded-2xl shadow-lg p-8">
                <div className="flex items-center gap-3 mb-6">
                  <MessageCircle className="text-calmpets-cyan" size={24} />
                  <h2 className="font-display font-bold text-2xl">Escríbenos</h2>
                </div>

                {formSubmitted ? (
                  <div className="py-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-calmpets-cyan to-calmpets-magenta rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="text-white" size={32} />
                    </div>
                    <h3 className="font-display font-semibold text-xl mb-3">¡Mensaje Enviado!</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Gracias por contactarnos. Nuestro equipo revisará tu mensaje y te responderá a la brevedad.
                    </p>
                    <button 
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          subject: '',
                          message: '',
                          petInfo: ''
                        });
                      }}
                      className="px-6 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      Enviar otro mensaje
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Nombre completo
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-calmpets-cyan"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-calmpets-cyan"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Teléfono (opcional)
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-calmpets-cyan"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Asunto
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-calmpets-cyan"
                        >
                          <option value="">Selecciona un asunto</option>
                          <option value="product-info">Información de producto</option>
                          <option value="order">Pedido</option>
                          <option value="support">Soporte técnico</option>
                          <option value="distribution">Distribución</option>
                          <option value="other">Otro</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="petInfo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Información de tu mascota (opcional)
                      </label>
                      <input
                        type="text"
                        id="petInfo"
                        name="petInfo"
                        value={formData.petInfo}
                        onChange={handleChange}
                        placeholder="Raza, edad, tipo de ansiedad"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-calmpets-cyan"
                      />
                    </div>

                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Mensaje
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-calmpets-cyan resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className={cn(
                        "w-full bg-gradient-to-r from-calmpets-cyan to-calmpets-magenta text-white font-medium py-3 px-6 rounded-full flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300",
                        isLoading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90 transform hover:-translate-y-0.5"
                      )}
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Enviando...
                        </>
                      ) : (
                        <>
                          Enviar Mensaje
                          <Send size={18} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* FAQs */}
            <div className={cn(
              "transition-all duration-1000 ease-out",
              isAnimated ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            )}>
              <div className="bg-white dark:bg-calmpets-dark/60 rounded-2xl shadow-lg p-8">
                <h2 className="font-display font-bold text-2xl mb-6">Preguntas Frecuentes</h2>
                
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-100 dark:border-gray-800">
                      <AccordionTrigger className="text-left font-medium text-lg hover:no-underline py-4">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 dark:text-gray-400 pb-4">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                <div className="mt-8 p-6 bg-gradient-to-r from-calmpets-cyan/10 to-calmpets-magenta/10 rounded-xl">
                  <h3 className="font-display font-semibold text-lg mb-3">¿No encuentras lo que buscas?</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Nuestro equipo de expertos está listo para resolver cualquier duda específica que tengas.
                  </p>
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-calmpets-cyan" />
                    <span className="font-medium">+57 305 330 7629</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
