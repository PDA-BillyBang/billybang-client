import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import FavoriteDetailLoanCard from "../../components/mypage/FavoriteDetailLoanCard";

export default function MypageProperties() {
  const { setTitle } = useOutletContext<{
    setTitle: (title: string) => void;
  }>();

  useEffect(() => {
    setTitle("찜한 방");
  }, [setTitle]);

  const data = [1, 2, 3, 4, 5, 6, 7, 10, 8, 9];

  return (
    <div className="pt-[80px] flex flex-col items-center">
      <div className=" w-customWidthPercent">
        {data.map((value, index) => {
          return (
            <div key={index} className="pb-[0.5rem]">
              <FavoriteDetailLoanCard />
            </div>
          );
        })}
        <div className="py-[1rem]" />
      </div>
    </div>
  );
}
