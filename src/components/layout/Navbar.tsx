import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import Badge from "../ui/Badge";
import Logo from "./Logo";
import { IconLogout, IconMenu, IconClose, IconStar } from "../ui/icons";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path: string) =>
    location.pathname === path
      ? "text-ink font-medium"
      : "text-ink-500 hover:text-ink";

  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/analysis/new", label: "Nuevo análisis" },
    { to: "/history", label: "Historial" },
    { to: "/pricing", label: "Precios" },
  ];

  return (
    <nav className="glass-nav border-b border-ink/10 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 h-[4.25rem] flex items-center justify-between">
        <Logo />

        {isAuthenticated && (
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`relative text-[13px] px-3.5 py-2 rounded-full transition-colors ${isActive(l.to)}`}
              >
                {location.pathname === l.to && (
                  <span className="absolute inset-0 rounded-full bg-ink/5" />
                )}
                <span className="relative">{l.label}</span>
              </Link>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2.5">
          {isAuthenticated && user ? (
            <>
              {user.plan === "pro" ? (
                <Badge variant="purple" className="hidden sm:inline-flex">
                  <IconStar className="w-3 h-3" /> Pro
                </Badge>
              ) : (
                <Badge variant="gray" className="hidden sm:inline-flex">
                  {user.analysisUsedThisMonth}/3
                </Badge>
              )}
              <span className="hidden sm:block text-sm text-ink-500">
                {user.name.split(" ")[0]}
              </span>
              <button
                onClick={handleLogout}
                className="hidden sm:inline-flex items-center gap-1.5 text-[13px] text-ink-400 hover:text-wine-600 transition-colors px-2 py-1.5"
              >
                <IconLogout className="w-4 h-4" />
                Salir
              </button>
              <button
                className="md:hidden w-10 h-10 grid place-items-center rounded-full hover:bg-ink/5 text-ink"
                onClick={() => setOpen((v) => !v)}
                aria-label="Menú"
              >
                {open ? <IconClose /> : <IconMenu />}
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-[13px] text-ink-500 hover:text-ink font-medium transition-colors px-2"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                className="btn-shine bg-ink text-paper text-[13px] font-medium px-4 py-2 rounded-full hover:bg-ink-700 transition-colors"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>

      {open && isAuthenticated && (
        <div className="md:hidden border-t border-ink/10 bg-paper-50/95 backdrop-blur-xl animate-fade-in">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`px-3 py-2.5 rounded-xl text-sm ${isActive(l.to)} ${
                  location.pathname === l.to ? "bg-ink/5" : ""
                }`}
              >
                {l.label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="mt-2 px-3 py-2.5 rounded-xl text-sm text-left text-wine-600 hover:bg-wine-50"
            >
              Salir
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
