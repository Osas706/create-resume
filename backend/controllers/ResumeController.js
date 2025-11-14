import imagekit from "../lib/imagekit.js";
import Resume from "../models/ResumeModel.js";
import fs from "fs";

// createResume
export const createResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;

    const newResume = await Resume.create({
      userId,
      title,
    });

    res.status(201).json({
      success: true,
      message: "Resume created successfully",
      resume: newResume,
    });
  } catch (error) {
    console.log(error, "Error in createResume Controller");
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// deleteResume
export const deleteResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    await Resume.findOneAndDelete({ userId, _id: resumeId });

    res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error) {
    console.log(error, "Error in deleteResume Controller");
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// getResumeById
export const getResumeById = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    const resume = await Resume.findOne({ userId, _id: resumeId });
    if (!resume) {
      return res
        .status(500)
        .json({ success: false, message: "Resume not found" });
    }

    resume.__v = undefined;
    resume.createdAt = undefined;
    resume.updatedAt = undefined;

    res.status(200).json({
      success: true,
      message: "Fetched resume successfully",
      resume,
    });
  } catch (error) {
    console.log(error, "Error in getResumeById Controller");
    res.status(400).json({ success: false, message: "Something went wrong" });
  }
};

// getPublicResumeById
export const getPublicResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findOne({ public: true, _id: resumeId });
    if (!resume) {
      return res
        .status(500)
        .json({ success: false, message: "Resume not found" });
    }

    resume.__v = undefined;
    resume.createdAt = undefined;
    resume.updatedAt = undefined;

    res.status(200).json({
      success: true,
      message: "Fetched resume successfully",
      resume,
    });
  } catch (error) {
    console.log(error, "Error in getPublicResumeById Controller");
    res.status(400).json({ success: false, message: "Something went wrong" });
  }
};

// updateResume
export const updateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId, resumeData, removeBackground } = req.body;
    const image = req.file;

    let resumeDataCopy = JSON.parse(JSON.stringify(resumeData));

    if (image) {
      const imageBufferData = fs.createReadStream(image.path);
      const response = await imagekit.files.upload({ 
        file: imageBufferData,
        fileName: "resume.jpg" ,
        folder: 'user-resumes',
        transformation: {
          pre: 'w-300, h-300, fo-face,z-0.75' + (removeBackground ? 'e-bg-remove' : '')
        }
      });

      resumeDataCopy.personal_info.image = response.url;
    }

    const resume = await Resume.findOneAndUpdate(
      { userId, _id: resumeId },
      resumeDataCopy,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Saved resume successfully",
      resume,
    });
  } catch (error) {
    console.log(error, "Error in updateResume Controller");
    res.status(400).json({ success: false, message: "Something went wrong" });
  }
};
