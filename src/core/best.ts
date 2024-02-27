import { log } from "console";
import { Board, Cell, Side } from "../t3en";

const random = <A>(as: A[]): A => {
  const index = Math.floor(Math.random() * as.length);
  return as[index];
};

const win:[][] = [[]]

const priority_0: Array<[number, number]> = [[1,1], [0,0], [2,0], [0,2], [2,2]]
export const best = async (
  board: Board, side: Side
): Promise<readonly [number, number]> => {

  const  sol  = win1(board, side)
  let oppSide = (side == 'x' ? 'o' : 'x');

  if(sol.length > 0) {
    return [sol[0][0], sol[0][1]] 
  }

  const solOpp = win1(board, oppSide as Side);
  if(solOpp.length > 0) {
    return [solOpp[0][0], solOpp[0][1]]
  }

  const solOpp2 = win2(board, oppSide as Side);
  if(solOpp2.length > 0) {
    return [solOpp2[0], solOpp2[1]]
  }

  const sol2 = win2(board, side);
  if(sol2.length > 0) {
    return [sol2[0], sol2[1]]
  }
  let res = priority_0.find(([i,j]) => {return board[i][j] == Cell.Playable});

  if(res !== undefined) {
    return res;
  }
  const indices = board
    .flatMap((row, i) =>
      row.map((cell, j) => [i, j, cell === Cell.Playable] as const)
    )
    .filter(([, , playable]) => playable);
  if (indices.length === 0) throw new Error("no playable cells");
  const [x, y] = random(indices);
  return [x, y];
}
  


const win2 = (board: Board, side: Side): number [] => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if(board[i][j] == Cell.Playable) {
        board[i][j] = side as string as Cell;
       let sol = win1(board, side)
       board[i][j] = Cell.Playable;
       if(sol.length > 1) {
        return [i, j]
       }
      }
    }

  }
  return [];
}

const win1 = (board: Board, side: Side): number [][] => {
  let count_row = [0, 0, 0];
  let count_col = [0, 0, 0];
  let count_dia = 0;
  let count_dia_rev = 0;
  let oppSide = (side == 'x' ? 'o' : 'x');

  for (let i = 0; i < board.length; i++) {
    count_dia += (board[i][i] === side  as string) ? 1 : 0; 
    count_dia -= (board[i][i] === oppSide  as string) ? 1 : 0; 

    count_dia_rev += (board[i][board.length- i-1] === side  as string) ? 1 : 0; 
    count_dia_rev -= (board[i][board.length- i-1] === oppSide  as string) ? 1 : 0; 

    for (let j = 0; j < board[i].length; j++) {
      count_row[i] += (board[i][j] === side  as string) ? 1 : 0; 
      count_row[i] -= (board[i][j] === oppSide  as string) ? 1 : 0; 

      count_col[j] += (board[i][j] === side  as string) ? 1 : 0; 
      count_col[j] -= (board[i][j] === oppSide  as string) ? 1 : 0; 

    }


  }

  let sol = [];
  for(let i=0 ;i <3; i++) {
    if(count_row[i] == 2) {
      if(board[i][0] == Cell.Playable) sol.push([i, 0]);
      else if(board[i][1] == Cell.Playable) sol.push([i, 1]);
      else if(board[i][2] == Cell.Playable) sol.push([i, 2]);
    }

    if(count_col[i] == 2) {
      if(board[0][i] == Cell.Playable) sol.push([0, i]);
      else if(board[1][i] == Cell.Playable) sol.push([1, i]);
      else if(board[2][i] == Cell.Playable) sol.push([2, i]);
    }
  }

  if(count_dia == 2) {
    if(board[0][0] == Cell.Playable) sol.push([0, 0]);
    else if(board[1][1] == Cell.Playable) sol.push([1, 1]);
    else if(board[2][2] == Cell.Playable) sol.push([2, 2]);  
  }

  if(count_dia_rev == 2) {
    if(board[0][2] == Cell.Playable) sol.push([0, 2]);
    else if(board[1][1] == Cell.Playable) sol.push([1, 1]);
    else if(board[2][0] == Cell.Playable) sol.push([2, 0]);  
  }


  return sol

}


