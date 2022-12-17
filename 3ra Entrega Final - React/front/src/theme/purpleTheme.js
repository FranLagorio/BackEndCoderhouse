import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const purpleTheme = createTheme({
  palette: {
    primary: { main: "#5783db" },
    secondary: { main: "#543884" },
    error: { main: red.A400 },
  },
  // De esta forma podria cambiar el font family para todo el proyecto de material ui
  typography: {
    fontFamily: "Poppins",
  },
});
