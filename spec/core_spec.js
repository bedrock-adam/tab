describe("core", function() {
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
        expect(isBet("Bet:W:2:98")).toBe(true);
        expect(isBet("Result:2:3:1")).toBe(false);
      });
    });

    describe("isResult", function() {
      it("should return correct result", function() {
        expect(isResult("Bet:W:2:98")).toBe(false);
        expect(isResult("Result:2:3:1")).toBe(true);
      });
    });

    describe("result", function() {
      it("should return the result", function() {
        expect(result(input)).toBe('Result:2:3:1');
      });
    });

    describe("bets", function() {
      it("should return all bets", function() {
        expect(bets(input)).toEqual([
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
        expect(product("Bet:W:2:98")).toBe("W");
        expect(product("Bet:P:4:105")).toBe("P");
        expect(product("Bet:E:3,2:51")).toBe("E");
      });
    });

    describe("selection", function() {
      it("should return correct result", function() {
        expect(selection("Bet:W:2:98")).toBe("2");
        expect(selection("Bet:P:4:105")).toBe("4");
        expect(selection("Bet:E:3,2:51")).toBe("3,2");
      });
    });

    describe("stake", function() {
      it("should return correct result", function() {
        expect(stake("Bet:W:2:98")).toBe(98);
        expect(stake("Bet:P:4:105")).toBe(105);
        expect(stake("Bet:E:3,2:51")).toBe(51);
      });
    });
  });

  describe("result", function() {
    describe("first", function() {
      it("should return correct result", function() {
        expect(first("Result:2:3:1")).toBe("2");
      });
    });

    describe("second", function() {
      it("should return correct result", function() {
        expect(second("Result:2:3:1")).toBe("3");
      });
    });

    describe("third", function() {
      it("should return correct result", function() {
        expect(third("Result:2:3:1")).toBe("1");
      });
    });
  });

  describe("pool", function() {
    describe("predicates", function() {
      describe("isWin", function() {
        it("should return correct result", function() {
          expect(isWin("Bet:W:1:16")).toBe(true);
          expect(isWin("Bet:P:4:52")).toBe(false);
          expect(isWin("Bet:E:2,3:47")).toBe(false);
        });
      });

      describe("isPlace", function() {
        it("should return correct result", function() {
          expect(isPlace("Bet:W:1:16")).toBe(false);
          expect(isPlace("Bet:P:4:52")).toBe(true);
          expect(isPlace("Bet:E:2,3:47")).toBe(false);
        });
      });

      describe("isExacta", function() {
        it("should return correct result", function() {
          expect(isExacta("Bet:W:1:16")).toBe(false);
          expect(isExacta("Bet:P:4:52")).toBe(false);
          expect(isExacta("Bet:E:2,3:47")).toBe(true);
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
          expect(wins(bets)).toEqual([
            "Bet:W:3:5",
            "Bet:W:4:5",
            "Bet:W:1:16"
          ]);
        });
      });

      describe("places", function() {
        it("should return all place bets", function() {
          expect(places(bets)).toEqual([
            "Bet:P:2:16",
            "Bet:P:3:82",
            "Bet:P:4:52"
          ]);
        });
      });

      describe("exactas", function() {
        it("should return all exacta bets", function() {
          expect(exactas(bets)).toEqual([
            "Bet:E:2,3:61",
            "Bet:E:2,3:47"
          ]);
        });
      });
    });
  });
});
