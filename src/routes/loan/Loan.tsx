import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import LoanCard from "../../components/loan/LoanCard";
import LoanFiltering from "../../components/loan/LoanFiltering";
import BottomDrawer from "../../components/common/button/BottomDrawer";
import LoanHeader from "../../components/loan/LoanHeader";
import { useNavigate } from "react-router-dom";

// recommend/:propertyId
const Loan = () => {
  const { setTitle } = useOutletContext<{
    setTitle: (title: string) => void;
  }>();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => setIsOpen((prev) => !prev);

  const handleClickLoanId = (loanId: number) =>
    navigate("/loan/detail/" + loanId);

  useEffect(() => {
    setTitle("충무로엘크루메크로시티2"); // 실제로는 api로 propertyId에 해당하는 제목을 받아와서 갈아끼우기
  }, [setTitle]);

  return (
    <div className="flex flex-col items-center">
      <div className="py-[5rem]">,</div>
      <LoanFiltering handleClick={handleClick} />
      <div className="py-[5rem]">,</div>
      <LoanHeader />
      <div className="py-[1rem]"></div>
      <LoanCard handleClick={handleClickLoanId} loanId={123} />
      <BottomDrawer isOpen={isOpen} handleClose={handleClick}>
        <div>children</div>
      </BottomDrawer>
    </div>
  );
};

export default Loan;
