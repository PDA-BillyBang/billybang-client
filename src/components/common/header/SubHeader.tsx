"use client";
import React from "react";
import { Navbar } from "flowbite-react";
import backButton from "../../../assets/image/icons/backButton.svg";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function SubHeader() {
  const [title, setTitle] = useState("");

  return (
    <div>
      <Navbar fluid rounded className="absolute top-0 w-full">
        <div className="flex items-center justify-between w-full">
          <Navbar.Brand href="https://flowbite-react.com">
            <img src={backButton} className="h-5 sm:h-9" alt="Billibang Logo" />
          </Navbar.Brand>
          <div className="flex-1 text-center">
            <span className="text-xl font-semibold">{title}</span>
          </div>
          <div className="h-5 sm:h-9 w-5"></div>
        </div>
      </Navbar>
      <Outlet context={{ setTitle }} />
    </div>
  );
}
