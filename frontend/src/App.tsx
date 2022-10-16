import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import { Login } from "./views/Login";
import { Home, Layout, Map } from "./routing";
import { Calculator } from "./views/Calculator";
import { Statistics } from "./views/Statistics";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="map" element={<Map />}/>
      <Route path="calculator" element={<Calculator />}/>
      <Route path="statistics" element={<Statistics />}/>
    </Route>
  )
);

function App() {
  const userContext = useContext(UserContext);

  return (
    <>
      <RouterProvider router={router} />;
    </>
  );
}

export default App;
