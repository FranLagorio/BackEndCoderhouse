const fs = require("fs");
const http = require("http");
const Contenedor = require("./classContenedor.js");
const express = require("express");

// const products = require("./products.js");

const route = "./productos.txt";
const archivo = new Contenedor(route);
const app = express();
const PORT = process.env.PORT || 8080;

//HTTP

// const server = http.createServer((peticion, respuesta) => {
// 	respuesta.end("Hola Mundo!");
// });

// const connectedServer = server.listen(PORT, () => {
// 	console.log(`Servidor Http escuchando en el puerto ${connectedServer.address().port}`);
// });

//EXPRESS
const server = app.listen(PORT, () => {
	console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));

app.get("/", (req, res) => {
	res.send({
		mensaje: "Bienvenidos al Desafio N°3 - Lagorio Francisco, camada Back-End N°32080",
	});
});

app.get("/productos", async (req, res) => {
	try {
		const products = await archivo.getAll();
		res.send(products);
	} catch (error) {}
});

app.get("/productoRandom", async (req, res) => {
	try {
		const products = await archivo.getRandom();
		res.send(products);
	} catch (error) {}
});
