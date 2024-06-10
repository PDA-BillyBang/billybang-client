import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import bankTest from "../../assets/image/test/bank-test.png";
import filledLike from "../../assets/image/icons/filledLike.svg";
import check from "../../assets/image/icons/check.svg";
import LoanSmallButton from "./LoanSmallButton";

const LoanDetail = () => {
  const { setTitle } = useOutletContext<{
    setTitle: (title: string) => void;
  }>();

  useEffect(() => {
    setTitle("상품상세");
  }, [setTitle]);

  return (
    <div className="flex flex-col items-center ">
      <div className="py-[0.5rem]" />
      <div className=" w-customWidthPercent">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center">
            <img src={bankTest} className="w-[2.5rem] h-[2.5rem]" />
            <div className="text-[1.2rem] pl-[0.25rem]">우리은행</div>
          </div>
          <LoanSmallButton text="기업정보" />
        </div>
      </div>
      <div className="py-[0.6rem]" />
      <div className="w-customWidthPercent">
        <header className="flex flex-row items-center justify-between ">
          <div className="font-bold text-[1.2rem] leading-[1.2rem] text-center">
            iTouch 전세론(주택금융보증)
          </div>
          <img src={filledLike} className="w-[25px] h-[25px]" />
        </header>
        <div className="flex flex-row items-center">
          <div className="w-[1.3rem] h-[1.3rem] bg-blue-1 rounded-full flex items-center justify-center">
            <img src={check} className="w-[1rem] h-[1rem] " />
          </div>
          <div className="pb-[2rem]" />
          <div className="pl-[0.15rem] leading-[0.8rem] text-[1rem]">
            HF 보증
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDetail;
