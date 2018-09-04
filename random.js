function RandomGenerator(length) {
  this.length = length;
  this._numbers = [];

  this.refresh();
}

RandomGenerator.prototype.gen = function() {
  var seed = Math.round(Math.random() * (this.getLength() - 1));

  var number = this._numbers[seed];

  this._numbers.splice(seed, 1);

  if (!this.getLength()) {
    this.refresh();
  }

  return number;
};

RandomGenerator.prototype.getLength = function() {
  return this._numbers.length;
};

RandomGenerator.prototype.refresh = function() {
  for (var idx = 0; idx < this.length; idx++) {
    this._numbers.push(idx);
  }
};
