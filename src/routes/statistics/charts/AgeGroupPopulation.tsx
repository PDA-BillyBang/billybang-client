import React, { useEffect } from 'react';
import {
  FunnelChart,
  Funnel,
  LabelList,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type Props = {
  populationCount: populationCountI[];
};

export interface populationCountI {
  age: string;
  count: number;
}

// Define a color map for age groups
const colorMap: { [key: string]: string } = {
  '0s': '#004CC7',
  '10s': '#3773D3',
  '20s': '#5286D9',
  '30s': '#6D99DF',
  '40s': '#89ACE5',
  '50s': '#A4BFEB',
  '60s': '#DAE5F7',
  '70over': '#E0E9F9',
};

export default function AgeGroupPopulation({ populationCount }: Props) {
  const data = populationCount.map((item) => ({
    name: item.age,
    value: item.count,
    fill: colorMap[item.age] || '#003488', // Default color if not in colorMap
  }));

  return (
    <div>
      <ResponsiveContainer
        width="100%"
        height={300}
        className="rounded-[10px] my-[0.5rem] py-[0.2rem]"
      >
        <FunnelChart width={730} height={250}>
          <Tooltip />
          <Funnel dataKey="value" data={data.reverse()} isAnimationActive>
            <LabelList
              position="right"
              fill="#000"
              stroke="none"
              dataKey="name"
            />
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    </div>
  );
}
