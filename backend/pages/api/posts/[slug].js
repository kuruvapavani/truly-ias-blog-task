import { dbConnect } from '@/lib/dbConnect';
import Post from '@/models/Post';
import slugify from 'slugify';
import { authenticateAdmin } from '@/lib/auth'; // ✅ import auth

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_URL || "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, DELETE, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { slug } = req.query;
  await dbConnect();

  try {
    switch (req.method) {
      case 'GET':
        const post = await Post.findOne({ slug });
        if (!post) return res.status(404).json({ error: 'Post not found' });
        return res.status(200).json(post);

      case 'PUT':
        try {
          authenticateAdmin(req); // ✅ only admins can edit
        } catch (err) {
          return res.status(401).json({ error: err.message });
        }

        const { title, content } = req.body;
        const updatedSlug = slugify(title, { lower: true, strict: true });

        const updatedPost = await Post.findOneAndUpdate(
          { slug },
          { title, content, slug: updatedSlug },
          { new: true }
        );
        return res.status(200).json(updatedPost);

      case 'DELETE':
        try {
          authenticateAdmin(req); // ✅ only admins can delete
        } catch (err) {
          return res.status(401).json({ error: err.message });
        }

        await Post.findOneAndDelete({ slug });
        return res.status(204).end();

      default:
        return res.status(405).end();
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}
