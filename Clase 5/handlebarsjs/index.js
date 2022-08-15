const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on('error', (error) => console.log(`Error en servidor ${error}`));

app.use('/public', express.static(__dirname + '/public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuracion del motor
app.set('view engine', 'hbs');
app.set('views', './views');
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
  })
);

let productsHC = [
  { id: 1, title: 'nike ball', price: 101, thumbnail: 'http://localhost:8080/public/nike-ball.jpg' },
  { id: 2, title: 'nike shoes', price: 102, thumbnail: 'http://localhost:8080/public/nike-shoes.jpg' },
  { id: 3, title: 'adidas shoes', price: 102, thumbnail: 'http://localhost:8080/public/adidas-shoes.jpg' },
];

app.get('/products', (req, res) => {
  if (productsHC.length !== 0) {
    res.render('productslist', { products: productsHC, productsExist: true });
  } else {
    res.render('error', { errorMessage: 'No se encuentran productos' });
  }
  //sirve productslist.hbs en index.hbs (index.hbs es la plantilla por defecto donde arranca todo)
});

app.get('/products/:id', (req, res) => {
  let { id } = req.params;
  try {
    let found = productsHC.find((element) => element.id == id);
    if (found) {
      res.render('oneProduct', { product: found, title: 'Detalle de Producto' });
    } else {
      res.render('error', { errorMessage: 'Producto no encontrado' });
    }
  } catch (error) {}
  //sirve productslist.hbs en index.hbs (index.hbs es la plantilla por defecto donde arranca todo)
  // res.render('productslist', { products: productsHC, productsExist: true });
});

app.get('/form', (req, res) => {
  //sirve productslist.hbs en index.hbs (index.hbs es la plantilla por defecto donde arranca todo)
  res.render('form');
});

app.post('/products', (req, res) => {
  const { body } = req;
  productsHC.push(body);
  res.render('productslist', { products: productsHC, productsExist: true });
});
