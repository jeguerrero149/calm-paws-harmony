import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ProductDetail from '@/components/ProductDetail';
import { useSupabaseProducts } from '@/hooks/useSupabaseProducts';

const ProductPage = () => {
  const { handle } = useParams();
  const { products, isLoading } = useSupabaseProducts();
  const product = products.find((p) => p.handle === handle);

  useEffect(() => {
    if (product) document.title = `${product.title} | FIL`;
  }, [product]);

  return (
    <div className="min-h-screen pt-28 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <Link to="/products" className="inline-flex items-center gap-2 font-display uppercase mb-6 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Todos los productos
        </Link>
        {isLoading ? (
          <p className="font-sans">Cargando producto...</p>
        ) : product ? (
          <ProductDetail product={product} />
        ) : (
          <div className="text-center py-16">
            <h1 className="font-display text-4xl uppercase mb-4">Producto no encontrado</h1>
            <Link to="/products" className="underline font-sans">Ver catálogo</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
