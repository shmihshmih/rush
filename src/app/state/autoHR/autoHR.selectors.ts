import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromQuestions from './index';
import * as fromRoot from '../app.state';

const autoHRFeatureSelector = createFeatureSelector<fromRoot.AppState, fromQuestions.State>(fromQuestions.autoHRFeatureKey);

export const selectQuestions = createSelector(
  autoHRFeatureSelector,
  (state: fromQuestions.State) => {
    return state.questions;
  });
