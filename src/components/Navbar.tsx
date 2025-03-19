
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Dog, Leaf, HelpCircle, ShoppingCart, Sparkles } from 'lucide-react';
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
    { name: 'Inicio', path: '/', icon: <Dog size={18} /> },
    { name: 'Productos', path: '/products', icon: <Leaf size={18} /> },
    { name: 'Nosotros', path: '/about', icon: <HelpCircle size={18} /> },
    { name: 'Contacto', path: '/contact', icon: <ShoppingCart size={18} /> },
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
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 font-display text-2xl font-black hover-scale relative transform -skew-x-6"
            onClick={closeMenu}
          >
            <div className="relative h-12 w-12 overflow-hidden transform rotate-12">
              <div className="absolute inset-0 bg-cyan-magenta-gradient rounded-lg animate-pulse-gentle"></div>
              <div className="absolute inset-[2px] bg-white dark:bg-calmpets-dark rounded-lg flex items-center justify-center">
                <Dog size={22} className="text-calmpets-cyan transform -rotate-12" />
              </div>
              {/* Angular accents */}
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[12px] border-r-[12px] border-t-transparent border-r-white/30 dark:border-r-black/60"></div>
              <div className="absolute bottom-0 left-0 w-0 h-0 border-b-[8px] border-l-[8px] border-b-transparent border-l-white/30 dark:border-l-black/60"></div>
            </div>
            <span className="transform hover:skew-x-6 transition-transform duration-300">
              Calm<span className="text-calmpets-cyan">Pets</span>
            </span>
            <Sparkles size={16} className="text-calmpets-magenta absolute -top-1 -right-4 animate-pulse-gentle" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "flex items-center gap-1.5 font-bold text-base uppercase tracking-wide relative group transform hover:skew-x-3 transition-transform duration-300",
                  isActive(link.path) 
                    ? "text-calmpets-magenta" 
                    : "text-gray-600 hover:text-calmpets-cyan dark:text-gray-300 dark:hover:text-calmpets-cyan"
                )}
              >
                {link.icon}
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

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-700 dark:text-gray-200 hover:text-calmpets-cyan relative w-12 h-12 flex items-center justify-center"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-lg opacity-50 transform rotate-6"></div>
            <div className="relative z-10">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
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
                "flex items-center text-xl py-3 border-b-2 border-gray-100 dark:border-gray-800 font-bold uppercase tracking-wide transform hover:translate-x-2 hover:skew-x-3 transition-transform duration-300",
                isActive(link.path) 
                  ? "text-calmpets-magenta border-calmpets-magenta" 
                  : "text-gray-600 dark:text-gray-300"
              )}
              onClick={closeMenu}
            >
              <div className="mr-3 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg transform -rotate-6">
                {link.icon}
              </div>
              {link.name}
            </Link>
          ))}
          
          <button className="mt-auto w-full bg-gradient-to-r from-calmpets-cyan to-calmpets-magenta hover:opacity-90 text-white font-bold uppercase tracking-wider py-4 rounded-lg shadow-lg transform -skew-x-6">
            Comprar Ahora
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
