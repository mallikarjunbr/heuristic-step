import * as readline from "node:readline";
import { write } from "./write";
import { identify } from "./identify";

const rl = readline.createInterface({
  terminal: false,
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  if (process.env.DEBUG) console.log(">", line);
  const trimmed = line.trim();
  if (trimmed === "step version 1") write(`${line} ok`);
  else if (trimmed === "quit" ) process.exit(0);
  else if (trimmed === "identify") identify();
  else write(`unknown: ${line}`);
});
