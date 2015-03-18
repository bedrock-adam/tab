function isBet(input) {
  return input.split(':')[0] === 'Bet';
}

function bets(input) {
  return _.filter(input, isBet);
}

function isResult(input) {
  return input.split(':')[0] === 'Result';
}

function result(input) {
  return _.first(_.filter(input, isResult));
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
