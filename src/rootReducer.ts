import { combineReducers, Reducer, } from 'redux'

import { RootState } from './rootState';
import { DogReducer } from './dog/reducer';
import { GraphReducer } from './graph/reducer';


export const RootReducer: Reducer<RootState> = combineReducers({
  dog: DogReducer,
  graph: GraphReducer,
})
