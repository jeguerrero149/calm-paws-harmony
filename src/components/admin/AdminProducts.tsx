import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Loader2, Save, X, ImagePlus, Upload } from 'lucide-react';
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

interface ProductImage {
  id: string;
  url: string;
  alt_text: string | null;
  position: number | null;
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
  tags: string;
}

const emptyForm: ProductFormData = {
  title: '',
  description: '',
  price: '',
  currency: 'COP',
  category: 'General',
  handle: '',
  available: true,
  is_new: false,
  tags: ''
};

const AdminProducts = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  
  // Image state
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<ProductImage[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);

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

  const fetchProductImages = async (productId: string) => {
    const { data, error } = await supabase
      .from('product_images')
      .select('*')
      .eq('product_id', productId)
      .order('position', { ascending: true });
    
    if (error) {
      console.error('Error fetching images:', error);
      return [];
    }
    return data || [];
  };

  const generateHandle = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const totalImages = selectedFiles.length + existingImages.length - imagesToDelete.length;
    const remainingSlots = 10 - totalImages;
    
    if (files.length > remainingSlots) {
      toast({
        title: 'Límite de imágenes',
        description: `Solo puedes agregar ${remainingSlots} imagen(es) más. Máximo 10 en total.`,
        variant: 'destructive'
      });
      return;
    }

    // Validate file types
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        toast({
          title: 'Archivo inválido',
          description: `${file.name} no es una imagen válida.`,
          variant: 'destructive'
        });
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'Archivo muy grande',
          description: `${file.name} excede 5MB.`,
          variant: 'destructive'
        });
        return false;
      }
      return true;
    });

    setSelectedFiles(prev => [...prev, ...validFiles]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeSelectedFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const markImageForDeletion = (imageId: string) => {
    setImagesToDelete(prev => [...prev, imageId]);
  };

  const restoreImage = (imageId: string) => {
    setImagesToDelete(prev => prev.filter(id => id !== imageId));
  };

  const uploadImages = async (productId: string): Promise<boolean> => {
    if (selectedFiles.length === 0 && imagesToDelete.length === 0) return true;
    
    setUploadingImages(true);
    try {
      // Delete marked images
      for (const imageId of imagesToDelete) {
        const image = existingImages.find(img => img.id === imageId);
        if (image) {
          // Extract file path from URL
          const urlParts = image.url.split('/product-images/');
          if (urlParts[1]) {
            await supabase.storage.from('product-images').remove([urlParts[1]]);
          }
          await supabase.from('product_images').delete().eq('id', imageId);
        }
      }

      // Upload new images
      const currentPosition = existingImages.filter(img => !imagesToDelete.includes(img.id)).length;
      
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${productId}/${Date.now()}-${i}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(fileName, file);

        if (uploadError) {
          console.error('Upload error:', uploadError);
          throw uploadError;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(fileName);

        await supabase.from('product_images').insert({
          product_id: productId,
          url: publicUrl,
          alt_text: formData.title,
          position: currentPosition + i
        });
      }

      return true;
    } catch (err) {
      console.error('Error uploading images:', err);
      toast({
        title: 'Error',
        description: 'No se pudieron subir las imágenes.',
        variant: 'destructive'
      });
      return false;
    } finally {
      setUploadingImages(false);
    }
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
    const tagsArray = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
    
    const productData = {
      title: formData.title.trim(),
      description: formData.description.trim() || null,
      price: parseFloat(formData.price) || 0,
      currency: formData.currency,
      category: formData.category || 'General',
      handle: formData.handle.trim() || generateHandle(formData.title),
      available: formData.available,
      is_new: formData.is_new,
      tags: tagsArray.length > 0 ? tagsArray : null
    };

    try {
      let productId = editingId;

      if (editingId) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingId);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('products')
          .insert(productData)
          .select('id')
          .single();

        if (error) throw error;
        productId = data.id;
      }

      // Upload images
      if (productId) {
        const imagesUploaded = await uploadImages(productId);
        if (!imagesUploaded) {
          toast({
            title: 'Advertencia',
            description: 'El producto se guardó pero hubo problemas con las imágenes.',
            variant: 'destructive'
          });
        }
      }

      toast({ title: 'Éxito', description: editingId ? 'Producto actualizado correctamente.' : 'Producto creado correctamente.' });
      resetForm();
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

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(emptyForm);
    setSelectedFiles([]);
    setExistingImages([]);
    setImagesToDelete([]);
  };

  const handleEdit = async (product: Product) => {
    setFormData({
      title: product.title,
      description: product.description || '',
      price: product.price.toString(),
      currency: product.currency,
      category: product.category || 'General',
      handle: product.handle,
      available: product.available ?? true,
      is_new: product.is_new ?? false,
      tags: product.tags?.join(', ') || ''
    });
    
    // Fetch existing images
    const images = await fetchProductImages(product.id);
    setExistingImages(images);
    setImagesToDelete([]);
    setSelectedFiles([]);
    
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      // Delete images from storage first
      const images = await fetchProductImages(id);
      for (const image of images) {
        const urlParts = image.url.split('/product-images/');
        if (urlParts[1]) {
          await supabase.storage.from('product-images').remove([urlParts[1]]);
        }
      }

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

  const totalImages = selectedFiles.length + existingImages.filter(img => !imagesToDelete.includes(img.id)).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-pelambre-magenta" />
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
              setSelectedFiles([]);
              setExistingImages([]);
              setImagesToDelete([]);
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-pelambre-magenta text-pelambre-violet rounded-xl font-medium border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
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
              onClick={resetForm}
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
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-pelambre-magenta"
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
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-pelambre-magenta"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Precio</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-pelambre-magenta"
                min="0"
                step="100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Moneda</label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-pelambre-magenta"
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
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-pelambre-magenta"
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
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-pelambre-magenta resize-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Tags</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="Separados por coma: relajante, perros, gatos"
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-pelambre-magenta"
              />
              <p className="text-xs text-gray-500 mt-1">Ingresa los tags separados por comas</p>
            </div>

            {/* Image Upload Section */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">
                Imágenes ({totalImages}/10)
              </label>
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*"
                multiple
                className="hidden"
              />
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-3">
                {/* Existing images */}
                {existingImages.map((image) => (
                  <div 
                    key={image.id} 
                    className={cn(
                      "relative aspect-square rounded-lg overflow-hidden border-2",
                      imagesToDelete.includes(image.id) 
                        ? "border-red-500 opacity-50" 
                        : "border-gray-300"
                    )}
                  >
                    <img 
                      src={image.url} 
                      alt={image.alt_text || ''} 
                      className="w-full h-full object-cover"
                    />
                    {imagesToDelete.includes(image.id) ? (
                      <button
                        type="button"
                        onClick={() => restoreImage(image.id)}
                        className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-xs font-medium"
                      >
                        Restaurar
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => markImageForDeletion(image.id)}
                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}

                {/* New selected files */}
                {selectedFiles.map((file, index) => (
                  <div 
                    key={index} 
                    className="relative aspect-square rounded-lg overflow-hidden border-2 border-pelambre-indigo"
                  >
                    <img 
                      src={URL.createObjectURL(file)} 
                      alt={file.name} 
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeSelectedFile(index)}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    <span className="absolute bottom-0 left-0 right-0 bg-pelambre-indigo text-white text-xs text-center py-0.5">
                      Nueva
                    </span>
                  </div>
                ))}

                {/* Add button */}
                {totalImages < 10 && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-square rounded-lg border-2 border-dashed border-gray-400 hover:border-pelambre-magenta flex flex-col items-center justify-center gap-1 transition-colors"
                  >
                    <Upload className="w-6 h-6 text-gray-400" />
                    <span className="text-xs text-gray-500">Agregar</span>
                  </button>
                )}
              </div>
              
              <p className="text-xs text-gray-500">
                Formatos: JPG, PNG, WEBP. Máx 5MB por imagen.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2 bg-gray-200 dark:bg-gray-700 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving || uploadingImages}
              className="flex items-center gap-2 px-6 py-2 bg-pelambre-magenta text-pelambre-violet rounded-xl font-medium border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-50"
            >
              {(saving || uploadingImages) ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {uploadingImages ? 'Subiendo imágenes...' : (editingId ? 'Actualizar' : 'Crear')}
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
                        <span className="ml-2 px-2 py-0.5 bg-pelambre-indigo text-white text-xs rounded-full">
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
