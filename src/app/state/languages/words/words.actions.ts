import {createAction, props} from '@ngrx/store';

/** words */

export enum WordsActionsTypes {
  loadWords = '[WORDS] load words',
  loadWordsSuccess = '[WORDS] load words success',
  loadWordsFail = '[WORDS] load words fail'
}

export const loadWords = createAction(WordsActionsTypes.loadWords); // effect
export const loadWordsSuccess = createAction(WordsActionsTypes.loadWordsSuccess, props<{ words }>());
export const loadWordsFail = createAction(WordsActionsTypes.loadWordsFail, props<{ error: string }>());

/** wordLists */

export enum wordListsActionsTypes {
  loadWordLists = '[WORD LISTS] load wordLists',
  loadWordListsSuccess = '[WORD LISTS] load wordLists success',
  loadWordListsFail = '[WORD LISTS] load wordLists fail'
}

export const loadWordLists = createAction(wordListsActionsTypes.loadWordLists); // effect
export const loadWordListsSuccess = createAction(wordListsActionsTypes.loadWordListsSuccess, props<{ wordLists }>());
export const loadWordListsFail = createAction(wordListsActionsTypes.loadWordListsFail, props<{ error: string }>());

/** selected wordLists */
export enum selectedWordListsActionTypes {
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
