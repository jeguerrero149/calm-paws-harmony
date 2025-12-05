import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2, Package, MessageSquare, LogOut, Plus, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import AdminProducts from '@/components/admin/AdminProducts';
import AdminContacts from '@/components/admin/AdminContacts';

type Tab = 'products' | 'contacts';

const Admin = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('products');

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-calmpets-magenta" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen pt-20 pb-16 flex items-center justify-center">
        <div className="text-center max-w-md mx-4">
          <div className="bg-yellow-100 dark:bg-yellow-900/30 p-6 rounded-2xl border-4 border-black mb-6">
            <h2 className="font-display text-2xl font-bold mb-2">Acceso Restringido</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Tu cuenta no tiene permisos de administrador. Contacta a un administrador para obtener acceso.
            </p>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Conectado como: {user.email}
          </p>
          <button
            onClick={handleSignOut}
            className="text-calmpets-magenta hover:underline font-medium"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold">Panel de Administración</h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              Conectado como: {user.email}
            </p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('products')}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all border-2 border-black whitespace-nowrap",
              activeTab === 'products'
                ? "bg-calmpets-magenta text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                : "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
            )}
          >
            <Package className="w-5 h-5" />
            Productos
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all border-2 border-black whitespace-nowrap",
              activeTab === 'contacts'
                ? "bg-calmpets-cyan text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                : "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
            )}
          >
            <MessageSquare className="w-5 h-5" />
            Contactos
          </button>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
          {activeTab === 'products' && <AdminProducts />}
          {activeTab === 'contacts' && <AdminContacts />}
        </div>
      </div>
    </div>
  );
};

export default Admin;
