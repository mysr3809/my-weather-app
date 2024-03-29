/* eslint-disable no-undef */
import getGradientColors from "./setGradient";

describe("getGradientColors", () => {
  test("returns correct gradient for temperature less than -30", () => {
    expect(getGradientColors(-31)).toEqual(
      "linear-gradient(to bottom right, #a1c4fd, #173070)"
    );
  });

  test("returns correct gradient for temperature between -30 and -20", () => {
    expect(getGradientColors(-25)).toEqual(
      "linear-gradient(to bottom right, #a1c4fd, #347cbb)"
    );
  });

  test("returns correct gradient for temperature between -20 and -10", () => {
    expect(getGradientColors(-15)).toEqual(
      "linear-gradient(to bottom right, #a1c4fd, #3a8bc6)"
    );
  });
});
