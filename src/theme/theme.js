/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#27c1a7",
    },
    secondary: {
      main: "#0680d1",
    },
    error: {
      main: "#f44336",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: "Afacad, sans-serif",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export const globalStyles = css`
  @import url("https://fonts.googleapis.com/css2?family=Afacad:ital,wght@0,400..700;1,400..700&display=swap");

  body {
    margin: 0;
    padding: 0;
    font-family: "Afacad", sans-serif;
    background-color: #f5f5f5;
  }
`;
