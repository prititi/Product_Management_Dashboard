import { useAuth } from "home/src/context/AuthContext";
import React, { useState } from "react";

const LoginForm: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Both fields are required");
      return;
    }
    login(username, password);
  };

  if (isAuthenticated) {
    return <div>Welcome, you are logged in!</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter your username"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter your password"
        />
      </div>
      <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
