import { Color } from "@mui/material";

type ThemeOption = {
  colors: Color;
  heading: string;
  paper: string;
  backgroundDefault: string;
  background: string;
  darkTextPrimary: string;
  darkTextSecondary: string;
  textDark: string;
  menuSelected: string;
  menuSelectedBack: string;
  divider: string;
  customization: string;
};

export const themeOptions = {
  colors: {
    paper: "#fff",
    common: "#000",
    primary: {
      primaryLight: "#c2cbff",
      primaryMain: "#3f51b5",
      primaryDark: "#2c387e",
      primary200: "#90caf9",
      primary800: "#1565c0",
    },
    secondary: {
      secondaryLight: "#ff4081",
      secondaryMain: "#f50057",
      secondaryDark: "#c51162",
      secondary200: "#b39ddb",
      secondary800: "#4527a0",
    },
    success: {
      successLight: "#81c784",
      success200: "#69f0ae",
      successMain: "#4caf50",
      successDark: "#388e3c",
    },
    error: {
      errorLight: "#e57373",
      errorMain: "#f44336",
      errorDark: "#d32f2f",
    },
    orange: {
      orangeLight: "#fbe9e7",
      orangeMain: "#ffab91",
      orangeDark: "#d84315",
    },
    warning: {
      warningLight: "#ffb74d",
      warningMain: "#ffa726",
      warningDark: "#f57c00",
    },
    grey: {
      grey50: "#fafafa",
      grey100: "#f5f5f5",
      grey200: "#eeeeee",
      grey300: "#e0e0e0",
      grey500: "#9e9e9e",
      grey600: "#757575",
      grey700: "#616161",
      grey900: "#212121",
    },
  },
};

export const palette = {
  common: {
    black: themeOptions.colors.common,
    white: themeOptions.colors.paper,
  },
  primary: {
    light: themeOptions.colors.primary.primaryLight,
    main: themeOptions.colors.primary.primaryMain,
    dark: themeOptions.colors.primary.primaryDark,
    contrastText: themeOptions.colors.paper,
  },
  secondary: {
    light: themeOptions.colors.secondary.secondaryLight,
    main: themeOptions.colors.secondary.secondaryMain,
    dark: themeOptions.colors.secondary.secondaryDark,
    contrastText: themeOptions.colors.paper,
  },
  error: {
    light: themeOptions.colors.error.errorLight,
    main: themeOptions.colors.error.errorMain,
    dark: themeOptions.colors.error.errorDark,
  },
  warning: {
    light: themeOptions.colors.warning.warningLight,
    main: themeOptions.colors.warning.warningMain,
    dark: themeOptions.colors.warning.warningDark,
  },
  info: {
    light: themeOptions.colors.primary.primaryLight,
    main: themeOptions.colors.primary.primaryMain,
    dark: themeOptions.colors.primary.primaryDark,
  },
  success: {
    light: themeOptions.colors.success.successLight,
    main: themeOptions.colors.success.successMain,
    dark: themeOptions.colors.success.successDark,
  },
  grey: {
    50: themeOptions.colors.grey.grey50,
    100: themeOptions.colors.grey.grey100,
    200: themeOptions.colors.grey.grey200,
    300: themeOptions.colors.grey.grey300,
    400: themeOptions.colors.grey.grey500, // MUI doesn't use 500 directly here but it's an approximation
    500: themeOptions.colors.grey.grey600,
    600: themeOptions.colors.grey.grey700,
    700: themeOptions.colors.grey.grey900, // Adjusted for contrast
    800: themeOptions.colors.grey.grey900, // MUI doesn't have an 800, using 900 for depth
    900: themeOptions.colors.grey.grey900,
    A100: themeOptions.colors.grey.grey50, // Custom, MUI doesn't specifically use these but for completeness
    A200: themeOptions.colors.grey.grey100,
    A400: themeOptions.colors.grey.grey500,
    A700: themeOptions.colors.grey.grey700,
  },
  text: {
    primary: themeOptions.colors.grey.grey900,
    secondary: themeOptions.colors.grey.grey600,
    disabled: themeOptions.colors.grey.grey500,
    hint: themeOptions.colors.grey.grey300,
  },
  background: {
    default: "#f3f5ff",
    paper: themeOptions.colors.paper,
  },
  divider: themeOptions.colors.grey.grey200,
}