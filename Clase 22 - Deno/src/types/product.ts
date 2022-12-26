export interface Product {
  uuid: string;
  name: string;
  price: number;
  stock: number;
  thumbnail: string;
}

export interface ProductForCreation {
  name: string;
  price: number;
  stock: number;
  thumbnail: string;
}

export interface ProductForUpdate {
  name?: string;
  price?: number;
  stock?: number;
  thumbnail?: string;
}
