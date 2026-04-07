import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { Link } from 'react-router-dom';

const freePlanFeatures = [
  '3 análisis por mes',
  'Score de compatibilidad (0-100)',
  'Análisis de fortalezas y debilidades',
  'Detección de keywords',
  'Historial de análisis',
];

const proPlanFeatures = [
  'Análisis ilimitados',
  'Score de compatibilidad (0-100)',
  'Análisis de fortalezas y debilidades',
  'Detección de keywords',
  'Sugerencias con texto listo para copiar',
  'Carta de presentación personalizada',
  'Historial completo',
  'Soporte prioritario',
];

export default function Pricing() {
  const { user, isAuthenticated } = useAuthStore();
  const { upgradePlan, loading }  = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [upgrading, setUpgrading] = useState(false);

  const isPro  = user?.plan === 'pro';
  const isFree = user?.plan === 'free' || !isAuthenticated;

  const handleUpgrade = async () => {
    setUpgrading(true);
    await upgradePlan('pro');
    setUpgrading(false);
    setShowModal(false);
  };

  const handleDowngrade = async () => {
    await upgradePlan('free');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Planes simples y transparentes
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Sin contratos. Sin sorpresas. Cancela cuando quieras.
          </p>
          {isPro && (
            <div className="mt-4 inline-block bg-purple-100 text-purple-700 font-semibold text-sm px-4 py-2 rounded-full">
              ⭐ Estás en el plan Pro
            </div>
          )}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">

          {/* ── FREE ──────────────────────────────────────────── */}
          <div className={`bg-white rounded-2xl border-2 p-8 flex flex-col ${isFree ? 'border-blue-500' : 'border-gray-200'}`}>
            {isFree && (
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-3">
                ← Tu plan actual
              </span>
            )}
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Gratuito</h2>
            <div className="flex items-end gap-1 mb-6">
              <span className="text-5xl font-extrabold text-gray-900">€0</span>
              <span className="text-gray-400 mb-1">/mes</span>
            </div>
            <ul className="space-y-3 flex-1 mb-8">
              {freePlanFeatures.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-blue-500 shrink-0">✓</span> {f}
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
                  className="text-gray-400"
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
                <Button variant="outline" fullWidth>Empezar gratis</Button>
              </Link>
            )}
          </div>

          {/* ── PRO ───────────────────────────────────────────── */}
          <div className={`rounded-2xl border-2 p-8 flex flex-col ${isPro ? 'border-purple-500 bg-gradient-to-br from-blue-600 to-indigo-700' : 'border-blue-500 bg-blue-600'} text-white relative`}>
            {isPro && (
              <span className="text-xs font-bold text-blue-200 uppercase tracking-wide mb-3">
                ← Tu plan actual
              </span>
            )}
            <div className="absolute top-4 right-4">
              <span className="bg-amber-400 text-amber-900 text-xs font-bold px-2 py-1 rounded-full">
                MÁS POPULAR
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-2">Pro</h2>
            <div className="flex items-end gap-1 mb-6">
              <span className="text-5xl font-extrabold">$7</span>
              <span className="text-blue-200 mb-1">USD/mes</span>
            </div>
            <ul className="space-y-3 flex-1 mb-8">
              {proPlanFeatures.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-blue-100">
                  <span className="text-blue-200 shrink-0">✓</span> {f}
                </li>
              ))}
            </ul>

            {isAuthenticated ? (
              isPro ? (
                <Button variant="secondary" fullWidth disabled>
                  ✓ Plan actual
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  fullWidth
                  onClick={() => setShowModal(true)}
                >
                  Actualizar a Pro →
                </Button>
              )
            ) : (
              <Link to="/register">
                <Button variant="secondary" fullWidth>Empezar Pro</Button>
              </Link>
            )}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Preguntas frecuentes</h2>
          <div className="space-y-4">
            {[
              { q: '¿Puedo cancelar en cualquier momento?', a: 'Sí. Puedes cambiar de Pro a Gratuito cuando quieras desde esta página.' },
              { q: '¿Se resetean los análisis gratuitos cada mes?', a: 'Sí. El contador de 3 análisis se resetea el día 1 de cada mes calendario.' },
              { q: '¿Mis CVs se almacenan?', a: 'Solo guardamos el texto extraído del PDF para mostrarte el historial. No almacenamos el archivo PDF original.' },
            ].map(({ q, a }) => (
              <div key={q} className="bg-white rounded-xl border border-gray-200 p-5">
                <p className="font-semibold text-gray-900 mb-2">{q}</p>
                <p className="text-sm text-gray-500">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de confirmación de upgrade */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Actualizar a Pro"
      >
        <p className="text-gray-600 text-sm mb-6">
          Vas a actualizar tu cuenta al plan <strong>Pro ($7 USD/mes)</strong> con análisis ilimitados.
          <br /><br />
          <span className="text-amber-600 text-xs">
            ℹ️ En esta demo, el upgrade es inmediato y gratuito (sin pasarela de pago real).
          </span>
        </p>
        <div className="flex gap-3">
          <Button
            fullWidth
            loading={upgrading}
            onClick={handleUpgrade}
          >
            Confirmar upgrade
          </Button>
          <Button
            fullWidth
            variant="secondary"
            onClick={() => setShowModal(false)}
          >
            Cancelar
          </Button>
        </div>
      </Modal>
    </div>
  );
}
