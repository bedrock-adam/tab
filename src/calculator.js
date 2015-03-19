function Calculator() {
  this.inputs = [];
}

Calculator.prototype.start = function() {
  process.stdin.setEncoding('utf8');

  process.stdin.on('readable', function() {
    var input = process.stdin.read();

    if (input === null) return;

    this.inputs.push(input);

    if (isResult(input)) this.output();
  });
};

Calculator.prototype.output = function() {
  // process.stdout.write(winDividend);
  // process.stdout.write(PlaceDividends);
  // process.stdout.write(exactaDividend);
}

calculator = new Calculator;
calculator.start();
