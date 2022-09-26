import { normalize, schema } from "normalizr";

// Definimos un esquema de autor
const schemaAuthor = new schema.Entity("author", {}, { idAttribute: "email" });

// Definimos un esquema de mensaje
const schemaMensaje = new schema.Entity("post", { author: schemaAuthor });

// Definimos un esquema de posts
const schemaMensajes = new schema.Entity("posts", {
  mensajes: [schemaMensaje],
});

const normalizarMensajes = (mensajes) => {
  const originalData = { id: "999", posts: mensajes };
  normalize({ id: "mensajes", mensajes: originalData }, schemaMensajes);
};

export { normalizarMensajes };
