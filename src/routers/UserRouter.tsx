import React from 'react';
import { RouteObject } from 'react-router-dom';
import LoginMain from '../routes/user/LoginMain';
import LoginPwInput from '../routes/user/LoginPwInput';
import Signup from '../routes/user/Signup';
import UserInfoInput from '../routes/user/UserInfoInput';
import UserInfoInputDone from '../routes/user/UserInfoInputDone';
import MainHeader from '../components/common/header/MainHeader';
import SubHeader from '../components/common/header/SubHeader';

export const userRoutes: RouteObject[] = [
  {
    path: 'user',
    children: [
      {
        path: 'info',
        children: [
          {
            path: ':option',
            element: <SubHeader />,
            children: [
              {
                path: '',
                element: <UserInfoInput />,
              },
            ],
          },

          {
            path: 'done',
            element: <UserInfoInputDone />,
          },
        ],
      },
      {
        element: <MainHeader />,
        children: [
          {
            path: 'login',
            element: <LoginMain />,
          },
        ],
      },
      {
        element: <SubHeader />,
        children: [
          {
            path: 'login/pw/:email',
            element: <LoginPwInput />,
          },
          {
            path: 'signup/:email',
            element: <Signup />,
          },
        ],
      },
    ],
  },
];
