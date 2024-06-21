import React, { useState } from 'react';
import UserInfoInputFirst from './UserInfoInputFirst';
import UserInfoInputSecond from './UserInfoInputSecond';
import UserInfoInputThird from './UserInfoInputThird';
import UserInfoInputDone from './UserInfoInputDone';
import { registerAdditionalUserInfo } from '@/lib/apis/user';
import { useNavigate } from 'react-router-dom';
import { ErrorResponseI } from '@/utils/errorTypes';
import { AxiosError } from 'axios';

export default function UserInfoInput() {
  const navigate = useNavigate();

  //1페이지에 필요한 state
  const [pageNum, setPageNum] = useState<number>(1);
  const [individualIncome, setIndividualIncome] = useState<number>();
  const [individualAssets, setIndividualAssets] = useState<number>();
  const [isFirstHouseBuyer, setIsFirstHouseBuyer] = useState<boolean>(true);
  const [hasOtherLoans, setHasOtherLoans] = useState<boolean>(false);

  //2페이지에 필요한 state
  const [isForeign, setIsForeign] = useState<boolean>(false);
  const [occupation, setOccupation] = useState<string>();
  const [employmentDuration, setEmploymentDuration] = useState<number>();
  const [companySize, setCompanySize] = useState<string>();

  //3페이지에 필요한 state
  const [isMarried, setIsMarried] = useState<boolean>(false);
  const [yearsOfMarriage, setYearsOfMarriage] = useState<number>();
  const [childrenCount, setChildrenCount] = useState<number>();
  const [totalMarriedIncome, setTotalMarriedIncome] = useState<number>();
  const [totalMarriedAssets, setTotalMarriedAssets] = useState<number>();

  const AddUserInfo = async () => {
    try {
      await registerAdditionalUserInfo({
        occupation,
        companySize,
        employmentDuration,
        individualIncome,
        individualAssets,
        totalMarriedIncome,
        totalMarriedAssets,
        childrenCount,
        isForeign,
        isFirstHouseBuyer,
        isMarried,
        yearsOfMarriage,
        hasOtherLoans,
      });

      navigate('/'); // 로그인 성공 후 이동할 경로
    } catch (error: unknown) {
      const errorResponse = error as AxiosError<ErrorResponseI>;
      console.log(errorResponse);
      if (errorResponse.response && errorResponse.response.status === 500) {
        console.log(errorResponse.response.data.response.message);
      } else {
        console.error('로그인 에러:', error);
      }
    }
  };

  const renderPage = () => {
    switch (pageNum) {
      case 1:
        return (
          <UserInfoInputFirst
            individualIncome={individualIncome}
            setIndividualIncome={setIndividualIncome}
            individualAssets={individualAssets}
            setIndividualAssets={setIndividualAssets}
            isFirstHouseBuyer={isFirstHouseBuyer}
            setIsFirstHouseBuyer={setIsFirstHouseBuyer}
            hasOtherLoans={hasOtherLoans}
            setHasOtherLoans={setHasOtherLoans}
            pageNum={pageNum}
            setPageNum={setPageNum}
          />
        );
      case 2:
        return (
          <UserInfoInputSecond
            isForeign={isForeign}
            setIsForeign={setIsForeign}
            occupation={occupation}
            setOccupation={setOccupation}
            employmentDuration={employmentDuration}
            setEmploymentDuration={setEmploymentDuration}
            companySize={companySize}
            setCompanySize={setCompanySize}
            pageNum={pageNum}
            setPageNum={setPageNum}
          />
        );
      case 3:
        return (
          <UserInfoInputThird
            isMarried={isMarried}
            setIsMarried={setIsMarried}
            yearsOfMarriage={yearsOfMarriage}
            setYearsOfMarriage={setYearsOfMarriage}
            childrenCount={childrenCount}
            setChildrenCount={setChildrenCount}
            totalMarriedIncome={totalMarriedIncome}
            setTotalMarriedIncome={setTotalMarriedIncome}
            totalMarriedAssets={totalMarriedAssets}
            setTotalMarriedAssets={setTotalMarriedAssets}
            pageNum={pageNum}
            setPageNum={setPageNum}
            AddUserInfo={AddUserInfo}
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
