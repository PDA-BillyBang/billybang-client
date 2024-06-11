"use client";
import React from "react";
import { Navbar } from "flowbite-react";
import backButton from "../../../assets/image/icons/backButton.svg";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SubHeader() {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const handleClickBack = () => {
    navigate(-1);
  };

  return (
    <div className="bg-white-1">
      <Navbar fluid rounded>
        <div className="fixed top-[0.4rem] bg-white-1 flex items-center justify-between w-full">
          <Navbar.Brand>
            <img
              src={backButton}
              className="h-5 sm:h-9 size-7 "
              alt="Billibang Logo"
              onClick={handleClickBack}
            />
          </Navbar.Brand>
          <span className="self-center mx-auto text-xl font-semibold">
            {title}
          </span>
          <Navbar.Brand href="https://flowbite-react.com">
            <div className="h-5 sm:h-9 size-7 "></div>
          </Navbar.Brand>
        </div>
      </Navbar>
      <Outlet context={{ setTitle }} />
    </div>
  );
}
