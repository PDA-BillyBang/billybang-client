import React, { useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import bankTest from '../../assets/image/test/bank-test.png';
import upArrow from '../../assets/image/icons/upArrow.svg';
import downArrow from '../../assets/image/icons/downArrow.svg';
import LoanSmallButton from './LoanSmallButton';
import SelectHeader from '../../components/common/header/SelectHeader';
import { useState } from 'react';
import CompanyEvaluation from './company/CompanyEvaluation';
import CompanyInfo from './company/CompanyInfo';
import { getLoanProviderById } from '@/lib/apis/loan';
import { Spinner } from 'flowbite-react';

export interface financialIndicatorsI {
  avgValue: number;
  grade: string;
  name: string;
  value: number;
}

interface providerOverviewI {
  businessProfit: string;
  creditLevel: string;
  employeeCount: string;
  establishedAt: string;
  financialTier: number;
  imgUrl: string;
  industryDetail: string;
  netProfit: string;
  providerName: string;
  providerSize: string;
  providerType: string;
  representativeName: string;
  salesAmount: string;
}

export interface financialStatementsI {
  businessProfit: string;
  id: number;
  netProfit: string;
  salesAmount: string;
  totalAssets: string;
  totalCapital: string;
  totalLiabilities: string;
  year: number;
}

const LoanCompany = () => {
  const { setTitle } = useOutletContext<{
    setTitle: (title: string) => void;
  }>();
  const { companyId } = useParams<{ companyId: string }>();

  const [selectActive, setSelectActive] = useState<number>(0);
  const [arrowActive, setArrowActive] = useState<boolean>(true);
  const [financialIndicators, setFinancialIndicators] =
    useState<financialIndicatorsI[]>();
  const [providerOverview, setProviderOverview] = useState<providerOverviewI>();
  const [financialStatements, setFinancialStatements] =
    useState<financialStatementsI[]>();
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  const handleLoanProviderById = async () => {
    try {
      if (!companyId) return;
      const result = await getLoanProviderById(Number(companyId));
      console.log('[SUCCESS]', result.data.response);
      setFinancialIndicators(result.data.response.financialIndicators);
      setProviderOverview(result.data.response.providerOverview);
      setFinancialStatements(result.data.response.financialStatements);
    } catch (error) {
      console.log('[ERROR]', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectActive = (index: number) => {
    setSelectActive(index);
  };

  const handleArrowActive = () => {
    setArrowActive((prev) => !prev);
  };

  useEffect(() => {
    setTitle('회사정보');
  }, [setTitle]);

  useEffect(() => {
    handleLoanProviderById();
  }, []);

  const keyArray = [
    '대표자',
    '설립일',
    '기업규모',
    '기업형태',
    '매출액',
    '영업이익',
    '당기손익',
    '신용등급',
    '사원수',
    '상세업종',
  ];
  const valueArray = providerOverview
    ? [
        providerOverview.representativeName,
        providerOverview.establishedAt,
        providerOverview.providerSize,
        providerOverview.providerType,
        providerOverview.salesAmount,
        providerOverview.businessProfit,
        providerOverview.netProfit,
        providerOverview.creditLevel,
        providerOverview.employeeCount,
        providerOverview.industryDetail,
      ]
    : [];

  const visibleItemsCount = arrowActive ? 4 : keyArray.length;

  if (loading) {
    return (
      <div className="flex items-center justify-center mt-[100px] h-full">
        <div role="status" className="max-w-sm animate-pulse">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-[100%] mt-[50px]">
      <div className="flex flex-col w-customWidthPercent mt-[1rem]">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center">
            <img
              src={providerOverview && providerOverview.imgUrl}
              className="w-[2.5rem] h-[2.5rem]"
            />
            <div className="text-[1.2rem] pl-[0.5rem] font-bold">
              {providerOverview && providerOverview.providerName}
            </div>
          </div>
          <LoanSmallButton
            text={
              providerOverview
                ? String(providerOverview.financialTier) + '금융권'
                : ''
            }
          />
        </div>
        <div className="mt-[1rem] text-[1.1rem] font-bold mb-[0.5rem]">
          기본정보
        </div>
        <div className="flex flex-col items-center bg-grey-6 py-[0.9rem]">
          {keyArray
            .slice(0, visibleItemsCount)
            .map((key: string, index: number) => (
              <div
                key={index}
                className="text-[0.9rem] py-[0.1rem] flex flex-row w-[90%] border-b-grey-1 border-b-[0.05rem]"
              >
                <div className="w-[30%] text-center text-grey-1">{key}</div>
                <div className="w-[70%] text-center">{valueArray[index]}</div>
              </div>
            ))}
          <div>
            <img
              src={arrowActive ? upArrow : downArrow}
              alt="upArrow"
              className="w-[1.5rem] h-[1.5rem] mt-[0.3rem] cursor-pointer"
              onClick={handleArrowActive}
            />
          </div>
        </div>
        <div className="pt-[1rem]" />
        <SelectHeader
          customWidth="w-[100%]"
          selectActive={selectActive}
          handleClick={handleSelectActive}
          leftText="재무제표"
          rightText="재무평가"
        />
        {selectActive === 0 && financialStatements ? (
          <CompanyInfo financialStatements={financialStatements} />
        ) : (
          financialIndicators && (
            <CompanyEvaluation financialIndicators={financialIndicators} />
          )
        )}
        <div className="pb-[1rem]" />
      </div>
    </div>
  );
};

export default LoanCompany;
