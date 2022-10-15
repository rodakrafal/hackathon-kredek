import { useNavigate, Outlet } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import {
  Box,
  Typography,
  ListItem,
  ListItemText,
  List,
  Button,
  IconButton,
  Divider,
  ListItemButton,
  Drawer,
  Toolbar,
  Container,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import * as React from "react";
import { appName } from "../types/appInfo";
import { FieldIcon } from "../components/FieldIcon";

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = ["Map", "Calculator"];

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        {appName}
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handlePageChange = (path: string) => {
    navigate(path);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "block", cursor: "pointer" },
              }}
              onClick={() => handlePageChange("/")}
            >
              {appName}
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <Button
                  variant="contained"
                  color="secondary"
                  key={item}
                  sx={{ margin: "0px 16px" }}
                  onClick={() => handlePageChange(item.toLowerCase())}
                  endIcon={<FieldIcon name={item} />}
                  size="large"
                >
                  {item}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export function Layout() {
  return (
    <>
      <DrawerAppBar />
      <Outlet />
    </>
  );
}

export function Home() {
  return (
    <>
      <Typography>domek</Typography>
      <p>dupa w domu</p>
    </>
  );
}

export function Map() {
  return (
    <>
      <Typography>mapa</Typography>
      <p>dupa</p>
    </>
  );
}

// export function Calculator() {
//   return (
//     <>
//       <Typography>Calculator</Typography>
//       <p>dupa 2</p>
//     </>
//   );
// }
