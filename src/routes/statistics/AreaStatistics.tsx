import React from "react";
import DistrictPopulationDensity from "./charts/DistrictPopulationDensity";
import DistrictIncome from "./charts/DistrictIncome";
import AgeGroupPopulation from "./charts/AgeGroupPopulation";
import CrimeRate from "./charts/CrimeRate";
type Props = {};

export default function AreaStatistics({}: Props) {
  return (
    <div className="">
      <div className="pt-[1rem]" />
      <div className="text-[1rem] font-bold">동별 인구 밀도</div>
      <DistrictPopulationDensity />
      <div className="pt-[1rem]" />
      <div className="text-[1rem] font-bold">구별 근로소득</div>
      <DistrictIncome />
      <div className="pt-[1rem]" />
      <div className="text-[1rem] font-bold">연령별 인구 수</div>
      <AgeGroupPopulation />
      <div className="pt-[1rem]" />
      <div className="text-[1rem] font-bold">범죄율</div>
      <CrimeRate />
      <div className="pt-[1rem]" />
    </div>
  );
}
