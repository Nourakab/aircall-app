/** @jsxImportSource @emotion/react */
import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { styledAppBar, styledTypography } from "./HeaderStyles";

const Header = () => {
  return (
    <AppBar css={styledAppBar} position="static">
      <Toolbar>
        <Typography
          css={styledTypography}
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          Aircall Phone
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
