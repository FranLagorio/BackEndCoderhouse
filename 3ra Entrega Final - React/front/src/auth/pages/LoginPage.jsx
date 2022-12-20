import { useEffect, useState } from "react";

import { Link as RouterLink } from "react-router-dom";

import { Button, Card, Grid, Link, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";

import { AuthLayout } from "../layouts/AuthLayout";

import { loginUser } from "../../api/backCoderAPI";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

import { CardBody, Input, FormFeedback, Label, Form } from "reactstrap";

const handleGoogleSubmit = () => {
  alert("Pronto podras conectarte con tu cuenta de Google");
};

export const LoginPage = () => {
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      // dispatch(loginUser(values, props.router.navigate))
      const user = {
        username: values.email,
        password: values.password,
      };
      // console.log(user);
      loginUser(user);
    },
  });

  return (
    <AuthLayout>
      <Grid item md={6} lg={4} xl={3}>
        <Card style={{ borderRadius: 5, fontFamily: "poppins" }}>
          <Typography
            variant="h5"
            textAlign={"center"}
            style={{ margin: "1.5rem" }}>
            BACKEND CODERHOUSE 32080 {<br />} BIENVENIDO
          </Typography>

          <CardBody style={{ margin: "1rem" }}>
            <div className="p-2">
              <Form
                className="form-horizontal"
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}>
                {/* {error ? <Alert color="danger">{error}</Alert> : null} */}

                <div className="mb-3">
                  <Label className="form-label">Email</Label>
                  <Input
                    name="email"
                    className="form-control"
                    placeholder="Enter email"
                    type="email"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.email || ""}
                    invalid={
                      validation.touched.email && validation.errors.email
                        ? true
                        : false
                    }
                  />
                  {validation.touched.email && validation.errors.email ? (
                    <FormFeedback type="invalid">
                      {validation.errors.email}
                    </FormFeedback>
                  ) : null}
                </div>

                <div className="mb-3">
                  <Label className="form-label">Password</Label>
                  <Input
                    name="password"
                    value={validation.values.password || ""}
                    type="password"
                    placeholder="Enter Password"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    invalid={
                      validation.touched.password && validation.errors.password
                        ? true
                        : false
                    }
                    cd
                  />
                  {validation.touched.password && validation.errors.password ? (
                    <FormFeedback type="invalid">
                      {validation.errors.password}
                    </FormFeedback>
                  ) : null}
                </div>

                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customControlInline"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="customControlInline">
                    Remember me
                  </label>
                </div>

                <div className="mt-4 text-center -50">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ width: "50%" }}>
                    Log In
                  </Button>
                </div>

                <div className="mt-2 text-center">
                  <Button
                    variant="outlined"
                    sx={{ width: "50%" }}
                    onClick={() => handleGoogleSubmit()}>
                    <Google /> &nbsp; Google
                  </Button>
                </div>

                <div className="mt-3 d-flex flex-column align-items-center">
                  <Link sx={{ textDecoration: "none" }}>
                    {/* <Link to="/reset-password" className="text-muted"> */}
                    Forgot your password?
                  </Link>
                  <div className="mt-5">
                    Don't have an account?{" "}
                    <Link
                      component={RouterLink}
                      to="/register"
                      sx={{ textDecoration: "none" }}>
                      Register
                    </Link>
                  </div>
                </div>

                {/* {error &&
                  error ===
                    "Your account is not verified, check your email inbox" ? (
                    <div className="mt-4 text-center">
                      <Link
                        to="/email-verification"
                        state={{ email: validation.values.email }}
                        className="text-muted">
                        <i className="fa fa-envelope" />
                        {" Resend verification email"}
                      </Link>
                    </div>
                  ) : null} */}
              </Form>
            </div>
          </CardBody>
        </Card>
      </Grid>
    </AuthLayout>
  );
};
