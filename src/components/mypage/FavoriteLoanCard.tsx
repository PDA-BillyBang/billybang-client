import { loanI } from '@/routes/loan/Loan';
import { formatLoanLimit } from '@components/loan/LoanCard';
import { useNavigate } from 'react-router-dom';
type Props = { loan: loanI };

export default function FavoriteLoanCard({ loan }: Props) {
  const formattedLoanLimit = formatLoanLimit(loan.loanLimit);
  const navigate = useNavigate();
  const truncatedProductName =
    loan.productName.length > 10
      ? `${loan.productName.substring(0, 10)}...`
      : loan.productName;
  return (
    <div
      onClick={() => navigate('/loan/detail/' + loan.loanId)}
      className="w-[170px] h-[140px] rounded-[0.3rem] pl-[0.3rem] pt-[0.3rem] cursor-pointer flex flex-col hover:bg-grey-6 "
    >
      <div className="text-[0.9rem] font-bold">{truncatedProductName}</div>
      <div className="flex flex-row items-center pt-[0.3rem]">
        <img className="w-[15px] h-[15px]" src={loan.providerImgUrl} />
        <div className="pl-[0.2rem] text-[0.8rem] text-grey-1">
          {loan.providerName}
        </div>
      </div>
      <div className="py-[0.4rem] text-[0.8rem] font-bold text-blue-1">
        이자율 : {loan.minInterestRate}~{loan.maxInterestRate}%
      </div>
      <div className="flex flex-col">
        <div className="bg-grey-5 rounded-[10px] text-[0.7rem] h-[20px] leading-[20px] items-center justify-center text-center ">
          {formattedLoanLimit}
        </div>
        <div className="pb-[0.3rem]" />
        {loan.ltv !== null && (
          <div className="bg-grey-5 rounded-[10px] text-[0.7rem] h-[20px] leading-[20px] items-center justify-center text-center inline-block">
            LTV {loan.ltv}% 이내
          </div>
        )}
      </div>
    </div>
  );
}
