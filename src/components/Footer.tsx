import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import isotipo from '@/assets/pelambre-isotipo.png';
const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const footerLinks = [{
    title: "Productos",
    links: [{
      name: "Snacks Calmantes",
      path: "/products"
    }, {
      name: "Juguetes",
      path: "/products"
    }, {
      name: "Accesorios",
      path: "/products"
    }, {
      name: "Ofertas",
      path: "/products"
    }]
  }, {
    title: "Empresa",
    links: [{
      name: "Nosotros",
      path: "/about"
    }, {
      name: "Contacto",
      path: "/contact"
    }, {
      name: "Blog",
      path: "/about"
    }]
  }, {
    title: "Soporte",
    links: [{
      name: "FAQ",
      path: "/about"
    }, {
      name: "Envíos",
      path: "/about"
    }, {
      name: "Devoluciones",
      path: "/about"
    }]
  }];
  const socialLinks = [{
    icon: Facebook,
    href: "#",
    label: "Facebook",
    color: "bg-pelambre-indigo"
  }, {
    icon: Instagram,
    href: "#",
    label: "Instagram",
    color: "bg-pelambre-magenta"
  }, {
    icon: Twitter,
    href: "#",
    label: "Twitter",
    color: "bg-pelambre-lemon"
  }];
  return <footer className="relative bg-pelambre-violet text-white overflow-hidden">
      {/* Top Section with Asymmetric Blocks */}
      <div className="absolute top-0 left-0 w-1/3 h-32 bg-pelambre-indigo -skew-x-12 transform -translate-x-8" />
      <div className="absolute top-0 right-0 w-1/4 h-24 bg-pelambre-lemon" />
      
      <div className="container mx-auto px-4 pt-20 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-4">
              <div className="pelambre-border bg-white p-3 rounded-2xl rotate-6 hover:rotate-0 transition-transform duration-300">
                <img src={isotipo} alt="Pelambre" className="h-16 w-16" />
              </div>
              <span className="font-display text-4xl uppercase">FIL</span>
            </div>
            
            <p className="font-sans text-lg max-w-sm">Calma para perros cool.  Ayuda a tu mascota a relajarse con estilo.</p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return <a key={index} href={social.href} aria-label={social.label} className={`pelambre-border ${social.color} w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:rotate-12 hover:scale-110 active:scale-95`}>
                    <Icon className={`w-5 h-5 ${social.color === 'bg-pelambre-lemon' ? 'text-black' : 'text-white'}`} strokeWidth={2.5} />
                  </a>;
            })}
            </div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section, index) => <div key={index} className="space-y-4">
              <h3 className="font-display text-2xl uppercase text-pelambre-lemon">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => <li key={linkIndex}>
                    <Link to={link.path} className="font-sans text-base hover:text-pelambre-lemon transition-colors duration-300 hover:translate-x-1 inline-block">
                      {link.name}
                    </Link>
                  </li>)}
              </ul>
            </div>)}
        </div>

        {/* Contact Info */}
        <div className="border-t-2 border-white/20 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="pelambre-border-thin bg-pelambre-bittersweet w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <div>
                <div className="font-sans text-sm opacity-70">Email</div>
                <a href="mailto:hola@pelambre.com" className="font-sans font-semibold hover:text-pelambre-lemon transition-colors">
                  hola@pelambre.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="pelambre-border-thin bg-pelambre-magenta w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <div>
                <div className="font-sans text-sm opacity-70">Teléfono</div>
                <a className="font-sans font-semibold hover:text-pelambre-lemon transition-colors" href="+573053307629">
                  +573053307629
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="pelambre-border-thin bg-pelambre-indigo w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <div>
                <div className="font-sans text-sm opacity-70">Ubicación</div>
                <p className="font-sans font-semibold">Medellín, Colombia</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t-2 border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-sm text-center md:text-left">
            © {new Date().getFullYear()} Fil. Todos los derechos reservados. Hecho con ❤️ para perros cool.
          </p>
          
          <div className="flex gap-6 font-sans text-sm">
            <Link to="/about" className="hover:text-pelambre-lemon transition-colors">
              Privacidad
            </Link>
            <Link to="/about" className="hover:text-pelambre-lemon transition-colors">
              Términos
            </Link>
            <Link to="/about" className="hover:text-pelambre-lemon transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button onClick={scrollToTop} className="fixed bottom-8 right-8 pelambre-border bg-pelambre-bittersweet text-white w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:rotate-12 hover:scale-110 active:scale-95 shadow-2xl z-50 group" aria-label="Scroll to top">
        <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" strokeWidth={3} />
      </button>

      {/* Bottom Accent */}
      <div className="h-4 bg-pelambre-lemon" />
    </footer>;
};
export default Footer;