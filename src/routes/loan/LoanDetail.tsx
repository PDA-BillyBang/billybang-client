import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import bankTest from "../../assets/image/test/bank-test.png";

const LoanDetail = () => {
  const { setTitle } = useOutletContext<{
    setTitle: (title: string) => void;
  }>();

  useEffect(() => {
    setTitle("상품상세");
  }, [setTitle]);

  return (
    <div>
      <div>
        <img src={bankTest} className="w-[50px] h-[50px]" />
      </div>
    </div>
  );
};

export default LoanDetail;
