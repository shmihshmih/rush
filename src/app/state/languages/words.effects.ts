import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {getAllWords, setWords} from './words.actions';
import {catchError, mergeMap, of} from 'rxjs';
import {EsperantoService} from '../../core/services/esperanto/esperanto.service';
import {map} from 'rxjs/operators';

@Injectable()
export class WordsEffects {
  constructor(private actions$: Actions,
              private esperantoService: EsperantoService) {
  }

  // получение слов
  loadWords$ = createEffect(() => this.actions$.pipe(
    ofType(getAllWords),
    mergeMap(() => this.esperantoService.getWords().pipe(
      map(words => (setWords({words}))),
      catchError(() => of({type: '[Words API] Words Loaded Error'}))
    ))
  ));
}
