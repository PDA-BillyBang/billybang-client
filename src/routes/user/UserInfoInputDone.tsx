import LargeButton from "@components/common/button/LargeButton";
import doubleWhiteRight from "images/doubleWhiteRight.svg";
import check from "images/check.png";
export default function UserInfoInputDone() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center flex-grow">
        <img className="w-[12rem]" src={check} alt="Check icon" />
        <div className="font-semibold text-[1.5rem]">정보입력 완료!</div>
      </div>

      <div className="mt-auto w-customWidthPercent flex flex-col items-center mb-4">
        <LargeButton
          text="나에게 맞는 대출 상품 보러가기"
          customWidth="w-full"
          isActive={3}
          image={doubleWhiteRight}
        />
      </div>
    </div>
  );
}
