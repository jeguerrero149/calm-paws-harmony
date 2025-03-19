
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Productos', path: '/products' },
    { name: 'Nosotros', path: '/about' },
    { name: 'Contacto', path: '/contact' },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-white/90 dark:bg-calmpets-dark/90 backdrop-blur-md shadow-lg" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Logo - Removed isotype, kept only text */}
          <Link 
            to="/" 
            className="flex items-center gap-2 font-display text-2xl font-black hover-scale relative transform -skew-x-6"
            onClick={closeMenu}
          >
            <span className="transform hover:skew-x-6 transition-transform duration-300">
              Calm<span className="text-calmpets-cyan">Pets</span>
            </span>
          </Link>

          {/* Desktop Navigation - Removed icons, improved spacing */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "font-bold text-base uppercase tracking-wide relative group transform hover:skew-x-3 transition-transform duration-300",
                  isActive(link.path) 
                    ? "text-calmpets-magenta" 
                    : "text-gray-600 hover:text-calmpets-cyan dark:text-gray-300 dark:hover:text-calmpets-cyan"
                )}
              >
                {link.name}
                <span 
                  className={cn(
                    "absolute bottom-[-8px] left-0 h-[3px] bg-gradient-to-r from-calmpets-cyan to-calmpets-magenta transition-all duration-300 transform -skew-x-12",
                    isActive(link.path) ? "w-full" : "w-0 group-hover:w-full"
                  )}
                ></span>
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="bg-gradient-to-r from-calmpets-cyan to-calmpets-magenta hover:opacity-90 text-white font-bold uppercase tracking-wider px-6 py-2.5 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:skew-x-3">
              Comprar Ahora
            </button>
          </div>

          {/* Mobile Menu Toggle - Made more visible and accessible */}
          <button
            className="md:hidden text-gray-700 dark:text-gray-200 hover:text-calmpets-cyan relative w-12 h-12 flex items-center justify-center bg-gray-100/80 dark:bg-gray-800/80 rounded-lg"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Improved legibility and touch targets */}
      <div
        className={cn(
          "fixed inset-0 bg-white dark:bg-calmpets-dark z-40 transition-transform duration-300 ease-in-out md:hidden",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
        style={{ top: '5rem' }}
      >
        <nav className="h-full flex flex-col p-8 space-y-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex items-center text-xl py-4 border-b-2 border-gray-100 dark:border-gray-800 font-bold uppercase tracking-wide transform hover:translate-x-2 hover:skew-x-3 transition-transform duration-300",
                isActive(link.path) 
                  ? "text-calmpets-magenta border-calmpets-magenta" 
                  : "text-gray-600 dark:text-gray-300"
              )}
              onClick={closeMenu}
            >
              {link.name}
            </Link>
          ))}
          
          <button className="mt-auto w-full bg-gradient-to-r from-calmpets-cyan to-calmpets-magenta hover:opacity-90 text-white font-bold uppercase tracking-wider py-5 rounded-lg shadow-lg transform -skew-x-6">
            Comprar Ahora
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
