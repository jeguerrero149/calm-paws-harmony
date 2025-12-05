import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Package, MessageSquare, LogOut, Mail, Lock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { z } from 'zod';
import AdminProducts from '@/components/admin/AdminProducts';
import AdminContacts from '@/components/admin/AdminContacts';

type Tab = 'products' | 'contacts';

const emailSchema = z.string().email('Correo electrónico inválido');
const passwordSchema = z.string().min(6, 'La contraseña debe tener al menos 6 caracteres');

const Admin = () => {
  const { toast } = useToast();
  const { user, isAdmin, loading, signIn, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('products');
  
  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      newErrors.email = emailResult.error.errors[0].message;
    }
    
    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) {
      newErrors.password = passwordResult.error.errors[0].message;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const { error } = await signIn(email, password);
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast({
            title: 'Error de acceso',
            description: 'Credenciales incorrectas. Verifica tu correo y contraseña.',
            variant: 'destructive'
          });
        } else {
          toast({
            title: 'Error',
            description: error.message,
            variant: 'destructive'
          });
        }
      } else {
        toast({
          title: '¡Bienvenido!',
          description: 'Has iniciado sesión correctamente.'
        });
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Ocurrió un error inesperado. Intenta de nuevo.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-pelambre-magenta" />
      </div>
    );
  }

  // Login form when not authenticated
  if (!user) {
    return (
      <div className="min-h-screen pt-20 pb-16 flex items-center justify-center bg-gradient-to-br from-pelambre-indigo/10 to-pelambre-magenta/10">
        <div className="w-full max-w-md mx-4">
          <div className="bg-white dark:bg-pelambre-violet/80 rounded-2xl shadow-xl p-8 border-4 border-black">
            <h1 className="font-display text-3xl font-bold text-center mb-2">
              Panel Admin
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
              Inicia sesión para acceder
            </p>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Correo electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={cn(
                      "w-full pl-10 pr-4 py-3 rounded-xl border-2 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-pelambre-magenta transition-all",
                      errors.email ? "border-red-500" : "border-gray-200 dark:border-gray-700"
                    )}
                    placeholder="tu@email.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={cn(
                      "w-full pl-10 pr-4 py-3 rounded-xl border-2 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-pelambre-magenta transition-all",
                      errors.password ? "border-red-500" : "border-gray-200 dark:border-gray-700"
                    )}
                    placeholder="••••••"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full bg-pelambre-magenta text-pelambre-violet font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
                  isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px]"
                )}
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Iniciar Sesión
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Access denied for non-admin users
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
            className="text-pelambre-magenta hover:underline font-medium"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    );
  }

  // Admin dashboard
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
                ? "bg-pelambre-magenta text-pelambre-violet shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
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
                ? "bg-pelambre-indigo text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                : "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
            )}
          >
            <MessageSquare className="w-5 h-5" />
            Prospectos
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