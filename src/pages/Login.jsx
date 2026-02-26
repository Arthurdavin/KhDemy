
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EyeOpen = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeOff = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const ArrowLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const GoogleIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

export default function Login() {
  const [form, setForm]                 = useState({ email: "", password: "" });
  const [errors, setErrors]             = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember]         = useState(false);
  const [status, setStatus]             = useState("idle");
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!form.email.trim())    e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email address";
    if (!form.password)        e.password = "Password is required";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => navigate("/home"), 700);
    }, 1500);
  };

  const inputCls = (hasError) => [
    "w-full bg-[#dbeafe] rounded-xl pl-11 pr-4 py-3 text-sm text-[#1a2a50]",
    "outline-none transition-all duration-200 border-2",
    "placeholder:text-[#93afd4]",
    "focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10",
    hasError ? "border-red-400 bg-red-50" : "border-transparent",
  ].join(" ");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        body { font-family: 'DM Sans', sans-serif; background: #111827; }
      `}</style>

      <div className="min-h-screen grid md:grid-cols-[1fr_1fr] bg-gray-900">

        {/* ── LEFT PANEL ── */}
        <div className="hidden md:flex flex-col items-center justify-center relative bg-[#1a2a50] overflow-hidden px-10">
          {/* glow */}
          <div className="absolute w-[450px] h-[450px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)" }} />

          {/* Illustration circle */}
          <div className="relative z-10 w-56 h-56 rounded-full bg-[#e8edf5] flex items-center justify-center mb-8"
            style={{ animation: "float 4s ease-in-out infinite" }}>
            {/* Simple illustrated person SVG */}
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
              {/* window frame */}
              <rect x="30" y="20" width="55" height="65" rx="4" fill="#1a2a50" opacity="0.15"/>
              <rect x="35" y="25" width="45" height="55" rx="2" fill="#c8d8f0"/>
              <line x1="57" y1="25" x2="57" y2="80" stroke="#a0b8d8" strokeWidth="1.5"/>
              <line x1="35" y1="52" x2="80" y2="52" stroke="#a0b8d8" strokeWidth="1.5"/>
              {/* person */}
              <circle cx="75" cy="72" r="9" fill="#f4c5a8"/>
              <path d="M60 95 Q75 82 90 95" fill="#1a2a50" opacity="0.8"/>
              <path d="M68 90 L72 78 L78 78 L82 90" fill="#2a3f7a"/>
              {/* cloud */}
              <ellipse cx="48" cy="38" rx="18" ry="12" fill="white" opacity="0.7"/>
              <ellipse cx="38" cy="42" rx="12" ry="9" fill="white" opacity="0.7"/>
              <ellipse cx="60" cy="42" rx="10" ry="8" fill="white" opacity="0.7"/>
            </svg>
          </div>

          {/* Text */}
          <h2 className="text-white text-2xl font-bold mb-2 text-center"
            style={{ fontFamily: "'Syne', sans-serif" }}>
            Welcome <span className="text-[#e5383b]">KH</span>
            <span className="text-[#e5383b]">demy</span>
          </h2>
          <p className="text-white/50 text-sm text-center mb-8">
            Just a couple of clicks and we start
          </p>

          {/* Dots */}
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-white" />
            <div className="w-3 h-3 rounded-full bg-white/30" />
            <div className="w-3 h-3 rounded-full bg-white/20" />
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="bg-white flex flex-col justify-center px-8 md:px-16 py-12"
          style={{ animation: "fadeUp 0.45s ease both" }}>

          {/* Back arrow */}
          <button onClick={() => navigate(-1)}
            className="w-9 h-9 flex items-center justify-center rounded-lg
                       text-gray-400 hover:text-[#1a2a50] hover:bg-gray-100
                       transition-all duration-200 mb-10 self-start">
            <ArrowLeft />
          </button>

          <div className="max-w-sm w-full mx-auto">
            {/* Title */}
            <h1 className="text-center text-2xl font-extrabold text-blue-700 mb-1 tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}>
              LOGIN
            </h1>
            <p className="text-center text-sm text-gray-400 mb-8">
              Welcome back! Let's get you signed in
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">

              {/* Email */}
              <div>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#93afd4]">
                    <MailIcon />
                  </span>
                  <input
                    className={inputCls(errors.email)}
                    id="email" name="email" type="email"
                    placeholder="Email"
                    value={form.email} onChange={handleChange}
                    autoComplete="email"
                  />
                </div>
                {errors.email && <p className="mt-1 text-xs text-red-500 pl-1">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#93afd4]">
                    <LockIcon />
                  </span>
                  <input
                    className={`${inputCls(errors.password)} pr-11`}
                    id="password" name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={form.password} onChange={handleChange}
                    autoComplete="current-password"
                  />
                  <button type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 text-[#93afd4] hover:text-blue-600 transition-colors duration-200"
                    aria-label={showPassword ? "Hide password" : "Show password"}>
                    {showPassword ? <EyeOff /> : <EyeOpen />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-500 pl-1">{errors.password}</p>}
              </div>

              {/* Remember me + Forgot */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600
                               accent-blue-600 cursor-pointer"
                  />
                  <span className="text-sm text-gray-500">Remember Me</span>
                </label>
                <a href="#" className="text-sm text-blue-600 font-semibold hover:underline">
                  Forgot Password ?
                </a>
              </div>

              {/* Submit */}
              <button type="submit"
                disabled={status === "loading" || status === "success"}
                className={[
                  "w-full py-3 rounded-xl text-sm font-bold tracking-wide text-white",
                  "transition-all duration-200 border-none cursor-pointer mt-2",
                  "disabled:opacity-75 disabled:cursor-not-allowed",
                  "hover:-translate-y-px active:translate-y-0",
                  status === "success"
                    ? "bg-green-600 shadow-[0_4px_14px_rgba(22,163,74,0.3)]"
                    : "bg-blue-700 shadow-[0_4px_14px_rgba(37,99,235,0.3)] hover:bg-blue-800",
                ].join(" ")}
                style={{ fontFamily: "'Syne', sans-serif" }}>
                {status === "idle"    && "Login Now"}
                {status === "loading" && "Signing in..."}
                {status === "success" && "✓ Signed In!"}
              </button>

            </form>

            {/* Social login */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400 mb-4">
                Other <span className="font-bold text-blue-700">Login</span> with
              </p>
              <div className="flex items-center justify-center gap-5">
                <button className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100
                                   flex items-center justify-center
                                   hover:bg-blue-50 hover:border-blue-100
                                   transition-all duration-200 hover:scale-105 active:scale-95">
                  <FacebookIcon />
                </button>
                <button className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100
                                   flex items-center justify-center
                                   hover:bg-red-50 hover:border-red-100
                                   transition-all duration-200 hover:scale-105 active:scale-95">
                  <GoogleIcon />
                </button>
              </div>
            </div>

            {/* Sign up link */}
            <p className="mt-8 text-center text-sm text-gray-400">
              Don't have an account?{" "}
              <button type="button"
                onClick={() => navigate('/register')}
                className="text-blue-700 font-bold underline underline-offset-2 hover:text-blue-900 transition-colors bg-none border-none cursor-pointer p-0">
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}