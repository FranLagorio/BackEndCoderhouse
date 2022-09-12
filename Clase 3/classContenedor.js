const fs = require("fs");
const route = "./productos.txt";

//DEFINO LA CLASE
class Contenedor {
	constructor(file) {
		this.file = file;
	}

	save = async (object) => {
		try {
			const data = await fs.promises.readFile(route, "utf-8");
			let products = JSON.parse(data);
			if (products.length > 0) {
				object.id = products[products.length - 1].id + 1;
				products.push(object);
				const productsJson = JSON.stringify(products, null, 2);
				await fs.promises.writeFile(this.file, productsJson);
				console.log(
					`Se ha agregado ${object.title} como un nuevo producto`
				);
			} else {
				let products = [];
				object.id = 1;
				products.push(object);
				const productsJson = JSON.stringify(products, null, 2);
				await fs.promises.writeFile(this.file, productsJson);
				console.log(
					`Se ha agregado ${object.title} como un nuevo producto`
				);
			}
		} catch (err) {
			const productsJson = JSON.stringify([], null, 2);
			await fs.promises.writeFile(this.file, productsJson);
		}
	};

	getAll = async () => {
		try {
			const data = await fs.promises.readFile(route, "utf-8");
			let products = JSON.parse(data);
			return products;
			console.log(products);
		} catch (error) {
			console.log("Algo salio mal y no se obtienen productos!");
		}
	};

	getById = async (id) => {
		try {
			const data = await fs.promises.readFile(route, "utf-8");
			let products = JSON.parse(data);
			let aux = null;
			products.map((element) => {
				if (element.id == id) {
					aux = element;
					console.log(aux);
					return aux;
				}
			});

			if (aux == null) {
				console.log("No existe ese ID");
			}
		} catch (error) {
			console.log("Algo anda mal!");
			return null;
		}
	};

	deleteById = async (id) => {
		try {
			const data = await fs.promises.readFile(route, "utf-8");
			let products = JSON.parse(data);
			if (products.find((element) => element.id === id)) {
				let aux = products.filter((element) => element.id != id);
				products = aux;
				await fs.promises.writeFile(
					this.file,
					JSON.stringify(products, null, 2)
				);
				await console.log(`Se ha eliminado el id: ${id}`);
			} else {
				console.log("No se encuentra ese ID");
			}
		} catch (error) {
			console.log("Algo ha salido mal");
		}
	};

	deleteAll = async () => {
		try {
			await fs.promises.writeFile(this.file, JSON.stringify([]));
		} catch (error) {
			console.log("Algo ha salido mal");
		}
	};

	getRandom = async () => {
		try {
			const data = await fs.promises.readFile(route, "utf-8");
			let products = await JSON.parse(data);

			let min = 0;
			let max = products.length - 1;
			let randomNum = Math.floor(Math.random() * (max - min + 1));
			console.log(products[randomNum]);
			return products[randomNum];
		} catch (error) {
			console.log("Algo anda mal!");
			return null;
		}
	};
}

module.exports = Contenedor;

////Operaciones Sincronas
// fs.readFileSync
// fs.writeFileSync
// fs.unlinkSync
// fs.mkdirSync

////Operaciones Asincronas
// fs.readFile
// fs.writeFile
// fs.unlink
// fs.mkdir
