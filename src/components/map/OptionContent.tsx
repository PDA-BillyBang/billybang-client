import React, {useState} from 'react';
import LargeButton from '@components/common/button/LargeButton';
import MultiRangeSlider from '@components/common/slider/MultiRangeSlider';
import SmallButton from '@components/common/button/SmallButton';
import { SelectedCategoryType, initialSelectedCategory, SelectedPropertyType, initialSelectedProperty } from '@/utils/types';

type Props = {
    onApplyButtonClick: () => void;
}
export default function OptionContent({ onApplyButtonClick }:Props) {
    const [selectedCategory, setSelectedCategory] = useState<SelectedCategoryType>(initialSelectedCategory); 
    const [selectedPropertyType, setSelectedPropertyType] = useState<SelectedPropertyType>(initialSelectedProperty); 

    const handlePropertyButtonClick = (clickedProperty: keyof SelectedPropertyType) => {
        setSelectedPropertyType(prev => ({
          ...prev,
          [clickedProperty]: !prev[clickedProperty],
        }));
      };
    const handleCategoryButtonClick = (clickedCategory: keyof SelectedCategoryType) => {
        setSelectedCategory(prev => ({
          ...prev,
          [clickedCategory]: !prev[clickedCategory],
        }));
      };
    
  return (
    <div className='w-[100%] flex flex-col'>
        <div className="flex-1 mb-10">
            <div className="flex gap-3 mb-4">
                <SmallButton text={'전세'} isActive={selectedPropertyType['전세']} onClick={()=>handlePropertyButtonClick('전세')} customWidth='min-w-12' />
                <SmallButton text={'매매'} isActive={selectedPropertyType['매매']} onClick={()=>handlePropertyButtonClick('매매')} customWidth='min-w-12'/>
            </div>
            <hr />
            <div className='flex flex-wrap gap-3 my-4'>
                <SmallButton text={'원룸'} isActive={selectedCategory['원룸']} onClick={()=>handleCategoryButtonClick('원룸')} customWidth='min-w-12' />
                <SmallButton text={'오피스텔'} isActive={selectedCategory['오피스텔']} onClick={()=>handleCategoryButtonClick('오피스텔')} customWidth='min-w-20'/>
                <SmallButton text={'아파트'} isActive={selectedCategory['아파트']} onClick={()=>handleCategoryButtonClick('아파트')} customWidth='min-w-14'/>
                <SmallButton text={'빌라'} isActive={selectedCategory['빌라']} onClick={()=>handleCategoryButtonClick('빌라')} customWidth='min-w-12'/>
                <SmallButton text={'주택'} isActive={selectedCategory['주택']} onClick={()=>handleCategoryButtonClick('주택')} customWidth='min-w-12'/>
            </div>
            <hr/>
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
                handleClick={onApplyButtonClick}
            />
            <LargeButton
                isActive={0}
                customWidth="w-[50%]"
                text="적용"
                handleClick={onApplyButtonClick}
            />
        </div>
    </div>
  );
}
