import React from "react";

type Props = {};

export default function LoanHeader({}: Props) {
  return (
    <div className="w-[100%] flex flex-col items-center">
      <div className="flex flex-row justify-between w-[100%]">
        <div className="flex flex-row items-end text-center">
          <div className="text-[1.2rem] leading-[1.2rem]">주택담보대출</div>
          <div className="px-[0.15rem]" />
          <div className="text-[0.9rem] leading-[0.9rem]">(2)</div>
        </div>
        <button className="text-[0.8rem] leading-[0.8rem] flex items-center justify-center text-center w-[55px] h-[30px] text-grey-1 border rounded-[20px] border-grey-2 bg-grey-6">
          출시순
        </button>
      </div>
      <div className="py-[0.1rem] border-b border-grey-2 w-[100%]" />
    </div>
  );
}
