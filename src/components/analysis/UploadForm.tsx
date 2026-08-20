import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../store/authStore";
import { useAnalysis } from "../../hooks/useAnalysis";
import type { NewAnalysisFormData } from "../../types";
import { Input, Textarea } from "../ui/Input";
import Button from "../ui/Button";
import Card from "../ui/Card";
import { Link } from "react-router-dom";
import { IconCheck, IconSpark, IconUpload } from "../ui/icons";

export default function UploadForm() {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const { user } = useAuthStore();
  const { createAnalysis, isAnalyzing, error, clearError } = useAnalysis();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewAnalysisFormData>();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles[0]) {
        setCvFile(acceptedFiles[0]);
        clearError();
      }
    },
    [clearError],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxSize: 10 * 1024 * 1024,
    multiple: false,
    onDropRejected: () => {
      alert("Solo se aceptan archivos PDF de máximo 10 MB.");
    },
  });

  const onSubmit = (data: NewAnalysisFormData) => {
    if (!cvFile) return;
    createAnalysis(cvFile, data.jobTitle, data.jobDescription, data.company);
  };

  const isLimitReached =
    user?.plan === "free" && (user?.analysisUsedThisMonth ?? 0) >= 3;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {isLimitReached && (
        <div className="bg-gold-50 border border-gold-200 rounded-[1.4rem] p-5">
          <p className="font-display text-lg text-gold-800 mb-1">Límite mensual alcanzado</p>
          <p className="text-sm text-gold-700 mb-3">
            Has usado los 3 análisis gratuitos de este mes.
          </p>
          <Link to="/pricing">
            <Button variant="primary" size="sm">
              Actualizar a Pro
            </Button>
          </Link>
        </div>
      )}

      {error && (
        <div className="bg-wine-50 border border-wine-100 text-wine-600 rounded-2xl px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <Card>
        <h2 className="font-display text-lg text-ink mb-4 flex items-center gap-3">
          <span className="w-7 h-7 bg-ink text-gold-300 rounded-full grid place-items-center text-[11px] font-semibold">
            1
          </span>
          Sube tu CV en PDF
        </h2>

        <div
          {...getRootProps()}
          className={[
            "border border-dashed rounded-[1.3rem] p-10 text-center cursor-pointer transition-all duration-300",
            isDragActive
              ? "border-gold-500 bg-gold-50 scale-[1.01]"
              : cvFile
                ? "border-sage-400 bg-sage-50"
                : "border-ink/20 hover:border-gold-500 hover:bg-gold-50/40",
          ].join(" ")}
        >
          <input {...getInputProps()} />

          {cvFile ? (
            <>
              <span className="mx-auto mb-3 w-12 h-12 rounded-2xl bg-sage-700 text-paper grid place-items-center">
                <IconCheck className="w-5 h-5" />
              </span>
              <p className="font-medium text-sage-800">{cvFile.name}</p>
              <p className="text-xs text-ink-400 mt-1">
                {(cvFile.size / 1024).toFixed(0)} KB · Haz clic para cambiar
              </p>
            </>
          ) : (
            <>
              <span className="mx-auto mb-3 w-12 h-12 rounded-2xl bg-ink text-gold-300 grid place-items-center">
                <IconUpload className="w-5 h-5" />
              </span>
              <p className="font-medium text-ink">
                {isDragActive ? "Suelta el PDF aquí" : "Arrastra tu CV aquí"}
              </p>
              <p className="text-sm text-ink-400 mt-1">o haz clic para seleccionar</p>
              <p className="text-[11px] tracking-wide uppercase text-ink-400 mt-3">
                Solo PDF · Máximo 10 MB
              </p>
            </>
          )}
        </div>
      </Card>

      <Card>
        <h2 className="font-display text-lg text-ink mb-5 flex items-center gap-3">
          <span className="w-7 h-7 bg-ink text-gold-300 rounded-full grid place-items-center text-[11px] font-semibold">
            2
          </span>
          Datos de la oferta
        </h2>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Título del cargo *"
              placeholder="ej: Senior Frontend Developer"
              error={errors.jobTitle?.message}
              {...register("jobTitle", { required: "El título es obligatorio" })}
            />
            <Input
              label="Empresa (opcional)"
              placeholder="ej: Google, Startup X..."
              {...register("company")}
            />
          </div>

          <Textarea
            label="Descripción completa del trabajo *"
            rows={9}
            placeholder="Pega aquí la descripción completa de la oferta: responsabilidades, requisitos, tecnologías, beneficios..."
            error={errors.jobDescription?.message}
            hint="Cuanto más detallada sea la descripción, más preciso será el análisis."
            {...register("jobDescription", {
              required: "La descripción es obligatoria",
              minLength: { value: 50, message: "Añade más detalle (mínimo 50 caracteres)" },
            })}
          />
        </div>
      </Card>

      <Button
        type="submit"
        fullWidth
        size="lg"
        loading={isAnalyzing}
        disabled={!cvFile || isLimitReached}
      >
        {isAnalyzing ? (
          "Analizando con IA..."
        ) : (
          <>
            <IconSpark className="w-4 h-4" />
            Analizar compatibilidad
          </>
        )}
      </Button>

      {isAnalyzing && (
        <p className="text-center text-sm text-ink-400 animate-pulse">
          Esto puede tardar entre 10 y 20 segundos...
        </p>
      )}
    </form>
  );
}
