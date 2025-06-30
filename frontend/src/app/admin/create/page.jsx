'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { Loader, Send } from 'lucide-react';

// Load PostEditor dynamically (Tiptap)
const PostEditor = dynamic(() => import('@/components/PostEditor'), { ssr: false });

export default function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(()=>{
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in as admin to access this page");
      router.push("/admin/login");
      return;
    }
  },[])

  const handleCreate = async () => {
    if (!title.trim() || !content.trim()) return alert('Title and content are required!');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts/create`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      router.push('/admin/dashboard');
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.error || 'Failed to create post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-primary">Create New Post</h1>

      <input
        type="text"
        placeholder="Enter post title"
        className="w-full mb-4 p-3 border rounded-lg dark:bg-zinc-900 dark:text-white"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <PostEditor content={content} setContent={setContent} />

      <button
        onClick={handleCreate}
        className="mt-6 flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? <Loader className="animate-spin" size={18} /> : <Send size={18} />}
        {loading ? 'Publishing...' : 'Publish'}
      </button>
    </div>
  );
}
