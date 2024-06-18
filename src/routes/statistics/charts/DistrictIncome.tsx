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

type Props = {};

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

export default function DistrictIncome({}: Props) {
  return (
    <div className="overflow-x-auto">
      <div style={{ minWidth: '600px' }}>
        <ResponsiveContainer
          width="100%"
          height={300}
          className="rounded-[10px] my-[0.5rem] py-[0.2rem]"
        >
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis width={25} />
            <Tooltip />
            <Legend />
            <Bar dataKey="구" fill="#004CC7" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
