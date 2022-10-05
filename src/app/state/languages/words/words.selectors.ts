import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromWords from './index';

const selectWordsFeature = createFeatureSelector< fromWords.State>(fromWords.wordsFeatureKey);

/** Получить все слова */
export const selectWords = createSelector(
  selectWordsFeature,
  (state: fromWords.State) => {
    return state.words;
  }
);

/** Получить все списки слов */
export const selectWordLists = createSelector(
  selectWordsFeature,
  (state: fromWords.State) => {
    return state.wordLists;
  }
);

/** Получить все активные списки */
export const selectSelectedWordLists = createSelector(
  selectWordsFeature,
  (state: fromWords.State) => {
    return state.selectedWordLists;
  }
);

/** Получить все слова из активных списков */
export const selectWordsFromSelectedLists = createSelector(
  selectWords,
  selectSelectedWordLists,
  (words, selectedLists) => {
    const wordsWeNeed = [];
    if (selectedLists?.length > 0) {
      words.forEach(word => {
        if (word.word_type.some(type => selectedLists.includes(type))) {
          wordsWeNeed.push(word);
        }
      });
    }
    return [...wordsWeNeed];
  }
);

/** Получить все atOnIn упражнения */
export const selectAtOnInExercises = createSelector(
  selectWordsFeature,
  (state: fromWords.State) => {
    return state.atOnInSentences;
  }
);
