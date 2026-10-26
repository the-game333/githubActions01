const add = require("../../app");

describe("QA validation - add()", () => {
  test("adds positive numbers", () => {
    expect(add(2, 3)).toBe(5);
  });

  test("supports zero too", () => {
    expect(add(0, 7)).toBe(7);
  });

  test("adds negative numbers", () => {
    expect(add(-2, -3)).toBe(-5);
  });

  test("does not concatenate numeric inputs", () => {
    expect(add(10, 20)).not.toBe("1020");
  });
});
