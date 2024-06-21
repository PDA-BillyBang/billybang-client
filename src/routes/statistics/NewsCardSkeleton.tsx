import React from 'react';

const NewsCardSkeleton = () => {
  return (
    <div className="w-full bg-grey-6 rounded-[5px] my-[0.4rem] h-[140px] px-[0.8rem] items-center justify-between flex animate-pulse">
      <div className="w-[25%] h-[120px] bg-grey-3 rounded"></div>
      <div className="flex flex-col w-[70%] items-start justify-start h-[120px]">
        <div className="w-[80%] h-[1rem] bg-grey-3 rounded mb-[0.4rem]"></div>
        <div className="w-[100%] h-[0.8rem] bg-grey-3 rounded mb-[0.2rem]"></div>
        <div className="w-[100%] h-[0.8rem] bg-grey-3 rounded"></div>
      </div>
    </div>
  );
};

export default NewsCardSkeleton;
