import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const whatsappNumber = "573053307629";
  const message = "¡Hola! Me interesa saber más sobre Fil-Chill 🐶";
  
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-8 left-8 pelambre-border bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:rotate-12 hover:scale-110 active:scale-95 shadow-2xl z-50 group"
    >
      <MessageCircle 
        className="w-7 h-7 group-hover:scale-110 transition-transform" 
        strokeWidth={2.5} 
      />
    </a>
  );
};

export default WhatsAppButton;
