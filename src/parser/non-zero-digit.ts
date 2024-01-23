import { pipe } from "fp-ts/lib/function";
import { Digit, digit } from "./digit";
import { Parser } from "./parser";
import { filter } from "./filter";
import { map } from "./map";
import { none, some } from "fp-ts/lib/Option";

type NonZeroDigit = Exclude<Digit, "0">;

export const non_zero_digit: Parser<NonZeroDigit> = pipe(
  digit,
  filter((digit) => (digit === "0" ? some("Expected non-zero digit") : none)),
  map((digit) => digit as NonZeroDigit)
);
