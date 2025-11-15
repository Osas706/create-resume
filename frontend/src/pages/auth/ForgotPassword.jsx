import React, { useState } from "react";
import { FileText, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "@/config/api";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/store/features/authSlice";

function ForgotPassword() {
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  // handleSubmit
  const handleSubmit = async(e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    try {
      const { data } = await api.post("/auth/forgot-password", { email });
      console.log(data);
      
      navigate(`/auth/reset-password?email=${encodeURIComponent(email)}`)
      toast.success("Email sent successfully")
    } catch (error) {
      console.log(error);
    }finally{
      dispatch(setLoading(false));
      setEmail('')
    }
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
          <h2 className="text-3xl text-gray-900 font-medium">Forgot Password</h2>
          <p className="text-sm text-gray-500/90 mt-3 text-center">
            Enter your email address and we'll send you a code to reset your password.
          </p>

          <div className="mt-10 flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <Mail size={20} absoluteStrokeWidth />
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full border-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Loading..." : "Send Reset Password Code"} 
          </button>

          <p className="text-gray-500/90 text-sm mt-4">
            Back to {" "}
            <Link
              className="text-indigo-400 hover:underline"
              to="/auth/login"
            >
              Login ?
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
