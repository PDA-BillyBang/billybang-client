import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import setting from "../../../assets/image/icons/setting.svg";

type Props = {};

export default function MyHeader({}: Props) {
  const [title, setTitle] = useState("");
  return (
    <div className="w-[100%] flex flex-col items-center">
      <div className="flex absolute top-0 flex-row justify-between bg-white-1 w-[100%] items-center">
        <div className="text-[2rem] font-CWDangamAsac-Bold text-dark-blue-1 mx-2">
          빌려방
        </div>
        <img src={setting} alt="setting" className="w-[24px] h-[24px] mx-2" />
      </div>
      <div className="my-[30px]" />
      <Outlet context={{ setTitle }} />
    </div>
  );
}
