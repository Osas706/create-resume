import { dummyResumeData } from "@/assets/assets";
import ResumePreview from "@/features/createResume/ResumePreview";
import { ArrowLeft, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Preview() {
  const { resumeId } = useParams();

  const [resumeData, setResumeData] = useState(null);
  let isLoading = false;

  // loadResume
  const loadResume = async () => {
    isLoading = true;

    setResumeData(
      dummyResumeData.find((resume) => resume._id === resumeId || null)
    );

    isLoading = false;
  };

  useEffect(() => {
    loadResume();
  }, []);

  return (
    <div>
      {resumeData ? (
        <div className="bg-slate-100">
          <div className="max-w-3xl mx-auto py-10">
            <ResumePreview
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.accent_color}
              classes="py-4 bg-white"
            />
          </div>
        </div>
      ) : (
        <div>
          {isLoading  ? (
            <div className="min-h-screen w-full h-full flex items-center justify-center">
              <Loader2 className="size-10 animate-spin " />{" "}
            </div>
          ) : (
            <div className="min-h-screen w-full h-full flex flex-col items-center justify-center">
              <p className="text-center text-6xl text-slate-400">Resume not found</p>

              <a href="/" className="flex items-center gap-2 mt-2 bg-green-500 hover:green-600 text-white rounded-full px-6 py-2 ring-offset-1 ring-1 ring-green-400 transition-colors">
                <ArrowLeft className="size-4" />
                <p className="text-sm font-bold">go to home page</p>
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Preview;
