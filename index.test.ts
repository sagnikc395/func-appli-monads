import { expect, test } from "bun:test";
import { fmapMaybe } from ".";

// test the fmaptype
test("fmap with value", () => {
  expect(fmapMaybe((x) => x + 3, { just: 2 })).toStrictEqual({ just: 5 });
});

//fmap test for nothing type
test("fmap with nothing", () => {
  expect(fmapMaybe((x) => x + 3, null)).toStrictEqual(null);
});
