// deno-lint-ignore-file
import type {
  Product,
  ProductForCreation,
  ProductForUpdate,
} from "../types/product.ts";
import { v1 } from "../deps.ts";

let products: Product[] = [
  {
    uuid: "1",
    name: "Pelota",
    stock: 100,
    price: 1500,
    thumbnail: "google.com",
  },
  {
    uuid: "2",
    name: "Remera",
    stock: 2,
    price: 18500,
    thumbnail: "remera.com",
  },
];

export const getAll = (): Product[] => {
  return products;
};

export const findProductById = (uuid: string): Product => {
  const productToFind = products.find((product) => product.uuid === uuid);
  if (!productToFind) {
    throw new Error("Product not found");
  } else {
    return productToFind;
  }
};

export const createProduct = (product: ProductForCreation): Product => {
  const { name, price, stock, thumbnail } = product;
  if (name && price && stock && thumbnail) {
    const newProduct = {
      uuid: v1.generate().toString(),
      name: product.name,
      price: product.price,
      stock: product.stock,
      thumbnail: product.thumbnail,
    };
    products.push(newProduct);
    return newProduct;
  } else {
    throw new Error("debe incluir todas las props");
  }
};

// updateProduct
export const updateProduct = (
  uuid: string,
  productForUpdate: ProductForUpdate
): Product => {
  const index = products.findIndex((product) => product.uuid === uuid);

  if (products[index] === undefined) {
    throw new Error("no se encontro el producto");
  } else {
    products[index] = { ...products[index], ...productForUpdate };
    return {
      ...products[index],
      ...productForUpdate,
    };
  }
};

// deleteProduct
export const deleteProduct = (uuid: string): Product => {
  const index: number = products.findIndex(
    (product: Product): boolean => product.uuid === uuid
  );

  if (products[index] === undefined) {
    throw new Error("No se encontro el producto");
  } else {
    const productToEliminate = products[index];
    products = products.filter((product) => product.uuid !== uuid);
    return productToEliminate;
  }
};
