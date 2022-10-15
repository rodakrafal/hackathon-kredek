import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import { Login } from "./views/Login";
import { Calculator, Home, Layout, Map } from "./routing";

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
