import React, { useState } from "react";
import downArrowWhite from "@/assets/image/map/downArrowWhite.svg"
import ConvenientButton from "./ConvenientButton";
import { CategoryCode } from "@/utils/types";

type Props = {
  text: string;
  customWidth?: string;
  handleCategoryClick: (category: "" | CategoryCode)=>void;
};

export default function DropDown({ text, customWidth, handleCategoryClick }: Props) {
  const [showButtons, setShowButtons] = useState(false);
  const [activeButtonIdx, setActiveButtonIdx] = useState<number|null>(null);
  const toggleButtons = () => {
    setShowButtons(!showButtons);
  };
  const handleButtonClick = (index:number) => {
    if (index === activeButtonIdx){
      setActiveButtonIdx(null);
    } else {
      setActiveButtonIdx(index)
    }
  }
  return (
    <div>
      <div onClick={toggleButtons}>
        <button className={`flex items-center justify-center px-1 text-center leading-[30px] text-white-1 bg-black-2 border-[0.5px] border-grey-2 ${customWidth ? customWidth : "w-[46px]"} h-[30px] rounded-[20px] text-[12px]`}>
          <div className="ms-2 me-1 flex">
              {text}
              <img src={downArrowWhite} alt="" className={`transition-transform ${showButtons ? "rotate-180" : "rotate-0"}`}/>
          </div>
        </button>
      </div>
      {showButtons && (
        <div className="flex flex-col text-center space-y-2 mt-2">
          <ConvenientButton text="편의점" isActive={activeButtonIdx===0} onClick={() => {handleCategoryClick('CS2'); handleButtonClick(0)}} />
          <ConvenientButton text="병원" isActive={activeButtonIdx===1} onClick={() => {handleCategoryClick('HP8'); handleButtonClick(1)}} />
          <ConvenientButton text="은행" isActive={activeButtonIdx===2} onClick={() => {handleCategoryClick('BK9'); handleButtonClick(2)}} />
          <ConvenientButton text="학교" isActive={activeButtonIdx===3} onClick={() => {handleCategoryClick('SC4'); handleButtonClick(3)}} />
          <ConvenientButton text="카페" isActive={activeButtonIdx===4} onClick={() => {handleCategoryClick('CE7'); handleButtonClick(4)}} />
        </div>
      )}
    </div>
  );
}