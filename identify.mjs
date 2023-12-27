import { write } from "./write.mjs";

export const identify = () => {
  write('name random-step');
  write('author artfuldev<hello@artful.dev>');
  write('version 0.1');
  write('url https://github.com/artfuldev/random-step');
  write('identify ok');
}
