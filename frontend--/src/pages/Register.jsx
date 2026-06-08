import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { UserPlus, User, Mail, Lock, LogIn } from "lucide-react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await api.post("/auth/register", { name, email, password });
      setMessage("Account created! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-brand-bg">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
            <UserPlus className="text-brand-primary size-6" />
          </div>
          <h1 className="text-2xl font-bold text-brand-primary">
            Create Account
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Register to manage your leads
          </p>
        </div>

        {message && (
          <div
            className={`mb-4 p-3 rounded-xl text-center text-sm ${
              message.includes("created")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-brand-primary">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 size-4 text-gray-400" />
              <input
                type="text"
                className="w-full border border-gray-200 rounded-lg p-2.5 pl-10 focus:ring-2 focus:ring-brand-accent outline-none transition"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-brand-primary">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 size-4 text-gray-400" />
              <input
                type="email"
                className="w-full border border-gray-200 rounded-lg p-2.5 pl-10 focus:ring-2 focus:ring-brand-accent outline-none transition"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-brand-primary">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 size-4 text-gray-400" />
              <input
                type="password"
                className="w-full border border-gray-200 rounded-lg p-2.5 pl-10 focus:ring-2 focus:ring-brand-accent outline-none transition"
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full text-white py-2.5 rounded-lg font-medium bg-brand-accent hover:opacity-90 disabled:opacity-50 transition flex items-center justify-center gap-2"
          >
            <UserPlus className="size-4" />
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <div className="text-center mt-6 pt-4 border-t border-gray-100">
          <p className="text-sm text-brand-secondary">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-brand-accent hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
