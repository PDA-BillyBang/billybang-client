import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, RouteObject } from "react-router-dom";
import { mainRoutes } from "./routers/MainRouter";

function renderRoutes(routesObj: RouteObject[], parentPath = "") {
  return routesObj.map((route) => {
    const fullPath = `${parentPath}${route.path}`;
    return (
      <Route key={fullPath} path={route.path} element={route.element}>
        {route.children && renderRoutes(route.children, `${fullPath}/`)}
      </Route>
    );
  });
}

function App() {
  return (
    <BrowserRouter>
      <Routes>{renderRoutes(mainRoutes)}</Routes>
    </BrowserRouter>
  );
}

export default App;
