//HARDCODEAR MI FECHA DE NACIMIENTO
//OBTENER LA FECHA ACTUAL DE FORMA DINAMICA
//USAR DIFF PARA SABER AÑOS Y DIAS
//CLG DIFERENCIA

const moment = require("moment");

const nacimiento = new Date("1995-06-06");
// const fechaActual = new Date();

console.log("Hoy es: ", moment().format("1995-06-06", "DD-MM-YYYY"));

console.log("Años: ", moment().diff(nacimiento, "y"));
console.log("Dias: ", moment().diff(nacimiento, "d"));
