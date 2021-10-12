import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromWords from './index';
import * as fromRoot from '../../app.state';

export const selectWordsFeature = createFeatureSelector<fromRoot.AppState, fromWords.State>(fromWords.wordsFeatureKey);

export const selectWords = createSelector(
  selectWordsFeature,
  (state: fromWords.State) => {
    return state.words;
  }
);
