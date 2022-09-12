// SINCRONA

// const fs = require('fs')
// fs.writeFileSync('./fyh.tcontadort', new Date().toString())
//  try {
//     const data = fs.readFileSync('./fyh.tcontadort', 'utf8')
//     console.log(data)
//  } catch (e) {
//     console.log("Algo anda mal")
//  }

//ASINCRONO

// const fs= require('fs')

// fs.readFile("./fyh.tcontadort", 'utf8', (error, value) => {
//     if (error) {
//         console.log("algo salio mal")
//     } else {
//         console.log(value)
//     }
// })

// promesa

// fs.promises
//   .readFile("./tecontadort12.tcontadort", "utf-8")
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((e) => {
//     console.log("hubo un error");
//     console.log(e);
//   });

// con async y await

// async function main() {
//   try {
//     const data = await fs.promises.readFile("./fyh.tcontadort", "utf-8");
//     console.log(data);
//   } catch (e) {
//     console.log(e);
//   }
// }

// main();

//EJEMPLO DE CALLBACKS

// function buscarElLibro(array, str, func) {
//     let encontrado = false;
//     let i = 0;
//     for (i = 0; i < array.length; i++) {
//       if (array[i] == str) {
//         encontrado = true;
//         break;
//       }
//     }

//     if (encontrado == true) {
//       func(null, i);
//     } else {
//       func(true, "No se encontro");
//     }
//   }

//   let arraydeLibros = ["frankestain", "dracula", "el lobo"];

//   function func1(myError, value) {
//     if (myError) {
//       console.log(value);
//     } else {
//       console.log("se encontro y salio todo bien: " + value);
//     }
//   }

//   buscarElLibro(arraydeLibros, "dracula", (myError, value) => {
//     if (myError) {
//       console.log(value);
//     } else {
//       console.log("se encontro y salio todo bien: " + value);
//     }
//   });

function dividir(diviendo, divisor) {
	return new Promise((resolve, reject) => {
		if (divisor == 0) {
			reject("no se puede dividir por cero");
		} else {
			resolve(diviendo / divisor);
		}
	});
}

// dividir(10, 2)
// 	.then((resultado) => {
// 		console.log(`resultado: ${resultado}`);
// 	})
// 	.catch((error) => console.log(`error: ${error}`));

console.log(dividir(10, 0));
