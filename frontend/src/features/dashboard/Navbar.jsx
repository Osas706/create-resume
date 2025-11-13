import { FileText, LogOut } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/features/authSlice";
import { toast } from "sonner";
import api from "@/config/api";

function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const disptach = useDispatch();
  const navigate = useNavigate();

  // logOut func
  const logOut = async () => {
    const {data} = await api.post("/auth/logout");
    disptach(logout())
    console.log(data);
    toast.success("Bye for now ...")

    navigate("/");
  };

  return (
    <div className="shadow bg-white">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5">
        <Link
          to={"/"}
          className="text-xl md:text-2xl font-semibold flex items-center "
        >
          <span className="flex items-center text-indigo-600">
            <FileText className="w-6 h-6 md:w-8 md:h-8" />
            Create{" "}
          </span>
          Resume
        </Link>

        <div className="flex items-center gap-4 text-sm">
          <p className="max-sm:hidden">Hi, {user?.name}</p>

          <button
            onClick={() => logOut()}
            className="flex items-center gap-2 bg-white hover:bg-slate-50 border border-gray-300 px-5 py-1.5 rounded-lg font-medium active:scale-95 transition-all hover:shadow-sm"
          >
            Logout <LogOut size={15} />
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
