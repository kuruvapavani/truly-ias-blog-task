"use client";
import { use } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import axios from "axios";

const PostEditor = dynamic(() => import("@/components/PostEditor"), {
  ssr: false,
});

export default function EditPostPage(props) {
  const params = use(props.params);
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in as admin to access this page");
      router.push("/admin/login");
      return;
    }
    async function fetchPost() {
      try {

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts/${slug}`
        );
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug]);
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts/${slug}`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Post updated!");
      router.push("/admin/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to update post");
    }
  };

  if (loading) return <main className="p-10">Loading...</main>;

  return (
    <main className="min-h-screen px-4 py-10 max-w-4xl mx-auto bg-white dark:bg-black text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6">Edit Post</h1>

      <div className="mb-6">
        <label className="block mb-2 text-lg font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-lg"
        />
      </div>

      <div className="mb-8">
        <label className="block mb-2 text-lg font-medium">Content</label>
        <PostEditor content={content} setContent={setContent} />
      </div>

      <button
        onClick={handleUpdate}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
      >
        Save Changes
      </button>
    </main>
  );
}
