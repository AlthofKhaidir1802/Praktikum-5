// src/pages/Login.jsx

import { useState, useEffect } from "react";
import { useAuthStore } from "../store/authstore";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login(username);
    navigate("/");
  };

  return (
  <div className="min-h-[70vh] flex items-center justify-center">
    <div className="card bg-base-200 shadow-xl w-96 border border-white/10">
      <div className="card-body">
        <h2 className="card-title text-primary">Login</h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4 mt-4">
          <input
            type="text"
            placeholder="Masukkan nama..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input input-bordered w-full text-black placeholder-gray-500 bg-white"
            required
          />
          <button className="btn btn-primary w-full">Masuk</button>
        </form>
      </div>
    </div>
  </div>
  );
}