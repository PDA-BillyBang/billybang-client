import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import setting from '../../../assets/image/icons/setting.svg';
import { useNavigate } from 'react-router-dom';

type Props = {};

export default function MyHeader({}: Props) {
  const [title, setTitle] = useState('');
  console.log('title:', title);
  const navigate = useNavigate();
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
          className="w-[24px] h-[24px] mx-3 cursor-pointer"
        />
      </div>
      <div className="my-[50px]" />
      <Outlet context={{ setTitle }} />
    </div>
  );
}
