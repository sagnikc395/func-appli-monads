import { expect, test } from "bun:test";
import { applyArray, applyMaybe, fmapMaybe } from ".";

// test the fmaptype
test("fmap with value", () => {
  expect(fmapMaybe((x) => x + 3, { just: 2 })).toStrictEqual({ just: 5 });
});

//fmap test for nothing type
test("fmap with nothing", () => {
  expect(fmapMaybe((x) => x + 3, null)).toStrictEqual(null);
});

// TODO: add test for fmapFunction.

//test for the apply operator
test("apply maybe", () => {
  expect(applyMaybe({ just: (x) => x + 3 }, { just: 2 })).toStrictEqual({
    just: 5,
  });
});

//check for applying array
test("apply array", () => {
  expect(applyArray([(x) => x * 2, (x) => x + 3], [1, 2, 3])).toStrictEqual([
    2, 4, 6, 4, 5, 6,
  ]);
});
