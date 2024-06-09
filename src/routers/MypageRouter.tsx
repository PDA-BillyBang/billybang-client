import React from "react";
import { RouteObject } from "react-router-dom";
import Mypage from "../routes/mypage/Mypage";
import MypageLoan from "../routes/mypage/MypageLoan";
import MypageProperties from "../routes/mypage/MypageProperties";
import MypageEdit from "../routes/mypage/MypageEdit";
import MainHeader from "../components/common/header/MainHeader";
import SubHeader from "../components/common/header/SubHeader";

export const mypageRoutes: RouteObject[] = [
  {
    path: "mypage",
    element: <MainHeader />,
    children: [
      {
        path: "",
        element: <Mypage />,
      },
    ],
  },
  {
    path: "mypage",
    element: <SubHeader />,
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
