import React, { useEffect } from 'react';
import profileTest from '../../assets/image/test/profile-test.svg';
import FavoriteRooms from '../../components/mypage/FavoriteRooms';
import PlusButton from '../../components/common/button/PlusButton';
import FavoriteLoans from '../../components/mypage/FavoriteLoans';
import home from '../../assets/image/icons/home.svg';
import loan from '../../assets/image/icons/loan.svg';
import { useNavigate } from 'react-router-dom';
import { test } from '@/lib/apis/my';

export default function Mypage() {
  const navigate = useNavigate();
  const handleToMyLoan = () => navigate('/my/loan');
  const handleToMyProperties = () => navigate('/my/properties');
  const handleSignUp = async () => {
    try {
      const response = await test();
      console.log('회원가입 성공:', response.data);
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  };
  useEffect(() => {
    handleSignUp();
  }, []);
  return (
    <div className="w-customWidthPercent">
      <div className="flex flex-row items-center">
        <div className="w-[20%]">
          <img
            src={profileTest}
            alt="profile-test"
            className="h-[58px] w-[58px]"
          />
        </div>
        <div className="flex flex-col w-[80%]">
          <div className="font-bold text-[1rem]">김영석</div>
          <div className="text-[0.8rem] text-grey-1">
            kimyoungseok15@gmail.com
          </div>
        </div>
      </div>
      <div className="py-[1rem] " />
      <div className="font-bold flex items-center flex-row text-[1.2rem] pb-[0.4rem]">
        <img
          src={home}
          alt="home"
          className="w-[1.2rem] mr-[0.1rem] text-center leading-[1.2rem] h-[1.2rem]"
        />
        찜한 방
      </div>
      <FavoriteRooms />
      <div className="pb-[1rem]" />
      <PlusButton handleClick={handleToMyProperties} />
      <div className="py-[2rem]" />
      <div className="font-bold flex items-center flex-row text-[1.2rem] pb-[0.4rem]">
        <img
          src={loan}
          alt="loan"
          className="w-[1.2rem] mr-[0.1rem] text-center leading-[1.2rem] h-[1.2rem]"
        />
        찜한 대출상품
      </div>
      <FavoriteLoans />
      <div className="pb-[1rem]" />
      <PlusButton handleClick={handleToMyLoan} />
      <div className="py-[1rem]" />
    </div>
  );
}
