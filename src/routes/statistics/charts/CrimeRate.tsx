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
import { districtsName } from '@/utils/districtsName';

type Props = {
  crimeCountList: crimeCountI[];
  areaId: string;
};

export interface crimeCountI {
  districtName: string;
  count: number;
}

export default function CrimeRate({ crimeCountList, areaId }: Props) {
  return (
    <div className="overflow-x-auto">
      {districtsName[Number(areaId)]}
      <div style={{ minWidth: '600px' }}>
        <ResponsiveContainer
          width="100%"
          height={300}
          className=" rounded-[10px] my-[0.5rem] py-[0.2rem] pl-[-1rem]"
        >
          <BarChart data={crimeCountList}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="districtName" />
            <YAxis width={35} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#004CC7" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
