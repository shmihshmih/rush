import {createReducer} from '@ngrx/store';
import * as fromWords from './languages/words';
import * as fromTasks from './autoHR/index';
import * as fromAuth from './auth';
import {initialAuthState} from './auth/auth.reducer';
import {initialWordsFeatureState} from './languages/words/words.reducer';
import {initialAutoHRState} from './autoHR/autoHR.reducer';
import * as fromBlog from './blog/index';
import {initialBlogState} from './blog/blog.reducer';

export interface AppState {
  [fromWords.wordsFeatureKey]: fromWords.State;
  [fromAuth.authFeatureKey]: fromAuth.State;
  [fromTasks.autoHRFeatureKey]: fromTasks.State;
  [fromBlog.blogFeatureKey]: fromBlog.State;
  error: string;
}

const initialState: AppState = {
  [fromWords.wordsFeatureKey]: initialWordsFeatureState,
  [fromAuth.authFeatureKey]: initialAuthState,
  [fromTasks.autoHRFeatureKey]: initialAutoHRState,
  [fromBlog.blogFeatureKey]: initialBlogState,
  error: ''
};

export const StoreModuleReducers = createReducer(initialState);
