import { Router } from 'express';
import { getDatosController, postDatosController } from '../controlador/datos.js';

const routerDatos = new Router();
//api/datos
routerDatos.get('/', getDatosController);
routerDatos.post('/', postDatosController);

export default routerDatos;
