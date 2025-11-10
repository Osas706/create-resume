import express from 'express';
import { getUserById } from '../controllers/UserController.js';
import { protectedRoute } from '../middlewares/AuthMiddleware.js';

const router = express.Router();

router.get('/data', protectedRoute, getUserById);

export default router;