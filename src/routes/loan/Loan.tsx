import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const Loan = () => {
  const { setTitle } = useOutletContext<{ setTitle: (title: string) => void }>();

  useEffect(() => {
    setTitle('대출'); // 실제로는 api로 propertyId에 해당하는 제목을 받아와서 갈아끼우기
  }, [setTitle]);

  return <div>Loan</div>;
};

export default Loan;