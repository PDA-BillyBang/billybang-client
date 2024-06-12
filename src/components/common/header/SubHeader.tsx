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
    <div className="bg-white-1 ">
      <Navbar className="fixed top-0 w-full">
        <div className="pt-[0.5rem] bg-white-1 flex items-center justify-between w-full">
          <Navbar.Brand>
            <img
              src={backButton}
              className="h-5 sm:h-9 size-7 "
              alt="Billibang Logo"
              onClick={handleClickBack}
            />
          </Navbar.Brand>

          <div className="flex-1 text-center">
            <span className="text-xl font-semibold">{title}</span>
          </div>
          <div className="w-5 h-5 sm:h-9"></div>
        </div>
      </Navbar>
      <Outlet context={{ setTitle }} />
    </div>
  );
}
