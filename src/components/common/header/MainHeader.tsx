// src/components/common/MainHeader.tsx
import { Avatar, Navbar } from 'flowbite-react';
import React from 'react';
import search from 'images/search.svg';
import { Outlet, useNavigate } from 'react-router-dom';

export default function MainHeader() {
  const navigate = useNavigate();

  const handleClickSearchField = () => navigate('/search');

  return (
    <div>
      <Navbar className="absolute top-0 w-full z-50 h-16">
        <Navbar.Brand
          href="https://flowbite-react.com"
          className="text-[2rem] font-CWDangamAsac-Bold text-dark-blue-1 mx-2"
        >
          빌려방
        </Navbar.Brand>
        <div
          className="flex items-center flex-grow bg-[yellow]"
          onClick={handleClickSearchField}
        >
          <div className="text-[1.2rem] text-grey-1 bg-[red] flex flex-col flex-grow">
            서울시 성동구
          </div>
          <img
            src={search}
            className="mr-3 h-6 sm:h-9 "
            alt="Flowbite React Logo"
          />
        </div>
        <div className="flex md:order-2">
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
