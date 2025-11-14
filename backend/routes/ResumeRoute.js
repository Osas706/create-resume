import express from 'express';
import { protectedRoute } from '../middlewares/AuthMiddleware.js';
import { createResume, deleteResume, getPublicResumeById, getResumeById , updateResume} from '../controllers/ResumeController.js';
import upload from '../lib/multer.js';

const router = express.Router();

router.post('/create', protectedRoute, createResume);
router.put("/update/:resumeId", upload.single('image'), protectedRoute, updateResume );

router.get("/get/:resumeId", protectedRoute, getResumeById );
router.get("/public/:resumeId", getPublicResumeById );

router.delete("/delete/:resumeId", protectedRoute, deleteResume );

export default router;