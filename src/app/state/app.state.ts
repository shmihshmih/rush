import {createReducer} from '@ngrx/store';
import * as fromWords from './languages/words';

export interface AppState {
  [fromWords.wordsFeatureKey]: fromWords.State;
  error: string;
}

const initialState: AppState = {
  [fromWords.wordsFeatureKey]: {
    words: []
  },
  error: ''
};

export const StoreModuleReducers = createReducer(initialState);
