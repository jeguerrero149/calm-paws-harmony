import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus, Pencil, Trash2, Dog, ChevronDown, ChevronUp, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ClientDog {
  id: string;
  name: string;
  breed: string | null;
  weight: number | null;
  birth_date: string | null;
}

interface Client {
  id: string;
  full_name: string;
  email: string | null;
  phone: string;
  address: string | null;
  city: string | null;
  department: string | null;
  created_at: string;
  dogs: ClientDog[];
}

const calculateAge = (birthDate: string | null): string => {
  if (!birthDate) return '-';
  const birth = new Date(birthDate);
  const today = new Date();
  const years = today.getFullYear() - birth.getFullYear();
  const months = today.getMonth() - birth.getMonth();
  
  if (years === 0) {
    return `${months < 0 ? 12 + months : months} meses`;
  }
  if (months < 0) {
    return `${years - 1} años, ${12 + months} meses`;
  }
  return `${years} años, ${months} meses`;
};

const AdminClients = () => {
  const { toast } = useToast();
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [expandedClient, setExpandedClient] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    department: ''
  });
  const [dogs, setDogs] = useState<Omit<ClientDog, 'id'>[]>([]);

  const fetchClients = async () => {
    setIsLoading(true);
    try {
      const { data: clientsData, error: clientsError } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });

      if (clientsError) throw clientsError;

      const { data: dogsData, error: dogsError } = await supabase
        .from('client_dogs')
        .select('*');

      if (dogsError) throw dogsError;

      const clientsWithDogs = (clientsData || []).map(client => ({
        ...client,
        dogs: (dogsData || []).filter(dog => dog.client_id === client.id)
      }));

      setClients(clientsWithDogs);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'No se pudieron cargar los clientes',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const resetForm = () => {
    setFormData({
      full_name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      department: ''
    });
    setDogs([]);
    setEditingClient(null);
  };

  const openModal = (client?: Client) => {
    if (client) {
      setEditingClient(client);
      setFormData({
        full_name: client.full_name,
        email: client.email || '',
        phone: client.phone,
        address: client.address || '',
        city: client.city || '',
        department: client.department || ''
      });
      setDogs(client.dogs.map(d => ({
        name: d.name,
        breed: d.breed,
        weight: d.weight,
        birth_date: d.birth_date
      })));
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  const addDog = () => {
    setDogs([...dogs, { name: '', breed: null, weight: null, birth_date: null }]);
  };

  const removeDog = (index: number) => {
    setDogs(dogs.filter((_, i) => i !== index));
  };

  const updateDog = (index: number, field: string, value: any) => {
    const updated = [...dogs];
    updated[index] = { ...updated[index], [field]: value };
    setDogs(updated);
  };

  const handleSave = async () => {
    if (!formData.full_name.trim() || !formData.phone.trim()) {
      toast({
        title: 'Error',
        description: 'Nombre y teléfono son requeridos',
        variant: 'destructive'
      });
      return;
    }

    setIsSaving(true);
    try {
      if (editingClient) {
        // Update client
        const { error: updateError } = await supabase
          .from('clients')
          .update({
            full_name: formData.full_name,
            email: formData.email || null,
            phone: formData.phone,
            address: formData.address || null,
            city: formData.city || null,
            department: formData.department || null
          })
          .eq('id', editingClient.id);

        if (updateError) throw updateError;

        // Delete existing dogs and re-create
        await supabase
          .from('client_dogs')
          .delete()
          .eq('client_id', editingClient.id);

        if (dogs.length > 0) {
          const dogsToInsert = dogs.filter(d => d.name.trim()).map(d => ({
            client_id: editingClient.id,
            name: d.name,
            breed: d.breed || null,
            weight: d.weight || null,
            birth_date: d.birth_date || null
          }));

          if (dogsToInsert.length > 0) {
            const { error: dogsError } = await supabase
              .from('client_dogs')
              .insert(dogsToInsert);
            if (dogsError) throw dogsError;
          }
        }

        toast({ title: 'Cliente actualizado' });
      } else {
        // Create new client
        const { data: newClient, error: insertError } = await supabase
          .from('clients')
          .insert({
            full_name: formData.full_name,
            email: formData.email || null,
            phone: formData.phone,
            address: formData.address || null,
            city: formData.city || null,
            department: formData.department || null
          })
          .select()
          .single();

        if (insertError) throw insertError;

        if (dogs.length > 0) {
          const dogsToInsert = dogs.filter(d => d.name.trim()).map(d => ({
            client_id: newClient.id,
            name: d.name,
            breed: d.breed || null,
            weight: d.weight || null,
            birth_date: d.birth_date || null
          }));

          if (dogsToInsert.length > 0) {
            const { error: dogsError } = await supabase
              .from('client_dogs')
              .insert(dogsToInsert);
            if (dogsError) throw dogsError;
          }
        }

        toast({ title: 'Cliente creado' });
      }

      setShowModal(false);
      resetForm();
      fetchClients();
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

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este cliente y todos sus perros?')) return;

    try {
      const { error } = await supabase.from('clients').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Cliente eliminado' });
      fetchClients();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    }
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
        <h2 className="font-display text-2xl font-bold">Clientes ({clients.length})</h2>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-pelambre-lemon text-black font-bold rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
        >
          <Plus className="w-5 h-5" />
          Nuevo Cliente
        </button>
      </div>

      {clients.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No hay clientes registrados</p>
      ) : (
        <div className="space-y-4">
          {clients.map(client => (
            <div
              key={client.id}
              className="bg-gray-50 dark:bg-gray-700 rounded-xl border-2 border-black overflow-hidden"
            >
              <div
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() => setExpandedClient(expandedClient === client.id ? null : client.id)}
              >
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{client.full_name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {client.phone} • {client.city || 'Sin ciudad'}
                  </p>
                  {client.dogs.length > 0 && (
                    <div className="flex items-center gap-1 mt-1 text-sm text-pelambre-magenta">
                      <Dog className="w-4 h-4" />
                      {client.dogs.length} perro{client.dogs.length > 1 ? 's' : ''}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); openModal(client); }}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(client.id); }}
                    className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  {expandedClient === client.id ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </div>

              {expandedClient === client.id && (
                <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-600">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 text-sm">
                    <div>
                      <span className="text-gray-500">Email:</span>
                      <p>{client.email || '-'}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Dirección:</span>
                      <p>{client.address || '-'}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Departamento:</span>
                      <p>{client.department || '-'}</p>
                    </div>
                  </div>

                  {client.dogs.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-bold mb-2 flex items-center gap-2">
                        <Dog className="w-4 h-4" /> Perros
                      </h4>
                      <div className="grid gap-2">
                        {client.dogs.map(dog => (
                          <div
                            key={dog.id}
                            className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-600"
                          >
                            <p className="font-medium">{dog.name}</p>
                            <p className="text-sm text-gray-500">
                              {dog.breed || 'Sin raza'} • {dog.weight ? `${dog.weight} kg` : 'Sin peso'} • Edad: {calculateAge(dog.birth_date)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
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
              <h3 className="font-display text-xl font-bold">
                {editingClient ? 'Editar Cliente' : 'Nuevo Cliente'}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nombre completo *</label>
                  <input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-pelambre-magenta focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Teléfono *</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-pelambre-magenta focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-pelambre-magenta focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Dirección</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-pelambre-magenta focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Ciudad</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-pelambre-magenta focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Departamento</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-pelambre-magenta focus:outline-none"
                  />
                </div>
              </div>

              {/* Dogs section */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold flex items-center gap-2">
                    <Dog className="w-5 h-5" /> Perros
                  </h4>
                  <button
                    type="button"
                    onClick={addDog}
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-pelambre-indigo text-white rounded-lg hover:bg-pelambre-indigo/80"
                  >
                    <Plus className="w-4 h-4" /> Agregar perro
                  </button>
                </div>

                {dogs.map((dog, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl mb-3 relative">
                    <button
                      type="button"
                      onClick={() => removeDog(index)}
                      className="absolute top-2 right-2 p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-xs font-medium mb-1">Nombre *</label>
                        <input
                          type="text"
                          value={dog.name}
                          onChange={(e) => updateDog(index, 'name', e.target.value)}
                          className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1">Raza</label>
                        <input
                          type="text"
                          value={dog.breed || ''}
                          onChange={(e) => updateDog(index, 'breed', e.target.value)}
                          className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1">Peso (kg)</label>
                        <input
                          type="number"
                          value={dog.weight || ''}
                          onChange={(e) => updateDog(index, 'weight', e.target.value ? parseFloat(e.target.value) : null)}
                          className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1">Fecha nac. aprox.</label>
                        <input
                          type="date"
                          value={dog.birth_date || ''}
                          onChange={(e) => updateDog(index, 'birth_date', e.target.value || null)}
                          className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800"
                        />
                      </div>
                    </div>
                  </div>
                ))}
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
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-2 bg-pelambre-magenta text-white font-bold rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-50"
              >
                {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                {editingClient ? 'Guardar cambios' : 'Crear cliente'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminClients;
