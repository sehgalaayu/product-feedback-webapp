import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt-ts';
import jwt from 'jsonwebtoken';

export const userController = {
  // Register new user
  async register(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;

      // Check if user exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Create user (password will be hashed by the model)
      const newUser = new User({ username, email, password });
      await newUser.save();

      // Create token
      const token = jwt.sign({ userId: newUser._id }, 'secret-key', { expiresIn: '24h' });

      res.status(201).json({ message: 'User created', token });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Login user
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Find user and check password
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Create token
      const token = jwt.sign({ userId: user._id }, 'secret-key', { expiresIn: '24h' });

      res.json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
};
