import { useState } from "react";
import { z } from "zod";

const initialForm = {
  fullName: "", username: "", email: "", password: "",
  phone: "", dob: "", gender: "", role: "",
  portfolio: "", address: "", bio: "",
};

const registerSchema = z.object({
  fullName: z.string()
    .trim()
    .min(1, "Full name is required")
    .regex(/^([A-Z][a-z]+)(\s+[A-Z][a-z]+)+$/, "Use capitalized first and last name (e.g., Sea Ocan)"),
  username: z.string()
    .trim()
    .min(1, "Username is required")
    .refine((val) => !/[A-Z]/.test(val), "Username must be lowercase (no capital letters)"),
  email: z.string().trim().min(1, "Email is required").email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .refine((val) => /\d/.test(val), "Password must include a number")
    .refine((val) => /[^A-Za-z0-9]/.test(val), "Password must include a symbol"),
  phone: z.string().optional(),
  dob: z.string().optional(),
  gender: z.string().optional(),
  role: z.string().optional(),
  portfolio: z.union([z.literal(""), z.string().url("Invalid URL")]),
  address: z.string().optional(),
  bio: z.string().optional(),
});

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

function Field({ label, error, full, children }) {
  return (
    <div className={full ? "col-span-2" : "col-span-1"}>
      <label className="block mb-1.5 text-[0.68rem] font-semibold tracking-widest uppercase text-[#1a2a50] auth-font-title">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

const placeholderTone = (value) => (!value ? "text-gray-400" : "");

const inputCls = (hasError, extra = "") =>
  [
    "w-full bg-white rounded-lg px-3.5 py-2.5 text-sm text-[#1a2a50]",
    "outline-none appearance-none transition-all duration-200",
    "placeholder:text-gray-300",
    "focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600",
    hasError ? "border-2 border-red-400" : "border border-[#d1d9ef]",
    extra,
  ].filter(Boolean).join(" ");

const chevron =
  "bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%236b7280' d='M6 8L0 0h12z'/%3E%3C/svg%3E\")] bg-no-repeat bg-[right_14px_center]";

const toFieldErrors = (issues) => {
  const out = {};
  issues.forEach((issue) => {
    const key = issue.path?.[0];
    if (key && !out[key]) out[key] = issue.message;
  });
  return out;
};

export default function RegisterComponent({ onSuccess, onGoLogin }) {
  const [form, setForm]                 = useState(initialForm);
  const [errors, setErrors]             = useState({});
  const [status, setStatus]             = useState("idle");
  const [showPassword, setShowPassword] = useState(false);

  const strength = getStrength(form.password);

  const handleChange = (e) => {
    const key   = e.target.name || e.target.id;
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = registerSchema.safeParse(form);
    if (!result.success) {
      setErrors(toFieldErrors(result.error.issues));
      return;
    }

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => onSuccess?.(), 700);
    }, 1500);
  };

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
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] bg-gray-900 auth-font-body">

        {/* ── LEFT PANEL ── */}
        <div className="hidden lg:flex relative items-center justify-center bg-[#1a2a50] overflow-hidden">
          {/* radial glow */}
          <div className="absolute w-[500px] h-[500px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ background: "radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)" }} />

          {/* featured illustration */}
          <div className="relative z-10 w-150 rounded-6xl overflow-hidden auth-float flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.07)" }}>
            <img
              src="https://cdn.prod.website-files.com/6443d6d96a788f6942166567/647011e6041bb767ea7934ed_mobiledevelopment-1.png"
              alt="Mobile development illustration"
              className="max-w-full max-h-full object-contain"
              loading="lazy"
            />
            <div className="absolute bottom-6 inset-x-10 bg-black/60 backdrop-blur-sm rounded-full py-1.5 flex items-center justify-center shadow-lg border border-white/10">
              <span className="text-white tracking-[0.4rem] text-xs font-semibold uppercase auth-font-title">
                KH<span className="text-[#e5383b]">DEMY</span>
              </span>
            </div>
          </div>

          <p className="absolute bottom-14 text-white/35 text-[0.75rem] tracking-[3px] uppercase auth-font-title">
            Learn · Build · Grow
          </p>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="bg-[#f0f4fb] px-5 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-10 md:py-12 overflow-y-auto flex flex-col justify-center auth-panel-fade-slow">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-[1.85rem] font-extrabold text-[#1a2a50] tracking-tight auth-font-title">
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

            {/* Phone */}
            <Field label="Phone Number" error={errors.phone}>
              <input className={inputCls(errors.phone)}
                id="phone" name="phone" type="tel"
                placeholder="(+855) 000-000-000"
                value={form.phone} onChange={handleChange}
                inputMode="tel" autoComplete="tel" maxLength={15} />
            </Field>

            {/* Date of Birth */}
            <Field label="Date of Birth" error={errors.dob}>
              <input className={inputCls(
                errors.dob,[placeholderTone(form.dob), "text-gray-500"].filter(Boolean).join(" "))}
                id="dob" name="dob" type="date"
                value={form.dob} onChange={handleChange} />
            </Field>

            {/* Gender */}
            <Field label="Gender" error={errors.gender}>
              <select className={`${
                  inputCls(
                    errors.gender,
                    [placeholderTone(form.gender), "text-gray-500"].filter(Boolean).join(" "))} ${chevron} pr-11 cursor-pointer`}
                id="gender" name="gender"
                value={form.gender} onChange={handleChange}>
                <option value="">Select Option</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </Field>

            {/* Professional Role */}
            <Field label="Professional Role" error={errors.role} full>
              <select className={`${inputCls(errors.role,[placeholderTone(form.role), "text-gray-500"].filter(Boolean).join(" "))} ${chevron} pr-11 cursor-pointer`}
                id="role" name="role"
                value={form.role} onChange={handleChange}>
                <option value="">Select your role</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
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
              >
                {status === "idle"    && "Create Account"}
                {status === "loading" && "Creating Account..."}
                {status === "success" && "✓ Account Created!"}
              </button>
            </div>

            {/* Sign-in link */}
            <p className="col-span-1 md:col-span-2 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <button type="button"
                onClick={() => onGoLogin?.()}
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