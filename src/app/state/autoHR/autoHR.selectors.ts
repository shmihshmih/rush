import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromTasks from './index';
import * as fromRoot from '../app.state';

const autoHRFeatureSelector = createFeatureSelector<fromRoot.AppState, fromTasks.State>(fromTasks.autoHRFeatureKey);

export const selectQuestions = createSelector(
  autoHRFeatureSelector,
  (state: fromTasks.State) => {
    return state.tasks;
  });
