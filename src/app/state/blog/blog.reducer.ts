import {createReducer, on} from '@ngrx/store';
import {
  clearActiveQuestBook,
  clearSelectedQuestBookPart,
  loadActiveQuestBook,
  loadActiveQuestBookFail,
  loadActiveQuestBookSuccess,
  loadQuestBooksFail,
  loadQuestBooksSuccess,
  setSelectedQuestBookPart
} from './blog.actions';
import {State} from './index';
import {IQuestBook} from '../../shared/models/blog/questBook.model';

/** quest book catalogs */
const initialBlogCatalogState: IQuestBook[] = [];

export const createBlogCatalogsReducer = createReducer(
  initialBlogCatalogState,
  on(loadQuestBooksSuccess, (state, {questBooks}) => {
    return {...state, questBooks};
  }),
  on(loadQuestBooksFail, (error) => {
    return error;
  })
);

export function blogCatalogsReducer(state, action): IQuestBook[] {
  return createBlogCatalogsReducer(state, action);
}

/** active quest book */
const initialSelectedPart = {
  _id: {},
  id: null,
  part: ''
};

const initialActiveQuestBook = {
  collection_caption: '',
  dataCollection: [],
  selectedPart: initialSelectedPart
};

export const activeQuestBookReducer = createReducer(
  initialActiveQuestBook,
  on(loadActiveQuestBook, (state) => {
    return state;
  }),
  on(loadActiveQuestBookSuccess, (state, {collection_caption, dataCollection, selectedPart}) => {
    return {collection_caption, dataCollection, selectedPart};
  }),
  on(setSelectedQuestBookPart, (state, {selectedPart}) => {
    console.log('selectedPart: ', selectedPart);
    const partWeNeed = state.dataCollection.filter(part => +part.id === +selectedPart)[0];
    console.log('partWeNeed: ', partWeNeed);
    return {...state, selectedPart: partWeNeed};
  }),
  on(loadActiveQuestBookFail, (state, {error}) => {
    return error;
  }),
  on(clearActiveQuestBook, () => {
    return initialActiveQuestBook;
  }),
  on(clearSelectedQuestBookPart, (state) => {
    return {...state, selectedPart: initialSelectedPart};
  })
);

/** whole initial state */
export const initialBlogState: State = {
  activeQuestBook: initialActiveQuestBook,
  catalogs: {
    questBooks: initialBlogCatalogState
  }
};
