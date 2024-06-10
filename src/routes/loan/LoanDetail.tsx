import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const LoanDetail = () => {
  const { setTitle } = useOutletContext<{ setTitle: (title: string) => void }>();

  useEffect(() => {
    setTitle('상품상세');
  }, [setTitle]);

  return <div>LoanDetail</div>;
};

export default LoanDetail;