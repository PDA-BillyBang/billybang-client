import React from 'react';
import PropertyLoan from '@components/map/PropertyLoan';
import { Property } from '@/utils/types';

type Props = {
  properties: Property[];
};

export default function MapPropertyLoan({ properties }: Props) {
  return (
    <div className=" w-[100%] flex flex-col items-center">
      {properties.map((property: Property) => (
        <div className="w-[100%] flex flex-col items-center" key={property.propertyId}>
          <div className=" w-[100%]">
            <PropertyLoan property={property} bottomButton={false} />
          </div>
          <div className="mb-[40px] w-[100%] h-[8px] bg-grey-6" />
        </div>
      ))}
      <div className="h-[1rem] bg-grey-1" />
    </div>
  );
}