import { expect, test } from "bun:test";
import { fmapMaybe } from ".";

// test the fmaptype
test("fmap test", () => {
  expect(fmapMaybe((x) => x + 3, { just: 2 })).toStrictEqual({ just: 5 });
});
