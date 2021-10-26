import {createAction, props} from '@ngrx/store';

/** words */

enum WordsActionsTypes {
  loadWords = '[WORDS] load words',
  loadWordsSuccess = '[WORDS] load words success',
  loadWordsFail = '[WORDS] load words fail'
}

export const loadWords = createAction(WordsActionsTypes.loadWords); // effect
export const loadWordsSuccess = createAction(WordsActionsTypes.loadWordsSuccess, props<{ words }>());
export const loadWordsFail = createAction(WordsActionsTypes.loadWordsFail, props<{ error: string }>());

/** wordLists */

enum wordListsActionsTypes {
  // 1. получение всех списков слов
  loadWordLists = '[WORD LISTS] load wordLists',
  loadWordListsSuccess = '[WORD LISTS] load wordLists success',
  loadWordListsFail = '[WORD LISTS] load wordLists fail',

  // 2. добавление нового списка слов
  addWordList = '[WORD LISTS] add new wordlist',
  addWordListSuccess = '[WORD LISTS] add new wordlist success',
  addWordListFail = '[WORD LISTS] add new wordlist fail',

  // 3. удаление списка слов
  removeWordList = '[WORD LISTS] remove word list',
  removeWordListSuccess = '[WORD LISTS] remove word list success',
  removeWordListFail = '[WORD LISTS] remove word list fail',

  // 4. обновление списка слов
  updateWordList = '[WORD LISTS] update word list',
  updateWordListSuccess = '[WORD LISTS] update word list success',
  updateWordListFail = '[WORD LISTS] update word list fail'
}

// 1. получение всех списков слов
export const loadWordLists = createAction(wordListsActionsTypes.loadWordLists); // effect
export const loadWordListsSuccess = createAction(wordListsActionsTypes.loadWordListsSuccess, props<{ wordLists }>());
export const loadWordListsFail = createAction(wordListsActionsTypes.loadWordListsFail, props<{ error: string }>());

// 2. добавление нового списка слов
export const addWordList = createAction(wordListsActionsTypes.addWordList, props<{ newWordList }>()); // effect
export const addWordListSuccess = createAction(wordListsActionsTypes.addWordListSuccess, props<{ newWordList }>());
export const addWordListFail = createAction(wordListsActionsTypes.addWordListFail, props<{ error }>());

// 3. удаление списка слов
export const removeWordList = createAction(wordListsActionsTypes.removeWordList, props<{ wordList }>()); // effect
export const removeWordListSuccess = createAction(wordListsActionsTypes.removeWordListSuccess, props<{ deleted }>());
export const removeWordListFail = createAction(wordListsActionsTypes.removeWordListFail, props<{ error }>());

// 4. обновление списка слов
export const updateWordList = createAction(wordListsActionsTypes.updateWordList, props<{ updatedWordList }>()); // effect
export const updateWordListSuccess = createAction(wordListsActionsTypes.updateWordListSuccess, props<{ updatedWordList }>());
export const updateWordListFail = createAction(wordListsActionsTypes.updateWordListFail, props<{ error }>());

/** selected wordLists */
enum selectedWordListsActionTypes {
  setSelectedWordLists = '[SELECTED WORD LISTS] set chosen word lists for render',
  clearSelectedWordLists = '[SELECTED WORD LISTS] clear selected word lists'
}

export const setSelectedWordLists = createAction(selectedWordListsActionTypes.setSelectedWordLists, props<{ selectedWordLists }>());
export const clearSelectedWordLists = createAction(selectedWordListsActionTypes.clearSelectedWordLists);

/** words from selected wordLists */
// export enum wordsFromSelectedListsActionTypes {
//   setWordsFromSelectedLists = '[WORDS FROM SELECTED LISTS] set words from selected lists',
//   clearWordsFromSelectedLists = '[WORDS FROM SELECTED LISTS] clear words from selected lists',
// }
//
// export const setWordsFromSelectedLists = createAction(
//   wordsFromSelectedListsActionTypes.setWordsFromSelectedLists,
//   props<{ wordsFromSelectedLists }>()
// );
// export const clearWordsFromSelectedLists = createAction(wordsFromSelectedListsActionTypes.clearWordsFromSelectedLists);
