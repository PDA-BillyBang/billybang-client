import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const LoanCompany = () => {
  const { setTitle } = useOutletContext<{ setTitle: (title: string) => void }>();

  useEffect(() => {
    setTitle('회사정보');
  }, [setTitle]);

  return <div>LoanCompany</div>;
};

export default LoanCompany;