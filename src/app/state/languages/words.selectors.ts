import {createFeatureSelector, createSelector} from '@ngrx/store';
import {IWord} from '../../shared/models/esperanto/word.interface';
import {AppState} from '../app.state';

export const featureKey = 'words';

export const selectWordsFeature = createFeatureSelector<AppState, IWord[]>(featureKey);

export const selectWords = createSelector(
  selectWordsFeature,
  (state: IWord[]) => {
    return state;
  }
);
