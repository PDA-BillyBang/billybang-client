import React from "react";
import downArrowGrey from "@/assets/image/map/downArrowGrey.svg"
import upArrowBlue from "@/assets/image/map/upArrowBlue.svg"

type Props = {
  text: string;
  isActive?: boolean;
  customWidth?: string;
  onClick? : () => void;
};

export default function OptionButton({ text, isActive, customWidth, onClick }: Props) {
  let buttonStyles;

  const handleClick = () =>{
    if(onClick){
      onClick();
    }
  }

  switch (isActive) {
    case true:
      buttonStyles = `flex items-center justify-center px-2 gap-1 text-center leading-[30px] text-blue-1 bg-blue-4 border-[0.5px] border-blue-1 ${
        customWidth ? customWidth : "w-[46px]"
      } h-[30px] rounded-[20px] text-[12px]`;
      break;
    case false:
      buttonStyles = `flex items-center justify-center px-2 gap-1 text-center leading-[30px] text-grey-1 bg-grey-6 border-[0.5px] border-grey-1 ${
        customWidth ? customWidth : "w-[46px]"
      } h-[30px] rounded-[20px] text-[12px]`;
      break;
  }

  return (
    <div onClick={handleClick}>
      <button className={buttonStyles}>
        {text}
        <img src={isActive? upArrowBlue : downArrowGrey} alt=""/>
      </button>
    </div>
    )
}
