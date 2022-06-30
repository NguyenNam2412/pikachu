import { Map, List } from 'immutable';

import { Const } from '../constants'
import { Matrix } from '../Components/Matrix'
import { Solver} from '../Components/Solver'

const initialState = Map({
  Data: List([]),
})

const Check = (p1, p2, data) => {
  const newData = [...data];
  if(Solver(p1, p2, data)) {
    data[p1.x][p1.y] = 0;
    data[p2.x][p2.y] = 0;
    return newData
  } else {
    return data
  }
}

const getRandom = (a, b) => {
  a = Math.ceil(a);
  b = Math.floor(b);
  return Math.floor(Math.random() * (b - a) + a);
}

const Shuffle = (data) => {
  const newData = [...data];
  for(let i = 1; i < newData.length - 1; i++) {
    for (let j = 2; j < newData[i].length - 1; j++) {
      const k = getRandom(1, newData[i].length - 1);
      [newData[i][j], newData[i][k]] = [newData[i][k], newData[i][j]];
    }
  }
  return newData
}

export function render( state = initialState, action) {
  switch (action.type) {
    case Const.RENDER_SUCCESS:
      return state.merge({
        Data: Matrix(6, 8, 36, action.payload)
      })
    case Const.CLICK_SUCCESS:
      return state.merge({
        Data: Check(action.payload.p1, action.payload.p2, state.get('Data'))
      })
    case Const.REROLL_SUCCESS:
      return state.merge({
        Data: Shuffle(action.payload)
      })
    default:
      return state
  }
}
