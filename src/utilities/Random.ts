class Random {
  handleGetInt(min: number = 0, max: number = 10) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  constructor() {}
}

export default Random;
