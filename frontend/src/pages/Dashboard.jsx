import { Plus, UploadCloud } from "lucide-react";
import React, { useEffect, useState } from "react";
import ResumeCard from "../features/dashboard/ResumeCard";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "@/config/api";
import { toast } from "sonner";
import pdfToText from "react-pdftotext";

function Dashboard() {
  const { user, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [allResumes, setAllResumes] = useState([]);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);

  const [loading, setLoading] = useState(false);

  // loadAllResume
  const loadAllResume = async () => {
    try {
      const { data } = await api.get("/user/resumes", { 
        headers: { Authorization: token }}
      );

      setAllResumes(data?.resumes);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // createResume
  const createResume = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/resume/create",
        { title },
        { headers: { Authorization: token }}
      );
      setAllResumes([...allResumes, data.resume]);
      setTitle("");
      navigate(`/app/create-resume/${data.resume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // uploadResume
  const uploadResume = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const resumeText = await pdfToText(resume);
      const { data } = await api.post("/ai/upload-resume",
        { title, resumeText },
        { headers: { Authorization: token }}
      );
      setTitle("");
      setResume(null);
      navigate(`/app/create-resume/${data.resumeId}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    };
  };

  useEffect(() => {
    loadAllResume();
  }, []);

  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <p className="text-slate-700 font-medium mb-5 sm:hidden">
          Welcome , {user?.name}
        </p>

        <div className="flex gap-4">
          {/* create resume */}
          <Dialog>
            <DialogTrigger asChild>
              <button className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group-hover:border-indigo-600 hover:shadow-sm transition-all duration-300 cursor-pointer">
                <Plus className="size-11 p-2.5 bg-indigo-700 text-white rounded-full" />
                <p className="text-sm group-hover:text-indigo-600 transition-all duration-300">
                  Create Resume
                </p>
              </button>
            </DialogTrigger>

            <DialogContent
              aria-describedby={undefined}
              className="sm:max-w-[425px] bg-white border-slate-300 p-3"
            >
              <form onSubmit={createResume}>
                <div onClick={(e) => e.stopPropagation()}>
                  <DialogTitle className="text-xl font-semibold mb-4">
                    Create a Resume
                  </DialogTitle>

                  <input
                    type="text"
                    placeholder="Enter resume title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    className="w-full py-2 px-4 mb-4 focus:border-indigo-600 ring-indigo-600 rounded "
                    required
                  />

                  <button
                    type="submit"
                    className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
                  >
                    Create Resume
                  </button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          {/* Upload Exisiting */}
          <Dialog>
            <DialogTrigger asChild>
              <button className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group-hover:border-sky-600 hover:shadow-sm transition-all duration-300 cursor-pointer">
                <UploadCloud className="size-11 p-2.5 bg-sky-700 text-white rounded-full" />
                <p className="text-sm group-hover:text-sky-600 transition-all duration-300">
                  Upload Existing
                </p>
              </button>
            </DialogTrigger>

            <DialogContent
              aria-describedby={undefined}
              className="sm:max-w-[425px] bg-white border-slate-300 p-3"
            >
              <form onSubmit={uploadResume}>
                <div onClick={(e) => e.stopPropagation()}>
                  <DialogTitle className="text-xl font-semibold mb-4">
                    Upload Existing
                  </DialogTitle>

                  <input
                    type="text"
                    placeholder="Enter resume title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    className="w-full py-2 px-4 mb-4 focus:border-indigo-600 ring-indigo-600 rounded "
                    required
                  />

                  <div className="">
                    <label
                      htmlFor="resume-input"
                      className="Block text-sm text-slate-700"
                    >
                      <div className="flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-indigo-600 hover:text-indigo-700 cursor-pointer transition-colors">
                        {resume ? (
                          <p className="text-indigo-700">{resume.name}</p>
                        ) : (
                          <>
                            <UploadCloud />
                            <p>Upload ResUme</p>
                          </>
                        )}
                      </div>
                    </label>

                    <input
                      type="file"
                      id="resume-input"
                      accept=".pdf"
                      onChange={(e) => setResume(e.target.files[0])}
                      hidden
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? "Uploading..." : "Upload Existing "}
                  </button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <hr className="sm:w-[305px] my-6 border-slate-300" />

        {/* resume display */}
        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];

            return (
              <ResumeCard
                resume={resume}
                baseColor={baseColor}
                key={index}
                allResumes={allResumes}
                setAllResumes={setAllResumes}
              />
            );
          })}
        </div>

        {/* resume empty */}
        <div className="flex flex-wrap gap-4 mt-5">
         {allResumes.length === 0 && (
            <p className="text-center w-full text-slate-400 text-lg max-w-sm md:max-w-md mx-auto">
              No resumes found, click "Create Resume" or "Upload existing" resume to get started. 
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
