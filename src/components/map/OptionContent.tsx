import React from 'react';
import LargeButton from '@components/common/button/LargeButton';
import MultiRangeSlider from '@components/common/slider/MultiRangeSlider';
import SmallButton from '@components/common/button/SmallButton';
import { SelectedBuildingCategory, SelectedTradeCategory } from '@/utils/types';

type OptionContentProps = {
  selectedTradeCategory: SelectedTradeCategory;
  setSelectedTradeCategory: React.Dispatch<React.SetStateAction<SelectedTradeCategory>>;
  tempSelectedTradeCategory: SelectedTradeCategory;
  setTempSelectedTradeCategory: React.Dispatch<React.SetStateAction<SelectedTradeCategory>>;
  selectedPropertyCategory: SelectedBuildingCategory;
  setSelectedPropertyCategory: React.Dispatch<React.SetStateAction<SelectedBuildingCategory>>;
  tempSelectedPropertyCategory: SelectedBuildingCategory;
  setTempSelectedPropertyCategory: React.Dispatch<React.SetStateAction<SelectedBuildingCategory>>;
  onApplyButtonClick: () => void;
};

const OptionContent: React.FC<OptionContentProps> = ({
  selectedTradeCategory,
  setSelectedTradeCategory,
  tempSelectedTradeCategory,
  setTempSelectedTradeCategory,
  selectedPropertyCategory,
  setSelectedPropertyCategory,
  tempSelectedPropertyCategory,
  setTempSelectedPropertyCategory,
  onApplyButtonClick,
}) => {
  const handleTradeTypeButtonClick = (clickedTradeType: keyof SelectedTradeCategory) => {
    setSelectedTradeCategory(prev => ({
      ...prev,
      [clickedTradeType]: !prev[clickedTradeType],
    }));
  };

  const handleBuildingCategoryButtonClick = (clickedBuildingType: keyof SelectedBuildingCategory) => {
    setSelectedPropertyCategory(prev => ({
      ...prev,
      [clickedBuildingType]: !prev[clickedBuildingType],
    }));
  };

  const handleCancelOptions = () => {
    setSelectedTradeCategory(tempSelectedTradeCategory);
    setSelectedPropertyCategory(tempSelectedPropertyCategory);
    onApplyButtonClick(); // Close the drawer
  };

  const handleApplyOptions = () => {
    setTempSelectedTradeCategory(selectedTradeCategory);
    setTempSelectedPropertyCategory(selectedPropertyCategory);
    onApplyButtonClick(); // Close the drawer
  };

  return (
    <div className='w-[100%] flex flex-col'>
      <div className="flex-1 mb-10">
        <div className="flex gap-3 mb-4">
          <SmallButton text={'전세'} isActive={selectedTradeCategory['전세']} onClick={() => handleTradeTypeButtonClick('전세')} customWidth='min-w-12' />
          <SmallButton text={'매매'} isActive={selectedTradeCategory['매매']} onClick={() => handleTradeTypeButtonClick('매매')} customWidth='min-w-12' />
        </div>
        <hr />
        <div className='flex flex-wrap gap-3 my-4'>
          <SmallButton text={'원룸'} isActive={selectedPropertyCategory['원룸']} onClick={() => handleBuildingCategoryButtonClick('원룸')} customWidth='min-w-12' />
          <SmallButton text={'오피스텔'} isActive={selectedPropertyCategory['오피스텔']} onClick={() => handleBuildingCategoryButtonClick('오피스텔')} customWidth='min-w-20' />
          <SmallButton text={'아파트'} isActive={selectedPropertyCategory['아파트']} onClick={() => handleBuildingCategoryButtonClick('아파트')} customWidth='min-w-14' />
          <SmallButton text={'빌라'} isActive={selectedPropertyCategory['빌라']} onClick={() => handleBuildingCategoryButtonClick('빌라')} customWidth='min-w-12' />
          <SmallButton text={'주택'} isActive={selectedPropertyCategory['주택']} onClick={() => handleBuildingCategoryButtonClick('주택')} customWidth='min-w-12' />
        </div>
        <hr />
        <div className="h-[30%] my-4">
          <div className="text-sm">
            보증금(전세금)
          </div>
          <MultiRangeSlider min={0} max={1000} />
        </div>
        <hr className='mt-14' />
        <div className="h-[30%] my-4">
          <div className="text-sm">
            매매가
          </div>
          <MultiRangeSlider min={0} max={3000} />
        </div>
        <hr className="mt-14" />
      </div>
      <div className="flex justify-around">
        <LargeButton
          isActive={4}
          customWidth="w-[35%]"
          text="취소"
          handleClick={handleCancelOptions}
        />
        <LargeButton
          isActive={0}
          customWidth="w-[50%]"
          text="적용"
          handleClick={handleApplyOptions}
        />
      </div>
    </div>
  );
};

export default OptionContent;
