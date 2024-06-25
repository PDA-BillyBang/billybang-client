import { useEffect, useState } from 'react';
import UserInfoInputFirst from './UserInfoInputFirst';
import UserInfoInputSecond from './UserInfoInputSecond';
import UserInfoInputThird from './UserInfoInputThird';
import UserInfoInputDone from './UserInfoInputDone';
import {
  getUserInfo,
  registerAdditionalUserInfo,
  updateUserInfo,
} from '@/lib/apis/user';
import { Params, useParams } from 'react-router-dom';
import { ErrorResponseI } from '@/utils/errorTypes';
import { AxiosError } from 'axios';

export default function UserInfoInput() {
  const { option } = useParams<Params>();

  useEffect(() => {}, [option]);

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
  const [yearOfMarriage, setYearOfMarriage] = useState<number>();
  const [childrenCount, setChildrenCount] = useState<number>();
  const [totalMarriedIncome, setTotalMarriedIncome] = useState<number>();
  const [totalMarriedAssets, setTotalMarriedAssets] = useState<number>();

  useEffect(() => {
    if (option === '1') {
      const fetchUserInfo = async () => {
        try {
          const response = await getUserInfo();
          const userInfo = response.data.response.userInfo;
          console.log(userInfo);
          setIndividualAssets(userInfo.individualAssets);
          setIndividualIncome(userInfo.individualIncome);
          setIsFirstHouseBuyer(userInfo.isFirstHouseBuyer);
          setHasOtherLoans(userInfo.hasOtherLoans);

          setIsForeign(userInfo.isForeign);
          setOccupation(userInfo.occupation);
          setEmploymentDuration(userInfo.employmentDuration);
          setCompanySize(userInfo.companySize);

          setIsMarried(userInfo.isMarried);
          setYearOfMarriage(userInfo.yearOfMarriage);
          setChildrenCount(userInfo.childrenCount);
          setTotalMarriedAssets(userInfo.totalMarriedAssets);
          setTotalMarriedIncome(userInfo.totalMarriedIncome);
        } catch (error) {
          console.error('Failed to fetch user info:', error);
        }
      };

      fetchUserInfo();
    }
  }, []);

  const AddOrUpdateUserInfo = async () => {
    try {
      const data = {
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
        yearOfMarriage,
        hasOtherLoans,
      };
      if (option === '2') {
        await registerAdditionalUserInfo(data);
      } else if (option === '1') {
        await updateUserInfo(data);
      }
    } catch (error: unknown) {
      const errorResponse = error as AxiosError<ErrorResponseI>;
      console.log(errorResponse);
      if (errorResponse.response && errorResponse.response.status === 500) {
        console.log(errorResponse.response.data.response.message);
      } else {
        console.error('정보 입력 실패:', error);
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
            yearOfMarriage={yearOfMarriage}
            setYearOfMarriage={setYearOfMarriage}
            childrenCount={childrenCount}
            setChildrenCount={setChildrenCount}
            totalMarriedIncome={totalMarriedIncome}
            setTotalMarriedIncome={setTotalMarriedIncome}
            totalMarriedAssets={totalMarriedAssets}
            setTotalMarriedAssets={setTotalMarriedAssets}
            pageNum={pageNum}
            setPageNum={setPageNum}
            AddUserInfo={AddOrUpdateUserInfo}
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
