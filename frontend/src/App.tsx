import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import { Login } from "./views/Login";
import { Layout, Map } from "./routing";
import { Calculator } from "./views/Calculator";
import { Statistics } from "./views/Statistics";
import { Home } from "./views/Home";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<Home />} />
      <Route path="app" element={<Layout />}>
        <Route path="map" element={<Map />} />
        <Route path="calculator" element={<Calculator />} />
        <Route path="statistics" element={<Statistics />} />
      </Route>
    </>
  )
);

const theme = createTheme({
  palette: {
    primary: {
      main: '#6200ea',
    },
    secondary: {
      main: '#fdd835',
    }
  },
});

function App() {
  const userContext = useContext(UserContext);

  return (
    <>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />;
      </ThemeProvider>
    </>
  );
}

export default App;
