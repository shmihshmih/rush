import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromAuth from './index';
import * as fromRoot from '../app.state';

const authFeatureSelector = createFeatureSelector<fromRoot.AppState, fromAuth.State>(fromAuth.authFeatureKey);

export const selectIsAuth = createSelector(
  authFeatureSelector,
  (state: fromAuth.State) => {
    return state.isAuth;
  }
);
