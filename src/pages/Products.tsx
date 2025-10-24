
import { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, X } from 'lucide-react';
import { cn } from "@/lib/utils";
import ProductCard from '@/components/ProductCard';

const Products = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const products = [
    {
      id: "1",
      name: "Snacks Calmantes Premium",
      description: "Deliciosos snacks formulados con valeriana y manzanilla para calmar a tu mascota durante momentos de estrés.",
      price: 24.99,
      image: "/lovable-uploads/bf7b954f-9d30-4b42-a6be-561a26427460.png",
      category: "Snacks",
      tags: ["Natural", "Sin químicos", "Rápida acción"],
      isNew: true
    },
    {
      id: "2",
      name: "Spray Relajante Instantáneo",
      description: "Spray de acción rápida con extractos de lavanda para aliviar la ansiedad en situaciones como visitas al veterinario.",
      price: 19.99,
      image: "/lovable-uploads/9c5774e2-03e2-4536-814c-a2016c4e0d1b.png",
      category: "Sprays",
      tags: ["Veterinarios aprueban", "Natural", "Lavanda"],
    },
    {
      id: "3",
      name: "Polvo Calmante Diario",
      description: "Añade este polvo calmante a la comida diaria de tu perro para una reducción sostenida de ansiedad y comportamientos nerviosos.",
      price: 29.99,
      image: "/lovable-uploads/583e6b78-836f-4641-88cd-332dc59cd7ff.png",
      category: "Polvos",
      tags: ["Uso diario", "Para comidas", "Natural"],
    },
    {
      id: "4",
      name: "Balm Calmante para Piel",
      description: "Bálsamo tópico que ayuda a reducir la ansiedad a través de aromaterapia y absorción cutánea, ideal para aplicar en orejas y patas.",
      price: 17.99,
      image: "/lovable-uploads/dd0cd522-9f39-44c3-bf63-6d7a97d36d1f.png",
      category: "Tópicos",
      tags: ["Aplicación tópica", "Aromaterapia", "Relajante"],
    },
    {
      id: "5",
      name: "Gotas Calmantes Concentradas",
      description: "Gotas concentradas para añadir al agua o aplicar directamente. Ideal para situaciones de alta ansiedad como fuegos artificiales o tormentas.",
      price: 34.99,
      image: "/lovable-uploads/d69381ee-f612-44c4-b95e-9c941e4d8278.png",
      category: "Gotas",
      tags: ["Alta concentración", "Situaciones extremas", "Rápida acción"],
      isNew: true
    },
    {
      id: "6",
      name: "Cápsulas Relajantes Mensuales",
      description: "Tratamiento mensual en cápsulas para perros con ansiedad crónica. Fácil de administrar y con efectos duraderos.",
      price: 39.99,
      image: "/lovable-uploads/175c666e-5a42-4e37-b257-43aaf865beb1.png",
      category: "Suplementos",
      tags: ["Tratamiento regular", "Ansiedad crónica", "Larga duración"],
    },
    {
      id: "7",
      name: "Kit Viaje Tranquilo",
      description: "Set completo con spray y snacks para mantener a tu mascota calmada durante viajes. Incluye guía de uso para maximizar los resultados.",
      price: 44.99,
      image: "/lovable-uploads/d1fac845-56dd-4050-afd1-413ae4cf1d1f.png",
      category: "Kits",
      tags: ["Para viajes", "Combo", "Fácil uso"],
    },
    {
      id: "8",
      name: "Collar Difusor de Calma",
      description: "Collar con difusor integrado que libera aromáticos calmantes durante semanas. Resistente al agua y ajustable a cualquier tamaño.",
      price: 27.99,
      image: "/lovable-uploads/3d0fbf2c-5628-442a-867d-092346f1a041.png",
      category: "Accesorios",
      tags: ["Uso continuo", "Resistente agua", "Aromático"],
      isNew: true
    }
  ];

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'Snacks', name: 'Snacks' },
    { id: 'Sprays', name: 'Sprays' },
    { id: 'Polvos', name: 'Polvos' },
    { id: 'Tópicos', name: 'Tópicos' },
    { id: 'Gotas', name: 'Gotas' },
    { id: 'Suplementos', name: 'Suplementos' },
    { id: 'Kits', name: 'Kits' },
    { id: 'Accesorios', name: 'Accesorios' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeFilter === 'all' || product.category === activeFilter;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
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
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters - Desktop */}
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

            {/* Filters - Mobile */}
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
                      <ProductCard {...product} />
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
                    No hay productos que coincidan con "{searchQuery}" en la categoría seleccionada.
                  </p>
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setActiveFilter('all');
                    }}
                    className="text-calmpets-cyan hover:text-calmpets-magenta font-medium transition-colors"
                  >
                    Restablecer filtros
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
