import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import LoanCard from "../../components/loan/LoanCard";
import LoanHeader from "../../components/loan/LoanHeader";

const Loan = () => {
  const { setTitle } = useOutletContext<{
    setTitle: (title: string) => void;
  }>();

  useEffect(() => {
    setTitle("충무로엘크루메크로시티2"); // 실제로는 api로 propertyId에 해당하는 제목을 받아와서 갈아끼우기
  }, [setTitle]);

  return (
    <div className="flex flex-col items-center">
      <LoanHeader />
      <div className="py-2"></div>
      <LoanCard />
    </div>
  );
};

export default Loan;
