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
  on(loadQuestBooksFail, (state, error) => {
    return {...state};
  })
);

export function blogCatalogsReducer(state, action): IQuestBook[] {
  return createBlogCatalogsReducer(state, action);
}

/** active quest book */
const initialSelectedPart = {
  _id: {$oid: ''},
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
    // на случай, если мы заходим по прямой ссылке, загруженных данных еще нет, но есть роут и номер части
    let selectedPartText;
    if (dataCollection.length > 0) {
      selectedPartText = dataCollection.filter(part => part.id === state.selectedPart.id)[0];
    } else {
      selectedPartText = selectedPart;
    }
    return {
      collection_caption,
      dataCollection,
      selectedPart: {
        id: state.selectedPart.id ? state.selectedPart.id : selectedPart.id,
        _id: selectedPart._id,
        part: selectedPartText?.part
      }
    };
  }),
  on(setSelectedQuestBookPart, (state, {selectedPart}) => {
    const partWeNeed = state.dataCollection.filter(part => +part.id === +selectedPart)[0];
    return {...state, selectedPart: {...state.selectedPart, id: +selectedPart, ...partWeNeed}};
  }),
  on(loadActiveQuestBookFail, (state, {error}) => {
    return {...state};
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
