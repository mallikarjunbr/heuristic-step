import { Parser } from "./parser";

export const any: Parser<unknown> = (str: string) => {
  return ['', str];
};
