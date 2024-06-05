import React from "react";

interface Props {
  text: string;
  customWidth: string;
  isActive: number;
}

export default function LargeButton({ text, customWidth, isActive }: Props) {
  return (
    <button
      className={`bg-blue-1 text-white-1 text-[18px] rounded-[5px] h-[57px] ${customWidth} hover:bg-dark-blue-1`}
    >
      {text}
    </button>
  );
}
