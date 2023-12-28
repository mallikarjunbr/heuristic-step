import { Parser, success } from "./parser";

export const any: Parser<undefined> = (str: string) => {
  return success(undefined, str);
};
