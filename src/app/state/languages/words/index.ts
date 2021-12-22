import {IWord} from '../../../shared/models/esperanto/word.interface';
import {atOnInReducer, selectedWordListsReducer, wordListsReducer, wordsReducer} from './words.reducer';
import {IWordList} from '../../../shared/models/esperanto/word_list.interface';
import {IPrepositionExercise} from '../../../shared/models/esperanto/at_on_in_sentence.interface';

export const wordsFeatureKey = 'wordsFeature';

export const wordsReducers = {
  words: wordsReducer,
  wordLists: wordListsReducer,
  selectedWordLists: selectedWordListsReducer,
  atOnInSentences: atOnInReducer
  // wordsFromSelectedLists: wordsFromSelectedListsReducer
};

export interface State {
  words: IWord[];
  wordLists: IWordList[];
  selectedWordLists: string[];
  atOnInSentences: IPrepositionExercise[];
  // wordsFromSelectedLists: IWord[];
}
