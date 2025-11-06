import { Check, Layout } from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function TemplateSelector({ selectedTemplate, onChange }) {
  const templates = [
    {
      id: "classic",
      name: "Classic",
      preview:
        "A clean , traditional resume format with clear sections and professional typography",
    },
    {
      id: "modern",
      name: "Modern",
      preview:
        "Sleek design with strategic use of color and modern font choices",
    },
    {
      id: "mimimal-image",
      name: "Minimal Image",
      preview: "Minimal design with a design image and clean typography",
    },
    {
      id: "mimimal",
      name: "Minimal",
      preview: "Ultra-clean design that puts your conetnt front ad center.",
    },
  ];

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-1 text-sm text-indigo-600 bg-indigo-100 ring-indigo-300 hover:ring transition-all px-3 py-2 rounded-lg">
            <Layout size={14} /> <span className="max-sm:hidden">Template</span>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56 flex flex-col gap-1" align="start">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => onChange(template.id)}
              className={`p-2 relative border rounded-md cursor-pointer transition-all ${
                selectedTemplate === template.id
                  ? " border-indigo-300 bg-indigo-300"
                  : "border-gray-300 hover:border-gray-400 hover:bg-gray-100"
              } `}
            >
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2">
                  <div className="size-5 bg-indigo-400 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <h4
                  className={`font-medium ${
                    selectedTemplate === template.id
                      ? "text-white"
                      : "text-gray-800"
                  }`}
                >
                  {template.name}
                </h4>
                <div className="mt-2 p-2 bg-indigo-50 rounded text-xs text-gray-500 italic">
                  {template.preview}
                </div>
              </div>
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default TemplateSelector;
