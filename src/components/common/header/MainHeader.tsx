// src/components/common/MainHeader.tsx
import { useState } from 'react';
import { Avatar } from 'flowbite-react';
import search from 'images/search.svg';
import avatar from 'images/avatar.svg';
import { Outlet, useNavigate } from 'react-router-dom';
import { isvalidateToken } from '@/lib/apis/user';

export default function MainHeader() {
  const navigate = useNavigate();
  const [address, setAddress] = useState<string>('');
  console.log(address);
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
  const handleClickToMain = () => {
    navigate('/');
  };

  return (
    <div>
      <div className="absolute top-0 z-50 flex flex-row justify-center w-full h-16">
        <div
          onClick={handleClickToMain}
          className="text-[2rem] mx-3 flex cursor-pointer items-center h-16 leading-[2rem] text-center font-CWDangamAsac-Bold text-dark-blue-1 "
        >
          빌려방
        </div>
        <div className="flex items-center flex-grow ">
          <div className="text-[1.2rem] text-grey-1 flex flex-col flex-grow font-NanumSquareRound">
            {address}
          </div>
        </div>
        <div className="flex items-center md:order-2">
          <img
            src={search}
            className="h-[1.9rem] w-[1.9rem] mr-3 cursor-pointer sm:h-9"
            alt="search"
            onClick={handleClickSearchField}
          />
          <Avatar
            onClick={handleClickToMy}
            className="mr-3 cursor-pointer w-[2.1rem] h-[2.1rem]"
            alt="User settings"
            img={avatar}
          />
        </div>
      </div>
      <Outlet context={{ setAddress }} />
    </div>
  );
}
