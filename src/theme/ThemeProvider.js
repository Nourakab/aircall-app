// src/theme/ThemeProvider.js
import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { theme as lightTheme, globalStyles } from "./theme";

// Define darkTheme if needed
const darkTheme = createTheme({
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
      default: "#333",
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

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const defaultTheme = useMemo(
    () => (prefersDarkMode ? "dark" : "light"),
    [prefersDarkMode]
  );

  const [themeMode, setThemeMode] = useState(defaultTheme);

  const toggleTheme = useCallback(() => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  }, []);

  const theme = useMemo(
    () => (themeMode === "light" ? lightTheme : darkTheme),
    [themeMode]
  );

  const providerValue = useMemo(
    () => ({
      themeMode,
      theme,
      toggleTheme,
    }),
    [themeMode, theme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={providerValue}>
      <MuiThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
