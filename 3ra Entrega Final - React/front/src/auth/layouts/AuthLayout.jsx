import { Grid, Typography } from "@mui/material";

export const AuthLayout = ({ children, title }) => {
  return (
    <Grid
      container
      //para que no haya espacio entre hijos
      spacing={0}
      //direction es como flexbox
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: "100vh",

        background:
          "linear-gradient(343deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
        padding: 4,
      }}
    >
      <Grid
        item
        className="box-shadow"
        sx={{
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
          width: { sm: 450 },
        }}
      >
        <Typography variant="h5" sx={{ mb: 1, textAlign: "center" }}>
          {title}
        </Typography>

        {children}
      </Grid>
    </Grid>
  );
};
