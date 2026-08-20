import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-ink/10 bg-ink text-paper relative overflow-hidden">
      <div className="orb w-64 h-64 bg-gold-500/15 -bottom-24 -left-10 animate-pulse-soft" />
      <div className="orb w-72 h-72 bg-sage-500/10 -top-24 right-0 animate-drift" />

      <div className="relative max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Logo inverted to="/" />

          <div className="flex items-center gap-8 text-[13px] text-paper/60">
            <Link to="/" className="hover:text-gold-300 transition-colors">
              Inicio
            </Link>
            <Link to="/pricing" className="hover:text-gold-300 transition-colors">
              Precios
            </Link>
            <Link to="/login" className="hover:text-gold-300 transition-colors">
              Iniciar sesión
            </Link>
          </div>

          <p className="text-[11px] tracking-wide uppercase text-paper/35">
            © {new Date().getFullYear()} CVMatch AI
          </p>
        </div>
      </div>
    </footer>
  );
}
