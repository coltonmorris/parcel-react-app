import { Epic } from 'redux-observable';
import { isActionOf } from 'typesafe-actions';
import { Observable } from 'rxjs';
import * as axios from "axios";
import 'rxjs/add/observable/dom/ajax';
import { combineEpics } from 'redux-observable';

import { RootState } from '../rootState';
import { RootAction } from "../rootAction";
import * as GraphActions from './actions';
import { Node, Label, UpdateLabel } from './types';

const nodeEpics: Epic<RootAction, RootState> = (action$, store) => action$
  .filter(isActionOf(GraphActions.requestAddNode))
  .do(() => { console.log('in node epic'); })
  .debounceTime(400)
  .flatMap(() => {
    return Observable
      .ajax({crossDomain: true, method: 'GET', url: 'https://dog.ceo/api/breeds/image/random'})
    //.delay(2000)
      .takeUntil(action$.filter(isActionOf(GraphActions.cancelAddNode)))
      .map(res => ({ img: res.response.message, id: 400, type: 'pipeline'}) as Node)
      .map(myNode => GraphActions.successAddNode(myNode))
      .catch(error => Observable.of(GraphActions.failureAddNode(error)))
  })

const createLabelEpic: Epic<RootAction, RootState> = (action$, store) => action$
  .filter(isActionOf(GraphActions.createLabelRequest))
  .do(() => { console.log('create label epic', action$) })
  .flatMap(() => {
    return Observable
      .ajax({crossDomain: true, method: 'GET', url: 'https://dog.ceo/api/breeds/image/random'})
      //.delay(2000)
      .takeUntil(action$.filter(isActionOf(GraphActions.createLabelCancel)))
      .map(res => ({ img: res.response.message, nodeId: 1 }) as Label)
      .do(test => { console.log('lol', test) })
      .map(myLabel => GraphActions.createLabelSuccess(myLabel))
      .catch(error => Observable.of(GraphActions.createLabelFailure(error)))
  })

const deleteLabelEpic: Epic<RootAction, RootState> = (action$, store) => action$
  .filter(isActionOf(GraphActions.deleteLabelRequest))
  .do(() => { console.log('delete label epic', action$) })
  .debounceTime(400)
  .delay(1000)
  .takeUntil(action$.filter(isActionOf(GraphActions.deleteLabelCancel)))
  .map(action => GraphActions.deleteLabelSuccess({...action.payload} as Label))
  .catch(error => Observable.of(GraphActions.deleteLabelFailure(error)))

const updateLabelEpic: Epic<RootAction, RootState> = (action$, store) => action$
  .filter(isActionOf(GraphActions.updateLabelRequest))
  .do((test) => { console.log('update label epic', test) })
  .flatMap((action) => {
    return Observable
      .ajax({crossDomain: true, method: 'GET', url: 'https://dog.ceo/api/breeds/image/random'})
      //.delay(2000)
      .takeUntil(action$.filter(isActionOf(GraphActions.updateLabelCancel)))
      .map(res => ({ img: res.response.message, nodeId: 1, prevImg: action.payload.img}) as UpdateLabel)
      .map(myLabel => GraphActions.updateLabelSuccess(myLabel))
      .catch(error => Observable.of(GraphActions.updateLabelFailure(error)))
  })

export const RootGraphEpics = combineEpics(
  nodeEpics,
  createLabelEpic,
  deleteLabelEpic,
  updateLabelEpic,
)
