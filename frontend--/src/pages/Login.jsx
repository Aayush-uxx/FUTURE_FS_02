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
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#DCAA89" }}
    >
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold" style={{ color: "#30525C" }}>
            CRM Login
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Access your lead management dashboard
          </p>
        </div>

        {message && (
          <div
            className={`mb-4 p-3 rounded text-center text-sm ${
              message.includes("Welcome")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: "#30525C" }}
            >
              Email
            </label>
            <input
              type="email"
              className="w-full border rounded-lg p-2.5 focus:outline-none focus:ring-2"
              style={{ borderColor: "#BFB9B5" }}
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: "#30525C" }}
            >
              Password
            </label>
            <input
              type="password"
              className="w-full border rounded-lg p-2.5 focus:outline-none focus:ring-2"
              style={{ borderColor: "#BFB9B5" }}
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full text-white py-2.5 rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: "#C35627" }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm" style={{ color: "#4C848D" }}>
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium hover:underline"
              style={{ color: "#C35627" }}
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
