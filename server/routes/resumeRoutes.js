import express from 'express'
import protect from '../middlewares/authMiddlewares.js';
import { createResume, deleteResume, getPulicResumeById, getResumeById, updateResume } from '../controllers/resumeController.js';
import upload from '../configs/multer.js';

const resumeRouter = express.Router();

resumeRouter.post('/create', protect, createResume);
resumeRouter.put('/update', upload.single('image'), protect, updateResume);

// Fixed: Removed the space after the colon in ':resumeId'
resumeRouter.delete('/delete/:resumeId', protect, deleteResume);
resumeRouter.get('/get/:resumeId', protect, getResumeById);

// Fixed: Changed the path to '/public/:resumeId' so it doesn't conflict with the protected '/get' route
resumeRouter.get('/public/:resumeId', getPulicResumeById);

export default resumeRouter;