import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import LoanCard from '../../components/loan/LoanCard';
import LoanHeader from '../../components/loan/LoanHeader';
import { useNavigate } from 'react-router-dom';
import { getLikeLoans } from '@/lib/apis/loan';
import { loanCategoriesI } from '../loan/Loan';

export default function MypageLoan() {
  const navigate = useNavigate();
  const [likeLoans, setLikeLoans] = useState<loanCategoriesI[]>([]);
  const { setTitle } = useOutletContext<{
    setTitle: (title: string) => void;
  }>();

  const handleGetLikeLoans = async () => {
    try {
      const result = await getLikeLoans();
      console.log('LIKE LOANS', result.data.response);
      setLikeLoans(result.data.response);
    } catch (error) {
      console.log('[ERROR]', error);
    }
  };

  useEffect(() => {
    handleGetLikeLoans();
  }, []);

  useEffect(() => {
    setTitle('찜한 대출상품');
  }, [setTitle]);

  const handleClickLoanId = (loanId: number) =>
    navigate('/loan/detail/' + loanId);

  const data = [1, 2, 3, 6, 7];
  return (
    <div className="pt-[80px] w-[100%] flex flex-col items-center">
      <div className="w-customWidthPercent">
        {likeLoans.map((value, index) => {
          return value.loans.map((loan, idx) => {
            const handleClick = (loanId: number) => {
              navigate('/loan/detail/' + loanId);
            };
            return (
              <div key={idx} className="mb-[0.7rem]">
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
          });
        })}
        <div className="py-[1rem]" />
      </div>
    </div>
  );
}
