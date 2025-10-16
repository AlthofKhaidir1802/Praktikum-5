// src/pages/Posts.jsx

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

// Fetch data posts
async function fetchPosts() {
  const res = await fetch("http://localhost:5000/posts");
  if (!res.ok) throw new Error("Gagal fetch posts");
  return res.json();
}

// Delete post
async function deletePost(id) {
  const res = await fetch(`http://localhost:5000/posts/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Gagal menghapus post");
  return res.json();
}

export default function Posts() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const handleDelete = (id) => {
    if (window.confirm("🗑️ Yakin ingin menghapus post ini?")) {
      mutation.mutate(id);
    }
  };

  // STATE HANDLING
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <span className="loading loading-spinner loading-lg text-cyan-400"></span>
      </div>
    );

  if (isError)
    return (
      <p className="text-center text-red-400 mt-10">❌ {error.message}</p>
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-transparent text-white px-6 py-10">
      <div className="w-full max-w-5xl bg-[#111827]/70 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-gray-700">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 text-center md:text-left">
          <h1 className="text-3xl font-bold mb-4 md:mb-0 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 drop-shadow-lg">
            📚 Daftar Postingan
          </h1>
          <Link
            to="/posts/create"
            className="btn bg-gradient-to-r from-blue-600 to-cyan-500 border-none text-white shadow-md hover:from-blue-500 hover:to-cyan-400 transition"
          >
            + Buat Postingan Baru
          </Link>
        </div>

        {/* Notifikasi */}
        {mutation.isLoading && (
          <p className="text-cyan-400 mb-3">⏳ Sedang menghapus...</p>
        )}
        {mutation.isSuccess && (
          <p className="text-green-400 mb-3">✅ Post berhasil dihapus</p>
        )}
        {mutation.isError && (
          <p className="text-red-400 mb-3">❌ {mutation.error.message}</p>
        )}

        {/* Daftar post */}
        {data && data.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {data.map((post) => (
              <div
                key={post.id}
                className="bg-[#1e293b]/70 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-lg p-6 hover:shadow-cyan-700/30 transition-all"
              >
                <h2 className="text-xl font-semibold text-cyan-400 mb-1">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-400 mb-2">
                  ✍️ {post.author || "Tanpa Penulis"}
                </p>
                <p className="text-base text-gray-200">{post.body}</p>

                {post.tags && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {post.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded-full border border-cyan-400 text-cyan-300 text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex justify-end gap-2 mt-5">
                  <Link
                    to={`/posts/${post.id}/edit`}
                    className="btn btn-sm bg-gradient-to-r from-yellow-500 to-orange-400 border-none text-white hover:from-yellow-400 hover:to-orange-300"
                  >
                    ✏️ Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="btn btn-sm bg-gradient-to-r from-red-600 to-pink-600 border-none text-white hover:from-red-500 hover:to-pink-500"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 mt-10">
            <p>Belum ada postingan.</p>
            <Link
              to="/posts/create"
              className="btn mt-3 bg-gradient-to-r from-blue-600 to-cyan-500 border-none text-white shadow-md hover:from-blue-500 hover:to-cyan-400"
            >
              Tambahkan Sekarang
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
