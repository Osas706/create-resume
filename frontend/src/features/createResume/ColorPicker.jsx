import { Check, Layout, Palette } from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function ColorPicker({ selectedColor, onChange }) {
  const colors = [
    { name: "Blue", value: "#3b82f6" },
    { name: "Indigo", value: "#6366f1" },
    { name: "Purple", value: "#8b5cf6" },
    { name: "Green", value: "#10b981" },
    { name: "Red", value: "#ef4444" },
    { name: "Orange", value: "#f97316" },
    { name: "Teal", value: "#14b8a6" },
    { name: "Pink", value: "#ec4899" },
    { name: "Gray", value: "#6b7280" },
    { name: "Black", value: "#1f2937" },
  ];
  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-1 text-sm text-purple-600 bg-purple-100 ring-purple-300 hover:ring transition-all px-3 py-2 rounded-lg">
            <Palette size={16} /> <span className="max-sm:hidden">Accent</span>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-60 grid grid-cols-4 gap-2 absolute top-full left-0 right-0 p-3 mt-2 bg-white rounded-md border border-gray-200 shadow-sm"
          align="start"
        >
          {colors.map((color, i) => (
            <div
              key={i}
              onClick={() => onChange(color.value)}
              className={`relative cursor-pointer group flex flex-col `}
            >
              <div
                className="w-12 h-12 rounded-md border-2 border-transparent group-hover:border-black/25 transition-colors"
                style={{ backgroundColor: color.value }}
              ></div>

              {selectedColor === color.value && (
                <div className="absolute top-0 left-0 right-0 bottom-4.5 flex items-center justify-center">
                  <Check className="size-5 text-white" />
                </div>
              )}

              <p className="text-xs text-center mt-1 text-gray-600">
                {color.name}
              </p>
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default ColorPicker;
