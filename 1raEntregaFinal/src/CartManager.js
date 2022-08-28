const fs = require("fs");

class CartManager {
  constructor(file) {
    this.file = file;
  }

  getAll = () => {
    try {
      let cartData = fs.readFileSync(this.file, "utf8");
      let parsedCartData = JSON.parse(cartData);
      return parsedCartData;
    } catch (e) {
      console.log(
        "Algo salio mal y no se obtienen productos! ",
        "(puede que este sea la creacion o no este creado el archivo file)"
      );
    }
  };

  getCartById = (id) => {
    try {
      let cartList = this.getAll();
      let foundCart = cartList.find((element) => element.id == id);

      if (foundCart == undefined) {
        return undefined;
      } else {
        return foundCart;
      }
    } catch (error) {
      return error;
    }
  };

  saveCart = () => {
    try {
      let cartList = this.getAll();
      if (cartList.length > 0) {
        // object.id = cartList[cartList.length - 1].id + 1;
        // object.timestamp = new Date();
        let newCart = {
          id: cartList[cartList.length - 1].id + 1,
          timestamp: new Date(),
          productos: [],
        };
        cartList.push(newCart);
        const productsJson = JSON.stringify(cartList, null, 2);
        fs.writeFileSync(this.file, productsJson);
        console.log(`Se ha agregado un carrito ID:${newCart.id}`);
        return cartList;
        //
      } else {
        let cartList = [];
        let newCart = {
          id: 1,
          timestamp: new Date(),
          productos: [],
        };
        cartList.push(newCart);
        const productsJson = JSON.stringify(cartList, null, 2);
        fs.writeFileSync(this.file, productsJson);
        console.log(`Se ha agregado un carrito ID:${newCart.id}`);
        return cartList;
      }
    } catch (error) {
      let cartList = [];
      let newCart = {
        id: 1,
        timestamp: new Date(),
        productos: [],
      };
      cartList.push(newCart);
      fs.writeFileSync(this.file, JSON.stringify(cartList, null, 2));
      return cartList;
    }
  };

  deleteCartById = (id) => {
    try {
      let cartList = this.getAll();
      let cartToDelete = cartList.findIndex((element) => element.id == id);
      if (cartToDelete + 1 !== 0) {
        this.deleteAll;
        cartList.splice(cartToDelete, 1);
        fs.writeFileSync(this.file, JSON.stringify(cartList, null, 2));
        return cartList;
      } else {
        throw error;
      }
    } catch (error) {
      return "No se encontro ese ID";
    }
  };

  deleteAllCarts = () => {
    let cartList = [];
    fs.writeFileSync(this.file, JSON.stringify(cartList));
  };

  saveProductToCart = (id, product) => {
    let cartSelected = this.getCartById(id);
    cartSelected.productos.push(product);

    let cartList = this.getAll();
    let index = cartList.findIndex((e) => e.id == id);
    cartList[index].productos = cartSelected.productos;

    this.deleteAllCarts();
    fs.writeFileSync(this.file, JSON.stringify(cartList, null, 2));
    return cartList;
  };

  deleteProdInCart = (id, id_prod) => {
    let cartList = this.getAll();

    //busco el index del carrito
    let selectedCart = cartList.findIndex((e) => e.id == id);

    //dentro del carrito busco el index del producto
    let indexProd = cartList[selectedCart].productos.findIndex(
      (e) => e.id == id_prod
    );

    //si encuentro el producto lo elimino
    if (indexProd >= 0) {
      cartList[selectedCart].productos.splice(indexProd, 1);
      this.deleteAllCarts();
      fs.writeFileSync(this.file, JSON.stringify(cartList, null, 2));
      return cartList;
    } else {
      return "No existe ese producto para borrar";
    }
  };
}

module.exports = CartManager;
