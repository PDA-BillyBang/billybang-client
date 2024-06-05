import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../routes/map/Map"
import Signup from "../routes/user/Signup";
import Login from "../routes/user/LoginMain";
import Navbar from "../components/common/navbar/Navbar";

export const mainRouter = createBrowserRouter([
    {
        path: "",
        children: [
            {
                index: true,
                element: <Main />,
            },
            {
                path: "/signup",
                element: <Signup />
            },
            {
                path: "/login",
                element: <Login />
            },

            // 여기서부터 NavBar 사용
            {
                path: "",
                element: <Navbar />,
                children: [
                    {
                        path: "/main"
                    }
                ]
            }
        ]
    }
])
