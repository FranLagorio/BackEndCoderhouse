import { faker } from "@faker-js/faker";

let products = [];
for (let i = 0; i < 5; i++) {
  products.push({
    id: faker.database.mongodbObjectId(),
    name: faker.vehicle.vehicle(),
    price: faker.commerce.price(10000, 20000, 0, "$"),
    thumbnail: faker.image.avatar().toString(),
  });
}

export default products;
