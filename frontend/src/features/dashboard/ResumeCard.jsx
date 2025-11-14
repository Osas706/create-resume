import React, { useState } from "react";
import { FilePenLine, Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import api from "@/config/api";
import { toast } from "sonner";
import { useSelector } from "react-redux";

function ResumeCard({ resume, baseColor, allResumes, setAllResumes }) {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [editResumeId, setEditResumeId] = useState("");

  // editTitle
  const editTitle = async (e) => {
    try {
      e.preventDefault();
      const { data } = await api.put(`/resume/update`,{
          resumeId: editResumeId,
          resumeData: { title },
        },
        { headers: { Authorization: token } }
      );

      setAllResumes(allResumes.map((resume) =>
        resume._id === editResumeId ? { ...resume, title } : resume
      ));
      setTitle("");
      setEditResumeId("");
      setOpen(false);
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // deleteResume
  const deleteResume = async (resumeId) => {
    try {
      const confirm = window.confirm("Are you sure you want to delele this resume ?");
      if (confirm) {
        const { data } = await api.delete(`/resume/delete/${resumeId}`, {
          headers: { Authorization: token },
        });
        setAllResumes(allResumes.filter((item) => item._id !== resumeId));
        toast.success(data?.message);
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <button
      onClick={() => navigate(`/app/create-resume/${resume?._id}`)}
      className="relative group w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border hover:shadow-sm transition-all duration-300 cursor-pointer"
      style={{
        background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
        borderColor: baseColor + "40",
      }}
    >
      <FilePenLine
        className="size-7 group-hover:scale-105 transition-all"
        style={{ color: baseColor }}
      />

      <p
        className="text-sm group-hover:scale-105 transition-all px-2 text-center"
        style={{ color: baseColor }}
      >
        {resume?.title}
      </p>

      <p
        className="absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center"
        style={{ color: baseColor + "90" }}
      >
        Updated on{new Date(resume.updatedAt).toLocaleDateString()}{" "}
      </p>

      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-1 right-1 hidden group-hover:flex items-center gap-1"
      >
        {/* delete resume */}
        <Trash
          onClick={() => deleteResume(resume._id)}
          className="size-6 p-1 hover:bg-white/40 rounded text-slate-700 transition-colors"
        />

        {/* edit resume */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Pencil
              onClick={() => {
                setTitle(resume.title),
                  setEditResumeId(resume._id),
                  setOpen(true);
              }}
              className="size-6 p-1 hover:bg-white/40 rounded text-slate-700 transition-colors"
            />
          </DialogTrigger>

          <DialogContent
            aria-describedby={undefined}
            className="sm:max-w-[425px] bg-white border-slate-300 p-3"
          >
            <form onSubmit={editTitle}>
              <div onClick={(e) => e.stopPropagation()}>
                <DialogTitle className="text-xl font-semibold mb-4">
                  Edit Resume
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
                  Edit Resume
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </button>
  );
}

export default ResumeCard;
