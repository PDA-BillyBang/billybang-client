import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import LoanCard from "../../components/loan/LoanCard";
import LoanFiltering from "../../components/loan/LoanFiltering";
import BottomDrawer from "../../components/common/button/BottomDrawer";
import LoanHeader from "../../components/loan/LoanHeader";
import { useNavigate } from "react-router-dom";
import NavigateButton from "../../components/common/button/NavigateButton";

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

  const data = [1, 2, 3, 4];

  return (
    <div className="flex flex-col items-center mt-[80px]">
      <div className=" w-customWidthPercent">
        <NavigateButton
          text="나에게 맞는 대출 상품이 궁금하다면 로그인하기 "
          customWidth="w-[100%]"
        />
        <div className="pb-[10px]" />
        <LoanFiltering handleClick={handleClick} />
        <LoanHeader />
        <div className="py-[1rem]"></div>
        <LoanCard handleClick={handleClickLoanId} loanId={123} />
        <BottomDrawer isOpen={isOpen} handleClose={handleClick}>
          <div>children</div>
        </BottomDrawer>
      </div>
    </div>
  );
};

export default Loan;
