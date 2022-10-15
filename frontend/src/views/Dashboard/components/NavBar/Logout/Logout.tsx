import { Button } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../../../../../context/UserContext";
import { Logout as LogoutIcon } from "@mui/icons-material";

export const Logout = () => {
  const userContext = useContext(UserContext);

  const handleLogout = () => {
    userContext?.logout();
  };

  return (
    <>
      <Button
        color="primary"
        variant="contained"
        onClick={() => handleLogout()}
        endIcon={<LogoutIcon />}
      >
        Logout
      </Button>
    </>
  );
};
