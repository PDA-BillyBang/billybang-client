import React from "react";
import { Outlet } from "react-router-dom";

export default function Navbar2() {
  return (
    <div>
      <p>Navbar2</p>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
