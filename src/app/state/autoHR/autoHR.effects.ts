import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AutoHRService} from '../../core/services/autohr/auto-hr.service';
import {catchError, mergeMap, of} from 'rxjs';
import {map} from 'rxjs/operators';
import * as actions from './autoHR.actions';

@Injectable()
export class AutoHREffects {
  constructor(private actions$: Actions,
              private autoHRService: AutoHRService) {
  }

  /** Получение всех заданий */
  loadTasks$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadTasks),
    mergeMap(() => this.autoHRService.getAllTasks().pipe(
      map(tasks => actions.loadTasksSuccess({tasks})),
      catchError(error => of(actions.loadTasksFail({error})))
    ))
  ));

  /** Получение списка трудностей */
  loadDifficultyCatalog$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadDifficultyCatalog),
    mergeMap(() => this.autoHRService.getDifficulties().pipe(
      map(difficultyCatalog => actions.loadDifficultyCatalogSuccess({difficultyCatalog})),
      catchError(error => of(actions.loadDifficultyCatalogFail({error})))
    ))
  ));

  /** Получение списка компетенция */
  loadCompetenceCatalog$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadCompetenceCatalog),
    mergeMap(() => this.autoHRService.getCompetences().pipe(
      map(competenceCatalog => actions.loadCompetenceCatalogSuccess({competenceCatalog})),
      catchError(error => of(actions.loadCompetenceCatalogFail({error})))
    ))
  ));

  /** Получение списка популярности */
  loadPopularityCatalog$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadPopularityCatalog),
    mergeMap(() => this.autoHRService.getPopularity().pipe(
      map(popularityCatalog => actions.loadPopularityCatalogSuccess({popularityCatalog})),
      catchError(error => of(actions.loadPopularityCatalogFail({error})))
    ))
  ));

}
