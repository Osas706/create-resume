import { FolderOpenDot, Plus, Trash } from "lucide-react";
import React from "react";

function ProjectsForm({ data, onChange }) {
  // addProject func
  const addProject = () => {
    const newProject = {
      name: "",
      type: "",
      description: "",
    };

    onChange([...data, newProject]);
  };

  // removeProject func
  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  // updateProject func
  const updateProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="">
          <h3 className="text-lg font-semibold text-gray-700">Projects</h3>
          <p className="text-sm text-gray-600">Add your projects</p>
        </div>

        <button
          onClick={addProject}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors"
        >
          <Plus className="size-4" />
          Add Project
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-5 text-gray-500">
          <FolderOpenDot className="w-12 h-12 mx-auto mb-3" />
          <p>No project added yet.</p>
          <p className="text-sm">Click "Add Project" to get started</p>
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((project, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-3"
            >
              <div className="flex justify-between items-start">
                <h4>Project #{index + 1}</h4>

                <button
                  onClick={() => removeProject(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash className="size-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-2">
                {/* ****** project name ****** */}
                <input
                  type="text"
                  value={project.name || ""}
                  onChange={(e) =>
                    updateProject(index, "name", e.target.value)
                  }
                  placeholder="Project Name"
                  className="px-3 py-2 text-sm rounded-lg"
                />

                {/* ****** type ****** */}
                <input
                  type="text"
                  value={project.type || ""}
                  onChange={(e) => updateProject(index, "type", e.target.value)}
                  placeholder="Project Type"
                  className="px-3 py-2 text-sm rounded-lg"
                />
              </div>

              {/* ****** description  ****** */}
              <textarea
                name="description"
                id=""
                rows={4}
                value={project.description || ""}
                className="w-full py-3 px-4 border text-sm border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors resize-none"
                placeholder="Describe your project..."
                onChange={(e) =>
                  updateProject(index, "description", e.target.value)
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectsForm;
