import { ChartNoAxesCombined, Download, ShieldMinus, Zap } from "lucide-react";
import Title from './Title';
import React from "react";

function Features() {
  return (
    <div id="features" className="space-y-9">
      {/* badge */}
      <div className="flex items-center gap-2 text-indigo-800 bg-blue-400/10 border border-indigo-200 rounded-full px-4 py-1 w-max mx-auto">
        <Zap color="#1E4BAF" size={18} />
        <span>Simple Process</span>
      </div>

      <Title 
        title={'Build your resume'} 
        description={'Our streamlined process helps you create a professional resume in minutes with intelligent AI-powered tools and features.'} 
      />

      {/* features display */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-10 pb-18">
        <div className="size-[520px] top-0 left-1/2 -translate-x-1/2 rounded-full absolute blur-[300px] -z-10 bg-[#FBFFE1]/70" />

        <div className="flex flex-col items-center justify-center w-full">
          <div className="p-4 aspect-square bg-violet-100 rounded-full">
            <ChartNoAxesCombined color="#7F22FE" size={25} />
          </div>
          <div className="mt-5 space-y-2 text-center">
            <h3 className="text-base font-semibold text-slate-700">
              Real-Time Analytics
            </h3>
            <p className="text-sm text-slate-600">
              Get instant insights into your finances with live dashboards.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-f">
          <div className="p-4 aspect-square bg-green-100 rounded-full">
            <ShieldMinus color="#00A63E" size={25} />
          </div>
          <div className="mt-5 space-y-2 text-center">
            <h3 className="text-base font-semibold text-slate-700">
              Bank-Grade Security
            </h3>
            <p className="text-sm text-slate-600">
              End-to-end encryption, 2FA, compliance with GDPR standards.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-f">
          <div className="p-4 aspect-square bg-orange-100 rounded-full">
            <Download color="#F54900" size={25} />
          </div>
          <div className="mt-5 space-y-2 text-center">
            <h3 className="text-base font-semibold text-slate-700">
              Customizable Reports
            </h3>
            <p className="text-sm text-slate-600">
              Export professional, audit-ready financial reports for tax or
              internal review.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
