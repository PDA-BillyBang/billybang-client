import React from "react";
import { RouteObject } from "react-router-dom";
import LoginMain from "../routes/user/LoginMain";
import LoginPwInput from "../routes/user/LoginPwInput";
import Signup from "../routes/user/Signup";
import UserInfoInput from "../routes/user/UserInfoInput";
import UserInfoInputDone from "../routes/user/UserInfoInputDone";
import MainHeader from "../components/common/header/MainHeader";
import SubHeader from "../components/common/header/SubHeader";
import MultiRangeSlider from "@components/common/slider/MultiRangeSlider";

export const userRoutes: RouteObject[] = [
  {
    path: "user",
    children: [
      {
        path: "info",
        children: [
          {
            path: "",
            element: <SubHeader />,
            children: [
              {
                path: "",
                element: <UserInfoInput />,
              },
            ],
          },

          {
            path: "done",
            element: <UserInfoInputDone />,
          },
        ],
      },
      {
        element: <MainHeader />,
        children: [
          {
            path: "login",
            element: <LoginMain />,
          },
        ],
      },
      {
        element: <SubHeader />,
        children: [
          {
            path: "login/pw",
            element: <LoginPwInput />,
          },
          {
            path: "signup",
            element: <Signup />,
          },
        ],
      },
    ],
  },
];
