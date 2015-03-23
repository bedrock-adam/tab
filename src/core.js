module.exports = function() {
  "use strict";

  var _ = require('underscore');

  var format = function(product, winningSelections, dividend) {
    return [product, winningSelections.join(','), '$' + dividend].join(':');
  };

  var dividend = function(bets, result, correct, divideBy, minusCommission) {
    return round(divideBy(minusCommission(total(stakes(bets)))) /
        total(stakes(correct(bets))));
  };

  var placeDividends = function(bets, result, minusCommission) {
    return minusCommission(total(stakes(bets))) / 3
  };

  var total = function(collection) {
    return _.reduce(collection, function(memo, num) {
      return memo + num;
    }, 0);
  };

  var divideBy = function(denominator) {
    return function(numerator) {
      return numerator / denominator;
    };
  };

  var minusCommission = function(percent) {
    return function(value) {
      return value * ((100 - percent) / 100);
    };
  };

  var correctWins = function(result) {
    return function(bets) {
      return Array.prototype.filter.call(bets, function(bet) {
        return selection(bet) === first(result);
      });
    };
  };

  var correctPlaces = function(placement, result) {
    return function(bets) {
      return Array.prototype.filter.call(bets, function(bet) {
        return selection(bet) === placement;
      });
    };
  };

  var correctExactas = function(result) {
    return function(bets) {
      return Array.prototype.filter.call(bets, function(bet) {
        return _.isEqual(selections(bet), [first(result), second(result)]);
      });
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

  var processWins = function(bets, result) {
    return [format(
      "Win",
      [first(result)],
      dividend(wins(bets), result, correctWins(result), divideBy(1), minusCommission(15))
    )];
  }

  var processPlaces = function(bets, result) {
    return Array.prototype.map.call(placements(result), function(placement) {
      return format(
        "Place",
        [placement],
        dividend(places(bets), result, correctPlaces(placement), divideBy(3), minusCommission(12))
      );
    });
  };

  var processExactas = function(bets, result) {
    return [format(
      "Exacta",
      [first(result), second(result)],
      dividend(exactas(bets), result, correctExactas(result), divideBy(1), minusCommission(18))
    )];
  };

  var process = function (input) {
    return Array.prototype.reduce.call([
      processWins, processPlaces, processExactas
    ], function(memo, cb) {
      Array.prototype.push.apply(memo, cb(bets(input), result(input)));

      return memo;
    }, []);
  };

  return {
    process: process,
    dividend: dividend,
    placeDividends: placeDividends,
    total: total,
    minusCommission: minusCommission,
    divideBy: divideBy,
    correctWins: correctWins,
    correctPlaces: correctPlaces,
    correctExactas: correctExactas,
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
    round: round,
    processWins: processWins,
    processPlaces: processPlaces,
    processExactas: processExactas
  };
}();
