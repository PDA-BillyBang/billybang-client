import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import LargeButton from "../../components/common/button/LargeButton";
import Swal from "sweetalert2";
type Props = {};

export default function MypageEditName({}: Props) {
  const { setTitle } = useOutletContext<{
    setTitle: (title: string) => void;
  }>();

  const [nickname, setNickname] = useState("");

  useEffect(() => {
    setTitle("이름");
  }, [setTitle]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const handleSave = () => {
    // Add your save logic here
    console.log("Nickname saved:", nickname);
    Swal.fire({
      html: "<b>닉네임 수정 완료!</b>",
      //   text: "확인 버튼을 눌러주세요.",
      confirmButtonColor: "#004CC7",
      confirmButtonText: "확인",
    });
  };

  return (
    <div className="pt-[80px] w-[100%] flex flex-col items-center">
      <div className="w-customWidthPercent">
        <input
          type="text"
          value={nickname}
          onChange={handleInputChange}
          placeholder="닉네임을 입력하세요"
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
