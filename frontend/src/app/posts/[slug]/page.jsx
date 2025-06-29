import axios from 'axios';
import DOMPurify from 'isomorphic-dompurify';

export async function generateMetadata(props) {
  const slug = await props.params?.slug;
  const finalSlug = Array.isArray(slug) ? slug[0] : slug;

  return {
    title: decodeURIComponent(finalSlug).replace(/-/g, ' ') + ' | My Blog',
  };
}

export default async function SinglePostPage({ params }) {
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts/${slug}`);
    const post = res.data;

    return (
      <main className="min-h-screen px-4 py-10 md:py-16 lg:px-0 max-w-4xl mx-auto bg-white dark:bg-black text-gray-900 dark:text-white overflow-x-hidden">
        <article className="w-full">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-snug">{post.title}</h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-8">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
          <div
            className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none dark:prose-invert break-words"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
          />
        </article>
      </main>
    );
  } catch (err) {
    return (
      <main className="min-h-screen flex items-center justify-center text-red-500 px-4 overflow-x-hidden">
        <p>Post not found.</p>
      </main>
    );
  }
}
