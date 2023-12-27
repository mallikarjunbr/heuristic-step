import * as readline from "node:readline";

const rl = readline.createInterface({
  terminal: false,
  input: process.stdin,
  output: process.stdout,
});

function write(string) {
  if (process.env.DEBUG)
    console.log('<', string);
  else
    console.log(string);
}

function identify() {
  write('name random-step');
  write('author artfuldev<hello@artful.dev>');
  write('version 0.1');
  write('url https://github.com/artfuldev/random-step');
  write('identify ok');
}

rl.on("line", (line) => {
  if (process.env.DEBUG) console.log(">", line);
  const trimmed = line.trim();
  if (trimmed === "step version 1") write(`${line} ok`);
  else if (trimmed === "quit" ) process.exit(0);
  else if (trimmed === "identify") identify();
  else write(`unknown: ${line}`);
});
