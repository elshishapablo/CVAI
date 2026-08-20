import { Link } from "react-router-dom";
import RegisterForm from "../components/auth/RegisterForm";
import Logo from "../components/layout/Logo";

export default function Register() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="relative hidden lg:flex flex-col justify-between bg-ink text-paper p-12 overflow-hidden">
        <div className="orb w-80 h-80 bg-gold-500/20 -top-10 -left-10 animate-drift" />
        <div className="orb w-96 h-96 bg-sage-500/15 bottom-0 right-0 animate-pulse-soft" />
        <Logo inverted />
        <div className="relative max-w-md">
          <p className="font-display text-4xl leading-snug mb-6">
            Empieza con tres análisis. Sin tarjeta.
          </p>
          <p className="text-paper/55 leading-relaxed">
            Cada oferta merece un CV distinto. Aquí lo mides, lo reescribes y lo
            envías con más precisión.
          </p>
        </div>
        <p className="relative text-[11px] tracking-[0.18em] uppercase text-paper/30">
          3 análisis gratis cada mes
        </p>
      </div>

      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md animate-scale-in">
          <div className="lg:hidden text-center mb-8">
            <Logo />
          </div>
          <p className="text-[11px] tracking-[0.2em] uppercase text-gold-700 mb-3">
            Registro
          </p>
          <h1 className="font-display text-3xl text-ink mb-1">Crea tu cuenta</h1>
          <p className="text-ink-500 text-sm mb-8">Gratis · sin tarjeta · listo en un minuto</p>

          <div className="bg-white/70 border border-ink/10 rounded-[1.6rem] shadow-lift p-8 hairline">
            <RegisterForm />
          </div>
          <p className="text-center text-xs text-ink-400 mt-6">
            <Link to="/" className="hover:text-ink transition-colors">
              ← Volver al inicio
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
