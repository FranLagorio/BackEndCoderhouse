////////////////////////////////////////////////////////////////
//MINIMIST
// const parseArgs = require("minimist");
// const args = parseArgs(process.argv.slice(2));
// // console.log(args);
// // console.log(process.argv.slice(2));
// const obj = {
//   modo: args.m || "prod",
//   puerto: args.p || 0,
//   debug: args.d || false,
//   otros: args._ || [],
// };
// console.log(obj);

////////////////////////////////////////////////////////////////
//YARGS
// const yargs = require("yargs/yargs")(process.argv.slice(2));
// const args = yargs
//   .alias({ n: "nombre", a: "apellido" })
//   .default({ nombre: "fran", apellido: "lagorio" }).argv;
// console.log(args);
const path = require("path");
const dotenv = require("dotenv");
// dotenv.config({
//   path: path.resolve(
//     __dirname,
//     process.env.MODO == "prod" ? ".env.prod" : ".env.testing"
//   ),
// });
const { HOST, PORT } = require("./config");
console.log(HOST, PORT);
console.log(process.env.MODO);
