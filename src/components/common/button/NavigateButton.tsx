import React from 'react';
import doubleBlueRight from '../../../assets/image/icons/doubleBlueRight.svg';

type Props = {
  text: string;
  customWidth: string;
  handleClick?: () => void;
};

export default function NavigateButton({
  text,
  customWidth,
  handleClick,
}: Props) {
  return (
    <button
      onClick={handleClick}
      className={`${customWidth} text-blue-1 bg-gradient-to-r from-blue-4 hover:from-blue-3 to-white-1 h-[30px] text-[12px] rounded-[20px]`}
    >
      <div className="flex items-center justify-between px-4">
        {text}
        <img src={doubleBlueRight} />
      </div>
    </button>
  );
}
