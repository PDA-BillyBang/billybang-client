// src/components/common/MainHeader.tsx
import { Avatar, Navbar } from "flowbite-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import search from "images/search.svg";
import { Outlet } from "react-router-dom";

export default function MainHeader() {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar className="absolute top-0 justify-between w-full z-50">
        <div className="flex items-center">
          <Navbar.Brand href="https://flowbite-react.com">
            <div className="text-[2rem] font-CWDangamAsac-Bold text-dark-blue-1 mx-2">
              빌려방
            </div>
          </Navbar.Brand>
          <div className="text-[1.2rem] text-grey-1 dark:text-white">

            서울시 성동구
          </div>
        </div>
        <div className="flex md:order-2">
          <img
            src={search}
            className="mr-3 h-6 sm:h-9 mt-2 cursor-pointer"
            alt="Flowbite React Logo"
            onClick={()=>navigate('/search')}
          />
          <Avatar
            alt="User settings"
            img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            rounded
          />
        </div>
      </Navbar>
      <Outlet />
    </div>
  );
}
