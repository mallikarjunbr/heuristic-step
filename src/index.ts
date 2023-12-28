import * as readline from "node:readline";
import { parse, run } from "./st3p";

const rl = readline.createInterface({
  terminal: false,
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  if (process.env.DEBUG) console.log('>', line);
  const [command, rest] = parse(line);
  if (command != null) run(command);
  else console.log(`unknown: ${rest}`);
});
