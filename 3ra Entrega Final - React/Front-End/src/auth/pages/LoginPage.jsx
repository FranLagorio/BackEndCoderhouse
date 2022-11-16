import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";

import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";

import { AuthLayout } from "../layouts/AuthLayout";
import { setUser, setAuth } from "../../slice/loginSlice";
import { backendAPI } from "../../api/backCoderAPI";

const handleGoogleSubmit = () => {
  alert("Pronto podras conectarte con tu cuenta de Google");
};

export const LoginPage = () => {
  const { isAuth, user } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log(isAuth);
    backendAPI
      .get("/login")
      .then((res) => res.data)
      .then((data) => {
        if (data.authenticated == true) {
          dispatch(setAuth);
        }
      });
  }, [user]);

  const handleLogin = () => {
    backendAPI
      .post("/login", {
        username: userEmail,
        password,
      })
      .then((res) => {
        if (res.data.validator == false) {
          alert("Datos mal ingresados");
        } else {
          dispatch(setUser(res.data));
        }
      })
      .catch((err) => {
        console.error(err);
      });

    // axios
    //   // .post("http://localhost:8080/login", { username, password })
    //   .post(`${import.meta.env.VITE_SERVER_URL}/login`, {
    //     username: userEmail,
    //     password,
    //   })
    //   .then((res) => {
    //     if (res.data.validator == false) {
    //       alert("Datos mal ingresados");
    //     } else {
    //       dispatch(setUser(res.data));
    //     }
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  };

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
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </Grid>
          <Grid item sx={{ mt: 1 }} xs={12}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" fullWidth onClick={handleLogin}>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => handleGoogleSubmit()}
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
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
