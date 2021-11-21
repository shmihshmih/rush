import {createAction, props} from '@ngrx/store';

enum AutoHRActionsTypes {
  /** Задачи */
    // 1. Получение всех задач
  loadTasks = '[AUTO HR] load tasks',
  loadTasksSuccess = '[AUTO HR] load tasks success',
  loadTasksFail = '[AUTO HR] load tasks fail',

  // 1.1 Получение всех задач из JSON
  loadTasksByJSON = '[AUTO HR] load tasks ByJSON',
  loadTasksByJSONSuccess = '[AUTO HR] load tasks success ByJSON',
  loadTasksByJSONFail = '[AUTO HR] load tasks fail ByJSON',

  // 2. Добавление новой задачи
  addTask = '[AUTO HR] add task',
  addTaskSuccess = '[AUTO HR] add task success',
  addTaskFail = '[AUTO HR] add task fail',

  // 3. Удаление задачи
  removeTask = '[AUTO HR] remove task',
  removeTaskSuccess = '[AUTO HR] remove task success',
  removeTaskFail = '[AUTO HR] remove task fail',

  // 4. Редактирование задачи
  updateTask = '[AUTO HR] update task',
  updateTaskSuccess = '[AUTO HR] update task success',
  updateTaskFail = '[AUTO HR] update task fail',

  /** Конфиги */
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
// 1. Получение всех задач
export const loadTasks = createAction(AutoHRActionsTypes.loadTasks); // effect
export const loadTasksSuccess = createAction(AutoHRActionsTypes.loadTasksSuccess, props<{ tasks }>());
export const loadTasksFail = createAction(AutoHRActionsTypes.loadTasksFail, props<{ error }>());

// 1.1 Получение всех задач из JSON
export const loadTasksByJSON = createAction(AutoHRActionsTypes.loadTasksByJSON); // effect
export const loadTasksByJSONSuccess = createAction(AutoHRActionsTypes.loadTasksByJSONSuccess, props<{ tasks }>());
export const loadTasksByJSONFail = createAction(AutoHRActionsTypes.loadTasksByJSONFail, props<{ error }>());

// 2. Добавление новой задачи
export const addTask = createAction(AutoHRActionsTypes.addTask, props<{ newTask }>());
export const addTaskSuccess = createAction(AutoHRActionsTypes.addTaskSuccess, props<{ newTask }>());
export const addTaskFail = createAction(AutoHRActionsTypes.addTaskFail, props<{ error }>());

// 3. Удаление задачи
export const removeTask = createAction(AutoHRActionsTypes.removeTask, props<{ deletedTask }>());
export const removeTaskSuccess = createAction(AutoHRActionsTypes.removeTaskSuccess, props<{ deletedTask }>());
export const removeTaskFail = createAction(AutoHRActionsTypes.removeTaskFail, props<{ error }>());

// 4. Редактирование задачи
export const updateTask = createAction(AutoHRActionsTypes.updateTask, props<{ updatedTask }>());
export const updateTaskSuccess = createAction(AutoHRActionsTypes.updateTaskSuccess, props<{ updatedTask }>());
export const updateTaskFail = createAction(AutoHRActionsTypes.updateTaskFail, props<{ error }>());

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
