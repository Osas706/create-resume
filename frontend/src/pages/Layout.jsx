import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../features/dashboard/Navbar";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

function Layout() {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin w-8 h-8 text-gray-500" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;