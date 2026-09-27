import { useState } from "react";
import axios from "axios";
import Dashboard from "./component/Dashboard";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  function handleLogin(e) {
    e.preventDefault();
    setError("");

    if (email === "" || password === "") {
      setError("Please enter email and password");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters");
      return;
    }

    setLoading(true);

    axios
      .post("http://localhost:5000/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        setLoading(false);

        if (response.data.success) {
          setLoginSuccess(true);
        }
      })
      .catch((error) => {
        setLoading(false);

        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError("Server error. Please try again.");
        }
      });
  }

  if (loginSuccess) {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-2xl p-8">

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-orange-500">
            CINEVA
          </h1>

          <p className="text-gray-400 mt-2">
            Your entertainment, your way
          </p>
        </div>

        {/* Login heading */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-white">
            Welcome Back
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            Sign in to continue to your account
          </p>
        </div>

        <form onSubmit={handleLogin}>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-gray-300 text-sm mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700
              text-white rounded-lg outline-none
              focus:border-orange-500"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-300 text-sm mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700
              text-white rounded-lg outline-none
              focus:border-orange-500"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-400 text-sm mb-4">
              {error}
            </p>
          )}

          {/* Remember + Forgot */}
          <div className="flex justify-between items-center mb-6 text-sm">

            <label className="flex items-center text-gray-400">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>

            <button
              type="button"
              className="text-orange-500 hover:text-orange-400"
            >
              Forgot password?
            </button>

          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600
            text-white py-3 rounded-lg font-semibold
            transition"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-700"></div>

          <span className="px-3 text-gray-500 text-sm">
            OR
          </span>

          <div className="flex-1 h-px bg-gray-700"></div>
        </div>

        {/* Google button */}
        <button
          className="w-full border border-gray-700
          text-gray-300 py-3 rounded-lg
          hover:bg-gray-800"
        >
          Continue with Google
        </button>

        {/* Register */}
        <p className="text-center text-gray-500 text-sm mt-6">
          New to Cineva?

          <span className="text-orange-500 ml-1 cursor-pointer">
            Create account
          </span>
        </p>

      </div>
    </div>
  );
}

export default App;