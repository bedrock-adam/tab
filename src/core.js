function winDividend(bets, result, minusCommission) {
  return round(minusCommission(total(stakes(bets))) /
      total(stakes(correctWins(bets, result))));
}

function exactaDividend(bets, result, minusCommission) {
  return round(minusCommission(total(stakes(bets))) /
      total(stakes(correctExactas(bets, result))));
}

function total(collection) {
  return _.reduce(collection, function(memo, num) {
    return memo + num;
  }, 0);
}

function minusCommission(percent) {
  return function(value) {
    return value * ((100 - percent) / 100);
  };
}

function correctWins(bets, result) {
  return _.filter(bets, isWinCorrect(result))
}

function isWinCorrect(result) {
  return function(bet) {
    return selection(bet) === first(result);
  };
}

function isPlaceCorrect(bet, result) {
  return _.contains(placements(result), selection(bet));
}

function correctExactas(bets, result) {
  return _.filter(bets, isExactaCorrect(result))
}

function isExactaCorrect(result) {
  return function(bet) {
    return _.isEqual([first(result), second(result)], selections(bet));
  };
}

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

function stakes(bets) {
  return _.map(bets, stake);
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

function round(value) {
  return +value.toFixed(2);
}
