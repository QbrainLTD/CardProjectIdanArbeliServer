import { AppBar, Toolbar, IconButton, useMediaQuery, useTheme as useMuiTheme, Drawer, Box } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import LeftNavBar from "./left-navigation/LeftNavBar";
import RightNavbar from "./right-navigation/RightNavbar";
import { useTheme } from "../../providers/CustomThemeProvider";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";


export default function Header() {
  const { isDark, toggleDarkMode } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <AppBar
      position="sticky"
      elevation={10}
      sx={{
        backgroundColor: isDark ? blueGrey[900] : blueGrey[50],
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", alignItems: 'center' }}>
        {isMobile ? (
          <>
            {/* Hamburger Menu Icon */}
            <IconButton edge="start" color="black" aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>

            {/* Drawer for mobile view */}
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
              <Box
                sx={{ width: 250 }} // Adjust width for better layout
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                <LeftNavBar />
              </Box>
            </Drawer>
            <IconButton sx={{ ml: 1 }} onClick={toggleDarkMode}>
              {isDark ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>

          </>
        ) : (
          <>
            <LeftNavBar />
            <RightNavbar />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
