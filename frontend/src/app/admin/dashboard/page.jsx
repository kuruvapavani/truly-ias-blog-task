'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { Eye, Pencil, Trash2 } from 'lucide-react';

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts`);
      setPosts(res.data);
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this post?');
    if (!confirm) return;

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('Failed to delete post');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in as admin to access this page");
      router.push("/admin/login");
      return;
    }
    fetchPosts();
  }, []);

  return (
    <main className="min-h-screen px-4 py-12 md:px-6 max-w-6xl mx-auto bg-white dark:bg-black text-gray-900 dark:text-white">
      {loading ? (
        <p className="text-lg text-gray-500 dark:text-gray-400">Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className="text-lg text-gray-500 dark:text-gray-400">No posts found.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow border border-gray-200 dark:border-gray-700">
          <table className="w-full table-auto text-left text-lg">
            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
              <tr>
                <th className="p-4 font-semibold">Title</th>
                <th className="p-4 font-semibold hidden sm:table-cell">Created At</th>
                <th className="p-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr
                  key={post._id}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <td className="p-4">{post.title}</td>
                  <td className="p-4 hidden sm:table-cell">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-center space-x-4">
                    <Link
                      href={`/posts/${post.slug}`}
                      title="View"
                      className="inline-block text-blue-500 hover:text-blue-600"
                    >
                      <Eye size={20} />
                    </Link>
                    <Link
                      href={`/admin/edit/${post.slug}`}
                      title="Edit"
                      className="inline-block text-yellow-500 hover:text-yellow-600"
                    >
                      <Pencil size={20} />
                    </Link>
                    <button
                      onClick={() => deletePost(post.slug)}
                      title="Delete"
                      className="inline-block text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
