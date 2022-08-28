class RandomColor {
  constructor() {
    this.valor = this.crearColorRandom();
  }

  crearColorRandom() {
    const random1 = Math.round(Math.random() * 255);
    const random2 = Math.round(Math.random() * 255);
    const random3 = Math.round(Math.random() * 255);

    return `(${random1},${random2},${random3})`;
  }
}

const color = new RandomColor();
console.log(color.valor);
