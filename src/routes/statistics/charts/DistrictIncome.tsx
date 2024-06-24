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

  // Sorting individualIncome by income in ascending order
  const sortedIndividualIncome = [...individualIncome].sort(
    (a, b) => a.income - b.income
  );

  return (
    <div className="overflow-x-auto">
      <div style={{ minWidth: '600px' }}>
        <ResponsiveContainer
          width="100%"
          height={300}
          className="rounded-[10px] my-[0.5rem] py-[0.2rem]"
        >
          <BarChart data={sortedIndividualIncome}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="districtName" />
            <YAxis width={25} />
            <Tooltip />
            <Legend />
            <Bar dataKey="income">
              {sortedIndividualIncome.map((entry, index) => (
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
