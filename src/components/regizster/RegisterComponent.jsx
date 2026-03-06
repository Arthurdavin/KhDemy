// import { useState } from "react";
// import { z } from "zod";
// import { useNavigate } from "react-router-dom";
// import { useRegisterMutation } from "../../features/auth/authApi";
// import { toast } from "react-toastify";

// const initialForm = {
//   fullName: "",
//   username: "",
//   email: "",
//   password: "",
//   phone: "",
//   dob: "",
//   gender: "",
//   role: "",
//   portfolio: "",
//   address: "",
//   bio: "",
// };

// const registerSchema = z.object({
//   fullName: z.string().min(1, "Full name is required"),
//   username: z.string().min(1, "Username is required"),
//   email: z.string().email("Invalid email"),
//   password: z.string().min(8, "Password must be at least 8 characters"),
//   gender: z.enum(["male", "female"]).optional(),
//   role: z.enum(["student", "teacher"], {
//     required_error: "Role is required",
//   }),
//   phone: z.string().optional(),
//   dob: z.string().optional(),
//   portfolio: z.string().optional(),
//   address: z.string().optional(),
//   bio: z.string().optional(),
// });

// const toFieldErrors = (issues) => {
//   const out = {};
//   issues.forEach((issue) => {
//     const key = issue.path?.[0];
//     if (key && !out[key]) out[key] = issue.message;
//   });
//   return out;
// };

// export default function RegisterComponent() {
//   const [form, setForm] = useState(initialForm);
//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);

//   const navigate = useNavigate();
//   const [register, { isLoading }] = useRegisterMutation();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: "" }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const result = registerSchema.safeParse(form);

//     if (!result.success) {
//       setErrors(toFieldErrors(result.error.issues));
//       return;
//     }

//     try {
//       await register({
//         username: form.username,
//         full_name: form.fullName,
//         password: form.password,
//         email: form.email,
//         gender: form.gender || "male",
//         bio: form.bio || "",
//         address: form.address || "",
//         phone_number: form.phone || "",
//         profile_url: form.portfolio || "",
//         date_of_birth: form.dob || null,
//         role: form.role,
//       }).unwrap();

//       toast.success("Account created successfully!");
//       navigate("/login");
//     } catch (err) {
//       toast.error(
//         err?.data?.detail || "Registration failed. Please try again."
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
//       <div className="bg-white shadow-lg rounded-xl w-full max-w-lg p-8">
//         <h2 className="text-2xl font-bold mb-6 text-center">
//           Create Account
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">

//           <input
//             type="text"
//             name="fullName"
//             placeholder="Full Name"
//             value={form.fullName}
//             onChange={handleChange}
//             className="input"
//           />
//           {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}

//           <input
//             type="text"
//             name="username"
//             placeholder="Username"
//             value={form.username}
//             onChange={handleChange}
//             className="input"
//           />
//           {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}

//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//             className="input"
//           />
//           {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               placeholder="Password"
//               value={form.password}
//               onChange={handleChange}
//               className="input pr-10"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-2 text-sm text-gray-500"
//             >
//               {showPassword ? "Hide" : "Show"}
//             </button>
//           </div>
//           {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

//           <select
//             name="gender"
//             value={form.gender}
//             onChange={handleChange}
//             className="input"
//           >
//             <option value="">Select Gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//           </select>

//           <select
//             name="role"
//             value={form.role}
//             onChange={handleChange}
//             className="input"
//           >
//             <option value="">Select Role</option>
//             <option value="student">Student</option>
//             <option value="teacher">Teacher</option>
//           </select>
//           {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}

//           <input
//             type="text"
//             name="phone"
//             placeholder="Phone Number"
//             value={form.phone}
//             onChange={handleChange}
//             className="input"
//           />

//           <input
//             type="date"
//             name="dob"
//             value={form.dob}
//             onChange={handleChange}
//             className="input"
//           />

//           <input
//             type="url"
//             name="portfolio"
//             placeholder="Profile URL"
//             value={form.portfolio}
//             onChange={handleChange}
//             className="input"
//           />

//           <input
//             type="text"
//             name="address"
//             placeholder="Address"
//             value={form.address}
//             onChange={handleChange}
//             className="input"
//           />

//           <textarea
//             name="bio"
//             placeholder="Short Bio"
//             value={form.bio}
//             onChange={handleChange}
//             className="input"
//           />

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
//           >
//             {isLoading ? "Creating..." : "Register"}
//           </button>

//         </form>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { z } from "zod";
import { useNavigate, Link } from "react-router-dom";
import { useRegisterMutation } from "../../features/auth/authApi";
import { toast } from "react-toastify";

const initialForm = {
  fullName: "",
  username: "",
  email: "",
  password: "",
  dob: "",
  gender: "",
  role: "",
  portfolio: "",
};

const registerSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  dob: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["male", "female"], { required_error: "Gender is required" }),
  role: z.enum(["student", "teacher"]).optional(),
  portfolio: z.string().url("Invalid URL").optional().or(z.literal("")),
});

const toFieldErrors = (issues) => {
  const out = {};
  issues.forEach((issue) => {
    const key = issue.path?.[0];
    if (key && !out[key]) out[key] = issue.message;
  });
  return out;
};

const inputBase =
  "w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors";

const labelBase =
  "block text-[10px] font-semibold tracking-widest text-gray-500 uppercase mb-1";

