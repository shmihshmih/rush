import {IWord} from '../../../shared/models/esperanto/word.interface';
import {wordListsReducer, wordsReducer} from './words.reducer';
import {IWordList} from '../../../shared/models/esperanto/word_list.interface';

export const wordsFeatureKey = 'wordsFeature';

export const wordsReducers = {
  words: wordsReducer,
  wordLists: wordListsReducer
};

export interface State {
  words: IWord[];
  wordLists: IWordList[];
}
