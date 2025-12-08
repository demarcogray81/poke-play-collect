import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn({ onSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const ok = onSignIn(email, password);
    if (!ok) {
      setError("Invalid email or password.");
      return;
    }

    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-gray-800 p-6 rounded-lg shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="w-full p-2 mb-3 rounded bg-gray-700"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 mb-3 rounded bg-gray-700"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-400 mb-3">{error}</p>}

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
