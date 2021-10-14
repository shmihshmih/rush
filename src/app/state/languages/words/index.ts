import {IWord} from '../../../shared/models/esperanto/word.interface';
import {selectedWordListsReducer, wordListsReducer, wordsReducer} from './words.reducer';
import {IWordList} from '../../../shared/models/esperanto/word_list.interface';

export const wordsFeatureKey = 'wordsFeature';

export const wordsReducers = {
  words: wordsReducer,
  wordLists: wordListsReducer,
  selectedWordLists: selectedWordListsReducer,
  // wordsFromSelectedLists: wordsFromSelectedListsReducer
};

export interface State {
  words: IWord[];
  wordLists: IWordList[];
  selectedWordLists: string[];
  // wordsFromSelectedLists: IWord[];
}
