import { createSelector } from 'reselect'

const getData = (state) => state.render.get('Data')

export const getDataList = createSelector(
  [getData],
  (data) => data
)