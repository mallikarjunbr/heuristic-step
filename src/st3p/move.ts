import { pipe } from "fp-ts/lib/function";
import {
  and,
  any,
  integer,
  map,
  one_or_more,
  or,
  token,
  whitespace,
} from "../parser";
import * as T from "../t3en";
import { best } from "../core/best";

type Infinite = ["infinite"];
const Infinite: Infinite = ["infinite"];
type Milliseconds = number;
type TimePerMove = ["time-per-move", Milliseconds];
const TimePerMove = (milliseconds: Milliseconds): TimePerMove => [
  "time-per-move",
  milliseconds,
];
type TimeRemaining = ["time-remaining", Milliseconds];
const TimeRemaining = (milliseconds: Milliseconds): TimeRemaining => [
  "time-remaining",
  milliseconds,
];
export type Move = ["move", T.State, Infinite | TimePerMove | TimeRemaining];
const Move = (
  state: T.State,
  time: Infinite | TimePerMove | TimeRemaining
): Move => ["move", state, time];

export const parse = pipe(
  and(
    token("move"),
    one_or_more(whitespace),
    T.parse,
    or(
      pipe(
        and(
          one_or_more(whitespace),
          token("time-remaining"),
          one_or_more(whitespace),
          and(token("ms:"), integer)
        ),
        map(([, , , [, milliseconds]]) => TimeRemaining(milliseconds))
      ),
      pipe(
        and(
          one_or_more(whitespace),
          token("time"),
          one_or_more(whitespace),
          and(token("ms:"), integer)
        ),
        map(([, , , [, milliseconds]]) => TimePerMove(milliseconds))
      ),
      pipe(
        any,
        map(() => Infinite)
      )
    )
  ),
  map(([, , state, time]) => Move(state, time))
);

const column = (index: number) => {
  let result = "";
  do {
    let remainder = index % 26;
    result = String.fromCharCode(97 + remainder) + result;
    index = Math.floor(index / 26) - 1;
  } while (index >= 0);

  return result;
};

export const move = async ([, [board]]: Move) => {
  try {
    const [x, y] = await best(board);
    console.log(`best ${column(y)}${x + 1}`);
  } catch (error) {
    console.error(error);
  }
};
