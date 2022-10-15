import { Logout } from "./Logout";

import { Typography, Toolbar, Grid, AppBar, Container } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../../../../context/UserContext";

export const NavBar = () => {
  const userContext = useContext(UserContext);

  return (
    <AppBar position="static" color="transparent">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Grid
            container
            sx={{ flexGrow: 1 }}
            alignContent="center"
            justifyContent="center"
          >
            <Grid item display="flex" sx={{ flexGrow: 1 }} alignItems="center">
              <img src="Nokia-logo.png" alt="nokia-logo" height="30px" />
            </Grid>
            <Grid item>
              <Grid
                container
                display="flex"
                direction="row"
                alignContent="center"
                justifyContent="center"
                alignItems="center"
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, padding: "0px 32px", fontWeight: "bold" }}
                >
                  {userContext?.user.displayName}
                </Typography>
                <Logout />
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
