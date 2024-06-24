import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import size from '../../../assets/image/company/size.svg';
import stability from '../../../assets/image/company/stability.svg';
import growingTrend from '../../../assets/image/company/growingTrend.svg';
import { financialIndicatorsI } from '../LoanCompany';

type Props = { financialIndicators: financialIndicatorsI[] };

export default function CompanyEvaluation({ financialIndicators }: Props) {
  const data = financialIndicators
    ? [
        {
          name: '규모형태',
          평균: financialIndicators[0].avgValue,
          당사: financialIndicators[0].value,
        },
        {
          name: '안정성',
          평균: financialIndicators[1].avgValue,
          당사: financialIndicators[1].value,
        },
        {
          name: '성장성',
          평균: financialIndicators[2].avgValue,
          당사: financialIndicators[2].value,
        },
      ]
    : [];
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
        <div className="flex flex-row h-[3rem] rounded-[5px] bg-grey-6 my-[0.4rem] justify-between items-center px-[1.5rem]">
          <div className="text-[0.8rem] flex flex-row items-center">
            <img src={size} className="pr-[0.2rem]" />
            규모형태
          </div>
          <div className="text-[0.8rem] font-bold text-red-1">
            {financialIndicators[0].grade}
          </div>
        </div>
        <div className="flex flex-row h-[3rem] rounded-[5px] bg-grey-6 my-[0.4rem] justify-between items-center px-[1.5rem]">
          <div className="text-[0.8rem] flex flex-row items-center">
            <img src={stability} className="pr-[0.2rem]" />
            안정성
          </div>
          <div className="text-[0.8rem] font-bold text-red-1">
            {financialIndicators[1].grade}
          </div>
        </div>
        <div className="flex flex-row h-[3rem] rounded-[5px] bg-grey-6 my-[0.4rem] justify-between items-center px-[1.5rem]">
          <div className="text-[0.8rem] flex flex-row items-center">
            <img src={growingTrend} className="pr-[0.2rem]" />
            성장성
          </div>
          <div className="text-[0.8rem] font-bold text-red-1">
            {financialIndicators[2].grade}
          </div>
        </div>
      </div>
      <div className="py-[1rem]" />
    </div>
  );
}
