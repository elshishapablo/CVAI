import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import type { LoginFormData } from '../../types';
import { Input } from '../ui/Input';
import Button from '../ui/Button';

export default function LoginForm() {
  const { login, loading, error } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    login(data.email, data.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Error del servidor */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <Input
        label="Email"
        type="email"
        placeholder="tu@email.com"
        autoComplete="email"
        error={errors.email?.message}
        {...register('email', {
          required: 'El email es obligatorio',
          pattern:  { value: /^\S+@\S+\.\S+$/, message: 'Email no válido' },
        })}
      />

      <Input
        label="Contraseña"
        type="password"
        placeholder="••••••••"
        autoComplete="current-password"
        error={errors.password?.message}
        {...register('password', {
          required: 'La contraseña es obligatoria',
        })}
      />

      <Button type="submit" fullWidth loading={loading} size="lg">
        Iniciar sesión
      </Button>

      <p className="text-center text-sm text-gray-600">
        ¿No tienes cuenta?{' '}
        <Link to="/register" className="text-blue-500 font-semibold hover:underline">
          Regístrate gratis
        </Link>
      </p>
    </form>
  );
}
