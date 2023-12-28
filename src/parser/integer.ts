import { Parser } from "./parser";

export const integer: Parser<number> = (str: string) => {
  const parsed = parseInt(str, 10);
  return Number.isSafeInteger(parsed)
    ? [parsed, str.slice(parsed.toString().length)]
    : [undefined, str];
};
