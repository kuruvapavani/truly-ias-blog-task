import { dbConnect } from '@/lib/dbConnect.js';
import Post from '@/models/Post';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  await dbConnect();

  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
}
