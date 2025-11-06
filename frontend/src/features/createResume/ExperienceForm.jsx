import { Briefcase, Plus, Sparkles, Trash } from "lucide-react";
import React from "react";

function ExperienceForm({ data, onChange }) {
  // addExperience func
  const addExperience = () => {
    const newExperince = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false,
    };

    onChange([...data, newExperince]);
  };

  // removeExperince func
  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  // updateExperince func
  const updateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="">
          <h3 className="text-lg font-semibold text-gray-500">
            Professional Experinece
          </h3>
          <p className="text-sm text-gray-600">Add your job experience</p>
        </div>

        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors"
        >
          <Plus className="size-4" />
          Add Experinece
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-5 text-gray-500">
          <Briefcase className="w-12 h-12 mx-auto mb-3" />
          <p>No work experince added yet.</p>
          <p className="text-sm">Click "Add Experince" to get started</p>
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((experience, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-3"
            >
              <div className="flex justify-between items-start">
                <h4>Experience #{index + 1}</h4>

                <button
                  onClick={() => removeExperience(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash className="size-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-2">
                {/* ****** company name ****** */}
                <input
                  type="text"
                  value={experience.company || ""}
                  onChange={(e) =>
                    updateExperience(index, "company", e.target.value)
                  }
                  placeholder="Company Name"
                  className="px-3 py-2 text-sm rounded-lg"
                />

                {/* ****** company position ****** */}
                <input
                  type="text"
                  value={experience.position || ""}
                  onChange={(e) =>
                    updateExperience(index, "position", e.target.value)
                  }
                  placeholder="Job Title"
                  className="px-3 py-2 text-sm rounded-lg"
                />

                {/* ****** start_date  ****** */}
                <input
                  type="month"
                  value={experience.start_date || ""}
                  onChange={(e) =>
                    updateExperience(index, "start_date", e.target.value)
                  }
                  // placeholder=""
                  className="px-3 py-2 text-sm rounded-lg"
                />

                {/* ****** end_date  ****** */}
                <input
                  type="month"
                  value={experience.end_date || ""}
                  onChange={(e) =>
                    updateExperience(index, "end_date", e.target.value)
                  }
                  // placeholder=""
                  disabled={experience.is_current}
                  className="px-3 py-2 text-sm rounded-lg disabled:bg-gray-100"
                />
              </div>

              {/* ****** is_current  ****** */}
              <label htmlFor="is_current" className="flex items-center gap-2">
                <input
                  name="is_current"
                  id="is_current"
                  type="checkbox"
                  checked={experience.is_current || false}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  onChange={(e) => {
                    updateExperience(
                      index,
                      "is_current",
                      e.target.checked ? true : false
                    );
                  }}
                />
                <span className="text-sm text-gray-700">Currently working here</span>
              </label>

              {/* Job Description & AI  */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="text-sm font-medium text-gray-700 ">Job Description</label>
                  <button className="flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 rounded  hover:bg-purple-200 text-purple-700 transition-colors disabled:opacity-50  ">
                    <Sparkles className="w-3 h-3" />
                    Enhance with AI
                  </button>
                </div>

                {/* ****** description  ****** */}
                <textarea
                  name="description"
                  id=""
                  rows={4}
                  value={experience.description || ""}
                  className="w-full py-3 px-4 border text-sm border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors resize-none"
                  placeholder="Describe your key responsibilities and achievements..."
                  onChange={(e) => updateExperience(index, 'description', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExperienceForm;
