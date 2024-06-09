import React from "react";
import { RouteObject } from "react-router-dom";
import Map from "../routes/map/Map";
import MapSearch from "../routes/map/MapSearch";
import MainHeader from "../components/common/header/MainHeader";

export const mapRoutes: RouteObject[] = [
  {
    path: "",
    element: <MainHeader />,
    children: [
      {
        path: "",
        element: <Map />,
      },
      {
        path: "search",
        element: <MapSearch />,
      },
    ],
  },
];
