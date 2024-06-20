import React, { useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import SelectHeader from '../../components/common/header/SelectHeader';
import { useState } from 'react';
import AreaStatistics from './AreaStatistics';
import AreaNews from './AreaNews';
type Props = {};

export default function Statistics({}: Props) {
  const { areaId } = useParams<{ areaId: string }>();
  const { setTitle } = useOutletContext<{
    setTitle: (title: string) => void;
  }>();
  useEffect(() => {
    setTitle('서대문구'); // 실제로는 api로 propertyId에 해당하는 제목을 받아와서 갈아끼우기
  }, [setTitle]);
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
        {selectActive === 0 ? (
          <AreaStatistics />
        ) : (
          areaId && <AreaNews districtId={areaId} />
        )}
      </div>
    </div>
  );
}
