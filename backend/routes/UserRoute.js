import express from 'express';
import { getUserById, getUserResumes } from '../controllers/UserController.js';
import { protectedRoute } from '../middlewares/AuthMiddleware.js';

const router = express.Router();

router.get('/data', protectedRoute, getUserById);
router.get('/resumes', protectedRoute, getUserResumes);

export default router;