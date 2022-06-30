import { Const } from '../constants'

export const renderActions = {
  render,
  click,
  reroll
}

function render() {
  return {
    type: Const.RENDER_REQUEST
  }
}

function click(poinLine) {
  return {
    type: Const.CLICK_REQUEST,
    payload: {
      p1: poinLine[0],
      p2: poinLine[1]
    }
  }
}

function reroll(data) {
  return {
    type: Const.REROLL_REQUEST,
    payload: data
  }
}