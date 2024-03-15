import PropTypes from "prop-types";
import { createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import { palette } from "./Palette";

const ThemeCustomization = ({ children }: { children: React.ReactNode }) => {
  const theme = {
    palette,
    zIndex: { drawer: 100 },
    typography: {
      fontFamily: '"Lato", "Helvetica", "Arial", sans-serif'
    }
  };

  return (
    <ThemeProvider theme={createTheme(theme)}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

ThemeCustomization.propTypes = {
  children: PropTypes.node,
};

export default ThemeCustomization;
