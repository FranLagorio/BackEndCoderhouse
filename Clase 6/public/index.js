const socket = io();
//Aca me conecte al servidor, el servidor se entera que
//entro alguien nuevo

//Atrapan mensajes que envio del server
//El socket es uno, es la conexion
//El canal es el socket
socket.on("connect", () => {
	console.log("me conecte");
});

socket.on("data-generica", (data) => {
	console.log(data);
});

socket.on("arr-chat", (data) => {
	console.log(data);
	const html = data.reduce((html, item) => `<div>${item}</div>` + html, "");
	document.getElementById("div-chats").innerHTML = html;
});

function enviar() {
	//socket.emit("data-generica", "Hace 4 segundos que estas conectado");
	const nombre = document.getElementById("caja-nombre").value;
	const mensaje = document.getElementById("caja-msg").value;

	socket.emit("data-generica", nombre + " dice " + mensaje);
}
