const helpers = new (class Helpers {
  // generate a random boolean value
  randomBoolean() {
    return Math.random() >= 0.5;
  }
})();

export default helpers;
