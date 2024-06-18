import SmallButton from '@components/common/button/SmallButton';
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import pin from 'images/pin.svg';

type Props = {};

export default function PropertyDetail({}: Props) {
  const { setTitle } = useOutletContext<{
    setTitle: (title: string) => void;
  }>();

  useEffect(() => {
    setTitle('매물상세');
  }, []);

  return (
    <div className="w-[100%] flex flex-col items-center bg-[red]">
      <div className=" mt-[4rem] w-customWidthPercent bg-[green]">
        <div className="flex flex-col w-customWidthPercent">
          <div className="font-bold text-[1.5rem]">강일리버파크1단지</div>
          <div className="flex text-black-3 bg-[yellow] items-center">
            <div className="mr-2">강동구 강일동 665</div>
            <img src={pin}></img>
            <div className="">로드뷰</div>
          </div>
          <div className="flex gap-1">
            <SmallButton text="전세" isActive={true}></SmallButton>
            <SmallButton text="25년 이내" isActive={false}></SmallButton>
            <SmallButton text="방세개" isActive={false}></SmallButton>
            <SmallButton text="화장실 두개" isActive={false}></SmallButton>
            <SmallButton text="화장실 두개" isActive={false}></SmallButton>
          </div>
        </div>

        <div className="flex flex-col bg-[yellow]"></div>
      </div>
    </div>
  );
}
