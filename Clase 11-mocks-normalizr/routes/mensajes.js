import MensajesController from "../controller/mensajesController.js";
import { normalizarMensajes } from "../src/normalizr/normalizeMensajes.js";
const mensajesController = new MensajesController();

export default async function configurarSocket(socket, sockets) {
  socket.on("nuevo-mensaje", async (mensaje) => {
    await mensajesController.save(mensaje);
    let mensajes = await mensajesController.getAll();
    console.log(mensajes);
    let mensajesNormalizados = normalizarMensajes(mensajes);
    console.log(JSON.stringify(mensajesNormalizados));

    sockets.emit("mensajes", "hola");
    //sockets.emit("mensajes", normalizarMensajes(await mensajesApi.listarAll()));
  });
}

///////////FUNCIONABA SIN NORMALIZAR
// export default async function configurarSocket(socket, sockets) {
//   socket.on("nuevo-mensaje", async (mensaje) => {
//     console.log(mensaje);
//     await mensajesController.save(mensaje);
//     let mensajes = await mensajesController.getAll();
//     console.log(mensajes);
//     let data = "";
//     mensajes.forEach((ele) => {
//       data += `<span>${ele.author.id} dice ${ele.text}</span><br>`;
//     });

//     sockets.emit("mensajes", data);
//     //sockets.emit("mensajes", normalizarMensajes(await mensajesApi.listarAll()));
//   });
// }
