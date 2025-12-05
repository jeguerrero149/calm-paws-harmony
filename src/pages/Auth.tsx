import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { z } from 'zod';

const emailSchema = z.string().email('Correo electrónico inválido');
const passwordSchema = z.string().min(6, 'La contraseña debe tener al menos 6 caracteres');

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAdmin, loading, signIn, signUp } = useAuth();
  
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  useEffect(() => {
    if (!loading && user && isAdmin) {
      navigate('/admin');
    }
  }, [user, isAdmin, loading, navigate]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      if (isLogin) {
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
      } else {
        const { error } = await signUp(email, password);
        if (error) {
          if (error.message.includes('already registered')) {
            toast({
              title: 'Usuario existente',
              description: 'Este correo ya está registrado. Intenta iniciar sesión.',
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
            title: 'Cuenta creada',
            description: 'Tu cuenta ha sido creada. Un administrador debe asignarte el rol de admin para acceder al panel.'
          });
        }
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-calmpets-magenta" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16 flex items-center justify-center bg-gradient-to-br from-calmpets-cyan/10 to-calmpets-magenta/10">
      <div className="w-full max-w-md mx-4">
        <div className="bg-white dark:bg-calmpets-dark/80 rounded-2xl shadow-xl p-8 border-4 border-black">
          <h1 className="font-display text-3xl font-bold text-center mb-2">
            {isLogin ? 'Panel Admin' : 'Crear Cuenta'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
            {isLogin ? 'Inicia sesión para acceder' : 'Registra una nueva cuenta'}
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
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
                    "w-full pl-10 pr-4 py-3 rounded-xl border-2 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-calmpets-magenta transition-all",
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
                    "w-full pl-10 pr-4 py-3 rounded-xl border-2 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-calmpets-magenta transition-all",
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
                "w-full bg-calmpets-magenta text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
                isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px]"
              )}
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setErrors({});
              }}
              className="text-calmpets-cyan hover:underline font-medium"
            >
              {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
