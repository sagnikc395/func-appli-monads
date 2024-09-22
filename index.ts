console.log(((x) => x + 3)(2));

//maybe type

export type Nothing = null;
export type Just<A> = { just: A };
export type Maybe<A> = Nothing | Just<A>;

//fmap -> to know how to apply functions to values that are wrapped in a context

export const fmapMaybe = <A, B>(f: (a: A) => B, m: Maybe<A>): Maybe<B> => {
  //if we have nothing, then return nothing
  if (!m) {
    return null;
  }
  // if we have a just type, return a just with the function
  // applies to the contents.
  return { just: f(m.just) };
};

export function compose<A, B, C>(f: (a: A) => B, g: (b: B) => C): (a: A) => C {
  return function (x: A): C {
    return g(f(x));
  };
}
export function fmapFunction<A, B, C>(
  f: (a: A) => B,
  g: (b: B) => C
): (a: A) => C {
  return compose(f, g);
}

export function applyMaybe<A, B>(f: Maybe<(a: A) => B>, m: Maybe<A>): Maybe<B> {
  //if maybe is Nothing, return Nothing

  if (f === undefined) {
    return null;
  }
  //if the data is Maybe is Nothing, return Nothing
  if (m === undefined) {
    return null;
  }

  //else apply the function in the Maybe to the data in the Maybe
  return { just: f!.just(m!.just) };
}

export function applyArray<A, B>(fa: ((a: A) => B)[], arr: A[]): B[] {
  // apply each function in the array
  // to each element in the other array
  return fa.flatMap((f) => arr.map(f));
}

// some currying
export const add = (a: number) => (b: number) => a + b;
export const multiply = (a: number) => (b: number) => a * b;

//lifeA2 and Maybe type
export function liftA2Maybe<A, B, C>(
  f: (a: A) => (b: B) => C,
  a: Maybe<A>,
  b: Maybe<B>
): Maybe<C> {
  return applyMaybe(fmapMaybe(f, a), b);
}
