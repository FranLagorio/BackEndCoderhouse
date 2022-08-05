const express = require("express");
const fs = require("fs");

const app = express();
const { Router } = express;
const router = Router();

const multer = require("multer");
const upload = multer();

const Contenedor = require("./public/classContenedor");
const route = "./public/productos.txt";
const archivo = new Contenedor(route);

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.none());
app.use("/api/productos", router);
//Para servir archivos estaticos, como imagenes, css, archivos js
// app.use(express.static("public"));
// app.use(express.static("utils"));
//MANERA ABSOLUTA

const server = app.listen(PORT, () => {
	console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});

app.use("/public", express.static(__dirname + "/public"));

server.on("error", (error) => console.log(`Error en servidor ${error}`));

app.get("/", (req, res) => {
	res.send({
		mensaje: "Bienvenidos al Desafio N°4 - Lagorio Francisco, camada Back-End N°32080",
	});
});

app.get("/public", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

//METODO POST DESDE EL FORM
app.post("/public", async (req, res) => {
	const { body } = req;
	const obj = {
		title: body.title,
		price: parseFloat(body.price),
		thumbnail: body.thumbnail,
	};
	await archivo.save(obj);
	let products = await archivo.getAll();
	res.json(products);

	// let pagina = "<!doctype html><html><head></head><body></body></html>";
	// res.send(pagina);
});

// app.put("/public", async (req, res) => {
// 	const { body } = req;
// 	const obj = {
// 		title: body.title,
// 		price: parseFloat(body.price),
// 		thumbnail: body.thumbnail,
// 	};
// 	console.log(obj);
// 	// await archivo.save(obj);
// 	// let products = await archivo.getAll();
// 	// res.json(products);
// });

//api/productos 	METODO GET
router.get("/", async (req, res) => {
	try {
		let products = await archivo.getAll();
		res.json(products);
	} catch (error) {
		console.log(error);
	}
});

//api/productos 	METODO GET BY ID
router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		let productById = await archivo.getById(id);
		if (productById != undefined) {
			res.json(productById);
		} else {
			res.json({ error: "producto no encontrado" });
		}
	} catch (error) {
		console.log("error");
	}
});

const productNuevo = {
	title: "Mapa Mundi",
	price: 1031,
	thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/mapa.png",
};

//api/productos 	METODO POST
router.post("/", async (req, res) => {
	//await archivo.save(productNuevo);
	const { body } = req;
	await archivo.save(body);
	let products = await archivo.getAll();
	res.json(products);
});

//api/productos 	METODO PUT
router.put("/:id", async (req, res) => {
	const { id } = req.params;
	const { body } = req;

	let productos = await archivo.getAll();
	let productPut = productos.find((element) => element.id == id);

	if (productPut) {
		//Buscamos el producto con el id y modificamos su propiedad, sino existe pasamos al else
		productPut = { ...productPut, ...body };
		await archivo.update(id, productPut);
		res.json({
			success: "OK",
			Modified: productPut,
		});
	} else {
		res.json({ error: "Producto no encontrado" });
	}
});

router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	const productos = await archivo.getAll();
	const productToDelete = productos.find((element) => element.id == id);
	if (productToDelete) {
		await archivo.deleteById(id);
		res.json({ success: "OK", productoEliminado: productToDelete });
	} else {
		res.json({ error: "Producto no encontrado" });
	}
});
