import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import { Link } from "react-router-dom";
import { IconCheck, IconStar } from "../components/ui/icons";

const freePlanFeatures = [
  "3 análisis por mes",
  "Score de compatibilidad (0-100)",
  "Análisis de fortalezas y debilidades",
  "Detección de keywords",
  "Historial de análisis",
];

const proPlanFeatures = [
  "Análisis ilimitados",
  "Score de compatibilidad (0-100)",
  "Análisis de fortalezas y debilidades",
  "Detección de keywords",
  "Sugerencias con texto listo para copiar",
  "Carta de presentación personalizada",
  "Historial completo",
  "Soporte prioritario",
];

export default function Pricing() {
  const { user, isAuthenticated } = useAuthStore();
  const { upgradePlan, loading } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [upgrading, setUpgrading] = useState(false);

  const isPro = user?.plan === "pro";
  const isFree = user?.plan === "free" || !isAuthenticated;

  const handleUpgrade = async () => {
    setUpgrading(true);
    await upgradePlan("pro");
    setUpgrading(false);
    setShowModal(false);
  };

  const handleDowngrade = async () => {
    await upgradePlan("free");
  };

  return (
    <div className="relative px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[11px] tracking-[0.22em] uppercase text-gold-700 mb-3">
            Precios
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-ink mb-3">
            Planes claros. Sin letra pequeña.
          </h1>
          <p className="text-ink-500 text-lg max-w-xl mx-auto">
            Sin contratos. Sin sorpresas. Cancela cuando quieras.
          </p>
          {isPro && (
            <div className="mt-5 inline-flex items-center gap-2 bg-gold-50 text-gold-800 text-sm px-4 py-2 rounded-full border border-gold-200">
              <IconStar className="w-4 h-4" /> Estás en el plan Pro
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          <div
            className={`bg-white/70 rounded-[1.6rem] border p-8 flex flex-col hairline ${
              isFree ? "border-gold-400/50 shadow-glow" : "border-ink/10"
            }`}
          >
            {isFree && (
              <span className="text-[11px] tracking-[0.16em] uppercase text-gold-700 mb-3">
                Plan actual
              </span>
            )}
            <h2 className="font-display text-2xl text-ink mb-2">Gratuito</h2>
            <div className="flex items-end gap-1 mb-8">
              <span className="font-display text-5xl text-ink">€0</span>
              <span className="text-ink-400 mb-1">/mes</span>
            </div>
            <ul className="space-y-3 flex-1 mb-8">
              {freePlanFeatures.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-ink-600">
                  <IconCheck className="w-4 h-4 text-sage-600 shrink-0" /> {f}
                </li>
              ))}
            </ul>

            {isAuthenticated ? (
              isPro ? (
                <Button
                  variant="ghost"
                  fullWidth
                  loading={loading}
                  onClick={handleDowngrade}
                  className="text-ink-400"
                >
                  Cambiar a gratuito
                </Button>
              ) : (
                <Button variant="outline" fullWidth disabled>
                  Plan actual
                </Button>
              )
            ) : (
              <Link to="/register">
                <Button variant="outline" fullWidth>
                  Empezar gratis
                </Button>
              </Link>
            )}
          </div>

          <div
            className={`relative rounded-[1.6rem] border p-8 flex flex-col overflow-hidden ${
              isPro
                ? "border-gold-400/50 bg-ink"
                : "border-gold-400/30 bg-ink"
            } text-paper`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gold-400/18 via-transparent to-sage-500/10" />
            <div className="relative flex flex-col h-full">
              {isPro && (
                <span className="text-[11px] tracking-[0.16em] uppercase text-gold-300 mb-3">
                  Plan actual
                </span>
              )}
              <div className="relative flex items-start justify-between gap-3 mb-2">
                <h2 className="font-display text-2xl">Pro</h2>
                <span className="bg-gold-400 text-ink text-[10px] tracking-[0.14em] uppercase font-semibold px-2.5 py-1 rounded-full">
                  Popular
                </span>
              </div>
              <div className="flex items-end gap-1 mb-8">
                <span className="font-display text-5xl">$7</span>
                <span className="text-paper/50 mb-1">USD/mes</span>
              </div>
              <ul className="space-y-3 flex-1 mb-8">
                {proPlanFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-paper/75">
                    <IconCheck className="w-4 h-4 text-gold-300 shrink-0" /> {f}
                  </li>
                ))}
              </ul>

              {isAuthenticated ? (
                isPro ? (
                  <Button variant="secondary" fullWidth disabled>
                    Plan actual
                  </Button>
                ) : (
                  <Button variant="secondary" fullWidth onClick={() => setShowModal(true)}>
                    Actualizar a Pro
                  </Button>
                )
              ) : (
                <Link to="/register">
                  <Button variant="secondary" fullWidth>
                    Empezar Pro
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="mt-20 max-w-2xl mx-auto">
          <h2 className="font-display text-3xl text-ink text-center mb-8">Preguntas</h2>
          <div className="space-y-3">
            {[
              {
                q: "¿Puedo cancelar en cualquier momento?",
                a: "Sí. Puedes cambiar de Pro a Gratuito cuando quieras desde esta página.",
              },
              {
                q: "¿Se resetean los análisis gratuitos cada mes?",
                a: "Sí. El contador de 3 análisis se resetea el día 1 de cada mes calendario.",
              },
              {
                q: "¿Mis CVs se almacenan?",
                a: "Solo guardamos el texto extraído del PDF para el historial. No almacenamos el archivo original.",
              },
            ].map(({ q, a }) => (
              <div
                key={q}
                className="bg-white/70 rounded-[1.2rem] border border-ink/10 p-5 hairline"
              >
                <p className="font-display text-lg text-ink mb-1.5">{q}</p>
                <p className="text-sm text-ink-500 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Actualizar a Pro">
        <p className="text-ink-600 text-sm mb-6 leading-relaxed">
          Vas a actualizar tu cuenta al plan <strong>Pro ($7 USD/mes)</strong> con análisis
          ilimitados.
          <br />
          <br />
          <span className="text-gold-700 text-xs">
            En esta demo, el upgrade es inmediato y gratuito (sin pasarela de pago real).
          </span>
        </p>
        <div className="flex gap-3">
          <Button fullWidth loading={upgrading} onClick={handleUpgrade}>
            Confirmar upgrade
          </Button>
          <Button fullWidth variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
        </div>
      </Modal>
    </div>
  );
}
