// deno-lint-ignore-file
import { Context, helpers } from "../deps.ts";
import type { Product } from "../types/product.ts";
import * as db from "../db/product.ts";

export const findAllProducts = async (ctx: Context) => {
  try {
    const products: Product[] = await db.getAll();
    ctx.response.body = products;
  } catch (err) {
    ctx.response.status = 404;
    ctx.response.body = { msg: err.message };
  }
};

export const findProduct = async (ctx: Context) => {
  const { productId } = helpers.getQuery(ctx, { mergeParams: true });

  try {
    const product: Product = await db.findProductById(productId);
    ctx.response.body = product;
  } catch (err) {
    ctx.response.status = 404;
    ctx.response.body = { msg: err.message };
  }
};

export const createProduct = async (ctx: Context) => {
  try {
    const body = await ctx.request.body().value;
    const createdProduct: Product = db.createProduct(body);
    ctx.response.body = createdProduct;
  } catch (err) {
    ctx.response.status = 404;
    ctx.response.body = { msg: err.message };
  }
};

export const updateProduct = async (ctx: Context) => {
  try {
    const { productId } = helpers.getQuery(ctx, { mergeParams: true });
    const body = await ctx.request.body().value;
    const updatedProduct: Product = await db.updateProduct(productId, body);
    ctx.response.body = updatedProduct;
  } catch (err) {
    ctx.response.status = 404;
    ctx.response.body = { msg: err.message };
  }
};

export const deleteProduct = async (ctx: Context) => {
  try {
    const { productId } = helpers.getQuery(ctx, { mergeParams: true });
    const deletedProduct = await db.deleteProduct(productId);
    ctx.response.body = {
      message: "product eliminated",
      deletedProduct,
    };
  } catch (err) {
    ctx.response.status = 404;
    ctx.response.body = { msg: err.message };
  }
};
