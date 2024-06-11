import React from "react";
import bankTest from "../../assets/image/test/bank-test.png";
import filledLike from "../../assets/image/icons/filledLike.svg";

type Props = {
  propertyId?: number;
  handleClick?: (index: number) => void;
};

export default function LoanCard({ propertyId, handleClick }: Props) {
  return (
    <div
      onClick={() => propertyId && handleClick && handleClick(propertyId)}
      className="h-[180px] cursor-pointer w-customWidthPercent bg-grey-6 rounded-[5px] hover:bg-grey-5"
    >
      <div className="px-[1rem] py-[0.5rem] flex flex-col">
        <div className="flex flex-row items-center justify-between w-[100%]">
          <img
            src={bankTest}
            alt="Bank Test"
            className="w-[2.0rem] h-[2.0rem]"
          />
          <div className="px-[0.2rem]" />
          <div className="w-[85%] font-bold text-[1.3rem]">우리은행</div>
          <img
            src={filledLike}
            alt="star check"
            className="w-[1.5rem] h-[1.5rem]"
          />
        </div>
        <div className="py-[0.2rem]" />
        <div className="flex flex-col justify-between">
          <div className="text-black-2 text-[1.1rem]">
            iTouch 전세론(주택금융보증)
          </div>
          <div className="py-[0.15rem]" />
          <div className="text-grey-1 text-[1.0rem]">
            주택금융공사 주택신용보증서 담보(90%보증)로 영업점 방문없이
            인터넷상담 및 대출...
          </div>
          <div className="py-[0.15rem]" />
          <div className="flex flex-row justify-between text-[0.9rem]">
            <div className="text-grey-1">2.4억, LTV 70%이내</div>
            <div className="font-bold text-red-1">2.3~3.5%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
