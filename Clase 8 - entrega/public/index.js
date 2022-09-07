const socket = io();
//Aca me conecte al servidor, el servidor se entera que
//entro alguien nuevo

//Atrapan mensajes que envio del server
//El socket es uno, es la conexion
//El canal es el socket
socket.on("connect", () => {
  console.log("Te has conectado");
});

//le mando la el mensaje
function enviarChat() {
  //socket.emit("data-generica", "Hace 4 segundos que estas conectado");
  const email = document.getElementById("caja-nombre").value;
  const mensaje = document.getElementById("caja-msg").value;

  var d = new Date();
  let minutes = d.getMinutes().toString().padStart(2, "0");
  let seconds = d.getSeconds().toString().padStart(2, "0");

  dformat =
    [d.getMonth() + 1, d.getDate(), d.getFullYear()].join("/") +
    " " +
    [d.getHours(), minutes, seconds].join(":");

  // if (email.includes("@" && ".com")) {
  //   socket.emit(
  //     "data-chat",
  //     `<span style="color:blue">${email}</span> <span style="color:red">[${dformat}]</span>: <span style="color:green">${mensaje}</span>`
  //   );
  // } else {
  //   alert("Debe ingresar un email con el formato ...@--email.com");
  // }
  socket.emit("data-chat", {
    messageHtml: `<span style="color:blue">${email}</span> <span style="color:red">[${dformat}]</span>: <span style="color:green">${mensaje}</span>`,
    message: mensaje,
    email: email,
  });

  document.getElementById("caja-msg").value = "";
}

//viene el mensaje filtrado

socket.on("arr-chat", (data) => {
  const html = data.reduce((html, item) => `<div>${item}</div>` + html, "");
  document.getElementById("div-chats").innerHTML = html;
});

//Envio de Form
function submitProduct(e) {
  e.preventDefault();
  const bodyForm = document.getElementById("formProduct");

  let newProduct = {
    name: bodyForm.name.value,
    description: bodyForm.description.value,
    code: bodyForm.code.value,
    thumbnail: bodyForm.thumbnail.value,
    price: bodyForm.price.value,
    stock: bodyForm.stock.value,
  };
  socket.emit("new-product", newProduct);
  bodyForm.reset();
  return false;
}

socket.on("newProduct", (data) => {
  document.getElementById("productsTable").innerHTML = "";
  let newProductTable = "";
  data.forEach((obj) => {
    newProductTable += `
  	<tr>
  	<th scope="row">
  			${obj.id}
  	</th>
  	<td style="text-transform: uppercase;">
  			${obj.name}
  	</td>
  	<td>
    ${obj.description}
  	</td>
    <td>
    ${obj.code}
  	</td>
  	<td>
    <img src="${obj.thumbnail}" class="product-img" alt="..." />
    </td>
    <td>
    $${obj.price}
  	</td>
    <td>
    ${obj.stock}
  	</td>
    <td>
    ${obj.timestamp}
  	</td>
  </tr>`;
  });
  document.getElementById("productsTable").innerHTML = newProductTable;
});
