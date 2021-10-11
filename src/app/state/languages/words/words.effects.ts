import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, mergeMap, of} from 'rxjs';
import {EsperantoService} from '../../../core/services/esperanto/esperanto.service';
import {map} from 'rxjs/operators';
import {loadWords, loadWordsFail, loadWordsSuccess} from './words.actions';

@Injectable()
export class WordsEffects {
  constructor(private actions$: Actions,
              private esperantoService: EsperantoService) {
  }

  // получение слов
  loadWords$ = createEffect(() => this.actions$.pipe(
    ofType(loadWords),
    mergeMap(() => this.esperantoService.getWords().pipe(
      map(words => loadWordsSuccess({words})),
      catchError((error) => of(loadWordsFail({error})))
    ))
  ));
}
