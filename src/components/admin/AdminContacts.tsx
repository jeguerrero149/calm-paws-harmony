import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Mail, Phone, Calendar, User, MessageSquare, CheckCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  pet_info: string | null;
  status: string;
  created_at: string;
}

const subjectLabels: Record<string, string> = {
  'product-info': 'Información de producto',
  'order': 'Pedido',
  'support': 'Soporte técnico',
  'distribution': 'Distribución',
  'other': 'Otro'
};

const AdminContacts = () => {
  const { toast } = useToast();
  const [prospects, setProspects] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProspect, setSelectedProspect] = useState<Contact | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  useEffect(() => {
    fetchProspects();
  }, []);

  const fetchProspects = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('form_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProspects(data || []);
    } catch (err) {
      console.error('Error fetching prospects:', err);
      toast({
        title: 'Error',
        description: 'No se pudieron cargar los prospectos.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    setUpdatingStatus(id);
    try {
      const { error } = await supabase
        .from('form_submissions')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setProspects(prospects.map(c => 
        c.id === id ? { ...c, status } : c
      ));
      
      if (selectedProspect?.id === id) {
        setSelectedProspect({ ...selectedProspect, status });
      }

      toast({
        title: 'Estado actualizado',
        description: `El prospecto ha sido marcado como ${status}.`
      });
    } catch (err) {
      console.error('Error updating status:', err);
      toast({
        title: 'Error',
        description: 'No se pudo actualizar el estado.',
        variant: 'destructive'
      });
    } finally {
      setUpdatingStatus(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('es-CO', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(new Date(dateString));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'resolved':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new': return 'Nuevo';
      case 'in_progress': return 'En proceso';
      case 'resolved': return 'Resuelto';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-pelambre-indigo" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-display text-2xl font-bold mb-6">
        Prospectos ({prospects.length})
      </h2>

      {prospects.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No hay prospectos registrados.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Prospect List */}
          <div className="lg:col-span-1 space-y-3 max-h-[600px] overflow-y-auto pr-2">
            {prospects.map((prospect) => (
              <button
                key={prospect.id}
                onClick={() => setSelectedProspect(prospect)}
                className={cn(
                  "w-full text-left p-4 rounded-xl border-2 transition-all",
                  selectedProspect?.id === prospect.id
                    ? "border-pelambre-indigo bg-pelambre-indigo/10"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                )}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium truncate">{prospect.name}</span>
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ml-2",
                    getStatusColor(prospect.status)
                  )}>
                    {getStatusLabel(prospect.status)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 truncate">{prospect.email}</p>
                <p className="text-sm text-gray-400 mt-1">
                  {subjectLabels[prospect.subject] || prospect.subject}
                </p>
              </button>
            ))}
          </div>

          {/* Prospect Detail */}
          <div className="lg:col-span-2">
            {selectedProspect ? (
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-display text-xl font-bold">{selectedProspect.name}</h3>
                    <p className="text-gray-500 text-sm">
                      {subjectLabels[selectedProspect.subject] || selectedProspect.subject}
                    </p>
                  </div>
                  <span className={cn(
                    "px-3 py-1 rounded-full text-sm font-medium",
                    getStatusColor(selectedProspect.status)
                  )}>
                    {getStatusLabel(selectedProspect.status)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-pelambre-magenta" />
                    <a href={`mailto:${selectedProspect.email}`} className="hover:underline">
                      {selectedProspect.email}
                    </a>
                  </div>
                  {selectedProspect.phone && (
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="w-4 h-4 text-pelambre-indigo" />
                      <a href={`tel:${selectedProspect.phone}`} className="hover:underline">
                        {selectedProspect.phone}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    {formatDate(selectedProspect.created_at)}
                  </div>
                </div>

                {selectedProspect.pet_info && (
                  <div className="mb-6 p-4 bg-pelambre-indigo/10 rounded-xl">
                    <div className="flex items-center gap-2 text-sm font-medium text-pelambre-indigo mb-1">
                      <User className="w-4 h-4" />
                      Información de mascota
                    </div>
                    <p className="text-sm">{selectedProspect.pet_info}</p>
                  </div>
                )}

                <div className="mb-6">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                    <MessageSquare className="w-4 h-4" />
                    Mensaje
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                    <p className="whitespace-pre-wrap">{selectedProspect.message}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-gray-500 mr-2 py-2">Cambiar estado:</span>
                  {['new', 'in_progress', 'resolved'].map((status) => (
                    <button
                      key={status}
                      onClick={() => updateStatus(selectedProspect.id, status)}
                      disabled={updatingStatus === selectedProspect.id || selectedProspect.status === status}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all border-2",
                        selectedProspect.status === status
                          ? "border-black bg-black text-white cursor-default"
                          : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                      )}
                    >
                      {updatingStatus === selectedProspect.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : status === 'resolved' ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : status === 'in_progress' ? (
                        <Clock className="w-4 h-4" />
                      ) : null}
                      {getStatusLabel(status)}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500 bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 p-12">
                Selecciona un prospecto para ver los detalles
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContacts;
