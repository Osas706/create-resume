import { Routes, Route, Navigate } from "react-router-dom";
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
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  // getUserData
  const getUserData = async () => {
    const token = localStorage.getItem("token");

    try {
      if (token) {
        const { data } = await api.get("/user/data", {
          headers: { Authorization: token },
        });
        if (data.user) {
          dispatch(login({ token, user: data.user }));
        }

        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log(error, "Error in getUserData func");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getUserData()
  }, [])
  
  return (
    <>
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
    </>
  );
}

export default App;
