import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Loader2, Save, X, ImagePlus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Product {
  id: string;
  title: string;
  description: string | null;
  price: number;
  currency: string;
  category: string | null;
  handle: string;
  available: boolean | null;
  is_new: boolean | null;
  tags: string[] | null;
}

interface ProductFormData {
  title: string;
  description: string;
  price: string;
  currency: string;
  category: string;
  handle: string;
  available: boolean;
  is_new: boolean;
}

const emptyForm: ProductFormData = {
  title: '',
  description: '',
  price: '',
  currency: 'COP',
  category: 'General',
  handle: '',
  available: true,
  is_new: false
};

const AdminProducts = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      console.error('Error fetching products:', err);
      toast({
        title: 'Error',
        description: 'No se pudieron cargar los productos.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const generateHandle = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast({
        title: 'Error',
        description: 'El título es requerido.',
        variant: 'destructive'
      });
      return;
    }

    setSaving(true);
    const productData = {
      title: formData.title.trim(),
      description: formData.description.trim() || null,
      price: parseFloat(formData.price) || 0,
      currency: formData.currency,
      category: formData.category || 'General',
      handle: formData.handle.trim() || generateHandle(formData.title),
      available: formData.available,
      is_new: formData.is_new
    };

    try {
      if (editingId) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingId);

        if (error) throw error;
        toast({ title: 'Éxito', description: 'Producto actualizado correctamente.' });
      } else {
        const { error } = await supabase
          .from('products')
          .insert(productData);

        if (error) throw error;
        toast({ title: 'Éxito', description: 'Producto creado correctamente.' });
      }

      setShowForm(false);
      setEditingId(null);
      setFormData(emptyForm);
      fetchProducts();
    } catch (err: any) {
      console.error('Error saving product:', err);
      toast({
        title: 'Error',
        description: err.message || 'No se pudo guardar el producto.',
        variant: 'destructive'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (product: Product) => {
    setFormData({
      title: product.title,
      description: product.description || '',
      price: product.price.toString(),
      currency: product.currency,
      category: product.category || 'General',
      handle: product.handle,
      available: product.available ?? true,
      is_new: product.is_new ?? false
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: 'Éxito', description: 'Producto eliminado correctamente.' });
      setDeleteConfirm(null);
      fetchProducts();
    } catch (err: any) {
      console.error('Error deleting product:', err);
      toast({
        title: 'Error',
        description: err.message || 'No se pudo eliminar el producto.',
        variant: 'destructive'
      });
    }
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-calmpets-magenta" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-display text-2xl font-bold">
          Productos ({products.length})
        </h2>
        {!showForm && (
          <button
            onClick={() => {
              setFormData(emptyForm);
              setEditingId(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-calmpets-magenta text-white rounded-xl font-medium border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            <Plus className="w-5 h-5" />
            Nuevo Producto
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 mb-6 border-2 border-black">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-display text-lg font-bold">
              {editingId ? 'Editar Producto' : 'Nuevo Producto'}
            </h3>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setFormData(emptyForm);
              }}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Título *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-calmpets-magenta"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Handle (URL)</label>
              <input
                type="text"
                value={formData.handle}
                onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
                placeholder="auto-generado del título"
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-calmpets-magenta"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Precio</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-calmpets-magenta"
                min="0"
                step="100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Moneda</label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-calmpets-magenta"
              >
                <option value="COP">COP</option>
                <option value="USD">USD</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Categoría</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-calmpets-magenta"
              />
            </div>
            <div className="flex items-center gap-6 pt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.available}
                  onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                  className="w-5 h-5 rounded border-2 border-gray-300"
                />
                <span className="text-sm font-medium">Disponible</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_new}
                  onChange={(e) => setFormData({ ...formData, is_new: e.target.checked })}
                  className="w-5 h-5 rounded border-2 border-gray-300"
                />
                <span className="text-sm font-medium">Nuevo</span>
              </label>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Descripción</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-calmpets-magenta resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setFormData(emptyForm);
              }}
              className="px-6 py-2 bg-gray-200 dark:bg-gray-700 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2 bg-calmpets-magenta text-white rounded-xl font-medium border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {editingId ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      )}

      {products.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No hay productos. Crea el primero.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="text-left py-3 px-4 font-display">Título</th>
                <th className="text-left py-3 px-4 font-display">Precio</th>
                <th className="text-left py-3 px-4 font-display">Categoría</th>
                <th className="text-left py-3 px-4 font-display">Estado</th>
                <th className="text-right py-3 px-4 font-display">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3 px-4">
                    <div>
                      <span className="font-medium">{product.title}</span>
                      {product.is_new && (
                        <span className="ml-2 px-2 py-0.5 bg-calmpets-cyan text-white text-xs rounded-full">
                          Nuevo
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">{product.handle}</span>
                  </td>
                  <td className="py-3 px-4">{formatPrice(product.price, product.currency)}</td>
                  <td className="py-3 px-4">{product.category || '-'}</td>
                  <td className="py-3 px-4">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      product.available
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    )}>
                      {product.available ? 'Disponible' : 'No disponible'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      {deleteConfirm === product.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="px-2 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600"
                          >
                            Confirmar
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-xs rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                          >
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(product.id)}
                          className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
