import { Router } from 'express';
import { feedbackController } from '../controllers/feedbackController';
import { authMiddleware, validateFeedback } from '../middlewares';

const router = Router();

// GET /api/feedback - Get all feedback (public)
router.get('/', feedbackController.getAll);

// GET /api/feedback/:id - Get single feedback (public)
router.get('/:id', feedbackController.getOne);

// POST /api/feedback - Create new feedback (needs auth + validation)
router.post('/', (req, res, next) => {
  console.log('=== REACHED FEEDBACK POST ROUTE ===');
  console.log('Request body in route:', req.body);
  next();
}, authMiddleware, validateFeedback, feedbackController.create);

// PUT /api/feedback/:id - Update feedback (needs auth + validation)
router.put('/:id', (req, res, next) => {
  console.log('=== REACHED FEEDBACK PUT ROUTE ===');
  console.log('Request body in route:', req.body);
  console.log('Request headers:', req.headers);
  next();
}, authMiddleware, validateFeedback, feedbackController.update);

// DELETE /api/feedback/:id - Delete feedback (needs auth)
router.delete('/:id', authMiddleware, feedbackController.delete);

export default router;
