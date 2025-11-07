import { dummyResumeData } from "@/assets/assets";
import ColorPicker from "@/features/createResume/ColorPicker";
import EducationForm from "@/features/createResume/EducationForm";
import ExperienceForm from "@/features/createResume/ExperienceForm";
import PersonalInfoForm from "@/features/createResume/PersonalInfoForm";
import ProjectsForm from "@/features/createResume/ProjectsForm";
import ResumePreview from "@/features/createResume/ResumePreview";
import SkillsForm from "@/features/createResume/SkillsForm";
import SummaryForm from "@/features/createResume/SummaryForm";
import TemplateSelector from "@/features/createResume/TemplateSelector";
import {
  ArrowLeft,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  FileText,
  Folder,
  GraduationCap,
  Sparkle,
  User,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function CreateResume() {
  const { resumeId } = useParams();

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3b82f6",
    public: false,
  });
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  // loadExistingResume
  const loadExistingResume = async () => {
    const resume = dummyResumeData.find((resume) => resume._id === resumeId);
    if (resume) {
      setResumeData(resume);
      document.title = resume.title;
    }
  };

  useEffect(() => {
    loadExistingResume();
  }, []);

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: Folder },
    { id: "skills", name: "Skills", icon: Sparkle },
  ];
  const activeSection = sections[activeSectionIndex];

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          to={"/app"}
          className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-700 transition-all"
        >
          <ArrowLeft className="size-4" />
          Back to Dashboard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* left panel -- FORM */}
          <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">
              {/* progress bar */}
              <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />
              <hr
                className="absolute top-0 left-0 h-1 bg-linear-to-r from-indigo-500 to-indigo-600 border-none transition-all duration-1000"
                style={{
                  width: `${(activeSectionIndex * 100) / (sections.length - 1)}%`,
                }}
              />

              {/* section navigation */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">
                <div className="flex items-center  gap-2">
                  <TemplateSelector 
                    selectedTemplate={resumeData.template} 
                    onChange={(template) => setResumeData(prev => ({...prev, template}))} 
                  />

                  <ColorPicker 
                    selectedColor={resumeData.accent_color} 
                    onChange={(color) => setResumeData(prev => ({...prev,accent_color: color}))}  
                  />
                </div>

                {/* Previous & Next Btns */}
                <div className="flex items-center">
                  {activeSectionIndex !== 0 && (
                    <button
                      onClick={() =>
                        setActiveSectionIndex((prev) => Math.max(prev - 1, 0))
                      }
                      className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
                      disabled={activeSectionIndex === 0}
                    >
                      <ChevronLeft className="size-4" /> Previous
                    </button>
                  )}

                  <button
                    onClick={() =>
                      setActiveSectionIndex((prev) =>
                        Math.min(prev + 1, sections.length - 1)
                      )
                    }
                    className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${
                      activeSectionIndex === sections.length - 1 && `opacity-50`
                    }`}
                    disabled={activeSectionIndex === sections.length - 1}
                  >
                    Next <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>

              {/* *** form *** */}
              <div className="space-y-6">
                {/* ********** personal form ********** */}
                {activeSection.id === "personal" && (
                  <PersonalInfoForm
                    data={resumeData?.personal_info}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        personal_info: data,
                      }))
                    }
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                )}

                {/* ********** summary form ********** */}
                {activeSection.id === "summary" && (
                  <SummaryForm
                    data={resumeData?.professional_summary}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        professional_summary: data,
                      }))
                    }
                    setResumeData={setResumeData}
                  />
                )}

                {/* ********** experience form ********** */}
                {activeSection.id === "experience" && (
                  <ExperienceForm
                    data={resumeData?.experience}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        experience: data,
                      }))
                    }
                    setResumeData={setResumeData}
                  />
                )}

                {/* ********** education form ********** */}
                {activeSection.id === "education" && (
                  <EducationForm
                    data={resumeData?.education}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        education: data,
                      }))
                    }
                    setResumeData={setResumeData}
                  />
                )}

                {/* ********** projects form ********** */}
                {activeSection.id === "projects" && (
                  <ProjectsForm
                    data={resumeData?.project}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        project : data,
                      }))
                    }
                    setResumeData={setResumeData}
                  />
                )}

                {/* ********** skills form ********** */}
                {activeSection.id === "skills" && (
                  <SkillsForm
                    data={resumeData?.skills}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        skills : data,
                      }))
                    }
                    setResumeData={setResumeData}
                  />
                )}

              </div>
            </div>
          </div>

          {/* right panel -- PREVIEW */}
          <div className="lg:col-span-7 max-lg:mt-6">
            {/* btns */}
            <div className="">

            </div>

            {/* resume preview */}
            <div>
              <ResumePreview 
                data={resumeData} 
                template={resumeData.template} 
                accentColor={resumeData.accent_color} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateResume;
