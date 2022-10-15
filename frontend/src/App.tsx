import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import { Login } from "./views/Login";

function App() {
  const userContext = useContext(UserContext);

  return (
    <>
      {/* {userContext?.user.displayName?.length === 0 ? <Login /> : <Dashboard />} */}
      <Login /> 
    </>
  );
}

export default App;
