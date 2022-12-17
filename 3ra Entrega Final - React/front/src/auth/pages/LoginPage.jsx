import { useEffect, useState } from "react";

import { Link as RouterLink } from "react-router-dom";
import axios from "axios";

import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";

import { AuthLayout } from "../layouts/AuthLayout";

import { backendAPI } from "../../api/backCoderAPI";

const handleGoogleSubmit = () => {
  alert("Pronto podras conectarte con tu cuenta de Google");
};

export const LoginPage = () => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthLayout title="Bienvenido - Login">
      <form>
        <Grid container>
          <Grid item sx={{ mt: 1 }} xs={12}>
            <TextField
              label="Correo"
              type="email"
              placeholder="Ingrese su email"
              fullWidth
              // onChange={(e) => setUserEmail(e.target.value)}
            />
          </Grid>
          <Grid item sx={{ mt: 1 }} xs={12}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              autoComplete="off"
              // onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={12}>
              <Button
                variant="contained"
                fullWidth
                // onClick={handleLogin}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button
                variant="contained"
                fullWidth
                // onClick={() => handleGoogleSubmit()}
              >
                <Google /> &nbsp; Google
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
