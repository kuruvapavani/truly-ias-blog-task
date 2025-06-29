'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from '@/components/PostCard';

const POSTS_PER_PAGE = 6;

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [visible, setVisible] = useState(POSTS_PER_PAGE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts`);
        setPosts(res.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleLoadMore = () => {
    setVisible((prev) => prev + POSTS_PER_PAGE);
  };

  return (
    <main className="min-h-screen px-4 py-10 bg-gray-50 dark:bg-black text-gray-900 dark:text-white">
      <div className="max-w-6xl mx-auto">
        {loading ? (
          <p className="text-center">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-center">No posts found.</p>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {posts.slice(0, visible).map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>

            {visible < posts.length && (
              <div className="mt-10 text-center">
                <button
                  onClick={handleLoadMore}
                  className="bg-primary text-white px-5 py-2 rounded-xl font-semibold hover:bg-blue-600 transition"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
