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
