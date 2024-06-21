import LargeButton from '@components/common/button/LargeButton';
import RadioOption from '@components/common/button/RadioButton';
import FloatingInputForm1 from '@components/common/form/FloatingInputForm1';
import ProgressBar from '@components/common/progressbar/ProgressBar';
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

interface Props {
  pageNum: number;
  individualIncome: number | undefined;
  individualAssets: number | undefined;
  isFirstHouseBuyer: boolean;
  hasOtherLoans: boolean;
  setIsFirstHouseBuyer: (value: boolean) => void;
  setPageNum: (value: number) => void;
  setIndividualAssets: (value: number) => void;
  setIndividualIncome: (value: number) => void;
  setHasOtherLoans: (value: boolean) => void;
}

export default function UserInfoInputFirst({
  pageNum,
  individualIncome,
  individualAssets,
  isFirstHouseBuyer,
  hasOtherLoans,
  setPageNum,
  setIndividualIncome,
  setIndividualAssets,
  setIsFirstHouseBuyer,
  setHasOtherLoans,
}: Props) {
  const [isActive, setIsActive] = useState<number>(2);
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
  }, [individualIncome, individualAssets, isFirstHouseBuyer, hasOtherLoans]);

  const validateInputs = (): boolean => {
    return (
      individualIncome !== undefined &&
      typeof individualIncome === 'number' &&
      individualIncome >= 0 &&
      individualAssets !== undefined &&
      typeof individualAssets === 'number' &&
      individualAssets >= 0
    );
  };

  const handleSalaryChange = (value: string | number): void => {
    const numericValue: number =
      typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value;
    if (isNaN(numericValue)) return setIndividualIncome(0);
    return setIndividualIncome(numericValue);
  };

  const handleAssetsChange = (value: string | number): void => {
    const numericValue: number =
      typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value;
    if (isNaN(numericValue)) return setIndividualAssets(0);
    return setIndividualAssets(numericValue);
  };

  const handleFirstBuyerChange = (
    value: boolean | string | undefined
  ): void => {
    if (typeof value === 'boolean') setIsFirstHouseBuyer(value);
  };

  const handleHasOtherLoans = (option: boolean | string | undefined): void => {
    if (typeof option === 'boolean') setHasOtherLoans(option);
  };

  const handleClickButton = (): void => {
    if (isActive === 0) {
      setPageNum(pageNum + 1);
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center">
      <div className="flex flex-row mt-[4rem] w-full">
        <ProgressBar color={0} />
        <ProgressBar color={1} />
        <ProgressBar color={1} />
      </div>

      <div className="flex flex-col w-customWidthPercent mt-[2rem] mb-[1rem]">
        <FloatingInputForm1
          type="text"
          title="연간소득금액"
          text="연간 소득 금액을 입력해주세요 (원)"
          value={individualIncome?.toLocaleString()}
          onChange={handleSalaryChange}
          validate={() =>
            typeof individualIncome == 'number' && individualIncome >= 0
          }
          errorMessage="정확한 소득을 입력해주세요"
          unit="원"
        />
      </div>

      <div className="flex flex-col w-customWidthPercent my-[1rem]">
        <FloatingInputForm1
          type="text"
          title="개인 보유자산"
          text="보유 자산을 입력해주세요 (원)"
          value={individualAssets?.toLocaleString()}
          onChange={handleAssetsChange}
          validate={() =>
            typeof individualAssets === 'number' && individualAssets >= 0
          }
          errorMessage="정확한 자산을 입력해주세요"
          unit="원"
        />
      </div>

      <div className="flex flex-col w-customWidthPercent my-[1rem] text-grey-2 hover:text-[black]">
        <div className="text-[1.5rem] font-bold">생애 최초 주택 구입자</div>
        <RadioOption
          id="firstBuyerYes"
          name="firstBuyerOption"
          value={true}
          selectedOption={isFirstHouseBuyer}
          onChange={handleFirstBuyerChange}
          label="예"
        />
        <RadioOption
          id="firstBuyerNo"
          name="firstBuyerOption"
          value={false}
          selectedOption={isFirstHouseBuyer}
          onChange={handleFirstBuyerChange}
          label="아니오"
        />
      </div>

      <div className="flex flex-col w-customWidthPercent text-grey-2 hover:text-[black]">
        <div className="text-[1.5rem] font-bold">대출 보유 여부</div>
        <RadioOption
          id="loanYes"
          name="loanOption"
          value={false}
          selectedOption={hasOtherLoans}
          onChange={handleHasOtherLoans}
          label="예"
        />
        <RadioOption
          id="loanNo"
          name="loanOption"
          value={true}
          selectedOption={hasOtherLoans}
          onChange={handleHasOtherLoans}
          label="아니오"
        />
      </div>

      <div className="mt-auto w-customWidthPercent flex flex-col items-center mb-4">
        <LargeButton
          text="계속하기"
          customWidth="w-full"
          isActive={isActive}
          handleClick={handleClickButton}
        />
      </div>
    </div>
  );
}
