import React from "react";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import MinimalImageTemplate from "./templates/MinimalImageTemplate";
import ClassicTemplate from "./templates/ClassicTemplate";

function ResumePreview({ data, template, accentColor, classes = "" }) {
  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />;

      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} />;

      case "minimal-image":
        return <MinimalImageTemplate data={data} accentColor={accentColor} />;

      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />;
    }
  };

return (
  <div id="resume" className="w-full bg-gray-100">
    <div
      id="resume-preview"
      className={`border border-gray-200 print:shadow-none print:border-none ${classes}`}
    >
      {renderTemplate()}
    </div>

    <style>
      {`
        @page {
          size: A4;
          margin: 10mm 12mm;
        }

        @media print {
          html, body {
            width: auto;
            height: auto;
            overflow: visible;
          }

          /* Hide everything by default */
          body * {
            visibility: hidden;
          }

          /* Show only the resume preview */
          #resume-preview,
          #resume-preview * {
            visibility: visible;
          }

          #resume-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: auto;
            margin: 0;
            padding: 0;
            box-shadow: none !important;
            border: none !important;
          }
        }
      `}
    </style>
  </div>
);

}

export default ResumePreview;
