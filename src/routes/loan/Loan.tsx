import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import LoanCard from "../../components/loan/LoanCard";
import LoanFiltering from "../../components/loan/LoanFiltering";
import BottomDrawer from "../../components/common/button/BottomDrawer";

const Loan = () => {
  const { setTitle } = useOutletContext<{
    setTitle: (title: string) => void;
  }>();

  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    setTitle("충무로엘크루메크로시티2"); // 실제로는 api로 propertyId에 해당하는 제목을 받아와서 갈아끼우기
  }, [setTitle]);

  return (
    <div className="flex flex-col items-center">
      <LoanFiltering handleClick={handleClick} />
      <BottomDrawer isOpen={isOpen} handleClose={handleClick}>
        <div>children</div>
      </BottomDrawer>
    </div>
  );
};

export default Loan;
