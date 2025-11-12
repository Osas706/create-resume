import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DoorOpen, FileText, Menu, X } from "lucide-react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-40 text-sm">
        <a href="/" className="text-lg font-bold flex items-center ">
          <span className="flex items-center text-indigo-600">
            <FileText size={20} className="" />
            Create{" "}
          </span>
          Resume
        </a>

        <div className="hidden md:flex items-center gap-8 transition duration-500 text-slate-800">
          <a href="#" className="hover:text-indigo-600 transition">
            Home
          </a>
          <a href="#features" className="hover:text-indigo-600 transition">
            Features
          </a>
          <a href="#testimonials" className="hover:text-indigo-600 transition">
            Testimonials
          </a>
          <a href="#contact" className="hover:text-indigo-600 transition">
            Contact
          </a>
        </div>

        <div className="flex gap-2">
          <Link
            to="/app?state=register"
            className="hidden md:block px-6 py-2 bg-indigo-500 hover:bg-indigo-700 active:scale-95 transition-all rounded-full text-white"
          >
            Get started
          </Link>

          <Link
            to="/auth/login"
            className="hidden md:block px-6 py-2 border active:scale-95 hover:bg-slate-50 transition-all rounded-full text-slate-700 hover:text-slate-900"
          >
            Login
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden active:scale-90 transition"
        >
          <Menu />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-100 bg-black/40 text-black backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <a href="#" className="text-white">
          Home
        </a>
        <a href="#features" className="text-white">
          Features
        </a>
        <a href="#testimonials" className="text-white">
          Testimonials
        </a>
        <a href="#contact" className="text-white">
          Contact
        </a>
        <Link to="/auth/login" className="text-white flex gap-2 items-center">
          Register / Login <DoorOpen />
        </Link>
        <button
          onClick={() => setMenuOpen(false)}
          className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-indigo-600 hover:bg-indigo-700 transition text-white rounded-md flex"
        >
          <X />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
