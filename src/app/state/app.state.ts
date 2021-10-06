import {wordsReducer} from './languages/words.reducer';
import {IWord} from '../shared/models/esperanto/word.interface';

export interface AppState {
  words: IWord[];
}

export const StoreModuleReducers = {
  words: wordsReducer
};
