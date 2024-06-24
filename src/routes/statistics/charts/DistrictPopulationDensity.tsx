import {
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type Props = { populationDensity: populationDensityI[] };

export interface populationDensityI {
  areaName: string;
  density: number;
}

export default function DistrictPopulationDensity({
  populationDensity,
}: Props) {
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
            data={populationDensity}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#004CC7" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#004CC7" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="areaName" />
            <YAxis width={50} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="density"
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
