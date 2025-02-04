import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;
  
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized' });
  }
};