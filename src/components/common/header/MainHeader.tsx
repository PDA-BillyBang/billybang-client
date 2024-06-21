// src/components/common/MainHeader.tsx
import { Avatar, Navbar } from 'flowbite-react';
import React from 'react';
import search from 'images/search.svg';
import { Outlet, useNavigate } from 'react-router-dom';
import { isvalidateToken } from '@/lib/apis/user';

export default function MainHeader() {
  const navigate = useNavigate();

  const handleClickSearchField = () => navigate('/search');
  const handleClickToMy = async () => {
    try {
      const resp = await isvalidateToken();
      if (resp.data.response.isValid === true) navigate('/my');
      else navigate('/user/login');
    } catch (error) {
      navigate('/user/login');
    }
  };

  return (
    <div>
      <div className="absolute top-0 z-50 flex flex-row justify-center w-full h-16">
        <div className="text-[2rem] mx-3 flex items-center h-16 leading-[2rem] text-center font-CWDangamAsac-Bold text-dark-blue-1 ">
          빌려방
        </div>
        <div className="flex items-center flex-grow ">
          <div className="text-[1.2rem] text-grey-1 flex flex-col flex-grow">
            서울시 성동구
          </div>
        </div>
        <div className="flex md:order-2 items-center">
          <img
            src={search}
            className="h-6 mr-3 cursor-pointer sm:h-9"
            alt="Flowbite React Logo"
            onClick={handleClickSearchField}
          />
          <Avatar
            onClick={handleClickToMy}
            className="mr-3 cursor-pointer "
            alt="User settings"
            img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            rounded
          />
        </div>
      </div>
      <Outlet />
    </div>
  );
}
