import React from 'react';
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Bar,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export interface individualIncomeI {
  districtName: string;
  income: number;
}

type Props = { individualIncome: individualIncomeI[] };

const data = [
  {
    name: '강남구',
    구: 40,
  },
  {
    name: '서초구',
    구: 30,
  },
  {
    name: '용산구',
    구: 20,
  },
  {
    name: '서대문구',
    구: 28,
  },
  {
    name: '강남구',
    구: 40,
  },
  {
    name: '서초구',
    구: 30,
  },
  {
    name: '용산구',
    구: 20,
  },
  {
    name: '서대문구',
    구: 28,
  },
];

export default function DistrictIncome({ individualIncome }: Props) {
  return (
    <div className="overflow-x-auto">
      <div style={{ minWidth: '600px' }}>
        <ResponsiveContainer
          width="100%"
          height={300}
          className="rounded-[10px] my-[0.5rem] py-[0.2rem]"
        >
          <BarChart data={individualIncome}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="districtName" />
            <YAxis width={25} />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#004CC7" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
