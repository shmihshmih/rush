import {createAction, props} from '@ngrx/store';

enum AutoHRActionsTypes {
  /** Задачи */
  loadTasks = '[AUTO HR] load tasks',
  loadTasksSuccess = '[AUTO HR] load tasks success',

  /** Конфиги */
  loadTasksFail = '[AUTO HR] load tasks fail',
  setAutoHRConfig = '[AUTO HR] set autoHR config',
  clearAutoHRConfig = `[AUTO HR] clear autoHR config`,

  /** Справочник сложностей */
  loadDifficultyCatalog = `[AUTO HR] load DifficultyCatalog`,
  loadDifficultyCatalogSuccess = `[AUTO HR] load DifficultyCatalog success`,
  loadDifficultyCatalogFail = `[AUTO HR] DifficultyCatalog error`,

  /** Справочник компетенций */
  loadCompetenceCatalog = `[AUTO HR] load CompetenceCatalog`,
  loadCompetenceCatalogSuccess = `[AUTO HR] load CompetenceCatalog success`,
  loadCompetenceCatalogFail = `[AUTO HR] load CompetenceCatalog fail`,

  /** Справочник популярностей */
  loadPopularityCatalog = `[AUTO HR] load PopularityCatalog`,
  loadPopularityCatalogSuccess = `[AUTO HR] load PopularityCatalog success`,
  loadPopularityCatalogFail = `[AUTO HR] load PopularityCatalog fail`
}

/** Задачи */
export const loadTasks = createAction(AutoHRActionsTypes.loadTasks); // effect
export const loadTasksSuccess = createAction(AutoHRActionsTypes.loadTasksSuccess, props<{ tasks }>());
export const loadTasksFail = createAction(AutoHRActionsTypes.loadTasksFail, props<{ error }>());

/** Конфиги */
export const setAutoHRConfig = createAction(AutoHRActionsTypes.setAutoHRConfig, props<{ config }>());
export const clearAutoHRConfig = createAction(AutoHRActionsTypes.clearAutoHRConfig);

/** Справочники */
/** Справочник сложностей */
export const loadDifficultyCatalog = createAction(AutoHRActionsTypes.loadDifficultyCatalog); // effect
export const loadDifficultyCatalogSuccess = createAction(AutoHRActionsTypes.loadDifficultyCatalogSuccess, props<{ difficultyCatalog }>());
export const loadDifficultyCatalogFail = createAction(AutoHRActionsTypes.loadDifficultyCatalogFail, props<{ error }>());

/** Справочник компетенций */
export const loadCompetenceCatalog = createAction(AutoHRActionsTypes.loadCompetenceCatalog); // effect
export const loadCompetenceCatalogSuccess = createAction(AutoHRActionsTypes.loadCompetenceCatalogSuccess, props<{ competenceCatalog }>());
export const loadCompetenceCatalogFail = createAction(AutoHRActionsTypes.loadCompetenceCatalogFail, props<{ error }>());

/** Справочник популярностей */
export const loadPopularityCatalog = createAction(AutoHRActionsTypes.loadPopularityCatalog); // effect
export const loadPopularityCatalogSuccess = createAction(AutoHRActionsTypes.loadPopularityCatalogSuccess, props<{ popularityCatalog }>());
export const loadPopularityCatalogFail = createAction(AutoHRActionsTypes.loadPopularityCatalogFail, props<{ error }>());
