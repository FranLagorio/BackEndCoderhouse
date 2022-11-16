import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { ShopRoutes } from "../shop/routes/ShopRoutes";
import { Prueba } from "./Prueba";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/home" element={<ShopRoutes />}></Route>
        <Route path="/*" element={<AuthRoutes />}></Route>
        {/* <Route path="/*" element={<Prueba />}></Route> */}
      </Routes>
    </>
  );
};
