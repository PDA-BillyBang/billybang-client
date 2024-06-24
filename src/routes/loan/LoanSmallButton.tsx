import React from "react";
import { Button } from "flowbite-react";

type Props = {
  text: string;
  handleClick?: () => void;
};

export default function LoanSmallButton({ text, handleClick }: Props) {
  return (
    <button
      onClick={handleClick}
      className=" text-grey-1 text-[0.8rem] leading-[0.8rem] h-[1.3rem] border hover:bg-[#f3f4f6] border-grey-1 rounded-[20px] w-[65px]"
    >
      {text}
    </button>
  );
}
