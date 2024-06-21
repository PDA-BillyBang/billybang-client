import React, { useState } from 'react';
import filledLike from '../../../assets/image/icons/filledLike.svg';
import emptyLike from '../../../assets/image/icons/emptyLike.svg';
import BottomAlert from '../alert/BottomAlert';
import { likeLoan } from '@/lib/apis/loan';

type Props = {
  handleClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  isActive?: boolean;
  isLoan?: boolean;
  loanId?: number;
};

export default function LikeButton({
  handleClick,
  isActive,
  isLoan = false,
  loanId = 1,
}: Props) {
  const [showAlert, setShowAlert] = useState(false);

  const handleLikeLoan = async () => {
    try {
      const result = await likeLoan(loanId);
      console.log(result.data.response);
    } catch (error) {
      console.log('[ERROR]', error);
    }
  };

  const handleButtonClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    if (handleClick) handleClick(event);
    if (isLoan) {
      handleLikeLoan();
    }
    setShowAlert(true);
  };

  return (
    <div>
      <div
        onClick={(event) => handleButtonClick(event)}
        className="cursor-pointer "
      >
        <img
          src={isActive ? filledLike : emptyLike}
          alt="filledLike"
          className="w-[1.5rem] h-[1.rem]"
        />
      </div>
      {showAlert && (
        <BottomAlert
          message={`${isActive ? '상품을 찜했어요!' : '찜을 취소했어요!'}`}
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  );
}
