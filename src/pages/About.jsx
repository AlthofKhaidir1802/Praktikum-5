// src/pages/About.jsx
  
export default function About() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-transparent text-white px-6 py-10">
      <div className="max-w-3xl bg-[#111827]/70 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-gray-700 text-center">
        
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 drop-shadow-lg">
          Tentang Aplikasi Ini
        </h1>

        <p className="text-lg leading-relaxed text-gray-300 mb-6">
          Aplikasi ini dikembangkan untuk membantu memahami integrasi beberapa
          library populer dalam ekosistem React modern, seperti{" "}
          <strong className="text-blue-400">Zod</strong>,{" "}
          <strong className="text-blue-400">React Hook Form</strong>,{" "}
          <strong className="text-blue-400">React Query</strong>, dan{" "}
          <strong className="text-blue-400">Zustand</strong>.
        </p>

        <div className="text-left bg-[#1e293b]/70 rounded-2xl p-6 border border-gray-700 shadow-inner">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-3">
            🔍 Tujuan Pengembangan
          </h2>

          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Mempelajari validasi form menggunakan Zod & React Hook Form.</li>
            <li>Menerapkan pengelolaan data asinkron dengan React Query.</li>
            <li>Menggunakan Zustand untuk manajemen state global secara efisien.</li>
            <li>Mendesain antarmuka interaktif dengan TailwindCSS dan DaisyUI.</li>
          </ul>
        </div>

        <p className="text-gray-400 mt-6 italic">
          Halaman ini memberikan gambaran umum tentang tujuan dan teknologi
          yang digunakan dalam pengembangan aplikasi ini.
        </p>
      </div>
    </div>
  );
}