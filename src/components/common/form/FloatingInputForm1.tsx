import React, { useState, ChangeEvent } from "react";

type Props = {
  type?: string;
  title?: string;
  text: string;
  value?: string | number; // 부모로부터 입력 값을 받음
  onChange: (value: string | number) => void; // 입력 값이 변경될 때 호출할 핸들러
  validate?: (value: string | number) => boolean; // 유효성 검사 함수
  errorMessage?: string; // 오류 메시지
};

export default function FloatingInputForm1({
  type = "text",
  title = "",
  text,
  value,
  onChange,
  validate,
  errorMessage,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const handleBlur = () => {
    setIsFocused(false);
    if (validate && value !== undefined) {
      // 수정된 부분: value가 정의되어 있을 때만 유효성 검사 수행
      setIsValid(validate(value));
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div
        className={`text-${
          isFocused ? "red" : "grey"
        }-2 text-[1.5rem] font-bold`}
      >
        {title}
      </div>
      <input
        type={type}
        placeholder={text}
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const newValue = type === "number" ? +e.target.value : e.target.value;
          onChange(newValue);
        }}
        className="w-full h-[3rem] border-b border-grey-2 placeholder-grey-2 focus:outline-none focus:border-[black]"
      />
      {!isValid && (
        <div className="text-blue-1 text-[0.8rem] mt-1">{errorMessage}</div>
      )}
    </div>
  );
}
