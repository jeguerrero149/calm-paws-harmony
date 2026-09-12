import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from "@/lib/utils";
import ProductCard from '@/components/ProductCard';
import { useSupabaseProducts } from '@/hooks/useSupabaseProducts';
const Products = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const { products, isLoading } = useSupabaseProducts();
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setIsLoaded(true), 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);
  const filteredProducts = products.filter(product => {
    const q = searchQuery.toLowerCase();
    return product.title.toLowerCase().includes(q) || (product.description || '').toLowerCase().includes(q) || (product.tags || []).some(t => t.toLowerCase().includes(q));
  });
  if (isLoading) {
    return <div className="min-h-screen pt-20 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-lg">Cargando productos...</p>
        </div>
      </div>;
  }
  return <div className="min-h-screen pt-20 pb-16">
      {/* Header */}
      <section className="py-12 md:py-16 bg-pelambre-lemon">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl uppercase mb-4 animate-fade-in">
              NUESTROS PRODUCTOS
            </h1>
            <p className="text-foreground/80 mb-8 animate-fade-in font-sans" style={{
            animationDelay: '100ms'
          }}>
                  Relajación real, saludable para tu mascota.
            </p>

            {/* Search bar */}
            <div className="relative max-w-md mx-auto animate-fade-in" style={{
            animationDelay: '200ms'
          }}>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={18} className="text-foreground/60" />
              </div>
              <input type="text" placeholder="Buscar productos..." className="w-full pl-12 pr-4 py-3 bg-white border-2 border-black rounded-full focus:outline-none focus:ring-2 focus:ring-primary" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              {searchQuery && <button className="absolute inset-y-0 right-0 pr-4 flex items-center" onClick={() => setSearchQuery('')}>
                  <X size={18} className="text-foreground/60 hover:text-foreground" />
                </button>}
            </div>
          </div>
        </div>
      </section>

      {/* Products section */}
      <section className="py-12 bg-pelambre-cream">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Products grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => <div key={product.node.id} className={cn("transition-all duration-700 transform", isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")} style={{
              transitionDelay: `${index * 100}ms`
            }}>
                    <ProductCard id={product.node.id} name={product.node.title} description={product.node.description} price={parseFloat(product.node.priceRange.minVariantPrice.amount)} image={product.node.images.edges[0]?.node.url || ''} category={product.node.title} tags={product.node.tags || []} shopifyProduct={product} />
                  </div>)}
              </div> : <div className="text-center py-12">
                <div className="bg-background inline-flex rounded-full p-5 mb-4 border-2 border-black">
                  <Search size={32} className="text-foreground" />
                </div>
                <h3 className="text-xl font-display uppercase mb-2">No hay productos aún</h3>
                <p className="text-foreground/80 mb-6 font-sans">
                  {searchQuery ? `No hay productos que coincidan con "${searchQuery}".` : "Crea tu primer producto diciéndome qué producto quieres crear y cuál será su precio."}
                </p>
                {searchQuery && <button onClick={() => setSearchQuery('')} className="pelambre-border-thin bg-primary text-primary-foreground px-6 py-2 font-display uppercase transition-all hover:rotate-2 hover:scale-105">
                    Restablecer búsqueda
                  </button>}
              </div>}
          </div>
        </div>
      </section>
    </div>;
};
export default Products;