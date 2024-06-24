import CompanyInfoTable from './CompanyInfoTable';
import { financialStatementsI } from '../LoanCompany';

type Props = { financialStatements: financialStatementsI[] };

export default function CompanyInfo({ financialStatements }: Props) {
  return (
    <div className="w-[100%]">
      <div className="py-[1rem]" />
      <CompanyInfoTable financialStatements={financialStatements} />
    </div>
  );
}
