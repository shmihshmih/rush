import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AutoHRService} from '../../core/services/autohr/auto-hr.service';
import {catchError, mergeMap, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {loadTasks, loadTasksFail, loadTasksSuccess} from './autoHR.actions';

@Injectable()
export class AutoHREffects {
  constructor(private actions$: Actions,
              private autoHRService: AutoHRService) {
  }

  /** Получение всех заданий */
  loadTasks$ = createEffect(() => this.actions$.pipe(
    ofType(loadTasks),
    mergeMap(() => this.autoHRService.getAllTasks().pipe(
      map(tasks => loadTasksSuccess({tasks})),
      catchError(error => of(loadTasksFail({error})))
    ))
  ));
}
