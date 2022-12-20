import { Grid } from "@mui/material";

export const AuthLayout = ({ children }) => {
  return (
    <Grid
      container
      //para que no haya espacio entre hijos
      spacing={0}
      //direction es como flexbox
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(343deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
      }}>
      {children}
    </Grid>
  );
};
