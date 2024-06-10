import React from "react";
import { RouteObject } from "react-router-dom";
import NotFound from "../routes/error/NotFound";

export const notFoundRoutes: RouteObject[] = [
  {
    path: "/*",
    element: <NotFound />
  },
];
