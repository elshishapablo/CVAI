import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import type { RegisterFormData } from '../../types';
import { Input } from '../ui/Input';
import Button from '../ui/Button';

export default function RegisterForm() {
  const { register: registerUser, loading, error } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const password = watch('password');

  const onSubmit = (data: RegisterFormData) => {
    registerUser(data.name, data.email, data.password);
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
        label="Nombre completo"
        type="text"
        placeholder="Tu nombre"
        autoComplete="name"
        error={errors.name?.message}
        {...register('name', {
          required:  'El nombre es obligatorio',
          minLength: { value: 2, message: 'Mínimo 2 caracteres' },
        })}
      />

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
        placeholder="Mínimo 8 caracteres"
        autoComplete="new-password"
        error={errors.password?.message}
        {...register('password', {
          required:  'La contraseña es obligatoria',
          minLength: { value: 8, message: 'Mínimo 8 caracteres' },
        })}
      />

      <Input
        label="Confirmar contraseña"
        type="password"
        placeholder="Repite tu contraseña"
        autoComplete="new-password"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword', {
          required: 'Confirma tu contraseña',
          validate:  (val) => val === password || 'Las contraseñas no coinciden',
        })}
      />

      <Button type="submit" fullWidth loading={loading} size="lg">
        Crear cuenta gratis
      </Button>

      <p className="text-center text-sm text-gray-600">
        ¿Ya tienes cuenta?{' '}
        <Link to="/login" className="text-blue-500 font-semibold hover:underline">
          Inicia sesión
        </Link>
      </p>
    </form>
  );
}
