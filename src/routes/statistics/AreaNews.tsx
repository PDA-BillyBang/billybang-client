import React from "react";
import SmallButton from "../../components/common/button/SmallButton";
import NewsCard from "./NewsCard";
type Props = {};

const data = [1, 2, 3, 4, 5];

export default function AreaNews({}: Props) {
  return (
    <div className="pt-[1rem]">
      <div className="text-[1rem] font-bold">지역 관련 주요 단어</div>
      <div className="h-[200px] bg-grey-6 rounded-[10px] mt-[0.5rem]">.</div>
      <div className="flex flex-row justify-between mt-[2rem] items-center">
        <div className="text-[1rem] font-bold">뉴스</div>
        <div className="flex flex-row">
          <SmallButton
            isActive={true}
            text="사건 사고"
            customWidth="w-[60px]"
          />
          <div className="px-[0.1rem]" />
          <SmallButton text="부동산" customWidth="w-[50px]" />
        </div>
      </div>
      {data.map((value, index) => (
        <div key={index} className="py-[0.3rem]">
          <NewsCard />
        </div>
      ))}
    </div>
  );
}
