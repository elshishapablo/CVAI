import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import {
  IconArrow,
  IconBriefcase,
  IconChart,
  IconCheck,
  IconDoc,
  IconKey,
  IconMail,
  IconSpark,
} from "../components/ui/icons";

const steps = [
  {
    icon: IconDoc,
    step: "01",
    title: "Sube tu CV",
    desc: "Arrastra tu PDF. Extraemos el texto con precisión, sin perder el hilo de tu trayectoria.",
  },
  {
    icon: IconBriefcase,
    step: "02",
    title: "Pega la oferta",
    desc: "Copia la descripción del puesto. Cuanto más detalle, más nítido el diagnóstico.",
  },
  {
    icon: IconSpark,
    step: "03",
    title: "Recibe el análisis",
    desc: "Score, keywords ATS, reescrituras y el primer párrafo de tu carta — en segundos.",
  },
];

const features = [
  {
    icon: IconChart,
    title: "Score del 0 al 100",
    desc: "Una lectura clara de qué tan alineado estás con el puesto. Sin ruido, sin relleno.",
    span: "md:col-span-2",
  },
  {
    icon: IconSpark,
    title: "Sugerencias concretas",
    desc: "Texto listo para copiar que mejora cada sección de tu CV.",
    span: "",
  },
  {
    icon: IconKey,
    title: "Keywords ATS",
    desc: "Las palabras que te faltan para pasar el filtro automático.",
    span: "",
  },
  {
    icon: IconMail,
    title: "Carta de presentación",
    desc: "El primer párrafo, personalizado para ese cargo y esa empresa.",
    span: "md:col-span-2",
  },
];

