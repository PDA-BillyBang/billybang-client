import React from 'react';
import PropertyLoan from '@components/map/PropertyLoan';

const data = [1, 2, 3, 4, 5];

export default function MapPropertyLoan() {
  return (
    <div className=" w-[100%] flex flex-col items-center">
      {data.map((value, index) => {
        return (
          <div className="w-[100%] flex flex-col items-center" key={index}>
            <div className=" w-[100%]">
              <PropertyLoan bottomButton={false} />
            </div>
            <div className="mb-[40px] w-[100%] h-[8px] bg-grey-6" />
          </div>
        );
      })}
      <div className="h-[1rem] bg-grey-1" />
    </div>
  );
}
