import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromTasks from './index';
import * as fromRoot from '../app.state';

const autoHRFeatureSelector = createFeatureSelector<fromRoot.AppState, fromTasks.State>(fromTasks.autoHRFeatureKey);

/** tasks */
export const selectTasks = createSelector(
  autoHRFeatureSelector,
  (state: fromTasks.State) => {
    return state.tasks;
  });

/** config */
export const selectAutoHRConfig = createSelector(
  autoHRFeatureSelector,
  (state: fromTasks.State) => {
    return state.config;
  }
);

/** catalogs */
export const selectDifficultyCatalog = createSelector(
  autoHRFeatureSelector,
  (state: fromTasks.State) => {
    return state.catalogs.difficultyCatalog;
  }
);
export const selectCompetenceCatalog = createSelector(
  autoHRFeatureSelector,
  (state: fromTasks.State) => {
    return state.catalogs.competenceCatalog;
  }
);
export const selectPopularityCatalog = createSelector(
  autoHRFeatureSelector,
  (state: fromTasks.State) => {
    return state.catalogs.popularityCatalog;
  }
);
