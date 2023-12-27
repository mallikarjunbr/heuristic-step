import { Board } from "./board";
import { Cell } from "./cell";
import { Side } from "./side";

export type State = [Board, Side];

export const parse = (str: string): State | null => {
  const [board_string, side_string] = str.split(" ");
  const side = side_string.trim() as Side;
  if (![Side.X, Side.O].includes(side)) return null;
  const board: Cell[][] = [[]];
  let x = 0;
  let count = 0;
  for (let i = 0; i < board_string.length; i++) {
    const char = board_string[i];
    if (char === "/") {
      board.push([]);
      x++;
      count = 0;
      continue;
    }
    const digit = parseInt(char);
    if (Number.isSafeInteger(digit)) {
      count *= 10;
      count += digit;
      continue;
    }
    count = count === 0 ? 1 : count;
    const cell = char as Cell;
    if (![Cell.Playable, Cell.Unplayable, Cell.PlayedX, Cell.PlayedO].includes(cell)) return null;
    for (let j = 0; j < count; j++) {
      board[x].push(cell);
    }
    count = 0;
  }
  return [board, side];
};
