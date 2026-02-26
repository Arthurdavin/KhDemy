import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialForm = {
  fullName: "", username: "", email: "", password: "",
  phone: "", dob: "", gender: "", role: "",
  portfolio: "", address: "", bio: "",
};

function validate(form) {
  const errors = {};
  if (!form.fullName.trim()) errors.fullName = "Full name is required";
  if (!form.username.trim()) errors.username = "Username is required";
  if (!form.email.trim())    errors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = "Invalid email address";
  if (!form.password)        errors.password = "Password is required";
  else if (form.password.length < 8) errors.password = "Minimum 8 characters";
  return errors;
}
//fuction to calculate password strength based on criteria
function getStrength(pw) {
  if (!pw) return null;
  let s = 0;
  if (pw.length >= 8)           s++;
  if (/[A-Z]/.test(pw))         s++;
  if (/[0-9]/.test(pw))         s++;
  if (/[^A-Za-z0-9]/.test(pw))  s++;
  return s <= 1 ? "weak" : s <= 2 ? "fair" : "strong";
}

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

// Reusable field wrapper
function Field({ label, error, full, children }) {
  return (
    <div className={full ? "col-span-2" : "col-span-1"}>
      <label className="block mb-1.5 text-[0.68rem] font-semibold tracking-widest uppercase text-[#1a2a50]"
        style={{ fontFamily: "'Syne', sans-serif" }}>
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

// Shared input class builder
const inputCls = (hasError) =>
  [
    "w-full bg-white rounded-lg px-3.5 py-2.5 text-sm text-[#1a2a50]",
    "outline-none appearance-none transition-all duration-200",
    "placeholder:text-gray-300",
    "focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600",
    hasError ? "border-2 border-red-400" : "border border-[#d1d9ef]",
  ].join(" ");

// Chevron SVG data-url for selects
const chevron =
  "bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%236b7280' d='M6 8L0 0h12z'/%3E%3C/svg%3E\")] bg-no-repeat bg-[right_14px_center]";

export default function Registration() {
  const [form, setForm]                 = useState(initialForm);
  const [errors, setErrors]             = useState({});
  const [status, setStatus]             = useState("idle");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const strength = getStrength(form.password);

  // ✅ uses name as primary key, falls back to id
  const handleChange = (e) => {
    const key   = e.target.name || e.target.id;
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => navigate("/home"), 700);
    }, 1500);
  };

  // Strength bar colour per segment index
  const barColor = (i) => {
    if (!form.password) return "bg-[#d1d9ef]";
    if (strength === "weak")   return i === 0 ? "bg-red-500"   : "bg-[#d1d9ef]";
    if (strength === "fair")   return i <= 1  ? "bg-amber-400" : "bg-[#d1d9ef]";
    return "bg-green-500";
  };

  const strengthMeta = {
    weak:   { text: "Weak — add uppercase, numbers & symbols", cls: "text-red-500" },
    fair:   { text: "Fair — getting stronger!",                cls: "text-amber-500" },
    strong: { text: "Strong password ✓",                       cls: "text-green-600" },
  };

  return (
    <>
      {/* Google Fonts + keyframes */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        body { font-family: 'DM Sans', sans-serif; }
      `}</style>

      <div className="min-h-screen grid md:grid-cols-[1fr_1.1fr] bg-gray-900">

        {/* ── LEFT PANEL ── */}
        <div className="hidden md:flex relative items-center justify-center bg-[#1a2a50] overflow-hidden">
          {/* radial glow */}
          <div className="absolute w-[500px] h-[500px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ background: "radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)" }} />

          {/* floating logo */}
          <div className="relative z-10 w-60 h-60 rounded-full flex items-center justify-center
                          border-2 border-white/10"
            style={{ background: "rgba(255,255,255,0.07)", animation: "float 4s ease-in-out infinite" }}>
            <span className="text-[2.2rem] font-extrabold text-white tracking-tight select-none"
              style={{ fontFamily: "'Syne', sans-serif" }}>
              KH<span className="text-[#e5383b]">demy</span>
            </span>
          </div>

          <p className="absolute bottom-14 text-white/35 text-[0.75rem] tracking-[3px] uppercase"
            style={{ fontFamily: "'Syne', sans-serif" }}>
            Learn · Build · Grow
          </p>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="bg-[#f0f4fb] px-8 md:px-16 py-10 md:py-12 overflow-y-auto flex flex-col justify-center"
          style={{ animation: "fadeUp 0.5s ease both" }}>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-[1.85rem] font-extrabold text-[#1a2a50] tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}>
              REGISTRATION
            </h1>
            <div className="w-10 h-[3px] bg-blue-600 mt-2 rounded-full" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate
            className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Full Name */}
            <Field label="Full Name" error={errors.fullName}>
              <input className={inputCls(errors.fullName)}
                id="fullName" name="fullName" type="text"
                placeholder="Alex Johnson"
                value={form.fullName} onChange={handleChange} />
            </Field>

            {/* Username */}
            <Field label="Username" error={errors.username}>
              <input className={inputCls(errors.username)}
                id="username" name="username" type="text"
                placeholder="johnAlex88"
                value={form.username} onChange={handleChange} />
            </Field>

            {/* Email */}
            <Field label="Email Address" error={errors.email} full>
              <input className={inputCls(errors.email)}
                id="email" name="email" type="email"
                placeholder="Alexjohn@gmail.com"
                value={form.email} onChange={handleChange} />
            </Field>

            {/* Password */}
            <Field label="Password" error={errors.password}>
              <div className="relative flex items-center">
                <input
                  className={`${inputCls(errors.password)} pr-11`}
                  id="password" name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={form.password} onChange={handleChange}
                  autoComplete="new-password"
                />
                <button type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 text-gray-400 hover:text-blue-600 transition-colors duration-200"
                  aria-label={showPassword ? "Hide password" : "Show password"}>
                  {showPassword ? <EyeOff /> : <EyeOpen />}
                </button>
              </div>

              {/* Strength meter */}
              {form.password && (
                <div className="mt-2 space-y-1">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div key={i}
                        className={`h-[3px] flex-1 rounded-full transition-all duration-300 ${barColor(i)}`} />
                    ))}
                  </div>
                  <p className={`text-[0.7rem] ${strengthMeta[strength]?.cls}`}>
                    {strengthMeta[strength]?.text}
                  </p>
                </div>
              )}
            </Field>

            {/* Phone — ✅ onChange (not onInput) */}
            <Field label="Phone Number" error={errors.phone}>
              <input className={inputCls(errors.phone)}
                id="phone" name="phone" type="tel"
                placeholder="(+855) 000-000-000"
                value={form.phone} onChange={handleChange}
                inputMode="tel" autoComplete="tel" maxLength={15} />
            </Field>

            {/* Date of Birth */}
            <Field label="Date of Birth" error={errors.dob}>
              <input className={inputCls(errors.dob)}
                id="dob" name="dob" type="date"
                value={form.dob} onChange={handleChange} />
            </Field>

            {/* Gender */}
            <Field label="Gender" error={errors.gender}>
              <select className={`${inputCls(errors.gender)} ${chevron} pr-9 cursor-pointer`}
                id="gender" name="gender"
                value={form.gender} onChange={handleChange}>
                <option value="">Select Option</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer_not">Prefer not to say</option>
              </select>
            </Field>

            {/* Professional Role */}
            <Field label="Professional Role" error={errors.role} full>
              <select className={`${inputCls(errors.role)} ${chevron} pr-9 cursor-pointer`}
                id="role" name="role"
                value={form.role} onChange={handleChange}>
                <option value="">Select your role</option>
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
                <option value="manager">Product Manager</option>
                <option value="data">Data Scientist</option>
                <option value="student">Student</option>
                <option value="other">Other</option>
              </select>
            </Field>

            {/* Portfolio */}
            <Field label="Portfolio / Profile URL" error={errors.portfolio} full>
              <input className={inputCls(errors.portfolio)}
                id="portfolio" name="portfolio" type="url"
                placeholder="https://github.com/yourname"
                value={form.portfolio} onChange={handleChange} />
            </Field>

            {/* Address */}
            <Field label="Address" error={errors.address} full>
              <input className={inputCls(errors.address)}
                id="address" name="address" type="text"
                placeholder="123 Future Lane, Tech City"
                value={form.address} onChange={handleChange} />
            </Field>

            {/* Bio */}
            <Field label="Short Bio" error={errors.bio} full>
              <textarea className={`${inputCls(errors.bio)} resize-y min-h-[90px]`}
                id="bio" name="bio"
                placeholder="Tell us about yourself..."
                value={form.bio} onChange={handleChange} />
            </Field>

            {/* Submit button */}
            <div className="col-span-1 md:col-span-2 mt-2">
              <button type="submit"
                disabled={status === "loading" || status === "success"}
                className={[
                  "w-full py-3.5 rounded-lg text-[0.82rem] font-bold tracking-[2px] uppercase text-white",
                  "transition-all duration-200 border-none cursor-pointer",
                  "disabled:opacity-75 disabled:cursor-not-allowed",
                  "hover:-translate-y-px active:translate-y-0",
                  status === "success"
                    ? "bg-green-600 shadow-[0_4px_14px_rgba(22,163,74,0.3)]"
                    : "bg-blue-600 shadow-[0_4px_14px_rgba(37,99,235,0.3)] hover:bg-blue-700 hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)]",
                ].join(" ")}
                style={{ fontFamily: "'Syne', sans-serif" }}>
                {status === "idle"    && "Create Account"}
                {status === "loading" && "Creating Account..."}
                {status === "success" && "✓ Account Created!"}
              </button>
            </div>

            {/* Sign-in link */}
            <p className="col-span-1 md:col-span-2 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <button type="button"
                onClick={() => navigate('/login')}
                className="text-blue-600 font-semibold hover:underline bg-none border-none cursor-pointer p-0">
                Sign in
              </button>
            </p>

          </form>
        </div>
      </div>
    </>
  );
}