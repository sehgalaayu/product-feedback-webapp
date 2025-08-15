import { z } from 'zod';

// Simple validation for creating a vote
export const createVoteSchema = z.object({
  voteType: z.enum(['upvote', 'downvote'])
});

// Export with the name middleware expects
export const voteValidation = createVoteSchema;

// TypeScript types
export type CreateVoteInput = z.infer<typeof createVoteSchema>;
