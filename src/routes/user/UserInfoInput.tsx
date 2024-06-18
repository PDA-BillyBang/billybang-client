import React, { useState } from 'react';
import UserInfoInputFirst from './UserInfoInputFirst';
import UserInfoInputSecond from './UserInfoInputSecond';
import UserInfoInputThird from './UserInfoInputThird';
import UserInfoInputDone from './UserInfoInputDone';

export default function UserInfoInput() {
  //1페이지에 필요한 state
  const [pageNum, setPageNum] = useState<number>(1);
  const [salary, setSalary] = useState<number>();
  const [assets, setAssets] = useState<number>();
  const [firstBuyerOption, setFirstBuyerOption] = useState<string>('Yes');
  const [loanOption, setLoanOption] = useState<string>('Yes');

  //2페이지에 필요한 state
  const [nation, setNation] = useState<string>('local');
  const [selectedJob, setSelectedJob] = useState<string>();
  const [employPeriod, setEmployPeriod] = useState<number>();
  const [companySize, setCompanySize] = useState<string>();

  //3페이지에 필요한 state
  const [marriageStatus, setMarriageStatus] = useState<boolean>(false);
  const [marriageYear, setMarriageYear] = useState<number>();
  const [child, setChild] = useState<number>();
  const [coupleSalary, setCoupleSalary] = useState<number>();
  const [coupleAssets, setCoupleAssets] = useState<number>();

  const renderPage = () => {
    switch (pageNum) {
      case 1:
        return (
          <UserInfoInputFirst
            salary={salary}
            setSalary={setSalary}
            assets={assets}
            setAssets={setAssets}
            firstBuyerOption={firstBuyerOption}
            setFirstBuyerOption={setFirstBuyerOption}
            loanOption={loanOption}
            setLoanOption={setLoanOption}
            pageNum={pageNum}
            setPageNum={setPageNum}
          />
        );
      case 2:
        return (
          <UserInfoInputSecond
            nation={nation}
            setNation={setNation}
            selectedJob={selectedJob}
            setSelectedJob={setSelectedJob}
            employPeriod={employPeriod}
            setEmployPeriod={setEmployPeriod}
            companySize={companySize}
            setCompanySize={setCompanySize}
            pageNum={pageNum}
            setPageNum={setPageNum}
          />
        );
      case 3:
        return (
          <UserInfoInputThird
            marriageStatus={marriageStatus}
            setMarriageStatus={setMarriageStatus}
            marriageYear={marriageYear}
            setMarriageYear={setMarriageYear}
            child={child}
            setChild={setChild}
            coupleSalary={coupleSalary}
            setCoupleSalary={setCoupleSalary}
            coupleAssets={coupleAssets}
            setCoupleAssets={setCoupleAssets}
            pageNum={pageNum}
            setPageNum={setPageNum}
          />
        );
      case 4:
        return <UserInfoInputDone />;
      default:
        return null;
    }
  };

  return <div>{renderPage()}</div>;
}
