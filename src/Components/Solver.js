const checkLineX = (y1, y2, x, data) => {
  let yLeft = Math.min(y1, y2)
  let yRight = Math.max(y1, y2)
  for( let yi = yLeft + 1; yi < yRight; yi++ ) {
    if(data[x][yi] !== 0) {
      return false;
    }
  }
  return true;
}

const checkLineY = (x1, x2, y, data) => {
  let xUp = Math.min(x1, x2)
  let xDown = Math.max(x1, x2)
  for( let xi = xUp + 1; xi < xDown; xi++) {
    if(data[xi][y] !== 0) {
      return false;
    }
  }
  return true;
}

const checkRectX = (p1, p2, data) =>{
  let pLeft = p1;
  let pRight = p2;
  if(p1.y > p2.y) {
    pLeft = p2;
    pRight = p1;
  }
  for(let yi = pLeft.y + 1; yi < pRight.y; yi++) {
    if(checkLineX(pLeft.y, yi, pLeft.x, data) && checkLineY(pLeft.x, pRight.x, yi, data) && checkLineX(yi, pRight.y, pRight.x, data) && data[pLeft.x][yi] === 0 && data[pRight.x][yi] === 0) {
      return true;
    }
  }
  return false;
}

const checkRectY = (p1, p2, data) => {
  let pUp = p1;
  let pDown = p2;
  if(p1.x > p2.x) {
      pUp = p2;
      pDown = p1;
  }
  for(let xi = pUp.x + 1; xi < pDown.x; xi++) {
    if(checkLineY(pUp.x, xi, pUp.y, data) && checkLineX(pUp.y, pDown.y, xi, data) && checkLineY(xi, pDown.x, pDown.y, data) && data[xi][pUp.y] === 0 && data[xi][pDown.y] === 0) {
      return true;
    }
  }
  return false;
};

const checkEdge = (p1, p2, data) =>{
  let pleft = p1;
  let pright = p2;

  if(p1.y > p2.y) {
    pleft = p2;
    pright = p1;
  }

  let p = {x: pright.x, y: pleft.y};
  if(data[p.x][p.y] === 0) {
    if(checkLineX(p.y, pright.y, p.x, data) && checkLineY(p.x, pleft.x, p.y, data)) {
      return true;
    }
  }

  p = {x: pleft.x, y: pright.y};
  if(data[p.x][p.y] !== 0) return false;

  if(checkLineX(p.y, pleft.y, p.x, data) && checkLineY(p.x, pright.x, p.y, data)) {
    return true;
  }
  return false;
};

const checkMoreLineX = (p1, p2, maxY, data) => {
  let pLeft = p1;
  let pRight = p2;

  if(p1.y > p2.y) {
      pLeft = p2;
      pRight = p1;
  }

  for(let yi = pRight.y + 1; yi <= maxY + 1; yi++) {
    if(checkLineX(pLeft.y, yi, pLeft.x, data) && checkLineX(pRight.y, yi, pRight.x, data) && checkLineY(pLeft.x, pRight.x, yi, data) && data[pLeft.x][yi] === 0 && data[pRight.x][yi] === 0) {
      return true;
    }
  }

  for(let yi = pLeft.y - 1; yi >= 0; yi--) {
    if(checkLineX(pLeft.y, yi, pLeft.x, data) && checkLineX(pRight.y, yi, pRight.x, data) && checkLineY(pLeft.x, pRight.x, yi, data) && data[pLeft.x][yi] === 0 && data[pRight.x][yi] === 0) {
      return true;
    }
  }
  return false;
}

const checkMoreLineY = (p1, p2, maxX, data) => {
  let pUp = p1;
  let pDown = p2;

  if(p1.x > p2.x) {
      pUp = p2;
      pDown = p1;
  }

  for(let xi = pDown.x + 1; xi <= maxX + 1; xi++) {
    if(checkLineY(pUp.x, xi, pUp.y, data) && checkLineY(pDown.x, xi, pDown.y, data) && checkLineX(pUp.y, pDown.y, xi, data) && data[xi][pUp.y] === 0 && data[xi][pDown.y] === 0) {
      return true;
    }
  }

  for(let xi = pUp.x - 1; xi >= 0; xi--) {
    if(checkLineY(pUp.x, xi, pUp.y, data) && checkLineY(pDown.x, xi, pDown.y, data) && checkLineX(pUp.y, pDown.y, xi, data) && data[xi][pUp.y] === 0 && data[xi][pDown.y] === 0) {
      return true;
    }
  }
  return false;
};

export const Solver = (p1, p2, data) => {
  const x1 = p1.x;
  const y1 = p1.y;

  const x2 = p2.x;
  const y2 = p2.y;

  const row = data.length
  const col = data[0].length

  if(data[x1][y1] !== data[x2][y2] || (x1 === x2 && y1 === y2)) {
    return false;
  }

  if(x1 === x2 && checkLineX(y1, y2, x1, data)) return true

  if(y1 === y2 && checkLineY(x1, x2, y1, data)) return true

  if(checkRectX(p1, p2, data)) return true

  if(checkRectY(p1, p2, data)) return true

  if(checkEdge(p1, p2, data)) return true

  if(checkMoreLineX(p1, p2, col, data)) return true

  return checkMoreLineY(p1, p2, row, data)
}