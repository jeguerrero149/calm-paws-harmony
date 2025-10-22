import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import logo from '@/assets/pelambre-logo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Productos', path: '/products' },
    { name: 'Nosotros', path: '/about' },
    { name: 'Contacto', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled 
          ? "bg-background border-b-4 border-border shadow-lg" 
          : "bg-background/95 backdrop-blur-sm border-b-2 border-border"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center transition-transform hover:scale-105">
            <img 
              src={logo} 
              alt="Pelambre" 
              className="h-10 md:h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "font-display text-xl uppercase tracking-wide transition-all duration-300 relative",
                  "after:content-[''] after:absolute after:w-full after:h-1 after:bg-secondary after:bottom-0 after:left-0",
                  "after:transform after:origin-bottom-right after:transition-transform after:duration-300",
                  isActive(link.path)
                    ? "text-primary after:scale-x-100"
                    : "text-foreground hover:text-primary after:scale-x-0 hover:after:scale-x-100 hover:after:origin-bottom-left"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <Link
            to="/products"
            className="hidden md:block pelambre-border-thin bg-accent text-accent-foreground px-6 py-2 font-display text-xl uppercase tracking-wide transition-all duration-300 hover:rotate-2 hover:scale-105 hover:shadow-xl active:scale-95 active:rotate-0"
          >
            ¡Comprar!
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden fixed inset-0 top-20 bg-background z-40 transition-all duration-300",
          isMenuOpen 
            ? "translate-x-0 opacity-100" 
            : "translate-x-full opacity-0 pointer-events-none"
        )}
      >
        <div className="h-full bg-pelamble-blocks p-6 flex flex-col gap-4">
          {navLinks.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "pelambre-border bg-card text-card-foreground p-4 font-display text-2xl uppercase text-center transition-all duration-300",
                isActive(link.path) ? "bg-primary text-primary-foreground rotate-2" : "hover:rotate-1 hover:scale-105"
              )}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {link.name}
            </Link>
          ))}
          
          <Link
            to="/products"
            className="pelambre-border bg-accent text-accent-foreground p-4 font-display text-2xl uppercase text-center transition-all duration-300 hover:rotate-2 hover:scale-105 mt-4"
          >
            ¡Comprar Ahora!
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
