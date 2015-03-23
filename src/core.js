module.exports = function() {
  "use strict";

  var _ = require('underscore');

  var dividend = function(bets, result, minusCommission, correct) {
    return round(minusCommission(total(stakes(bets))) /
        total(stakes(correct(bets, result))));
  };

  var placeDividends = function(bets, result, minusCommission) {
    return minusCommission(total(stakes(bets))) / 3
  };

  var total = function(collection) {
    return _.reduce(collection, function(memo, num) {
      return memo + num;
    }, 0);
  };

  var minusCommission = function(percent) {
    return function(value) {
      return value * ((100 - percent) / 100);
    };
  };

  var correctWins = function(bets, result) {
    return _.filter(bets, isWinCorrect(result))
  };

  var isWinCorrect = function(result) {
    return function(bet) {
      return selection(bet) === first(result);
    };
  };

  var isPlaceCorrect = function(bet, result) {
    return _.contains(placements(result), selection(bet));
  };

  var correctExactas = function(bets, result) {
    return _.filter(bets, isExactaCorrect(result))
  };

  var isExactaCorrect = function(result) {
    return function(bet) {
      return _.isEqual([first(result), second(result)], selections(bet));
    };
  };

  var wins = function(bets) {
    return _.filter(bets, isWin);
  };

  var places = function(bets) {
    return _.filter(bets, isPlace);
  };

  var exactas = function(bets) {
    return _.filter(bets, isExacta);
  };

  var isWin = function(bet) {
    return product(bet) === 'W';
  };

  var isPlace = function(bet) {
    return product(bet) === 'P';
  };

  var isExacta = function(bet) {
    return product(bet) === 'E';
  };

  var bets = function(input) {
    return _.filter(input, isBet);
  };

  var result = function(input) {
    return _.first(_.filter(input, isResult));
  };

  var isBet = function(input) {
    return type(input) === 'Bet';
  };

  var isResult = function(input) {
    return type(input) === 'Result';
  };

  var type = function(input) {
    return _.first(split(input));
  };

  var product = function(bet) {
    return split(bet)[1];
  };

  var selections = function(bet) {
    return selection(bet).split(',');
  };

  var selection = function(bet) {
    return split(bet)[2];
  };

  var stakes = function(bets) {
    return _.map(bets, stake);
  };

  var stake = function(bet) {
    return parseInt(split(bet)[3], 10);
  };

  var first = function(result) {
    return split(result)[1]
  };

  var second = function(result) {
    return split(result)[2]
  };

  var third = function(result) {
    return split(result)[3]
  };

  var placements = function(result) {
    return [first(result), second(result), third(result)];
  };

  var split = function(input) {
    return input.split(':')
  };

  var round = function(value) {
    return +value.toFixed(2);
  };

  return {
    dividend: dividend,
    placeDividends: placeDividends,
    total: total,
    minusCommission: minusCommission,
    correctWins: correctWins,
    isWinCorrect: isWinCorrect,
    isPlaceCorrect: isPlaceCorrect,
    correctExactas: correctExactas,
    isExactaCorrect: isExactaCorrect,
    wins: wins,
    places: places,
    exactas: exactas,
    isWin: isWin,
    isPlace: isPlace,
    isExacta: isExacta,
    bets: bets,
    result: result,
    isBet: isBet,
    isResult: isResult,
    type: type,
    product: product,
    selections: selections,
    selection: selection,
    stakes: stakes,
    stake: stake,
    first: first,
    second: second,
    third: third,
    placements: placements,
    split: split,
    round: round
  };
}();
