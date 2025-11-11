import express from 'express';
import { enhanceJobDescription, enhanceProfessionalSummary, uploadResume } from '../controllers/AiController.js';
import { protectedRoute } from '../middlewares/AuthMiddleware.js';

const router = express.Router();

router.post('/enhance-pro-sum', protectedRoute, enhanceProfessionalSummary);
router.post('/enhance-job-desc' ,protectedRoute,  enhanceJobDescription);
router.post('/upload-resume', protectedRoute, uploadResume);

export default router;