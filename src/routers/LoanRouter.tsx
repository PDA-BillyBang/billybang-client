import React from "react";
import { RouteObject } from "react-router-dom";

import Navbar2 from "../components/common/navbar/Navbar2";
import Loan from "../routes/loan/Loan";
import LoanCompany from "../routes/loan/LoanCompany";
import LoanDetail from "../routes/loan/LoanDetail";

export const loanRoutes: RouteObject[] = [
  {
    path: "loan",
    element: <Navbar2 />,
    children: [
      {
        path: "",
        element: <Loan />,
      },
      {
        path: "company/:companyId",
        element: <LoanCompany />,
      },
      {
        path: "detail/:detailId",
        element: <LoanDetail />,
      },
    ],
  },
];