export default function RegisterComponent() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = registerSchema.safeParse(form);
    if (!result.success) {
      setErrors(toFieldErrors(result.error.issues));
      return;
    }
    try {
      await register({
        full_name: form.fullName,
        username: form.username,
        email: form.email,
        password: form.password,
        date_of_birth: form.dob,
        gender: form.gender,
        role: form.role || "student",
        profile_url: form.portfolio || "",
        bio: "",
        address: "",
        phone_number: "",
      }).unwrap();
      toast.success("Account created successfully!");
      navigate("/login");
    } catch (err) {
      toast.error(err?.data?.detail || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden">

      {/* ── LEFT PANEL ── */}
      <div
        className="hidden lg:flex w-[42%] flex-col items-center justify-center relative"
        style={{ background: "linear-gradient(145deg, #0f2044 0%, #1a3a6b 100%)" }}
      >
        {/* Decorative blobs */}
        <div className="absolute top-16 left-12 w-40 h-40 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #4a90e2, transparent)" }} />
        <div className="absolute bottom-24 right-10 w-56 h-56 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #4a90e2, transparent)" }} />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-6 px-10">
          {/* Logo text */}
          <div className="text-center">
            <span className="text-3xl font-black text-white tracking-tight">KH</span>
            <span className="text-3xl font-black text-red-400 tracking-tight">demy</span>
          </div>

          {/* Illustration image */}
          <div className="w-64 h-64 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <img
              src="https://www.allen.ac.in/apps2627/assets/images/reset-password.jpg"
              alt="Register illustration"
              className="w-full h-full object-cover"
            />
          </div>

          <p className="text-white/40 text-xs tracking-[0.3em] uppercase text-center">
            Learn · Grow · Succeed
          </p>
        </div>

        {/* Bottom sign-in link */}
        <p className="absolute bottom-8 text-white/30 text-xs">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-2">
            Sign in
          </Link>
        </p>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex-1 flex items-center justify-center bg-white px-10">
        <div className="w-full max-w-md">

          {/* Heading */}
          <div className="mb-6">
            <p className="text-xs tracking-[0.25em] text-blue-500 font-semibold uppercase mb-1">
              Welcome to KHdemy
            </p>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">
              Registration
            </h1>
            <div className="mt-2 w-10 h-[3px] bg-blue-600 rounded-full" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">

            {/* Row 1: Full Name + Username */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelBase}>Full Name <span className="text-red-400">*</span></label>
                <input
                  type="text" name="fullName" placeholder="Alex Johnson"
                  value={form.fullName} onChange={handleChange}
                  className={`${inputBase} ${errors.fullName ? "border-red-400" : ""}`}
                />
                {errors.fullName && <p className="text-red-500 text-[10px] mt-0.5">{errors.fullName}</p>}
              </div>
              <div>
                <label className={labelBase}>Username <span className="text-red-400">*</span></label>
                <input
                  type="text" name="username" placeholder="johnAlex88"
                  value={form.username} onChange={handleChange}
                  className={`${inputBase} ${errors.username ? "border-red-400" : ""}`}
                />
                {errors.username && <p className="text-red-500 text-[10px] mt-0.5">{errors.username}</p>}
              </div>
            </div>

            {/* Row 2: Email */}
            <div>
              <label className={labelBase}>Email Address <span className="text-red-400">*</span></label>
              <input
                type="email" name="email" placeholder="alexjohn@gmail.com"
                value={form.email} onChange={handleChange}
                className={`${inputBase} ${errors.email ? "border-red-400" : ""}`}
              />
              {errors.email && <p className="text-red-500 text-[10px] mt-0.5">{errors.email}</p>}
            </div>

            {/* Row 3: Password */}
            <div>
              <label className={labelBase}>Password <span className="text-red-400">*</span></label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} name="password"
                  placeholder="Min. 8 characters" value={form.password} onChange={handleChange}
                  className={`${inputBase} pr-14 ${errors.password ? "border-red-400" : ""}`}
                />
                <button
                  type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-blue-500 hover:text-blue-700 tracking-wider uppercase"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-[10px] mt-0.5">{errors.password}</p>}
            </div>

            {/* Row 4: DOB + Gender */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelBase}>Date of Birth <span className="text-red-400">*</span></label>
                <input
                  type="date" name="dob" value={form.dob} onChange={handleChange}
                  className={`${inputBase} ${errors.dob ? "border-red-400" : ""}`}
                />
                {errors.dob && <p className="text-red-500 text-[10px] mt-0.5">{errors.dob}</p>}
              </div>
              <div>
                <label className={labelBase}>Gender <span className="text-red-400">*</span></label>
                <select
                  name="gender" value={form.gender} onChange={handleChange}
                  className={`${inputBase} ${errors.gender ? "border-red-400" : ""}`}
                >
                  <option value="">Select Option</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.gender && <p className="text-red-500 text-[10px] mt-0.5">{errors.gender}</p>}
              </div>
            </div>

            {/* Row 5: Role + Portfolio */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelBase}>
                  Role <span className="text-gray-400 normal-case tracking-normal font-normal">(optional)</span>
                </label>
                <select
                  name="role" value={form.role} onChange={handleChange}
                  className={`${inputBase} ${errors.role ? "border-red-400" : ""}`}
                >
                  <option value="">Select Role</option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>
              <div>
                <label className={labelBase}>
                  Portfolio URL <span className="text-gray-400 normal-case tracking-normal font-normal">(optional)</span>
                </label>
                <input
                  type="url" name="portfolio" placeholder="https://github.com/you"
                  value={form.portfolio} onChange={handleChange}
                  className={`${inputBase} ${errors.portfolio ? "border-red-400" : ""}`}
                />
                {errors.portfolio && <p className="text-red-500 text-[10px] mt-0.5">{errors.portfolio}</p>}
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit" disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white py-3 rounded-lg font-bold text-sm tracking-[0.15em] uppercase transition-all shadow-lg shadow-blue-200 disabled:opacity-60"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Creating...
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>

            {/* Mobile sign-in link */}
            <p className="text-center text-xs text-gray-400 lg:hidden pt-1">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 font-semibold hover:underline">
                Sign in
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}