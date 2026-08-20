import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import type { RegisterFormData } from "../../types";
import { Input } from "../ui/Input";
import Button from "../ui/Button";

export default function RegisterForm() {
  const { register: registerUser, enterDemo, loading, error } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const password = watch("password");

  const onSubmit = (data: RegisterFormData) => {
    registerUser(data.name, data.email, data.password);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const name = watch("name")?.trim() ?? "";
        const email = watch("email")?.trim() ?? "";
        const pass = watch("password")?.trim() ?? "";
        const confirm = watch("confirmPassword")?.trim() ?? "";
        if (!name && !email && !pass && !confirm) {
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
        label="Nombre completo"
        type="text"
        placeholder="Tu nombre"
        autoComplete="name"
        error={errors.name?.message}
        {...register("name", {
          required: "El nombre es obligatorio",
          minLength: { value: 2, message: "Mínimo 2 caracteres" },
        })}
      />

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
        placeholder="Mínimo 8 caracteres"
        autoComplete="new-password"
        error={errors.password?.message}
        {...register("password", {
          required: "La contraseña es obligatoria",
          minLength: { value: 8, message: "Mínimo 8 caracteres" },
        })}
      />

      <Input
        label="Confirmar contraseña"
        type="password"
        placeholder="Repite tu contraseña"
        autoComplete="new-password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword", {
          required: "Confirma tu contraseña",
          validate: (val) => val === password || "Las contraseñas no coinciden",
        })}
      />

      <Button type="submit" fullWidth loading={loading} size="lg">
        Crear cuenta gratis
      </Button>

      <p className="text-center text-sm text-ink-500">
        ¿Ya tienes cuenta?{" "}
        <Link to="/login" className="text-gold-700 font-medium hover:underline">
          Inicia sesión
        </Link>
      </p>
    </form>
  );
}
