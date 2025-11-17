import { Download, Eye, LayoutTemplate, ShieldCheck, Sparkles, Upload, Zap } from "lucide-react";
import Title from "./Title";
import React from "react";

function Features() {
  return (
    <div id="features" className="space-y-9 relative overflow-hidden">
      {/* badge */}
      <div className="flex items-center gap-2 text-indigo-800 bg-blue-400/10 border border-indigo-200 rounded-full px-4 py-1 w-max mx-auto">
        <Zap color="#1E4BAF" size={18} />
        <span>Simple Process</span>
      </div>

      <Title
        title="Build your resume"
        description="Our streamlined process helps you create a professional resume in minutes with intelligent AI-powered tools and features."
      />

      {/* features display */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-10 pb-18 relative">
        {/* background glow */}
        <div className="size-[520px] top-0 left-1/2 -translate-x-1/2 rounded-full absolute blur-[300px] -z-10 bg-[#FBFFE1]/70" />

        {/* feature cards */}
        <div className="flex flex-col items-center justify-center w-full">
          <div className="p-4 aspect-square bg-violet-100 rounded-full">
            <Eye color="#7F22FE" size={25} />
          </div>
          <div className="mt-5 space-y-2 text-center">
            <h3 className="text-base font-semibold text-slate-700">
              Real-Time Resume Preview
            </h3>
            <p className="text-sm text-slate-600">
              See your resume update instantly as you fill out each section — no need to reload or switch screens.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-full">
          <div className="p-4 aspect-square bg-green-100 rounded-full">
            <ShieldCheck color="#00A63E" size={25} />
          </div>
          <div className="mt-5 space-y-2 text-center">
            <h3 className="text-base font-semibold text-slate-700">
              Secure Account Login
            </h3>
            <p className="text-sm text-slate-600">
              Your data is protected with modern authentication, encrypted storage, and privacy-first security practices.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-full">
          <div className="p-4 aspect-square bg-orange-100 rounded-full">
            <Sparkles color="#F54900" size={25} />
          </div>
          <div className="mt-5 space-y-2 text-center">
            <h3 className="text-base font-semibold text-slate-700">
              Smart AI Assistance
            </h3>
            <p className="text-sm text-slate-600">
              Enhance your descriptions, fix grammar, or generate stronger bullet points using built-in AI writing tools.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-full">
          <div className="p-4 aspect-square bg-blue-100 rounded-full">
            <LayoutTemplate color="#1E40AF" size={25} />
          </div>
          <div className="mt-5 space-y-2 text-center">
            <h3 className="text-base font-semibold text-slate-700">
              Customizable Templates
            </h3>
            <p className="text-sm text-slate-600">
              Switch between clean, professional, and creative resume templates with just one click.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-full">
          <div className="p-4 aspect-square bg-teal-100 rounded-full">
            <Download color="#0F766E" size={25} />
          </div>
          <div className="mt-5 space-y-2 text-center">
            <h3 className="text-base font-semibold text-slate-700">
              Easy Export Options
            </h3>
            <p className="text-sm text-slate-600">
              Download your résumé in print-ready PDF formats anytime — free and unlimited.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-full">
          <div className="p-4 aspect-square bg-pink-100 rounded-full">
            <Upload color="#DB2777" size={25} />
          </div>
          <div className="mt-5 space-y-2 text-center">
            <h3 className="text-base font-semibold text-slate-700">
              Upload Existing Resume
            </h3>
            <p className="text-sm text-slate-600">
              Upload your current résumé to quickly recreate and improve it using smart extraction tools.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
