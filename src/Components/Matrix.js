const range = (n) => {
  return [...Array(n + 1).keys()];
}

const getRandom = (a, b) => {
  a = Math.ceil(a);
  b = Math.floor(b);
  return Math.floor(Math.random() * (b - a) + a);
}

const getRow = (n, col) => {
  return Math.ceil(n / col);
}

const getCol = (n, col) => {
  return n % col === 0 ? col : n % col;
}

export const Matrix = (row, col, amount, data) => {
  let r = row * col;
  const list = range(r);
  const table = [...Array(row + 2)].fill(0).map((_)=> [...Array(col + 2)].fill(0));
  let first, second, index;
  while(r > 0) {
    const icon = (r/2) > amount ? amount : r/2;
    r -= icon*2;
    for (let i = 1; i <= icon; i++) {
      index = getRandom(1, list.length - 1);
      first = list[index];
      list[index] = list.pop();
      
      index = getRandom(1, list.length - 1);
      second = list[index];
      list[index] = list.pop();

      table[getRow(first, col)][getCol(first, col)] = table[getRow(second, col)][getCol(second, col)] = data[i];
    }
  }
  return table
}