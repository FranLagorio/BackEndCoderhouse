import { ThemeProvider } from "@emotion/react";
import { fontTheme, purpleTheme } from "./";

export const AppTheme = ({ children }) => {
  return (
    <>
      <ThemeProvider theme={purpleTheme}>{children}</ThemeProvider>
    </>
  );
};
