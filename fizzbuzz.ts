type Eq<A, B extends A> = 'passes';

type TestEqual = [
  Eq<'Hello', 'Hello'>, // Passes
  Eq<'Hello', 'World'>, // Fails
]

type NAN = 'invalid number';
type _0 = 0;

type Increment<N> = [N, '+1'];
type _1 = Increment<_0>;
type _2 = Increment<_1>;
type _3 = Increment<_2>;
type _4 = Increment<_3>;
type _5 = Increment<_4>;
type _6 = Increment<_5>;
type _7 = Increment<_6>;
type _8 = Increment<_7>;
type _9 = Increment<_8>;
type _10 = Increment<_9>;
