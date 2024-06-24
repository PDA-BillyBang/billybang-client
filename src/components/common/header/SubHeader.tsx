'use client';
import backButton from '../../../assets/image/icons/backButton.svg';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SubHeader() {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();
  const handleClickBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col ">
      <div className="fixed top-0 z-10 flex flex-row justify-center w-full h-16 bg-white-1">
        <div className="flex flex-row items-center justify-between w-full px-3 bg-white-1">
          <div>
            <img
              src={backButton}
              className="w-4 h-5 cursor-pointer sm:h-9 size-4"
              alt="backButton"
              onClick={handleClickBack}
            />
          </div>
          <div>
            <span className="text-[1.2rem] font-semibold">{title}</span>
          </div>
          <div className="w-4 h-5 cursor-pointer sm:h-9 size-4"></div>
        </div>
      </div>
      <Outlet context={{ setTitle }} />
    </div>
  );
}
