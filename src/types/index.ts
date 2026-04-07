// ─── Usuario ───────────────────────────────────────────────────────

export interface User {
  id: number;
  name: string;
  email: string;
  plan: 'free' | 'pro';
  analysisUsedThisMonth: number;
  analysisLimit: number; // -1 = ilimitado (pro)
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// ─── Análisis ──────────────────────────────────────────────────────

export interface SuggestionItem {
  section: string;
  original: string;
  improved: string;
}

export interface AnalysisResult {
  compatibilityScore: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  missingKeywords: string[];
  presentKeywords: string[];
  suggestions: SuggestionItem[];
  coverLetterIntro: string;
}

export interface Analysis {
  id: number;
  jobTitle: string;
  company: string;
  compatibilityScore: number;
  createdAt: string;
  result: AnalysisResult;
}

export interface AnalysisListItem {
  id: number;
  jobTitle: string;
  company: string;
  compatibilityScore: number;
  createdAt: string;
}

// ─── Formularios ───────────────────────────────────────────────────

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface NewAnalysisFormData {
  jobDescription: string;
  jobTitle: string;
  company: string;
}
