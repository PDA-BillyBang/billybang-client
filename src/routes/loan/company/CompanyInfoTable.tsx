import React from 'react';
import { financialStatementsI } from '../LoanCompany';

type Props = { financialStatements: financialStatementsI[] };

const transformData = (financialStatements: financialStatementsI[]) => {
  const years = financialStatements.map((statement) => statement.year);
  const salesAmount = [
    '매출액',
    ...financialStatements.map((statement) => statement.salesAmount),
  ];
  const businessProfit = [
    '영업이익',
    ...financialStatements.map((statement) => statement.businessProfit),
  ];
  const netProfit = [
    '당기손이익',
    ...financialStatements.map((statement) => statement.netProfit),
  ];
  const totalLiabilities = [
    '부채총계',
    ...financialStatements.map((statement) => statement.totalLiabilities),
  ];
  const totalCapital = [
    '자본총계',
    ...financialStatements.map((statement) => statement.totalCapital),
  ];
  const totalAssets = [
    '자산총계',
    ...financialStatements.map((statement) => statement.totalAssets),
  ];

  return {
    headers: ['구분', ...years.map((year) => `${year}`)],
    rows: [
      salesAmount,
      businessProfit,
      netProfit,
      totalLiabilities,
      totalCapital,
      totalAssets,
    ],
  };
};

export default function CompanyInfoTable({ financialStatements }: Props) {
  const { headers, rows } = transformData(financialStatements);

  return (
    <div className="w-[100%] flex flex-col">
      <div className="flex flex-row items-stretch text-[0.9rem]">
        {headers.map((header, index) => (
          <div
            key={index}
            className="text-center w-[25%] bg-grey-6 py-[0.3rem]"
          >
            {header}
          </div>
        ))}
      </div>
      {rows.map((row, rowIndex) => (
        <div
          className="flex flex-row items-stretch text-[0.9rem]"
          key={rowIndex}
        >
          {row.map((cell, cellIndex) => (
            <div className="text-center w-[25%] py-[0.3rem]" key={cellIndex}>
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
