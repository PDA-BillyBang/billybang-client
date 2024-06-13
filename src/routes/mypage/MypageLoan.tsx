import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import LoanCard from "../../components/loan/LoanCard";
import LoanHeader from "../../components/loan/LoanHeader";

export default function MypageLoan() {
  const { setTitle } = useOutletContext<{
    setTitle: (title: string) => void;
  }>();

  useEffect(() => {
    setTitle("찜한 대출상품");
  }, [setTitle]);

  const data = [1, 2, 3, 6, 7];
  return (
    <div className="pt-[80px] w-[100%] flex flex-col items-center">
      <div className="w-customWidthPercent">
        <LoanHeader />
        <div className="pb-[1rem]" />
        {data.map((value, index) => {
          return (
            <div key={index} className="pb-[0.8rem] w-[100%]">
              <LoanCard />
            </div>
          );
        })}
        <LoanHeader />
        <div className="pb-[1rem]" />
        {data.map((value, index) => {
          return (
            <div key={index} className="pb-[0.8rem] w-[100%]">
              <LoanCard likeActive={true} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
