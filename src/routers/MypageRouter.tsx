import React from "react";
import { RouteObject } from "react-router-dom";
import Navbar from "../components/common/navbar/Navbar";
import Navbar2 from "../components/common/navbar/Navbar2";
import Mypage from "../routes/mypage/Mypage";
import MypageLoan from "../routes/mypage/MypageLoan";
import MypageProperties from "../routes/mypage/MypageProperties";
import MypageEdit from "../routes/mypage/MypageEdit";

export const mypageRoutes: RouteObject[] = [
  {
    path: "mypage",
    element: <Navbar />,
    children: [
      {
        index: true,
        element: <Mypage />,
      },
    ],
  },
  {
    path: "mypage",
    element: <Navbar2 />,
    children: [
      {
        path: "loan",
        element: <MypageLoan />,
      },
      {
        path: "properties",
        element: <MypageProperties />,
      },
      {
        path: "edit",
        element: <MypageEdit />,
      },
    ],
  },
];
