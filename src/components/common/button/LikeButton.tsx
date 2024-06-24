import React, { useState } from 'react';
import filledLike from '../../../assets/image/icons/filledLike.svg';
import emptyLike from '../../../assets/image/icons/emptyLike.svg';
import BottomAlert from '../alert/BottomAlert';
import { likeLoan, deleteLikeLoan } from '@/lib/apis/loan';
import { AxiosError } from 'axios';

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
  const [message, setMessage] = useState<string>('TEST');

  const handleLikeLoan = async () => {
    try {
      if (isActive) {
        const result = await deleteLikeLoan(loanId);
        setMessage('✅ 찜을 취소했어요!');
      } else {
        const result = await likeLoan(loanId);
        setMessage('❤️ 상품을 찜했어요!');
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.code === 'ERR_BAD_REQUEST') {
        setMessage('🤗 로그인하고 찜해보세요!');
      } else {
        setMessage('오류가 발생했습니다.');
      }
    } finally {
      setShowAlert(true);
    }
  };

  const handleButtonClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    if (handleClick) handleClick(event);
    if (isLoan) {
      handleLikeLoan();
    } else {
      setShowAlert(true);
    }
    // setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div>
      <div
        onClick={(event) => handleButtonClick(event)}
        className="cursor-pointer"
      >
        <img
          src={isActive ? filledLike : emptyLike}
          alt="filledLike"
          className="w-[1.5rem] h-[1.rem]"
        />
      </div>
      {showAlert && (
        <BottomAlert message={message} onClose={handleCloseAlert} />
      )}
    </div>
  );
}
