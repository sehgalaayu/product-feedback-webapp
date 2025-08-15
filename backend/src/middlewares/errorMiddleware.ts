import { Request, Response, NextFunction } from 'express';

// Middleware to handle errors
export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', error);
  
  res.status(500).json({ 
    message: 'Something went wrong' 
  });
};

// Middleware for 404 errors
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ 
    message: 'Route not found' 
  });
};
