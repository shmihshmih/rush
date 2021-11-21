import {createAction, props} from '@ngrx/store';

/** words */

enum WordsActionsTypes {
  // 1. Получение всех слов
  loadWords = '[WORDS] load words',
  loadWordsSuccess = '[WORDS] load words success',
  loadWordsFail = '[WORDS] load words fail',

  // 1.1 Получение всех слов из JSON
  loadWordsByJSON = '[WORDS] load words by JSON',
  loadWordsByJSONSuccess = '[WORDS] load words by JSON success',
  loadWordsByJSONFail = '[WORDS] load words by JSON fail',

  // 2. Добавление нового слова
  addWord = '[WORDS] add new word',
  addWordSuccess = '[WORDS] add new word success',
  addWordFail = '[WORDS] add new word fail',

  // 3. Удаление слова
  removeWord = '[WORDS] delete word',
  removeWordSuccess = '[WORDS] delete word Success',
  removeWordFail = '[WORDS] delete word Fail',

  // 4. Редактирование слова
  updateWord = '[WORDS] update word',
  updateWordSuccess = '[WORDS] update word Success',
  updateWordFail = '[WORDS] update word Fail',

  // 5. Общие
  clearWords = '[WORDS] clear words state'
}

// 1. Получение всех слов
export const loadWords = createAction(WordsActionsTypes.loadWords); // effect
export const loadWordsSuccess = createAction(WordsActionsTypes.loadWordsSuccess, props<{ words }>());
export const loadWordsFail = createAction(WordsActionsTypes.loadWordsFail, props<{ error: string }>());

// 1.1 Получение всех слов из JSON
export const loadWordsByJSON = createAction(WordsActionsTypes.loadWordsByJSON); // effect
export const loadWordsByJSONSuccess = createAction(WordsActionsTypes.loadWordsByJSONSuccess, props<{ words }>());
export const loadWordsByJSONFail = createAction(WordsActionsTypes.loadWordsByJSONFail, props<{ error: string }>());

// 2. Добавление нового слова
export const addWord = createAction(WordsActionsTypes.addWord, props<{ newWord }>()); // effect
export const addWordSuccess = createAction(WordsActionsTypes.addWordSuccess, props<{ newWord }>());
export const addWordFail = createAction(WordsActionsTypes.addWordFail, props<{ error }>());

// 3. Удаление слова
export const removeWord = createAction(WordsActionsTypes.removeWord, props<{ deletedWord }>()); // effect
export const removeWordSuccess = createAction(WordsActionsTypes.removeWordSuccess, props<{ deletedWord }>());
export const removeWordFail = createAction(WordsActionsTypes.removeWordFail, props<{ error }>());

// 4. Редактирование слова
export const updateWord = createAction(WordsActionsTypes.updateWord, props<{ updatedWord }>()); // effect
export const updateWordSuccess = createAction(WordsActionsTypes.updateWordSuccess, props<{ updatedWord }>());
export const updateWordFail = createAction(WordsActionsTypes.updateWordFail, props<{ error }>());

// 5. Общие
export const clearWords = createAction(WordsActionsTypes.clearWords);

/** wordLists */

enum wordListsActionsTypes {
  // 1. получение всех списков слов
  loadWordLists = '[WORD LISTS] load wordLists',
  loadWordListsSuccess = '[WORD LISTS] load wordLists success',
  loadWordListsFail = '[WORD LISTS] load wordLists fail',

  // 1.1 получение всех списков слов
  loadWordListsByJSON = '[WORD LISTS] load wordLists ByJSON',
  loadWordListsByJSONSuccess = '[WORD LISTS] load wordLists ByJSON success',
  loadWordListsByJSONFail = '[WORD LISTS] load wordLists ByJSON fail',

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
  updateWordListFail = '[WORD LISTS] update word list fail',

  // 5. Общие
  clearWordLists = '[WORD LISTS] clear word lists'
}

// 1. получение всех списков слов
export const loadWordLists = createAction(wordListsActionsTypes.loadWordLists); // effect
export const loadWordListsSuccess = createAction(wordListsActionsTypes.loadWordListsSuccess, props<{ wordLists }>());
export const loadWordListsFail = createAction(wordListsActionsTypes.loadWordListsFail, props<{ error: string }>());

// 1.1 получение всех списков слов
export const loadWordListsByJSON = createAction(wordListsActionsTypes.loadWordListsByJSON); // effect
export const loadWordListsByJSONSuccess = createAction(wordListsActionsTypes.loadWordListsByJSONSuccess, props<{ wordLists }>());
export const loadWordListsByJSONFail = createAction(wordListsActionsTypes.loadWordListsByJSONFail, props<{ error: string }>());

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

// 5. Общие
export const clearWordLists = createAction(wordListsActionsTypes.clearWordLists);

/** selected wordLists */
enum selectedWordListsActionTypes {
  setSelectedWordLists = '[SELECTED WORD LISTS] set chosen word lists for render',
  setSelectedWordListsByJSON = '[SELECTED WORD LISTS] set chosen word lists by JSON for render',
  clearSelectedWordLists = '[SELECTED WORD LISTS] clear selected word lists'
}

export const setSelectedWordLists = createAction(selectedWordListsActionTypes.setSelectedWordLists, props<{ selectedWordLists }>());
export const setSelectedWordListsByJSON = createAction(
  selectedWordListsActionTypes.setSelectedWordListsByJSON,
  props<{ selectedWordLists }>());
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
