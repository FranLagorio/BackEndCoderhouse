import axios from "axios";
import React, { useEffect, useState } from "react";

export const Prueba = () => {
  const [estado, setEstado] = useState({});
  useEffect(() => {
    fetch("http://localhost:8080/home", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setEstado(data));

    // axios
    //   .get("http://localhost:8080/home")
    //   .then((res) => res.data)
    //   .then((data) => setEstado(data));
  }, []);

  return estado.nombre == "fran" ? <p>joya</p> : <p>Esta en false</p>;
};
