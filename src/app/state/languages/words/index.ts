import {IWord} from '../../../shared/models/esperanto/word.interface';
import {wordsReducer} from './words.reducer';

export const wordsFeatureKey = 'wordsFeature';

export const wordsReducers = {
  words: wordsReducer
};

export interface State {
  words: IWord[];
}