export default function Home() {
  return (
    <div className="relative">
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative px-4 pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
          <div>
            <p className="animate-fade-up inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase text-gold-700 bg-gold-50 border border-gold-200/80 rounded-full px-3.5 py-1.5 mb-6">
              <IconSpark className="w-3.5 h-3.5" />
              Análisis de CV con IA
            </p>
            <h1 className="animate-fade-up delay-1 font-display text-[2.75rem] md:text-6xl lg:text-[4.15rem] font-semibold text-ink leading-[1.08] mb-6">
              Tu CV, afinado
              <br />
              para <span className="italic text-gradient-gold">esa</span> entrevista.
            </h1>
            <p className="animate-fade-up delay-2 text-lg md:text-xl text-ink-500 mb-10 max-w-xl leading-relaxed font-light">
              Sube tu currículum, pega la oferta y recibe un diagnóstico preciso:
              compatibilidad, huecos ATS y reescrituras que sí se pueden pegar.
            </p>
            <div className="animate-fade-up delay-3 flex flex-col sm:flex-row gap-3">
              <Link to="/register">
                <Button size="lg">
                  Analizar mi CV gratis
                  <IconArrow className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline">
                  Ya tengo cuenta
                </Button>
              </Link>
            </div>
            <p className="animate-fade-up delay-4 mt-5 text-sm text-ink-400">
              3 análisis al mes · sin tarjeta · listo en menos de un minuto
            </p>
          </div>

          {/* Preview card */}
          <div className="animate-fade-up delay-2 relative hidden md:block">
            <div className="absolute -inset-6 bg-gradient-to-br from-gold-200/40 to-sage-200/30 blur-2xl rounded-full" />
            <div className="relative animate-float rounded-[1.75rem] border border-white/70 bg-white/80 backdrop-blur-xl shadow-lift p-6 hairline">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-ink-400 mb-1">
                    Compatibilidad
                  </p>
                  <p className="font-display text-lg text-ink">Senior Product Designer</p>
                  <p className="text-sm text-ink-400">Atelier Studio</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-5xl font-semibold text-sage-700 leading-none">87</p>
                  <p className="text-[11px] text-ink-400 mt-1">/ 100</p>
                </div>
              </div>
              <div className="h-1.5 rounded-full bg-ink/5 overflow-hidden mb-6">
                <div className="h-full w-[87%] rounded-full bg-gradient-to-r from-sage-700 to-gold-400" />
              </div>
              <div className="flex flex-wrap gap-2 mb-5">
                {["Figma", "Design systems", "Research"].map((k) => (
                  <span
                    key={k}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-sage-50 text-sage-800 border border-sage-100"
                  >
                    {k}
                  </span>
                ))}
                {["Motion", "SQL"].map((k) => (
                  <span
                    key={k}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-wine-50 text-wine-600 border border-wine-100"
                  >
                    {k}
                  </span>
                ))}
              </div>
              <p className="text-sm text-ink-500 leading-relaxed italic font-display">
                “Perfil sólido en producto visual. Falta explicitar impacto cuantificado
                y herramientas de prototipo avanzado.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── STEPS ────────────────────────────────────────────────── */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-[11px] tracking-[0.22em] uppercase text-gold-700 mb-3">
            El ritual
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-center text-ink mb-3">
            Tres gestos. Un diagnóstico.
          </h2>
          <p className="text-center text-ink-500 mb-14 max-w-lg mx-auto">
            En menos de un minuto tienes todo lo que necesitas reescribir antes de enviar.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative">
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />
            {steps.map((s) => (
              <div
                key={s.step}
                className="card-hover relative bg-white/70 border border-ink/10 rounded-[1.5rem] p-7 hairline"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="w-11 h-11 rounded-2xl bg-ink text-gold-300 grid place-items-center">
                    <s.icon className="w-5 h-5" />
                  </span>
                  <span className="font-display text-sm text-ink-400">{s.step}</span>
                </div>
                <h3 className="font-display text-xl text-ink mb-2">{s.title}</h3>
                <p className="text-sm text-ink-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────── */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink mb-10 max-w-md">
            Todo lo que sale de cada análisis.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((f, i) => {
              const dark = i % 2 === 0;
              return (
                <div
                  key={f.title}
                  className={`card-hover ${f.span} rounded-[1.5rem] border border-ink/10 p-7 relative overflow-hidden ${
                    dark ? "bg-ink text-paper" : "bg-white/70 text-ink hairline"
                  }`}
                >
                  <div
                    className={`absolute -right-8 -top-8 w-32 h-32 rounded-full blur-2xl ${
                      dark ? "bg-gold-400/10" : "bg-gold-300/40"
                    }`}
                  />
                  <div className="relative">
                    <span
                      className={`w-10 h-10 rounded-xl grid place-items-center mb-5 ${
                        dark ? "bg-white/5 text-gold-300" : "bg-ink text-gold-300"
                      }`}
                    >
                      <f.icon className="w-5 h-5" />
                    </span>
                    <h3 className="font-display text-xl mb-2">{f.title}</h3>
                    <p
                      className={`text-sm leading-relaxed ${
                        dark ? "text-paper/60" : "text-ink-500"
                      }`}
                    >
                      {f.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PRICING PREVIEW ──────────────────────────────────────── */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-[11px] tracking-[0.22em] uppercase text-gold-700 mb-3">
            Planes
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-center text-ink mb-3">
            Simple, como debe ser.
          </h2>
          <p className="text-center text-ink-500 mb-12">Sin contratos. Cancela cuando quieras.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-[1.6rem] border border-ink/10 bg-white/70 p-8 hairline">
              <h3 className="font-display text-2xl text-ink mb-1">Gratuito</h3>
              <div className="flex items-end gap-1 mb-8">
                <span className="font-display text-5xl text-ink">€0</span>
                <span className="text-sm text-ink-400 mb-1.5">/mes</span>
              </div>
              <ul className="space-y-3 mb-10 text-sm text-ink-600">
                {["3 análisis por mes", "Score de compatibilidad", "Sugerencias de mejora", "Historial de análisis"].map(
                  (f) => (
                    <li key={f} className="flex items-center gap-2.5">
                      <IconCheck className="w-4 h-4 text-sage-600 shrink-0" />
                      {f}
                    </li>
                  ),
                )}
              </ul>
              <Link to="/register">
                <Button variant="outline" fullWidth>
                  Empezar gratis
                </Button>
              </Link>
            </div>

            <div className="relative rounded-[1.6rem] border border-gold-400/40 bg-ink p-8 text-paper overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-400/15 via-transparent to-sage-500/10" />
              <div className="relative">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-display text-2xl">Pro</h3>
                  <span className="text-[10px] tracking-[0.16em] uppercase bg-gold-400 text-ink px-2.5 py-1 rounded-full font-semibold">
                    Popular
                  </span>
                </div>
                <div className="flex items-end gap-1 mb-8">
                  <span className="font-display text-5xl">$7</span>
                  <span className="text-sm text-paper/50 mb-1.5">USD/mes</span>
                </div>
                <ul className="space-y-3 mb-10 text-sm text-paper/75">
                  {[
                    "Análisis ilimitados",
                    "Score de compatibilidad",
                    "Sugerencias detalladas",
                    "Historial completo",
                    "Carta de presentación IA",
                    "Soporte prioritario",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2.5">
                      <IconCheck className="w-4 h-4 text-gold-300 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/register">
                  <Button variant="secondary" fullWidth>
                    Empezar Pro
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="px-4 pb-24">
        <div className="max-w-6xl mx-auto relative overflow-hidden rounded-[2rem] bg-ink px-8 py-16 md:py-20 text-center">
          <div className="orb w-80 h-80 bg-gold-400/20 top-0 left-10 animate-pulse-soft" />
          <div className="orb w-96 h-96 bg-sage-500/15 -bottom-20 right-0 animate-drift" />
          <div className="relative">
            <h2 className="font-display text-3xl md:text-5xl text-paper mb-4">
              La entrevista se gana antes de enviarlo.
            </h2>
            <p className="text-paper/55 mb-8 max-w-xl mx-auto">
              Afina el CV para el puesto concreto. Gratis, tres veces al mes.
            </p>
            <Link to="/register">
              <Button variant="secondary" size="lg">
                Analizar mi CV ahora
                <IconArrow className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
