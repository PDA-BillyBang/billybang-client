import "./App.css";
import { RouterProvider } from "react-router-dom";
import { mainRouter } from "./routers/mainRouter";
function App() {
  return <RouterProvider router={mainRouter} />;
}

export default App;
