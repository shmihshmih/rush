import {createReducer, on} from '@ngrx/store';
import * as fromTasks from './index';
import {clearAutoHRConfig, loadTasksFail, loadTasksSuccess, setAutoHRConfig} from './autoHR.actions';
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
  difficulty: [],
  competence: [],
  popularity: []
};
export const configReducer = createReducer(initialConfigState,
  on(setAutoHRConfig, (state, {config}) => {
    return config;
  }),
  on(clearAutoHRConfig, () => {
    return initialConfigState;
  })
);

export const initialAutoHRState: fromTasks.State = {
  tasks: initialTasksState,
  config: initialConfigState
};
