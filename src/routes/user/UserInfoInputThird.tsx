import LargeButton from "@components/common/button/LargeButton";
import FloatingInputForm1 from "@components/common/form/FloatingInputForm1";
import ProgressBar from "@components/common/progressbar/ProgressBar";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function UserInfoInputThird() {
  const [marriageStatus, setMarriageStatus] = useState<boolean>(false);
  const [marriageYear, setMarriageYear] = useState<number>();
  const [child, setChild] = useState<number>();
  const [coupleSalary, setCoupleSalary] = useState<number>();
  const [coupleAssets, setCoupleAssets] = useState<number>();
  const [isActive, setIsActive] = useState<number>(3);

  const handleMarriageStatusChange = (value: string): void => {
    if (value === "marriage") {
      setMarriageStatus(true);
    } else {
      setMarriageStatus(false);
    }
  };

  const handleMarrageYear = (value: number | string): void => {
    if (value == "") setMarriageYear(undefined);
    else if (typeof value === "number") setMarriageYear(value);
  };

  const handleChild = (value: number | string): void => {
    if (value == "") setChild(undefined);
    else if (typeof value === "number") setChild(value);
  };

  const handleCoupleAssets = (value: number | string): void => {
    if (value == "") setCoupleAssets(undefined);
    else if (typeof value === "number") setCoupleAssets(value);
  };

  const handleCoupleSalary = (value: number | string): void => {
    if (value == "") setCoupleSalary(undefined);
    else if (typeof value === "number") setCoupleSalary(value);
  };

  const { setTitle } = useOutletContext<{
    setTitle: (title: string) => void;
  }>();

  useEffect(() => {
    setTitle("정보 입력");
  }, [setTitle]);

  useEffect(() => {
    console.log(child);
    if (validateInputs()) {
      setIsActive(0);
    } else {
      setIsActive(1);
    }
  }, [child, coupleAssets, coupleSalary, marriageStatus, marriageYear]);

  const validateInputs = (): boolean => {
    if (marriageStatus === true)
      return (
        typeof marriageYear === "number" &&
        marriageYear >= 1900 &&
        typeof child === "number" &&
        child >= 0 &&
        typeof coupleSalary === "number" &&
        coupleSalary >= 0 &&
        typeof coupleAssets === "number"
      );
    else {
      return true;
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center">
      <div className="flex flex-row mt-[3.5rem] w-full">
        <ProgressBar color={1} />
        <ProgressBar color={1} />
        <ProgressBar color={0} />
      </div>

      <div className="flex flex-col w-customWidthPercent mt-[2rem] mb-[1rem] text-grey-2 hover:text-[black]">
        <div className="text-[1.5rem] mb-2 font-bold">결혼 여부</div>
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 w-[50%] border rounded ${
              marriageStatus === false
                ? "bg-[black] text-[white]"
                : "bg-[white] text-grey-2"
            }`}
            onClick={() => handleMarriageStatusChange("solo")}
          >
            미혼
          </button>
          <button
            className={`px-4 py-2 w-[50%] border rounded ${
              marriageStatus === true
                ? "bg-[black] text-[white]"
                : "bg-[white] text-grey-2 "
            }`}
            onClick={() => handleMarriageStatusChange("marriage")}
          >
            기혼
          </button>
        </div>
      </div>

      {marriageStatus === true ? (
        <div className="flex flex-col w-customWidthPercent ">
          <div className="flex flex-col mt-[2rem] mb-[1rem]">
            <FloatingInputForm1
              type="number"
              title="혼인신고 연도"
              text="혼인신고를 한 연도를 입력해주세요"
              onChange={handleMarrageYear}
              validate={(value) => typeof value == "number" && value >= 1900}
              errorMessage="정확한 연도를 입력해주세요"
            />
          </div>

          <div className="flex flex-col mt-[2rem] mb-[1rem]">
            <FloatingInputForm1
              type="number"
              title="자녀 수"
              text="자녀의 수를 입력해주세요(명)"
              onChange={handleChild}
              validate={(value) => typeof value == "number" && value >= 0}
              errorMessage="정확한 수를 입력해주세요"
            />
          </div>

          <div className="flex flex-col mt-[2rem] mb-[1rem]">
            <FloatingInputForm1
              type="number"
              title="부부합산 연소득"
              text="부부합산 연소득을 입력해주세요 (원)"
              onChange={handleCoupleSalary}
              validate={(value) => typeof value == "number" && value >= 0}
              errorMessage="정확한 금액을 입력해주세요"
            />
          </div>

          <div className="flex flex-col t mt-[2rem] mb-[1rem]">
            <FloatingInputForm1
              type="number"
              title="부부합산 총 자산"
              text="자녀의 수를 입력해주세요 (원)"
              onChange={handleCoupleAssets}
              validate={(value) => typeof value == "number" && value >= 0}
              errorMessage="정확한 금액을 입력해주세요"
            />
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="mt-auto w-customWidthPercent flex gap-2 items-center mb-4">
        <LargeButton
          text="이전"
          customWidth="w-[50%]"
          isActive={3}
        ></LargeButton>
        <LargeButton
          text="다음"
          customWidth="w-[50%]"
          isActive={isActive}
        ></LargeButton>
      </div>
    </div>
  );
}
