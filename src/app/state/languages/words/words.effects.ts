import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, mergeMap, of} from 'rxjs';
import {EsperantoService} from '../../../core/services/esperanto/esperanto.service';
import {map} from 'rxjs/operators';
import {loadWordLists, loadWordListsFail, loadWordListsSuccess, loadWords, loadWordsFail, loadWordsSuccess} from './words.actions';

@Injectable()
export class WordsEffects {
  constructor(private actions$: Actions,
              private esperantoService: EsperantoService) {
  }

  /** Получение слов */
  loadWords$ = createEffect(() => this.actions$.pipe(
    ofType(loadWords),
    mergeMap(() => this.esperantoService.getWords().pipe(
      map(words => loadWordsSuccess({words})),
      catchError((error) => of(loadWordsFail({error})))
    ))
  ));

  /** Получение списков слов */
  loadWordLists$ = createEffect(() => this.actions$.pipe(
    ofType(loadWordLists),
    mergeMap(() => this.esperantoService.getWordLists().pipe(
      map(wordLists => loadWordListsSuccess({wordLists})),
      catchError((error) => of(loadWordListsFail({error})))
    ))
  ));
}
