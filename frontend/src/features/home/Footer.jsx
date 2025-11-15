import {
  Facebook,
  FileText,
  Github,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import React from "react";

function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center w-full py-10 bg-slate-900 text-white/70">
      <h1 className="text-2xl font-bold flex items-center ">
        <span className="flex items-center text-indigo-600">
          <FileText size={20} className="" />
          Create{" "}
        </span>
        Resume
      </h1>

      <p className="mt-4 text-center">
        Copyright © 2025 <a href="https://prebuiltui.com">PrebuiltUI</a>. All
        rights reservered.
      </p>

      <div className="flex items-center gap-4 mt-5">
        <a
          href="https://www.facebook.com"
          target="_blank"
          className="hover:-translate-y-0.5 transition-all duration-300"
        >
          <Facebook />
        </a>

        <a
          href="https://www.instagram.com/iiam.winner?igsh=MTh3ODFwcjBlZWFnZQ%3D%3D&utm_source=qr"
          target="_blank"
          className="hover:-translate-y-0.5 transition-all duration-300"
        >
          <Instagram />
        </a>

        <a
          href="https://www.linkedin.com/in/winner-omoregie-035178299"
          target="_blank"
          className="hover:-translate-y-0.5 transition-all duration-300"
        >
          <Linkedin />
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          className="hover:-translate-y-0.5 transition-all duration-300"
        >
          <Twitter />
        </a>
        <a
          href="https://github.com/Osas706"
          target="_blank"
          className="hover:-translate-y-0.5 transition-all duration-300"
        >
          <Github />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
