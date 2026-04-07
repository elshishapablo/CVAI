import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const steps = [
  { icon: '📄', step: '1', title: 'Sube tu CV', desc: 'Arrastra tu CV en PDF. Extraemos el texto automáticamente.' },
  { icon: '📋', step: '2', title: 'Pega la oferta', desc: 'Copia la descripción del trabajo que te interesa.' },
  { icon: '🤖', step: '3', title: 'Recibe tu análisis', desc: 'La IA analiza la compatibilidad y genera sugerencias concretas en segundos.' },
];

const features = [
  { icon: '📊', title: 'Score del 0 al 100', desc: 'Visualiza exactamente qué tan compatible eres con el puesto.' },
  { icon: '💡', title: 'Sugerencias concretas', desc: 'Texto listo para copiar que mejora cada sección de tu CV.' },
  { icon: '🔑', title: 'Análisis de keywords', desc: 'Identifica las palabras clave que te faltan para pasar filtros ATS.' },
  { icon: '✉️', title: 'Carta de presentación', desc: 'El primer párrafo de tu carta, personalizado para cada cargo.' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">

          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
            Optimiza tu CV con{' '}
            <span className="text-blue-500">Inteligencia Artificial</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Sube tu CV, pega la descripción del trabajo y nuestra IA te dice exactamente
            qué cambiar para conseguir la entrevista.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="shadow-lg shadow-blue-200">
                Analizar mi CV gratis →
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">
                Ya tengo cuenta
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-400">
            3 análisis gratis al mes · Sin tarjeta de crédito
          </p>
        </div>
      </section>

      {/* ── 3 PASOS ──────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            ¿Cómo funciona?
          </h2>
          <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
            En menos de 30 segundos obtienes un análisis completo con todo lo que necesitas mejorar.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.step} className="relative text-center p-6 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {s.step}
                </div>
                <div className="text-4xl mb-4 mt-2">{s.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Todo lo que obtienes en cada análisis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:border-blue-200 transition-all">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{f.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING PREVIEW ──────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Precios simples y transparentes
          </h2>
          <p className="text-center text-gray-500 mb-12">Sin sorpresas. Cancela cuando quieras.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* FREE */}
            <div className="rounded-2xl border-2 border-gray-200 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Gratuito</h3>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-4xl font-extrabold text-gray-900">€0</span>
                <span className="text-sm text-gray-400 mb-1">/mes</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm text-gray-600">
                {['3 análisis por mes', 'Score de compatibilidad', 'Sugerencias de mejora', 'Historial de análisis'].map(f => (
                  <li key={f} className="flex items-center gap-2"><span className="text-blue-500">✓</span>{f}</li>
                ))}
              </ul>
              <Link to="/register"><Button variant="outline" fullWidth>Empezar gratis</Button></Link>
            </div>

            {/* PRO */}
            <div className="rounded-2xl border-2 border-blue-500 bg-blue-600 p-8 text-white">
              <h3 className="text-xl font-bold mb-1">Pro</h3>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-4xl font-extrabold">$7</span>
                <span className="text-sm text-blue-200 mb-1">USD/mes</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm text-blue-100">
                {['Análisis ilimitados', 'Score de compatibilidad', 'Sugerencias detalladas', 'Historial completo', 'Carta de presentación IA', 'Soporte prioritario'].map(f => (
                  <li key={f} className="flex items-center gap-2"><span className="text-blue-200">✓</span>{f}</li>
                ))}
              </ul>
              <Link to="/register"><Button variant="secondary" fullWidth>Empezar Pro</Button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">¿Listo para conseguir esa entrevista?</h2>
        <p className="text-blue-100 mb-8 max-w-xl mx-auto">
          Únete a miles de candidatos que usan CVMatch AI para mejorar sus CVs y conseguir más entrevistas.
        </p>
        <Link to="/register">
          <Button variant="secondary" size="lg">
            Analizar mi CV ahora — es gratis
          </Button>
        </Link>
      </section>
    </div>
  );
}
