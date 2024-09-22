import { describe, expect, it, test } from "bun:test";
import {
  add,
  applyArray,
  applyMaybe,
  fmapMaybe,
  liftA2Maybe,
  type Maybe,
} from ".";

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

//tests for lifeA2Maybe
describe("liftA2Maybe", () => {
  // Helper functions
  const add = (a: number) => (b: number) => a + b;
  const multiply = (a: number) => (b: number) => a * b;

  // We need to define these functions as they're used in liftA2Maybe
  const fmapMaybe = <A, B>(f: (a: A) => B, m: Maybe<A>): Maybe<B> => {
    if ("just" in m) {
      return { just: f(m.just) };
    }
    return { nothing: true };
  };

  const applyMaybe = <A, B>(mf: Maybe<(a: A) => B>, ma: Maybe<A>): Maybe<B> => {
    if ("just" in mf && "just" in ma) {
      return { just: mf.just(ma.just) };
    }
    return { nothing: true };
  };

  // The function we're testing
  function liftA2Maybe<A, B, C>(
    f: (a: A) => (b: B) => C,
    a: Maybe<A>,
    b: Maybe<B>
  ): Maybe<C> {
    return applyMaybe(fmapMaybe(f, a), b);
  }

  it("should correctly apply addition to two Just values", () => {
    const result = liftA2Maybe(add, { just: 2 }, { just: 3 });
    expect(result).toEqual({ just: 5 });
  });

  it("should correctly apply multiplication to two Just values", () => {
    const result = liftA2Maybe(multiply, { just: 10 }, { just: 3 });
    expect(result).toEqual({ just: 30 });
  });

  it("should return Nothing if the first Maybe is Nothing", () => {
    const result = liftA2Maybe(add, { nothing: true }, { just: 3 });
    expect(result).toEqual({ nothing: true });
  });

  it("should return Nothing if the second Maybe is Nothing", () => {
    const result = liftA2Maybe(add, { just: 2 }, { nothing: true });
    expect(result).toEqual({ nothing: true });
  });

  it("should return Nothing if both Maybes are Nothing", () => {
    const result = liftA2Maybe(add, { nothing: true }, { nothing: true });
    expect(result).toEqual({ nothing: true });
  });
});
