import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../../store/authStore';
import { useAnalysis } from '../../hooks/useAnalysis';
import type { NewAnalysisFormData } from '../../types';
import { Input, Textarea } from '../ui/Input';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { Link } from 'react-router-dom';

export default function UploadForm() {
  const [cvFile, setCvFile]     = useState<File | null>(null);
  const { user }                = useAuthStore();
  const { createAnalysis, isAnalyzing, error, clearError } = useAnalysis();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewAnalysisFormData>();

  // Configurar el dropzone — solo acepta PDF, máx 10 MB
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      setCvFile(acceptedFiles[0]);
      clearError();
    }
  }, [clearError]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept:   { 'application/pdf': ['.pdf'] },
    maxSize:  10 * 1024 * 1024,
    multiple: false,
    onDropRejected: () => {
      alert('Solo se aceptan archivos PDF de máximo 10 MB.');
    },
  });

  const onSubmit = (data: NewAnalysisFormData) => {
    if (!cvFile) return;
    createAnalysis(cvFile, data.jobTitle, data.jobDescription, data.company);
  };

  // Verificar límite del plan
  const isLimitReached =
    user?.plan === 'free' && (user?.analysisUsedThisMonth ?? 0) >= 3;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

      {/* Límite alcanzado */}
      {isLimitReached && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <p className="font-bold text-amber-800 mb-1">Límite mensual alcanzado</p>
          <p className="text-sm text-amber-700 mb-3">
            Has usado los 3 análisis gratuitos de este mes.
          </p>
          <Link to="/pricing">
            <Button variant="primary" size="sm">Actualizar a Pro →</Button>
          </Link>
        </div>
      )}

      {/* Error global */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {/* ── STEP 1: Subir PDF ── */}
      <Card>
        <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Sube tu CV en PDF
        </h2>

        <div
          {...getRootProps()}
          className={[
            'border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all',
            isDragActive
              ? 'border-blue-500 bg-blue-50'
              : cvFile
              ? 'border-green-400 bg-green-50'
              : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/40',
          ].join(' ')}
        >
          <input {...getInputProps()} />

          {cvFile ? (
            <>
              <div className="text-4xl mb-3">✅</div>
              <p className="font-semibold text-green-700">{cvFile.name}</p>
              <p className="text-xs text-gray-400 mt-1">
                {(cvFile.size / 1024).toFixed(0)} KB · Haz clic para cambiar
              </p>
            </>
          ) : (
            <>
              <div className="text-4xl mb-3">📄</div>
              <p className="font-semibold text-gray-700">
                {isDragActive ? 'Suelta el PDF aquí' : 'Arrastra tu CV aquí'}
              </p>
              <p className="text-sm text-gray-400 mt-1">o haz clic para seleccionar</p>
              <p className="text-xs text-gray-300 mt-2">Solo PDF · Máximo 10 MB</p>
            </>
          )}
        </div>
      </Card>

      {/* ── STEP 2: Datos del trabajo ── */}
      <Card>
        <h2 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
          <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
          Datos de la oferta de trabajo
        </h2>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Título del cargo *"
              placeholder="ej: Senior Frontend Developer"
              error={errors.jobTitle?.message}
              {...register('jobTitle', { required: 'El título es obligatorio' })}
            />
            <Input
              label="Empresa (opcional)"
              placeholder="ej: Google, Startup X..."
              {...register('company')}
            />
          </div>

          <Textarea
            label="Descripción completa del trabajo *"
            rows={9}
            placeholder="Pega aquí la descripción completa de la oferta: responsabilidades, requisitos, tecnologías, beneficios..."
            error={errors.jobDescription?.message}
            hint="Cuanto más detallada sea la descripción, más preciso será el análisis."
            {...register('jobDescription', {
              required:  'La descripción es obligatoria',
              minLength: { value: 50, message: 'Añade más detalle (mínimo 50 caracteres)' },
            })}
          />
        </div>
      </Card>

      {/* ── Botón analizar ── */}
      <Button
        type="submit"
        fullWidth
        size="lg"
        loading={isAnalyzing}
        disabled={!cvFile || isLimitReached}
      >
        {isAnalyzing ? 'Analizando con IA...' : '🤖 Analizar compatibilidad'}
      </Button>

      {isAnalyzing && (
        <p className="text-center text-sm text-gray-500 animate-pulse">
          Analizando tu CV. Esto puede tardar entre 10 y 20 segundos...
        </p>
      )}
    </form>
  );
}
