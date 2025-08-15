import { z } from 'zod';

// Simple validation for creating feedback
export const createFeedbackSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  category: z.enum(['bug', 'feature', 'improvement', 'other'])
});

// Export with the name middleware expects
export const feedbackValidation = createFeedbackSchema;

// TypeScript types
export type CreateFeedbackInput = z.infer<typeof createFeedbackSchema>;
