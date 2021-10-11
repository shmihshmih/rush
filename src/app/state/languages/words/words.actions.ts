import {createAction, props} from '@ngrx/store';

// list of all actions
export enum WordsActionsTypes {
  loadWords = '[WORDS] load words',
  loadWordsSuccess = '[WORDS] load words success',
  loadWordsFail = '[WORDS] load words fail'
}

// action creators
export const loadWords = createAction(WordsActionsTypes.loadWords); // effect
export const loadWordsSuccess = createAction(WordsActionsTypes.loadWordsSuccess, props<{ words }>());
export const loadWordsFail = createAction(WordsActionsTypes.loadWordsFail, props<{ error: string }>());

// validate action creators
// export type WordsActions = loadWords | loadWordsSuccess | loadWordsFail;
