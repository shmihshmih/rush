import {createReducer, on} from '@ngrx/store';
import * as fromTasks from './index';
import * as actions from './autoHR.actions';
import {addTaskFail, addTaskSuccess, removeTaskFail, removeTaskSuccess, updateTaskFail, updateTaskSuccess} from './autoHR.actions';
import {ITask} from '../../shared/models/autoHR/question.model';
import {ISobesConfigModel} from '../../shared/models/autoHR/sobesConfig.model';

/** tasks */
export const initialTasksState: ITask[] = [];
export const tasksReducer = createReducer(initialTasksState,
  // 1. Получение всех задач
  on(actions.loadTasksSuccess, (state, {tasks}) => {
    return [...tasks];
  }),
  on(actions.loadTasksFail, (state, {error}) => {
    return error;
  }),
  // 2. Добавление новой задачи
  on(addTaskSuccess, (state, {newTask}) => {
    return [...state, newTask];
  }),
  on(addTaskFail, (state, {error}) => {
    return [];
  }),
  // 3. Удаление задачи
  on(removeTaskSuccess, (state, {deletedTask}) => {
    const newState = [...state];
    const indexOfDeletedTask = newState.findIndex(t => t.id === deletedTask.id);
    newState.splice(indexOfDeletedTask, 1);
    return [...newState];
  }),
  on(removeTaskFail, (state, {error}) => {
    return [];
  }),
  // 4. Редактирование задачи
  on(updateTaskSuccess, (state, {updatedTask}) => {
    const newState = [...state];
    const indexOfDeletedTask = newState.findIndex(t => t.id === updatedTask.id);
    newState[indexOfDeletedTask] = updatedTask;
    return [...newState];
  }),
  on(updateTaskFail, (state, {error}) => {
    return [];
  })
);


/** config */
export const initialConfigState: ISobesConfigModel = {
  count: null,
  type: null,
  difficulty: [],
  competence: [],
  popularity: []
};
export const configReducer = createReducer(initialConfigState,
  on(actions.setAutoHRConfig, (state, {config}) => {
    return config;
  }),
  on(actions.clearAutoHRConfig, () => {
    return initialConfigState;
  })
);

/** Справочники */
export const initialCatalogState: string[] = [];
export const catalogReducer = createReducer(initialCatalogState,
  on(actions.loadDifficultyCatalogSuccess, (state, {difficultyCatalog}) => {
    return {...state, difficultyCatalog};
  }),
  on(actions.loadDifficultyCatalogFail, (state, {error}) => {
    return error;
  }),

  on(actions.loadCompetenceCatalogSuccess, (state, {competenceCatalog}) => {
    return {...state, competenceCatalog};
  }),
  on(actions.loadCompetenceCatalogFail, (state, {error}) => {
    return error;
  }),

  on(actions.loadPopularityCatalogSuccess, (state, {popularityCatalog}) => {
    return {...state, popularityCatalog};
  }),
  on(actions.loadPopularityCatalogFail, (state, {error}) => {
    return error;
  }),
);


/** whole initial */
export const initialAutoHRState: fromTasks.State = {
  tasks: initialTasksState,
  config: initialConfigState,
  catalogs: {
    difficultyCatalog: initialCatalogState,
    competenceCatalog: initialCatalogState,
    popularityCatalog: initialCatalogState
  }
};
