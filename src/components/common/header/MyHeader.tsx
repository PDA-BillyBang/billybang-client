import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import setting from '../../../assets/image/icons/setting.svg';
import { useNavigate } from 'react-router-dom';

export default function MyHeader() {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();
  console.log(title);
  return (
    <div className="w-[100%] flex flex-col items-center">
      <div className="flex h-16 fixed top-0 flex-row justify-between bg-white-1 w-[100%] items-center">
        <div
          onClick={() => navigate('/')}
          className="text-[2rem] font-CWDangamAsac-Bold text-dark-blue-1 mx-3 cursor-pointer"
        >
          빌려방
        </div>
        <img
          onClick={() => navigate('/my/edit')}
          src={setting}
          alt="setting"
          className="w-[30px] h-[30px] mx-3 cursor-pointer"
        />
      </div>
      <div className="my-[50px]" />
      <Outlet context={{ setTitle }} />
    </div>
  );
}
