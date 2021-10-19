import {createReducer, on} from '@ngrx/store';
import * as fromTasks from './index';
import * as actions from './autoHR.actions';
import {ITask} from '../../shared/models/autoHR/question.model';
import {ISobesConfigModel} from '../../shared/models/autoHR/sobesConfig.model';

/** tasks */
export const initialTasksState: ITask[] = [];
export const tasksReducer = createReducer(initialTasksState,
  on(actions.loadTasksSuccess, (state, {tasks}) => {
    return tasks;
  }),
  on(actions.loadTasksFail, (state, {error}) => {
    return error;
  }));


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
