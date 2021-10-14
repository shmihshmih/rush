import {createReducer, on} from '@ngrx/store';
import {
  clearSelectedWordLists,
  loadWordListsFail,
  loadWordListsSuccess,
  loadWordsFail,
  loadWordsSuccess,
  setSelectedWordLists
} from './words.actions';
import {IWord} from '../../../shared/models/esperanto/word.interface';
import {IWordList} from '../../../shared/models/esperanto/word_list.interface';

/** all words */
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

/** all wordLists */
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

/** selected wordLists */
const initialSelectedWordListsState: IWordList[] = [];

const createSelectedWordListsReducer = createReducer(
  initialSelectedWordListsState,
  on(setSelectedWordLists, (state, {selectedWordLists}) => {
    return selectedWordLists;
  }),
  on(clearSelectedWordLists, () => {
    return [];
  })
);

export function selectedWordListsReducer(state, action): IWordList[] {
  return createSelectedWordListsReducer(state, action);
}

/** words from selected lists */
// const initialWordsFromSelectedListsState: IWord[] = [];
//
// const createWordsFromSelectedListsReducer = createReducer(
//   initialWordsFromSelectedListsState,
//   on(setWordsFromSelectedLists, (state, {wordsFromSelectedLists}) => {
//     return wordsFromSelectedLists;
//   }),
//   on(clearWordsFromSelectedLists, (state) => {
//     return [];
//   })
// );
//
// export function wordsFromSelectedListsReducer(state, action): IWord[] {
//   return createWordsFromSelectedListsReducer(state, action);
// }
