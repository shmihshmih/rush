import {createAction, props} from '@ngrx/store';

enum AutoHRActionsTypes {
  loadTasks = '[AUTO HR] load tasks',
  loadTasksSuccess = '[AUTO HR] load tasks success',
  loadTasksFail = '[AUTO HR] load tasks fail',
  setAutoHRConfig = '[AUTO HR] set autoHR config',
  clearAutoHRConfig = `[AUTO HR] clear autoHR config`
}

export const loadTasks = createAction(AutoHRActionsTypes.loadTasks); // effect
export const loadTasksSuccess = createAction(AutoHRActionsTypes.loadTasksSuccess, props<{ tasks }>());
export const loadTasksFail = createAction(AutoHRActionsTypes.loadTasksFail, props<{ error }>());

export const setAutoHRConfig = createAction(AutoHRActionsTypes.setAutoHRConfig, props<{ config }>());
export const clearAutoHRConfig = createAction(AutoHRActionsTypes.clearAutoHRConfig);
