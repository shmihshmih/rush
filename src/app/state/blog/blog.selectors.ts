import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromRoot from '../app.state';
import * as fromBlog from './index';

const blogFeatureSelector = createFeatureSelector<fromRoot.AppState, fromBlog.State>(fromBlog.blogFeatureKey);

/** quest books list */
export const selectQuestBooksCatalog = createSelector(
  blogFeatureSelector,
  (state: fromBlog.State) => {
    return state.catalogs.questBooks;
  }
);

/** get quest book part */
export const selectQuestBookPart = createSelector(
  blogFeatureSelector,
  (state: fromBlog.State) => {
    return state.activeQuestBook.selectedPart;
  }
);
