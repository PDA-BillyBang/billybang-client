import React, { useState } from 'react';
import LikeButton from '../common/button/LikeButton';
import { loanI } from '@/routes/loan/Loan';

type Props = {
  loanId?: number;
  handleClick?: (index: number) => void;
  likeActive?: boolean;
  isStarred?: boolean;
  loanLimit?: number;
  ltv?: number | null;
  maxInterestRate?: number;
  minInterestRate?: number;
  productDesc?: string;
  productName?: string;
  providerImgUrl?: string;
  providerName?: string;
};

export const formatLoanLimit = (loanLimit: number | undefined) => {
  if (loanLimit === undefined || loanLimit === null) return '';

  const billion = Math.floor(loanLimit / 100);
  const million = loanLimit % 100;

  let formattedLimit = '';

  if (billion > 0) {
    formattedLimit += `${billion}억`;
  }

  if (million > 0) {
    formattedLimit += ` ${million / 10}천만`;
  }

  formattedLimit += '원';

  return formattedLimit.trim();
};

export default function LoanCard({
  loanId,
  handleClick,
  likeActive = false,
  isStarred = true,
  loanLimit,
  ltv,
  maxInterestRate,
  minInterestRate,
  productDesc,
  productName = 'iTouch 전세론(주택금융보증)',
  providerImgUrl,
  providerName = '우리은행',
}: Props) {
  const [likeButtonActive, setLikeButtonActive] = useState<boolean>(isStarred);
  const handleLikeClick = () => {
    console.log('like loan card');
    setLikeButtonActive((prev) => !prev);
  };
  const truncateDescription = (desc: string) => {
    return desc.length > 40 ? desc.substring(0, 40) + '...' : desc;
  };

  const formattedLoanLimit = formatLoanLimit(loanLimit);

  return (
    <div
      onClick={() => loanId && handleClick && handleClick(loanId)}
      className="h-[180px] w-[100%] cursor-pointer bg-grey-6 rounded-[5px] hover:bg-grey-5"
    >
      <div className="px-[1rem] py-[0.5rem] flex flex-col">
        <div className="flex flex-row items-center justify-between w-[100%]">
          <img
            src={providerImgUrl}
            alt="Bank Test"
            className="w-[2.0rem] h-[2.0rem]"
          />
          <div className="px-[0.2rem]" />
          <div className="w-[85%] font-bold text-[1.3rem]">{providerName}</div>
          <LikeButton
            isActive={likeButtonActive}
            handleClick={handleLikeClick}
            isLoan={true}
            loanId={loanId}
          />
        </div>
        <div className="py-[0.2rem]" />
        <div className="flex flex-col justify-between">
          <div className="text-black-1 text-[1.1rem]">{productName}</div>
          <div className="py-[0.15rem]" />
          <div className="text-grey-1 text-[1.0rem]">
            {productDesc && truncateDescription(productDesc)}
          </div>
          <div className="py-[0.15rem]" />
          <div className="flex flex-row justify-between text-[0.9rem]">
            <div className="text-grey-1">
              {formattedLoanLimit} {ltv && ` | LTV ${ltv}%이내`}
            </div>
            <div className="font-bold text-blue-1">
              {minInterestRate}~{maxInterestRate}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
