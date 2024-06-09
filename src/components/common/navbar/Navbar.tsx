import React from "react";
import { Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <p>Navbar1</p>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Navbar;
