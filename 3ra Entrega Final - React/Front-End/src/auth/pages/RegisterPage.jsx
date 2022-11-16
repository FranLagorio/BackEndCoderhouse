import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import { AuthLayout } from "../layouts/AuthLayout";

export const RegisterPage = () => {
  const { isLoged, user } = useSelector((state) => state.login);

  return isLoged ? (
    <p>Ya estas logeado {user.username}</p>
  ) : (
    <AuthLayout title="Register">
      <form>
        <Grid container>
          <Grid item sx={{ mt: 1 }} xs={12}>
            <TextField
              label="Nombre"
              type="text"
              placeholder="Nombre Completo"
              fullWidth
            />
          </Grid>
          <Grid item sx={{ mt: 1 }} xs={12}>
            <TextField
              label="Correo"
              type="email"
              placeholder="Correo"
              fullWidth
            />
          </Grid>
          <Grid item sx={{ mt: 1 }} xs={12}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              autoComplete="off"
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12}>
              <Button variant="contained" fullWidth>
                Crear Cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
