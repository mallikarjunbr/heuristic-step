export const write = (str: string) => {
  if (process.env.DEBUG)
    console.log('<', str);
  else
    console.log(str);
}
