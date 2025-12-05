import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus, Search, X, ShoppingCart, ChevronDown, ChevronUp } from 'lucide-react';
import { formatPrice } from '@/hooks/useSupabaseProducts';

interface Client {
  id: string;
  full_name: string;
  phone: string;
}

interface Product {
  id: string;
  title: string;
  price: number;
  currency: string;
}

interface OrderItem {
  product_id: string;
  product_title: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  client_id: string | null;
  customer_name: string | null;
  customer_phone: string;
  total: number;
  status: string;
  notes: string | null;
  created_at: string;
  items: { product_id: string; quantity: number; price: number }[];
}

const AdminSales = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form state
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [clientSearch, setClientSearch] = useState('');
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [productSearch, setProductSearch] = useState('');
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [notes, setNotes] = useState('');

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [ordersRes, clientsRes, productsRes, orderItemsRes] = await Promise.all([
        supabase.from('orders').select('*').order('created_at', { ascending: false }),
        supabase.from('clients').select('id, full_name, phone'),
        supabase.from('products').select('id, title, price, currency'),
        supabase.from('order_items').select('*')
      ]);

      if (ordersRes.error) throw ordersRes.error;
      if (clientsRes.error) throw clientsRes.error;
      if (productsRes.error) throw productsRes.error;

      const ordersWithItems = (ordersRes.data || []).map(order => ({
        ...order,
        items: (orderItemsRes.data || []).filter(item => item.order_id === order.id)
      }));

      setOrders(ordersWithItems);
      setClients(clientsRes.data || []);
      setProducts(productsRes.data || []);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'No se pudieron cargar los datos',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resetForm = () => {
    setSelectedClient(null);
    setClientSearch('');
    setOrderItems([]);
    setProductSearch('');
    setNotes('');
  };

  const filteredClients = clients.filter(c =>
    c.full_name.toLowerCase().includes(clientSearch.toLowerCase()) ||
    c.phone.includes(clientSearch)
  );

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(productSearch.toLowerCase())
  );

  const selectClient = (client: Client) => {
    setSelectedClient(client);
    setClientSearch(client.full_name);
    setShowClientDropdown(false);
  };

  const addProduct = (product: Product) => {
    const existing = orderItems.find(item => item.product_id === product.id);
    if (existing) {
      setOrderItems(orderItems.map(item =>
        item.product_id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setOrderItems([...orderItems, {
        product_id: product.id,
        product_title: product.title,
        quantity: 1,
        price: product.price
      }]);
    }
    setProductSearch('');
    setShowProductDropdown(false);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setOrderItems(orderItems.filter(item => item.product_id !== productId));
    } else {
      setOrderItems(orderItems.map(item =>
        item.product_id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const removeItem = (productId: string) => {
    setOrderItems(orderItems.filter(item => item.product_id !== productId));
  };

  const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSave = async () => {
    if (!selectedClient) {
      toast({
        title: 'Error',
        description: 'Selecciona un cliente',
        variant: 'destructive'
      });
      return;
    }

    if (orderItems.length === 0) {
      toast({
        title: 'Error',
        description: 'Agrega al menos un producto',
        variant: 'destructive'
      });
      return;
    }

    setIsSaving(true);
    try {
      // Create order
      const { data: newOrder, error: orderError } = await supabase
        .from('orders')
        .insert({
          client_id: selectedClient.id,
          customer_name: selectedClient.full_name,
          customer_phone: selectedClient.phone,
          total,
          status: 'pending',
          notes: notes || null
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const itemsToInsert = orderItems.map(item => ({
        order_id: newOrder.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(itemsToInsert);

      if (itemsError) throw itemsError;

      toast({ title: 'Venta registrada' });
      setShowModal(false);
      resetForm();
      fetchData();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    const labels: Record<string, string> = {
      pending: 'Pendiente',
      completed: 'Completado',
      cancelled: 'Cancelado'
    };
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
        {labels[status] || status}
      </span>
    );
  };

  const getClientName = (order: Order) => {
    if (order.client_id) {
      const client = clients.find(c => c.id === order.client_id);
      return client?.full_name || order.customer_name || 'Cliente desconocido';
    }
    return order.customer_name || 'Sin cliente';
  };

  const getProductTitle = (productId: string) => {
    const product = products.find(p => p.id === productId);
    return product?.title || 'Producto desconocido';
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-pelambre-magenta" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-display text-2xl font-bold">Ventas ({orders.length})</h2>
        <button
          onClick={() => { resetForm(); setShowModal(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-pelambre-lemon text-black font-bold rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
        >
          <Plus className="w-5 h-5" />
          Nueva Venta
        </button>
      </div>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No hay ventas registradas</p>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div
              key={order.id}
              className="bg-gray-50 dark:bg-gray-700 rounded-xl border-2 border-black overflow-hidden"
            >
              <div
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold">{getClientName(order)}</h3>
                    {getStatusBadge(order.status)}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {new Date(order.created_at).toLocaleDateString('es-CO')} • {order.items.length} producto{order.items.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-lg">{formatPrice(order.total)}</span>
                  {expandedOrder === order.id ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </div>

              {expandedOrder === order.id && (
                <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-600">
                  <div className="mt-4 space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span>{getProductTitle(item.product_id)} x{item.quantity}</span>
                        <span>{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                  {order.notes && (
                    <p className="text-sm text-gray-500 mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                      Notas: {order.notes}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border-4 border-black w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-display text-xl font-bold">Nueva Venta</h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Client selector */}
              <div className="relative">
                <label className="block text-sm font-medium mb-1">Cliente *</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={clientSearch}
                    onChange={(e) => {
                      setClientSearch(e.target.value);
                      setShowClientDropdown(true);
                      if (selectedClient && e.target.value !== selectedClient.full_name) {
                        setSelectedClient(null);
                      }
                    }}
                    onFocus={() => setShowClientDropdown(true)}
                    placeholder="Buscar cliente por nombre o teléfono..."
                    className="w-full pl-10 pr-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-pelambre-magenta focus:outline-none"
                  />
                </div>
                {showClientDropdown && clientSearch && (
                  <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                    {filteredClients.length > 0 ? (
                      filteredClients.map(client => (
                        <button
                          key={client.id}
                          onClick={() => selectClient(client)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <p className="font-medium">{client.full_name}</p>
                          <p className="text-sm text-gray-500">{client.phone}</p>
                        </button>
                      ))
                    ) : (
                      <p className="px-4 py-2 text-gray-500">No se encontraron clientes</p>
                    )}
                  </div>
                )}
              </div>

              {/* Product selector */}
              <div className="relative">
                <label className="block text-sm font-medium mb-1">Agregar producto</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => {
                      setProductSearch(e.target.value);
                      setShowProductDropdown(true);
                    }}
                    onFocus={() => setShowProductDropdown(true)}
                    placeholder="Buscar producto..."
                    className="w-full pl-10 pr-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-pelambre-magenta focus:outline-none"
                  />
                </div>
                {showProductDropdown && productSearch && (
                  <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map(product => (
                        <button
                          key={product.id}
                          onClick={() => addProduct(product)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex justify-between"
                        >
                          <span>{product.title}</span>
                          <span className="text-pelambre-magenta font-medium">{formatPrice(product.price, product.currency)}</span>
                        </button>
                      ))
                    ) : (
                      <p className="px-4 py-2 text-gray-500">No se encontraron productos</p>
                    )}
                  </div>
                )}
              </div>

              {/* Order items */}
              {orderItems.length > 0 && (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h4 className="font-bold mb-3 flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" /> Productos en la venta
                  </h4>
                  <div className="space-y-2">
                    {orderItems.map(item => (
                      <div key={item.product_id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">{item.product_title}</p>
                          <p className="text-sm text-gray-500">{formatPrice(item.price)} c/u</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border-2 border-gray-200 dark:border-gray-600 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                              className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                              -
                            </button>
                            <span className="px-3 py-1 min-w-[40px] text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                              className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-bold w-24 text-right">{formatPrice(item.price * item.quantity)}</span>
                          <button
                            onClick={() => removeItem(item.product_id)}
                            className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-red-500"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-lg font-bold">Total:</span>
                    <span className="text-2xl font-bold text-pelambre-magenta">{formatPrice(total)}</span>
                  </div>
                </div>
              )}

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium mb-1">Notas (opcional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-pelambre-magenta focus:outline-none resize-none"
                  placeholder="Observaciones sobre la venta..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 rounded-xl border-2 border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving || !selectedClient || orderItems.length === 0}
                className="flex items-center gap-2 px-6 py-2 bg-pelambre-magenta text-white font-bold rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-50"
              >
                {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                Registrar Venta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSales;
