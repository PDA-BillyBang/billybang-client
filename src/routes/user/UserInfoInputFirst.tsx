import LargeButton from "@components/common/button/LargeButton";
import RadioOption from "@components/common/button/RadioButton";
import FloatingInputForm1 from "@components/common/form/FloatingInputForm1";
import ProgressBar from "@components/common/progressbar/ProgressBar";
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

interface Props {
  pageNum: number;
  salary: number;
  assets: number;
  firstBuyerOption: string;
  loanOption: string;
  setPageNum: (value: number) => void;
  setSalary: (value: number) => void;
  setAssets: (value: number) => void;
  setFirstBuyerOption: (value: string) => void;
  setLoanOption: (value: string) => void;
}

export default function UserInfoInputFirst({
  pageNum,
  salary,
  assets,
  firstBuyerOption,
  loanOption,
  setPageNum,
  setSalary,
  setAssets,
  setFirstBuyerOption,
  setLoanOption,
}: Props) {
  const [isActive, setIsActive] = useState<number>(0);
  const { setTitle } = useOutletContext<{
    setTitle: (title: string) => void;
  }>();

  useEffect(() => {
    setTitle("정보 입력");
  }, [setTitle]);

  useEffect(() => {
    if (validateInputs()) {
      setIsActive(0);
    } else {
      setIsActive(3);
    }
  }, [salary, assets, firstBuyerOption, loanOption]);

  const validateInputs = (): boolean => {
    return (
      typeof salary === "number" &&
      salary >= 0 &&
      typeof assets === "number" &&
      assets >= 0 &&
      firstBuyerOption !== "" &&
      loanOption !== ""
    );
  };

  const handleSalaryChange = (value: string | number): void => {
    const numericValue: number =
      typeof value === "number" ? value : parseFloat(value);
    setSalary(numericValue);
  };

  const handleAssetsChange = (value: string | number): void => {
    const numericValue: number =
      typeof value === "number" ? value : parseFloat(value);
    setAssets(numericValue);
  };

  const handleFirstBuyerChange = (option: string): void => {
    setFirstBuyerOption(option);
  };

  const handleLoanChange = (option: string): void => {
    setLoanOption(option);
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
          type="number"
          title="연간소득금액"
          text="연간 소득 금액을 입력해주세요 (원)"
          value={undefined}
          onChange={handleSalaryChange}
          validate={(value) => typeof value == "number" && value >= 0}
          errorMessage="정확한 소득을 입력해주세요"
        />
      </div>

      <div className="flex flex-col w-customWidthPercent my-[1rem]">
        <FloatingInputForm1
          type="number"
          title="개인 보유자산"
          text="보유 자산을 입력해주세요 (원)"
          onChange={handleAssetsChange}
          validate={(value) =>
            typeof value === "number" && value >= 1 && value <= 10
          }
          errorMessage="잘못된 값을 입력하셨습니다"
        />
      </div>

      <div className="flex flex-col w-customWidthPercent my-[1rem] text-grey-2 hover:text-[black]">
        <div className="text-[1.5rem] font-bold">생애 최초 주택 구입자</div>
        <RadioOption
          id="firstBuyerYes"
          name="firstBuyerOption"
          value="Yes"
          selectedOption={firstBuyerOption}
          onChange={handleFirstBuyerChange}
          label="예"
        />
        <RadioOption
          id="firstBuyerNo"
          name="firstBuyerOption"
          value="No"
          selectedOption={firstBuyerOption}
          onChange={handleFirstBuyerChange}
          label="아니오"
        />
      </div>

      <div className="flex flex-col w-customWidthPercent text-grey-2 hover:text-[black]">
        <div className="text-[1.5rem] font-bold">대출 보유 여부</div>
        <RadioOption
          id="loanYes"
          name="loanOption"
          value="Yes"
          selectedOption={loanOption}
          onChange={handleLoanChange}
          label="예"
        />
        <RadioOption
          id="loanNo"
          name="loanOption"
          value="No"
          selectedOption={loanOption}
          onChange={handleLoanChange}
          label="아니오"
        />
      </div>

      <div className="mt-auto w-customWidthPercent flex flex-col items-center mb-4">
        <LargeButton
          text="계속하기"
          customWidth="w-full"
          isActive={isActive}
          handleClick={() => setPageNum(pageNum + 1)}
        />
      </div>
    </div>
  );
}
