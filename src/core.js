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
  return input.split(':')[0] === 'Bet';
}

function isResult(input) {
  return input.split(':')[0] === 'Result';
}

function product(bet) {
  return bet.split(':')[1];
}

function selection(bet) {
  return bet.split(':')[2];
}

function stake(bet) {
  return parseInt(bet.split(':')[3], 10);
}

function first(result) {
  return result.split(':')[1]
}

function second(result) {
  return result.split(':')[2]
}

function third(result) {
  return result.split(':')[3]
}
