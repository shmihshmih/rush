import {createReducer, on} from '@ngrx/store';
import {
  addWordFail,
  addWordListFail,
  addWordListSuccess,
  addWordSuccess,
  clearSelectedWordLists,
  clearWordLists,
  clearWords,
  loadAtOnInSentencesByJsonFail,
  loadAtOnInSentencesByJsonSuccess,
  loadAtOnInSentencesFail,
  loadAtOnInSentencesSuccess,
  loadWordListsByJSONFail,
  loadWordListsByJSONSuccess,
  loadWordListsFail,
  loadWordListsSuccess,
  loadWordsByJSONFail,
  loadWordsByJSONSuccess,
  loadWordsFail,
  loadWordsSuccess,
  removeWordFail,
  removeWordListFail,
  removeWordListSuccess,
  removeWordSuccess,
  setSelectedWordLists,
  setSelectedWordListsByJSON,
  updateWordListFail,
  updateWordListSuccess,
  updateWordSuccess
} from './words.actions';
import {IWord} from '../../../shared/models/esperanto/word.interface';
import {IWordList} from '../../../shared/models/esperanto/word_list.interface';
import {State} from './index';
import {IPrepositionExercise} from '../../../shared/models/esperanto/at_on_in_sentence.interface';

/** all words */
const initialWordsState: IWord[] = [];

const createdWordsReducer = createReducer(
  initialWordsState,
  // 1. Получение всех слов
  on(loadWordsSuccess, (state, {words}) => {
    return [...words];
  }),
  on(loadWordsFail, (state, {error}) => {
    return [];
  }),
  // 1.1 Получение всех слов из JSON
  on(loadWordsByJSONSuccess, (state, {words}) => {
    return [...words];
  }),
  on(loadWordsByJSONFail, (state, {error}) => {
    return [];
  }),
  // 2. Добавление нового слова
  on(addWordSuccess, (state, {newWord}) => {
    return [...state, newWord];
  }),
  on(addWordFail, (state, {error}) => {
    return [];
  }),
  // 3. Удаление слова
  on(removeWordSuccess, (state, {deletedWord}) => {
    const newState = [...state];
    // const indexOfDeletedWord = newState.findIndex((w) => w._id.$oid === deletedWord._id.$oid);
    // newState.splice(indexOfDeletedWord, 1);
    return [...newState];
  }),
  on(removeWordFail, (state, {error}) => {
    return [];
  }),
  // 4. Редактирование слова
  on(updateWordSuccess, (state, {updatedWord}) => {
    const newState = [...state];
    // const indexOfUpdatedWord = newState.findIndex(w => w._id.$oid === updatedWord._id.$oid);
    // newState[indexOfUpdatedWord] = updatedWord;
    return [...newState];
  }),
  // 5. Общие
  on(clearWords, () => {
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
    return [...wordLists];
  }),
  on(loadWordListsFail, (state, {error}) => {
    return [];
  }),
  // 1.1 получение всех списков слов
  on(loadWordListsByJSONSuccess, (state, {wordLists}) => {
    return [...wordLists];
  }),
  on(loadWordListsByJSONFail, (state, {error}) => {
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
  }),
  on(clearWordLists, () => {
    return [];
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
  on(setSelectedWordListsByJSON, (state, {selectedWordLists}) => {
    return selectedWordLists;
  }),
  on(clearSelectedWordLists, () => {
    return initialSelectedWordListsState;
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

/** atonin sentences */
const initialAtOnInSentencesSate: IPrepositionExercise[] = [];

const createAtOnInReducer = createReducer(
  initialAtOnInSentencesSate,
  on(loadAtOnInSentencesSuccess, (state, {atOnInSentences}) => {
    return atOnInSentences;
  }),
  on(loadAtOnInSentencesFail, (state, {error}) => {
    return initialAtOnInSentencesSate;
  }),
  on(loadAtOnInSentencesByJsonSuccess, (state, {atOnInSentences}) => {
    return atOnInSentences;
  }),
  on(loadAtOnInSentencesByJsonFail, (state, {error}) => {
    return initialAtOnInSentencesSate;
  })
);

export const initialWordsFeatureState: State = {
  words: initialWordsState,
  wordLists: initialWordListsState,
  selectedWordLists: initialSelectedWordListsState,
  atOnInSentences: initialAtOnInSentencesSate
  // wordsFromSelectedLists: [] а нам вообще нужна какая-либо работа с ними? Мб нет
};

export function atOnInReducer(state, action): IPrepositionExercise[] {
  return createAtOnInReducer(state, action);
}
