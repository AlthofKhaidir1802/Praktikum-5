// src/pages/EditPost.jsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/posts/${id}`);
      if (!res.ok) throw new Error("Gagal fetch post");
      return res.json();
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(PostSchema),
  });

  useEffect(() => {
    if (data) {
      setValue("title", data.title);
      setValue("body", data.body);
      setValue("author", data.author);
      setValue("tags", data.tags.join(", "));
    }
  }, [data, setValue]);

  const mutation = useMutation({
    mutationFn: async (updatedPost) => {
      const res = await fetch(`http://localhost:5000/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPost),
      });
      if (!res.ok) throw new Error("Gagal update post");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      navigate("/posts");
    },
  });

  const onSubmit = (formData) => {
    mutation.mutate(formData);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto bg-gray-50 shadow-lg rounded-xl p-8 mt-10 border border-gray-200">
      <h2 className="text-3xl font-bold text-[#4F46E5] mb-6 text-center flex items-center justify-center gap-2">
        <span>✏️</span> Edit Postingan
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div>
          <label className="label">
            <span className="label-text font-semibold text-black">Judul</span>
          </label>
          <input
            type="text"
            {...register("title")}
            placeholder="Masukkan judul postingan"
            className="input input-bordered w-full"
          />
          {errors.title && (
            <p className="text-error text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="label">
            <span className="label-text font-semibold text-black">Isi</span>
          </label>
          <textarea
            {...register("body")}
            placeholder="Tulis isi postingan..."
            className="textarea textarea-bordered w-full h-32"
          />
          {errors.body && (
            <p className="text-error text-sm mt-1">{errors.body.message}</p>
          )}
        </div>

        <div>
          <label className="label">
            <span className="label-text font-semibold text-black">Penulis</span>
          </label>
          <input
            type="text"
            {...register("author")}
            placeholder="Nama penulis"
            className="input input-bordered w-full"
          />
          {errors.author && (
            <p className="text-error text-sm mt-1">{errors.author.message}</p>
          )}
        </div>

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
            className="input input-bordered w-full"
          />
          {errors.tags && (
            <p className="text-error text-sm mt-1">{errors.tags.message}</p>
          )}
        </div>

        <div className="flex justify-between items-center mt-6">
          <Link to="/posts" className="btn btn-outline btn-error">
            Batal
          </Link>

          <button
            type="submit"
            className={`btn bg-[#4F46E5] hover:bg-[#4338CA] text-white border-none ${
              mutation.isLoading ? "loading" : ""
            }`}
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Menyimpan..." : "Update Post"}
          </button>
        </div>

        {mutation.isError && (
          <p className="text-error text-center mt-3">
            ❌ {mutation.error.message}
          </p>
        )}
      </form>
    </div>
  );
}