import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

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
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#30525C] to-[#4C848D] p-12 flex-col justify-center">
        <div className="max-w-md mx-auto">
          <div className="mb-8">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
              <span className="text-3xl">📋</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Welcome Back!</h1>
            <p className="text-white/80 text-lg">
              Access your lead management dashboard to track, organize, and grow your customer
              relationships.
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white/70">
              <span className="text-green-400">✓</span> Manage Leads
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <span className="text-green-400">✓</span> Track Status
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <span className="text-green-400">✓</span> Add Notes
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 bg-[#DCAA89] min-h-screen lg:min-h-0">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#30525C]">Sign In</h2>
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
              <label className="block text-sm font-semibold mb-2 text-[#30525C]">Email</label>
              <input
                type="email"
                className="w-full border border-[#BFB9B5] rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#C35627] transition"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-[#30525C]">Password</label>
              <input
                type="password"
                className="w-full border border-[#BFB9B5] rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#C35627] transition"
                placeholder="••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#C35627] text-white py-3 rounded-xl font-semibold hover:bg-[#D6794D] transition disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="text-center mt-6 pt-4 border-t border-[#BFB9B5]">
            <p className="text-sm text-[#4C848D]">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="font-semibold text-[#C35627] hover:underline">
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
