import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

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
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#DCAA89" }}
    >
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold" style={{ color: "#30525C" }}>
            Create Account
          </h1>
          <p className="text-sm text-gray-600 mt-2">Register to manage your leads</p>
        </div>

        {message && (
          <div
            className={`mb-4 p-3 rounded text-center text-sm ${
              message.includes("created")
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
              Full Name
            </label>
            <input
              type="text"
              className="w-full border rounded-lg p-2.5 focus:outline-none focus:ring-2"
              style={{ borderColor: "#BFB9B5" }}
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
              placeholder="john@example.com"
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
              placeholder="Minimum 6 characters"
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
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm" style={{ color: "#4C848D" }}>
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium hover:underline"
              style={{ color: "#C35627" }}
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
