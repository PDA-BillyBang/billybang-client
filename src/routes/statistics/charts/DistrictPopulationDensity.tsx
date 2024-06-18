import React from 'react';
import {
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type Props = {};

const data = [
  {
    name: '사직동',
    pv: 2400,
  },
  {
    name: '삼천동',
    pv: 1398,
  },
  {
    name: '부암동',
    pv: 9800,
  },
  {
    name: '평창동',
    pv: 3908,
  },
  {
    name: '교남동',
    pv: 4800,
  },
  {
    name: '무악동',
    pv: 3800,
  },
  {
    name: '가나동',
    pv: 2200,
  },
  {
    name: '라마동',
    pv: 1300,
  },
  {
    name: '바사동',
    pv: 3240,
  },
];

export default function DistrictPopulationDensity({}: Props) {
  return (
    <div className="overflow-x-auto">
      <div style={{ minWidth: '600px' }}>
        <ResponsiveContainer
          width="100%"
          height={300}
          className="rounded-[10px] my-[0.5rem] py-[0.2rem] pl-[-1rem]"
        >
          <AreaChart
            width={730}
            height={250}
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#004CC7" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#004CC7" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis width={50} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="pv"
              stroke="#004CC7"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
