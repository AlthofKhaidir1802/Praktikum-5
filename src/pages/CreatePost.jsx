// src/pages/CreatePost.jsx

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

const PostSchema = z.object({
  title: z.string().min(5, "Judul minimal 5 karakter"),
  body: z.string().min(10, "Isi postingan minimal 10 karakter"),
  author: z.string().nonempty("Nama penulis wajib diisi"),
  tags: z
    .string()
    .transform((val) =>
      val
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    )
    .refine((tags) => tags.length > 0, "Minimal 1 tag"),
});

export default function CreatePost() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: "",
      body: "",
      author: "",
      tags: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:5000/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Gagal menyimpan data");
      const result = await res.json();
      console.log("✅ Berhasil simpan:", result);
      reset();
      alert("🎉 Post berhasil dibuat!");
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-base-200 shadow-xl rounded-xl p-8 mt-10">
      <h2 className="text-3xl font-bold text-primary mb-6 text-center">
        📝 Buat Postingan Baru
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {/* Judul */}
        <div>
          <label className="label">
            <span className="label-text font-semibold text-black">masukan judul</span>
          </label>
          <input
            type="text"
            {...register("title")}
            placeholder="Masukkan judul postingan"
            className="input input-bordered w-full text-black bg-white"
          />
          {errors.title && (
            <p className="text-error text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Isi */}
        <div>
          <label className="label">
            <span className="label-text font-semibold text-black">Isi</span>
          </label>
          <textarea
            {...register("body")}
            placeholder="Tulis isi postingan..."
            className="textarea textarea-bordered w-full h-32 text-black bg-white"
          />
          {errors.body && (
            <p className="text-error text-sm mt-1">{errors.body.message}</p>
          )}
        </div>

        {/* Penulis */}
        <div>
          <label className="label">
            <span className="label-text font-semibold text-black">Penulis</span>
          </label>
          <input
            type="text"
            {...register("author")}
            placeholder="Nama penulis"
            className="input input-bordered w-full text-black bg-white"
          />
          {errors.author && (
            <p className="text-error text-sm mt-1">{errors.author.message}</p>
          )}
        </div>

        {/* Tags */}
        <div>
          <label className="label">
            <span className="label-text font-semibold text-black">
              Tags (pisahkan dengan koma)
            </span>
          </label>
          <input
            type="text"
            {...register("tags")}
            placeholder="contoh: react, javascript, frontend"
            className="input input-bordered w-full text-black bg-white"
          />
          {errors.tags && (
            <p className="text-error text-sm mt-1">{errors.tags.message}</p>
          )}
        </div>

        {/* Tombol */}
        <div className="flex justify-between items-center mt-6">
          <Link to="/posts" className="btn btn-outline btn-error">
            Batal
          </Link>

          <button type="submit" className="btn btn-primary">
            Simpan Post
          </button>
        </div>
      </form>
    </div>
  );
}
