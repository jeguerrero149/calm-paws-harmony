
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Dog, Leaf, HelpCircle, ShoppingCart } from 'lucide-react';
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
        scrolled ? "bg-white/80 dark:bg-calmpets-dark/80 backdrop-blur-md shadow-md" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 font-display text-2xl font-bold hover-scale"
            onClick={closeMenu}
          >
            <div className="relative h-10 w-10 overflow-hidden">
              <div className="absolute inset-0 bg-cyan-magenta-gradient rounded-full animate-pulse-gentle"></div>
              <div className="absolute inset-[2px] bg-white dark:bg-calmpets-dark rounded-full flex items-center justify-center">
                <Dog size={20} className="text-calmpets-cyan" />
              </div>
            </div>
            <span>Calm<span className="text-calmpets-cyan">Pets</span></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "flex items-center gap-1.5 font-medium text-base relative group",
                  isActive(link.path) 
                    ? "text-calmpets-magenta" 
                    : "text-gray-600 hover:text-calmpets-cyan dark:text-gray-300 dark:hover:text-calmpets-cyan"
                )}
              >
                {link.icon}
                {link.name}
                <span 
                  className={cn(
                    "absolute bottom-[-5px] left-0 w-0 h-0.5 bg-gradient-to-r from-calmpets-cyan to-calmpets-magenta transition-all duration-300",
                    isActive(link.path) ? "w-full" : "group-hover:w-full"
                  )}
                ></span>
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="bg-gradient-to-r from-calmpets-cyan to-calmpets-magenta hover:opacity-90 text-white font-medium px-5 py-2 rounded-full transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Comprar Ahora
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-700 dark:text-gray-200 hover:text-calmpets-cyan"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-white dark:bg-calmpets-dark z-40 transition-transform duration-300 ease-in-out md:hidden",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
        style={{ top: '4rem' }}
      >
        <nav className="h-full flex flex-col p-8 space-y-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex items-center text-xl py-2 border-b border-gray-100 dark:border-gray-800",
                isActive(link.path) 
                  ? "text-calmpets-magenta border-calmpets-magenta" 
                  : "text-gray-600 dark:text-gray-300"
              )}
              onClick={closeMenu}
            >
              <span className="mr-2">{link.icon}</span>
              {link.name}
            </Link>
          ))}
          
          <button className="mt-auto w-full bg-gradient-to-r from-calmpets-cyan to-calmpets-magenta hover:opacity-90 text-white font-medium py-3 rounded-full shadow-lg">
            Comprar Ahora
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
