import BottomDrawer from '@components/common/button/BottomDrawer';
import LargeButton from '@components/common/button/LargeButton';
import RadioOption from '@components/common/button/RadioButton';
import FloatingInputForm1 from '@components/common/form/FloatingInputForm1';
import ProgressBar from '@components/common/progressbar/ProgressBar';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

interface Props {
  pageNum: number;
  isForeign: boolean;
  occupation: string | undefined;
  employmentDuration: number | undefined;
  companySize: string | undefined;
  setPageNum: (value: number) => void;
  setIsForeign: (value: boolean) => void;
  setOccupation: (value: string | undefined) => void;
  setEmploymentDuration: (value: number | undefined) => void;
  setCompanySize: (value: string | undefined) => void;
}

export default function UserInfoInputSecond({
  isForeign,
  occupation,
  employmentDuration,
  companySize,
  pageNum,
  setIsForeign,
  setOccupation,
  setEmploymentDuration,
  setCompanySize,
  setPageNum,
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<number>(0);
  const [selectedJobLabel, setSelectedJobLabel] = useState<string>('');
  const handleClick = () => setIsOpen((prev) => !prev);
  const { setTitle } = useOutletContext<{
    setTitle: (title: string) => void;
  }>();

  const jobOptions = [
    ['일반직', 'GENERAL'],
    ['금융', 'FINANCE'],
    ['교육', 'EDUCATION'],
    ['공무원', 'PUBLIC'],
    ['의료', 'MEDICAL'],
    ['IT', 'IT'],
    ['서비스', 'SERVICE'],
    ['영업', 'SALES'],
    ['아트', 'ART'],
    ['법률', 'LEGAL'],
    ['기타', 'ETC'],
  ];

  useEffect(() => {
    setTitle('정보 입력');
  }, [setTitle]);

  useEffect(() => {
    checkValidity();
  }, [isForeign, occupation, employmentDuration]);

  useEffect(() => {
    if (occupation) {
      const jobLabel =
        jobOptions.find((job) => job[1] === occupation)?.[0] || '';
      setSelectedJobLabel(jobLabel);
    }
  }, [occupation]);

  const checkValidity = () => {
    const isSelectedJobValid = occupation !== undefined;
    if (isSelectedJobValid) {
      setIsActive(0);
    } else {
      setIsActive(1);
    }
  };

  const handleFirstBuyerChange = (option: boolean) => {
    setIsForeign(option);
  };

  const handleJobSelect = (job: string | undefined | boolean) => {
    const selectedJob = jobOptions.find((j) => j[0] === job);
    if (selectedJob) {
      setOccupation(selectedJob[1]);
      setSelectedJobLabel(selectedJob[0]);
    }
    setIsOpen(false);
  };

  const handleEmployPeriodChange = (month: number | string): void => {
    const numericValue: number =
      typeof month === 'string' ? parseFloat(month.replace(/,/g, '')) : month;
    if (isNaN(numericValue)) return setEmploymentDuration(0);
    return setEmploymentDuration(numericValue);
  };

  const handleCompanySize = (size: string | boolean | undefined) => {
    if (typeof size === 'string') setCompanySize(size);
    else if (size === undefined) setCompanySize(undefined);
  };

  const handleNextButtonClick = () => {
    if (isActive === 0) {
      setPageNum(pageNum + 1);
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center">
      <div className="flex flex-row mt-[4rem] w-full">
        <ProgressBar color={1} />
        <ProgressBar color={0} />
        <ProgressBar color={1} />
      </div>

      <div className="flex flex-col w-customWidthPercent mt-[2rem] mb-[1rem] text-grey-2 hover:text-[black]">
        <div className="text-[1.5rem] mb-2 font-bold">국적</div>
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 w-[50%] border rounded ${
              isForeign === false
                ? 'bg-[black] text-[white]'
                : 'bg-[white] text-grey-2'
            }`}
            onClick={() => handleFirstBuyerChange(false)}
          >
            내국인
          </button>
          <button
            className={`px-4 py-2 w-[50%] border rounded ${
              isForeign === true
                ? 'bg-[black] text-[white]'
                : 'bg-[white] text-grey-2 '
            }`}
            onClick={() => handleFirstBuyerChange(true)}
          >
            외국인
          </button>
        </div>
      </div>

      <div className="flex flex-col w-customWidthPercent my-[2rem] text-grey-2 hover:text-[black]">
        <div className="text-[1.5rem] font-bold mb-2">직업</div>
        <input
          id="selectedJob"
          type="text"
          value={selectedJobLabel || '카테고리 중 하나를 선택해주세요'}
          onClick={handleClick}
          onChange={() => {}}
          className="w-full h-[3rem] border-b border-grey-2 placeholder-grey-2 focus:outline-none focus:border-[black]"
          readOnly
        />
      </div>

      <div className="flex flex-col">
        <BottomDrawer isOpen={isOpen} handleClose={handleClick}>
          <div className="flex flex-col h-full justify-center">
            {jobOptions.map((job) => (
              <div key={job[1]} className="h-[3rem]">
                <RadioOption
                  id={job[0]}
                  name="jobOption"
                  value={job[0]}
                  selectedOption={selectedJobLabel || 'GENERAL'}
                  onChange={handleJobSelect}
                  label={job[0]}
                />
              </div>
            ))}
          </div>
        </BottomDrawer>
      </div>

      <div className="flex flex-col w-customWidthPercent mt-[2rem] mb-[1rem]">
        <FloatingInputForm1
          type="text"
          title="재직 기간"
          text="재직 기간을 숫자로 입력해주세요 (개월)"
          value={employmentDuration?.toLocaleString()}
          onChange={handleEmployPeriodChange}
          validate={() =>
            typeof employmentDuration === 'number' && employmentDuration >= 0
          }
          errorMessage="정확한 재직 기간을 입력해주세요"
          unit="개월"
        />
      </div>
      <div className="flex flex-col w-customWidthPercent mt-[2rem] text-grey-2 hover:text-[black]">
        <div className="text-[1.5rem] font-bold mb-2">기업 규모</div>
        <div className="h-[3rem]">
          <RadioOption
            id="smallCompany"
            name="companySizeOption"
            value="INTERMEDIATE"
            selectedOption={companySize}
            onChange={handleCompanySize}
            label="중소기업"
          />
        </div>
        <div className="h-[3rem]">
          <RadioOption
            id="majorCompany"
            name="companySizeOption"
            value="LARGE"
            selectedOption={companySize || 'LARGE'}
            onChange={handleCompanySize}
            label="대기업"
          />
        </div>
      </div>

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
