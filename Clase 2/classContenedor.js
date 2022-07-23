const fs = require("fs");

//DEFINO LA CLASE
class Contenedor {
	constructor(file) {
		this.file = file;
	}

	save = async (object) => {
		try {
			if (products.length > 0) {
				object.id = products[products.length - 1].id + 1;
				products.push(object);
				const productsJson = JSON.stringify(products, null, 2);
				await fs.promises.writeFile(this.file, productsJson);
				console.log(
					`Se ha agregado ${object.title} como un nuevo producto`
				);
			} else {
				object.id = 1;
				products.push(object);
				const productsJson = JSON.stringify(products, null, 2);
				await fs.promises.writeFile(this.file, productsJson);
				console.log(
					`Se ha agregado ${object.title} como un nuevo producto`
				);
			}
		} catch (err) {
			console.log(err.message);
		}
	};

	getAll = async () => {
		try {
			console.log(products);
		} catch (error) {
			console.log("Algo salio mal y no se obtienen productos!");
		}
	};
	getById = async (id) => {
		try {
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
