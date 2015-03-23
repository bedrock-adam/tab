describe("core", function() {
  var tab = require("../src/core");

  describe("input", function() {
    var input = [
      "Bet:W:3:5",
      "Bet:W:4:5",
      "Bet:W:1:16",
      "Bet:P:2:16",
      "Bet:P:3:82",
      "Bet:P:4:52",
      "Bet:E:2,3:61",
      "Bet:E:2,3:47",
      "Result:2:3:1"
    ];

    describe("isBet", function() {
      it("should return correct result", function() {
        expect(tab.isBet("Bet:W:2:98")).toBe(true);
        expect(tab.isBet("Result:2:3:1")).toBe(false);
      });
    });

    describe("isResult", function() {
      it("should return correct result", function() {
        expect(tab.isResult("Bet:W:2:98")).toBe(false);
        expect(tab.isResult("Result:2:3:1")).toBe(true);
      });
    });

    describe("type", function() {
      it("should return correct result", function() {
        expect(tab.type("Bet:W:2:98")).toBe("Bet");
        expect(tab.type("Result:2:3:1")).toBe("Result");
      });
    });

    describe("result", function() {
      it("should return the result", function() {
        expect(tab.result(input)).toBe('Result:2:3:1');
      });
    });

    describe("placements", function() {
      it("should return an array of the placements in order", function() {
        expect(tab.placements("Result:2:3:1")).toEqual(["2","3","1"]);
      });
    });

    describe("total", function() {
      it("should return the result", function() {
        expect(
          tab.total([3, 4, 5, 5, 16, 8, 22, 57, 42, 98, 63, 15])
        ).toBe(338);
      });
    });

    describe("round", function() {
      it("should return the result", function() {
        expect(tab.round(2.611818181818182)).toBe(2.61);
      });
    });

    describe("bets", function() {
      it("should return all bets", function() {
        expect(tab.bets(input)).toEqual([
          "Bet:W:3:5",
          "Bet:W:4:5",
          "Bet:W:1:16",
          "Bet:P:2:16",
          "Bet:P:3:82",
          "Bet:P:4:52",
          "Bet:E:2,3:61",
          "Bet:E:2,3:47"
        ]);
      });
    });
  });

  describe("bet", function() {
    describe("product", function() {
      it("should return correct result", function() {
        expect(tab.product("Bet:W:2:98")).toBe("W");
        expect(tab.product("Bet:P:4:105")).toBe("P");
        expect(tab.product("Bet:E:3,2:51")).toBe("E");
      });
    });

    describe("selection", function() {
      it("should return correct result", function() {
        expect(tab.selection("Bet:W:2:98")).toBe("2");
        expect(tab.selection("Bet:P:4:105")).toBe("4");
        expect(tab.selection("Bet:E:3,2:51")).toBe("3,2");
      });
    });

    describe("selections", function() {
      it("should return correct result", function() {
        expect(tab.selections("Bet:W:2:98")).toEqual(["2"]);
        expect(tab.selections("Bet:P:4:105")).toEqual(["4"]);
        expect(tab.selections("Bet:E:3,2:51")).toEqual(["3", "2"]);
      });
    });

    describe("stake", function() {
      it("should return correct result", function() {
        expect(tab.stake("Bet:W:2:98")).toBe(98);
        expect(tab.stake("Bet:P:4:105")).toBe(105);
        expect(tab.stake("Bet:E:3,2:51")).toBe(51);
      });
    });

    describe("stakes", function() {
      var bets = [
        "Bet:W:1:3",
        "Bet:W:2:4",
        "Bet:W:3:5",
        "Bet:W:4:5",
        "Bet:W:1:16",
        "Bet:W:2:8",
        "Bet:W:3:22",
        "Bet:W:4:57",
        "Bet:W:1:42",
        "Bet:W:2:98",
        "Bet:W:3:63",
        "Bet:W:4:15",
      ];

      it("should return a array of stakes", function() {
        expect(tab.stakes(bets)).toEqual(
          [3, 4, 5, 5, 16, 8, 22, 57, 42, 98, 63, 15]
        );
      });
    });
  });

  describe("result", function() {
    describe("first", function() {
      it("should return correct result", function() {
        expect(tab.first("Result:2:3:1")).toBe("2");
      });
    });

    describe("second", function() {
      it("should return correct result", function() {
        expect(tab.second("Result:2:3:1")).toBe("3");
      });
    });

    describe("third", function() {
      it("should return correct result", function() {
        expect(tab.third("Result:2:3:1")).toBe("1");
      });
    });
  });

  describe("pool", function() {
    describe("predicates", function() {
      describe("isWin", function() {
        it("should return correct result", function() {
          expect(tab.isWin("Bet:W:1:16")).toBe(true);
          expect(tab.isWin("Bet:P:4:52")).toBe(false);
          expect(tab.isWin("Bet:E:2,3:47")).toBe(false);
        });
      });

      describe("isPlace", function() {
        it("should return correct result", function() {
          expect(tab.isPlace("Bet:W:1:16")).toBe(false);
          expect(tab.isPlace("Bet:P:4:52")).toBe(true);
          expect(tab.isPlace("Bet:E:2,3:47")).toBe(false);
        });
      });

      describe("isExacta", function() {
        it("should return correct result", function() {
          expect(tab.isExacta("Bet:W:1:16")).toBe(false);
          expect(tab.isExacta("Bet:P:4:52")).toBe(false);
          expect(tab.isExacta("Bet:E:2,3:47")).toBe(true);
        });
      });
    });

    describe("collection", function() {
      var bets = [
        "Bet:W:3:5",
        "Bet:W:4:5",
        "Bet:W:1:16",
        "Bet:P:2:16",
        "Bet:P:3:82",
        "Bet:P:4:52",
        "Bet:E:2,3:61",
        "Bet:E:2,3:47"
      ];

      describe("wins", function() {
        it("should return all win bets", function() {
          expect(tab.wins(bets)).toEqual([
            "Bet:W:3:5",
            "Bet:W:4:5",
            "Bet:W:1:16"
          ]);
        });
      });

      describe("places", function() {
        it("should return all place bets", function() {
          expect(tab.places(bets)).toEqual([
            "Bet:P:2:16",
            "Bet:P:3:82",
            "Bet:P:4:52"
          ]);
        });
      });

      describe("exactas", function() {
        it("should return all exacta bets", function() {
          expect(tab.exactas(bets)).toEqual([
            "Bet:E:2,3:61",
            "Bet:E:2,3:47"
          ]);
        });
      });
    });
  });

  describe("commission", function() {
    describe("minusComission", function() {
      it("should return a function that when called evaluates correctly", function() {
        expect(tab.minusCommission(15)(100)).toBe(85);
      });
    });
  });

  describe("division", function() {
    describe("divideBy", function() {
      it("should return a function that when called evaluates correctly", function() {
        expect(tab.divideBy(3)(9)).toBe(3);
      });
    });
  });

  describe("dividends", function() {
    describe("winDividend", function() {
      var inputs = [
        "Bet:W:1:3",
        "Bet:W:2:4",
        "Bet:W:3:5",
        "Bet:W:4:5",
        "Bet:W:1:16",
        "Bet:W:2:8",
        "Bet:W:3:22",
        "Bet:W:4:57",
        "Bet:W:1:42",
        "Bet:W:2:98",
        "Bet:W:3:63",
        "Bet:W:4:15",
        "Result:2:3:1"
      ];

      it("should return the correct result", function() {
        expect(
          tab.dividend(
            tab.wins(tab.bets(inputs)),
            tab.result(inputs),
            tab.minusCommission(15),
            tab.correctWins
          )
        ).toBe(2.61);
      });
    });

    describe("placeDividends", function() {
      var inputs = [
        "Bet:P:1:31",
        "Bet:P:2:89",
        "Bet:P:3:28",
        "Bet:P:4:72",
        "Bet:P:1:40",
        "Bet:P:2:16",
        "Bet:P:3:82",
        "Bet:P:4:52",
        "Bet:P:1:18",
        "Bet:P:2:74",
        "Bet:P:3:39",
        "Bet:P:4:105",
        "Result:2:3:1"
      ];

      xit("should return the correct result", function() {
        expect(
          tab.dividends(
            tab.wins(tab.bets(inputs)),
            tab.result(inputs),
            tab.minusCommission(15),
            tab.correctWins
          )
        ).toBe([["2", 1.06], ["3", 1.27], ["1", 2.13]]);
      });
    });

    describe("exactaDividend", function() {
      var inputs = [
        "Bet:E:1,2:13",
        "Bet:E:2,3:98",
        "Bet:E:1,3:82",
        "Bet:E:3,2:27",
        "Bet:E:1,2:5",
        "Bet:E:2,3:61",
        "Bet:E:1,3:28",
        "Bet:E:3,2:25",
        "Bet:E:1,2:81",
        "Bet:E:2,3:47",
        "Bet:E:1,3:93",
        "Bet:E:3,2:51",
        "Result:2:3:1"
      ];

      it("should return the correct result", function() {
        expect(
          tab.dividend(
            tab.exactas(tab.bets(inputs)),
            tab.result(inputs),
            tab.minusCommission(18),
            tab.correctExactas
          )
        ).toBe(2.43);
      });
    });
  });
});
