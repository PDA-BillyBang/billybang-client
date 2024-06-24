import React, { useState, ChangeEvent, useEffect } from 'react';

type Props = {
  type?: string;
  title?: string;
  text: string;
  value?: string | number; // 부모로부터 입력 값을 받음
  onChange: (value: string | number) => void; // 입력 값이 변경될 때 호출할 핸들러
  validate?: (value: string | number) => boolean; // 유효성 검사 함수
  errorMessage?: string; // 오류 메시지
  unit?: string; // 추가할 단위
};

export default function FloatingInputForm1({
  type = 'text',
  title = '',
  text,
  value,
  onChange,
  validate,
  errorMessage,
  unit = '', // 기본값은 빈 문자열
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [displayValue, setDisplayValue] = useState<string | number>(
    value ?? ''
  );

  useEffect(() => {
    if (value !== undefined) {
      setDisplayValue(value);
    }
  }, [value]);

  const handleBlur = () => {
    setIsFocused(false);
    if (validate && value !== undefined) {
      setIsValid(validate(value));
    }
    if (typeof displayValue === 'number') {
      setDisplayValue(displayValue.toLocaleString());
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    setDisplayValue(value ?? '');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, '');
    const newValue = type === 'number' ? +rawValue : rawValue;
    setDisplayValue(rawValue);
    onChange(newValue);
  };

  return (
    <div className="w-full flex flex-col">
      <div
        className={`text-${isFocused ? 'red' : 'grey'}-2 text-[1.5rem] font-bold`}
      >
        {title}
      </div>
      <div className="relative">
        <input
          type={type}
          placeholder={text}
          value={
            typeof displayValue === 'number'
              ? displayValue.toLocaleString()
              : displayValue
          }
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          className="w-full h-[3rem] border-b border-grey-2 placeholder-grey-2 focus:outline-none focus:border-[black]"
        />
        {unit && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-grey-2 pointer-events-none">
            {unit}
          </span>
        )}
      </div>
      {!isValid && (
        <div className="text-blue-1 text-[0.8rem] mt-1">{errorMessage}</div>
      )}
    </div>
  );
}
