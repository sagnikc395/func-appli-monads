console.log(((x) => x + 3)(2));

//maybe type

type Nothing = null;
type Just<A> = { just: A };
type Maybe<A> = Nothing | Just<A>;

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
