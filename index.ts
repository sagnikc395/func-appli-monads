console.log(((x) => x + 3)(2));

//maybe type

type Nothing = null;
type Just<A> = { just: A };
type Maybe<A> = Nothing | Just<A>;

//fmap -> to know how to apply functions to values that are wrapped in a context

export const fmapMaybe = <A, B>(f: (a: A) => B, m: Maybe<A>): Maybe<B> => {
  if (!m) {
    return null;
  }
  return { just: f(m.just) };
};
