import React from 'react';
import FavoriteLoanCard from './FavoriteLoanCard';
import { LikeLoansI } from '@/routes/mypage/Mypage';
import { loanI } from '@/routes/loan/Loan';
type Props = { likeLoans: LikeLoansI };

export default function FavoriteLoans({ likeLoans }: Props) {
  return (
    <div className="w-[100%]">
      <div className="flex flex-row overflow-auto scroll-hidden">
        {likeLoans.loans.map((loan: loanI, index: number) => {
          return (
            <div key={index} className="mr-[0.4rem]">
              <FavoriteLoanCard loan={loan} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
