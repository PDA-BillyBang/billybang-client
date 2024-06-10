import React from "react";

type Props = {
  handleClick: () => void;
};

export default function LoanFiltering({ handleClick }: Props) {
  return (
    <button
      onClick={handleClick}
      className="w-[55px] h-[30px] text-[0.8rem] rounded-[20px] hover:bg-dark-blue-1 bg-blue-1 text-white-1"
    >
      필터링
    </button>
  );
}
