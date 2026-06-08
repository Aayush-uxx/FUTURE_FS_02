import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  CheckCircle2,
  ListTodo,
  UserPlus,
  LogIn,
  Mail,
  Lock,
} from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await api.post("/auth/login", { email, password });
      const { token, user } = response.data;
      login(token, user);
      setMessage(`Welcome back, ${user.name}!`);
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-brand-primary to-brand-secondary p-12 flex-col justify-center">
        <div className="max-w-md mx-auto">
          <div className="mb-8">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
              <LayoutDashboard className="text-white size-8" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Welcome Back!
            </h1>
            <p className="text-white/80 text-lg">
              Access your lead management dashboard to track, organize, and grow
              your customer relationships.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-white/70">
              <div className="bg-green-400/20 p-1 rounded-full">
                <CheckCircle2 className="text-green-400 size-4" />
              </div>
              <span>Manage Leads</span>
            </div>
            <div className="flex items-center gap-3 text-white/70">
              <div className="bg-green-400/20 p-1 rounded-full">
                <CheckCircle2 className="text-green-400 size-4" />
              </div>
              <span>Track Status</span>
            </div>
            <div className="flex items-center gap-3 text-white/70">
              <div className="bg-green-400/20 p-1 rounded-full">
                <CheckCircle2 className="text-green-400 size-4" />
              </div>
              <span>Real-time Analytics</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 bg-brand-bg min-h-screen lg:min-h-0">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-primary">
              Sign In
            </h2>
            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              Enter your credentials to continue
            </p>
          </div>

          {message && (
            <div
              className={`mb-4 p-3 rounded-xl text-center text-sm ${
                message.includes("Welcome")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-2 text-brand-primary">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 size-4 text-gray-400" />
                <input
                  type="email"
                  className="w-full border border-gray-200 rounded-xl p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-brand-accent transition"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-brand-primary">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 size-4 text-gray-400" />
                <input
                  type="password"
                  className="w-full border border-gray-200 rounded-xl p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-brand-accent transition"
                  placeholder="••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-accent text-white py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <LogIn className="size-4" />
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="text-center mt-6 pt-4 border-t border-gray-100">
            <p className="text-sm text-brand-secondary">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-brand-accent hover:underline"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
