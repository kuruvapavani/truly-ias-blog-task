import jwt from 'jsonwebtoken';

export const authenticateAdmin = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new Error('Missing Authorization header');

  const token = authHeader.split(' ')[1];
  if (!token) throw new Error('Missing token');

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.role !== 'admin') throw new Error('Not authorized');
    return payload;
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
};
