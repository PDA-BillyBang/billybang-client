import React from "react";
import {
  FunnelChart,
  Funnel,
  LabelList,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {};

const data = [
  {
    value: 70,
    name: "80세~",
    fill: "#003488",
  },
  {
    value: 80,
    name: "60~80세",
    fill: "#003FA5",
  },
  {
    value: 50,
    name: "40~60세",
    fill: "#004CC7",
  },
  {
    value: 40,
    name: "20~40세",
    fill: "#2C6BD1",
  },
  {
    value: 60,
    name: "~20세",
    fill: "#5084D9",
  },
];

export default function AgeGroupPopulation({}: Props) {
  return (
    <div>
      <ResponsiveContainer
        width="100%"
        height={300}
        className=" rounded-[10px] my-[0.5rem] py-[0.2rem] pl-[-1rem]"
      >
        <FunnelChart width={730} height={250}>
          <Tooltip />
          <Funnel dataKey="value" data={data} isAnimationActive>
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
