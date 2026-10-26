const add = require("../app");

test("2 + 3 should equal 5", () => {
    expect(add(2, 3)).toBe(5);
});

test("10 + 20 should be equal to 30", () => {
    expect(add(10, 20)).toBe(30);
});
