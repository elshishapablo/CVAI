import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { DEMO_USER, isDemoToken, useAuthStore } from "./store/authStore";
import authService from "./services/authService";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NewAnalysis from "./pages/NewAnalysis";
import AnalysisResult from "./pages/AnalysisResult";
import History from "./pages/History";
import Pricing from "./pages/Pricing";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return !isAuthenticated ? <>{children}</> : <Navigate to="/dashboard" replace />;
}

function AppContent() {
  const { token, setAuth, logout } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    if (!token) return;
    if (isDemoToken(token)) {
      setAuth(token, DEMO_USER);
      return;
    }
    authService
      .getMe()
      .then((user) => setAuth(token, user))
      .catch(() => logout());
  }, []);

  const isAuthPage = ["/login", "/register"].includes(location.pathname);

  return (
    <div className="relative flex flex-col min-h-screen bg-paper text-ink overflow-x-hidden">
      <div className="grain" />
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="orb w-[28rem] h-[28rem] bg-gold-300/25 -top-32 -left-24 animate-drift" />
        <div className="orb w-[32rem] h-[32rem] bg-sage-300/20 top-1/3 -right-40 animate-pulse-soft" />
        <div className="orb w-72 h-72 bg-gold-200/20 bottom-0 left-1/3 animate-drift" />
      </div>

      {!isAuthPage && <Navbar />}

      <main className="relative flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />

          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/analysis/new" element={<ProtectedRoute><NewAnalysis /></ProtectedRoute>} />
          <Route path="/analysis/:id" element={<ProtectedRoute><AnalysisResult /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!isAuthPage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
