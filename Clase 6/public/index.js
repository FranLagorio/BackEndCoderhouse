const socket = io();
//Aca me conecte al servidor, el servidor se entera que
//entro alguien nuevo

//Atrapan mensajes que envio del server
//El socket es uno, es la conexion
//El canal es el socket
socket.on("connect", () => {
  console.log("Te has conectado");
});

// socket.on("data-generica", (data) => {
//   console.log(data);
// });

//le mando la el mensaje
function enviarChat() {
  //socket.emit("data-generica", "Hace 4 segundos que estas conectado");
  const email = document.getElementById("caja-nombre").value;
  const mensaje = document.getElementById("caja-msg").value;

  var d = new Date(),
    dformat =
      [d.getMonth() + 1, d.getDate(), d.getFullYear()].join("/") +
      " " +
      [d.getHours(), d.getMinutes(), d.getSeconds()].join(":");

  if (email.includes("@" && ".com")) {
    socket.emit(
      "data-chat",
      `<span style="color:blue">${email}</span> <span style="color:red">[${dformat}]</span>: <span style="color:green">${mensaje}</span>`
    );
  } else {
    alert("Debe ingresar un email con el formato ...@--email.com");
  }

  document.getElementById("caja-msg").value = "";
}
// <span color="blue">${item.email}</span>
//<span color="red">${item.dformat}</span>:
//<span color="green">${item.mensaje}</span>

//viene el mensaje filtrado

socket.on("arr-chat", (data) => {
  //console.log(data);
  const html = data.reduce((html, item) => `<div>${item}</div>` + html, "");
  document.getElementById("div-chats").innerHTML = html;
});

//Envio de Form
function submitProduct(e) {
  e.preventDefault();
  const bodyForm = document.getElementById("formProduct");

  let newProduct = {
    id: bodyForm.id.value,
    title: bodyForm.title.value,
    price: bodyForm.price.value,
    thumbnail: bodyForm.thumbnail.value,
  };

  //console.log(newProduct);
  socket.emit("new-product", newProduct);

  // let inputs = bodyForm.getElementsByTagName("input");

  // let inputList = Array.prototype.slice.call(inputs);
  // let inputList = Array.from(inputs);
  // let inputList = [...inputs];

  // inputList.forEach((element) => {
  //   console.log(element);
  //   element.value = "";
  // });

  bodyForm.reset();

  return false;
}

socket.on("newProducts", (data) => {
  document.getElementById("productsTable").innerHTML = "";
  let newProductsTable = "";
  data.forEach((obj) => {
    newProductsTable += `
		<tr>
		<th scope="row">
				${obj.id}
		</th>
		<td style="text-transform: uppercase;">
				${obj.title}
		</td>
		<td> ${obj.price}
		</td>
		<td><img src="${obj.thumbnail}" class="product-img" alt="..." /></td>
	</tr>`;
  });
  document.getElementById("productsTable").innerHTML = newProductsTable;
});
