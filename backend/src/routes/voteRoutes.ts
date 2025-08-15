import { Router } from 'express';
import { voteController } from '../controllers/voteController';
import { authMiddleware, validateVote } from '../middlewares';

const router = Router();

// POST /api/votes/:feedbackId - Vote on feedback (needs auth + validation)
router.post('/:feedbackId', authMiddleware, validateVote, voteController.vote);

export default router;
