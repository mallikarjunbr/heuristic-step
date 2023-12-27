export const write = (string) => {
  if (process.env.DEBUG)
    console.log('<', string);
  else
    console.log(string);
}
