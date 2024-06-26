import { useEffect, useState } from 'react';
import { useOutletContext, useParams, useNavigate } from 'react-router-dom';
import LoanFiltering from '../../components/loan/LoanFiltering';
import BottomDrawer from '../../components/common/button/BottomDrawer';
// import { useNavigate } from 'react-router-dom';
import NavigateButton from '../../components/common/button/NavigateButton';
import MultiRangeSlider from '@components/common/slider/MultiRangeSlider';
import MultiRangeSliderYear from '@components/common/slider/MultiRangeSliderYear';
import LargeButton from '@components/common/button/LargeButton';
import { getLoansByPropertyId } from '@/lib/apis/loan';
import LoanHeaderCardList from './LoanHeaderCardList';
import LoanSkeleton from './LoanSkeleton';
import GetViewportSize from '@/utils/hooks/GetViewportSize';

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
  const viewportSize = GetViewportSize(); // viewport 변경 감지
  const navigate = useNavigate();
  const { setTitle } = useOutletContext<{
    setTitle: (title: string) => void;
  }>();
  const [loanResult, setLoanResult] = useState<loanByPropertyIdI>();
  const [loading, setLoading] = useState<boolean>(true);
  const [navigationText, setNavigationText] = useState<string>(
    '나에게 맞는 대출 상품이 궁금하다면 정보 입력하기'
  );
  const [navigationRoute, setNavigationRoute] =
    useState<string>('/user/info/1');
  const [minMoney, setMinMoney] = useState(0);
  const [maxMoney, setMaxMoney] = useState(1000);
  const [minYear, setMinYear] = useState(0);
  const [maxYear, setMaxYear] = useState(50);
  const { propertyId } = useParams<{ propertyId: string }>();

  const handleGetLoansByPropertyId = async (
    minTerm: number,
    maxTerm: number,
    minPrice: number,
    maxPrice: number
  ) => {
    try {
      const result = await getLoansByPropertyId(
        Number(propertyId),
        minTerm,
        maxTerm,
        minPrice,
        maxPrice
      );
      console.log(propertyId, '-', result.data.response);
      setLoanResult(result.data.response);
      if (result.data.response.userStatus === 'UNAUTHORIZED') {
        setNavigationText('나에게 맞는 대출 상품이 궁금하다면 로그인하기');
        setNavigationRoute('/user/login');
      } else if (result.data.response.userStatus === 'NO_INFO') {
        setNavigationText('나에게 맞는 대출 상품이 궁금하다면 정보 입력하기');
        setNavigationRoute('/user/info/2');
      } else if (result.data.response.userStatus === 'NORMAL') {
        setNavigationText('개인 정보 수정하러 가기');
        setNavigationRoute('/user/info/1');
      }
      setTitle(result.data.response.buildingName);
    } catch (error) {
      console.log('[ERROR]', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetLoansByPropertyId(0, 600, 0, 1000);
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => setIsOpen((prev) => !prev);
  const handleGetLoansFiltering = () => {
    console.log('적용 money', minMoney, maxMoney);
    console.log('적용 year', minYear, maxYear);
    handleGetLoansByPropertyId(minYear, maxYear, minMoney, maxMoney);
  };
  const handleGetLoanInit = () => {
    setMaxMoney(1000);
    handleGetLoansByPropertyId(0, 600, 0, 1000);
  };

  const handleMoneyFilter = (min: number, max: number) => {
    setMinMoney(min);
    setMaxMoney(max);
  };

  const handleTermFilter = (min: number, max: number) => {
    setMinYear(min);
    setMaxYear(max);
  };
  const drawerPosition = viewportSize.width >= 768 ? 'left' : 'bottom';
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
        <NavigateButton
          text={navigationText}
          customWidth="w-[100%]"
          handleClick={() => navigate(navigationRoute)}
        />
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
        <BottomDrawer
          isOpen={isOpen}
          handleClose={handleClick}
          position={drawerPosition}
        >
          <div className="w-[100%] h-[43vh] flex flex-col justify-between">
            <div className="w-[100%]">
              <div className="h-[30%] my-4">
                <div className="text-sm">대출 기간</div>
                <MultiRangeSliderYear
                  min={0}
                  max={50}
                  onChange={({ min, max }) => {
                    handleTermFilter(min, max);
                  }}
                  minValue={minYear}
                  maxValue={maxYear}
                />
              </div>
              <div className="py-[1rem]" />
              <hr />
              <div className="h-[30%] my-4">
                <div className="text-sm">최소 대출 금액</div>
                <MultiRangeSlider
                  min={0}
                  max={1000}
                  onChange={({ min, max }) => {
                    handleMoneyFilter(min, max);
                  }}
                  minValue={minMoney}
                  maxValue={maxMoney}
                />
              </div>
            </div>
            <div className="flex justify-around pb-[1rem]">
              <LargeButton
                isActive={4}
                customWidth="w-[40%]"
                text="초기화"
                handleClick={handleGetLoanInit}
              />
              <LargeButton
                isActive={0}
                customWidth="w-[55%]"
                text="적용"
                handleClick={handleGetLoansFiltering}
              />
            </div>
          </div>
        </BottomDrawer>
      </div>
    </div>
  );
};

export default Loan;
