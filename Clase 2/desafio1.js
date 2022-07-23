// DESAFIO DE CLASE - TIMERS

const fin = () => console.log("termine");

const mostrarLetras = (str, funcion) => {
	let ref;
	let contador = 0;
	ref = setInterval(() => {
		console.log(str[contador]);
		contador++;
		if (contador >= str.length) {
			funcion();
			clearInterval(ref);
		}
	}, 1000);
};

setTimeout(() => mostrarLetras("¡Hola0!", fin), 0);
setTimeout(() => mostrarLetras("¡Hola250!", fin), 250);
setTimeout(() => mostrarLetras("¡Hola500!", fin), 500);
