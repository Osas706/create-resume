import { Sparkles } from "lucide-react";
import React from "react";

function SummaryForm({ data, onChange, setResumeData }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div className="">
          <h3 className="text-lg font-semibold text-gray-500">
            Professional Summary Info
          </h3>
          <p className="text-sm text-gray-600">
            Add summary for your resume here
          </p>
        </div>

        <button className="flex items-center gap-2 px-1 py-2 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50">
          <Sparkles className="size-4" />
          AI Enhance
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
          Tips: Keep it concise (3-4 sentences) and focus on your most relevant achievements and skills
        </p>
      </div>
    </div>
  );
}

export default SummaryForm;
