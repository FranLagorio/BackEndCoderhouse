const productos = [
	{ id: 1, nombre: "Escuadra", precio: 323.45 },
	{ id: 2, nombre: "Calculadora", precio: 234.56 },
	{ id: 3, nombre: "Globo Terráqueo", precio: 45.67 },
	{ id: 4, nombre: "Paleta Pintura", precio: 456.78 },
	{ id: 5, nombre: "Reloj", precio: 67.89 },
	{ id: 6, nombre: "Agenda", precio: 78.9 },
];

//reduce o forEach
const nombres = (productos) => {
	let aux = "";
	let precioTotal = 0;
	let promedio;
	let menorPrecio = productos[0].precio;
	let mayorPrecio = -1;

	productos.forEach((element) => {
		aux += element.nombre + ",";
		precioTotal += element.precio;
		if (menorPrecio > element.precio) {
			menorPrecio = element.precio;
		}

		if (element.precio > mayorPrecio) {
			mayorPrecio = element.precio;
		}
	});

	promedio = precioTotal / productos.length;
	aux = aux.slice(0, aux.length - 1);
	aux += aux + ".";
	return {
		nombres: aux,
		precioTotal: parseFloat(precioTotal.toFixed(2)),
		menorPrecio: parseFloat(menorPrecio.toFixed(2)),
		mayorPrecio: parseFloat(mayorPrecio.toFixed(2)),
		promedio: parseFloat(promedio.toFixed(2)),
	};
};

console.log(nombres(productos));

// console.log(
// 	productos.reduce((acc, elem) => {
// 		return acc + elem.nombre + ",";
// 	}, "")
// );
