import {wordsReducer} from './languages/words.reducer';
import {IWord} from '../shared/models/esperanto/word.interface';

export interface State {
  books: ReadonlyArray<IWord>;
}

export const StoreModuleReducers = {
  words: wordsReducer
};
