const socket = io();

socket.on("connect", () => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

function enviarChat() {
  const mensaje = {
    author: {
      id: document.getElementById("email").value,
      nombre: document.getElementById("nombre").value,
      apellido: document.getElementById("apellido").value,
      edad: document.getElementById("edad").value,
      alias: document.getElementById("alias").value,
      avatar: document.getElementById("avatar").value,
    },
    text: document.getElementById("caja-msg").value,
  };
  socket.emit("nuevo-mensaje", mensaje);
  document.getElementById("caja-msg").value = "";
}

socket.on("mensajes", (data) => {
  //const html = data.reduce((html, item) => `<div>${item}</div>` + html, "");
  document.getElementById("div-chats").innerHTML = data;
});

// MENSAJES

/* --------------------- DESNORMALIZACIÓN DE MENSAJES ---------------------------- */
// Definimos un esquema de autor
// const schemaAuthor = new normalizr.schema.Entity(
//   "author",
//   {},
//   { idAttribute: "id" }
// );

// // Definimos un esquema de mensaje
// const schemaMensaje = new normalizr.schema.Entity(
//   "post",
//   { author: schemaAuthor },
//   { idAttribute: "_id" }
// );

// // Definimos un esquema de posts
// const schemaMensajes = new normalizr.schema.Entity(
//   "posts",
//   { mensajes: [schemaMensaje] },
//   { idAttribute: "id" }
// );
// /* ----------------------------------------------------------------------------- */
