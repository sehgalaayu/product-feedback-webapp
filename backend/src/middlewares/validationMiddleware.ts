import { Request, Response, NextFunction } from 'express';
import { createUserSchema, loginUserSchema, feedbackValidation, voteValidation } from '../validations';

// Middleware to validate request data
export const validateUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Use createUserSchema for register, loginUserSchema for login
    const schema = req.path.includes('login') ? loginUserSchema : createUserSchema;
    schema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

export const validateFeedback = (req: Request, res: Response, next: NextFunction) => {
  console.log('=== FEEDBACK VALIDATION DEBUG ===');
  console.log('Request headers:', req.headers);
  console.log('Request body:', req.body);
  console.log('Request body type:', typeof req.body);
  console.log('Request body keys:', Object.keys(req.body || {}));
  
  try {
    console.log('Validating feedback data:', req.body);
    feedbackValidation.parse(req.body);
    console.log('Validation passed');
    next();
  } catch (error) {
    console.log('Validation error:', error);
    res.status(400).json({ message: 'Invalid feedback data', details: error });
  }
};

export const validateVote = (req: Request, res: Response, next: NextFunction) => {
  try {
    voteValidation.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid vote data' });
  }
};
