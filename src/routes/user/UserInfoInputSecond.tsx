import BottomDrawer from '@components/common/button/BottomDrawer';
import LargeButton from '@components/common/button/LargeButton';
import RadioOption from '@components/common/button/RadioButton';
import FloatingInputForm1 from '@components/common/form/FloatingInputForm1';
import ProgressBar from '@components/common/progressbar/ProgressBar';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

interface Props {
  pageNum: number;
  nation: string;
  selectedJob: string | undefined;
  employPeriod: number | undefined;
  companySize: string | undefined;
  setPageNum: (value: number) => void;
  setNation: (value: string) => void;
  setSelectedJob: (value: string | undefined) => void;
  setEmployPeriod: (value: number | undefined) => void;
  setCompanySize: (value: string | undefined) => void;
}

export default function UserInfoInputSecond({
  nation,
  selectedJob,
  employPeriod,
  companySize,
  pageNum,
  setNation,
  setSelectedJob,
  setEmployPeriod,
  setCompanySize,
  setPageNum,
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<number>(0);
  const handleClick = () => setIsOpen((prev) => !prev);
  const { setTitle } = useOutletContext<{
    setTitle: (title: string) => void;
  }>();

  useEffect(() => {
    setTitle('정보 입력');
  }, [setTitle]);

  useEffect(() => {
    checkValidity();
  }, [nation, selectedJob, employPeriod]);

  const checkValidity = () => {
    const isSelectedJobValid = selectedJob !== undefined;
    if (isSelectedJobValid) {
      setIsActive(0);
    } else {
      setIsActive(1);
    }
  };

  const handleFirstBuyerChange = (option: string) => {
    setNation(option);
  };

  const handleJobSelect = (job: string) => {
    setSelectedJob(job);
    setIsOpen(false);
  };

  const handleEmployPeriodChange = (month: number | string): void => {
    const numericValue: number =
      typeof month === 'string' ? parseFloat(month.replace(/,/g, '')) : month;
    if (isNaN(numericValue)) return setEmployPeriod(0);
    return setEmployPeriod(numericValue);
  };

  const handleCompanySize = (size: string) => {
    setCompanySize(size);
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
              nation === 'local'
                ? 'bg-[black] text-[white]'
                : 'bg-[white] text-grey-2'
            }`}
            onClick={() => handleFirstBuyerChange('local')}
          >
            내국인
          </button>
          <button
            className={`px-4 py-2 w-[50%] border rounded ${
              nation === 'foreigner'
                ? 'bg-[black] text-[white]'
                : 'bg-[white] text-grey-2 '
            }`}
            onClick={() => handleFirstBuyerChange('foreigner')}
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
          value={selectedJob ? selectedJob : '카테고리중 하나를 선택해주세요'}
          onClick={handleClick}
          className="w-full h-[3rem] border-b border-grey-2 placeholder-grey-2 focus:outline-none focus:border-[black]"
        />
      </div>

      <div className="flex flex-col">
        <BottomDrawer isOpen={isOpen} handleClose={handleClick}>
          <div className="flex flex-col h-full justify-center">
            {[
              '무직',
              '회계사',
              '회사원',
              '공무원',
              '변호사',
              '의사',
              '기타',
            ].map((job) => (
              <div key={job} className="h-[3rem]">
                <RadioOption
                  id={job}
                  name="jobOption"
                  value={job}
                  selectedOption={selectedJob}
                  onChange={handleJobSelect}
                  label={job}
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
          value={employPeriod?.toLocaleString()}
          onChange={handleEmployPeriodChange}
          validate={() => typeof employPeriod == 'number' && employPeriod >= 0}
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
            value="중소기업"
            selectedOption={companySize}
            onChange={handleCompanySize}
            label="중소기업"
          />
        </div>
        <div className="h-[3rem]">
          <RadioOption
            id="majorCompany"
            name="companySizeOption"
            value="대기업"
            selectedOption={companySize}
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
