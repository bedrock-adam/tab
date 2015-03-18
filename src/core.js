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
