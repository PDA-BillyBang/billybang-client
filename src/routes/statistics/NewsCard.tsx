import React from "react";

type Props = {};

export default function NewsCard({}: Props) {
  return (
    <div className="w-full hover:bg-grey-5 cursor-pointer bg-grey-6 rounded-[5px] h-[100px] px-[0.8rem] items-center justify-between flex">
      <img
        className="w-[20%] h-[80px]"
        src="https://img7.yna.co.kr/etc/inner/KR/2024/06/10/AKR20240610147300004_01_i_P4.jpg"
      />
      <div className="flex flex-col w-[75%] items-start justify-start h-[80px]">
        <div className="pb-[0.2rem]">뉴스 제목 어쩌구</div>
        <div className="text-[0.8rem] text-grey-1">
          뉴스 내용 어쩌구 어ㅓ구어저라쩌도구더 거ㅏ나다라ㅏ 마바사 어쩌구
          가나다라 마다라 엊쩌구..........
        </div>
      </div>
    </div>
  );
}
