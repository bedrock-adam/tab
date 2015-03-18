function product(bet) {
  return bet.split(':')[1];
}

function selection(bet) {
  return bet.split(':')[2];
}

function stake(bet) {
  return parseInt(bet.split(':')[3], 10);
}
