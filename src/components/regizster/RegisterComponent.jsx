import { useState } from "react";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../features/auth/authApi";
import { toast } from "react-toastify";

const initialForm = {
  fullName: "",
  username: "",
  email: "",
  password: "",
  phone: "",
  dob: "",
  gender: "",
  role: "",
  portfolio: "",
  address: "",
  bio: "",
};

const registerSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  gender: z.enum(["male", "female"]).optional(),
  role: z.enum(["student", "teacher"], {
    required_error: "Role is required",
  }),
  phone: z.string().optional(),
  dob: z.string().optional(),
  portfolio: z.string().optional(),
  address: z.string().optional(),
  bio: z.string().optional(),
});

const toFieldErrors = (issues) => {
  const out = {};
  issues.forEach((issue) => {
    const key = issue.path?.[0];
    if (key && !out[key]) out[key] = issue.message;
  });
  return out;
};

export default function RegisterComponent() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
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
        username: form.username,
        full_name: form.fullName,
        password: form.password,
        email: form.email,
        gender: form.gender || "male",
        bio: form.bio || "",
        address: form.address || "",
        phone_number: form.phone || "",
        profile_url: form.portfolio || "",
        date_of_birth: form.dob || null,
        role: form.role,
      }).unwrap();

      toast.success("Account created successfully!");
      navigate("/login");
    } catch (err) {
      toast.error(
        err?.data?.detail || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            className="input"
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="input"
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="input"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="input pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-sm text-gray-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="input"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="input"
          >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="input"
          />

          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            className="input"
          />

          <input
            type="url"
            name="portfolio"
            placeholder="Profile URL"
            value={form.portfolio}
            onChange={handleChange}
            className="input"
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="input"
          />

          <textarea
            name="bio"
            placeholder="Short Bio"
            value={form.bio}
            onChange={handleChange}
            className="input"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {isLoading ? "Creating..." : "Register"}
          </button>

        </form>
      </div>
    </div>
  );
}