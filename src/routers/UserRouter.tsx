import React from "react";
import { RouteObject } from "react-router-dom";
import LoginMain from "../routes/user/LoginMain";
import Navbar from "../components/common/navbar/Navbar";
import Navbar2 from "../components/common/navbar/Navbar2";
import LoginPwInput from "../routes/user/LoginPwInput";
import Signup from "../routes/user/Signup";
import UserInfoInput from "../routes/user/UserInfoInput";
import UserInfoInputDone from "../routes/user/UserInfoInputDone";

export const userRoutes: RouteObject[] = [
  {
    path: "user",
    children: [
      {
        path: "info",
        children: [
          {
            path: "",
            element: <UserInfoInput />,
          },
          {
            path: "done",
            element: <UserInfoInputDone />,
          },
        ],
      },
      {
        element: <Navbar />,
        children: [
          {
            path: "login",
            element: <LoginMain />,
          },
        ],
      },
      {
        element: <Navbar2 />,
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
