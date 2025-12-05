import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SupabaseProduct {
  id: string;
  title: string;
  description: string | null;
  handle: string;
  tags: string[] | null;
  price: number;
  currency: string;
  category: string | null;
  is_new: boolean | null;
  available: boolean | null;
  created_at: string;
  updated_at: string;
  images: {
    id: string;
    url: string;
    alt_text: string | null;
    position: number | null;
  }[];
  variants: {
    id: string;
    title: string;
    price: number;
    available_for_sale: boolean | null;
    selected_options: any;
  }[];
}

export function useSupabaseProducts() {
  const [products, setProducts] = useState<SupabaseProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .eq('available', true)
        .order('created_at', { ascending: false });

      if (productsError) throw productsError;

      if (!productsData || productsData.length === 0) {
        setProducts([]);
        return;
      }

      // Fetch images for all products
      const productIds = productsData.map(p => p.id);
      
      const { data: imagesData, error: imagesError } = await supabase
        .from('product_images')
        .select('*')
        .in('product_id', productIds)
        .order('position', { ascending: true });

      if (imagesError) throw imagesError;

      // Fetch variants for all products
      const { data: variantsData, error: variantsError } = await supabase
        .from('product_variants')
        .select('*')
        .in('product_id', productIds);

      if (variantsError) throw variantsError;

      // Combine data
      const productsWithRelations: SupabaseProduct[] = productsData.map(product => ({
        ...product,
        images: (imagesData || []).filter(img => img.product_id === product.id),
        variants: (variantsData || []).filter(v => v.product_id === product.id),
      }));

      setProducts(productsWithRelations);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err instanceof Error ? err.message : 'Error al cargar productos');
    } finally {
      setIsLoading(false);
    }
  };

  return { products, isLoading, error, refetch: fetchProducts };
}

// Helper to convert price for display (stored as integer in COP)
export function formatPrice(price: number, currency: string = 'COP'): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
