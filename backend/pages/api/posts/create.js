import { dbConnect } from '@/lib/dbConnect';
import Post from '@/models/Post';
import slugify from 'slugify';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

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
