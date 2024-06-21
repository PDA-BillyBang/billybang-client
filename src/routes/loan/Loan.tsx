import React, { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import LoanFiltering from '../../components/loan/LoanFiltering';
import BottomDrawer from '../../components/common/button/BottomDrawer';
import { useNavigate } from 'react-router-dom';
import NavigateButton from '../../components/common/button/NavigateButton';
import MultiRangeSlider from '@components/common/slider/MultiRangeSlider';
import MultiRangeSliderYear from '@components/common/slider/MultiRangeSliderYear';
import LargeButton from '@components/common/button/LargeButton';
import { getLoansByPropertyId } from '@/lib/apis/loan';
import LoanHeaderCardList from './LoanHeaderCardList';
import LoanSkeleton from './LoanSkeleton';

export interface loanI {
  isStarred: boolean;
  loanId: number;
  loanLimit: number;
  ltv: number | null;
  maxInterestRate: number;
  minInterestRate: number;
  productDesc: string;
  productName: string;
  providerImgUrl: string;
  providerName: string;
}

export interface loanCategoriesI {
  loanType: string;
  loans: loanI[];
}

export interface loanByPropertyIdI {
  buildingName: string;
  loanCategories: loanCategoriesI[];
  sumCount: number;
  userStatus: string;
}

// recommend/:propertyId
const Loan = () => {
  const { setTitle } = useOutletContext<{
    setTitle: (title: string) => void;
  }>();
  const [loanResult, setLoanResult] = useState<loanByPropertyIdI>();
  const [loading, setLoading] = useState<boolean>(true);
  const [navigationText, setNavigationText] = useState<string>(
    '나에게 맞는 대출 상품이 궁금하다면 정보 입력하기'
  );
  const navigate = useNavigate();
  const { propertyId } = useParams<{ propertyId: string }>();

  const handleGetLoansByPropertyId = async () => {
    try {
      const result = await getLoansByPropertyId(Number(propertyId));
      console.log(result.data.response);
      setLoanResult(result.data.response);
      if (result.data.response.userStatus === 'UNAUTHORIZED') {
        setNavigationText('나에게 맞는 대출 상품이 궁금하다면 로그인하기');
      }
    } catch (error) {
      console.log('[ERROR]', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetLoansByPropertyId();
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => setIsOpen((prev) => !prev);

  const handleClickLoanId = (loanId: number) =>
    navigate('/loan/detail/' + loanId);

  useEffect(() => {
    setTitle('충무로엘크루메크로시티2'); // 실제로는 api로 propertyId에 해당하는 제목을 받아와서 갈아끼우기
  }, [setTitle]);

  if (loading) {
    return (
      <div className="flex flex-col w-[100%] items-center mt-[80px]">
        <div className=" w-customWidthPercent">
          <NavigateButton text={navigationText} customWidth="w-[100%]" />
          <LoanSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-[80px]">
      <div className=" w-customWidthPercent">
        <NavigateButton text={navigationText} customWidth="w-[100%]" />
        <div className="pb-[10px]" />
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row text-grey-1">
            <div className="font-bold text-black-1">{loanResult?.sumCount}</div>
            개의 대출상품이 추천되었습니다.
          </div>
          <LoanFiltering handleClick={handleClick} />
        </div>
        <div className="pb-[1rem]" />
        {loanResult?.loanCategories.map(
          (loanCategory: loanCategoriesI, index) => {
            return (
              <div key={index} className="w-[100%]">
                <LoanHeaderCardList loanCategory={loanCategory} />
              </div>
            );
          }
        )}
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
