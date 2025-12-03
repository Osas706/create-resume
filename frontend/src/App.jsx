import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import CreateResume from "./pages/CreateResume";
import Preview from "./pages/Preview";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import { useDispatch } from "react-redux";
import api from "./config/api";
import { login, setLoading } from "./store/features/authSlice";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader } from "lucide-react";

function App() {
  const [loading ,setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // getUserData
  const getUserData = async () => {
    setLoading(true);
    toast.info("Checking your account...!")
    const token = localStorage.getItem("token");

    try {
      if (token) {
        const { data } = await api.get("/user/data", {
          headers: { Authorization: token },
        });
        if (data.user) {
          dispatch(login({ token, user: data.user }));
        };
        // navigate('/app')
        toast.success("Welcome back!")
        setLoading(false);
      }
    } catch (error) {
      console.log(error, "Error in getUserData func");
      toast.error("Failed to load your account")
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData()
  }, [])
  
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view/:resumeId" element={<Preview />} />

        <Route path="/app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route
            path="/app/create-resume/:resumeId"
            element={<CreateResume />}
          />
        </Route>

        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
