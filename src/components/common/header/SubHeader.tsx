"use client";

import { Navbar } from "flowbite-react";
import backButton from "../../../assets/image/icons/backButton.svg";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function SubHeader() {
  const [title, setTitle] = useState("");

  
  return (
    <div>
      <Navbar fluid rounded>
        <div className="flex items-center justify-between w-full">
          <Navbar.Brand href="https://flowbite-react.com">
            <img
              src={backButton}
              className="h-5 sm:h-9 size-7 "
              alt="Billibang Logo"
            />
          </Navbar.Brand>
          <span className="self-center mx-auto text-xl font-semibold">
            {title}
          </span>
        </div>
      </Navbar>
      <Outlet context={{ setTitle }}/>
    </div>
  );
}
