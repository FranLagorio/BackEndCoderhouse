document.getElementById("searchId").addEventListener("click", cargarTXT);

function cargarTXT(e) {
	e.preventDefault();
	// const id = document.getElementById("formPut")[0].value;
	const id = document.getElementById("id").value;

	fetch("./productos.txt")
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			let product = data.find((element) => element.id == id);
			console.log(product);
			document.getElementById("titlePut").value = product.title;
			document.getElementById("pricePut").value = product.price;
			document.getElementById("thumbnailPut").value = product.thumbnail;
		});
}
