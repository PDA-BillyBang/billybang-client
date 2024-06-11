// src/routes/user/LoginMain.tsx
import React from "react";
import FloatingInputForm1 from "../../components/common/form/FloatingInputForm1"; // 경로를 프로젝트 구조에 맞게 조정합니다.
import KaKaoBtn from "../../assets/image/icons/kakao.png";
import LargeButton from "../../components/common/button/LargeButton";

export default function Login() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="w-customWidthPercent font-bold text-[1.5rem] my-[7rem]">
        <div>원하는 매물을 찾고</div>
        <div>나에게 맞는 대출 상품을</div>
        <div>추천받아 볼까요?</div>
      </div>
      <div className="w-customWidthPercent flex-grow">
        <div className="bg-white-1 text-grey-2 text-[0.8rem]">
          먼저 로그인, 회원가입이 필요해요!
        </div>
        <FloatingInputForm1 text="이메일 주소를 입력해주세요"></FloatingInputForm1>
        <div className="my-4">
          <LargeButton
            text="계속하기"
            customWidth="w-full"
            isActive={0}
          ></LargeButton>
        </div>
      </div>

      <div className="mt-auto w-full flex flex-col items-center">
        <div className="flex w-customWidthPercent items-center mt-1">
          <div className="h-[1px] flex-1 mx-2 bg-grey-2"></div>
          <div className="mx-2 text-center text-grey-2 text-[0.8rem] p-2">
            간편 로그인
          </div>
          <div className="h-[1px] flex-1 mx-2 bg-grey-2"></div>
        </div>

        <div className="flex flex-col w-customWidthPercent mb-4">
          <button className="flex items-center justify-between h-[57px] bg-[#FEE500] border-none rounded-[5px] px-4">
            <img src={KaKaoBtn} alt="kakao" className="h-6" />
            <div className="text-center w-full">카카오로 시작하기</div>
          </button>
        </div>
      </div>
    </div>
  );
}
