import * as P from "../parser";

export type Quit = ["quit"];

export const Quit: Quit = ["quit"];

export const parse = P.map(() => Quit)(P.token("quit"));

export const quit = async (_: Quit): Promise<void> => {
  setImmediate(() => process.exit(0));
};
