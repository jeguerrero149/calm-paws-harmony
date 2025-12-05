import { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, X, Loader2 } from 'lucide-react';
import { cn } from "@/lib/utils";
import ProductCard from '@/components/ProductCard';
import { useSupabaseProducts, formatPrice } from '@/hooks/useSupabaseProducts';

const Products = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const { products, isLoading, error } = useSupabaseProducts();

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Get unique categories from products
  const categories = [
    { id: 'all', name: 'Todos' },
    ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))
      .map(cat => ({ id: cat!, name: cat! }))
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeFilter === 'all' || product.category === activeFilter;
    const matchesSearch = 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (product.description?.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (product.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    
    return matchesCategory && matchesSearch;
  });

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Header */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-calmpets-cyan/10 to-calmpets-magenta/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
              Nuestros Productos
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8 animate-fade-in" style={{animationDelay: '100ms'}}>
              Descubre nuestra línea completa de soluciones naturales para la ansiedad canina, 
              desarrolladas por expertos y aprobadas por veterinarios.
            </p>

            {/* Search bar */}
            <div className="relative max-w-md mx-auto animate-fade-in" style={{animationDelay: '200ms'}}>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder="Buscar productos..." 
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-calmpets-dark/60 border border-gray-200 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-calmpets-cyan"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  onClick={() => setSearchQuery('')}
                >
                  <X size={18} className="text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Products section */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-calmpets-cyan" />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-8">
              {/* Filters - Desktop */}
              {categories.length > 1 && (
                <div className="hidden md:block w-64 flex-shrink-0">
                  <div className="sticky top-24 bg-white dark:bg-calmpets-dark/60 rounded-2xl shadow-md p-6">
                    <h3 className="font-display font-semibold text-lg mb-4">Categorías</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => setActiveFilter(category.id)}
                          className={cn(
                            "w-full text-left px-4 py-2 rounded-lg transition-colors duration-200",
                            activeFilter === category.id 
                              ? "bg-gradient-to-r from-calmpets-cyan/20 to-calmpets-magenta/20 text-calmpets-cyan font-medium" 
                              : "hover:bg-gray-100 dark:hover:bg-gray-800"
                          )}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Filters - Mobile */}
              {categories.length > 1 && (
                <div className="md:hidden mb-6">
                  <button 
                    onClick={toggleFilter}
                    className="w-full flex items-center justify-between bg-white dark:bg-calmpets-dark/60 rounded-xl shadow-md p-4"
                  >
                    <div className="flex items-center gap-2">
                      <Filter size={18} className="text-calmpets-cyan" />
                      <span className="font-medium">Filtrar por: </span>
                      <span className="text-calmpets-magenta font-medium">
                        {categories.find(cat => cat.id === activeFilter)?.name || 'Todos'}
                      </span>
                    </div>
                    <ChevronDown 
                      size={18} 
                      className={cn(
                        "transition-transform duration-300",
                        isFilterOpen ? "transform rotate-180" : ""
                      )} 
                    />
                  </button>

                  {isFilterOpen && (
                    <div className="mt-2 bg-white dark:bg-calmpets-dark/60 rounded-xl shadow-md p-2 z-20">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => {
                            setActiveFilter(category.id);
                            setIsFilterOpen(false);
                          }}
                          className={cn(
                            "w-full text-left px-4 py-2 rounded-lg transition-colors duration-200",
                            activeFilter === category.id 
                              ? "bg-gradient-to-r from-calmpets-cyan/20 to-calmpets-magenta/20 text-calmpets-cyan font-medium" 
                              : "hover:bg-gray-100 dark:hover:bg-gray-800"
                          )}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Products grid */}
              <div className="flex-1">
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product, index) => (
                      <div 
                        key={product.id}
                        className={cn(
                          "transition-all duration-700 transform",
                          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                        )}
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        <ProductCard 
                          id={product.id}
                          name={product.title}
                          description={product.description || ''}
                          price={product.price}
                          image={product.images[0]?.url || ''}
                          category={product.category || 'General'}
                          tags={product.tags || []}
                          isNew={product.is_new || false}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="bg-gray-100 dark:bg-gray-800 inline-flex rounded-full p-5 mb-4">
                      <Search size={32} className="text-gray-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No encontramos productos</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {searchQuery 
                        ? `No hay productos que coincidan con "${searchQuery}" en la categoría seleccionada.`
                        : 'No hay productos disponibles aún.'}
                    </p>
                    {searchQuery && (
                      <button 
                        onClick={() => {
                          setSearchQuery('');
                          setActiveFilter('all');
                        }}
                        className="text-calmpets-cyan hover:text-calmpets-magenta font-medium transition-colors"
                      >
                        Restablecer filtros
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;
