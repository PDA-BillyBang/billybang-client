import React from 'react';
import LargeButton from '@components/common/button/LargeButton';
import MultiRangeSlider from '@components/common/slider/MultiRangeSlider';
import SmallButton from '@components/common/button/SmallButton';
import {
  PropertyOption,
  SelectedBuildingCategory,
  SelectedTradeCategory,
} from '@/utils/types';

type OptionContentProps = {
  propertyOption: PropertyOption;
  setPropertyOption: (option: PropertyOption) => void;
  tempPropertyOption: PropertyOption;
  setTempPropertyOption: React.Dispatch<React.SetStateAction<PropertyOption>>;
  closeDrawer: () => void;
};

export default function OptionContent({
  propertyOption,
  setPropertyOption,
  tempPropertyOption,
  setTempPropertyOption,
  closeDrawer,
}: OptionContentProps) {
  console.log(tempPropertyOption);
  const handleTradeTypeButtonClick = (
    clickedTradeType: keyof SelectedTradeCategory
  ) => {
    setTempPropertyOption({
      ...tempPropertyOption,
      SelectedTradeCategory: {
        ...tempPropertyOption.SelectedTradeCategory,
        [clickedTradeType]:
          !tempPropertyOption.SelectedTradeCategory[clickedTradeType],
      },
    });
  };

  const handleBuildingCategoryButtonClick = (
    clickedBuildingType: keyof SelectedBuildingCategory
  ) => {
    setTempPropertyOption({
      ...tempPropertyOption,
      SelectedBuildingCategory: {
        ...tempPropertyOption.SelectedBuildingCategory,
        [clickedBuildingType]:
          !tempPropertyOption.SelectedBuildingCategory[clickedBuildingType],
      },
    });
  };

  const handleDealPriceRangeChange = (min: number, max: number) => {
    setTempPropertyOption((prev) => ({
      ...prev,
      dealPriceMin: min,
      dealPriceMax: max,
    }));
  };

  const handleLeasePriceRangeChange = (min: number, max: number) => {
    setTempPropertyOption((prev) => ({
      ...prev,
      leasePriceMin: min,
      leasePriceMax: max,
    }));
  };

  const handleCancelOptions = () => {
    setTempPropertyOption(propertyOption);
    closeDrawer();
  };

  const handleApplyOptions = () => {
    setPropertyOption(tempPropertyOption);
    closeDrawer();
  };

  return (
    <div className="w-[100%] flex flex-col select-none">
      <div className="flex-1 mb-10">
        <div className="flex gap-3 mb-4">
          <SmallButton
            text={'전세'}
            isActive={tempPropertyOption.SelectedTradeCategory['전세']}
            onClick={() => handleTradeTypeButtonClick('전세')}
            customWidth="min-w-12"
          />
          <SmallButton
            text={'매매'}
            isActive={tempPropertyOption.SelectedTradeCategory['매매']}
            onClick={() => handleTradeTypeButtonClick('매매')}
            customWidth="min-w-12"
          />
        </div>
        <hr />
        <div className="flex flex-wrap gap-3 my-4">
          <SmallButton
            text={'원룸'}
            isActive={tempPropertyOption.SelectedBuildingCategory['원룸']}
            onClick={() => handleBuildingCategoryButtonClick('원룸')}
            customWidth="min-w-12"
          />
          <SmallButton
            text={'오피스텔'}
            isActive={tempPropertyOption.SelectedBuildingCategory['오피스텔']}
            onClick={() => handleBuildingCategoryButtonClick('오피스텔')}
            customWidth="min-w-20"
          />
          <SmallButton
            text={'아파트'}
            isActive={tempPropertyOption.SelectedBuildingCategory['아파트']}
            onClick={() => handleBuildingCategoryButtonClick('아파트')}
            customWidth="min-w-14"
          />
          <SmallButton
            text={'빌라'}
            isActive={tempPropertyOption.SelectedBuildingCategory['빌라']}
            onClick={() => handleBuildingCategoryButtonClick('빌라')}
            customWidth="min-w-12"
          />
          <SmallButton
            text={'주택'}
            isActive={tempPropertyOption.SelectedBuildingCategory['주택']}
            onClick={() => handleBuildingCategoryButtonClick('주택')}
            customWidth="min-w-12"
          />
        </div>
        <hr />
        <div className="h-[30%] my-4">
          <div className="text-sm">보증금(전세금)</div>
          <MultiRangeSlider
            min={0}
            max={1000}
            minValue={tempPropertyOption.leasePriceMin}
            maxValue={tempPropertyOption.leasePriceMax}
            onChange={({ min, max }) => handleLeasePriceRangeChange(min, max)}
          />
        </div>
        <hr className="mt-14" />
        <div className="h-[30%] my-4">
          <div className="text-sm">매매가</div>
          <MultiRangeSlider
            min={0}
            max={3000}
            minValue={tempPropertyOption.dealPriceMin}
            maxValue={tempPropertyOption.dealPriceMax}
            onChange={({ min, max }) => handleDealPriceRangeChange(min, max)}
          />
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
}
