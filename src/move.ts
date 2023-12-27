import { write } from "./write";
import { parse } from "./t3en/state";
import { Cell } from "./t3en/cell";
import { name } from "./t3en/move";

const random = <A>(as: A[]): A => {
  const index = Math.floor(Math.random() * as.length);
  return as[index];
};

export const move = (options: string) => {
  const parsed = parse(options);
  if (parsed == null) return write(`unknown move options: ${options}`);
  const [board] = parsed;
  if (process.env.DEBUG) write(`parsed board ${board.map(row => row.join("")).join("/")}`);
  const indices = board
    .flatMap((row, i) =>
      row.map((cell, j) => [i, j, cell === Cell.Playable] as const)
    )
    .filter(([, , playable]) => playable);
  if (indices.length === 0) return write(`no playable cells`);
  const [x, y] = random(indices);
  return write(`best ${name(x, y)}`);
};
