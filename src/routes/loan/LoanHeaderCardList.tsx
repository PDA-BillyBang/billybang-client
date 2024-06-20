import React from 'react';
import { loanCategoriesI } from './Loan';
import LoanHeader from '@components/loan/LoanHeader';
import LoanCard from '@components/loan/LoanCard';
import { useNavigate } from 'react-router-dom';

type Props = { loanCategory: loanCategoriesI };

export default function LoanHeaderCardList({ loanCategory }: Props) {
  const navigate = useNavigate();
  return (
    <div className="w-[100%]">
      <LoanHeader
        text={loanCategory.loanType}
        count={loanCategory.loans.length}
      />
      <div className="pt-[1rem]" />
      {loanCategory.loans.map((loan, index) => {
        const handleClick = (loanId: number) => {
          navigate('/loan/detail/' + loanId);
        };
        return (
          <div key={index} className="pb-[1rem]">
            <LoanCard
              handleClick={() => handleClick(loan.loanId)}
              providerName={loan.providerName}
              isStarred={loan.isStarred}
              loanId={loan.loanId}
              providerImgUrl={loan.providerImgUrl}
              productDesc={loan.productDesc}
              loanLimit={loan.loanLimit}
              ltv={loan.ltv}
              minInterestRate={loan.minInterestRate}
              productName={loan.productName}
              maxInterestRate={loan.maxInterestRate}
            />
          </div>
        );
      })}
    </div>
  );
}
