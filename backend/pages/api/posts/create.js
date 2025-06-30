import { dbConnect } from '@/lib/dbConnect';
import Post from '@/models/Post';
import slugify from 'slugify';
import { authenticateAdmin } from '@/lib/auth'; // ✅ import auth

export default async function handler(req, res) {
  res.setHeader(
    "Access-Control-Allow-Origin",
    process.env.FRONTEND_URL || "http://localhost:3000"
  );
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  if (req.method !== 'POST') return res.status(405).end();

  // ✅ Check for admin authentication
  try {
    authenticateAdmin(req);
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }

  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ error: 'Missing title or content' });

  await dbConnect();

  const slug = slugify(title, { lower: true, strict: true });

  try {
    const newPost = await Post.create({ title, content, slug });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
}
