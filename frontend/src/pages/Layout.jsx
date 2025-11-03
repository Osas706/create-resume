import React from "react";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="">
      Layout

      <div className="">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
