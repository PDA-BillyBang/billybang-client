import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import LoanCard from "../../components/loan/LoanCard";
import LoanHeader from "../../components/loan/LoanHeader";
import { useNavigate } from "react-router-dom";

export default function MypageLoan() {
  const navigate = useNavigate();
  const { setTitle } = useOutletContext<{
    setTitle: (title: string) => void;
  }>();

  useEffect(() => {
    setTitle("찜한 대출상품");
  }, [setTitle]);

  const handleClickLoanId = (loanId: number) =>
    navigate("/loan/detail/" + loanId);

  const data = [1, 2, 3, 6, 7];
  return (
    <div className="pt-[80px] w-[100%] flex flex-col items-center">
      <div className="w-customWidthPercent">
        <LoanHeader />
        <div className="pb-[1rem]" />
        {data.map((value, index) => {
          return (
            <div key={index} className="pb-[0.8rem] w-[100%]">
              <LoanCard
                likeActive={true}
                handleClick={handleClickLoanId}
                loanId={132}
              />
            </div>
          );
        })}
        <LoanHeader />
        <div className="pb-[1rem]" />
        {data.map((value, index) => {
          return (
            <div key={index} className="pb-[0.8rem] w-[100%]">
              <LoanCard
                likeActive={true}
                handleClick={handleClickLoanId}
                loanId={132}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
