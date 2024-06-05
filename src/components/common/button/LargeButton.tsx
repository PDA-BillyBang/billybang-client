import React from "react";

interface Props {
  text: string;
  customWidth: string;
  isActive: number;
}

export default function LargeButton({ text, customWidth, isActive }: Props) {
  let buttonStyles;

  switch (isActive) {
    case 0:
      buttonStyles = `bg-blue-1 text-white-1 text-[18px] rounded-[5px] h-[57px] ${customWidth} hover:bg-dark-blue-1`;
      break;
    case 1:
      buttonStyles = `bg-grey-3 text-grey-1 border-[1px] border-grey-1 text-[18px] rounded-[5px] h-[57px] ${customWidth} hover:bg-grey-2`;
      break;
    default:
      buttonStyles = `bg-white-1 text-blue-3 border-[1px] border-blue-3 text-[18px] rounded-[5px] h-[57px] ${customWidth} hover:bg-blue-4`;
      break;
  }

  return <button className={buttonStyles}>{text}</button>;
}
