import React from 'react';

type Props = {
  icon?: string;
  text: string;
  isActive?: boolean;
  customWidth?: string;
  onClick?: () => void;
};

export default function SmallButton({
  icon,
  text,
  isActive,
  customWidth,
  onClick,
}: Props) {
  let buttonStyles;

  switch (isActive) {
    case true:
      buttonStyles = `text-center leading-[30px] text-blue-1 bg-blue-4 border-[0.5px] border-blue-1 ${
        customWidth ? customWidth : 'w-[46px]'
      } h-[30px] rounded-[20px] text-[12px]`;
      break;
    case false:
      buttonStyles = `flex items-center justify-center px-2 gap-1 text-center leading-[30px] text-grey-1 bg-grey-6 border-[0.5px] border-grey-1 ${
        customWidth ? customWidth : 'w-[46px]'
      } h-[30px] rounded-[20px] text-[12px]`;
      break;
    default:
      buttonStyles = `text-center leading-[30px] text-grey-2 bg-grey-6 border-[0.5px] border-grey-2 ${
        customWidth ? customWidth : 'w-[46px]'
      } h-[30px] rounded-[20px] text-[12px]`;
      break;
  }

  return (
    <div onClick={onClick}>
      <button className={buttonStyles}>
        {icon && (
          <img src={icon} className="h-4 w-4 cursor-pointer" alt="edit" />
        )}
        {text}
      </button>
    </div>
  );
}
