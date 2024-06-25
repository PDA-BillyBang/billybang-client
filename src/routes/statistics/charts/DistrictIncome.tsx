import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Bar,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { districtsName } from '@/utils/districtsName';

export interface individualIncomeI {
  districtName: string;
  income: number;
}

type Props = { individualIncome: individualIncomeI[]; areaId: string };

export default function DistrictIncome({ individualIncome, areaId }: Props) {
  const targetDistrict = districtsName[Number(areaId)];

  const transformIncomeData = (data: individualIncomeI[]) => {
    return data.map((item) => ({
      districtName: item.districtName,
      연봉: Math.floor(item.income * 100),
    }));
  };

  // Sorting individualIncome by income in ascending order
  const sortedIndividualIncome = [...individualIncome].sort(
    (a, b) => a.income - b.income
  );

  // Transforming the sorted data
  const transformedData = transformIncomeData(sortedIndividualIncome);

  return (
    <div className="overflow-x-auto">
      <div style={{ minWidth: '600px' }}>
        <ResponsiveContainer
          width="100%"
          height={300}
          className="rounded-[10px] my-[0.5rem] py-[0.2rem]"
        >
          <BarChart data={transformedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="districtName" />
            <YAxis width={60} />
            <Tooltip formatter={(value) => `${value}`} />
            <Legend />
            <Bar dataKey="연봉">
              {transformedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.districtName === targetDistrict
                      ? '#004CC7'
                      : '#DAE5F7'
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
