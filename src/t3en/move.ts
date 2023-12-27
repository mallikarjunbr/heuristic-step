const column = (index: number) => {
  let result = "";
  do {
    let remainder = index % 26;
    result = String.fromCharCode(97 + remainder) + result;
    index = Math.floor(index / 26) - 1;
  } while (index >= 0);

  return result;
};

export const name = (row: number, col: number) => `${column(col)}${row+1}`;
