////@ts-check

const admin = require("firebase-admin");
const serviceAccount = require("./db/daentregafinal-lagorio-firebase-adminsdk-1uvit-f867ccc77d.json");

const ProductManager = require("./productDaos");
const productManager = new ProductManager();

class CartManager {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https:/daentregafinal-lagorio.firebaseio.com",
    });
  }

  newCart = async () => {
    try {
      const db = admin.firestore();
      const query = db.collection("carritos");
      let time = new Date();
      const cart = await query.add({
        timestamp: time.toString(),
        productos: [],
      });
      return cart.id;
    } catch (error) {
      throw Error(error.message);
    }
  };

  getAll = async () => {
    try {
      const db = admin.firestore();
      const query = db.collection("carritos");
      const data = await query.get();
      let docs = data.docs;
      const carts = docs.map((doc) => ({
        id: doc.id,
        timestamp: doc.data().timestamp,
        products: doc.data().productos,
      }));

      return carts;
    } catch (error) {
      throw Error(error.message);
    }
  };

  getCartById = async (id) => {
    try {
      const db = admin.firestore();
      const query = db.collection("carritos");
      const doc = query.doc(String(id));
      const cart = await doc.get();
      if (cart.data() == undefined) {
        throw new Error("Cart didn't found with that ID");
      } else {
        const cartSelected = {
          id: cart.id,
          timestamp: cart.data().timestamp,
          productos: cart.data().productos,
        };
        return cartSelected;
      }
    } catch (error) {
      throw Error(error);
    }
  };

  saveProductToCart = async (idCart, idProd) => {
    try {
      const db = admin.firestore();
      const cart = await db.collection("carritos").doc(String(idCart));

      const product = await productManager.getById(idProd);

      await cart.update({
        productos: admin.firestore.FieldValue.arrayUnion(
          JSON.parse(JSON.stringify(product))
        ),
      });

      //DE ESTA FORMA NO PERMITE QUE HAYA 2 OBJETOS IGUALES

      //DE ESTA FORMA PERMITE AGREGAR OBJETOS REPETIDOS
      // const cartData = await cart.get();
      // let productos = cartData.data().productos;
      // productos = [...productos, JSON.parse(JSON.stringify(product))];
      // await cart.set({ productos: productos }, { merge: true });
      let data = await cart.get();
      return data.data();
    } catch (error) {
      throw Error(error.message);
    }
  };

  deleteCartById = async (id) => {
    try {
      const db = admin.firestore();
      const query = db.collection("carritos");
      const doc = query.doc(String(id));
      const cart = await doc.get();
      console.log(cart.data());
      const cartDeleted = {
        id: cart.id,
      };
      await doc.delete();
      if (cart.data() == undefined) {
        throw new Error("Cart didn't found with that ID");
      } else {
        return cartDeleted;
      }
    } catch (error) {
      throw Error(error.message);
    }
  };

  deleteProdInCart = async (idCart, idProd) => {
    try {
      const db = admin.firestore();
      //const product = await productManager.getById(idProd);
      let doc = await db.collection("carritos").doc(idCart);
      let cart = await doc.get();
      let data = cart.data();
      let productos = data.productos;

      let found = productos.find((product) => product._id == idProd);
      console.log(found);
      if (found !== undefined) {
        await doc.update({
          productos: admin.firestore.FieldValue.arrayRemove(
            JSON.parse(JSON.stringify(found))
          ),
        });
        return found._id;
      } else {
        throw Error("product not found in this cart");
      }
    } catch (error) {
      // let found;
      // cart.get().then((res) => {
      //   if (res.exists) {
      //     let productos = res.data().productos;
      //     found = productos.find((product) => product._id == idProd);
      //     if (found != undefined) {
      //       cart.update({
      //         productos: admin.firestore.FieldValue.arrayRemove(
      //           JSON.parse(JSON.stringify(product))
      //         ),
      //       });
      //     }
      //   }
      // });
      throw Error(error.message);
    }
  };
}

module.exports = CartManager;
