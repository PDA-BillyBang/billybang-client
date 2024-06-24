import React from 'react';
import { RouteObject } from 'react-router-dom';
import Loan from '../routes/loan/Loan';
import LoanCompany from '../routes/loan/LoanCompany';
import LoanDetail from '../routes/loan/LoanDetail';
import SubHeader from '../components/common/header/SubHeader';

export const loanRoutes: RouteObject[] = [
  {
    path: 'loan',
    element: <SubHeader />,
    children: [
      {
        path: 'recommend/:propertyId',
        element: <Loan />,
      },
      {
        path: 'company/:companyId',
        element: <LoanCompany />,
      },
      {
        path: 'detail/:loanId',
        element: <LoanDetail />,
      },
    ],
  },
];
