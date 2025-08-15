import { Router } from 'express';
import { userController } from '../controllers/userController';
import { validateUser } from '../middlewares/validationMiddleware';

const router = Router();

// POST /api/users/register - Create new user account
router.post('/register', validateUser, userController.register);

// POST /api/users/login - Login existing user
router.post('/login', validateUser, userController.login);

export default router;
