import mongoose from "mongoose";
import express from "express";
import {ObjectId} from "mongodb"

const app = express();
//Middleware para lectura de Json desde servidor
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Server Listening on ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error on Server: ${error}`));

import {estudiantes} from "./models/estudiante.js";

const URL = "mongodb://localhost:27017/colegio";

const conectar = async () => {
  let rta = await mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Conectado");
};



const guardarAlumnos = async () => {
  const arrayEstudiantes = [
  { nombre: 'Pedro', apellido: 'Mei', edad: 21, dni: '31155898', curso: '1A', nota: 7 },
  { nombre: 'Ana', apellido: 'Gonzalez', edad: 32, dni: '27651878', curso: '1A', nota: 8 },
  { nombre: 'José', apellido: 'Picos', edad: 29, dni: '34554398', curso: '2A', nota: 6 },
  { nombre: 'Lucas', apellido: 'Blanco', edad: 22, dni: '30355874', curso: '3A', nota: 10 },
  { nombre: 'María', apellido: 'García', edad: 36, dni: '29575148', curso: '1A', nota: 9 },
  { nombre: 'Federico', apellido: 'Perez', edad: 41, dni: '320118321', curso: '2A', nota: 5 },
  { nombre: 'Tomas', apellido: 'Sierra', edad: 19, dni: '38654790', curso: '2B', nota: 4 },
  { nombre: 'Carlos', apellido: 'Fernández', edad: 33, dni: '26935670', curso: '3B', nota: 2 },
  { nombre: 'Fabio', apellido: 'Pieres', edad: 39, dni: '4315388', curso: '1B', nota: 9 },
  { nombre: 'Daniel', apellido: 'Gallo', edad: 25, dni: '37923460', curso: '3B', nota: 2 },
  { nombre: 'Daniadasdasdasdasel', apellido: 'Gallo', edad: 25, dni: '37923460', curso: '3B', nota: 2 }
]

arrayEstudiantes.forEach(async element =>{ 
  let estudiante = new estudiantes(element)
  await estudiante.save()
})


}

const ordenarNombres = async () => {
  let est = await estudiantes.find().sort({nombre: 1})
  return est
}



await conectar();
//await guardarAlumnos()


app.use("/", async (req, res) => {
  //res.json(await ordenarNombres())
  //res.json(await estudiantes.find().sort({edad: 1}).limit(1))
  //res.json(await estudiantes.find({curso: "2A"}))
  //res.json(await estudiantes.find().sort({edad: 1}).skip(1).limit(1))
  //res.json(await estudiantes.find({},{nombre:1, apellido:1}).sort({apellido: -1}))
  //res.json(await estudiantes.find({nota: 10}))

  // let est = await estudiantes.find({})
  // let nota = est.reduce((count, ele) => count += ele.nota, 0)
  // res.json({"promedio de notas": nota/(est.length)})

  // let est = await estudiantes.find({curso: "1A"})
  // let nota = est.reduce((count, ele) => count += ele.nota, 0)
  // res.json({"promedio de notas curso 1A": nota/(est.length)})

  //await estudiantes.updateOne({nombre: "Lucas",apellido: "Blanco"}, {$set: {dni: "20355875"}})
  
  //await estudiantes.updateMany({}, {$set: {egreso: false}})

  //await estudiantes.updateMany({curso: "1A"},{$set: {ingreso: true}} )
  
  //res.json(await estudiantes.find({nota: {$gt: 4}}, {_id:0, __v:0}))

  //res.json(await estudiantes.find({ingreso: true}, {_id:0, __v:0}))


  //res.json(await estudiantes.deleteMany({ingreso: true}))

  //await estudiantes.updateMany({}, {$unset: {egreso:1}})

  let usr = await estudiantes.findOne({nombre: "Lucas"})

  var timestamp = usr._id.getTimestamp();
  console.log(timestamp)
  timestamp.setHours(timestamp.getHours()-3)
  let ttt = timestamp.toISOString().replace(/([^T]+)T([^\.]+).*/g, '$1 $2')
  res.json({adssada: usr._id, timeCreated: ttt})
})


