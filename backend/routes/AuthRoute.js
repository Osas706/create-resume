import express from 'express';
import { registerUser, loginUser, logOut, resetPassword, forgotPassword } from '../controllers/AuthController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post("/login", loginUser);
router.post("/logout", logOut);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password", resetPassword);

export default router;