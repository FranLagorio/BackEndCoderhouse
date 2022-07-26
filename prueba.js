// function main() {
// 	let x = 3;
// 	(function main2() {
// 		return x * 2;
// 	})();
// }
// console.log(main());
// console.log(x);

// async function main() {
// 	function main2() {
// 		return 2 * 2;
// 	}
// 	await main2();
// 	console.log("hola");
// }

// main().then(() => console.log("fin"));

let min = 0;
let max = 2;

let randomNum = Math.floor(Math.random() * (max - min + 1));

console.log(randomNum);
