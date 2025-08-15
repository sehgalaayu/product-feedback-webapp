import { Request, Response } from 'express';
import Feedback from '../models/Feedback';

export const voteController = {
  // Vote on feedback
  async vote(req: Request, res: Response) {
    try {
      const { feedbackId } = req.params;
      const { voteType } = req.body; // 'upvote' or 'downvote'
      const userId = (req as any).user?.userId;

      const feedback = await Feedback.findById(feedbackId);
      if (!feedback) {
        return res.status(404).json({ message: 'Feedback not found' });
      }

      // Check if user already voted
      const existingVote = feedback.votes.find(vote => vote.user.toString() === userId);
      
      if (existingVote) {
        // Update existing vote
        existingVote.voteType = voteType;
      } else {
        // Add new vote
        feedback.votes.push({ user: userId, voteType });
      }

      await feedback.save();
      res.json({ message: 'Vote added', feedback });
    } catch (error) {
      console.error('Vote error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
};
