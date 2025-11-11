import imagekit from "../lib/imagekit.js";
import openai from "../lib/openai.js";
import Resume from "../models/ResumeModel.js";
import fs from "fs";

// enhanceProfessionalSummary func (enhance professional summary)
export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;
    if (!userContent) {
      return res.status(400).json({ success: false, message: "Missing required field" });
    }

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "Your are an expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1 - 2 sentences also highlighting key skills, experince, and career objectives. Make it compelling and ATS-friendly and only return text no options or anything else. ",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });
    const enhancedContent = response.choices[0].message;

    res.status(200).json({
      success: true,
      message: "Enhanced successfully",
      enhancedContent,
    });
  } catch (error) {
    console.log(error, "Error in enhanceProfessionalSummary Controller");
    res.status(400).json({ success: false, message: "Something went wrong" });
  }
};

// enhanceJobDescription func (enhance job description)
export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;
    if (!userContent) {
      return res.status(400).json({ success: false, message: "Missing required field" });
    }

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "Your are an expert in resume writing. Your task is to enhance the job description of a resume. The job description should be 1 - 2 sentences also highlighting key responsibities and achievements.Use action verbs and quantifiable results where possible. Make it compelling and ATS-friendly and only return text no options or anything else. ",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });
    const enhancedContent = response.choices[0].message;

    res.status(200).json({
      success: true,
      message: "Enhanced successfully",
      enhancedContent,
    });
  } catch (error) {
    console.log(error, "Error in enhanceJobDescription Controller");
    res.status(400).json({ success: false, message: "Something went wrong" });
  }
};

// uploadResume func (upload existing resume)
export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;

    if (!resumeText) {
      return res.status(400).json({ success: false, message: "Missing required field" });
    }

    // *************
    const systemPrompt ="You are an expert AI Agent to extract data from resume.";
    const userPrompt = `extract data from this resume" ${resumeText}. 
    
    Provide data in the following JSON format with no additional text before of after:
    
    {
      professional_summary: { type: String, default: "" },
      skills: [{ type: String }],
      personal_info: {
        image: { type: String, default: "" },
        full_name: { type: String, default: "" },
        profession: { type: String, default: "" },
        email: { type: String, default: "" },
        phone: { type: String, default: "" },
        location: { type: String, default: "" },
        linkedin: { type: String, default: "" },
        website: { type: String, default: "" },
      },
      experience: [
        {
          company: { type: String },
          position: { type: String },
          start_date: { type: String },
          end_date: { type: String },
          description: { type: String },
          is_current: { type: Boolean },
        },
      ],
      project: [
        {
          name: { type: String },
          type: { type: String },
          description: { type: String },
        },
      ],
      education: [
        {
          institution: { type: String },
          degree: { type: String },
          field: { type: String },
          graduation_date: { type: String },
          gpa: { type: String },
        },
      ],
    }`;

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      response_format: { type: "json_object" },
    });
    const extractedData = response.choices[0].message;
    const parsedData = JSON.parse(extractedData);

    const newResume = await Resume.create({ userId, title, ...parsedData });

    res.status(200).json({
      success: true,
      message: "New resume extracted successfully",
      resumeId: newResume._id,
    });
  } catch (error) {
    console.log(error, "Error in uploadResume Controller");
    res.status(400).json({ success: false, message: "Something went wrong" });
  }
};
