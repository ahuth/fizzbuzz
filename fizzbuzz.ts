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
type _11 = Increment<_10>;
type _12 = Increment<_11>;
type _13 = Increment<_12>;
type _14 = Increment<_13>;
type _15 = Increment<_14>;
type _16 = Increment<_15>;

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

type IsDivisibleBy<A, B> = {
  a_eq_0: true,
  a_lt_0: false,
  recurse: IsDivisibleBy<Subtract<A, B>, B>,
}[
  A extends NAN
    ? 'a_lt_0'
    : A extends _0
      ? 'a_eq_0'
      : 'recurse'
];

type Test_IsDivisibleBy = [
  Eq<IsDivisibleBy<_4, _2>, true>,
  Eq<IsDivisibleBy<_6, _3>, true>,
  Eq<IsDivisibleBy<_3, _2>, false>,
  Eq<IsDivisibleBy<_5, _3>, false>,
];

type And<A, B> = A extends true
  ? B extends true
    ? true
    : false
  : false;

type Test_And = [
  Eq<And<true, true>, true>,
  Eq<And<true, false>, false>,
  Eq<And<false, true>, false>,
  Eq<And<false, false>, false>,
];

type IsDivisibleBy3<N> = IsDivisibleBy<N, _3>;
type IsDivisibleBy5<N> = IsDivisibleBy<N, _5>;
type IsDivisibleBy15<N> = And<IsDivisibleBy3<N>, IsDivisibleBy5<N>>;

type FizzBuzzNth<N> = IsDivisibleBy15<N> extends true
  ? 'FizzBuzz'
  : IsDivisibleBy3<N> extends true
    ? 'Fizz'
    : IsDivisibleBy5<N> extends true
      ? 'Buzz'
      : N;

type Test_FizzBuzzNth = [
  Eq<FizzBuzzNth<_1>, _1>,
  Eq<FizzBuzzNth<_2>, _2>,
  Eq<FizzBuzzNth<_3>, "Fizz">,
  Eq<FizzBuzzNth<_4>, _4>,
  Eq<FizzBuzzNth<_5>, "Buzz">,
  Eq<FizzBuzzNth<_6>, "Fizz">,
  Eq<FizzBuzzNth<_14>, _14>,
  Eq<FizzBuzzNth<_15>, "FizzBuzz">,
  Eq<FizzBuzzNth<_16>, _16>
];

type Unshift<Element, List extends Array<any>> = Parameters<
  (e: Element, ...list: List) => any
>;

type Test_Unshift = [
  Eq<Unshift<1, []>, [1]>,
  Eq<Unshift<2, [1]>, [2, 1]>,
  Eq<Unshift<'hello', [2, 1]>, ['hello', 2, 1]>,
];

type FizzBuzzUpTo<N, Output extends any[] = []> = {
  output: Output;
  recurse: FizzBuzzUpTo<Decrement<N>, Unshift<FizzBuzzNth<N>, Output>>;
}[N extends _0 ? "output" : "recurse"];

type Test_FizzBuzzUpTo = [
  Eq<
    FizzBuzzUpTo<_16>,
    [
      _1, _2, "Fizz", _4, "Buzz", "Fizz", _7, _8,
      "Fizz", "Buzz", _11, "Fizz", _13, _14, "FizzBuzz", _16
    ]
  >
];
