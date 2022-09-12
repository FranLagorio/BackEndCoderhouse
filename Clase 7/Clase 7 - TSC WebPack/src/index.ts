import express from "express";
//aca aclaro que quiero
import { getTime } from "./lib/utils";
//aca traigo el default- persona
import Persona from "./Persona";

const p: Persona = new Persona("Coder", "House");

const app = express();

app.get("/", (req, res) => {
  res.send({
    time: getTime(),
    name: p.getFullName(),
  });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`conectado al puerto: ${PORT}`);
});
