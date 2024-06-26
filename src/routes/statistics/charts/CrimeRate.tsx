import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Bar,
  Tooltip,
  ResponsiveContainer,
  Cell,
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
  const targetDistrict = districtsName[Number(areaId)];

  const transformCrimeData = (data: crimeCountI[]) => {
    return data.map((item) => ({
      districtName: item.districtName,
      건수: item.count,
    }));
  };

  // Sorting the crime count list by count in ascending order
  const sortedCrimeCountList = transformCrimeData(
    [...crimeCountList].sort((a, b) => a.count - b.count)
  );

  return (
    <div className="overflow-x-auto">
      <div style={{ minWidth: '600px' }}>
        <ResponsiveContainer
          width="100%"
          height={300}
          className="rounded-[10px] my-[0.5rem] py-[0.2rem] pl-[-1rem]"
        >
          <BarChart data={sortedCrimeCountList}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="districtName" />
            <YAxis width={35} />
            <Tooltip />
            <Legend />
            <Bar dataKey="건수">
              {sortedCrimeCountList.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.districtName === targetDistrict
                      ? '#004CC7'
                      : '#DAE5F7'
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export interface crimeCountI {
  districtName: string;
  count: number;
}
