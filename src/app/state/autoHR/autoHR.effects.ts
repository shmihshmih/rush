import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AutoHRService} from '../../core/services/autohr/auto-hr.service';
import {loadQuestions, loadQuestionsFail, loadQuestionsSuccess} from './autoHR.actions';
import {catchError, mergeMap, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class AutoHREffects {
  constructor(private actions$: Actions,
              private autoHRService: AutoHRService) {
  }

  /** Получение всех заданий */
  loadQuestions$ = createEffect(() => this.actions$.pipe(
    ofType(loadQuestions),
    mergeMap(() => this.autoHRService.getAllTasks().pipe(
      map(questions => loadQuestionsSuccess({questions})),
      catchError(error => of(loadQuestionsFail({error})))
    ))
  ));
}
