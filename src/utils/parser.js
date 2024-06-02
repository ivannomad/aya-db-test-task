export function parser(input) {
  const lines = input.split('\n')
    .filter((line) => line.length > 0);
  const result= [];
  const levels = [result];

  for (const line of lines) {
    const indent = line.search(/\S/);
    const root = line.slice(indent);
    let level = indent >> 1;
    const children = [];

    levels[level].push({ root, children });
    levels[++level] = children;
  }

  return result;
}

