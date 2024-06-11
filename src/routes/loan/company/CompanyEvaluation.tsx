import React from "react";
import {
  BarChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Legend,
  ResponsiveContainer,
} from "recharts";
import size from "../../../assets/image/company/size.svg";
import stability from "../../../assets/image/company/stability.svg";
import growingTrend from "../../../assets/image/company/growingTrend.svg";
import money from "../../../assets/image/company/money.svg";

type Props = {};
const data = [
  {
    name: "규모형태",
    당사: 40,
    평균: 24,
  },
  {
    name: "안정성",
    당사: 30,
    평균: 13,
  },
  {
    name: "성장성",
    당사: 20,
    평균: 90,
  },
  {
    name: "수익성",
    당사: 28,
    평균: 30,
  },
];

export default function CompanyEvaluation({}: Props) {
  return (
    <div className="text-[0.8rem] w-[100%]  items-center flex flex-col">
      <div className="pt-[1rem]" />

      <ResponsiveContainer
        width="100%"
        height={300}
        className=" rounded-[10px] my-[0.5rem] py-[0.2rem] pl-[-1rem]"
      >
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis width={25} />
          <Tooltip />
          <Legend />
          <Bar dataKey="당사" fill="#004CC7" />
          <Bar dataKey="평균" fill="#91AFFF" />
        </BarChart>
      </ResponsiveContainer>
      <div className="flex flex-col w-[100%]">
        <div className="flex flex-row h-[3rem] rounded-[5px] bg-grey-6 my-[0.4rem] justify-between items-center px-[1rem]">
          <div className="text-[0.8rem] flex flex-row items-center">
            <img src={size} className="pr-[0.2rem]" />
            규모형태
          </div>
          <div className="text-[0.8rem] font-bold text-red-1">상위 3%</div>
        </div>
        <div className="flex flex-row h-[3rem] rounded-[5px] bg-grey-6 my-[0.4rem] justify-between items-center px-[1rem]">
          <div className="text-[0.8rem] flex flex-row items-center">
            <img src={stability} className="pr-[0.2rem]" />
            안정성
          </div>
          <div className="text-[0.8rem] font-bold text-red-1">상위 3%</div>
        </div>
        <div className="flex flex-row h-[3rem] rounded-[5px] bg-grey-6 my-[0.4rem] justify-between items-center px-[1rem]">
          <div className="text-[0.8rem] flex flex-row items-center">
            <img src={growingTrend} className="pr-[0.2rem]" />
            성장성
          </div>
          <div className="text-[0.8rem] font-bold text-red-1">상위 3%</div>
        </div>
        <div className="flex flex-row h-[3rem] rounded-[5px] bg-grey-6 my-[0.4rem] justify-between items-center px-[1rem]">
          <div className="text-[0.8rem] flex flex-row items-center">
            <img src={money} className="pr-[0.2rem]" />
            수익성
          </div>
          <div className="text-[0.8rem] font-bold text-red-1">상위 3%</div>
        </div>
      </div>
      <div className="py-[1rem]" />
    </div>
  );
}
