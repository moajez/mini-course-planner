import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    const user = await User.create({ email, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1d' });
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1d' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};