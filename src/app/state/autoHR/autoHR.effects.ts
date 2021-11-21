import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AutoHRService} from '../../core/services/autohr/auto-hr.service';
import {catchError, mergeMap, of} from 'rxjs';
import {map} from 'rxjs/operators';
import * as actions from './autoHR.actions';
import {
  addTask,
  addTaskFail,
  addTaskSuccess,
  removeTask,
  removeTaskFail,
  removeTaskSuccess,
  updateTask,
  updateTaskFail,
  updateTaskSuccess
} from './autoHR.actions';

@Injectable()
export class AutoHREffects {
  constructor(private actions$: Actions,
              private autoHRService: AutoHRService) {
  }

  /** Задание */
    // 1. Получение всех задач
  loadTasks$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadTasks),
    mergeMap(() => this.autoHRService.getAllTasks().pipe(
      map(tasks => actions.loadTasksSuccess({tasks})),
      catchError(error => of(actions.loadTasksFail({error: error.toString()})))
    ))
  ));

  // 1.1 Получение всех задач из JSON
  loadTasksByJSON$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadTasksByJSON),
    mergeMap(() => this.autoHRService.getAllTasksByJSON().pipe(
      map(tasks => actions.loadTasksByJSONSuccess({tasks})),
      catchError(error => of(actions.loadTasksByJSONFail({error: error.toString()})))
    ))
  ));

  // 2. Добавление новой задачи
  addTask$ = createEffect(() => this.actions$.pipe(
    ofType(addTask),
    mergeMap((action) => this.autoHRService.addTask(action.newTask).pipe(
      map((newTask) => addTaskSuccess({newTask})),
      catchError((error) => of(addTaskFail({error: error.toString()})))
    ))
  ));

  // 3. Удаление задачи
  removeTask$ = createEffect(() => this.actions$.pipe(
    ofType(removeTask),
    mergeMap((action) => this.autoHRService.delTask(action.deletedTask).pipe(
      map((deletedTask) => removeTaskSuccess({deletedTask})),
      catchError((error) => of(removeTaskFail({error: error.toString()})))
    ))
  ));
  // 4. Редактирование задачи
  updateTask$ = createEffect(() => this.actions$.pipe(
    ofType(updateTask),
    mergeMap((action) => this.autoHRService.updateTask(action.updatedTask).pipe(
      map((updatedTask) => updateTaskSuccess({updatedTask})),
      catchError((error) => of(updateTaskFail({error: error.toString()}))))
    )
  ));

  /** Получение списка трудностей */
  loadDifficultyCatalog$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadDifficultyCatalog),
    mergeMap(() => this.autoHRService.getDifficulties().pipe(
      map(difficultyCatalog => actions.loadDifficultyCatalogSuccess({difficultyCatalog})),
      catchError(error => of(actions.loadDifficultyCatalogFail({error: error.toString()})))
    ))
  ));

  /** Получение списка компетенция */
  loadCompetenceCatalog$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadCompetenceCatalog),
    mergeMap(() => this.autoHRService.getCompetences().pipe(
      map(competenceCatalog => actions.loadCompetenceCatalogSuccess({competenceCatalog})),
      catchError(error => of(actions.loadCompetenceCatalogFail({error: error.toString()})))
    ))
  ));

  /** Получение списка популярности */
  loadPopularityCatalog$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadPopularityCatalog),
    mergeMap(() => this.autoHRService.getPopularity().pipe(
      map(popularityCatalog => actions.loadPopularityCatalogSuccess({popularityCatalog})),
      catchError(error => of(actions.loadPopularityCatalogFail({error: error.toString()})))
    ))
  ));

}
