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

export interface popI {
  name: string;
  value: number;
  fill: string;
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

  console.log(populationCount);
  console.log(data);
  function transformAgeData(data: popI[]) {
    return data.map((item) => {
      let newName;
      switch (item.name) {
        case '0s':
          newName = '0~9세';
          break;
        case '10s':
          newName = '10대 ';
          break;
        case '20s':
          newName = '20대 ';
          break;
        case '30s':
          newName = '30대 ';
          break;
        case '40s':
          newName = '40대 ';
          break;
        case '50s':
          newName = '50대 ';
          break;
        case '60s':
          newName = '60대';
          break;
        case '70over':
          newName = '70대 이상';
          break;
        default:
          newName = item.name;
      }
      return {
        name: newName,
        value: item.value,
        fill: item.fill,
      };
    });
  }
  return (
    <div>
      <ResponsiveContainer
        width="100%"
        height={300}
        className="rounded-[10px] my-[0.5rem] py-[0.2rem]"
      >
        <FunnelChart width={730} height={250}>
          <Tooltip />
          <Funnel
            dataKey="value"
            data={transformAgeData(data.reverse())}
            isAnimationActive
          >
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
