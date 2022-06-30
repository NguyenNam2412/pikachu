import { combineReducers } from 'redux'

import { render } from './render.reducers'

const rootReducer = combineReducers({
  render,
});

export default rootReducer