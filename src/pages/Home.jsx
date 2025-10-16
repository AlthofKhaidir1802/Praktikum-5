export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-transparent text-white px-6 py-10">
      <div className="max-w-3xl bg-[#111827]/70 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-gray-700 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500 drop-shadow-lg">
          HAI SOBAT UNBIN!
        </h1>

        <p className="text-lg leading-relaxed text-gray-300 mb-6">
          Ini adalah aplikasi sederhana yang dibuat untuk mendemonstrasikan
          penggunaan{" "}
          <strong className="text-indigo-400">Zod</strong>,{" "}
          <strong className="text-indigo-400">React Hook Form</strong>,{" "}
          <strong className="text-indigo-400">React Query</strong>, dan{" "}
          <strong className="text-indigo-400">Zustand</strong> dalam satu proyek
          React modern.
        </p>

        <div className="text-left bg-[#1e293b]/70 rounded-2xl p-6 border border-gray-700 shadow-inner">
          <h2 className="text-2xl font-semibold text-purple-400 mb-3">
            💡 Cara Menggunakan Aplikasi Ini
          </h2>

          <ol className="list-decimal list-inside space-y-2 text-gray-300">
            <li>
              Buka halaman <strong className="text-indigo-400">Login</strong> dan
              masukkan username kamu untuk masuk ke sistem.
            </li>
            <li>
              Setelah login, kunjungi halaman{" "}
              <strong className="text-indigo-400">Posts</strong> untuk melihat
              daftar postingan yang tersedia.
            </li>
            <li>
              Klik tombol{" "}
              <strong className="text-indigo-400">Buat Postingan Baru</strong>{" "}
              untuk menambahkan konten baru menggunakan form validasi Zod.
            </li>
            <li>
              Kamu dapat <strong>Edit</strong> atau <strong>Delete</strong>{" "}
              postingan yang sudah ada secara langsung di halaman Posts.
            </li>
            <li>
              Setiap perubahan otomatis diperbarui berkat dukungan dari{" "}
              <strong className="text-indigo-400">React Query</strong>.
            </li>
            <li>
              Logout kapan pun dengan menekan tombol{" "}
              <strong>Logout</strong> di navbar atas.
            </li>
          </ol>
        </div>

        <p className="text-gray-400 mt-6 italic">
          Proyek ini dirancang sebagai latihan untuk memahami alur kerja aplikasi
          modern berbasis React — mulai dari validasi form, manajemen data, hingga
          desain antarmuka dengan TailwindCSS dan DaisyUI.
        </p>
      </div>
    </div>
  );
}
