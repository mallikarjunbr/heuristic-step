import * as readline from "node:readline";
import { parse, run } from "./st3p";

const rl = readline.createInterface({
  terminal: false,
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  if (process.env.DEBUG) console.log('>', line);
  const result = parse(line);
  if (result.type === "success") run(result.parsed);
  else console.log(`unknown: ${line}, reason: ${result.reason}`);
});
