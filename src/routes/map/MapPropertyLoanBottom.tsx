import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import PropertyLoan from '@components/map/PropertyLoan';
type Props = {};

const data = [1, 2, 3, 4, 5];

export default function MapPropertyLoanBottom({}: Props) {
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
