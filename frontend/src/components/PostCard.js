'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

function getSnippet(html, length = 150) {
  const text = html.replace(/<[^>]*>?/gm, '');
  return text.length > length ? text.slice(0, length) + '...' : text;
}

export default function PostCard({ post }) {
  return (
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="bg-white/80 dark:bg-zinc-900/70 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all p-6"
    >
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
        {post.title}
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
        {getSnippet(post.content)}
      </p>
      <Link
        href={`/posts/${post.slug}`}
        className="text-sm font-semibold text-primary hover:underline"
      >
        Read more →
      </Link>
    </motion.div>
  );
}
