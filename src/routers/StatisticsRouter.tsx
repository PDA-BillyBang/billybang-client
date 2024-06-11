import React from "react";
import { RouteObject } from "react-router-dom";
import SubHeader from "../components/common/header/SubHeader";
import Statistics from "../routes/statistics/Statistics";

export const statisticsRoutes: RouteObject[] = [
  {
    path: "statistics",
    element: <SubHeader />,
    children: [
      {
        path: ":areaId",
        element: <Statistics />,
      },
    ],
  },
];
