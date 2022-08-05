const x = 3;
const y = 5;
function main() {
	const x = 6;
	console.log(x);
	return x;
}
console.log(main());
console.log(x, y);

// async function main() {
// 	function main2() {
// 		return 2 * 2;
// 	}
// 	await main2();
// 	console.log("hola");
// }

// main().then(() => console.log("fin"));

// let min = 0;
// let max = 2;

// let randomNum = Math.floor(Math.random() * (max - min + 1));

// console.log(randomNum);
