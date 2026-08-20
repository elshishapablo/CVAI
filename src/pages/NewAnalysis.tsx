import { Link } from "react-router-dom";
import UploadForm from "../components/analysis/UploadForm";
import { IconArrow } from "../components/ui/icons";

export default function NewAnalysis() {
  return (
    <div className="relative px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-ink-400 hover:text-ink mb-8 transition-colors"
        >
          <span className="rotate-180 inline-flex">
            <IconArrow className="w-4 h-4" />
          </span>
          Dashboard
        </Link>

        <p className="text-[11px] tracking-[0.2em] uppercase text-gold-700 mb-2">Nuevo</p>
        <h1 className="font-display text-4xl text-ink mb-2">Análisis</h1>
        <p className="text-ink-500 mb-10">
          Sube el PDF y pega la oferta. El diagnóstico llega en menos de un minuto.
        </p>

        <UploadForm />
      </div>
    </div>
  );
}
