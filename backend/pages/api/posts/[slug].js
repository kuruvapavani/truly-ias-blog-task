import { dbConnect } from '@/lib/dbConnect';
import Post from '@/models/Post';
import slugify from 'slugify';

export default async function handler(req, res) {
  const { slug } = req.query;
  await dbConnect();

  try {
    switch (req.method) {
      case 'GET':
        const post = await Post.findOne({ slug });
        if (!post) return res.status(404).json({ error: 'Post not found' });
        return res.status(200).json(post);

      case 'PUT':
        const { title, content } = req.body;
        const updatedSlug = slugify(title, { lower: true, strict: true });
        const updatedPost = await Post.findOneAndUpdate(
          { slug },
          { title, content, slug: updatedSlug },
          { new: true }
        );
        return res.status(200).json(updatedPost);

      case 'DELETE':
        await Post.findOneAndDelete({ slug });
        return res.status(204).end();

      default:
        return res.status(405).end();
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}
