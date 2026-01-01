import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn({ onSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await onSignIn(email, password);
      navigate("/");
    } catch (err) {
      setError(err?.message || "Invalid email or password.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-gray-800 p-6 rounded-lg shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          className="w-full p-2 rounded bg-gray-700 text-white placeholder:text-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 rounded bg-gray-700 text-white placeholder:text-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-400">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-md transition"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
