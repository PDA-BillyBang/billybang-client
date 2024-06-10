import { FloatingLabel } from "flowbite-react";
import React, { useState } from "react";

type Props = {
  title?: string;
  text: string;
};

export default function InputForm({ title, text }: Props) {
  // 포커스 상태를 관리하는 상태 변수 선언
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full flex flex-col">
      <div
        className={`text-${
          isFocused ? "red" : "grey"
        }-2 text-[1.5rem] font-bold `}
      >
        {title}
      </div>
      <input
        type="text"
        placeholder={text}
        onFocus={() => setIsFocused(true)} // 포커스 이벤트 발생 시 포커스 상태를 true로 변경
        onBlur={() => setIsFocused(false)} // 포커스가 해제될 때 포커스 상태를 false로 변경
        className="w-full h-[3rem] border-b border-grey-2 placeholder-grey-2 w-customWidthPercent focus:outline-none focus:border-[black]"
      />
    </div>
  );
}
