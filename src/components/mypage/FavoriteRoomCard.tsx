import React from 'react';
import roomTest from '../../assets/image/test/room-test.svg';
type Props = {};

export default function FavoriteRoomCard({}: Props) {
  return (
    <div className="w-[150px] h-[170px] cursor-pointer flex flex-col hover:bg-grey-6 ">
      <div className="w-[150px] h-[100px]">
        <img
          src={roomTest}
          alt="roomTest"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="text-[0.9rem] pt-[0.5rem] ml-[0.3rem]">
        두산위브파빌리온{' '}
      </div>
      <div className="text-[0.7rem] pt-[0.2rem] ml-[0.3rem] text-grey-1">
        {' '}
        매매 4억 / 오피스텔
      </div>
    </div>
  );
}
