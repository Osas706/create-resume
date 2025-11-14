import api from "@/config/api";
import { Loader, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

function SummaryForm({ data, onChange, setResumeData }) {
  const { token } = useSelector((state) => state.auth);
  const [isGenerating, setIsGenerating] = useState(false);

  // generateSummary func
  const generateSummary = async () => {
    try {
      setIsGenerating(true);
      const prompt = `enhance my professional summary "${data}"`;
      const response = await api.post(
        "/ai/enhance-pro-sum",
        { userContent: prompt },
        {
          headers: { Authorization: token },
        }
      );
      console.log(response);

      setResumeData((prev) => ({
        ...prev,
        professional_summary: response.data.enhancedContent,
      }));
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div className="">
          <h3 className="text-lg font-semibold text-gray-700">
            Professional Summary Info
          </h3>
          <p className="text-sm text-gray-600">
            Add summary for your resume here
          </p>
        </div>

        <button
          onClick={generateSummary}
          disabled={isGenerating}
          className="flex items-center gap-2 px-1 py-2 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50"
        >
          {isGenerating ? (
            <Loader className="size-4 animate-spin" />
          ) : (
            <Sparkles className="size-4" />
          )}
          {isGenerating ? "Enhancing.." : "AI Enhance"}
        </button>
      </div>

      {/* summary textarea */}
      <div className="mt-5">
        <textarea
          name="summary"
          id=""
          rows={7}
          value={data || ""}
          className="w-full py-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors resize-none"
          placeholder="Write a compelling professional summary that highlights your key strength..."
          onChange={(e) => onChange(e.target.value)}
        />

        <p className="text-xs text-gray-500 max-w-4/5 mx-auto text-center">
          Tips: Keep it concise (3-4 sentences) and focus on your most relevant
          achievements and skills
        </p>
      </div>
    </div>
  );
}

export default SummaryForm;
