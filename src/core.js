function wins(bets) {
  return _.filter(bets, isWin);
}

function places(bets) {
  return _.filter(bets, isPlace);
}

function exactas(bets) {
  return _.filter(bets, isExacta);
}

function isWin(bet) {
  return product(bet) === 'W';
}

function isPlace(bet) {
  return product(bet) === 'P';
}

function isExacta(bet) {
  return product(bet) === 'E';
}

function bets(input) {
  return _.filter(input, isBet);
}

function result(input) {
  return _.first(_.filter(input, isResult));
}

function isBet(input) {
  return type(input) === 'Bet';
}

function isResult(input) {
  return type(input) === 'Result';
}

function type(input) {
  return _.first(split(input));
}

function product(bet) {
  return split(bet)[1];
}

function selections(bet) {
  return selection(bet).split(',');
}

function selection(bet) {
  return split(bet)[2];
}

function stake(bet) {
  return parseInt(split(bet)[3], 10);
}

function first(result) {
  return split(result)[1]
}

function second(result) {
  return split(result)[2]
}

function third(result) {
  return split(result)[3]
}

function placements(result) {
  return [first(result), second(result), third(result)];
}

function split(input) {
  return input.split(':')
}
