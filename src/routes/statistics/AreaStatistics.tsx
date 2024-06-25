import { useEffect, useState } from 'react';
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
  const [isError, setIsError] = useState(false);

  const handleStatisticsByDistrictId = async () => {
    try {
      const result = await getStatisticsByDistrictId(Number(areaId));
      console.log(result.data.response);
      setCrimeCountList(result.data.response.crimeCount);
      setPopulationCountList(result.data.response.populationCount);
      setIndividualIncomeList(result.data.response.individualIncome);
      setPopulationDensityList(result.data.response.populationDensity);
      setIsError(false); // Reset error state if request succeeds
    } catch (error: any) {
      if (error.response && error.response.status === 500) {
        console.log('Internal Server Error: Status code 500');
        setIsError(true); // Set error state if a 500 error occurs
      } else {
        console.log('[ERROR]', error);
      }
    }
  };

  useEffect(() => {
    handleStatisticsByDistrictId();
  }, [areaId]);

  if (isError) {
    return (
      <div className="mt-[10rem] text-center text-red-500 flex flex-col justify-center items-center">
        <div className="text-[1.3rem] pb-[0.3rem]">✔️</div>
        통계 제공 지역이 아닙니다
      </div>
    );
  }

  return (
    <div className="">
      <div className="pt-[1rem]" />
      <div className="text-[1rem] font-bold">동별 인구 밀도 (명/㎢)</div>
      {populationDensityList ? (
        <DistrictPopulationDensity populationDensity={populationDensityList} />
      ) : (
        <ChartSkeleton />
      )}
      <div className="pt-[2rem]" />
      <div className="text-[1rem] font-bold">구별 근로소득 (만원/년)</div>
      {individualIncomeList ? (
        <DistrictIncome
          areaId={areaId}
          individualIncome={individualIncomeList}
        />
      ) : (
        <ChartSkeleton />
      )}
      <div className="pt-[2rem]" />
      <div className="text-[1rem] font-bold">연령별 인구 수 (명)</div>
      {populationCountList ? (
        <AgeGroupPopulation populationCount={populationCountList} />
      ) : (
        <ChartSkeleton />
      )}
      <div className="pt-[2rem]" />
      <div className="text-[1rem] font-bold">범죄 건수 (년)</div>
      {crimeCountList && areaId ? (
        <CrimeRate areaId={areaId} crimeCountList={crimeCountList} />
      ) : (
        <ChartSkeleton />
      )}
      <div className="pt-[1rem]" />
    </div>
  );
}
