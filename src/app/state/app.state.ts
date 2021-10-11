import {createReducer} from '@ngrx/store';
import * as fromWords from './languages/words';

export interface AppState {
  wordsFeature: fromWords.State;
  error: string;
}

const initialState: AppState = {
  wordsFeature: {
    words: []
  },
  error: ''
};

export const StoreModuleReducers = createReducer(initialState);
