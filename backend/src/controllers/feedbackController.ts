import { Request, Response } from 'express';
import Feedback from '../models/Feedback';

export const feedbackController = {
  // Create feedback
  async create(req: Request, res: Response) {
    console.log('=== FEEDBACK CONTROLLER CREATE ===');
    console.log('Request body in controller:', req.body);
    console.log('User ID:', (req as any).user?.userId);
    
    try {
      const { title, description, category } = req.body;
      const userId = (req as any).user?.userId;

      console.log('Extracted data:', { title, description, category, userId });

      const feedback = new Feedback({
        title,
        description,
        category,
        author: userId
      });
      await feedback.save();

      res.status(201).json({ message: 'Feedback created', feedback });
    } catch (error) {
      console.log('Controller error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Get all feedback
  async getAll(req: Request, res: Response) {
    try {
      const feedback = await Feedback.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'author',
            foreignField: '_id',
            as: 'authorData'
          }
        },
        {
          $unwind: '$authorData'
        },
        {
          $addFields: {
            voteScore: {
              $subtract: [
                { $size: { $filter: { input: '$votes', cond: { $eq: ['$$this.voteType', 'upvote'] } } } },
                { $size: { $filter: { input: '$votes', cond: { $eq: ['$$this.voteType', 'downvote'] } } } }
              ]
            }
          }
        },
        {
          $sort: { voteScore: -1, createdAt: -1 }
        },
        {
          $project: {
            _id: 1,
            title: 1,
            description: 1,
            category: 1,
            votes: 1,
            createdAt: 1,
            author: {
              _id: '$authorData._id',
              username: '$authorData.username'
            }
          }
        }
      ]);

      res.json({ feedback });
    } catch (error) {
      console.error('Error getting feedback:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Get single feedback
  async getOne(req: Request, res: Response) {
    try {
      const feedback = await Feedback.findById(req.params.id)
        .populate('author', 'username');

      if (!feedback) {
        return res.status(404).json({ message: 'Feedback not found' });
      }

      res.json({ feedback });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Update feedback
  async update(req: Request, res: Response) {
    console.log('=== FEEDBACK CONTROLLER UPDATE ===');
    console.log('Request body in controller:', req.body);
    console.log('User ID:', (req as any).user?.userId);
    console.log('Feedback ID:', req.params.id);
    
    try {
      const { title, description, category } = req.body;
      const userId = (req as any).user?.userId;

      console.log('Extracted data:', { title, description, category, userId });

      const feedback = await Feedback.findById(req.params.id);
      if (!feedback) {
        return res.status(404).json({ message: 'Feedback not found' });
      }

      if (feedback.author.toString() !== userId) {
        return res.status(403).json({ message: 'Not authorized' });
      }

      const updatedFeedback = await Feedback.findByIdAndUpdate(
        req.params.id,
        { title, description, category },
        { new: true }
      );

      res.json({ message: 'Feedback updated', feedback: updatedFeedback });
    } catch (error) {
      console.log('Update controller error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Delete feedback
  async delete(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.userId;

      const feedback = await Feedback.findById(req.params.id);
      if (!feedback) {
        return res.status(404).json({ message: 'Feedback not found' });
      }

      if (feedback.author.toString() !== userId) {
        return res.status(403).json({ message: 'Not authorized' });
      }

      await Feedback.findByIdAndDelete(req.params.id);
      res.json({ message: 'Feedback deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
};
