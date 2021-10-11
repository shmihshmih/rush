import {createReducer, on} from '@ngrx/store';
import {loadWordsFail, loadWordsSuccess} from './words.actions';
import {IWord} from '../../../shared/models/esperanto/word.interface';

export const initialWordsState: IWord[] = [];


export const createdWordsReducer = createReducer(
  initialWordsState,
  on(loadWordsSuccess, (state, {words}) => {
    return words;
  }),
  on(loadWordsFail, (state, {error}) => {
    return [];
  })
);

export function wordsReducer(state, action): IWord[] {
  return createdWordsReducer(state, action);
}
