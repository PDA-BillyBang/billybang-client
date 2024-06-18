import React, { useState, useEffect } from 'react';
import roomTest from '../../assets/image/test/room-test.svg';
import filledLike from '../../assets/image/icons/filledLike.svg';
import LikeButton from '../common/button/LikeButton';
type Props = {};

export default function FavoriteDetailRoomCard({}: Props) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [likeActive, setLikeActive] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 450);
    };

    handleResize(); // Check screen size initially
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLikeClick = () => {
    console.log('like');
    setLikeActive((prev) => !prev);
  };

  return (
    <div className="w-[100%] hover:bg-grey-5 bg-grey-6 h-[150px] flex flex-row rounded-[10px]">
      <div className="w-[40%] pl-[0.3rem] flex justify-center items-center">
        <img
          src={roomTest}
          className="h-[120px] w-[90%] rounded-[5px] object-cover"
          alt="room"
        />
      </div>
      <div className="w-[1%]" />
      <div className="flex flex-col justify-between w-[59%] py-[10px]">
        <div>
          <div className="font-bold w-[100%] justify-between items-center pr-[0.8rem] text-[1rem] flex flex-row">
            <div>두산위브파빌리온</div>
            <LikeButton handleClick={handleLikeClick} isActive={likeActive} />
          </div>
          <div className="flex flex-row items-baseline">
            <div className="text-grey-1 text-[1rem] font-bold">매매</div>
            <div className="text-grey-1 text-[0.9rem] font-bold text-end pl-[0.1rem]">
              4억 8,000
            </div>
          </div>
        </div>
        <div>
          <div className="text-[0.9rem]">아파트</div>
          <div className="text-[0.9rem]">106/76m²</div>
          <div className="text-[0.9rem]">40/44층</div>
        </div>
        {/* <div className="flex flex-row flex-wrap">
          <div className="bg-grey-1 mb-[0.2rem] mr-[0.3rem] text-white-1 text-center leading-[1.5rem] h-[1.5rem] rounded-[1rem] text-[0.7rem] w-[2.5rem]">
            아파트
          </div>
          <div className="bg-grey-1 mb-[0.2rem] mr-[0.3rem] text-white-1 text-center leading-[1.5rem] h-[1.5rem] rounded-[1rem] text-[0.7rem] w-[3.5rem]">
            106/76m²
          </div>
          <div className="bg-grey-1 mr-[0.3rem] text-white-1 text-center leading-[1.5rem] h-[1.5rem] rounded-[1rem] text-[0.7rem] w-[3.5rem]">
            40/44층
          </div>
        </div> */}
      </div>
    </div>
  );
}
