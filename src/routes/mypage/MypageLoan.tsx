import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export default function MypageLoan() {
  const { setTitle } = useOutletContext<{
    setTitle: (title: string) => void;
  }>();

  useEffect(() => {
    setTitle("찜한 대출상품");
  }, [setTitle]);

  return (
    <div className="pt-[80px] ">
      <div>MypageLoan</div>
    </div>
  );
}
