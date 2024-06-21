import LargeButton from '@components/common/button/LargeButton';
import FloatingInputForm1 from '@components/common/form/FloatingInputForm1';
import ProgressBar from '@components/common/progressbar/ProgressBar';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

interface Props {
  isMarried: boolean;
  yearsOfMarriage: number | undefined;
  childrenCount: number | undefined;
  totalMarriedIncome: number | undefined;
  totalMarriedAssets: number | undefined;
  pageNum: number;
  setYearsOfMarriage: (value: number | undefined) => void;
  setIsMarried: (value: boolean) => void;
  setChildrenCount: (value: number | undefined) => void;
  setTotalMarriedIncome: (value: number | undefined) => void;
  setTotalMarriedAssets: (value: number | undefined) => void;
  setPageNum: (value: number) => void;
  AddUserInfo: () => Promise<void>; // AddUserInfo 타입 정의 추가
}

export default function UserInfoInputThird({
  pageNum,
  isMarried,
  yearsOfMarriage,
  childrenCount,
  totalMarriedIncome,
  totalMarriedAssets,
  setIsMarried,
  setYearsOfMarriage,
  setChildrenCount,
  setPageNum,
  setTotalMarriedIncome,
  setTotalMarriedAssets,
  AddUserInfo,
}: Props) {
  const [isActive, setIsActive] = useState<number>(3);

  const handleMarriageStatusChange = (value: string): void => {
    if (value === 'marriage') {
      setIsMarried(true);
    } else {
      setIsMarried(false);
    }
  };

  const handleMarrageYear = (value: number | string): void => {
    const numericValue: number =
      typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value;
    if (isNaN(numericValue)) return setYearsOfMarriage(undefined);
    return setYearsOfMarriage(numericValue);
  };

  const handleChild = (value: number | string): void => {
    const numericValue: number =
      typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value;
    if (isNaN(numericValue)) return setChildrenCount(0);
    return setChildrenCount(numericValue);
  };

  const handleCoupleAssets = (value: number | string): void => {
    const numericValue: number =
      typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value;
    if (isNaN(numericValue)) return setTotalMarriedAssets(0);
    return setTotalMarriedAssets(numericValue);
  };

  const handleTotalMarriageIncome = (value: number | string): void => {
    const numericValue: number =
      typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value;
    if (isNaN(numericValue)) return setTotalMarriedIncome(0);
    return setTotalMarriedIncome(numericValue);
  };

  const { setTitle } = useOutletContext<{
    setTitle: (title: string) => void;
  }>();

  useEffect(() => {
    setTitle('정보 입력');
  }, [setTitle]);

  useEffect(() => {
    if (validateInputs()) {
      setIsActive(0);
    } else {
      setIsActive(1);
    }
  }, [
    childrenCount,
    totalMarriedAssets,
    totalMarriedIncome,
    isMarried,
    yearsOfMarriage,
  ]);

  const handleNextButtonClick = () => {
    if (isActive === 0) {
      AddUserInfo();
      setPageNum(pageNum + 1);
    }
  };

  const validateInputs = (): boolean => {
    if (isMarried === true)
      return (
        typeof yearsOfMarriage === 'number' &&
        yearsOfMarriage >= 1900 &&
        typeof childrenCount === 'number' &&
        childrenCount >= 0 &&
        typeof totalMarriedIncome === 'number' &&
        totalMarriedIncome >= 0 &&
        typeof totalMarriedAssets === 'number'
      );
    else {
      return true;
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center">
      <div className="flex flex-row mt-[4rem] w-full">
        <ProgressBar color={1} />
        <ProgressBar color={1} />
        <ProgressBar color={0} />
      </div>

      <div className="flex flex-col w-customWidthPercent mt-[2rem] mb-[1rem] text-grey-2 hover:text-[black]">
        <div className="text-[1.5rem] mb-2 font-bold">결혼 여부</div>
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 w-[50%] border rounded ${
              isMarried === false
                ? 'bg-[black] text-[white]'
                : 'bg-[white] text-grey-2'
            }`}
            onClick={() => handleMarriageStatusChange('solo')}
          >
            미혼
          </button>
          <button
            className={`px-4 py-2 w-[50%] border rounded ${
              isMarried === true
                ? 'bg-[black] text-[white]'
                : 'bg-[white] text-grey-2 '
            }`}
            onClick={() => handleMarriageStatusChange('marriage')}
          >
            기혼
          </button>
        </div>
      </div>

      {isMarried === true ? (
        <div className="flex flex-col w-customWidthPercent overflow-y-auto max-h-[60vh]">
          <div className="flex flex-col mt-[2rem] mb-[1rem]">
            <FloatingInputForm1
              type="text"
              title="혼인신고 연도"
              text="혼인신고를 한 연도를 입력해주세요"
              value={yearsOfMarriage}
              onChange={handleMarrageYear}
              validate={() =>
                typeof yearsOfMarriage == 'number' && yearsOfMarriage >= 1900
              }
              errorMessage="정확한 연도를 입력해주세요"
              unit="년"
            />
          </div>

          <div className="flex flex-col mt-[2rem] mb-[1rem]">
            <FloatingInputForm1
              type="text"
              title="자녀 수"
              text="자녀의 수를 입력해주세요(명)"
              value={childrenCount}
              onChange={handleChild}
              validate={() =>
                typeof childrenCount == 'number' && childrenCount >= 0
              }
              errorMessage="정확한 수를 입력해주세요"
              unit="명"
            />
          </div>

          <div className="flex flex-col mt-[2rem] mb-[1rem]">
            <FloatingInputForm1
              type="text"
              title="부부합산 연소득"
              text="부부합산 연소득을 입력해주세요 (원)"
              value={totalMarriedIncome?.toLocaleString()}
              onChange={handleTotalMarriageIncome}
              validate={() =>
                typeof totalMarriedIncome == 'number' && totalMarriedIncome >= 0
              }
              errorMessage="정확한 연소득을 입력해주세요"
              unit="원"
            />
          </div>

          <div className="flex flex-col t mt-[2rem] mb-[1rem]">
            <FloatingInputForm1
              type="text"
              title="부부합산 총 자산"
              text="자녀의 수를 입력해주세요 (원)"
              value={totalMarriedAssets?.toLocaleString()}
              onChange={handleCoupleAssets}
              validate={(value) => typeof value == 'number' && value >= 0}
              errorMessage="정확한 금액을 입력해주세요"
              unit="원"
            />
          </div>
        </div>
      ) : (
        ''
      )}

      <div className="mt-auto w-customWidthPercent flex gap-2 items-center mb-4">
        <LargeButton
          text="이전"
          customWidth="w-[50%]"
          isActive={4}
          handleClick={() => setPageNum(pageNum - 1)}
        ></LargeButton>
        <LargeButton
          text="다음"
          customWidth="w-[50%]"
          isActive={isActive}
          handleClick={handleNextButtonClick}
        ></LargeButton>
      </div>
    </div>
  );
}
