import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        {/* <Route path="/home" element={<ShopRoutes />}></Route> */}
        <Route path="/*" element={<AuthRoutes />}></Route>
        {/* <Route path="/*" element={<Prueba />}></Route> */}
      </Routes>
    </>
  );
};
