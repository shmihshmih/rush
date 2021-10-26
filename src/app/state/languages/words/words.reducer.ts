import {createReducer, on} from '@ngrx/store';
import {
  addWordListFail,
  addWordListSuccess,
  clearSelectedWordLists,
  loadWordListsFail,
  loadWordListsSuccess,
  loadWordsFail,
  loadWordsSuccess,
  removeWordListFail,
  removeWordListSuccess,
  setSelectedWordLists,
  updateWordListFail,
  updateWordListSuccess
} from './words.actions';
import {IWord} from '../../../shared/models/esperanto/word.interface';
import {IWordList} from '../../../shared/models/esperanto/word_list.interface';
import {State} from './index';

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
  // 1. получение всех списков слов
  on(loadWordListsSuccess, (state, {wordLists}) => {
    return wordLists;
  }),
  on(loadWordListsFail, (state, {error}) => {
    return [];
  }),
  // 2. добавление нового списка слов
  on(addWordListSuccess, (state, {newWordList}) => {
    return [...state, newWordList];
  }),
  on(addWordListFail, (state, {error}) => {
    return [...state];
  }),
  // 3. удаление списка слов
  on(removeWordListSuccess, (state, {deleted}) => {
    const newState = state.filter(el => (el.collection_caption !== deleted.collection_caption) && (el.title !== deleted.title));
    return [...newState];
  }),
  on(removeWordListFail, (state, {error}) => {
    return [...state];
  }),
  // 4. обновление списка слов
  on(updateWordListSuccess, (state, {updatedWordList}) => {
    const updatedIndex = state.findIndex((el) => {
      return (el.collection_caption === updatedWordList.collection_caption) && (el.title === updatedWordList.title);
    });
    const newState = [...state];
    newState[updatedIndex] = updatedWordList;
    return newState;
  }),
  on(updateWordListFail, (state, {error}) => {
    return [...state];
  })
);

export function wordListsReducer(state, action): IWordList[] {
  return createWordListsReducer(state, action);
}

/** selected wordLists */
const initialSelectedWordListsState: string[] = [];

const createSelectedWordListsReducer = createReducer(
  initialSelectedWordListsState,
  on(setSelectedWordLists, (state, {selectedWordLists}) => {
    return selectedWordLists;
  }),
  on(clearSelectedWordLists, () => {
    return [];
  })
);

export function selectedWordListsReducer(state, action): string[] {
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

export const initialWordsFeatureState: State = {
  words: initialWordsState,
  wordLists: initialWordListsState,
  selectedWordLists: initialSelectedWordListsState
  // wordsFromSelectedLists: [] а нам вообще нужна какая-либо работа с ними? Мб нет
};
