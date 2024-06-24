import { useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import SelectHeader from '../../components/common/header/SelectHeader';
import { useState } from 'react';
import AreaStatistics from './AreaStatistics';
import AreaNews from './AreaNews';
import { districtsName } from '@/utils/districtsName';
type Props = {};

export default function Statistics({}: Props) {
  const { areaId } = useParams<{ areaId: string }>();
  const { setTitle } = useOutletContext<{
    setTitle: (title: string) => void;
  }>();
  useEffect(() => {
    if (areaId) {
      const districtName = districtsName[areaId];
      if (districtName) {
        setTitle(districtName);
      }
    }
  }, [areaId, setTitle]);
  const [selectActive, setSelectActive] = useState(0);
  const handleSelectActive = (index: number) => {
    setSelectActive(index);
  };
  return (
    <div className="w-full flex flex-col items-center mt-[70px]">
      <div className=" w-customWidthPercent">
        <div className="py-[0.4rem]" />
        <SelectHeader
          customWidth="w-full"
          leftText="통계"
          rightText="뉴스"
          handleClick={handleSelectActive}
          selectActive={selectActive}
        />
        {selectActive === 0
          ? areaId && <AreaStatistics areaId={areaId} />
          : areaId && <AreaNews districtId={areaId} />}
      </div>
    </div>
  );
}
