import React from "react";
import { RouteObject } from "react-router-dom";
import Map from "../routes/map/Map";
import MapSearch from "../routes/map/MapSearch";
import Navbar from "../components/common/navbar/Navbar";

export const mapRoutes: RouteObject[] = [
  {
    path: "",
    element: <Navbar />,
    children: [
      {
        index: true,
        element: <Map />,
      },
      {
        path: "search",
        element: <MapSearch />,
      },
    ],
  },
];
