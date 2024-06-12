import React from "react";
import { RouteObject } from "react-router-dom";
import LoginMain from "../routes/user/LoginMain";
import LoginPwInput from "../routes/user/LoginPwInput";
import Signup from "../routes/user/Signup";
import UserInfoInputFirst from "../routes/user/UserInfoInputFirst";
import UserInfoInputSecond from "../routes/user/UserInfoInputSecond";
import UserInfoInputThird from "../routes/user/UserInfoInputThird";
import UserInfoInputDone from "../routes/user/UserInfoInputDone";
import MainHeader from "../components/common/header/MainHeader";
import SubHeader from "../components/common/header/SubHeader";

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
                path: "first",
                element: <UserInfoInputFirst />,
              },
              {
                path: "second",
                element: <UserInfoInputSecond />,
              },
              {
                path: "third",
                element: <UserInfoInputThird />,
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
