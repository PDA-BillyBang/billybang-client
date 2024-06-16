import React, { useState, useEffect } from "react";
import roomTest from "../../assets/image/test/room-test.svg";
import filledLike from "../../assets/image/icons/filledLike.svg";
import LikeButton from "../common/button/LikeButton";
type Props = {};

export default function FavoriteDetailRoomCard({}: Props) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [likeActive, setLikeActive] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 450);
    };

    handleResize(); // Check screen size initially
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLikeClick = () => {
    console.log("like");
    setLikeActive((prev) => !prev);
  };

  return (
    <div className="w-[100%] hover:bg-grey-5 bg-grey-6 h-[150px] sm:h-[140px] flex flex-row rounded-[10px]">
      <div className="w-[40%] flex justify-center items-center">
        <img
          src={roomTest}
          className="h-[120px] w-[90%] object-cover"
          alt="room"
        />
      </div>
      <div className="w-[1%]" />
      <div className="flex flex-col w-[59%] pt-[10px]">
        <div className="font-bold w-[100%] justify-between items-center pr-[0.8rem] text-[1rem] flex flex-row">
          <div>두산위브파빌리온</div>
          <LikeButton handleClick={handleLikeClick} isActive={likeActive} />
        </div>
        <div className="flex flex-row items-baseline">
          <div className="text-blue-1 text-[0.7rem] font-bold">매매</div>
          <div className="text-blue-1 text-[0.7rem] font-bold text-end pl-[0.1rem]">
            4억 8,000
          </div>
        </div>
        <div className="flex flex-row">
          <div className="text-grey-1 text-[0.7rem]">아파트</div>
          <div className="text-grey-1 text-[0.7rem] pl-[0.2rem]">
            106/76m² 40/44층
          </div>
        </div>
        <div className="text-grey-1 text-[0.7rem]">
          {isSmallScreen
            ? "에어컨4대, 로얄층 남서향"
            : "에어컨4대, 로얄층남서향, 인천대교뻥뷰, 풀옵션"}
        </div>
        <div className="text-grey-1 text-[0.7rem] pt-[0.4rem]">
          {isSmallScreen
            ? "성남시 분당구 서현동"
            : "성남시 분당구 서현동 중앙공원로 53 000동 000호"}
        </div>
        <div className="flex flex-col sm:flex-row text-[0.7rem] text-grey-1">
          <div>금두꺼비공인중개사사무소 </div>
          <div className="px-[0.1rem] hidden sm:block">|</div>
          <div>부동산렛츠 제공</div>
        </div>
      </div>
    </div>
  );
}
