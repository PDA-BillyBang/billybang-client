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
  '10s': '#5084D9',
  '20s': '#2C6BD1',
  '30s': '#004CC7',
  '40s': '#003FA5',
  '50s': '#003488',
  '60s': '#004CC7',
  '70over': '#2C6BD1',
};

export default function AgeGroupPopulation({ populationCount }: Props) {
  // Reverse the populationCount array and map to the format required by Funnel
  const data = populationCount.map((item) => ({
    name: item.age,
    value: item.count,
    fill: colorMap[item.age] || '#003488', // Default color if not in colorMap
  }));

  useEffect(() => {
    console.log(data);
  }, [data]);

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
