import {createReducer, on} from '@ngrx/store';
import * as fromTasks from './index';
import {loadTasksFail, loadTasksSuccess, setAutoHRConfig} from './autoHR.actions';
import {ITask} from '../../shared/models/autoHR/question.model';
import {ISobesConfigModel} from '../../shared/models/autoHR/sobesConfig.model';

export const initialTasksState: ITask[] = [];
export const tasksReducer = createReducer(initialTasksState,
  on(loadTasksSuccess, (state, {tasks}) => {
    return tasks;
  }),
  on(loadTasksFail, (state, {error}) => {
    return error;
  }));


export const initialConfigState: ISobesConfigModel = {
  count: null,
  type: null,
  difficulty: null,
  competence: null,
  popularity: null
};
export const configReducer = createReducer(initialConfigState,
  on(setAutoHRConfig, (state, {config}) => {
    return config;
  })
);

export const initialAutoHRState: fromTasks.State = {
  tasks: initialTasksState,
  config: initialConfigState
};
