import { Plus, Sparkles, X } from "lucide-react";
import React, { useState } from "react";

function SkillsForm({ data, onChange }) {
  const [newSkill, setNewSkill] = useState("");

  // addSkill func
  const addSkill = () => {
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      onChange([...data, newSkill.trim()]);
      setNewSkill("");
    };
  };

  // removeSkill func
  const removeSkill = (indexToRemove) => {
    onChange(data.filter((_, index) => index !== indexToRemove));
  };

  // handleKeyPress func *** Enter btn
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    };
  };

  return (
    <div className="space-y-5">
      <div className="">
        <h3 className="text-lg font-semibold text-gray-700">Skills</h3>
        <p className="text-sm text-gray-600">
          Add your technical and soft skills.
        </p>
      </div>

      {/* skill input& btn */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter a skill (e.g., Javascript, Project Management"
          className="flex-1 px-3 py-2 text-sm"
          onChange={(e) => setNewSkill(e.target.value)}
          value={newSkill}
          onKeyDown={handleKeyPress}
        />

        <button
          onClick={addSkill}
          disabled={!newSkill.trim}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus /> Add
        </button>
      </div>

      {/* skills */}
      {data.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {data.map((skill, i) => (
            <span key={i} className="flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
              {skill}

              <button
                onClick={() => removeSkill(i)}
                className="ml-1 hover:bg-indigo-200 rounded-full p-0.5 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500">
          <Sparkles className="w-10 h-10 mx-auto mb-2 text-gray-300" />
          <p>No skills added yet.</p>
          <p className="text-sm">Add your technical and soft skills above.</p>
        </div>
      )}

      <div className="bg-indigo-50 p-3 rounded-lg">
        <p className="text-sm text-indigo-600">
          <strong>Tip:</strong> Add 8-12 relevant skills. Include both technical skills (programming langauges, tools) and soft skills (leadership, communication).
        </p>
      </div>
    </div>
  );
}

export default SkillsForm;
