describe("core", function() {
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
});
