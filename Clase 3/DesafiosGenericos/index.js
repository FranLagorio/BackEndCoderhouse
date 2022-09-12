// Desarrollar un servidor en node.js que escuche peticiones en el puerto 8080 y responda un mensaje de acuerdo a la hora actual:
// Si la hora actual se encuentra entre las 6 y las 12 hs será 'Buenos días!'.
// Entre las 13 y las 19 hs será 'Buenas tardes!'.
// De 20 a 5 hs será 'Buenas noches!'.

// Se mostrará por consola cuando el servidor esté listo para operar y en qué puerto lo está haciendo.

// const http = require("http");

// const server = http.createServer((peticion, respuesta) => {
// 	const horaActual = new Date().getHours();
// 	if (horaActual > 6 && horaActual < 12) {
// 		respuesta.end("Buenos dias");
// 	} else if (horaActual > 12 && horaActual < 19) {
// 		respuesta.end("Buenas tardes");
// 	} else {
// 		respuesta.end("Buenas noches");
// 	}
// });

// const connectedServer = server.listen(8080, () => {
// 	console.log(`Servidor Http escuchando en el puerto ${connectedServer.address().port}`);
// });

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
	console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));

app.get("/", (req, res) => {
	res.send({ mensaje: "hola mundo" });
});

app.get("/guille", (req, res) => {
	res.send({ id: 0, nombre: "Guille", edad: 40 });
});

// fetch('https://teal-ripple-kiwi.glitch.me/sabri').then((res)=> res.json()).then((sabri)=> console.log(sabri));
