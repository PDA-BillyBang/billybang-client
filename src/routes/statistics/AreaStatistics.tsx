import React, { useEffect, useState } from 'react';
import DistrictPopulationDensity from './charts/DistrictPopulationDensity';
import DistrictIncome from './charts/DistrictIncome';
import AgeGroupPopulation from './charts/AgeGroupPopulation';
import CrimeRate from './charts/CrimeRate';
import { getStatisticsByDistrictId } from '@/lib/apis/statistics';
import { crimeCountI } from './charts/CrimeRate';
import { populationCountI } from './charts/AgeGroupPopulation';
import { individualIncomeI } from './charts/DistrictIncome';
import ChartSkeleton from './charts/ChartSkeleton';
type Props = { areaId: string };

export default function AreaStatistics({ areaId }: Props) {
  const [crimeCountList, setCrimeCountList] = useState<crimeCountI[]>();
  const [populationCountList, setPopulationCountList] =
    useState<populationCountI[]>();
  const [individualIncomeList, setIndividualIncomeList] =
    useState<individualIncomeI[]>();
  const [populationDensityList, setPopulationDensityList] = useState();
  const handleStatisticsByDistrictId = async () => {
    try {
      const result = await getStatisticsByDistrictId(Number(areaId));
      console.log(result.data.response);
      setCrimeCountList(result.data.response.crimeCount);
      setPopulationCountList(result.data.response.populationCount);
      setIndividualIncomeList(result.data.response.individualIncome);
      setPopulationDensityList(result.data.response.populationDensity);
    } catch (error) {
      console.log('[ERROR]', error);
    }
  };

  useEffect(() => {
    handleStatisticsByDistrictId();
  }, []);

  return (
    <div className="">
      <div className="pt-[1rem]" />
      <div className="text-[1rem] font-bold">동별 인구 밀도</div>
      {populationDensityList ? (
        <DistrictPopulationDensity populationDensity={populationDensityList} />
      ) : (
        <ChartSkeleton />
      )}
      <div className="pt-[2rem]" />
      <div className="text-[1rem] font-bold">구별 근로소득</div>
      {individualIncomeList ? (
        <DistrictIncome
          areaId={areaId}
          individualIncome={individualIncomeList}
        />
      ) : (
        <ChartSkeleton />
      )}
      <div className="pt-[2rem]" />
      <div className="text-[1rem] font-bold">연령별 인구 수</div>
      {populationCountList ? (
        <AgeGroupPopulation populationCount={populationCountList} />
      ) : (
        <ChartSkeleton />
      )}
      <div className="pt-[2rem]" />
      <div className="text-[1rem] font-bold">범죄율</div>
      {crimeCountList && areaId ? (
        <CrimeRate areaId={areaId} crimeCountList={crimeCountList} />
      ) : (
        <ChartSkeleton />
      )}
      <div className="pt-[1rem]" />
    </div>
  );
}
