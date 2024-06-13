import React from "react";

type Props = {
  handleClick?: () => void;
};

export default function PlusButton({ handleClick }: Props) {
  return (
    <button
      onClick={handleClick}
      className="h-[40px] hover:bg-grey-5 bg-grey-6 rounded-[0.2rem] border-white-1 text-blue-1 text-[0.9rem] w-[100%]"
    >
      더 보기 {">"}
    </button>
  );
}
