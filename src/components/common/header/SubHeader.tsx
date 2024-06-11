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
    <div className="flex flex-col ">
      <div className="fixed top-0 pt-[0.5rem] w-full bg-white-1 z-10">
        <Navbar className="flex flex-row justify-between w-full bg-white-1">
          <div>
            <img
              src={backButton}
              className="h-5 sm:h-9 size-4"
              alt="Billibang Logo"
              onClick={handleClickBack}
            />
          </div>
          <div>
            <span className="text-[1.2rem] font-semibold">{title}</span>
          </div>
          <div className="h-5 sm:h-9 size-4"></div>
        </Navbar>
      </div>
      <div className="pt-[2.5rem]" />
      <Outlet context={{ setTitle }} />
    </div>
  );
}
