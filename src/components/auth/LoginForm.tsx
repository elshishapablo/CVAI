import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import type { LoginFormData } from "../../types";
import { Input } from "../ui/Input";
import Button from "../ui/Button";

export default function LoginForm() {
  const { login, enterDemo, loading, error } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    login(data.email, data.password);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const email = watch("email")?.trim() ?? "";
        const password = watch("password")?.trim() ?? "";
        if (!email && !password) {
          enterDemo();
          return;
        }
        void handleSubmit(onSubmit)();
      }}
      className="space-y-5"
      noValidate
    >
      {error && (
        <div className="bg-wine-50 border border-wine-100 text-wine-600 rounded-2xl px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <Input
        label="Email"
        type="email"
        placeholder="tu@email.com"
        autoComplete="email"
        error={errors.email?.message}
        {...register("email", {
          required: "El email es obligatorio",
          pattern: { value: /^\S+@\S+\.\S+$/, message: "Email no válido" },
        })}
      />

      <Input
        label="Contraseña"
        type="password"
        placeholder="••••••••"
        autoComplete="current-password"
        error={errors.password?.message}
        {...register("password", {
          required: "La contraseña es obligatoria",
        })}
      />

      <Button type="submit" fullWidth loading={loading} size="lg">
        Iniciar sesión
      </Button>

      <p className="text-center text-sm text-ink-500">
        ¿No tienes cuenta?{" "}
        <Link to="/register" className="text-gold-700 font-medium hover:underline">
          Regístrate gratis
        </Link>
      </p>
    </form>
  );
}
