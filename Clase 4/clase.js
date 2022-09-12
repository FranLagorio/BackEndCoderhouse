const fs = require("fs");
const express = require("express");
const app = express();
const { Router } = express;
const router = Router();

const PORT = process.env.PORT || 3000;

//EXPRESS
const server = app.listen(PORT, () => {
	console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));

let productos = [
	{ id: 100, name: "nike ball", price: 100 },
	{ id: 101, name: "nike shoes", price: 200 },
	{ id: 102, name: "adids shoes", price: 300 },
];

// IMPORTANTE PARA LEER JSONS !!!!!
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/productos", router);
//app. es como decir expres.. nada mas que esta almacenado arriba en la linea 7

app.get("/", (req, res) => {
	res.send({
		mensaje: "Bienvenidos al Desafio N°3 - Lagorio Francisco, camada Back-End N°32080",
	});
});

router.get("/", async (req, res) => {
	try {
		res.json(productos);
	} catch (error) {}
});

// app.post("/productos", async (req, res) => {
// 	try {
// 		const respuesta = {
// 			success: "ok",
// 			newProduct: {
// 				id: 105,
// 				name: "nike",
// 				price: 450,
// 			},
// 		};
// 		res.json(respuesta);
// 	} catch (error) {}
// });

router.post("/", (req, res) => {
	const { body } = req;
	body.id = 108;
	res.json({ SUCCESS: "OK", new: body });
});

//PUT
router.put("/:id", (req, res) => {
	const { id } = req.params;
	const { body } = req;
	const productToChange = productos.find((item) => item.id == id);
	productToChange.price = body.price;
	res.json({ SUCCESS: "OK", new: productToChange });
});

//DELETE CON ID PARAMS SIEMPRE
router.delete("/:id", (req, res) => {
	const { id } = req.params;
	const productsFilteredById = productos.filter((item) => item.id != id);
	console.log(productsFilteredById);
	res.json({ success: "ok" });
});

app.use("/public", express.static(__dirname + "/public"));
