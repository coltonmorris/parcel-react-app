import { createAction } from 'typesafe-actions';
import { Node, Label, UpdateLabel } from './reducer';

// Add Node
export const requestAddNode = createAction('GRAPH_REQUEST_ADD_NODE');
export const cancelAddNode = createAction('GRAPH_CANCEL_ADD_NODE');
export const successAddNode = createAction('GRAPH_ADD_NODE', (node: Node) => ({
  type: 'GRAPH_ADD_NODE',
  payload: node,
}));
export const failureAddNode = createAction('GRAPH_FAILURE_ADD_NODE', (error: string) => ({
  type: 'GRAPH_FAILURE_ADD_NODE',
  payload: error,
}));

// Add Label (map of label name to nodeids)
export const createLabelRequest = createAction('GRAPH_CREATE_LABEL_REQUEST')
export const createLabelSuccess = createAction('GRAPH_CREATE_LABEL_SUCCESS', (label: Label) => ({
  type: 'GRAPH_CREATE_LABEL_SUCCESS',
  payload: label,
}));
export const createLabelFailure = createAction('GRAPH_CREATE_LABEL_FAILURE', (error: string) => ({
  type: 'GRAPH_CREATE_LABEL_FAILURE',
  payload: error,
}));
export const createLabelCancel = createAction('GRAPH_CREATE_LABEL_CANCEL')

export const updateLabelRequest = createAction('GRAPH_UPDATE_LABEL_REQUEST')
export const updateLabelSuccess = createAction('GRAPH_UPDATE_LABEL_SUCCESS', (label: UpdateLabel) => ({
  type: 'GRAPH_UPDATE_LABEL_SUCCESS',
  payload: label,
}));
export const updateLabelFailure = createAction('GRAPH_UPDATE_LABEL_FAILURE', (error: string) => ({
  type: 'GRAPH_UPDATE_LABEL_FAILURE',
  payload: error,
}));
export const updateLabelCancel = createAction('GRAPH_UPDATE_LABEL_CANCEL')

export const deleteLabelRequest = createAction('GRAPH_DELETE_LABEL_REQUEST')
export const deleteLabelSuccess = createAction('GRAPH_DELETE_LABEL_SUCCESS', (label: Label) => ({
  type: 'GRAPH_DELETE_LABEL_SUCCESS',
  payload: label,
}));
export const deleteLabelFailure = createAction('GRAPH_DELETE_LABEL_FAILURE', (error: string) => ({
  type: 'GRAPH_DELETE_LABEL_FAILURE',
  payload: error,
}));
export const deleteLabelCancel = createAction('GRAPH_DELETE_LABEL_CANCEL')
