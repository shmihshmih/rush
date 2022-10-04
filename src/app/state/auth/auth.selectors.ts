import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromAuth from './index';

const authFeatureSelector = createFeatureSelector< fromAuth.State>(fromAuth.authFeatureKey);

export const selectIsAuth = createSelector(
  authFeatureSelector,
  (state: fromAuth.State) => {
    return state.isAuth;
  }
);
