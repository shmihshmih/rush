import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AutoHRService} from '../../core/services/autohr/auto-hr.service';
import {catchError, mergeMap, of, tap} from 'rxjs';
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
import {TotalSpinnerService} from '../../core/services/total-spinner.service';

@Injectable()
export class AutoHREffects {
  constructor(private actions$: Actions,
              private autoHRService: AutoHRService,
              private tss: TotalSpinnerService) {
  }

  /** Задание */
    // 1. Получение всех задач
  loadTasks$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadTasks),
    tap(() => this.tss.show()),
    mergeMap(() => this.autoHRService.getAllTasks().pipe(
      map(tasks => actions.loadTasksSuccess({tasks})),
      catchError(error => of(actions.loadTasksFail({error: error.toString()})))
    )),
    tap(() => this.tss.hide())
  ));

  // 1.1 Получение всех задач из JSON
  loadTasksByJSON$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadTasksByJSON),
    tap(() => this.tss.show()),
    mergeMap(() => this.autoHRService.getAllTasksByJSON().pipe(
      map(tasks => actions.loadTasksByJSONSuccess({tasks})),
      catchError(error => of(actions.loadTasksByJSONFail({error: error.toString()})))
    )),
    tap(() => this.tss.hide())
  ));

  // 2. Добавление новой задачи
  addTask$ = createEffect(() => this.actions$.pipe(
    ofType(addTask),
    tap(() => this.tss.show()),
    mergeMap((action) => this.autoHRService.addTask(action.newTask).pipe(
      map((newTask) => addTaskSuccess({newTask})),
      catchError((error) => of(addTaskFail({error: error.toString()})))
    )),
    tap(() => this.tss.hide())
  ));

  // 3. Удаление задачи
  removeTask$ = createEffect(() => this.actions$.pipe(
    ofType(removeTask),
    tap(() => this.tss.show()),
    mergeMap((action) => this.autoHRService.delTask(action.deletedTask).pipe(
      map((deletedTask) => removeTaskSuccess({deletedTask})),
      catchError((error) => of(removeTaskFail({error: error.toString()})))
    )),
    tap(() => this.tss.hide())
  ));
  // 4. Редактирование задачи
  updateTask$ = createEffect(() => this.actions$.pipe(
    ofType(updateTask),
    tap(() => this.tss.show()),
    mergeMap((action) => this.autoHRService.updateTask(action.updatedTask).pipe(
      map((updatedTask) => updateTaskSuccess({updatedTask})),
      catchError((error) => of(updateTaskFail({error: error.toString()}))))
    ),
    tap(() => this.tss.hide())
  ));

  /** Получение списка трудностей */
  loadDifficultyCatalog$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadDifficultyCatalog),
    tap(() => this.tss.show()),
    mergeMap(() => this.autoHRService.getDifficulties().pipe(
      map(difficultyCatalog => actions.loadDifficultyCatalogSuccess({difficultyCatalog})),
      catchError(error => of(actions.loadDifficultyCatalogFail({error: error.toString()})))
    )),
    tap(() => this.tss.hide())
  ));

  /** Получение списка компетенция */
  loadCompetenceCatalog$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadCompetenceCatalog),
    tap(() => this.tss.show()),
    mergeMap(() => this.autoHRService.getCompetences().pipe(
      map(competenceCatalog => actions.loadCompetenceCatalogSuccess({competenceCatalog})),
      catchError(error => of(actions.loadCompetenceCatalogFail({error: error.toString()})))
    )),
    tap(() => this.tss.hide())
  ));

  /** Получение списка популярности */
  loadPopularityCatalog$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadPopularityCatalog),
    tap(() => this.tss.show()),
    mergeMap(() => this.autoHRService.getPopularity().pipe(
      map(popularityCatalog => actions.loadPopularityCatalogSuccess({popularityCatalog})),
      catchError(error => of(actions.loadPopularityCatalogFail({error: error.toString()})))
    )),
    tap(() => this.tss.hide())
  ));

}
