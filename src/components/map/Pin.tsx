import React from 'react';

type Props = {
  propertyId: number; // 매물 id
  area: number;      // 평수
  price: number;     // 가격 (100만원 단위)
  handleClick: (propertyId: number) => void; // 클릭 이벤트 핸들러. 매물id를 상위 컴포넌트로 전송
  count: number;     // 개수
  isSelected: boolean; // 선택된 상태
};

export default function Pin({ propertyId, area, price, count, handleClick, isSelected }: Props) {
  return (
    <div
      className="flex flex-col items-start justify-end cursor-pointer bg-transparent absolute select-none bottom-2"
      onClick={() => handleClick(propertyId)}
    >
      <div
        className={`${isSelected ? 'bg-blue-1 w-16 h-7 rounded-tl-2xl rounded-tr-2xl text-md' : 'bg-blue-2 w-14 h-6 rounded-tl-xl rounded-tr-xl text-sm'} flex items-center justify-center text-white-1 font-semibold relative shadow-lg`}
      >
        {Math.floor(area/3.3)}평
        {count >= 2 && (
          <div
            className={`${isSelected ? 'w-5 h-5 -top-2 -right-3 text-s' : 'w-4 h-4 -top-1 -right-2 text-xs'} absolute flex items-center justify-center bg-grey-3 rounded-full text-black-1 font-semibold z-20 shadow-lg`}
          >
            {count}
          </div>
        )}
      </div>
      <div
        className={`${isSelected ? 'w-16 h-8 rounded-br-2xl text-md' : 'w-14 h-7 rounded-br-xl text-sm'} bg-white-1 flex items-center justify-center text-black-1 font-semibold border border-grey-3 shadow-lg`}
      >
        {price / 100}억
      </div>
    </div>
  );
}
