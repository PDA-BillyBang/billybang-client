import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, RouteObject } from "react-router-dom";
import { mainRoutes } from "./routers/MainRouter";

function renderRoutes(routesObj: RouteObject[]) {
  return routesObj.map((route) => (
    <Route
      key={route.path}
      path={route.path}
      element={route.element}
    >
      {route.children && renderRoutes(route.children)}
    </Route>
  ));
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {renderRoutes(mainRoutes)}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
