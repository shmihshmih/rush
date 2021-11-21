import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, mergeMap, of} from 'rxjs';
import {EsperantoService} from '../../../core/services/esperanto/esperanto.service';
import {map} from 'rxjs/operators';
import {
  addWord,
  addWordFail,
  addWordList,
  addWordListFail,
  addWordListSuccess,
  addWordSuccess,
  loadWordLists,
  loadWordListsByJSON,
  loadWordListsByJSONFail,
  loadWordListsByJSONSuccess,
  loadWordListsFail,
  loadWordListsSuccess,
  loadWords,
  loadWordsByJSON,
  loadWordsByJSONFail,
  loadWordsByJSONSuccess,
  loadWordsFail,
  loadWordsSuccess,
  removeWord,
  removeWordFail,
  removeWordList,
  removeWordListFail,
  removeWordListSuccess,
  removeWordSuccess,
  setSelectedWordLists,
  setSelectedWordListsByJSON,
  updateWord,
  updateWordFail,
  updateWordList,
  updateWordListFail,
  updateWordListSuccess,
  updateWordSuccess
} from './words.actions';
import {Store} from '@ngrx/store';
import {ApiService} from '../../../core/services/api.service';

@Injectable()
export class WordsEffects {
  constructor(private actions$: Actions,
              private esperantoService: EsperantoService,
              private store: Store,
              private apiService: ApiService) {
  }

  /** Получение слов */
  loadWords$ = createEffect(() => this.actions$.pipe(
    ofType(loadWords),
    mergeMap(() => this.esperantoService.getWords().pipe(
      map(words => loadWordsSuccess({words})),
      catchError((error) => {
        return of(loadWordsFail({error: error.toString()}));
      })
    ))
  ));

  /** Получение слов из JSON */
  loadWordsByJSON$ = createEffect(() => this.actions$.pipe(
    ofType(loadWordsByJSON),
    mergeMap(() => this.esperantoService.getWordsByJSON().pipe(
      map(words => loadWordsByJSONSuccess({words})),
      catchError((error) => {
        return of(loadWordsByJSONFail({error: error.toString()}));
      })
    ))
  ));

  /** Получение слов определенного списка */
  loadWordsByWordList$ = createEffect(() => this.actions$.pipe(
    ofType(setSelectedWordLists),
    mergeMap((action) => this.esperantoService.getWordsByWordList(action.selectedWordLists).pipe(
      map(words => loadWordsSuccess({words})),
      catchError((error) => of(loadWordsFail({error: error.toString()})))
    ))
  ));

  /** Получение слов определенного списка из JSON */
  loadWordsByWordListByJSON$ = createEffect(() => this.actions$.pipe(
    ofType(setSelectedWordListsByJSON),
    mergeMap((action) => this.esperantoService.getWordsByWordListByJSON(action.selectedWordLists).pipe(
      map(words => loadWordsByJSONSuccess({words})),
      catchError((error) => of(loadWordsByJSONFail({error: error.toString()})))
    ))
  ));

  /** Добавление нового слова */
  addNewWord$ = createEffect(() => this.actions$.pipe(
    ofType(addWord),
    mergeMap((action) => this.esperantoService.addWord(action.newWord).pipe(
      map((newWord) => addWordSuccess({newWord})),
      catchError((error) => of(addWordFail({error: error.toString()})))
    ))
  ));

  /** Удаление слова */
  removeWord$ = createEffect(() => this.actions$.pipe(
    ofType(removeWord),
    mergeMap((action) => this.esperantoService.delWord(action.deletedWord).pipe(
      map((deletedWord) => removeWordSuccess({deletedWord})),
      catchError(({error}) => of(removeWordFail({error: error.toString()})))
    ))
  ));

  /** Редактирование слова */
  updateWord$ = createEffect(() => this.actions$.pipe(
    ofType(updateWord),
    mergeMap((action) => this.esperantoService.updateWord(action.updatedWord).pipe(
      map((updatedWord) => updateWordSuccess({updatedWord})),
      catchError((error) => of(updateWordFail({error: error.toString()})))
    ))
  ));

  /** Получение списков слов */
  loadWordLists$ = createEffect(() => this.actions$.pipe(
    ofType(loadWordLists),
    mergeMap(() => {
      return this.esperantoService.getWordLists().pipe(
        map(wordLists => loadWordListsSuccess({wordLists})),
        catchError((error) => {
          this.apiService.showError(error.toString());
          return of(loadWordListsFail({error: error.toString()}));
        })
      );
    })
  ));

  /** Получение списков слов из JSON */
  loadWordListsFromJSON$ = createEffect(() => this.actions$.pipe(
    ofType(loadWordListsByJSON),
    mergeMap(() => {
      return this.esperantoService.getWordListsByJSON().pipe(
        map(wordLists => loadWordListsByJSONSuccess({wordLists})),
        catchError((error) => {
          this.apiService.showError(error.toString());
          return of(loadWordListsByJSONFail({error: error.toString()}));
        })
      );
    })
  ));

  /** Добавление нового списка слов */
  addNewWordList$ = createEffect(() => this.actions$.pipe(
    ofType(addWordList),
    mergeMap((action) => this.esperantoService.addWordList(action.newWordList).pipe(
      map(newWordList => addWordListSuccess({newWordList})),
      catchError((error) => of(addWordListFail({error: error.toString()})))
    ))
  ));

  /** удаление списка слов */
  removeWordList$ = createEffect(() => this.actions$.pipe(
    ofType(removeWordList),
    mergeMap((action) => this.esperantoService.delWordList(action.wordList).pipe(
      map(() => removeWordListSuccess({deleted: action.wordList})),
      catchError((error) => of(removeWordListFail({error: error.toString()})))
    ))
  ));

  /** обновление списка слов */
  updateWordList$ = createEffect(() => this.actions$.pipe(
    ofType(updateWordList),
    mergeMap((action) => this.esperantoService.updateWordList(action.updatedWordList).pipe(
      map(() => updateWordListSuccess({updatedWordList: action.updatedWordList})),
      catchError(error => of(updateWordListFail({error: error.toString()})))
    ))
  ));

}
