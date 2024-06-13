import React from "react";
import profileTest from "../../assets/image/test/profile-test.svg";
import FavoriteRooms from "../../components/mypage/FavoriteRooms";

export default function Mypage() {
  return (
    <div className="w-customWidthPercent">
      <div className="flex flex-row items-center">
        <div className="w-[30%]">
          <img
            src={profileTest}
            alt="profile-test"
            className="h-[58px] w-[58px]"
          />
        </div>
        <div className="flex flex-col w-[70%]">
          <div className="font-bold text-[1rem]">김영석</div>
          <div className="text-[0.8rem] text-grey-1">
            kimyoungseok15@gmail.com
          </div>
        </div>
      </div>
      <div className="py-[1rem]" />
      <div className="font-bold pb-[0.4rem]">찜한 방</div>
      <FavoriteRooms />
    </div>
  );
}
