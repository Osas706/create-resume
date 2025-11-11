import React, { useState } from "react";
import { Mail, Lock, FileText } from "lucide-react";
import { Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(prev => ({...prev, [name]: value}))
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    
  };


  
  return (
    <div className="flex h-screen w-full flex-col md:flex-row">
      <div className="hidden md:block md:w-1/2 bg-indigo-600">
        <img
          className="h-full w-full object-cover"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/leftSideImage.png"
          alt="login-illustration"
        />
      </div>

      <div className="flex w-full h-full md:w-1/2 items-center justify-center p-6 sm:p-10">
        <form onSubmit={handleSubmit} className="w-full max-w-sm  flex flex-col items-center justify-center">
          <h1 className="text-4xl mb-5 font-bold flex items-center ">
            <span className="flex items-center text-indigo-600">
              <FileText size={30} className="" />
              Create{" "}
            </span>
            Resume
          </h1>
          <h2 className="text-3xl text-gray-900 font-medium">Login</h2>
          <p className="text-sm text-gray-500/90 mt-3">
            Welcome back! Please login to continue
          </p>

          {/* <button
            type="button"
            className="w-full mt-8 bg-gray-500/10 flex items-center justify-center h-12 rounded-full"
          >
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
              alt="googleLogo"
            />
          </button> */}

          {/* <div className="flex items-center gap-4 w-full my-5">
            <div className="w-full h-px bg-gray-300/90"></div>
            <p className="w-full text-nowrap text-sm text-gray-500/90">
              or sign in with email
            </p>
            <div className="w-full h-px bg-gray-300/90"></div>
          </div> */}

          <div className="mt-10 flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <Mail size={20} absoluteStrokeWidth />
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full border-none"
              required
            />
          </div>

          <div className="flex items-center mt-4 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <Lock />
            <input
              name="password"
              type="password"
              placeholder="Enter your Password"
              value={formData.password}
              onChange={handleChange}
              className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full border-none"
              required
            />
          </div>

          <div className="w-full flex items-center justify-between mt-8 text-gray-500/80">
            <a className="text-sm underline ml-auto" href="#">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
          >
            Login
          </button>

          <p className="text-gray-500/90 text-sm mt-4">
            Don't have an account?{" "}
            <Link
              className="text-indigo-400 hover:underline"
              to="/auth/register"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
