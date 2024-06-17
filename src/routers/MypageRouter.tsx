import React from "react";
import { RouteObject } from "react-router-dom";
import Mypage from "../routes/mypage/Mypage";
import MypageLoan from "../routes/mypage/MypageLoan";
import MypageProperties from "../routes/mypage/MypageProperties";
import MypageEdit from "../routes/mypage/MypageEdit";
import MainHeader from "../components/common/header/MainHeader";
import SubHeader from "../components/common/header/SubHeader";
import MyHeader from "../components/common/header/MyHeader";
import MypageEditName from "../routes/mypage/MypageEditName";
import MypageEditPW from "../routes/mypage/MypageEditPW";

export const mypageRoutes: RouteObject[] = [
  {
    path: "my",
    element: <MyHeader />,
    children: [
      {
        path: "",
        element: <Mypage />,
      },
    ],
  },
  {
    path: "my",
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
      {
        path: "edit/name",
        element: <MypageEditName />,
      },
      {
        path: "edit/password",
        element: <MypageEditPW />,
      },
    ],
  },
];
