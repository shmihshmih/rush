import {IQuestBook, IQuestBookPart} from '../../shared/models/blog/questBook.model';
import {activeQuestBookReducer, blogCatalogsReducer} from './blog.reducer';

export const blogFeatureKey = 'blogFeature';

export const blogReducers = {
  activeQuestBook: activeQuestBookReducer,
  catalogs: blogCatalogsReducer
};

export interface State {
  activeQuestBook: {
    collection_caption: string;
    dataCollection: IQuestBookPart[];
    selectedPart: IQuestBookPart;
  };
  catalogs: {
    questBooks: IQuestBook[]
  };
}
