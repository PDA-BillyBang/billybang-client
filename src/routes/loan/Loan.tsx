import React, { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import LoanCard from '../../components/loan/LoanCard';
import LoanFiltering from '../../components/loan/LoanFiltering';
import BottomDrawer from '../../components/common/button/BottomDrawer';
import LoanHeader from '../../components/loan/LoanHeader';
import { useNavigate } from 'react-router-dom';
import NavigateButton from '../../components/common/button/NavigateButton';
import MultiRangeSlider from '@components/common/slider/MultiRangeSlider';
import MultiRangeSliderYear from '@components/common/slider/MultiRangeSliderYear';
import LargeButton from '@components/common/button/LargeButton';

// recommend/:propertyId
const Loan = () => {
  const { setTitle } = useOutletContext<{
    setTitle: (title: string) => void;
  }>();
  const navigate = useNavigate();
  const { propertyId } = useParams<{ propertyId: string }>();

  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => setIsOpen((prev) => !prev);

  const handleClickLoanId = (loanId: number) =>
    navigate('/loan/detail/' + loanId);

  useEffect(() => {
    setTitle('충무로엘크루메크로시티2'); // 실제로는 api로 propertyId에 해당하는 제목을 받아와서 갈아끼우기
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
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row text-grey-1">
            <div className="font-bold text-black-1">9</div>개의 대출상품이
            추천되었습니다.
          </div>
          <LoanFiltering handleClick={handleClick} />
        </div>
        <div className="pb-[1rem]" />
        <LoanHeader />
        <div className="py-[1rem]"></div>
        <LoanCard handleClick={handleClickLoanId} loanId={123} />
        <BottomDrawer isOpen={isOpen} handleClose={handleClick}>
          <div className="w-[100%] h-[50vh] flex flex-col justify-between">
            <div className="w-[100%]">
              <div className="h-[30%] my-4">
                <div className="text-sm">대출 기간</div>
                <MultiRangeSliderYear min={0} max={120} />
              </div>
              <div className="py-[1rem]" />
              <hr />
              <div className="h-[30%] my-4">
                <div className="text-sm">최소 대출 금액</div>
                <MultiRangeSlider min={0} max={3000} />
              </div>
            </div>
            <div className="flex justify-around pb-[1rem]">
              <LargeButton isActive={4} customWidth="w-[40%]" text="초기화" />
              <LargeButton isActive={0} customWidth="w-[55%]" text="적용" />
            </div>
          </div>
        </BottomDrawer>
      </div>
    </div>
  );
};

export default Loan;
