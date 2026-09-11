import { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import { getAuthErrorMessage } from "../../utils/functionFirebase";

export default function Login({ onSwitch }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      const redirectTo = location.state?.from || "/";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(getAuthErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="auth-title">تسجيل الدخول</h1>

      {error && <Alert variant="danger" className="auth-alert">{error}</Alert>}

      <Form onSubmit={handleSubmit} dir="rtl">
        <Form.Group className="mb-3">
          <Form.Label className="auth-label">البريد الإلكتروني</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="أدخل بريدك الإلكتروني"
            className="auth-input"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="auth-label">كلمة المرور</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="أدخل كلمة المرور"
            className="auth-input"
            required
          />
        </Form.Group>

        <button type="submit" className="auth-btn" disabled={loading}>
          {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
        </button>
      </Form>

      <p className="auth-footer">
        ليس لديك حساب؟{" "}
        <button type="button" className="auth-link-btn" onClick={onSwitch}>
          أنشئ حساب
        </button>
      </p>
    </>
  );
}
