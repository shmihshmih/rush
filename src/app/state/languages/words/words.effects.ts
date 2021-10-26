import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, mergeMap, of} from 'rxjs';
import {EsperantoService} from '../../../core/services/esperanto/esperanto.service';
import {map} from 'rxjs/operators';
import {
  addWordList,
  addWordListFail,
  addWordListSuccess,
  loadWordLists,
  loadWordListsFail,
  loadWordListsSuccess,
  loadWords,
  loadWordsFail,
  loadWordsSuccess,
  removeWordList,
  removeWordListFail,
  removeWordListSuccess,
  updateWordList,
  updateWordListFail,
  updateWordListSuccess
} from './words.actions';

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

  /** Добавление нового списка слов */
  addNewWordList$ = createEffect(() => this.actions$.pipe(
    ofType(addWordList),
    mergeMap((action) => this.esperantoService.addWordList(action.newWordList).pipe(
      map(newWordList => addWordListSuccess({newWordList})),
      catchError((error) => of(addWordListFail({error})))
    ))
  ));

  /** удаление списка слов */
  removeWordList$ = createEffect(() => this.actions$.pipe(
    ofType(removeWordList),
    mergeMap((action) => this.esperantoService.delWordList(action.wordList).pipe(
      map(() => removeWordListSuccess({deleted: action.wordList})),
      catchError((error) => of(removeWordListFail({error})))
    ))
  ));

  /** обновление списка слов */
  updateWordList$ = createEffect(() => this.actions$.pipe(
    ofType(updateWordList),
    mergeMap((action) => this.esperantoService.updateWordList(action.updatedWordList).pipe(
      map(() => updateWordListSuccess({updatedWordList: action.updatedWordList})),
      catchError(error => of(updateWordListFail({error})))
    ))
  ));

}
