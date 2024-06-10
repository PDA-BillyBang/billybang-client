import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import bankTest from "../../assets/image/test/bank-test.png";
import filledLike from "../../assets/image/icons/filledLike.svg";
import check from "../../assets/image/icons/check.svg";
import LoanSmallButton from "./LoanSmallButton";
import LargeButton from "../../components/common/button/LargeButton";
import { useNavigate } from "react-router-dom";

const LoanDetail = () => {
  const { setTitle } = useOutletContext<{
    setTitle: (title: string) => void;
  }>();

  const navigate = useNavigate();

  useEffect(() => {
    setTitle("상품상세");
  }, [setTitle]);

  const handleToBankUrl = () => {
    window.open(
      "https://www.kebhana.com/cont/mall/mall08/mall0802/mall080202/1501583_115196.jsp?_menuNo=98786"
    );
  };

  const handleClickToCompanyInfo = () => {
    navigate("/loan/company/123");
  };

  return (
    <div className="flex flex-col items-center ">
      <div className="py-[0.5rem]" />
      <div className=" w-customWidthPercent">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center">
            <img src={bankTest} className="w-[2.5rem] h-[2.5rem]" />
            <div className="text-[1.2rem] pl-[0.25rem]">우리은행</div>
          </div>
          <LoanSmallButton
            handleClick={handleClickToCompanyInfo}
            text="기업정보"
          />
        </div>
      </div>
      <div className="py-[0.6rem]" />
      <div className="w-customWidthPercent">
        <header className="flex flex-row items-center justify-between ">
          <div className="font-bold text-[1.2rem] leading-[1.2rem] text-center">
            iTouch 전세론(주택금융보증)
          </div>
          <img src={filledLike} className="w-[25px] h-[25px]" />
        </header>
        <div className="flex flex-row items-center">
          <div className="w-[1.3rem] h-[1.3rem] bg-blue-1 rounded-full flex items-center justify-center">
            <img src={check} className="w-[1rem] h-[1rem] " />
          </div>
          <div className="pb-[2rem]" />
          <div className="pl-[0.4rem] leading-[0.8rem] text-[1rem]">
            HF 보증
          </div>
        </div>
        <div className="text-red-1 pt-[0.7rem] font-bold">2.3~3.5%</div>
        <div className="text-grey-1 pt-[1.6rem]">
          주택금융공사 주택신용보증서 담보(90%보증)로 영업점 방문없이 인터넷상담
          및 대출 실행이 가능한 전세대출
        </div>
        <div className="flex flex-row mt-[1.5rem] bg-grey-6 rounded-[10px]">
          <div className="flex flex-col w-[30%] items-center text-grey-1">
            <div className="pt-[1rem]">분류</div>
            <div className="pt-[1rem]">한도</div>
            <div className="pt-[1rem]">LTV</div>
            <div className="pt-[1rem]">기간</div>
            <div className="py-[1rem]">우대조건</div>
          </div>
          <div className="flex flex-col w-[70%]">
            <div className="pt-[1rem]">주택담보대출</div>
            <div className="pt-[1rem]">2억원</div>
            <div className="pt-[1rem]">70%</div>
            <div className="pt-[1rem]">1년~ 10년</div>
            <div className="py-[1rem]">신혼, 부부합산소득, 자녀여부</div>
          </div>
        </div>
      </div>
      <div className="w-[100%] flex justify-center absolute bottom-[1.7rem]">
        <LargeButton
          text="상세 보기"
          customWidth="w-customWidthPercent"
          isActive={0}
          handleClick={handleToBankUrl}
        />
      </div>
    </div>
  );
};

export default LoanDetail;
