import React from "react";
import { Table } from "flowbite-react";

type Props = {};

const data = [
  ["매출액", "191,269", "191,269", "191,269"],
  ["영업이익", "191,269", "191,269", "191,269"],
  ["당기손이익", "191,269", "191,269", "191,269"],
  ["부채총계", "191,269", "191,269", "191,269"],
  ["자본총계", "191,269", "191,269", "191,269"],
  ["자산총계", "191,269", "191,269", "191,269"],
];

export default function CompanyInfoTable({}: Props) {
  return (
    <div className="w-[100%] flex flex-col ">
      <div className="flex flex-row items-stretch text-[0.9rem]">
        <div className="text-center w-[25%] bg-grey-6 py-[0.3rem]">구분</div>
        <div className="text-center w-[25%] bg-grey-6 py-[0.3rem]">
          2021.12.31
        </div>
        <div className="text-center w-[25%] bg-grey-6 py-[0.3rem]">
          2022.12.31
        </div>
        <div className="text-center w-[25%] bg-grey-6 py-[0.3rem]">
          2023.12.31
        </div>
      </div>
      {data.map((row, index) => (
        <div className="flex flex-row items-stretch text-[0.9rem]" key={index}>
          {row.map((cell, cellIndex) => (
            <div className="text-center w-[25%] py-[0.3rem]" key={cellIndex}>
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
