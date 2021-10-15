import {createReducer} from '@ngrx/store';
import * as fromWords from './languages/words';
import * as fromQuestions from './autoHR/index';
import * as fromAuth from './auth';
import {initialAuthState} from './auth/auth.reducer';
import {initialWordsFeatureState} from './languages/words/words.reducer';
import {initialAutoHRState} from './autoHR/autoHR.reducer';

export interface AppState {
  [fromWords.wordsFeatureKey]: fromWords.State;
  [fromAuth.authFeatureKey]: fromAuth.State;
  [fromQuestions.autoHRFeatureKey]: fromQuestions.State;
  error: string;
}

const initialState: AppState = {
  [fromWords.wordsFeatureKey]: initialWordsFeatureState,
  [fromAuth.authFeatureKey]: initialAuthState,
  [fromQuestions.autoHRFeatureKey]: initialAutoHRState,
  error: ''
};

export const StoreModuleReducers = createReducer(initialState);
