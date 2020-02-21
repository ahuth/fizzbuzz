type Eq<A, B extends A> = 'passes';

type Test_Equal = [
  Eq<'Hello', 'Hello'>, // Passes
  Eq<'Hello', 'World'>, // Fails
];

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

type Decrement<N> = N extends Increment<infer D>
  ? D
  : NAN;

type Test_Decrement = [
  Eq<Decrement<_0>, NAN>, // Passes
  Eq<Decrement<_1>, _0>, // Passes
  Eq<Decrement<_2>, _1>, // Passes
  Eq<Decrement<Decrement<_5>>, _3>, // Passes
  Eq<Decrement<Decrement<_5>>, _2>, // Fails
];

type Subtract<N, Amount> = {
  amount_is_zero: N;
  recurse: Subtract<Decrement<N>, Decrement<Amount>>;
}[Amount extends _0 ? 'amount_is_zero' : 'recurse'];

type Test_Subtract = [
  Eq<Subtract<_1, _0>, _1>, // Passes
  Eq<Subtract<_1, _1>, _0>, // Passes
  Eq<Subtract<_9, _4>, _5>, // Passes
  Eq<Subtract<_1, _2>, NAN>, // Passes
  Eq<Subtract<_9, _2>, _3>, // Fails
];
