import {createReducer, on} from '@ngrx/store';
import {loadWordListsFail, loadWordListsSuccess, loadWordsFail, loadWordsSuccess} from './words.actions';
import {IWord} from '../../../shared/models/esperanto/word.interface';
import {IWordList} from '../../../shared/models/esperanto/word_list.interface';

/** words */
const initialWordsState: IWord[] = [];

const createdWordsReducer = createReducer(
  initialWordsState,
  on(loadWordsSuccess, (state, {words}) => {
    return words;
  }),
  on(loadWordsFail, (state, {error}) => {
    return [];
  })
);

export function wordsReducer(state, action): IWord[] {
  return createdWordsReducer(state, action);
}

/** wordLists */
const initialWordListsState: IWordList[] = [];

const createWordListsReducer = createReducer(
  initialWordListsState,
  on(loadWordListsSuccess, (state, {wordLists}) => {
    return wordLists;
  }),
  on(loadWordListsFail, (state, {error}) => {
    return [];
  })
);

export function wordListsReducer(state, action): IWordList[] {
  return createWordListsReducer(state, action);
}
