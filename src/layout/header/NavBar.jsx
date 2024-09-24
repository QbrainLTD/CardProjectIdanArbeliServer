import { AppBar, Toolbar } from "@mui/material";
import React from "react";

import Logo from "./logo/Logo";
import LogoIcon from "./logo/LogoIcon";
import { MenuProvider } from "./menu/MenuProvider";
import RightNavbar from "./right-navigation/RightNavbar";
import LeftNavBar from "./left-navigation/LeftNavBar";
import Header from "./Header";


export default function NavBar() {
  return (
    <MenuProvider>
      <Header/>
    </MenuProvider>
  );
}
