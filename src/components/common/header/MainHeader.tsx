import { Avatar, Navbar } from "flowbite-react";
import React from "react";
import search from "images/search.svg";
import { Outlet } from "react-router-dom";
type Props = {};

export default function MainHeader() {
  return (
    <>
      <Navbar fluid rounded>
        <div className="flex items-center">
          <Navbar.Brand href="https://flowbite-react.com">
            {/* <img
              src={logo}
              className="mx-3 h-6 sm:h-9"
              alt="Flowbite React Logo"
            /> */}
            <div className="text-[2rem] font-CWDangamAsac-Bold text-dark-blue-1 mr-3">
              빌려방
            </div>
          </Navbar.Brand>
          <div className="text-[1.5rem] text-grey-1 dark:text-white">
            서울시 성동구
          </div>
        </div>
        <div className="flex md:order-2">
          <img
            src={search}
            className="mr-3 h-6 sm:h-9 mt-2"
            alt="Flowbite React Logo"
          />
          <Avatar
            alt="User settings"
            img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            rounded
          />
        </div>
      </Navbar>
      <Outlet />
    </>
  );
}
