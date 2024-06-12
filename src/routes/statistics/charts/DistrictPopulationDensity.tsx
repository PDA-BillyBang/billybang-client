import React from "react";
import {
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {};

const data = [
  {
    name: "사직동",
    pv: 2400,
    amt: 2400,
  },
  {
    name: "삼천동",
    pv: 1398,
    amt: 2210,
  },
  {
    name: "부암동",
    pv: 9800,
    amt: 2290,
  },
  {
    name: "평창동",
    pv: 3908,
    amt: 2000,
  },
  {
    name: "교남동",
    pv: 4800,
    amt: 2181,
  },
  {
    name: "무악동",
    pv: 3800,
    amt: 2500,
  },
];

export default function DistrictPopulationDensity({}: Props) {
  return (
    <div>
      <ResponsiveContainer
        width="100%"
        height={300}
        className=" rounded-[10px] my-[0.5rem] py-[0.2rem] pl-[-1rem]"
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
          <YAxis width={25} />
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
  );
}
