// server/controllers/resumeController.js

import imagekit from "../configs/imagekit.js"; // Note: Ensure configs/imagekit.js uses `export default imagekit;`
import Resume from "../models/Resume.js";
import fs from 'fs';

// Controller for creating new resume
// POST: /api/resumes/create
export const createResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;

    // Create new resume
    const newResume = await Resume.create({ userId, title });

    // Return success message
    return res.status(201).json({ message: 'Resume created successfully.', resume: newResume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

// Controller for deleting a resume
// DELETE: /api/resumes/delete
export const deleteResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    await Resume.findOneAndDelete({ userId, _id: resumeId });

    // Return success message
    return res.status(200).json({ message: 'Resume deleted successfully' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

// Get user resume by id
// GET: /api/resumes/get/:resumeId
export const getResumeById = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    const resume = await Resume.findOne({ userId, _id: resumeId });

    if(!resume){
      return res.status(404).json({ message: 'Resume not found' });
    }

    // FIXED: Mongoose version key uses two underscores
    resume.__v = undefined; 
    resume.createdAt = undefined;
    resume.updatedAt = undefined;

    return res.status(200).json({ resume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

// Get resume by id public
// GET: /api/resumes/public/:resumeId
export const getPulicResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params; 
    const resume = await Resume.findOne({ public: true, _id: resumeId });

    if(!resume){
      return res.status(404).json({ message: 'Resume not found' });
    }
    return res.status(200).json({ resume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

// Controller for updating a resume
// PUT: /api/resumes/update
export const updateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId, resumeData, removeBackground } = req.body;
    const image = req.file;

    // FIX: Parse the string data safely into a functional JavaScript object
    let resumeDataCopy = typeof resumeData === 'string' ? JSON.parse(resumeData) : resumeData;

    if (image) {
      // FIXED: Fallback to buffer if using memory storage to prevent crash
      const fileData = image.buffer || fs.createReadStream(image.path);

      // FIXED: Added .files before .upload() for @imagekit/nodejs compatibility
      const response = await imagekit.files.upload({
        file: fileData,
        fileName: 'resume.png',
        folder: "/user_resumes",
        transformation: {
          pre: 'w-300, h-300, fo-face, z-0.75' + (removeBackground ? ',e-bgremove' : '')
        }
      });

      resumeDataCopy.personal_info.image = response.url;
    }

    // FIXED: Changed to findOneAndUpdate because you are searching by multiple fields
    const resume = await Resume.findOneAndUpdate(
      { userId, _id: resumeId }, 
      resumeDataCopy, 
      { new: true }
    );

    if (!resume) {
        return res.status(404).json({ message: 'Resume not found or unauthorized.' });
    }

    // FIXED: Changed from 404 to 200 for a successful save
    return res.status(200).json({ message: 'Saved Successfully', resume });

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}