import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import LargeButton from "../../components/common/button/LargeButton";
import Swal from "sweetalert2";

type Props = {};

export default function MypageEditPW({}: Props) {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setPasswordConfirm] = useState("");
  const { setTitle } = useOutletContext<{
    setTitle: (title: string) => void;
  }>();

  useEffect(() => {
    setTitle("비밀번호");
  }, [setTitle]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setState(event.target.value);
  };

  const handleSave = () => {
    // Add your save logic here
    console.log("password saved:", password);
    console.log("password saved:", newPassword);
    console.log("password saved:", newPasswordConfirm);
    Swal.fire({
      html: "<b>비밀번호 수정 완료!</b>",
      //   text: "확인 버튼을 눌러주세요.",
      confirmButtonColor: "#004CC7",
      confirmButtonText: "확인",
    });
  };

  return (
    <div className="pt-[80px] w-[100%] flex flex-col items-center">
      <div className="w-customWidthPercent">
        <div className="font-bold text-[1rem]">현재 비밀번호</div>
        <input
          type="text"
          value={password}
          onChange={(e) => handleInputChange(e, setPassword)}
          placeholder="현재 비밀번호를 입력해주세요"
          className="w-full p-2 border-b-[0.1rem]  text-[1rem] focus:border-b-black-1 focus:border-b-[0.1rem] focus:outline-none border-grey-2"
        />
        <div className="my-[40px]" />
        <div className="font-bold text-[1rem]">새 비밀번호</div>
        <input
          type="text"
          value={newPassword}
          onChange={(e) => handleInputChange(e, setNewPassword)}
          placeholder="새 비밀번호를 입력해주세요"
          className="w-full p-2 border-b-[0.1rem]  text-[1rem] focus:border-b-black-1 focus:border-b-[0.1rem] focus:outline-none border-grey-2"
        />
        <div className="my-[20px]" />
        <div className="font-bold text-[1rem]">비밀번호 확인</div>
        <input
          type="text"
          value={newPasswordConfirm}
          onChange={(e) => handleInputChange(e, setPasswordConfirm)}
          placeholder="비밀번호를 다시 입력해주세요"
          className="w-full p-2 border-b-[0.1rem]  text-[1rem] focus:border-b-black-1 focus:border-b-[0.1rem] focus:outline-none border-grey-2"
        />
      </div>
      <div className="fixed bottom-0 pb-[20px] bg-white w-customWidthPercent">
        <LargeButton
          text="수정하기"
          isActive={3}
          customWidth="w-[100%]"
          handleClick={handleSave}
        />
      </div>
    </div>
  );
}
