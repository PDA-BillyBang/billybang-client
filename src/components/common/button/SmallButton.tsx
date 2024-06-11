import React from "react";

type Props = {
  text: string;
  isActive: boolean;
  customWidth?: string;
};

export default function SmallButton({ text, isActive, customWidth }: Props) {
  let buttonStyles;

  switch (isActive) {
    case true:
      buttonStyles = `text-center leading-[30px] text-blue-1 bg-blue-4 border-[0.5px] border-blue-1 ${
        customWidth ? customWidth : "w-[46px]"
      } h-[30px] rounded-[20px] text-[12px]`;
      break;
    default:
      buttonStyles = `text-center leading-[30px] text-grey-2 bg-grey-6 border-[0.5px] border-grey-2 ${
        customWidth ? customWidth : "w-[46px]"
      } h-[30px] rounded-[20px] text-[12px]`;
      break;
  }

  return <button className={buttonStyles}>{text}</button>;
}
