import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Middleware to check if user is authenticated
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log('=== AUTH MIDDLEWARE ===');
  console.log('Request body in auth:', req.body);
  console.log('Authorization header:', req.headers.authorization);
  
  try {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1]; // "Bearer TOKEN"
    
    if (!token) {
      console.log('No token provided');
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify token
    const decoded = jwt.verify(token, 'secret-key') as any;
    console.log('Token verified, user ID:', decoded.userId);
    
    // Add user info to request
    (req as any).user = { userId: decoded.userId };
    
    next(); // Continue to controller
  } catch (error) {
    console.log('Auth error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};
