import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import FloatingInputForm1 from "@components/common/form/FloatingInputForm1";
import LargeButton from "@components/common/button/LargeButton";

export default function LoginPwInput() {
  const [password, setPassword] = useState("");
  const { setTitle } = useOutletContext<{
    setTitle: (title: string) => void;
  }>();

  useEffect(() => {
    setTitle("로그인");
  }, [setTitle]);

  // 상태 업데이트 헬퍼 함수
  const handlePasswordChange = (value: string | number) => {
    if (typeof value === "string") {
      setPassword(value);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="w-customWidthPercent my-[7rem]">
        <FloatingInputForm1
          type="password"
          title="비밀번호 입력"
          text="8자리 이상 입력해주세요"
          value={password}
          onChange={handlePasswordChange}
          validate={(value) => typeof value === "string" && value.length >= 8}
          errorMessage="비밀번호는 8자리 이상이어야 합니다."
        />
      </div>
      <div className="mt-auto w-customWidthPercent flex flex-col items-center mb-4">
        {password.length >= 8 ? (
          <LargeButton text="계속하기" customWidth="w-full" isActive={0} />
        ) : (
          <LargeButton text="계속하기" customWidth="w-full" isActive={3} />
        )}
      </div>
    </div>
  );
}
