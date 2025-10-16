// src/App.jsx
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

// Import halaman
import Home from "./pages/Home";
import Posts from "./pages/posts";
import About from "./pages/About";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Login from "./pages/Login";

// Import store auth
import { useAuthStore } from "./store/authstore";

export default function App() {
  const { user, logout } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col">
      {/* Header */}
      <header className="relative z-50 p-4 border-b border-gray-800 bg-[#111827] shadow-lg flex items-center justify-between">
        {/* Judul / Brand */}
        <h2 className="text-lg md:text-2xl font-bold text-indigo-400">
          Muhamad Althof Khaidir
        </h2>

        {/* Tombol hamburger (mobile) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden bg-gradient-to-r from-indigo-600 to-purple-600 px-3 py-1 rounded-md text-white text-lg"
        >
          ☰
        </button>

        {/* Menu desktop */}
        <nav className="hidden md:flex gap-4 items-center">
          <NavLink to="/" label="Home" />
          <NavLink to="/posts" label="Posts" />
          <NavLink to="/about" label="About" />

          {user ? (
            <>
              <span className="ml-2 text-sm text-gray-300">👋 {user.name}</span>
              <button
                onClick={logout}
                className="ml-2 bg-gradient-to-r from-indigo-600 to-purple-600 px-3 py-1 rounded-md text-white hover:opacity-90 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" label="Login" />
          )}
        </nav>

        {/* Menu mobile (dropdown) */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#1e293b] flex flex-col items-center gap-3 p-4 border-t border-gray-700 md:hidden animate-fadeIn">
            <NavLink to="/" label="Home" onClick={() => setMenuOpen(false)} />
            <NavLink
              to="/posts"
              label="Posts"
              onClick={() => setMenuOpen(false)}
            />
            <NavLink
              to="/about"
              label="About"
              onClick={() => setMenuOpen(false)}
            />

            {user ? (
              <>
                <span className="text-center text-sm text-gray-300">
                  👋 {user.name}
                </span>
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 px-3 py-2 rounded-md text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                label="Login"
                onClick={() => setMenuOpen(false)}
              />
            )}
          </div>
        )}
      </header>

      {/* Isi halaman */}
      <main className="flex-grow p-6 bg-[#0f172a]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/create" element={<CreatePost />} />
          <Route path="/posts/:id/edit" element={<EditPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="text-center p-4 border-t border-gray-800 bg-[#111827] text-sm text-gray-400">
        © {new Date().getFullYear()} Muhamad Althof Khaidir — All rights reserved.
      </footer>
    </div>
  );
}

// 🔹 Komponen NavLink untuk menu agar lebih bersih
function NavLink({ to, label, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition px-3 py-1 rounded-md text-white text-sm"
    >
      {label}
    </Link>
  );
}
