import { useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import Login from "../components/auth/login";
import Register from "../components/auth/register";
import { useAuth } from "../utils/AuthContext";
import "../style/auth.css";

export default function Auth() {
  const { user, loading } = useAuth();
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get("tab") === "register" ? "register" : "login";
  const [mode, setMode] = useState(initialMode);

  if (loading) {
    return (
      <div className="auth-page">
        <p className="auth-loading-text">جاري التحميل...</p>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        {mode === "login" ? (
          <Login onSwitch={() => setMode("register")} />
        ) : (
          <Register onSwitch={() => setMode("login")} />
        )}
      </div>
    </div>
  );
}
