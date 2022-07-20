////////// CREACION DE CLASE

class Usuario {
	constructor(nombre, apellido, libros, mascotas) {
		(this.name = nombre),
			(this.apellido = apellido),
			(this.libros = libros),
			(this.mascotas = mascotas);
	}

	getFullName() {
		return `${this.name}  ${this.apellido}`;
	}

	addMascota(mascota) {
		this.mascotas.push(mascota);
		return this.mascotas;
	}

	countMascotas() {
		// console.log(`La cantidad de mascotas es: ${this.mascotas.length}`)
		return this.mascotas.length;
	}

	addBook(x, y) {
		this.libros.push({ nombre: x, autor: y });
		return this.libros;
	}

	getBookNames() {
		// let arrAux= []
		// this.libros.map((element)=>{
		//     arrAux.push(element.nombre)
		// })
		// console.log(arrAux)
		return this.libros.map((libro) => libro.nombre);
	}
}

////////// CREACION DE USUARIO

const usuario1 = new Usuario(
	"Francisco",
	"Lagorio",
	[
		{
			nombre: "El principito",
			autor: "Antoine de Saint-Exupéry",
		},
		{
			nombre: "El código Da Vinci",
			autor: "Dan Brown",
		},
	],
	["Perro", "Gato"]
);

////////// LLAMADO DE METODOS

console.log(usuario1.getFullName());
usuario1.addMascota("Caballo");
console.log(`Se agrego ${usuario1.mascotas[usuario1.mascotas.length - 1]}`);
console.log(`Las mascotas ahora son ${usuario1.mascotas}`);
// usuario1.countMascotas();
console.log(`La cantidad de mascotas es: ${usuario1.countMascotas()}`);
usuario1.addBook("La Batalla del Futuro", "Mateo Salvatto");
console.log(`Los libros ahora son: ${usuario1.getBookNames()}`);
