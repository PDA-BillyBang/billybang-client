import React, { useState } from "react";
import filledLike from "../../../assets/image/icons/filledLike.svg";
import emptyLike from "../../../assets/image/icons/emptyLike.svg";
import BottomAlert from "../alert/BottomAlert";

type Props = {
  handleClick?: () => void;
  isActive?: boolean;
};

export default function LikeButton({ handleClick, isActive }: Props) {
  const [showAlert, setShowAlert] = useState(false);

  const handleButtonClick = () => {
    if (handleClick) handleClick();
    setShowAlert(true);
  };

  return (
    <div>
      <div onClick={handleButtonClick} className="cursor-pointer ">
        <img
          src={isActive ? filledLike : emptyLike}
          alt="filledLike"
          className="w-[1.5rem] h-[1.rem]"
        />
      </div>
      {showAlert && (
        <BottomAlert
          message={`${isActive ? "상품을 찜했어요!" : "찜을 취소했어요!"}`}
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  );
}
