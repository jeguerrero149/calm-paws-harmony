
import { Link } from 'react-router-dom';
import { ArrowUp, Facebook, Instagram, Twitter, Mail, Phone, MapPin, Dog } from 'lucide-react';
import { cn } from "@/lib/utils";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = [
    {
      title: 'Productos',
      links: [
        { name: 'Snacks Calmantes', href: '/products' },
        { name: 'Sprays Relajantes', href: '/products' },
        { name: 'Polvos Naturales', href: '/products' },
        { name: 'Balm Calmante', href: '/products' },
      ],
    },
    {
      title: 'Empresa',
      links: [
        { name: 'Acerca de Nosotros', href: '/about' },
        { name: 'Nuestro Equipo', href: '/about' },
        { name: 'Testimonios', href: '/about' },
        { name: 'Blog', href: '/blog' },
      ],
    },
    {
      title: 'Soporte',
      links: [
        { name: 'Contacto', href: '/contact' },
        { name: 'Preguntas Frecuentes', href: '/faq' },
        { name: 'Distribuidores', href: '/distributors' },
        { name: 'Términos y Condiciones', href: '/terms' },
      ],
    },
  ];

  return (
    <footer className="relative bg-white dark:bg-calmpets-dark border-t border-gray-100 dark:border-gray-800 pt-16 pb-8">
      {/* Scroll to top button */}
      <button 
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-white dark:bg-calmpets-dark border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-calmpets-cyan"
        aria-label="Volver arriba"
      >
        <ArrowUp size={20} />
      </button>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Company info */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-display text-2xl font-bold mb-4">
              <div className="relative h-9 w-9 overflow-hidden">
                <div className="absolute inset-0 bg-cyan-magenta-gradient rounded-full"></div>
                <div className="absolute inset-[2px] bg-white dark:bg-calmpets-dark rounded-full flex items-center justify-center">
                  <Dog size={18} className="text-calmpets-cyan" />
                </div>
              </div>
              <span>Calm<span className="text-calmpets-cyan">Pets</span></span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              Soluciones naturales y efectivas para reducir la ansiedad en perros. 
              Mejoramos el bienestar de tu mascota con ingredientes de la más alta calidad.
            </p>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:bg-calmpets-cyan hover:text-white transition-colors duration-300">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:bg-calmpets-cyan hover:text-white transition-colors duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:bg-calmpets-cyan hover:text-white transition-colors duration-300">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((column, idx) => (
            <div key={idx}>
              <h3 className="font-display font-semibold text-lg mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link 
                      to={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-calmpets-cyan transition-colors duration-300 inline-block relative group"
                    >
                      {link.name}
                      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-calmpets-cyan transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact info */}
        <div className="border-t border-gray-100 dark:border-gray-800 mt-12 pt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
            <Mail size={18} className="text-calmpets-cyan" />
            <span>contacto@calmpets.com</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
            <Phone size={18} className="text-calmpets-magenta" />
            <span>+52 (55) 1234 5678</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
            <MapPin size={18} className="text-calmpets-cyan" />
            <span>Ciudad de México, México</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-100 dark:border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} CalmPets. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 dark:text-gray-400 text-sm hover:text-calmpets-cyan">
              Privacidad
            </a>
            <a href="#" className="text-gray-500 dark:text-gray-400 text-sm hover:text-calmpets-cyan">
              Términos
            </a>
            <a href="#" className="text-gray-500 dark:text-gray-400 text-sm hover:text-calmpets-cyan">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
