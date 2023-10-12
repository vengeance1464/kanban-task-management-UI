import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#635FC7",
      dark: "#000112",
    },
    error: {
      main: "red",
    },
    secondary: {
      main: "#dc004e",
      dark: "",
    },
    common: {},
    mode: "light",
  },
  typography: {
    fontSize: 14,
  },
});
