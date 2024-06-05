import React from "react";
import { Outlet } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
        {/*Header를 여기에 배치*/}
          <Outlet />
        {/*Footer를 여기에 배치*/}
    </div>
  );
}
