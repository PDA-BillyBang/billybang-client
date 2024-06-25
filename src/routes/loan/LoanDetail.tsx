import { useEffect, useState } from 'react';
import { useOutletContext, useParams, useNavigate } from 'react-router-dom';
import LoanSmallButton from './LoanSmallButton';
import LargeButton from '../../components/common/button/LargeButton';
import LikeButton from '../../components/common/button/LikeButton';
import { getLoanDetailByLoanId } from '@/lib/apis/loan';
import LoanDetailSkeleton from './LoanDetailSkeleton';
import { formatLoanLimit } from '@components/loan/LoanCard';

export interface loanDetailI {
  guaranteeAgencyName: string | null;
  interestRateType: string;
  isStarred: boolean;
  loanLimit: number;
  loanType: string;
  ltv: number | null;
  maxInterestRate: number;
  maxTerm: number;
  minInterestRate: number;
  minTerm: number | null;
  preferentialItems: any[];
  productDesc: string;
  productName: string;
  providerId: number;
  providerImgUrl: string;
  providerName: string;
  originUrl: string;
}

const LoanDetail = () => {
  const { loanId } = useParams<{ loanId: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const { setTitle } = useOutletContext<{
    setTitle: (title: string) => void;
  }>();
  const [likeButtonActive, setLikeButtonActive] = useState<boolean>(true);
  const [loanDetailResult, setLoanDetailResult] = useState<loanDetailI | null>(
    null
  );
  const navigate = useNavigate();

  const handleLikeClick = () => {
    console.log('like loan card');
    setLikeButtonActive((prev) => !prev);
  };

  const handleGetLoanDetailByLoanId = async () => {
    try {
      const result = await getLoanDetailByLoanId(Number(loanId));
      console.log(result.data.response);
      setLoanDetailResult(result.data.response);
      setLikeButtonActive(result.data.response.isStarred);
    } catch (error) {
      console.log('[ERROR]', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetLoanDetailByLoanId();
  }, []);

  useEffect(() => {
    setTitle('상품상세');
  }, [setTitle]);

  const handleToBankUrl = () => {
    window.open(
      loanDetailResult?.originUrl
      // 'https://www.kebhana.com/cont/mall/mall08/mall0802/mall080202/1501583_115196.jsp?_menuNo=98786'
    );
  };

  const handleClickToCompanyInfo = () => {
    navigate('/loan/company/' + loanDetailResult?.providerId);
  };

  if (loading || !loanDetailResult) {
    return (
      <div className="flex flex-col items-center w-full mt-[50px]">
        <div className="w-customWidthPercent">
          <LoanDetailSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-[50px]">
      <div className="py-[0.5rem]" />
      <div className="w-customWidthPercent">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center">
            <img
              src={loanDetailResult.providerImgUrl}
              className="w-[2.5rem] h-[2.5rem]"
            />
            <div className="text-[1.2rem] pl-[0.25rem] font-bold">
              {loanDetailResult.providerName}
            </div>
          </div>
          <LoanSmallButton
            handleClick={handleClickToCompanyInfo}
            text="기업정보"
          />
        </div>
      </div>
      <div className="py-[0.6rem]" />
      <div className="w-customWidthPercent">
        <header className="flex flex-row items-center justify-between">
          <div className="font-bold text-[1.2rem] leading-[1.2rem] text-center">
            {loanDetailResult.productName}
          </div>
          <LikeButton
            isActive={likeButtonActive}
            handleClick={handleLikeClick}
            loanId={Number(loanId)}
            isLoan={true}
          />
        </header>
        <div className="flex flex-row items-center">
          {loanDetailResult.guaranteeAgencyName !== null && (
            <div className="inline-block text-[0.8rem] mt-[0.4rem] font-bold leading-[1.7rem] px-[1.2rem] h-[1.7rem] text-center bg-blue-1 text-white-1 rounded-lg">
              {loanDetailResult.guaranteeAgencyName} 보증
            </div>
          )}
        </div>
        <div className="text-blue-1 pt-[0.7rem] font-bold">
          {loanDetailResult.minInterestRate}~{loanDetailResult.maxInterestRate}%
        </div>
        <div className="text-grey-1 pt-[1.6rem]">
          {loanDetailResult.productDesc}
        </div>
        <div className="flex flex-row mt-[1.5rem] bg-grey-6 rounded-[10px]">
          <div className="flex flex-col w-[30%] items-center text-grey-1">
            <div className="pt-[1rem]">분류</div>
            <div className="pt-[1rem]">한도</div>
            <div className="pt-[1rem]">LTV</div>
            <div className="pt-[1rem]">기간</div>
            {/* <div className="py-[1rem]">우대조건</div> */}
          </div>
          <div className="flex flex-col w-[70%]">
            <div className="pt-[1rem]">{loanDetailResult.loanType}</div>
            <div className="pt-[1rem]">
              {formatLoanLimit(loanDetailResult.loanLimit)}
            </div>
            <div className="pt-[1rem]">
              {loanDetailResult.ltv === null ? (
                <div>없음</div>
              ) : (
                <div>{loanDetailResult.ltv}%</div>
              )}
            </div>
            <div className="py-[1rem]">
              {loanDetailResult.minTerm === null ? (
                <div>{Math.floor(loanDetailResult.maxTerm / 12)}년</div>
              ) : (
                <div>
                  {Math.floor(loanDetailResult.minTerm / 12)}년~{' '}
                  {Math.floor(loanDetailResult.maxTerm / 12)}년
                </div>
              )}
            </div>
            {/* <div className="py-[1rem]">신혼, 부부합산소득, 자녀여부</div> */}
          </div>
        </div>
      </div>
      <div className="w-[100%] flex justify-center absolute bottom-[1.7rem]">
        <LargeButton
          text="상세 보기"
          customWidth="w-customWidthPercent"
          isActive={0}
          handleClick={handleToBankUrl}
        />
      </div>
    </div>
  );
};

export default LoanDetail;
